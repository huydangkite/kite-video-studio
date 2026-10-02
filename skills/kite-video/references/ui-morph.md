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
  Product + URL. 8–12 real UI states that tell its story, with the real data shown in each.
  Brand colours + fonts + one accent. Music near 120 BPM (supplied track or ElevenLabs). Formats.
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
<build>
  1. One sub-composition for the whole loop (multi-scene merge: one container, internal phases),
     never one slot per state.
  2. Closed-form springs (`springEase`, tiers in motion-rules.md). A value with many targets
     (container scale, radius, cursor) = sum of one spring per change, driven from tl.time().
  3. Text inside the container enters ~0.08s after the morph starts, leaves ~0.1s before the next.
  4. Tab indicators: leading and trailing edges on different springs so they stretch.
  5. Beat grid from the track (`hyperframes beats` / fit-beat-grid.py). Start on a downbeat; one
     state per beat or downbeat; UI sounds on measured hits.
  6. Motion blur only on the fast snaps (hyperframes-animation motion-blur), never on text.
</build>
<gotchas>
  Text never overlaps during a swap. Labels are the product's real labels. Legible at 360px wide.
  Never use will-change on anything the camera scales (blurry text).
  The last frame equals the first, cursor position and velocity included (check loop_check.mp4).
</gotchas>
<start>
  Confirm the inputs, then show the state list on the beat grid and wait for OK before building.
</start>
```
