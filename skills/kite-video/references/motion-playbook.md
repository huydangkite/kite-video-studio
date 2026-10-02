# Motion playbook — how each kind of video should move

Whether a video looks premium comes down to two things: a clear **intent** for every shot (what the
viewer sees, where they look, the one move they remember) and a motion designer with room to find
the best way to build it. This file is the standard for both: the principles that make motion look
expensive, the grammar for each video kind, the shot-prompt format, worked examples, and the
checklist every beat passes before it leaves the motion designer.

Tiers, pacing numbers and the banned look are in `motion-rules.md`; the engine in `engine.md`; the
style's own signature move in `style_guide.md`.

---

## 1. What makes motion look expensive

1. **One focal point per frame, always.** At any moment the viewer knows where to look. If two
   things move, one leads and the other follows ≥ 0.15s later at lower amplitude.
2. **The product is the hero, big and decomposed.** Real UI fills most of the frame (~70–85%) and is
   rebuilt or cut into its parts (cards, buttons, rows, numbers) that move on their own. A flat
   screenshot appears once at most, as the "this is real" moment.
3. **The camera is motivated.** It moves because something happens: it follows the cursor, pushes
   in on the result, pulls out to reveal context. No idle drifting, no zoom for its own sake. Every
   camera move lands on a spring and holds.
4. **Continuity across cuts.** The best cuts are not cuts: an element from beat N becomes the
   container of beat N+1, a match cut on shape or position, or the camera keeps travelling through
   the cut. Plain cross-fades are the last resort.
5. **Depth, used sparingly.** Three planes (background texture, the UI surface, the foreground
   callout). Slight parallax between them on camera moves; soft, real shadows on lifted cards;
   strong contrast between the UI and its ground.
6. **Mass and timing.** Every element maps to a tier (Snappy · Default · Heavy · Playful) and
   staggers 40–80ms within a group. Things settle; nothing slides at constant speed; nothing
   bounces unless it is a sticker or a mascot.
7. **Type choreography.** Headlines arrive after the motion starts and leave before the next move,
   anchored to the spoken word. Large type moves as lines or words, never letter-by-letter
   wiggle. Readable hold: at least (words ÷ 3) + 0.5 seconds.
8. **Micro-interactions sell reality.** The cursor arrives on a curve and slows before the click,
   the button presses, hover states change, numbers tick, toggles stretch.
9. **Rhythm: dense, then calm.** Alternate busy beats with a breather (a held result, a title card).
   Each chapter has exactly **one wow moment**; the rest supports it.
10. **Restraint is the luxury.** One signature move per beat. If you can remove an effect and the
    beat still works, remove it.

**Looks cheap (reject):** everything fading in; centered title on a gradient; slides at linear
speed; elements popping in all at once; zoom-in-zoom-out with no reason; UI too small to read on
a phone; text over busy motion; glow/particles to fill emptiness; transitions that call attention
to themselves; the same move three beats in a row. And the studio's own rejected frames: real UI
small on a big white frame (reads as a slide deck); pale grey cards on a pale ground; seconds of
raw scanned paper or a whole-document dump; the same card shown for many seconds; small pushes and
slides that feel like PowerPoint; tilted sticky-note labels.

**Material decides more than motion.** A concept built on photogenic material (real UI rebuilt
crisp and large, a screen recording, real people, bold type) can look premium; one built on scans,
dense tables or admin screenshots rarely can, however well it moves. Judge the material at G1.

---

## 2. Grammar by video kind

### Marketing (15–45s, social or web) — make them want it

Arc: hook → recognisable problem → the turn (product appears) → 2–3 visible benefits → proof → CTA.
Pace: something new every 2–4s; one chapter in calm contrast. Energy follows the music's sections.

