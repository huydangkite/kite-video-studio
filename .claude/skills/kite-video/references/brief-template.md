# PROMPT.md — the production brief

The director writes this after the colleague approves the script. It is the **only** input the
production crew reads, so it must stand alone: someone with this file, the repo and the files it
names can make the video without the chat. Viral Opus 5.5 films ran on 9–19k-character briefs; the
prompt is 10% of the video, the brief is the rest. Aim for complete, not long.

Write it in English (crew language); quote the colleague's approved Vietnamese copy verbatim.

```markdown
# <Video name> — production brief

## 1. Film in one line
<Who it is for> + <what they feel/learn> + <what they do next>. Every decision is checked against
this line.

## 2. Kind, formats, length
- Kind: marketing | feature demo — Route: product-launch-video | general-video
- Formats: primary 9:16, also 1:1 (each its own layout, never cropped)
- Length: 30s (±10%, set by the measured voice-over)
- Review mode: storyboard first | straight to final

## 3. Audience & message
- Viewer: …  Action: …
- Message (approved): "…"
- CTA (exact text + destination): "…"

## 4. References & look
- Style guide: videos/<slug>/style_guide.md (take: …; do NOT take: subject, brand, copy)
- Look in 3–5 lines: palette mood, type personality, texture, camera language.
- Banned: <the studio list from motion-rules.md> + <anything this colleague rejected>.

## 5. Brand bible
- Logo: brand/logo.svg (never redrawn), inverse: …
- Colours: primary …, accent … (one accent), backgrounds …
- Fonts: display …, UI …
- Tone: …

## 6. Resources (all verified)
| File | What it is | Use in beat |
|---|---|---|
| inputs/flow.mov | web recording, 1920×1080, 52s | 3–6 |

## 7. Beat sheet (approved)
| # | Time | On screen (real resource) | Motion (tier, blueprint) | Voice-over (verbatim) | On-screen text (huge/subtitle) | Sound |
|---|---|---|---|---|---|---|
| 1 | 0–2.5s | … | Heavy, kinetic-type-beats | "…" | HUGE: "…" | whoosh in |

## 8. Must stay exact
Product names, numbers, UI labels, legal lines, CTA — never paraphrased or restyled.

## 9. Sound
Voice: <provider, voice id, language> — verbatim lines above. Music: <mood / track id>, ducked under
voice. SFX: <list per beat>. Loudness: −14 LUFS social / −16 web.

## 10. Tools & budget
Skills: hyperframes (+ the route), hyperframes-animation, media-use, hyperframes-audio.
Paid calls allowed: <none | voice up to N minutes>. Everything else: free/local.

## 11. Workflow gates (do not skip)
audio + timing → setup → [storyboard → colleague OK] → build per beat → check → critique loop
(≤3 rounds, all 8+) → formats → final.

## 12. Critique rubric
Use references/critique.md axes. Specific watch-list for this video: <e.g. "phone readability of
the table in beat 4", "the logo must not animate">.

## 13. Deliverables
final/<slug>-<format>.mp4 per format, poster.png, contact-sheet.png, SUMMARY.md (what is in it,
known limitations, what we'd improve next).

## Revisions
- <date>: <what changed, requested by>
```

## Director's checklist before handing over

- [ ] Every beat names a real resource or is explicitly design-only.
- [ ] Voice-over lines are the approved words, verbatim.
- [ ] Every motion names a tier and a blueprint/rule; nothing from the banned list.
- [ ] Text size decided per beat (huge vs subtitle), not uniform.
- [ ] Formats listed with the primary first.
- [ ] Anything the colleague said "no" to appears under Banned.
