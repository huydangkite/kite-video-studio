// Mix a video's voice, music and SFX into audio/mix.wav (+ stems), with the music ducked under the voice and a
// two-pass loudness normalisation. Voice placement comes from audio/timing.json (beats[].vo: {file, start} or a list).
//
//   node ${CLAUDE_PLUGIN_ROOT}/skills/kite-video/scripts/mix.mjs videos/<slug> [--plan=audio/mix/plan.json] [--target=-14]
//
// audio/mix/plan.json (all optional; paths relative to the video folder):
//   { "music": { "file": "audio/music/arranged.flac", "gain_db": 0, "fade_out": 1.5 },
//     "sidechain": { "threshold": 0.03, "ratio": 3, "attack_ms": 15, "release_ms": 350 },
//     "sfx_cues": "audio/sfx/cues.json",   // [{ id, t, gain_db }] → audio/sfx/<id>.mp3|wav
//     "target_lufs": -14, "true_peak": -1.5 }
// Writes audio/mix.wav (48 kHz stereo) and audio/stems/{voice,music,sfx}.wav (music stem = after ducking), then
// prints integrated loudness and true peak. Check the balance with measure-mix-balance.py on the stems.
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";

const argv = process.argv.slice(2);
const dir = resolve(argv.find((a) => !a.startsWith("--")) || ".");
const opt = (k, d) => { const f = argv.find((a) => a.startsWith(`--${k}=`)); return f ? f.split("=").slice(1).join("=") : d; };
const at = (p) => resolve(dir, p);
const readJson = (p) => JSON.parse(readFileSync(at(p), "utf8"));

const timing = readJson("audio/timing.json");
const planPath = opt("plan", "audio/mix/plan.json");
const plan = existsSync(at(planPath)) ? readJson(planPath) : {};
const target = +opt("target", plan.target_lufs ?? -14), tp = +(plan.true_peak ?? -1.5);
const dur = timing.duration ?? Math.max(...timing.beats.map((b) => b.end));
const sc = { threshold: 0.03, ratio: 3, attack_ms: 15, release_ms: 350, ...(plan.sidechain || {}) };

const voice = timing.beats.flatMap((b) => [].concat(b.vo || [])).filter((v) => v && v.file)
  .map((v) => ({ file: at(v.file), start: v.start ?? 0 }));
const musicCfg = plan.music || (timing.music && timing.music.file ? { file: timing.music.file } : null);
const cuesPath = plan.sfx_cues || (existsSync(at("audio/sfx/cues.json")) ? "audio/sfx/cues.json" : null);
const sfx = cuesPath ? readJson(cuesPath).map((c) => {
  const f = ["mp3", "wav"].map((e) => at(`audio/sfx/${c.id}.${e}`)).find(existsSync);
  if (!f) throw new Error(`SFX file for "${c.id}" not found in audio/sfx/`);
  return { file: f, start: c.t, gain: c.gain_db ?? -10 };
}) : [];
for (const v of voice) if (!existsSync(v.file)) throw new Error(`voice file not found: ${v.file}`);
if (!voice.length) throw new Error("no voice lines in timing.json (beats[].vo)");

const inputs = [], parts = [];
const add = (file) => { inputs.push("-i", file); return inputs.length / 2 - 1; };
const fmt = "aresample=48000,aformat=sample_fmts=fltp:channel_layouts=stereo";
const ms = (s) => Math.max(0, Math.round(s * 1000));

