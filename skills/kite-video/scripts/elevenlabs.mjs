// ElevenLabs music, sound effects and forced alignment for a video folder, straight over the REST API.
// The key comes from $ELEVENLABS_API_KEY or the repo's .env; it is never printed or written anywhere.
//
// Usage:
//   node ${CLAUDE_PLUGIN_ROOT}/skills/kite-video/scripts/elevenlabs.mjs music <plan.json> <out.mp3>
//        plan = ElevenLabs composition plan: positive_global_styles, negative_global_styles,
//               sections[{ section_name, positive_local_styles, negative_local_styles, duration_ms, lines: [] }]
//   node ${CLAUDE_PLUGIN_ROOT}/skills/kite-video/scripts/elevenlabs.mjs sfx <sfx.json> <out dir> [--only=id1,id2] [--force]
//        sfx.json = [{ id, prompt, duration }]  ->  <out dir>/<id>.mp3
//   node ${CLAUDE_PLUGIN_ROOT}/skills/kite-video/scripts/elevenlabs.mjs align <voice.wav> <text or @file.txt> <out.json>
//        -> { words: [[text, start, end], ...] } in seconds from the start of the file
//   Add --dry to print the request instead of sending it (no key needed).
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const API = "https://api.elevenlabs.io/v1";
const [cmd, ...rest] = process.argv.slice(2);
const flags = rest.filter((a) => a.startsWith("--"));
const args = rest.filter((a) => !a.startsWith("--"));
const dry = flags.includes("--dry");
const force = flags.includes("--force");
const only = (flags.find((f) => f.startsWith("--only=")) || "").slice(7).split(",").filter(Boolean);

function apiKey() {
  if (process.env.ELEVENLABS_API_KEY) return process.env.ELEVENLABS_API_KEY;
  const repo = resolve(dirname(fileURLToPath(import.meta.url)), "../../../..");
  for (const dir of [process.env.CLAUDE_PROJECT_DIR, process.cwd(), repo].filter(Boolean)) {
    const env = join(dir, ".env");
    if (!existsSync(env)) continue;
    const m = readFileSync(env, "utf8").match(/^ELEVENLABS_API_KEY=(.+)$/m);
    if (m && m[1].trim()) return m[1].trim().replace(/^["']|["']$/g, "");
  }
  console.error("ELEVENLABS_API_KEY is not set (environment or .env).");
  process.exit(2);
}

async function post(path, body, { json = true } = {}) {
  if (dry) {
    console.log(`POST ${API}${path}`);
    console.log(json ? JSON.stringify(body, null, 2) : "[multipart form]");
    return null;
  }
  const res = await fetch(`${API}${path}`, {
    method: "POST",
    headers: { "xi-api-key": apiKey(), ...(json ? { "Content-Type": "application/json" } : {}) },
    body: json ? JSON.stringify(body) : body,
  });
  if (!res.ok) {
    const detail = (await res.text()).slice(0, 400);
    throw new Error(`ElevenLabs ${path} failed: HTTP ${res.status} ${detail}`);
  }
  return res;
}

async function saveAudio(res, out) {
  if (!res) return;
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, Buffer.from(await res.arrayBuffer()));
  console.log(`saved ${out}`);
}

async function music([planPath, out]) {
  if (!planPath || !out) throw new Error("usage: music <plan.json> <out.mp3>");
  const plan = JSON.parse(readFileSync(planPath, "utf8"));
  const total = plan.sections.reduce((s, x) => s + x.duration_ms, 0);
  console.log(`music: ${plan.sections.length} sections, ${(total / 1000).toFixed(1)}s requested ` +
    "(section lengths are not honoured exactly: fit the beat grid and arrange afterwards)");
  const res = await post("/music?output_format=mp3_44100_192", { composition_plan: plan, model_id: "music_v1" });
  await saveAudio(res, out);
}

async function sfx([listPath, outDir]) {
  if (!listPath || !outDir) throw new Error("usage: sfx <sfx.json> <out dir>");
  const list = JSON.parse(readFileSync(listPath, "utf8")).filter((s) => !only.length || only.includes(s.id));
  for (const s of list) {
    const out = join(outDir, `${s.id}.mp3`);
    if (existsSync(out) && !force) { console.log(`skip ${out} (exists; --force to redo)`); continue; }
    const res = await post("/sound-generation?output_format=mp3_44100_128", {
      text: s.prompt, duration_seconds: s.duration, prompt_influence: s.prompt_influence ?? 0.6,
    });
    await saveAudio(res, out);
  }
}

async function align([wav, textArg, out]) {
  if (!wav || !textArg || !out) throw new Error("usage: align <voice.wav> <text or @file.txt> <out.json>");
  const text = textArg.startsWith("@") ? readFileSync(textArg.slice(1), "utf8") : textArg;
  const form = new FormData();
  form.append("file", new Blob([readFileSync(wav)]), basename(wav));
  form.append("text", text);
  const res = await post("/forced-alignment", form, { json: false });
  if (!res) return;
  const data = await res.json();
  const words = data.words
    .filter((w) => /[\p{L}\p{N}]/u.test(w.text))
    .map((w) => [w.text.toLowerCase().replace(/[^\p{L}\p{N}'.]/gu, ""), +w.start.toFixed(3), +w.end.toFixed(3)]);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, JSON.stringify({ words }, null, 1));
  console.log(`aligned ${words.length} words -> ${out}`);
}

const commands = { music, sfx, align };
if (!commands[cmd]) {
  console.error("usage: elevenlabs.mjs <music|sfx|align> ... (see the header of this file)");
  process.exit(1);
}
commands[cmd](args).catch((e) => { console.error(e.message); process.exit(1); });
