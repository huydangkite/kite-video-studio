# Style: glass keynote — deep spec

## Feel and when to use
A calm, premium tech launch: dark indigo space, slowly drifting colour fields, frosted glass cards,
display type with one italic-serif accent word. Reads like a product keynote. For launches,
changelogs and explainers where clarity and polish matter more than energy. Demo-safe.

## Tokens

```css
--bg: #070817; --ink: #f5f3ff; --mute: #aeacd6; --dim: #8f8dbb;
--card: rgba(20, 18, 48, 0.94); --stroke: rgba(196, 181, 253, 0.26);
--accent: <brand accent>;            /* style signature #a78bfa only on opt-in */
--ok: #34d399; --warn: #fbbf24; --fail: #f87171; --info: #60a5fa;   /* state chips only */
```

Fonts (original): Plus Jakarta Sans 800 for headlines (has `vietnamese`), an italic serif for the
accent word, JetBrains Mono for kickers and code, Be Vietnam Pro 600–800 for captions. The original
italic serif (Instrument Serif) has no `vietnamese` subset: use it only for English accent words,
otherwise Fraunces Italic. Brand faces win when the kit defines them.

## Layers (back to front)
`#bg` → `#fields` (three large colour fields as **baked PNGs**, 48s sine drift) → `#grid` (dot grid
PNG, radial mask, +10% opacity on downbeats) → `#vignette` → `#pulse` wrapper → scenes → `#wipe`
(a soft light band swept across on kick cuts) → captions → logo → `#flash` → `#fade`.

## Components
- `.kicker` — mono uppercase label with a number badge, part of the layout (top-left of the content
  block, not the frame corner).
- `.h1` — 70px display 800, `-0.035em` tracking; one `<em>` word in the italic serif. The original
  filled that word with a pink→violet→blue gradient; allowed on **type only**, never on UI.
- `.card` — glass panel: `--card`, 1.5px `--stroke` border, radius 24, deep soft shadow plus an inner
  top highlight. Holds real UI crops, never invented UI.
- `.chip` — pills in state colours (ok / warn / fail / info / new).
- Terminal lines, odometer digits (count-ups), 3D flip cards (`backface-visibility: hidden`), data
  packets moving along drawn SVG paths.
- `.slam` — 200px display word for the one big number/statement of a chapter.

## Motion language
- Tiers: Default for cards (`power3.out` 0.5s), Heavy for `.slam` (`expo.out`).
- Transitions: `none`, `up` (y 110 → 0, `power3.out` 0.5s), `zoom` (scale 1.3 → 1, `expo.out`),
  `flip` (rotationY −70, perspective 2200), `iris` (clip-path circle 0 → 80%), `fade` for the outro
  only. **Rotate them: no two neighbouring scenes share a transition.**
- Out: fade + scale 0.95 in 0.22s. The scene before the music drop zooms through (scale 2.2) into it.
- Cuts: light flash (0.14 opacity, 0.3 on kick beats) and the `#wipe` band on kick cuts.
- Signature move: headline rises word by word on the voice; the accent word lands last, in italic.

## Captions
Dark translucent pill `rgba(10, 8, 30, 0.72)`, radius 20, Be Vietnam Pro 700 at 46px (1080p);
unread words 50% white, current word `#e9d5ff`, read words white.

## Renderer notes
Colour fields and dot grid as PNGs: live `radial-gradient`/`blur()` on many elements caused black
frames in the reference renders.

## Never
Centered title on the colour fields (banned); gradient or glow on cards, buttons or other UI chrome;
more than one italic word per headline.
