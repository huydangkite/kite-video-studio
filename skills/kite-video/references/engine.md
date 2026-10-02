# The engine — a film is a function of time

The studio renders films the way the course's best work did: Claude writes the film as code, one
function paints the exact frame for any moment, a headless browser screenshots each frame, ffmpeg
stitches them. Nothing depends on a timer, so a render is identical every run and a change is an edit
plus a re-render. No framework is required, and none is used by default.

```
E="${CLAUDE_PLUGIN_ROOT}/skills/kite-video/engine"     # render.mjs, runtime/kv.js, template/
```

## Project layout (one per video)

```
videos/<slug>/
  audio/timing.json        the clock: per beat start, end, words (video-engineer, audio task)
  audio/mix.wav            the mix (scripts/mix.mjs)
  inputs/                  the colleague's files
  project/
    index.html             KV.start({...}) — timing, background, fonts, the scene modules
    style.css              tokens from style_guide.md + brand (colours, faces, shared classes)
    ANIMATION_GUIDE.md     written with the hero beat: the composition language every chapter follows
    scenes/ch1.js …        one module per chapter (so chapters build in parallel)
    assets/images|fonts|clips/
```

`node "$E/render.mjs" init videos/<slug>/project` creates it from the template.

## Scene contract (`runtime/kv.js`)

```js
import { el, tf, sp, track, range, clamp, stagger, swapAlpha, indicator, rng, canvas, img, clip } from "/kv/kv.js";
export default ({ T, W, H, u, portrait }) => [{
  id: "b4-export", from: T.beat(4).start, to: T.beat(4).end,
  setup(root) { /* build DOM once: real UI rebuilt in HTML, images, a canvas layer */ },
  draw(t, g) { /* set styles for local time t (g = film time); nothing else */ },
}];
```

- **Time:** `T.beat(n)` → `{start, end, words}`; `T.word("xuất pdf", 4)` → when that word starts.
  Anchor every reveal to a word.
- **Motion:** `sp(t - t0, "snappy"|"default"|"heavy"|"playful")`, `spring(t, k, d)`, `track(t, keys,
  tier)`, `indicator`, `swapAlpha`, `range(t, a, b)`, `ease.*` for non-physical fades, `stagger(i)`,
  `rng(seed)`. Tiers and rules: `motion-rules.md`.
- **Layout:** `W`, `H`, `u` (1% of the short side), `portrait`. Positions as fractions of `W`/`H`,
  sizes in `u`, so `--format=9:16` re-lays out instead of cropping.
- **Building:** `el(tag, {class, text, style}, parent)`, `tf(node, {x, y, s, r})`, `img(src)`
  (preloaded), `canvas(root)` (a full-frame 2D context), `clip(dir, {fps, count})` for video
  (frames from `render.mjs extract`; call `.at(t)` in draw).
- Scenes may overlap in time (transitions); `z` sets the stacking order.
- Never: timers, `requestAnimationFrame`, CSS transitions/animations, `Math.random`, `<video>`,
  state carried from one `draw` to the next.

## Commands

| Command | What it does |
|---|---|
| `render.mjs serve <project>` | Live preview with scrubber, play/pause (space), frame step (←/→), audio |
| `render.mjs stills <project> --at=1.2,3.4 --out=<dir>` | Full-resolution PNGs |
| `render.mjs sheet <project> --every=0.5 [--range=a:b] --cols=6 --tw=270 --out=<png>` | Contact sheet with timecodes |
| `render.mjs sheet <project> --at=<mid of every beat> --cols=4 --tw=480 --out=<png>` | One frame per beat |
| `render.mjs strip <project> --range=4.1:4.5 --tw=320 --out=<png>` | Every frame of a moment: the only still that shows motion |
| `render.mjs video <project> --out=<mp4> [--range=a:b] [--audio=../audio/mix.wav]` | Draft: 30 fps; `--quality=final` = 60 fps × 4 subframes blended (motion blur), CRF 16 |
| `render.mjs check <project>` | Page errors, missing files, determinism (same frame twice → same pixels) |
| `render.mjs capture <url> <dir> [--mobile]` | Screenshots + colours, fonts, logos, headings of a public page |
| `render.mjs extract <clip.mp4> <project>/assets/clips/<name>` | A recording or AI clip as frames for `clip()` |

Every command takes `--format=16:9|9:16|1:1|4:5`. Sheets, strips and stills render straight from the
page, so a critique round needs no video render at all; a range render (`--range`) re-renders only the
seconds that changed. Speed on a Mac: ~10 ms per frame with 6 workers, so a 60s draft renders in about
20 seconds and a final in a few minutes.

## Fonts and assets

- Fonts as files in `project/assets/fonts/` (`@font-face` in `style.css`), with the Vietnamese
  glyphs; list them in `KV.start({ fonts: [...] })` so the render waits for them. Google Fonts work
  too but need the network at render time.
- Logos as the real file (SVG or PNG) from `brand/` or the capture; never redrawn.
- Screen recordings and AI clips: `render.mjs extract` into `assets/clips/<name>`.

## HyperFrames — optional, only when it earns its place

HyperFrames is not installed or loaded by default. Use it only when one of these is true, and say why
in `PROMPT.md`:
- the colleague asks for it, or brings a HyperFrames project to revise;
- a specific HyperFrames registry block or blueprint is clearly the fastest way to a shot (then build
  that shot in HyperFrames, render it to a clip, and bring it in with `render.mjs extract` + `clip()`);
- word timings are needed with no ElevenLabs key (`npx hyperframes transcribe` runs locally).

Setup installs it only with `/kite-video:setup hyperframes`. Several Kite films looked worse in
HyperFrames than written directly by Claude; the default is the engine above.
