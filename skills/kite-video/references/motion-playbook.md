# Motion playbook — how each kind of video should move

The single biggest factor in whether a video looks premium is the **shot prompt** the director
writes for each beat and how literally the motion designer builds it. This file is the standard
for both: the principles that make motion look expensive, the grammar for each video kind, the
shot-prompt format, three worked examples, and the checklist every beat passes before it leaves
the motion designer.

Vocabulary: blueprints and rules are HyperFrames names (`hyperframes-animation`
`blueprints-index.md`, `rules/`); open the blueprint file before building. Tiers and the banned
look are in `motion-rules.md`; the style's own signature move is in `style_guide.md`.

---

## 1. What makes motion look expensive

1. **One focal point per frame, always.** At any moment the viewer knows where to look. If two
   things move, one leads and the other follows ≥ 0.15s later at lower amplitude.
2. **The product is the hero, decomposed.** Real UI is rebuilt or cut into its parts (cards,
   buttons, rows, numbers) that move on their own. A flat screenshot appears once at most, as the
   "this is real" moment.
3. **The camera is motivated.** It moves because something happens: it follows the cursor, pushes
   in on the result, pulls out to reveal context. No idle drifting, no zoom for its own sake. Every
   camera move decelerates into its landing (`power3.out` / `expo.out`) and holds.
4. **Continuity across cuts.** The best cuts are not cuts: an element from beat N becomes the
   container of beat N+1 (`card-morph-anchor`, `scale-swap-transition`), a match cut on shape or
   position, or the camera keeps travelling through the cut. Plain cross-fades are the last resort.
5. **Depth, used sparingly.** Three planes (background texture, the UI surface, the foreground
   callout). Slight parallax between them on camera moves; depth-of-field on at most two layers at
   once (`depth-of-field-blur`); soft, real shadows on lifted cards.
6. **Mass and timing.** Every element maps to a tier (Snappy · Default · Heavy · Playful) and
   staggers 40–80ms within a group. Things settle; nothing slides at constant speed; nothing
   bounces unless it is a sticker or a mascot.
7. **Type choreography.** Headlines arrive after the motion starts and leave before the next move,
   anchored to the spoken word. Large type moves as lines or words, never letter-by-letter
   wiggle. Readable hold: at least (words ÷ 3) + 0.5 seconds.
8. **Micro-interactions sell reality.** Cursor arrives on a curve and slows before the click
   (`cursor-click-ripple`, `press-release-spring`), hover states change, numbers tick
   (`counting-dynamic-scale`), toggles stretch (tab stretch rule).
9. **Rhythm: dense, then calm.** Alternate busy beats with a breather (`titlecard-reveal`, a held
   result). Each chapter has exactly **one wow moment**; the rest supports it.
10. **Restraint is the luxury.** One signature move per beat. If you can remove an effect and the
    beat still works, remove it.

**Looks cheap (reject):** everything fading in; centered title on a gradient; slides at linear
speed; elements popping in all at once; zoom-in-zoom-out with no reason; UI too small to read on
a phone; text over busy motion; glow/particles to fill emptiness; transitions that call attention
to themselves; the same move three beats in a row. And the studio's own rejected frames: real UI
small on a big white frame (reads as a slide deck); pale grey cards on a pale ground; seconds of
raw scanned paper or a whole-document dump; the same card shown for many seconds; small pushes and
slides that feel like PowerPoint; tilted sticky-note labels.

---

## 2. Grammar by video kind

### Marketing (15–45s, social or web) — make them want it

Arc: hook → recognisable problem → the turn (product appears) → 2–3 visible benefits → proof → CTA.
Pace: a visual event every 2–4s; one chapter in calm contrast. Energy follows the music's sections.

| Role | Reach for | Signature move to aim for |
|---|---|---|
| Hook (0–2s) | `ticker-takeover`, `kinetic-type-beats`, `zoom-out-workspace-reveal`, `dataviz-countup` cold open | Something already moving in frame 1; the first word on screen by 0.5s |
| Problem | `overwhelm-surround`, `kinetic-type-beats` (3 short pain lines) | The clutter closes in, then a hard cut to silence/space |
| The turn | `logo-assemble-lockup` (fast), `cursor-ui-demo` first look, `device-surface-showcase` | The mess collapses into the product: one continuous morph |
| Benefits | `cursor-ui-demo`, `camera-journey` (cause → effect), `prompt-type-submit-generate`, `grid-card-assemble`, `comparison-split` | Camera rides the cursor into the result; result pops with a Snappy spring |
| Proof | `dataviz-countup` (real numbers only), `constellation-hub` (real partners only) | Number counts up as the voice says it |
| CTA | `cta-morph-press`, `logo-assemble-lockup` | Logo condenses into the CTA button, a cursor clicks, hold ≥ 2s |