voice.forEach((v, i) => parts.push(`[${add(v.file)}:a]${fmt},adelay=${ms(v.start)}:all=1[v${i}]`));
parts.push(`${voice.map((_, i) => `[v${i}]`).join("")}amix=inputs=${voice.length}:normalize=0:duration=longest,apad,atrim=0:${dur}[vb]`);
parts.push(`[vb]asplit=3[vside][vmix][vstem]`);
if (musicCfg) {
  const m = add(at(musicCfg.file)), fo = musicCfg.fade_out ?? 1.5;
  parts.push(`[${m}:a]${fmt},volume=${musicCfg.gain_db ?? 0}dB,apad,atrim=0:${dur},afade=t=out:st=${Math.max(0, dur - fo)}:d=${fo}[mus]`);
  parts.push(`[mus][vside]sidechaincompress=threshold=${sc.threshold}:ratio=${sc.ratio}:attack=${sc.attack_ms}:release=${sc.release_ms}[mduck]`);
} else {
  parts.push(`anullsrc=r=48000:cl=stereo,atrim=0:${dur}[mduck]`, `[vside]anullsink`);
}
parts.push(`[mduck]asplit=2[mmix][mstem]`);
if (sfx.length) {
  sfx.forEach((s, i) => parts.push(`[${add(s.file)}:a]${fmt},volume=${s.gain}dB,adelay=${ms(s.start)}:all=1[s${i}]`));
  parts.push(`${sfx.map((_, i) => `[s${i}]`).join("")}amix=inputs=${sfx.length}:normalize=0:duration=longest,apad,atrim=0:${dur}[sb]`);
} else parts.push(`anullsrc=r=48000:cl=stereo,atrim=0:${dur}[sb]`);
parts.push(`[sb]asplit=2[smix][sstem]`);
parts.push(`[vmix][mmix][smix]amix=inputs=3:normalize=0:duration=first,atrim=0:${dur}[pre]`);

const ff = (a) => spawnSync("ffmpeg", ["-hide_banner", "-nostats", "-y", ...a], { encoding: "utf8", maxBuffer: 1 << 26 });
// Pass 1: measure.
const graph1 = parts.join(";") + `;[pre]loudnorm=I=${target}:TP=${tp}:LRA=11:print_format=json[out]`;
const p1 = ff([...inputs, "-filter_complex", graph1, "-map", "[out]", "-map", "[vstem]", "-map", "[mstem]", "-map", "[sstem]",
  "-f", "null", "-"]);
const j = (p1.stderr.match(/\{[^{}]*"input_i"[^{}]*\}/) || [])[0];
if (p1.status || !j) { console.error(p1.stderr.slice(-2000)); process.exit(1); }
const m = JSON.parse(j);
// Pass 2: apply with the measured values; write the mix and the stems.
const ln = `loudnorm=I=${target}:TP=${tp}:LRA=11:measured_I=${m.input_i}:measured_TP=${m.input_tp}:measured_LRA=${m.input_lra}` +
  `:measured_thresh=${m.input_thresh}:offset=${m.target_offset}:linear=true,aresample=48000`;
mkdirSync(at("audio/stems"), { recursive: true });
const p2 = ff([...inputs, "-filter_complex", parts.join(";") + `;[pre]${ln}[out]`,
  "-map", "[out]", "-c:a", "pcm_s16le", at("audio/mix.wav"),
  "-map", "[vstem]", "-c:a", "pcm_s16le", at("audio/stems/voice.wav"),
  "-map", "[mstem]", "-c:a", "pcm_s16le", at("audio/stems/music.wav"),
  "-map", "[sstem]", "-c:a", "pcm_s16le", at("audio/stems/sfx.wav")]);
if (p2.status) { console.error(p2.stderr.slice(-2000)); process.exit(1); }
const check = ff(["-i", at("audio/mix.wav"), "-af", "ebur128=peak=true", "-f", "null", "-"]).stderr;
const last = (re) => { const all = [...check.matchAll(re)]; return all.length ? all.at(-1)[1] : "?"; };
const I = last(/I:\s+(-?[\d.]+) LUFS/g), P = last(/Peak:\s+(-?[\d.]+) dBFS/g);
console.log(`wrote audio/mix.wav (${dur.toFixed(2)}s, ${voice.length} voice lines, ${musicCfg ? "music" : "no music"}, ${sfx.length} SFX)`);
console.log(`loudness ${I} LUFS · true peak ${P} dBTP (target ${target} LUFS, ≤ ${tp} dBTP) · stems in audio/stems/`);
console.log("Next: measure-mix-balance.py --voice audio/stems/voice.wav --music audio/stems/music.wav; aim ~5 dB (4–6) music under the voice; adjust music.gain_db and re-run.");
