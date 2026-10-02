# Motion rules — the studio's quality bar for movement

This file is the bar for *how things move* and what we never do. Director and motion designer read
it; the brief quotes the parts that apply. The engine is described in `engine.md`; this file says
what to build with it.

## Banned look (the model's defaults — reject on sight)

- Centered title on a gradient background.
- Everything fading in; opacity as the only motion.
- Corner labels, frame borders, "HUD" decoration. (A step counter or caption is part of the layout —
  docked to the UI panel or the caption band — never a label floating in a frame corner.)
- Glow, bloom or gradients on UI chrome; generic particle bursts.
- Bouncy / elastic easing on text; visible overshoot on type.
- Screenshots pasted flat. **Break a screenshot into components** (cards, buttons, icons, text
  blocks) — ideally rebuilt in HTML from the real screen, values checked against the source — and
  animate those; keep the flat screenshot only for a "this is the real product" moment.
- Small moves that read as PowerPoint: a 1.00→1.02 push, a 20px slide. A camera move is big enough to
  be felt (≥ 6–10% scale, or a real reframe) or it is not there.

## Motion has mass — spring tiers

Cheap motion eases A→B on a fixed curve; expensive motion accelerates, overshoots a hair, settles.
Map every moving element to one tier. Use the **closed-form springs in `kv.js`** (`sp(t, tier)`,
`spring(t, k, d)`): a pure function of time, so any frame renders without simulating the ones before
it.

| Tier | Use for | Spring (k/d) | Measured feel (`kv.js`) |
|---|---|---|---|
| Snappy | buttons, toggles, cursors, leading edges | k320 d30 | 95% at 0.20s, settled 0.24s, ~1% overshoot |
| Default | cards, containers, camera | k170 d26 | 95% at 0.36s, settled 0.51s, no overshoot |
| Heavy | big type, device frames, logo lockups | k90 d20 | 95% at 0.50s, settled 0.70s, none |
| Playful | mascots, stickers, emoji-like accents only | k220 d14 | settled 0.59s, ~19% overshoot (cartoon on purpose) |

- Overshooting springs go on transforms only, never on opacity or colour (`clamp()` the opacity
  separately). No overshoot on type.
- **Tab stretch:** `indicator(t, stops, width)` — leading edge Snappy, trailing edge k140 d22, so the
  indicator stretches, then settles.
- **A value with several targets** (cursor, container size, camera) never restarts from rest:
  `track(t, [[t0, v0], [t1, v1], …], tier)` sums one spring per change, each starting at its own time.
- **Text inside a morphing container**: `swapAlpha(t, tIn, tOut)` — in ~0.08s after the morph starts
  (over ~0.12s), out ~0.1s before the next morph. Text never overlaps during a swap.
- Stagger groups by 40–80 ms (`stagger(i)`); one element leads, the rest follow.
- Motion blur comes from the final render's subframes (60 fps × 4, `engine.md`); never blur readable
  text by hand.

## Pacing (the one place these numbers live)

| Kind | Hook | Something new on screen | Beat length |
|---|---|---|---|
| Marketing | first 2s | every 2–4s | 2–4s |
| Feature demo | first 2s | every 3–5s (within a step: the click, the result) | one step per beat, 4–7s |
| Case study | first 2s | every 3–5s | 4–6s, fewer cuts — keep one stage and move the camera |

- Text arrives *after* the motion starts and leaves *before* the next move.
- Cut on voice pauses; land hits on the music's downbeats when there is music (`fit-beat-grid.py`),
  but voice timing always wins over the beat.
- Hold the final CTA ≥ 2s, still.
- **Anchor to words, not seconds.** Reveals land on the spoken word: `T.word("đồng bộ", beat)` from
  `audio/timing.json`. Offsets from a beat start are the fallback only.
- **Rotate transitions.** No two neighbouring beats use the same one. Big moments (music drops) get
  the style's strongest accent.
- **Beat reactions are texture.** A background layer may pulse on downbeats (≤ 1.5% scale or +10%
  opacity); cuts and drops carry the rhythm, not constant pulsing.

## Go-to moves for product films

Plain names, so anyone can build them with `kv.js`; the shot prompt names the move, the motion
designer picks how.