9:16: stack vertically, UI fills the width, headline in the top third, captions in the lower safe
zone; bigger type, fewer elements per frame.

### Feature demo (45–90s) — make them able to do it

Arc: what it does → when you need it → steps 1…n → result → where to find it.
Pace: one step per beat, 4–7s each; never two actions at once; clarity over flair.

| Role | Reach for | Signature move to aim for |
|---|---|---|
| Title | `titlecard-reveal`, `fixed-anchor-cycle` | Feature name docks into a persistent corner of the layout as the step counter |
| Situation | `cursor-ui-demo` (static stage) or a short `kinetic-type-beats` | The "before" state, calm |
| Each step | `cursor-ui-demo` + `camera-cursor-tracking` + `coordinate-target-zoom` | Camera eases in (≤ 1.6×) on the control **before** the click, dims the rest to ~40%, numbered caption = voice line |
| Waiting / typing | speed ramp 1.5–4× with a subtle motion-blur streak | Never show a spinner for more than 1s |
| Result | `comparison-split` (before / after) or `anchored-layout-expand` | Before and after side by side, the changed part highlighted |
| Next | `titlecard-reveal` | Where to find it, logo, held |

The step counter, caption style and cursor never change across the film. Zoom out to context
between steps so the viewer never loses where they are.

### Case study / B2B pitch (45–120s) — make the decision-maker believe it

Arc: the client's situation in their terms → what was hard → what we built (the real product) →
how it works on their process → evidence → what it means for them → next step.
Pace: confident and unhurried, 4–6s per beat, calm editorial transitions, one presenter optional.

| Role | Reach for | Signature move to aim for |
|---|---|---|
| Situation | `spatial-pan-stations` (their process as a map), `kinetic-type-beats` slow relay | Camera travels the client's process, one station per voice line |
| The hard part | `overwhelm-surround` (restrained), `dataviz-countup` with their real figure | The bottleneck station highlights; the rest dims |
| What we built | `device-surface-showcase`, `zoom-out-workspace-reveal` | Close on one real screen detail, pull back to the whole system |
| How it works | `camera-journey` (cause → effect), `agent-progress-theater`, `transcript-scroll-artifact-reveal` | One action in one panel visibly causes the result in another |
| Evidence | `dataviz-countup`, `comparison-split`, real screens | Before / after on the same layout; every number has a source |
| Meaning | `titlecard-reveal` breather | One sentence, still, held |
| Next step | `cta-morph-press` (B2B CTA: "Đặt lịch demo") | Calm, held ≥ 3s |

16:9 for meeting rooms: generous margins, larger type than you think (it is watched on a projector
from across a room), fewer cuts.

---

## 3. The shot prompt (one per beat, written by the director)

The motion designer builds from this text, so it must be specific enough that two designers would
build the same shot. Every field is required; write "none" rather than leaving one out.

```
Beat <n> · <start>–<end>s · <role> · style <catalog name>
Blueprint: <id> (Reproduce | Adapt | Compose)        Hero beat: yes/no
Frame: <composition at the key moment — what is where, focal point, layers fg/mid/bg, % of frame the UI takes>
Camera: <start framing> → <end framing>, <ease>, <duration>; <motivation>
Choreography (anchored to words):
  - on "<word>" (<t>s): <element> <action>, <tier>, <stagger>
  - on "<word>" (<t>s): …
Signature move: <the one thing this beat is remembered for, with timing>
Text: <exact words> — <HUGE | subtitle>, <position>, enters <how/when>, leaves <when>
Transition out: <cut | match on … | morph … | camera continues …>
Sound: <SFX on which word/beat; music section>
Must not: <the 1–3 things that would ruin this shot>
```

---

## 4. Worked examples

**Marketing, 9:16, hook — style `kinetic-typography`**

```
Beat 1 · 0.0–2.6s · Hook · style kinetic-typography
Blueprint: ticker-takeover (Adapt)                       Hero beat: no
Frame: flush-left type stack, top 60% of frame; bottom 40% empty for the phone that crashes in; solid brand-dark field, no texture.
Camera: locked, then a 4% push on the crash, power3.out 0.4s; motivated by the impact.
Choreography:
  - 0.0s: "Đơn hàng nằm ở" already on screen, Heavy, no entrance (motion from frame 1 = the ticker below).
  - 0.0–1.4s: ticker word cycles "Zalo / Facebook / tin nhắn / sổ tay", hard swaps every 0.35s, Snappy.
  - on "Kite" (1.6s): the real Kite order screen (phone, decomposed) crashes in from below and shoves the type stack up 30%, Heavy, overshoot ≤ 1%.
Signature move: the collision at 1.6s, the type physically pushed by the phone.
Text: "Đơn hàng nằm ở…" HUGE, 128px, top-left; ticker word in accent colour; leaves pushed off-frame top at 2.4s.
Transition out: camera continues the push into the phone screen, which becomes beat 2's full frame.
Sound: whoosh-in on the crash, music drop on 1.6s.
Must not: fade any word in; show an invented order screen; let the ticker be unreadable (≥ 0.3s per word).
```

