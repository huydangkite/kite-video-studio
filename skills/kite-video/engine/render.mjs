// Kite Video Studio engine: renders a film page (window.seek(t), see runtime/kv.js) in headless Chromium
// through Playwright and encodes it with ffmpeg. The page lives in videos/<slug>/project/index.html; the whole
// video folder is served over a local HTTP server, so the page can read ../audio/timing.json and ../inputs/.
//
//   E=${CLAUDE_PLUGIN_ROOT}/skills/kite-video/engine
//   node $E/render.mjs init    videos/<slug>/project                       new project from the template
//   node $E/render.mjs serve   videos/<slug>/project                       live preview with a scrubber (prints a URL)
//   node $E/render.mjs stills  videos/<slug>/project --at=1.2,3.4 --out=review/stills        full-res PNGs
//   node $E/render.mjs sheet   videos/<slug>/project --every=0.5 --cols=6 --tw=270 --out=review/contact.png
//   node $E/render.mjs sheet   videos/<slug>/project --at=1,4.2,9 --cols=3 --tw=640 --out=review/beats.png
//   node $E/render.mjs strip   videos/<slug>/project --range=4.1:4.5 --cols=12 --tw=320 --out=review/strip-b3.png
//   node $E/render.mjs video   videos/<slug>/project --out=review/draft-1/draft.mp4 [--range=a:b] [--fps=30]
//                              [--sub=1] [--workers=4] [--audio=../audio/mix/mix.wav] [--crf=18]
//   node $E/render.mjs check   videos/<slug>/project                       page errors, missing files, determinism
//   node $E/render.mjs extract <clip.mp4> <out dir> [--fps=30] [--w=1920]  video → numbered JPEG frames for KV.clip()
//   node $E/render.mjs capture <url> <out dir> [--w=1440 --h=900] [--mobile]  screenshots (viewport, full page, 2x) and
//                              capture.json (title, colours, fonts, logo/image URLs, headings, buttons) of a public page
//
// Common flags: --format=16:9|9:16|1:1|4:5 (or --w=… --h=…), --quality=draft|final.
//   draft = 30 fps, no subframes;  final = 60 fps with 4 subframes blended (motion blur), CRF 16.
// Sheets and strips burn a small timecode into each tile so the critique can name exact seconds.
import { spawn, spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { createReadStream, existsSync, mkdirSync, mkdtempSync, readdirSync, rmSync, statSync, writeFileSync, cpSync } from "node:fs";
import { createServer } from "node:http";
import { createRequire } from "node:module";
import { homedir, tmpdir, cpus } from "node:os";
import { basename, dirname, extname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ENGINE = dirname(fileURLToPath(import.meta.url));
const [cmd, target, target2] = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const args = Object.fromEntries(process.argv.slice(2).filter((a) => a.startsWith("--"))
  .map((a) => { const [k, ...v] = a.slice(2).split("="); return [k, v.length ? v.join("=") : true]; }));

const FORMATS = { "16:9": [1920, 1080], "9:16": [1080, 1920], "1:1": [1080, 1080], "4:5": [1080, 1350] };
const QUALITY = { draft: { fps: 30, sub: 1, crf: 20 }, final: { fps: 60, sub: 4, crf: 16 } };
const q = QUALITY[args.quality || "draft"] || QUALITY.draft;
const [W, H] = args.w && args.h ? [+args.w, +args.h] : FORMATS[args.format || "16:9"] || FORMATS["16:9"];
const FPS = +(args.fps || q.fps), SUB = Math.max(1, +(args.sub || q.sub)), CRF = +(args.crf || q.crf);

const die = (msg) => { console.error(msg); process.exit(1); };
const run = (bin, a) => new Promise((ok, bad) => {
  const p = spawn(bin, a, { stdio: ["ignore", "inherit", "inherit"] });
  p.on("close", (c) => (c ? bad(new Error(`${bin} exited ${c}`)) : ok()));
});
const nums = (s) => String(s).split(",").filter(Boolean).map(Number);
const span = (s) => String(s).split(":").map(Number);

// ---------- commands that need no browser ----------
if (cmd === "init") {
  if (!target) die("usage: render.mjs init <videos/<slug>/project>");
  const dest = resolve(target);
  if (existsSync(join(dest, "index.html"))) die(`${dest} already has an index.html; init only creates new projects`);
  cpSync(join(ENGINE, "template"), dest, { recursive: true, force: false }); // keeps assets already extracted there
  console.log(`created ${dest} (index.html, style.css, scenes/, assets/). Preview: node ${join(ENGINE, "render.mjs")} serve ${target}`);
  process.exit(0);
}
if (cmd === "extract") {
  if (!target || !target2) die("usage: render.mjs extract <clip.mp4> <out dir> [--fps=30] [--w=1920]");
  mkdirSync(target2, { recursive: true });
  await run("ffmpeg", ["-y", "-loglevel", "error", "-i", target, "-vf", `fps=${args.fps || 30},scale=${args.w || 1920}:-2`,
    "-q:v", "3", join(target2, "f%05d.jpg")]);
  const n = readdirSync(target2).filter((f) => f.endsWith(".jpg")).length;
  const rel = resolve(target2).split(`${sep}project${sep}`).pop().split(sep).join("/");
  console.log(`${n} frames → ${target2}  (in a scene: KV.clip("${rel}", { fps: ${args.fps || 30}, count: ${n} }))`);
  process.exit(0);
}

if (cmd === "capture") {
  if (!target || !target2) die("usage: render.mjs capture <url> <out dir> [--w=1440 --h=900] [--mobile]");
  const chromium = await loadPlaywright(), browser = await chromium.launch();
  const mobile = !!args.mobile, vw = +(args.w || (mobile ? 390 : 1440)), vh = +(args.h || (mobile ? 844 : 900));
  const page = await browser.newPage({ viewport: { width: vw, height: vh }, deviceScaleFactor: 2, isMobile: mobile });
  const resp = await page.goto(target, { waitUntil: "networkidle", timeout: 60000 }).catch((e) => die(`could not open ${target}: ${e.message}`));
  await page.waitForTimeout(800);
  mkdirSync(target2, { recursive: true });
  const tag = mobile ? "mobile" : "desktop";
  await page.screenshot({ path: join(target2, `${tag}-viewport.png`) });
  await page.screenshot({ path: join(target2, `${tag}-full.png`), fullPage: true });
  const info = await page.evaluate(() => {
    const cs = (el) => el && getComputedStyle(el), pick = (sel) => [...document.querySelectorAll(sel)];
    const colors = {}, fonts = {};
    for (const el of pick("body, h1, h2, h3, p, a, button, [class*=btn], nav, header, footer").slice(0, 400)) {
      const s = cs(el);
      for (const c of [s.color, s.backgroundColor]) if (c && !/rgba\(0, 0, 0, 0\)/.test(c)) colors[c] = (colors[c] || 0) + 1;
      fonts[s.fontFamily.split(",")[0].trim()] = (fonts[s.fontFamily.split(",")[0].trim()] || 0) + 1;
    }
    const top = (o) => Object.entries(o).sort((a, b) => b[1] - a[1]).slice(0, 12).map(([k, n]) => ({ value: k, count: n }));
    return {
      title: document.title, url: location.href,
      description: document.querySelector("meta[name=description]")?.content || "",
      colors: top(colors), fonts: top(fonts),
      logos: pick("img, svg").filter((e) => /logo|brand/i.test(e.outerHTML.slice(0, 300))).slice(0, 8)
        .map((e) => e.tagName === "IMG" ? e.currentSrc || e.src : "inline <svg> (" + (e.getAttribute("class") || "") + ")"),
      icons: pick("link[rel*=icon]").map((l) => l.href),
      images: pick("img").map((i) => i.currentSrc || i.src).filter(Boolean).slice(0, 40),
      headings: pick("h1, h2").map((h) => h.innerText.trim()).filter(Boolean).slice(0, 20),
      buttons: pick("button, a[class*=btn], a[class*=button]").map((b) => b.innerText.trim()).filter(Boolean).slice(0, 20),
    };
  });
  info.status = resp ? resp.status() : null;
  writeFileSync(join(target2, `capture-${tag}.json`), JSON.stringify(info, null, 1));
  console.log(`captured ${target} (HTTP ${info.status}) → ${target2}: ${tag}-viewport.png, ${tag}-full.png, capture-${tag}.json`);
  await browser.close();
  process.exit(0);
}

// ---------- browser commands ----------
if (!["serve", "stills", "sheet", "strip", "video", "check"].includes(cmd) || !target)
  die("usage: see the header of render.mjs (init | serve | stills | sheet | strip | video | check | extract | capture)");
const PROJECT = resolve(target);
if (!existsSync(join(PROJECT, "index.html"))) die(`no index.html in ${PROJECT} (create one with: render.mjs init ${target})`);
const ROOT = resolve(args.root || dirname(PROJECT)); // the video folder

const MIME = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".mjs": "text/javascript", ".css": "text/css",
  ".json": "application/json", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp",
  ".svg": "image/svg+xml", ".gif": "image/gif", ".woff2": "font/woff2", ".woff": "font/woff", ".ttf": "font/ttf", ".otf": "font/otf",
  ".wav": "audio/wav", ".mp3": "audio/mpeg", ".m4a": "audio/mp4", ".mp4": "video/mp4", ".webm": "video/webm" };
const missing = new Set();
const server = createServer((req, res) => {
  const url = new URL(req.url, "http://x"), path = decodeURIComponent(url.pathname);
  const [base, rel] = path.startsWith("/kv/") ? [join(ENGINE, "runtime"), path.slice(4)] : [ROOT, path.slice(1)];
  const file = resolve(base, rel);
  if (!file.startsWith(base + sep) && file !== base) { res.writeHead(403).end(); return; }
  if (!existsSync(file) || statSync(file).isDirectory()) {
    if (url.searchParams.has("optional")) { res.writeHead(204).end(); return; } // e.g. timing.json before the voice exists
    missing.add(path); res.writeHead(404).end(); return;
  }
  res.writeHead(200, { "Content-Type": MIME[extname(file).toLowerCase()] || "application/octet-stream", "Cache-Control": "no-store" });
  createReadStream(file).pipe(res);
});
await new Promise((ok) => server.listen(+(args.port || 0), "127.0.0.1", ok));
const pageUrl = (extra = "") =>
  `http://127.0.0.1:${server.address().port}/${relative(ROOT, PROJECT).split(sep).join("/")}/index.html?w=${W}&h=${H}${extra}`;

if (cmd === "serve") {
  console.log(`preview: ${pageUrl()}   (Ctrl+C to stop; space = play/pause, ←/→ = one frame)`);
  await new Promise(() => {});
}

const chromium = await loadPlaywright();
const browser = await chromium.launch({ args: ["--disable-renderer-backgrounding", "--disable-background-timer-throttling",
  "--force-color-profile=srgb", "--hide-scrollbars", "--font-render-hinting=none"] });
const errors = [];

async function openPage(extra = "") {
  const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
  page.on("pageerror", (e) => errors.push(`page error: ${e.message}`));
  page.on("console", (m) => { if (m.type() === "error") errors.push(`console: ${m.text()}`); });
  await page.goto(pageUrl(`&render=1${extra}`), { waitUntil: "load" });
  try {
    await page.waitForFunction("window.__kv && (window.__kv.ready || window.__kv.failed)", null, { timeout: 120000 });
  } catch { die(`the page never called KV.start() (errors: ${errors.join(" | ") || "none"})`); }
  const failed = await page.evaluate(() => window.__kv.failed);
  if (failed) die(`the page failed to start: ${failed}`);
  return page;
}
const frame = async (page, t, type = "jpeg") => {
  await page.evaluate((t) => window.__kv.seek(t), t);
  return page.screenshot({ type, ...(type === "jpeg" ? { quality: 94 } : {}), caret: "hide", animations: "allow" });
};
const durationOf = (page) => page.evaluate(() => window.__kv.duration);
const tmp = () => mkdtempSync(join(tmpdir(), "kv-"));
const report = () => {
  for (const m of missing) errors.push(`missing file: ${m}`);
  if (errors.length) console.log(`⚠️  ${errors.length} problem(s):\n  ` + [...new Set(errors)].slice(0, 20).join("\n  "));
};

async function tile(files, out, cols, tw) {
  const dir = tmp();
  files.forEach((f, i) => cpSync(f, join(dir, `t${String(i).padStart(4, "0")}.jpg`)));
  const rows = Math.ceil(files.length / cols);
  mkdirSync(dirname(resolve(out)), { recursive: true });
  await run("ffmpeg", ["-y", "-loglevel", "error", "-framerate", "1", "-i", join(dir, "t%04d.jpg"),
    "-vf", `scale=${tw}:-2,pad=iw+4:ih+4:2:2:color=0x808080,tile=${cols}x${rows}`, "-frames:v", "1", out]);
  rmSync(dir, { recursive: true, force: true });
}

async function renderTimes(times, { label = false } = {}) {
  const page = await openPage(label ? "&label=1" : ""), dir = tmp(), files = [];
  for (const [i, t] of times.entries()) {
    const f = join(dir, `f${String(i).padStart(5, "0")}.jpg`);
    writeFileSync(f, await frame(page, t)); files.push(f);
  }
  await page.close();
  return { dir, files };
}

try {
  if (cmd === "stills") {
    const out = resolve(args.out || join(PROJECT, "..", "review", "stills")); mkdirSync(out, { recursive: true });
    const page = await openPage();
    for (const t of nums(args.at || "0")) {
      const f = join(out, `t${t.toFixed(2).replace(".", "_")}.png`);
      writeFileSync(f, await frame(page, t, "png")); console.log(f);
    }
  } else if (cmd === "sheet") {
    const page = await openPage(), dur = await durationOf(page); await page.close();
    let times;
    if (args.at) times = nums(args.at);
    else {
      const every = +(args.every || 0.5), [a, b] = args.range ? span(args.range) : [0, dur];
      times = []; for (let t = a; t < b - 1e-6; t += every) times.push(+t.toFixed(3));
    }
    const { dir, files } = await renderTimes(times, { label: true });
    const out = args.out || join(PROJECT, "..", "review", "contact.png");
    await tile(files, out, +(args.cols || 6), +(args.tw || 270));
    rmSync(dir, { recursive: true, force: true });
    console.log(`${out}  (${times.length} frames, ${times[0]}–${times.at(-1)}s)`);
  } else if (cmd === "strip") {
    if (!args.range) die("strip needs --range=a:b (seconds)");
    const [a, b] = span(args.range), times = [];
    for (let i = Math.round(a * FPS); i <= Math.round(b * FPS); i++) times.push(i / FPS);
    const { dir, files } = await renderTimes(times, { label: true });
    const out = args.out || join(PROJECT, "..", "review", `strip-${a}.png`);
    await tile(files, out, +(args.cols || (times.length <= 16 ? times.length : 12)), +(args.tw || 320));
    rmSync(dir, { recursive: true, force: true });
    console.log(`${out}  (${times.length} consecutive frames at ${FPS} fps)`);
  } else if (cmd === "video") {
    const probe = await openPage(), dur = await durationOf(probe); await probe.close();
    const [a, b] = args.range ? span(args.range) : [0, dur];
    const rate = FPS * SUB, n = Math.round((b - a) * rate), dir = tmp();
    const workers = Math.max(1, Math.min(+(args.workers || Math.max(2, Math.min(6, cpus().length - 2))), n));
    console.log(`${n} frames (${(b - a).toFixed(2)}s × ${FPS} fps × ${SUB} sub) with ${workers} workers, ${W}×${H}`);
    let next = 0, done = 0; const start = Date.now();
    await Promise.all(Array.from({ length: workers }, async () => {
      const page = await openPage();
      while (next < n) {
        const i = next++;
        writeFileSync(join(dir, `f${String(i).padStart(6, "0")}.jpg`), await frame(page, a + i / rate));
        if (++done % (rate * 2) === 0 || done === n) {
          const s = (Date.now() - start) / 1000;
          console.log(`  ${done}/${n}  ${((s / done) * 1000).toFixed(0)} ms/frame  eta ${((n - done) * s / done / 60).toFixed(1)} min`);
        }
      }
      await page.close();
    }));
    const out = resolve(args.out || join(PROJECT, "..", "review", "draft.mp4")); mkdirSync(dirname(out), { recursive: true });
    const blend = SUB > 1 ? [`tmix=frames=${SUB}`, `select='eq(mod(n\\,${SUB})\\,${SUB - 1})'`, `setpts=N/${FPS}/TB`] : [];
    const audio = args.audio ? resolve(PROJECT, args.audio) : null;
    if (audio && !existsSync(audio)) die(`audio not found: ${audio}`);
    await run("ffmpeg", ["-y", "-loglevel", "error", "-framerate", String(rate), "-i", join(dir, "f%06d.jpg"),
      ...(audio ? ["-ss", String(a), "-t", String(b - a), "-i", audio, "-map", "0:v", "-map", "1:a", "-c:a", "aac", "-b:a", "256k"] : []),
      ...(blend.length ? ["-vf", blend.join(",")] : []), "-r", String(FPS),
      "-c:v", "libx264", "-preset", args.quality === "final" ? "slow" : "medium", "-crf", String(CRF), "-pix_fmt", "yuv420p",
      "-movflags", "+faststart", out]);
    rmSync(dir, { recursive: true, force: true });
    console.log(`wrote ${out}  (${((Date.now() - start) / 1000).toFixed(0)}s)`);
  } else if (cmd === "check") {
    const page = await openPage(), dur = await durationOf(page);
    const ts = args.at ? nums(args.at) : [0.25, 0.5, 0.75].map((f) => +(dur * f).toFixed(2));
    const hash = (buf) => createHash("md5").update(buf).digest("hex");
    const first = []; for (const t of ts) first.push(hash(await frame(page, t, "png")));
    await frame(page, 0, "png");                       // jump back to the start, then seek again in reverse order
    const second = []; for (const t of [...ts].reverse()) second.unshift(hash(await frame(page, t, "png")));
    const bad = ts.filter((_, i) => first[i] !== second[i]);
    console.log(`duration ${dur}s · ${W}×${H}`);
    console.log(bad.length ? `❌ not deterministic at ${bad.join(", ")}s (state carried between frames, timers or Math.random)`
      : `✅ deterministic at ${ts.join(", ")}s`);
    if (bad.length) errors.push("determinism");
  }
} finally {
  report();
  await browser.close();
  server.close();
}
process.exit(errors.length && cmd === "check" ? 1 : 0);

// Playwright is installed by /kite-video:setup into the plugin's data folder (it survives plugin updates).
async function loadPlaywright() {
  const dirs = [process.env.KV_ENGINE_DEPS, process.env.CLAUDE_PLUGIN_DATA && join(process.env.CLAUDE_PLUGIN_DATA, "engine"), ENGINE];
  for (const cfg of [".claude", ".claude-k"]) {
    const base = join(homedir(), cfg, "plugins", "data");
    if (existsSync(base)) for (const d of readdirSync(base)) if (d.startsWith("kite-video")) dirs.push(join(base, d, "engine"));
  }
  dirs.push(join(homedir(), ".kite-video", "engine"));
  for (const d of dirs.filter(Boolean)) {
    try {
      const path = createRequire(join(d, "package.json")).resolve("playwright");
      const m = await import(pathToFileURL(path).href);
      return m.chromium || m.default.chromium;
    } catch {}
  }
  try { const m = await import("playwright"); return m.chromium || m.default.chromium; } catch {}
  die("Playwright is not installed. Run /kite-video:setup (it installs the engine into the plugin's data folder).");
}