| Moment | Move |
|---|---|
| Cursor clicks through a real UI | Cursor on `track()` arcs that slow before the target; camera eases in (≤ 1.6×) on the control *before* the click; press = scale 0.94 on the button + ripple; rest of the UI dims to ~40% |
| Product on a device | Device frame on Heavy, screen content live inside it, slight parallax between device and background |
| Reveal the whole workspace | Start tight on one real detail, pull back (Default) to the full screen, hold |
| Feature list without cuts | One container stays; its content swaps (`swapAlpha`) while it morphs scale/radius (`ui-morph.md`) |
| AI / prompt feature | Type the prompt (characters on a fixed rate), submit press, result blocks assemble with a stagger |
| Numbers / proof | Count up on the spoken number; the number scales from 0.9 while counting; suffix lands after |
| Headline beats | Words or lines (never letters) on Heavy, 0.12s apart, already moving at frame 1 |
| CTA / button | The logo or last card condenses into the CTA button, a cursor presses it, hold ≥ 2s |
| Logo end card | Real logo file, assembled from its parts or revealed by a mask; never redrawn |
| UI morph film (one shape, never cut) | `ui-morph.md` |

## Technique follows the look

Specify the look and the constraints; let the motion designer pick the technique. DOM (real UI
rebuilt in HTML/CSS), `<canvas>` (hand-drawn lines, paper, ink, generative patterns, many particles,
charts) and SVG all live in the same `seek(t)` scene, drawn as a pure function of time with seeded
randomness (`rng`). Build the shot's intent; the shot prompt's words, timing and must-nots are exact,
the technique is yours.

**Generate-then-trace** (for characters or physics that are hard to hand-animate): an AI video model
renders a base shot (`ai-people.md` / `manual-generation.md`), `render.mjs extract` turns it into
frames, and the scene redraws it in the video's style on canvas on top, so the viewer sees only the
drawn layer. Use only when the style asks for an illustrated look; the base clip is a resource like
any other (the resource gate applies).

## Engine limits (learned the hard way)

- Heavy CSS (`filter: blur()`, big `box-shadow` stacks, `backdrop-filter`, many `clip-path`s) slows
  every frame and can flicker. **Bake textures** (grain, halftone, paper, colour fields, dot grids) into
  PNG tiles under `project/assets/images/` and use them as `background-image` / `mask-image`.
- Hide heavy layers with `visibility`, not `opacity: 0` (scenes outside their time range are hidden
  for you).
- Build all DOM in `setup()`; `draw(t)` only sets styles and canvas pixels. Randomness only from
  `rng(seed)` (never `Math.random`); no CSS transitions or animations, timers, `requestAnimationFrame`
  or state carried between frames. `render.mjs check` proves it.
- Never put `will-change` on anything the camera scales: text goes blurry.
- Video clips play as extracted frames (`KV.clip`), never a `<video>` element.
- Loop films: the last frame equals the first, cursor position and velocity included.

## Text on screen

- ≤ 7 words per card; the voice-over carries the rest.
- Decide per beat: **huge** (hook, key benefit — composition leaves room, background calm) or
  **subtitle** (supporting line, lower third). Vary it; never the same size all film.
- Anything the voice points to is readable at phone width: ≥ 18px at 1080p for UI text, ≥ 4u for
  captions.
- Captions always burned in for 1:1 and 9:16, in the caption band: 9:16 between 62% and 80% of the
  height (clear of the platform's buttons at the bottom and right), 1:1 in the bottom 20%, 16:9 in the
  bottom 15%. Nothing else lives in the caption band.

## Multi-format

Write every scene against the layout from `kv.js` (`W`, `H`, `u`, `portrait`): positions as fractions
of `W`/`H`, sizes in `u`. Each format is then a render with `--format=9:16` (or `1:1`) of the same
project and the same timing; where a scene needs a different arrangement in portrait, branch on
`portrait` and re-stack type and UI. Never crop. Finish the primary format first; each other format
gets its own critique pass.

## Styles

The look comes from a named style (`styles.md`, `style-catalog.md`). Its tier, signature move and
transitions refine this file; they never override the banned look.
