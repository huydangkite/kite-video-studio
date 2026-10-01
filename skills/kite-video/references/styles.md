# Styles — named looks, and how to mix them per scene

A style is a named visual grammar: ground colours, type treatment, layout, motion signature,
texture and the blueprints that suit it. The catalog is `style-catalog.md`: 54 studio styles in
8 families plus the 8 HyperFrames built-ins. Two have a deep spec in `styles/` (`glass-keynote`,
`comic-multiverse`); any other style gets one written from `styles/_template.md` once it is chosen.
A style gives a video a look nobody else has without a reference video, and lets different chapters
of one film speak differently ("Apple-like opening, Linear-style UI, blueprint how-it-works,
Nike-style finale").

## Brand always wins

A style is grammar layered **on top of** `brand/brand.md`, never instead of it.

| Element | Who decides |
|---|---|
| Logo, UI face, accent (CTA) colour | Brand — always, in every style |
| Display face | Brand. The style's suggested face only if the brand kit has none, or the colleague opts in |
| Grounds (backgrounds, surfaces, lines, ink) | Style, checked for contrast against the brand accent |
| Style's own signature colour (e.g. Swiss red, athletic lime) | Replaces the brand accent **only** if the colleague opts in ("màu theo phong cách"); record it in `INTAKE.md` |
| Layout, type scale/case/tracking, motion, texture | Style |
| Banned look (`motion-rules.md`) | Studio — no style overrides it |

"One display face + one UI face, one accent" holds across the **whole film**, not per style: a
three-style film still has one display face and one accent.

## Choosing (inside the concepts, gate G1)

The colleague never browses this catalog. The `director` picks a different style for each of the
three concepts (`CONCEPTS.md`), describes it in plain Vietnamese on a **Phong cách** line, and the
`motion-designer` renders one styled frame per concept so the colleague sees each look. The
colleague may take a concept with another concept's style; a style wish from the brief sheet or a
reference video steers the choice. Filters the director applies, in order:

1. **Kind.** Feature demos use calm or medium styles whose layout keeps real UI large (the
   *Product* and *Technical* families first). High-energy styles are for marketing.
2. **Audience.** Enterprise buyers → *Product*, *Technical*, *Editorial*. Consumers / Gen Z →
   *Playful*, *Retro*, *Impact*. Developers → *Technical*.
3. **Platform.** 9:16 feeds reward *Impact* and *Playful*; 16:9 web and YouTube carry *Product*,
   *Cinematic* and *Editorial* better.
4. **Brand fit.** Reject a style whose grounds cannot carry the brand accent at 4.5:1 contrast.

Colleagues choose faster from pictures than from names, so the styled frames
(`review/concepts.html`) are always shown with the concepts.

Once chosen, `motion-designer` (look) writes `style_guide.md`: one deep-spec section per style used
(`styles/_template.md`; copy and resolve `styles/glass-keynote.md` or `styles/comic-multiverse.md`
where they apply).

With a reference video: `motion-designer` (look) writes `style_guide.md` from the frames and names
the **nearest catalog style** plus the differences. The reference then acts as a custom style.

## Mixing styles per scene

One style is the default and is always right for a demo. Mixing is a marketing tool, used on
purpose:

- **One base style** covers ≥ 60% of the runtime, including the CTA end card (unless the finale is
  the chosen guest).
- **At most 2 guest styles**, each owning a whole **chapter** (the hook, the how-it-works, the
  finale), never a lone beat in the middle.
- **Switch on a hard cut or a match cut at a voice pause.** Never cross-fade between styles, never
  switch mid-beat.
- **Constants across every switch:** logo, brand accent, UI face, caption style and position,
  voice, music bed. These make a mixed film feel like one film.
- Guests should differ from the base in **one or two dimensions** (ground, type case, energy), not
  all of them. Dark precision → blueprint works; dark precision → pixel arcade only as a joke that
  the script sets up.
- Feature demos: single style. Allowed exception: a guest style for the hook (≤ 3s) or the end card.

## Where the choice lives

- `INTAKE.md` → `Look:` line: base style, guests (if any), and whether the colleague opted into
  style colours or a style display face.
- The beat sheet in `script.md` → a **Style** column, one catalog name per beat.
- `PROMPT.md` §4 → the style block: for every style used, its deep spec from `style_guide.md`
  (tokens resolved against the brand), and the style map by chapter. The brief must stand alone, so
  the crew never has to open the catalog.
- `project/style.json` → `video-engineer` writes the resolved tokens per style (colours, fonts,
  easing, durations) and each beat sub-composition reads its style's tokens as CSS variables. A
  style switch is then a variable swap, not a rebuild.

```json
{
  "base": "precision-dark-product",
  "styles": {
    "precision-dark-product": { "bg": "#0B0B0F", "surface": "#16161D", "line": "#26262F",
      "ink": "#EDEDF2", "muted": "#8A8A99", "accent": "<brand accent>",
      "display": "<brand display>", "ui": "<brand UI>", "ease": "power3.out", "dur": 0.5 }
  },
  "beats": { "1": "athletic-impact", "2": "precision-dark-product" }
}
```

## Checking it

Before showing a draft, the producer glances for style drift: each beat matches its named style's
grounds, type treatment and signature move; switches only on chapter boundaries; constants held. A
beat that fell back to generic (flat centered text, default fades) goes back to its chapter's
`motion-designer` before the colleague sees it.
