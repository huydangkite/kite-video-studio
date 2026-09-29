# UI morph film — "one shape, never cut"

The most-bookmarked format of the Opus 5.5 wave (@twoclipping's UI morph, @verbove's MakerMap).
Good for a 10–20s marketing loop that tours a product's key states without a single cut.

## Concept

- One container never cuts. It changes **scale, border-radius and fill** from state to state:
  button → loader → card → player → chart → command palette → logo.
- A cursor (or tap) drives every change with a real click.
- Content swaps inside the container behind a short blur; text enters after the morph starts and
  leaves before the next one.
- The last frame equals the first, so it loops.
- One accent colour. Tiny overshoot at most (Snappy/Default tiers in `motion-rules.md`).
- HyperFrames: morph with `scale` + `border-radius` (never width/height tweens); blueprints
  `card-morph-anchor`, `anchored-layout-expand`, `cta-morph-press`, `cursor-ui-demo`.

## Spec template (put inside PROMPT.md §7 in place of a plain beat sheet)

```xml
<inputs>
  Product + URL. 8–12 real UI states from the product (screenshots or recording) with the real
  data shown in each. Formats.
</inputs>
<direction>
  One container never cuts: scale, radius and fill change between states; content swaps behind a
  short blur; a cursor drives each change with a real click. One accent. Tiny overshoot at most.
  Banned: bouncy easing, glows, gradients on UI, particles, dead time.
</direction>
<structure>
  [BPM] beat grid, one state per downbeat:
  logo → [state 1] → [state 2] → … → logo. Last frame = first frame.
</structure>
<gotchas>
  Text never overlaps during a swap. Labels are the product's real labels. Legible at 360px wide.
</gotchas>
<start>
  Confirm the inputs, then show the state list on the beat grid and wait for OK before building.
</start>
```
