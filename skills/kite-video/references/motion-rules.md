# Motion rules — the studio's quality bar for movement

HyperFrames owns *how* to animate (`hyperframes-animation`: 22 blueprints, ~50 rules, transitions).
This file is *our* bar: which of those to reach for, and what we never do. Director and motion
designer read it; the brief quotes the parts that apply.

## Banned look (the model's defaults — reject on sight)

- Centered title on a gradient background.
- Everything fading in; opacity as the only motion.
- Corner labels, frame borders, "HUD" decoration.
- Glow, bloom or gradients on UI chrome; generic particle bursts.
- Bouncy / elastic easing on text; visible overshoot on type.
- Screenshots pasted flat. **Break a screenshot into components** (cards, buttons, icons, text
  blocks) and animate those; keep the flat screenshot only for a "this is the real product" moment.

## Motion has mass — spring tiers

Cheap motion eases A→B on a fixed curve; expensive motion accelerates, overshoots a hair, settles.
Map every moving element to one tier. Use **closed-form springs**: they are a pure function of
time, so any frame renders without simulating the ones before it. In HyperFrames that is
`springEase({ response, dampingFraction })` from `hyperframes-animation`
(`adapters/gsap-easing-and-stagger.md`); take both its `ease` and its `duration`. The course's
stiffness/damping numbers convert as response = 2π/√k, dampingFraction = d / (2√k):

| Tier | Use for | Course spring (k/d) | `springEase` | Feel |
|---|---|---|---|---|
| Snappy | buttons, toggles, cursors, leading edges | k320 d30 | response 0.35, damping 0.84 | ~0.3s, ~1% overshoot |
| Default | cards, containers, camera | k170 d26 | response 0.48, damping 1.0 | ~0.5s, no visible overshoot |
| Heavy | big type, device frames, logo lockups | k90 d20 | response 0.66, damping 1.0 | ~0.8s, none |
| Playful | mascots, stickers, emoji-like accents only | k220 d14 | response 0.42, damping 0.47 | ~19% overshoot |

`power3.out` 0.5s (Default) and `power4.out` 0.8s (Heavy) are acceptable stand-ins when a blueprint
already uses them; `back.out` is not a stand-in for anything but Playful.

- Overshooting springs (damping < 1) go on transforms only, never on opacity or colour; give
  opacity its own short `power2.out` at the same position. No overshoot on type.
- **Tab stretch:** an indicator moving between tabs gets its leading edge on Snappy (k320 d30) and
  its trailing edge on a softer spring (k140 d22 → response 0.53, damping 0.93), so it stretches,
  then settles.
