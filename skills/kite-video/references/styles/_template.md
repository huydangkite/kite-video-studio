# Style: <name> — deep spec

`motion-designer` (look mode) writes one of these per style a video uses, into
`videos/<slug>/style_guide.md` (one section per style), by expanding the catalog entry against the
brand kit. The director copies it into `PROMPT.md` §4. The two worked examples are `glass-keynote.md` and `comic-multiverse.md`.

## Feel and when to use
One paragraph: what the viewer should feel, which chapters it owns in this film, what it is not for.

## Tokens (resolved against brand/brand.md)

```css
--bg: …; --surface: …; --line: …; --ink: …; --muted: …;
--accent: <brand accent, or the style's signature colour if the colleague opted in>;
--display: "<brand display or the style's suggestion>"; --ui: "<brand UI face>";
--ease-in: …; --dur: …;
```

Fonts: every face with its Google Fonts name, weights used, and confirmation that the `vietnamese`
subset exists. Local files under `project/assets/fonts/`, `font-display: block`.

## Layers (back to front)
Background → ambient layer (if any) → texture PNG → beat-pulse wrapper → scenes → cut accents
(flash, wipe) → captions → logo. Say which layers react to the music and how much.

## Components
Each reusable piece with exact sizes: headline, kicker, card/panel, chip, number, caption box,
UI frame, any style-specific element (slab, rule, halftone panel). Name the class it will get.

## Motion language
- Tiers used and their eases/durations.
- Entrance vocabulary (which of `pop`, `rise`, `slide`, `flip`, `draw`, `typeIn`, `countUp`…).
- **Signature move** — the one thing that makes this style recognisable, with timing.
- Transitions this style may use, and the rotation rule (no two neighbouring beats share one).
- Beat reactions: what pulses on downbeats, by how much (keep it texture: ≤ 1.5% scale).

## Captions
Box, font, size, colours of unread / current / read words, position inside the safe zone.

## Renderer notes
Anything baked to PNG, filters attached only while an effect runs, element budgets.

## Never
Style-specific don'ts, plus every banned-look item this style is tempted by.
