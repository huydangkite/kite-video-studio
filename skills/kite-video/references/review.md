# Review — the crew watches its own frames, early, then the colleague reviews by hand

Opus reads images, so the crew looks at what it made, judges it as a harsh motion director, fixes the
worst problems and looks again. Two lessons from real Kite films set the shape of this file:

1. **Judge taste on stills, before motion is built.** The Bảo Việt story film's storyboard contact
   sheet already showed 5 of the 6 things the colleague later called ugly (scanned yellow paper for a
   third of the film, tilted sticky-note labels, pale cards on a pale ground, small UI on empty frames,
   a repeated card). Nobody judged it then; 93 minutes of build later the draft was rejected in 3.
2. **Taste comes before the checklist.** The producer looked at four frames, said "text is readable,
   no empty frames", and two minutes later the colleague said "xấu". Scores and checks measure
   legibility, not beauty. Ask the taste question first, frame by frame.

## When the critique runs

| Stage | Who | On what | Rounds |
|---|---|---|---|
| Concept picker (G1) | motion-designer | the 3 styled frames | ≥ 1, until each frame passes the taste question |
| Storyboard (before G3) | motion-designer, then producer | one styled key frame per beat, at the real layout | **≥ 2 rounds even if the first scores 8+**, ≤ 4 |
| Hero beat | motion-designer, then producer | stills + a strip of the signature move | ≥ 2, ≤ 4 |
| Each chapter | motion-designer of that chapter | stills + strips of its beats | ≥ 2, ≤ 4 |
| Whole draft (before G4) | producer | contact, phone, strips | ≤ 2 confirming rounds |

Each chapter logs to its own `review/review_log-ch<n>.md` (storyboard: `review_log-storyboard.md`,
draft: `review_log-draft.md`), so parallel builders never edit the same file.

## The critique pass (use it as written)

> Open every image listed and look at each frame properly. Be a harsh motion director, not a proud
> author.
>
> **1. Taste, frame by frame (first, before any score).** For each frame: would it belong in a
> premium launch film (an Apple keynote, a top-tier SaaS launch)? Answer yes/no per frame and say in
> a few words what makes a "no" cheap. Look for the studio's known ugly frames:
> - real UI shown small on a big empty (often white) frame — UI should fill ~70–85% of the frame;
> - pale grey cards on a pale ground: no contrast, no focal point (white UI on dark, or a deep shadow
>   on light);
> - more than ~2s of raw scanned paper or a whole-document dump — isolate the one element the voice
>   names;
> - the same card or screen repeated across beats;
> - small pushes and slides that read as PowerPoint instead of a camera with intent;
> - tilted sticky-note labels and other cheap decoration; centered title on a gradient; corner labels.
>
> **2. Score 1–10:** hook in the first 2s · readability at phone size · motion quality (springs, no
> dead frames — strips only) · variety (pacing table in `motion-rules.md`) · composition · brand
> accuracy · sound sync (cuts on voice pauses and downbeats, hits on the named words — drafts only).
>
> **3. The 3 biggest problems,** with timestamps (or beat numbers). Hunt in strips for: text
> overlapping during swaps, anything sliding instead of easing, blurry scaled text, a dead beat, a
> stutter at a loop seam.
>
> **4. Fix them,** re-render only what changed, make new images and run the pass again.

**Stop rule:** at least the minimum rounds in the table, then stop when every frame passes the taste
question and every score is 8+, or at the maximum. Scores tend to hug the threshold (one film's third
round was all 8s); the taste verdicts decide. If still short at the maximum, say in one line what is
holding it back and what would fix it (often a missing resource or a style choice).

Log every round: stage, round, taste verdict per frame, the seven scores, the 3 problems, what changed.

## Review images (`render.mjs`, straight from the page — no video render needed)

```bash
E="${CLAUDE_PLUGIN_ROOT}/skills/kite-video/engine"; P=videos/<slug>/project; R=videos/<slug>/review/<stage>
node "$E/render.mjs" check  $P                                                  # errors, missing files, determinism
node "$E/render.mjs" sheet  $P --at=<mid-point of every beat> --cols=4 --tw=480 --out=$R/beats.png
for a in 0 15 30 45 …; do                                                      # whole film, 15s per sheet
  node "$E/render.mjs" sheet $P --range=$a:$((a+15)) --every=0.5 --cols=6 --tw=270 --out=$R/contact-$a.png
  node "$E/render.mjs" sheet $P --range=$a:$((a+15)) --every=1 --cols=5 --tw=360 --out=$R/phone-$a.png
done
node "$E/render.mjs" strip  $P --range=<t-0.2>:<t+0.2> --tw=320 --out=$R/strip-b<n>.png   # each signature move
node "$E/render.mjs" stills $P --at=<t> --out=$R/zoom                           # full-res detail of a doubtful frame
```

Formats other than 16:9: add `--format=9:16` (or `1:1`) and its own folder. Loop films: render the
film twice back to back (`ffmpeg -stream_loop 1 -i draft.mp4 -c copy loop_check.mp4`) and watch the seam.

## Showing the colleague

Show the draft (offer to open `render.mjs serve` or the MP4) and the contact sheets, with one line
on what the critique fixed. Then **one** question: "Bạn xem bản nháp nhé. Có chỗ nào muốn sửa không?
(ghi số giây hoặc số cảnh)". Do not show scores unless asked.

At G3 the colleague sees the styled storyboard contact sheet with the animatic and answers two
things: "Nội dung, thứ tự, nhịp ổn chưa?" and "Hình này đúng gu chưa?".

## Turning feedback into fixes

- Translate into crew terms, camera words welcome: "slow the zoom to 0.7×", "hard cut here", "push
  in on the button", "hold the logo 1s longer", "text bigger, background calmer in beat 1".
- Route by owner: wording → `editor` (message or facts → `writer`); picture of one chapter → that
  chapter's `motion-designer` directly, with the note and the timestamps (the director updates
  `PROMPT.md` only when the change alters the plan: order, a new shot, a different style); timing,
  audio, render → `video-engineer`.
- Batch all of one round's notes into one pass; re-render the affected range (`render.mjs video
  --range`) or the whole draft (fast); run one critique round on the changed beats; show again.
- The colleague's "ok" on a draft is gate **G4** (picture lock); their "ok" on the finals is **G5**.
  Record both in `INTAKE.md` → Approvals. Notes that change words, order or timing after G3 are a
  content change: say what it costs before doing it.
- The colleague's "ok" ends it. After 3 rounds on the same issue, say what is limiting it and offer
  a choice instead of another round.

## Technical gate (measured, before the colleague sees a final)

Report numbers, not impressions. `video-engineer` runs these on every final:

```bash
F=videos/<slug>/final/<slug>-<ratio>.mp4
ffprobe -v error -show_entries stream=codec_name,width,height,r_frame_rate,sample_rate,channels -show_entries format=duration $F
ffmpeg -i $F -af ebur128=peak=true -f null - 2>&1 | tail -12      # −14 LUFS social / −16 web, true peak ≤ −1.5 dBTP
ffmpeg -i $F -vf blackdetect=d=0.1:pix_th=0.05 -an -f null - 2>&1 | grep black_start   # none outside intended fades
```

Plus: `render.mjs check` clean; if the music was arranged, `verify-arrangement.py` all within ±2 ms;
`measure-mix-balance.py` shows music ~4–6 dB under the voice; resolution, fps (60 for finals) and
duration as briefed; loop films: no visible seam. A failed check is a `video-engineer` fix, not a
review round.
