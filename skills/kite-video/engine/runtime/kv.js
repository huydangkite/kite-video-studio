// kv.js — the Kite Video Studio runtime. A film is a pure function of time: KV.seek(t) paints frame t.
// Served at /kv/kv.js by render.mjs. Import it from the project's index.html:
//
//   import * as KV from "/kv/kv.js";
//   await KV.start({ duration: 30, background: "#0B0B0F", audio: "../audio/mix/mix.wav",
//                    timing: "../audio/timing.json", scenes: ["./scenes/ch1.js", "./scenes/ch2.js"] });
//
// A scene module default-exports a function that returns scenes:
//   export default ({ T, W, H, u }) => [{ id: "b1", from: 0, to: T.beat(1).end, setup(root) {…}, draw(t, g) {…} }];
// setup(root) builds DOM once (root = an absolutely positioned W×H div); draw(t, g) sets styles for local time t
// (g = global time). Never use timers, CSS transitions/animations, requestAnimationFrame or Math.random in a scene.

// ---------------- motion ----------------
export const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
export const lerp = (a, b, p) => a + (b - a) * p;
/** 0→1 progress of t through [a, b], clamped. */
export const range = (t, a, b) => clamp((t - a) / (b - a));

/** Closed-form damped spring, 0 → 1, pure function of time (seconds since the move started). */
export function spring(t, k = 170, d = 26) {
  if (t <= 0) return 0;
  const w0 = Math.sqrt(k), z = d / (2 * w0);
  if (z < 1) {
    const wd = w0 * Math.sqrt(1 - z * z);
    return 1 - Math.exp(-z * w0 * t) * (Math.cos(wd * t) + ((z * w0) / wd) * Math.sin(wd * t));
  }
  return 1 - Math.exp(-w0 * t) * (1 + w0 * t); // z ≥ 1 treated as critically damped
}
/** Spring tiers (stiffness, damping). See references/motion-rules.md. */
export const TIER = { snappy: [320, 30], default: [170, 26], heavy: [90, 20], playful: [220, 14], trail: [140, 22] };
const kd = (tier) => (Array.isArray(tier) ? tier : TIER[tier] || TIER.default);
/** Spring by tier name: sp(t - start, "snappy"). */
export const sp = (t, tier = "default") => spring(t, ...kd(tier));
/** Value with several targets: keys = [[time, value], …] sorted by time. One spring per change, never restarted. */
export function track(t, keys, tier = "default") {
  let v = keys[0][1];
  for (let i = 1; i < keys.length; i++) v += (keys[i][1] - keys[i - 1][1]) * spring(t - keys[i][0], ...kd(tier));
  return v;
}
/** Tab indicator that stretches: leading edge snappy, trailing edge softer. stops = [[time, x], …]. */
export function indicator(t, stops, width) {
  const lead = track(t, stops, "snappy"), trail = track(t, stops, "trail");
  return { left: Math.min(lead, trail), right: Math.max(lead, trail) + width };
}
/** Opacity of text inside a morphing box: in ~0.08s after the morph starts, out ~0.1s before the next one. */
export const swapAlpha = (t, tIn, tOut) => Math.min(clamp((t - tIn - 0.08) / 0.12), clamp((tOut - 0.1 - t) / 0.1));
/** Seamless loop time. */
export const loopT = (t, dur) => ((t % dur) + dur) % dur;
/** Seeded random (mulberry32): const r = rng(7); r() → [0, 1). */
export function rng(seed) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let x = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x;
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}
/** Fixed curves for things that are not physical (colour, opacity, a camera hold). */
export const ease = {
  out3: (p) => 1 - Math.pow(1 - clamp(p), 3),
  out4: (p) => 1 - Math.pow(1 - clamp(p), 4),
  inOut: (p) => { p = clamp(p); return p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2; },
  in2: (p) => clamp(p) ** 2,
};
/** Stagger offset for item i of a group (40–80 ms is the house range). */
export const stagger = (i, step = 0.06) => i * step;

// ---------------- stage, layout, assets ----------------
const params = new URLSearchParams(location.search);
export const RENDER = params.has("render");
export const W = +(params.get("w") || 1920), H = +(params.get("h") || 1080);
/** 1u = 1% of the short side; write sizes in u and positions as fractions of W/H so every format re-lays out. */
export const u = Math.min(W, H) / 100;
export const portrait = H > W;
export const ratio = W / H;

const pending = new Set();
const track_ = (p) => { pending.add(p); p.finally(() => pending.delete(p)); return p; };