- **A value with several targets** (cursor, container size, camera) never restarts from rest: it is
  the sum of one spring per change, each starting at its own time (the course's `track()`):
  `v(t) = v0 + Σ (vᵢ − vᵢ₋₁) · spring(t − tᵢ)`. In a composition, set the property from that
  function of `tl.time()` (an `onUpdate` on the beat's timeline), not from chained tweens that
  restart.
- **Text inside a morphing container** enters ~0.08s after the morph starts (over ~0.12s) and leaves
  ~0.1s before the next morph. Text never overlaps during a swap.
- Morph containers with `scale` + `border-radius` (HyperFrames forbids tweening width/height).
- Motion blur only on fast snaps, never on readable text (`hyperframes-animation` motion-blur).

## Pacing

- Hook in the first 2s. A new visual event every **2–4s for marketing**, every **3–5s for demos and
  case studies** (product viewers must read). Demos: one step per beat, never two actions at once.
- Text arrives *after* the motion starts and leaves *before* the next move.
- Cut on voice pauses; land hits on the music's downbeats (`hyperframes beats`) when there is music,
  but voice timing always wins over the beat.
- Hold the final CTA ≥ 2s, still.
- **Anchor to words, not seconds.** Reveals land on the spoken word from `audio/timing.json`
  (`words`), e.g. "the chip pops on *đồng bộ*". Offsets from a beat start are the fallback only.
- **Rotate transitions.** Each style lists its transitions; no two neighbouring beats use the same
  one. Scene cuts sit on beats; the big moments (music drops) get the style's strongest accent.
- **Beat reactions are texture.** A background layer may pulse on downbeats (≤ 1.5% scale or +10%
  opacity); cuts and drops carry the rhythm, not constant pulsing.

## Go-to blueprints for our two video types

| Moment | Blueprint / rule (hyperframes-animation) |
|---|---|
| Cursor clicks through a real UI | `cursor-ui-demo`, rules `cursor-click-ripple`, `camera-cursor-tracking`, `coordinate-target-zoom` |
| Product on a device / laptop | `device-surface-showcase` |
| Reveal the whole workspace | `zoom-out-workspace-reveal` |
| Feature list without cuts | `fixed-anchor-cycle`, `card-morph-anchor`, `anchored-layout-expand` |
| AI / prompt feature | `prompt-type-submit-generate`, `agent-progress-theater` |
| Numbers / proof | `dataviz-countup`, rule `counting-dynamic-scale` |
| Headline beats | `kinetic-type-beats` (restrained: no slam on every word) |
| CTA / button | `cta-morph-press`, rule `press-release-spring` |
| Logo end card | `logo-assemble-lockup` |
| UI morph film (one shape, never cut) | `references/ui-morph.md` |

Before hand-building a named effect (glitch, grain, shimmer, confetti, chart), search the registry
(`hyperframes-registry`) — ~400 blocks exist.

## Technique follows the look

HyperFrames is the studio's engine, not the style. When a look cannot be made from DOM + GSAP
(hand-drawn lines, paper, ink, generative patterns, many particles, a custom renderer), draw it on a
`<canvas>` or SVG inside the beat's sub-composition as a pure function of the timeline's time
(`tl.time()`, never a timer or `requestAnimationFrame`), with seeded randomness — the course's
`seek(t)` pattern inside our timeline. Specify the look and the constraints; let the motion designer
pick the technique.

**Generate-then-trace** (for characters or physics that are hard to hand-animate): an AI video model
renders a base shot (`ai-people.md` / `manual-generation.md`), frames are extracted with ffmpeg,
and the beat redraws it in the video's style on canvas/SVG on top, so the viewer sees only the
drawn layer. Use only when the style asks for an illustrated look; the base clip is a resource like
any other (the resource gate applies).

## Styles

The look comes from a named style (`styles.md`, `style-catalog.md`). Its tier, eases, signature
move and transitions refine this file; they never override the banned look.

## Renderer limits (learned the hard way)

- More than ~40 elements with `radial-gradient`, `filter: blur()` or `clip-path` on screen produced
  black frames. **Bake textures** (grain, halftone, paper, colour fields, dot grids) into PNG tiles
  under `project/assets/images/` and use them as `background-image` / `mask-image`.
- Attach SVG filters (RGB split, glitch) only while the effect runs: `tl.set(el, {filter: "url(#x)"})`,
  back to `none` a few frames later.
- Hide heavy full-frame layers with `visibility`, not `opacity: 0`.
- `immediateRender: false` on `fromTo` tweens of layers shared across cuts (flash, wipe, speed
  lines); otherwise the first tween's start state leaks to time 0.
- Build all DOM before the first tween; randomness only from a seeded generator (mulberry32), never
  `Math.random`; no CSS transitions, timers or state carried between frames.
- Never put `will-change` on anything the camera scales: text goes blurry.
- Loop films: the last frame equals the first, cursor position and velocity included.

## Text on screen

- ≤ 7 words per card; the voice-over carries the rest.
- Decide per beat: **huge** (hook, key benefit — composition leaves room, background calm) or
  **subtitle** (supporting line, lower third). Vary it; never the same size all film.
- Captions always burned in for 1:1 and 9:16; inside safe zones (`hyperframes-studio`).

## Multi-format

Finish the primary format first. Each other format is its own composition sharing the timing
(`audio/timing.json`) with its own layout variables: re-stack, re-size and re-place type and UI for
the frame. Never crop. Each format gets its own QA pass.
