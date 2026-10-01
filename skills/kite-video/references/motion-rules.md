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
Map every moving element to one tier (numbers from the course's spring chart; GSAP eases are the
closest HyperFrames-safe equivalent):

| Tier | Use for | Spring (stiffness/damping) | Feel | GSAP approximation |
|---|---|---|---|---|
| Snappy | buttons, toggles, cursors, leading edges | k320 d30 | ~0.3s, ~1% overshoot | `back.out(0.8)`, 0.3s |
| Default | cards, containers, camera | k170 d26 | ~0.5s, no visible overshoot | `power3.out`, 0.5s |
| Heavy | big type, device frames, logo lockups | k90 d20 | ~0.8s, none | `power4.out`, 0.8s |
| Playful | mascots, stickers, emoji-like accents only | k220 d14 | ~19% overshoot | `back.out(2)`, 0.45s |

- **Tab stretch:** when an indicator moves between tabs, the leading edge arrives in ~0.25s and the
  trailing edge follows in ~0.4s — it stretches, then settles.
- A value that changes target several times (cursor, container size) never restarts from rest —
  chain from its current position.
- Morph containers with `scale` + `border-radius` (HyperFrames forbids tweening width/height).
- Motion blur only on fast snaps, never on readable text (`hyperframes-animation` motion-blur).

## Pacing

- Hook in the first 2s. A new visual event every 3–5s (we are deliberately slower than viral
  showreels — product viewers must read). Demos: one step per beat, never two actions at once.
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
- Build all DOM before the first tween; randomness only from a seeded generator.

## Text on screen

- ≤ 7 words per card; the voice-over carries the rest.
- Decide per beat: **huge** (hook, key benefit — composition leaves room, background calm) or
  **subtitle** (supporting line, lower third). Vary it; never the same size all film.
- Captions always burned in for 1:1 and 9:16; inside safe zones (`hyperframes-studio`).

## Multi-format

Finish the primary format first. Each other format is its own composition sharing the timing
(`audio/timing.json`) with its own layout variables: re-stack, re-size and re-place type and UI for
the frame. Never crop. Each format gets its own QA pass.
