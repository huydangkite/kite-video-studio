// Gemini text-to-speech for a video folder, straight over the REST API (alternative to ElevenLabs when only
// GEMINI_API_KEY is set, or when the delivery should be directed by a style prompt).
// The key comes from $GEMINI_API_KEY or .env; it is never printed or written anywhere.
//
//   node ${CLAUDE_PLUGIN_ROOT}/skills/kite-video/scripts/gemini.mjs tts <lines.json> <out dir> [--only=id1,id2] [--force] [--dry]
//        lines.json = { model: "gemini-3.8-flash-tts", voice: "Kore", style: "Calm, warm and confident …",
//                       lines: [{ id, say }] }  ->  <out dir>/<id>.wav (mono 24 kHz, untrimmed)
//        Write the style in English even for Vietnamese lines. Voices: Kore, Puck, Fenrir, Aoede, Charon, Leda …
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { join } from "node:path";

const [cmd, ...rest] = process.argv.slice(2);
const flags = rest.filter((a) => a.startsWith("--")), args = rest.filter((a) => !a.startsWith("--"));
const dry = flags.includes("--dry"), force = flags.includes("--force");
const only = (flags.find((f) => f.startsWith("--only=")) || "").slice(7).split(",").filter(Boolean);

function apiKey() {
  if (process.env.GEMINI_API_KEY) return process.env.GEMINI_API_KEY;
  for (const dir of [process.env.CLAUDE_PROJECT_DIR, process.cwd()].filter(Boolean)) {
    const env = join(dir, ".env");
    if (!existsSync(env)) continue;
    const m = readFileSync(env, "utf8").match(/^GEMINI_API_KEY=(.+)$/m);
    if (m && m[1].trim()) return m[1].trim().replace(/^["']|["']$/g, "");
  }
  console.error("GEMINI_API_KEY is not set (environment or .env).");
  process.exit(2);
}

async function tts([linesPath, outDir]) {
  if (!linesPath || !outDir) throw new Error("usage: tts <lines.json> <out dir>");
  const cfg = JSON.parse(readFileSync(linesPath, "utf8"));
  const model = cfg.model || "gemini-3.8-flash-tts";
  for (const line of cfg.lines.filter((l) => !only.length || only.includes(String(l.id)))) {
    const out = join(outDir, `${line.id}.wav`);
    if (existsSync(out) && !force) { console.log(`skip ${out} (exists; --force to redo)`); continue; }
    const body = {
      contents: [{ parts: [{ text: cfg.style ? `${cfg.style}\n\n${line.say ?? line.text}` : (line.say ?? line.text) }] }],
      generationConfig: { responseModalities: ["AUDIO"],
        speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: cfg.voice || "Kore" } } } },
    };
    if (dry) { console.log(`POST …/models/${model}:generateContent`, JSON.stringify(body).slice(0, 400)); continue; }
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
      method: "POST", headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey() }, body: JSON.stringify(body) });
    if (!res.ok) throw new Error(`Gemini TTS failed: HTTP ${res.status} ${(await res.text()).slice(0, 300)}`);
    const data = await res.json();
    const b64 = data?.candidates?.[0]?.content?.parts?.find((p) => p.inlineData)?.inlineData?.data;
    if (!b64) throw new Error(`Gemini returned no audio for line ${line.id}`);
    mkdirSync(outDir, { recursive: true });
    const pcm = `${out}.pcm`;
    writeFileSync(pcm, Buffer.from(b64, "base64"));
    const ff = spawnSync("ffmpeg", ["-y", "-loglevel", "error", "-f", "s16le", "-ar", "24000", "-ac", "1", "-i", pcm, out], { stdio: "inherit" });
    rmSync(pcm, { force: true });
    if (ff.status) throw new Error(`ffmpeg could not convert line ${line.id}`);
    console.log(`saved ${out}`);
  }
}

const commands = { tts };
if (!commands[cmd]) { console.error("usage: gemini.mjs tts <lines.json> <out dir> (see the header of this file)"); process.exit(1); }
commands[cmd](args).catch((e) => { console.error(e.message); process.exit(1); });