/** Preloaded image element (relative to index.html). */
export function img(src, attrs = {}) {
  const el = new Image();
  Object.assign(el, attrs);
  el.decoding = "sync";
  track_(new Promise((ok) => { el.onload = ok; el.onerror = () => { console.error(`image not found: ${src}`); ok(); }; }));
  el.src = src;
  return el;
}
/** A video clip as numbered frames (render.mjs extract clip.mp4 assets/clips/x): clip("assets/clips/x", {fps, count}). */
export function clip(dir, { fps = 30, count, ext = "jpg", loop = false } = {}) {
  const el = new Image(); el.decoding = "sync";
  const cache = new Map();
  let shown = -1;
  return {
    el,
    duration: count / fps,
    /** Show the frame for clip-local time t (seconds). */
    at(t) {
      let i = Math.floor(t * fps + 1e-6);
      i = loop ? ((i % count) + count) % count : Math.max(0, Math.min(count - 1, i));
      if (i === shown) return;
      shown = i;
      const src = `${dir}/f${String(i + 1).padStart(5, "0")}.${ext}`;
      el.src = src;
      track_(el.decode().catch(() => console.error(`clip frame not found: ${src}`)));
      if (!cache.has(i + 1) && i + 1 < count) { const n = new Image(); n.src = `${dir}/f${String(i + 2).padStart(5, "0")}.${ext}`; cache.set(i + 1, n); }
    },
  };
}
/** A full-frame canvas layer inside a scene root; returns the 2D context (drawn as a pure function of t). */
export function canvas(root, { w = W, h = H } = {}) {
  const c = document.createElement("canvas");
  c.width = w; c.height = h;
  Object.assign(c.style, { position: "absolute", left: 0, top: 0, width: `${W}px`, height: `${H}px` });
  root.appendChild(c);
  return c.getContext("2d");
}
/** Create an element with styles: el("div", { class: "card", style: {…}, text: "…" }, parent). */
export function el(tag, opts = {}, parent) {
  const e = document.createElement(tag);
  if (opts.class) e.className = opts.class;
  if (opts.text != null) e.textContent = opts.text;
  if (opts.html != null) e.innerHTML = opts.html;
  if (opts.style) Object.assign(e.style, opts.style);
  for (const [k, v] of Object.entries(opts.attrs || {})) e.setAttribute(k, v);
  if (parent) parent.appendChild(e);
  return e;
}
/** Set a transform from parts: tf(node, { x, y, s, r, sx, sy }) — px and degrees. */
export function tf(node, { x = 0, y = 0, s = 1, sx = s, sy = s, r = 0 } = {}) {
  node.style.transform = `translate(${x}px, ${y}px) rotate(${r}deg) scale(${sx}, ${sy})`;
}