| Role | Reach for | Signature move to aim for |
|---|---|---|
| Hook (0–2s) | kinetic type in big lines, a ticker of swapping words, a cold-open count-up, a tight detail that pulls back | Something already moving in frame 1; the first word on screen by 0.5s |
| Problem | 3 short pain lines, clutter closing in from the edges | The clutter closes in, then a hard cut to silence/space |
| The turn | the product's first real screen arriving, the logo assembling fast, the mess collapsing into one container | One continuous morph from mess to product |
| Benefits | cursor through the real UI with the camera riding it, prompt → result, cause in one panel → effect in another, before/after split | Camera rides the cursor into the result; the result lands on a Snappy spring |
| Proof | a real number counting up, real partner logos | The number counts up as the voice says it |
| CTA | the last card or logo condensing into the button, a press | A cursor presses the CTA, hold ≥ 2s |

9:16: stack vertically, UI fills the width, headline in the top third, captions in the caption band;
bigger type, fewer elements per frame.

### Feature demo (45–90s) — make them able to do it

Arc: what it does → when you need it → steps 1…n → result → where to find it.
Pace: one step per beat, 4–7s each, with the click and the result as its two events; never two
actions at once; clarity over flair.

| Role | Reach for | Signature move to aim for |
|---|---|---|
| Title | a title card whose feature name then docks into the UI panel as the step counter | The name becomes part of the layout (not a corner label) |
| Situation | the real screen, still, the "before" state | Calm |
| Each step | cursor demo: camera eases in (≤ 1.6×) on the control **before** the click, the rest dims to ~40%, numbered caption = voice line | The push-in lands as the cursor arrives, so the click happens at full size |
| Waiting / typing | speed ramp 1.5–4× | Never show a spinner for more than 1s |
| Result | before/after side by side, or the panel expanding | The changed part highlighted |
| Next | a held title card | Where to find it, logo, held |

The step counter (docked to the UI panel), caption style and cursor never change across the film.
Zoom out to context between steps so the viewer never loses where they are.

### Case study / B2B pitch (45–120s) — make the decision-maker believe it

Arc: the client's situation in their terms → what was hard → what we built (the real product) →
how it works on their process → evidence → what it means for them → next step.
Pace: confident and unhurried, 4–6s per beat, few cuts: keep one stage (their process as a map, one
screen) and move the camera across it; one presenter optional.

| Role | Reach for | Signature move to aim for |
|---|---|---|
| Situation | their process drawn as stations on one wide sheet; slow line-by-line type | The camera travels the process, one station per voice line |
| The hard part | the bottleneck station, their real figure counting up | The bottleneck highlights; the rest dims |
| What we built | the real product on a device, a close detail pulling back to the whole system | Close on one real screen detail, pull back |
| How it works | cause in one panel visibly producing the result in another; an agent's progress | One action causes the result, in one shot |
| Evidence | real numbers, before/after on the same layout | Every number has a source |
| Meaning | a title card breather | One sentence, still, held |
| Next step | the CTA ("Đặt lịch demo") | Calm, held ≥ 3s |

16:9 for meeting rooms: generous margins, larger type than you think (it is watched on a projector
from across a room).

---

## 3. The shot prompt (one per beat, written once, in `PROMPT.md` §7)

The shot prompt carries the **intent**, not the implementation. Words, timing anchors, the focal
point and the must-nots are exact; the technique, eases and numbers are the motion designer's call.
Keep each to ~6–10 lines.

```
Beat <n> · <start>–<end>s · <role> · style <catalog name>           Hero beat: yes/no
Frame: <what is where at the key moment, the focal point, how much of the frame the UI takes>
Move: <the one signature move, anchored to a spoken word: on "<word>" …>; camera: <motivated move or "locked">
Text: <exact words> — <HUGE | subtitle | caption>, enters/leaves relative to the move
Transition out: <cut on action | match on … | the container becomes … | camera continues …>
Sound: <SFX on which word/beat; music section>
Must not: <the 1–3 things that would ruin this shot>
Material: <inputs/… files this beat uses, or "design only">
```