**Feature demo, 16:9, step 2 — style `premium-ui-demo`**

```
Beat 4 · 14.2–19.8s · Key_Feature (step 2 of 4) · style premium-ui-demo
Blueprint: cursor-ui-demo (Reproduce) + coordinate-target-zoom          Hero beat: yes
Frame: real Reports screen at 80% of frame, centered-left; step counter "2/4" docked top-left; caption lower third.
Camera: full screen → 1.5× on the "Xuất PDF" button region, power3.out 0.6s, starts 0.3s before the click; back to 1.0× after the toast, 0.5s.
Choreography:
  - on "chọn" (14.6s): cursor travels on a curve from the table to the toolbar, Snappy, slows over the last 20%.
  - on "Xuất PDF" (16.1s): click with ripple + press spring; rest of UI dims to 40% over 0.3s.
  - on "vài giây" (17.4s): download toast slides up from bottom-right, Default; file name readable.
Signature move: the push-in landing exactly as the cursor arrives, so the click happens at full size.
Text: caption "Bước 2: Bấm Xuất PDF" = voice line, subtitle, lower third, in with the step, out at 19.6s.
Transition out: camera pulls back to 1.0× and holds 0.3s (orients the viewer), then hard cut.
Sound: soft click on "Xuất PDF", light chime on the toast.
Must not: speed up the cursor; zoom past 1.6×; show the real user's email in the toolbar (blur).
```

**Case study, 16:9, "how it works" — style `blueprint-engineering` (guest chapter)**

```
Beat 6 · 31.0–37.5s · Key_Feature · style blueprint-engineering
Blueprint: camera-journey sub-shape A (Adapt)                          Hero beat: no
Frame: the client's claim process as 4 drawn stations left→right on one wide sheet; station 3 (Thẩm định) is the real Kite screen inset; title block "SHEET 03 · QUY TRÌNH BỒI THƯỜNG" in the drawing.
Camera: starts framed on station 1, pans right station by station (one per voice line), power2.inOut 0.9s per leg, lands with a 6% push on station 3.
Choreography:
  - on "hồ sơ" (31.4s): station 1 box draws stroke-first (svg-path-draw), Default.
  - on "tự động" (33.2s): a document packet travels along the arrow to station 2, Snappy.
  - on "thẩm định" (34.6s): station 3's Kite screen lifts 8px with a soft shadow, its status chip flips to "Đã duyệt", Snappy.
Signature move: the packet's arrival at station 3 triggers the real status flip; cause → effect in one shot.
Text: none on screen beyond the drawing labels (the voice carries it).
Transition out: hard cut on the voice pause back to the base style (precision-dark-product).
Sound: soft pen-scratch on the draws, one tick on the status flip.
Must not: draw stations the client does not have; let the inset screen be smaller than 35% of frame height.
```

---

## 5. "Looks expensive" checklist (motion designer, every beat, before returning)

Look at the snapshot at the key moment and at 3 frames around the signature move:
- [ ] One focal point; I can say what the viewer looks at in each second.
- [ ] The signature move happens exactly as the shot prompt says, on its word.
- [ ] Real UI, decomposed, readable at phone width (or projector distance for case studies).
- [ ] Every move has a tier and settles; no linear slides; no bounce on type.
- [ ] Camera moves are motivated and land with a hold.
- [ ] Text enters after motion starts, leaves before the next move, holds long enough to read.
- [ ] The transition out connects to the next beat (match, morph, or continuing camera).
- [ ] Matches the hero beat's composition language (margins, type scale, depth, shadow).
- [ ] Nothing from the banned look; nothing in "Must not".
- [ ] Real UI fills ~70–85% of the frame; no small screenshot on a big empty ground; strong
      contrast between UI and ground (no pale card on pale ground).
- [ ] Not a repeat of a card, screen or move already used in another beat.
If a box fails, fix before returning; if it cannot be fixed, say which and why. Then run the
critique loop (`review.md`) on the beat: the checklist is the floor, the scores and the taste
question are the bar.