// ---------------- timing (the voice is the clock) ----------------
/** Timing from audio/timing.json: T.beat(n) → {start, end, words}; T.word("đồng bộ", n?) → time of the word. */
export function timing(data) {
  const beats = (data && data.beats) || [];
  const norm = (s) => String(s).toLowerCase().normalize("NFC").replace(/[^\p{L}\p{N}' ]/gu, "").trim();
  const beat = (n) => {
    const b = beats.find((x) => String(x.beat ?? x.id) === String(n)) || beats[n - 1];
    if (!b) throw new Error(`beat ${n} is not in timing.json`);
    return b;
  };
  return {
    data, beats, beat,
    duration: data && data.duration != null ? data.duration : beats.length ? beats.at(-1).end : null,
    /** Start time of a word or phrase, in film time. n = beat to search (default all); nth = which occurrence. */
    word(text, n, nth = 0, which = "start") {
      const want = norm(text).split(/\s+/);
      const pool = n != null ? [beat(n)] : beats;
      let found = 0;
      for (const b of pool) {
        const ws = b.words || [];
        for (let i = 0; i + want.length <= ws.length; i++) {
          if (want.every((w, j) => norm(ws[i + j][0]) === w)) {
            if (found++ === nth) return which === "end" ? ws[i + want.length - 1][2] : ws[i][1];
          }
        }
      }
      throw new Error(`word "${text}" not found${n != null ? ` in beat ${n}` : ""}`);
    },
  };
}

// ---------------- the film ----------------
let scenes = [], duration = 0, stage, labelEl;

async function seek(t) {
  for (const s of scenes) {
    const on = t >= s.from && t < s.to;
    if (on !== s.on) { s.root.style.visibility = on ? "visible" : "hidden"; s.on = on; }
    if (on && s.draw) s.draw(t - s.from, t);
  }
  if (labelEl) labelEl.textContent = t.toFixed(2) + "s";
  if (pending.size) await Promise.all([...pending]);
  return true;
}

/**
 * Start the film. config: { duration?, background?, timing?: url, audio?: url (preview only), scenes: [module urls],
 * fonts?: [css font strings to wait for, e.g. '700 64px "Inter Tight"'] }
 */
export async function start(config) {
  window.__kv = { ready: false, failed: null, seek, duration: 0 };
  try {
    const T = timing(config.timing ? await fetch(config.timing + (config.timing.includes("?") ? "&" : "?") + "optional")
      .then((r) => (r.status === 200 ? r.json() : null)) : null);
    duration = T.duration ?? config.duration ?? 10; // the voice wins once timing.json exists
    document.documentElement.style.background = "#111";
    stage = el("div", { attrs: { id: "stage" }, style: {
      position: "relative", width: `${W}px`, height: `${H}px`, overflow: "hidden", background: config.background || "#000",
      transformOrigin: "0 0" } }, document.body);
    Object.assign(document.body.style, { margin: 0, overflow: "hidden" });
    if (params.has("label")) labelEl = el("div", { style: { position: "absolute", right: `${u}px`, bottom: `${u}px`, zIndex: 9999,
      font: `600 ${Math.round(2.6 * u)}px ui-monospace, Menlo, monospace`, color: "#fff", background: "rgba(0,0,0,.65)",
      padding: `${0.3 * u}px ${0.8 * u}px`, borderRadius: `${0.4 * u}px` } }, stage);
    const ctx = { T, W, H, u, portrait, ratio, duration };
    for (const url of config.scenes || []) {
      const mod = await import(new URL(url, location.href).href);
      const list = await (typeof mod.default === "function" ? mod.default(ctx) : mod.default);
      for (const s of [].concat(list || [])) {
        s.root = el("div", { class: `scene scene-${s.id || scenes.length}`, style: {
          position: "absolute", inset: 0, visibility: "hidden", zIndex: String(s.z ?? scenes.length) } }, stage);
        if (labelEl) stage.appendChild(labelEl);
        s.on = false;
        if (s.setup) await s.setup(s.root, ctx);
        scenes.push(s);
      }
    }
    await document.fonts.ready;
    for (const f of config.fonts || []) if (!document.fonts.check(f)) { await document.fonts.load(f); if (!document.fonts.check(f)) console.error(`font not loaded: ${f}`); }
    if (pending.size) await Promise.all([...pending]);
    window.__kv.duration = duration;
    await seek(0);
    window.__kv.ready = true;
    if (!RENDER) preview(config);
    return ctx;
  } catch (e) {
    console.error(e);
    window.__kv.failed = String(e && e.message || e);
    throw e;
  }
}

// ---------------- preview (normal browser only) ----------------
function preview(config) {
  const fit = () => {
    const s = Math.min(innerWidth / W, (innerHeight - 56) / H);
    stage.style.transform = `scale(${s})`;
    document.body.style.height = `${innerHeight}px`;
  };
  addEventListener("resize", fit); fit();
  const bar = el("div", { style: { position: "fixed", left: 0, right: 0, bottom: 0, height: "56px", display: "flex", gap: "12px",
    alignItems: "center", padding: "0 16px", background: "#1b1b1f", color: "#eee", font: "13px ui-monospace, Menlo, monospace" } }, document.body);
  const btn = el("button", { text: "▶", style: { width: "40px", height: "32px", font: "16px sans-serif", cursor: "pointer" } }, bar);
  const bar_ = el("input", { attrs: { type: "range", min: 0, max: duration, step: 1 / 60, value: 0 }, style: { flex: 1 } }, bar);
  const tc = el("span", { text: "0.00s" }, bar);
  const audio = config.audio ? new Audio(config.audio) : null;
  let playing = false, t0 = 0, at = 0;
  const show = (t) => { at = t; bar_.value = t; tc.textContent = `${t.toFixed(2)}s / ${duration.toFixed(2)}s`; seek(t); };
  const loop = (now) => {
    if (!playing) return;
    const t = audio && !audio.paused ? audio.currentTime : (now - t0) / 1000;
    if (t >= duration) { playing = false; btn.textContent = "▶"; audio && audio.pause(); show(0); return; }
    show(t); requestAnimationFrame(loop);
  };
  const toggle = () => {
    playing = !playing; btn.textContent = playing ? "❚❚" : "▶";
    if (playing) { t0 = performance.now() - at * 1000; if (audio) { audio.currentTime = at; audio.play().catch(() => {}); } requestAnimationFrame(loop); }
    else audio && audio.pause();
  };
  btn.onclick = toggle;
  bar_.oninput = () => { if (playing) toggle(); show(+bar_.value); };
  addEventListener("keydown", (e) => {
    if (e.code === "Space") { e.preventDefault(); toggle(); }
    if (e.code === "ArrowRight") show(Math.min(duration, at + 1 / 30));
    if (e.code === "ArrowLeft") show(Math.max(0, at - 1 / 30));
  });
  show(0);
}