---

## 4. Worked examples

**Marketing, 9:16, hook — style `kinetic-typography`**

```
Beat 1 · 0.0–2.6s · Hook · style kinetic-typography                 Hero beat: no
Frame: flush-left type stack in the top 60%; the bottom 40% empty for the phone that crashes in; solid brand-dark field.
Move: on "Kite" the real order screen (phone, decomposed) crashes in from below and shoves the type stack up; before it,
      the last word cycles "Zalo / Facebook / tin nhắn / sổ tay" every ~0.35s. Camera: a short push on the impact.
Text: "Đơn hàng nằm ở…" HUGE, ~128px, top-left; the cycling word in the accent; pushed off the top by 2.4s.
Transition out: the camera continues into the phone screen, which becomes beat 2's full frame.
Sound: whoosh on the crash, music drop on "Kite".
Must not: fade any word in; invent an order screen; let a cycling word show for less than 0.3s.
Material: inputs/capture/mobile-order.png (rebuilt as parts)
```

**Feature demo, 16:9, step 2 — style `premium-ui-demo`**

```
Beat 4 · 14.2–19.8s · Key_Feature (step 2 of 4) · style premium-ui-demo     Hero beat: yes
Frame: the real Reports screen at ~80% of the frame; step counter "2/4" docked to the panel's header; caption in the band.
Move: the push-in to the "Xuất PDF" button lands exactly as the cursor arrives, so the click on "Xuất PDF" happens at full
      size; the rest of the UI dims; on "vài giây" the download toast rises with the real file name. Camera back out after.
Text: caption "Bước 2: Bấm Xuất PDF" = the voice line, in with the step, out before the cut.
Transition out: pull back to the whole screen, hold 0.3s, hard cut.
Sound: soft click on "Xuất PDF", light chime on the toast.
Must not: speed up the cursor; zoom past 1.6×; show the real user's email (blur it).
Material: inputs/flow.mov 00:21–00:29 (extracted), inputs/reports.png for the rebuilt toolbar
```

**Case study, 16:9, "how it works" — style `blueprint-engineering` (guest chapter)**

```
Beat 6 · 31.0–37.5s · Key_Feature · style blueprint-engineering            Hero beat: no
Frame: the client's claim process as 4 drawn stations on one wide sheet; station 3 is the real Kite screen inset at ≥ 35% of
      the frame height.
Move: the camera travels station by station, one per voice line; on "thẩm định" a document packet arrives at station 3 and
      its real status chip flips to "Đã duyệt" — cause → effect in one shot.
Text: none beyond the drawing labels (the voice carries it).
Transition out: hard cut on the voice pause back to the base style.
Sound: soft pen-scratch on the draws, one tick on the status flip.
Must not: draw stations the client does not have; shrink the inset screen.
Material: inputs/claim-review.png (station 3), the process from SCAN.md
```

---

## 5. "Looks expensive" checklist (motion designer, every beat, before the critique)

Look at the still at the key moment and the strip around the signature move:
- [ ] One focal point; I can say what the viewer looks at in each second.
- [ ] The signature move happens as the shot prompt says, on its word.
- [ ] Real UI, decomposed, filling ~70–85% of the frame, readable at phone width (or projector
      distance for case studies); strong contrast between UI and ground.
- [ ] Every move has a tier and settles; no linear slides; no bounce on type; no PowerPoint-small moves.
- [ ] Camera moves are motivated and land with a hold.
- [ ] Text enters after motion starts, leaves before the next move, holds long enough to read.
- [ ] The transition out connects to the next beat (match, morph, or continuing camera).
- [ ] Matches the hero beat's composition language (`ANIMATION_GUIDE.md`).
- [ ] Not a repeat of a card, screen or move already used in another beat.
- [ ] Nothing from the banned look; nothing in "Must not".

The checklist is the floor. Then run the critique (`review.md`): the taste question and the scores
are the bar.
