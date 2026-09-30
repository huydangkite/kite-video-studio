# Style: comic multiverse — deep spec

Inspired by the look only: no Marvel names, logos or characters.

## Feel and when to use
Loud, hand-made comic energy: halftone Ben-Day dots, thick ink outlines, cyan/magenta
misregistration, RGB glitch cuts, halftone wipes, speed-line bursts, graffiti, motion on twos. For
hype launches, social cuts, young audiences. Not for feature demos (the texture fights the UI).

## Tokens

```css
--ink: #0d0a1a; --paper: #fff6e5; --cyan: #19d3ff; --magenta: #ff2e9a;
--red: #ff2b3a; --yellow: #ffd21f; --purple: #5b1fd1; --violet: #1a0b3d;
--accent: <brand accent unless the colleague opted into comic colours>;
--rx: 0;   /* misregistration offset, animated on beats */
```

Fonts: Anton (headlines), Bangers (labels, kickers, SFX words), Permanent Marker (graffiti notes,
Apache 2.0), Be Vietnam Pro 700/800 (captions), JetBrains Mono (code, logs). Check the `vietnamese`
subset of Bangers and Permanent Marker before using them for Vietnamese words; otherwise keep them
for English SFX words only.

## Layers (back to front)
`#stage` (receives the RGB glitch filter) contains: "universes" (full-frame backgrounds per chapter,
switched on cuts) → `#rays` (sunburst, slow rotation) → `#skyline` (per scene) → `#tags` (graffiti
PNG, slow drift) → `#tone` (halftone PNG, radial mask, pulses on beats) → `#shake` → `#pulse` →
scenes. Above the stage: `#speed` lines → `#glitch-bars` → `#dots` (halftone wipe) → `#flash` →
captions → logo → `#grain` (PNG) → `#fade`.

Baked texture PNGs in `project/assets/images/`: halftone dots (ink, cyan, pink), grain, graffiti,
distress, dot grid. They exist because the live radial-gradient versions blacked out frames.

## Components
- `.panel` — paper card, 6px ink border, triple offset shadow
  `-6px -4px 0 cyan, 6px 4px 0 magenta, 16px 16px 0 ink`, halftone in a corner mask, optional
  cross-hatching, `.dark` variant with pink dots. Real UI crops live inside panels.
- `.hl` — Anton caps, yellow fill, 3px ink stroke, cyan/magenta text-shadow offset by `var(--rx)`
  plus a stacked ink extrusion, distress mask.
- `.kick` — yellow Bangers caption box rotated −3°, hard ink shadow.
- Diagrams as comic panels: terminal logs, stamped `✓ allow` / `✗ deny` rows, bug sprites squashed
  on the spoken word.
- Mascot (only if the brand has one, or the colleague approves an abstract blob): cyan/magenta
  ghost copies behind it, halftone shading, mouth driven by the voice envelope.

## Motion language
- **On twos:** quantise character and UI eases to 12 steps per second so poses hold like hand-drawn
  animation. Keep camera moves (background drift, universe switches) smooth.
- Transitions: `none`, `glitch` (RGB split via SVG `feOffset` + slice bars, 0.28s), `dots` (halftone
  dots swell to cover the frame, then shrink), `flip` (page turn from the left edge), `slam`
  (scale 1.3 → 1 with `power4.in` + shake), `fade` (outro only). Rotate: no two neighbours alike.
- Every cut gets flash + speed lines (stronger on kick beats); music drops get flash 0.8, shake
  1.1–1.4 and full speed lines.
- Beat reactions: `--rx` misregistration kick every other beat, `#tone` pulse, `#pulse` 1.2% scale
  on kick downbeats.
- Signature move: kick label slides in, then each headline word flips up in 3D (rotationX −70 → 0)
  with a stagger, on the voice.
- Outro drops the energy: calm background, rays dim, lines appear slowly, logo + CTA held still.

## Captions
Yellow narration box (5px ink border, hard ink + cyan shadow), Be Vietnam Pro 800 at 40px, ink
text; current word `#a3005a`. Inside the safe zone; nothing else in the caption band.

## Renderer notes
Attach the SVG RGB filter only while a glitch runs (`tl.set(el, {filter: "url(#rgb)"})`, back to
`none` a few frames later). Use `visibility` rather than `opacity: 0` to hide heavy full-frame
layers. `immediateRender: false` on `fromTo` tweens of shared layers (flash, dots, speed lines).

## Never
Texture over readable UI; glitch on the CTA; flicker or misregistration on captions; any Marvel
reference.
