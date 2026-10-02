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
- Something happens on every beat; the camera zooms so each state fills the frame.
- Build it as one scene in the engine (`engine.md`): the container's size, radius and fill come from
  `track()`, its content from `swapAlpha()`, the cursor from `track()` arcs. DOM or canvas, whichever
  draws the states crisper.

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
  [BPM] beat grid, something happens on every beat; one state per bar (4 beats) or per 2 beats —
  pick one and keep it: logo → [state 1] → [state 2] → … → logo. Last frame = first frame.
</structure>
<build>
  1. One scene for the whole loop, one container that never cuts (no scene per state).
  2. Closed-form springs (kv.js tiers, motion-rules.md). A value with many targets (container size,
     radius, camera, cursor) = track(): one spring per change, never restarted.
  3. Text inside the container: swapAlpha() — in ~0.08s after the morph starts, out ~0.1s before the next.
  4. Tab indicators: indicator() — leading and trailing edges on different springs so they stretch.
  5. Beat grid from the track (fit-beat-grid.py). Start on a downbeat; UI sounds on the beats.
  6. Final render at 60 fps with 4 subframes blended for motion blur (render.mjs --quality=final).
</build>
<gotchas>
  Text never overlaps during a swap. Labels are the product's real labels. Legible at 360px wide.
  Never use will-change on anything the camera scales (blurry text).
  The last frame equals the first, cursor position and velocity included (check the loop seam).
</gotchas>
<start>
  Confirm the inputs, then show the state list on the beat grid and wait for OK before building.
</start>
```
