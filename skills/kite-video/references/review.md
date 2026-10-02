# Review — the crew watches its own frames, then the colleague reviews by hand

Two rounds, in this order:

1. **Critique loop (crew, before anyone sees it).** Opus reads images, so the crew looks at what it
   rendered, scores it as a harsh motion director, fixes the worst problems and re-renders. This is
   the habit that separates films that look premium from drafts that come back "xấu". Each
   `motion-designer` does it per beat before returning a chapter; the producer does it on the
   whole draft before showing it.
2. **Colleague review.** The colleague watches the draft and says what to change; the producer
   turns that into precise fixes.

Passing checklists is not the bar. Two drafts once passed every check (fill %, px size, banned
list) and were still rejected as ugly. The critique always ends with a taste question.

## Review images (`video-engineer`, after every draft render, in `review/draft-<n>/`)

```bash
P=videos/<slug>/project; R=videos/<slug>/review/draft-<n>; D=$R/draft.mp4
npx hyperframes check $P                                                            # must be clean first
ffmpeg -i $D -vf "fps=2,scale=270:-1,tile=6x5" -frames:v 1 $R/contact.png          # 2 frames/s, whole film (add contact-2.png… past 15s)
ffmpeg -i $D -vf "fps=1,scale=360:-1,tile=5x3" -frames:v 1 $R/phone.png            # phone test: how it reads 360px wide
ffmpeg -ss <t−0.1> -i $D -vf "scale=320:-1,tile=12x1" -frames:v 1 $R/strip-<beat>.png  # 12 consecutive frames around each signature move
npx hyperframes snapshot $P --at <mid-point of every beat> -o $R                   # one still per beat
ffmpeg -stream_loop 1 -i $D -c copy $R/loop_check.mp4                               # loop films only: watch the seam
```

Contact and phone sheets show composition and readability; **strips are the only stills that show
motion** (pops, overlaps, slides, dead frames, blurry scaled text). Make one strip per signature
move, the hero beat's included, at the times the shot prompts give.

## The critique pass (prompt — use it as written)

> Open contact.png, phone.png and every strip-*.png and look at them properly.
> Be a harsh motion director, not a proud author.
>
> Score 1–10: hook in the first 2s · readability at phone size · motion quality (springs, no dead
> frames) · variety (something new every 2–4s for marketing, every 3–5s for demos and case
> studies) · composition · brand accuracy · sound sync (cuts on voice pauses and downbeats, hits on
> the named words).
>
> Then the taste question: would each frame on the contact sheet belong in a premium launch film
> (an Apple keynote, a top-tier SaaS launch)? Name the frames that would not.
>
> List the 3 biggest problems with timestamps. Hunt specifically for: text overlapping during
> swaps; anything sliding instead of easing; corner labels and frame borders; centered-on-gradient
> shots; blurry scaled text; a dead beat with nothing happening; a stutter at the loop seam; and
> the studio's known ugly frames:
> - real UI shown small on a big empty (often white) frame — UI should fill ~70–85% of the frame,
>   with any text the voice points to readable (≥ 18px at 1080p);
> - pale grey cards on a pale ground: no contrast, no focal point (use white UI on dark, or deep
>   shadow on light);
> - more than ~2s of raw scanned paper or a whole-document dump — isolate the one element the voice
>   names;
> - the same card or screen repeated across beats;
> - small pushes and slides that read as PowerPoint instead of a camera with intent;
> - tilted sticky-note labels and other cheap decoration.
>
> Fix them, re-render only the affected beats, make new review images and score again.

Log every round in `review/review_log.md`: draft, round, the seven scores, the taste verdict,
the 3 problems with timestamps, what was changed.

**Stop rule:** repeat until every score is **8+** and no frame fails the taste question, at most
**3 rounds**. If it is still below 8 after 3, show the colleague anyway and say in one line what is
holding it back and what would fix it (often a missing resource or a style choice).

## Who runs it

- **`motion-designer`, per beat (chapter mode):** snapshot at the key moment plus a strip around
  the signature move (`npx hyperframes snapshot` at 12 consecutive frame times, or a quick render of
  the beat and the `strip` command), the playbook's "looks expensive" checklist, then the critique
  pass on those images. Report the final scores with the chapter.
- **Producer, on the whole draft:** the critique pass on the review images. Fixes go to their owner
  (below); `video-engineer` re-renders and remakes the images. The producer does not show the
  draft until the stop rule is met.

## Showing the colleague

Show the draft (offer to open the preview) and the contact sheet, with one line on what the
critique fixed. Then **one** question: "Bạn xem bản nháp nhé. Có chỗ nào muốn sửa không? (ghi số
giây hoặc số cảnh)". Do not show scores unless asked.

## Turning feedback into fixes

- Translate into crew terms, camera words welcome: "slow the zoom to 0.7×", "hard cut here", "push
  in on the button", "hold the logo 1s longer", "text bigger, background calmer in beat 1".
- Route by owner: wording → `editor` (message or facts → `writer`); picture, pacing, style →
  `director` updates `PROMPT.md`, then the `motion-designer` for that chapter; timing, audio,
  render → `video-engineer`.
- Send only the affected chapters. Add a line to `PROMPT.md` → Revisions.
- Batch all of one round's notes into one pass; re-render once; run one critique round on the
  changed beats; show the colleague again.
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

Plus: `npx hyperframes check` clean; if the music was arranged, `verify-arrangement.py` all within
±2 ms; `measure-mix-balance.py` shows music ~4–6 dB under the voice; resolution, fps and duration
as briefed; loop films: `loop_check.mp4` has no visible seam. A failed check is a `video-engineer`
fix, not a review round.
