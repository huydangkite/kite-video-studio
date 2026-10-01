# Review — the colleague reviews by hand

There is no automatic critique loop. The crew checks its own work (each `motion-designer` snapshots
and fixes its chapter; `video-engineer` runs `check` and the technical gate), then the **colleague**
watches the draft and says what to change. The producer turns that into precise fixes.

## The review sheet (per draft, in `review/draft-<n>/`)

`video-engineer` makes it after every draft render, so the colleague can judge in a minute:

```bash
P=videos/<slug>/project; R=videos/<slug>/review/draft-<n>
npx hyperframes check $P                                                     # must be clean first
ffmpeg -i draft.mp4 -vf "fps=1,scale=360:-1,tile=6x5" -frames:v 1 $R/contact.png   # one frame per second, phone width
npx hyperframes snapshot $P --at <mid-point of every beat> -o $R            # one still per beat
```

The producer shows the draft (offer to open the preview) and the contact sheet, then asks **one**
question: "Bạn xem bản nháp nhé. Có chỗ nào muốn sửa không? (ghi số giây hoặc số cảnh)".

## Before showing a draft, the producer looks once

A 30-second glance at the contact sheet, not a scoring round. Fix before showing only if you see:
something from the banned look (`motion-rules.md`), invented UI, personal data, clipped or
unreadable text at phone width, or a wrong CTA. Everything else is the colleague's call.

## Turning feedback into fixes

- Translate into crew terms, camera words welcome: "slow the zoom to 0.7×", "hard cut here", "push
  in on the button", "hold the logo 1s longer", "text bigger, background calmer in beat 1".
- Route by owner: wording → `editor` (message or facts → `writer`); picture, pacing, style → `director` updates `PROMPT.md`, then
  the `motion-designer` for that chapter; timing, audio, render → `video-engineer`.
- Send only the affected chapters. Add a line to `PROMPT.md` → Revisions.
- Batch all of one round's notes into one pass; re-render once; show the colleague again.
- The colleague's "ok" ends it. After 3 rounds on the same issue, say what is limiting it and offer
  a choice instead of another round.

## Technical gate (measured, before the colleague sees a final)

Report numbers, not impressions. `video-engineer` runs these on every final:

```bash
F=videos/<slug>/final/<slug>-<ratio>.mp4
ffprobe -v error -show_entries stream=codec_name,width,height,r_frame_rate,sample_rate,channels -show_entries format=duration $F
ffmpeg -i $F -af ebur128=peak=true -f null - 2>&1 | tail -12      # −14 LUFS social / −16 web, true peak ≤ −1 dBTP
ffmpeg -i $F -vf blackdetect=d=0.1:pix_th=0.05 -an -f null - 2>&1 | grep black_start   # none outside intended fades
```

Plus: `npx hyperframes check` clean; if the music was arranged, `verify-arrangement.py` all within
±2 ms; `measure-mix-balance.py` shows music ~4–6 dB under the voice; resolution, fps and duration
as briefed. A failed check is a `video-engineer` fix, not a review round.
