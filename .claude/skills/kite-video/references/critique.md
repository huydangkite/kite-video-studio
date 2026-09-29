# Critique loop

A first render is rarely good; the viral pieces took 3 to 160 model calls. The crew looks at its own
frames before the colleague does. `video-engineer` makes the sheets, `qa` scores, the producer
routes fixes.

## Review sheets (per round, in `review/round-<n>/`)

```bash
P=videos/<slug>/project; R=videos/<slug>/review/round-<n>
npx hyperframes check $P                                   # must be clean first
npx hyperframes snapshot $P --at <t1,t2,…> -o $R           # one still per beat, fully on screen
# after a draft render (draft.mp4):
ffmpeg -i draft.mp4 -vf "fps=2,scale=270:-1,tile=6x5" -frames:v 1 $R/contact.png   # contact sheet
ffmpeg -ss <t-0.1> -i draft.mp4 -vf "scale=320:-1,tile=12x1" -frames:v 1 $R/strip-<t>.png  # 12 frames around each fast action
ffmpeg -i draft.mp4 -vf "fps=1,scale=360:-1,tile=5x3" -frames:v 1 $R/phone.png     # how it reads at phone width
```

Also run `hyperframes-animation`'s animation map on the composition to find dead zones (nothing
moving for > 3s) and collisions.

## Axes (1–10, per beat)

1. **Hook** — first 2s stop the scroll (beat 1 only).
2. **Legibility** — readable at 360px, contrast, safe zones, nothing clipped.
3. **Message** — the frame serves its beat; the one message is clear by the end.
4. **Motion** — tiers respected, eases not slides, no overlapping swap text, no dead beats.
5. **Variety** — the film does not repeat the same move/layout beat after beat.
6. **Brand** — real logo, palette, fonts, one accent, tone.
7. **Craft** — composition fits this format, sharp UI, no placeholder, no personal data, nothing
   from the banned list.
8. **Sound sync** — cuts on voice pauses, hits on beats, voice never masked (draft round only).

## Stop rule

- Every axis ≥ 8 on every beat → done.
- 3 rounds → stop; tell the colleague which issues remain.
- The lowest score did not improve since the last round → stop; more changes would only churn.

Log each round in `review/log.md`: scores, the three problems, who fixed them, result.
