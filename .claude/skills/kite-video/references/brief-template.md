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

## 4. Look & styles
- Base style: `<catalog name>` · Guests: `<name>` (chapter: …), or none · Style colours / display
  face opted in: yes | no
- Style map: beats 1–2 `<guest>` · 3–8 `<base>` · 9–10 `<guest>`. Switches on hard cuts at voice
  pauses; constants: logo, accent, UI face, captions, voice, music.
- Deep spec per style, copied in full from style_guide.md with tokens resolved (tokens, fonts with
  Vietnamese subset confirmed, layers, components, motion language, signature move, transitions,
  captions, never-list).
- Reference (if any): inputs/<ref> → take: …; do NOT take: subject, brand, copy.
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

AI people (if any, `references/ai-people.md`): character id, presenter lines / scene clips per
beat, screen replacement plan. Customer roles are dramatised scenarios; no fake testimonials.

## 7. Beat sheet (approved)
| # | Time | Style | On screen (real resource) | Motion (tier, blueprint, word anchor) | Transition in | Voice-over (verbatim) | On-screen text (huge/subtitle) | Sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0–2.5s | athletic-impact | … | Heavy, kinetic-type-beats, slab on "…" | cut | "…" | HUGE: "…" | hit on drop |

## 8. Must stay exact
Product names, numbers, UI labels, legal lines, CTA — never paraphrased or restyled.

## 9. Sound
Voice: ElevenLabs <model, voice id, settings, language, tempo> — verbatim lines above, `say`
pronunciations: <list>.
Music: ElevenLabs composition plan <genre, BPM, sections>, arrangement (drops at beats …, silent stop before …) or "as is".
Balance: music ~5 dB under the voice while speaking. SFX: <list per beat, anchored to words or
beats>. Loudness: −14 LUFS social / −16 web, true peak ≤ −1.5 dBTP; remux the mix after render.

## 10. Tools & budget
Skills: hyperframes (+ the route), hyperframes-animation, media-use, hyperframes-audio.
Scripts: .claude/skills/kite-video/scripts/ (elevenlabs.mjs, fit-beat-grid.py, arrange-music.mjs,
verify-arrangement.py, measure-mix-balance.py).
Generation (from INTAKE.md): voice … · music … · sfx … · ai-people … — manual assets come from
ORDERS.md; never call a provider for them.
Paid calls approved by the colleague: ElevenLabs voice ≈ <N> s, ElevenLabs music ≈ <N> s, SFX <N>
sounds, alignment <N> lines. Everything else: free/local.

## 11. Workflow gates (do not skip)
audio ∥ setup → [storyboard → colleague OK] → build per chapter → check → draft → colleague
review (by hand, until ok) → formats → technical gate → final.

## 12. Review watch-list
Checked before showing a draft (references/review.md). Specific to this video: <e.g. "phone readability of
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
- [ ] Every beat names a style; guests own whole chapters; no neighbouring beats share a transition.
- [ ] Each style used has its full deep spec in §4; every font has the Vietnamese subset.
- [ ] Text size decided per beat (huge vs subtitle), not uniform.
- [ ] Formats listed with the primary first.
- [ ] Anything the colleague said "no" to appears under Banned.
