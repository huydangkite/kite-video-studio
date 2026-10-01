# PROMPT.md — the production brief

The director writes this after gate G2 (script and voice approved). It is what the production crew
builds from. It **references** the approved files by path instead of copying them (copies drift);
what only the brief holds is written in full, above all the **shot prompt for every beat**. Someone
with this file, the repo and the files it names can make the video without the chat.

Write it in English (crew language); Vietnamese copy lives in `script.md` and is never paraphrased.

```markdown
# <Video name> — production brief

## 1. Film in one line
<Who it is for> + <what they feel/learn> + <what they do next>. Every decision is checked against
this line.

## 2. Kind, formats, length
- Kind: marketing | feature demo | case study — Route: product-launch-video | general-video
- Formats: primary 16:9, also 9:16 (each its own layout, never cropped)
- Length: 60s (±10%, set by the measured voice-over at <N> words/s)

## 3. Source files (approved; read them, do not re-derive)
- Concept: CONCEPTS.md → direction <A|B|C> (G1, <date>)
- Script & story spine: script.md (G2, <date>) — voice-over, `say`, on-screen text are verbatim
- Look: style_guide.md — base style `<name>`, guests `<name>` (chapter …), or none
- Brand: brand/brand.md · Motion standard: references/motion-playbook.md, motion-rules.md
- Kind reference: references/marketing.md | feature-demo.md | case-study.md

## 4. Message & CTA
- Message: "…" · CTA (exact text + destination): "…"
- Must stay exact: product names, numbers, UI labels, legal lines, CTA.
- Banned: the studio list in motion-rules.md + <anything this colleague rejected>.

## 5. Resources — the build starts only when every row is ✅
| File | What it is | Beat | Made by | Status |
|---|---|---|---|---|
| inputs/flow.mov | web recording, 1920×1080, 52s | 3–6 | colleague | ✅ verified |
| inputs/ai/03-presenter.mp4 | AI presenter, line 3 | 3 | Higgsfield (api) / colleague (ORDERS.md) | ⏳ waiting |

AI people (if any, references/ai-people.md): character id, clips per beat, screen replacement plan.

## 6. Chapters & hero beat
- Chapter 1: beats 1–3 (<name>) · Chapter 2: beats 4–7 · …
- Hero beat: <n> — built first; every chapter matches its composition language.

## 7. Shot prompts (one per beat, format in references/motion-playbook.md §3)
Beat 1 · 0.0–2.6s · Hook · style …
Blueprint: … · Frame: … · Camera: … · Choreography (anchored to words): … · Signature move: … ·
Text: … · Transition out: … · Sound: … · Must not: …

Beat 2 · …

## 8. Sound
Voice: <provider, model, voice id, settings, measured words/s>; `say` pronunciations: <list>.
Music: <composition plan or track>, BPM, arrangement (drops at beats …) or "as is".
Balance: music ~5 dB under the voice while speaking. SFX: per beat, anchored to words or beats.
Loudness: −14 LUFS social / −16 web, true peak ≤ −1.5 dBTP; remux the mix after render.

## 9. Generation & budget
Generation: voice … · music … · sfx … · ai-people … — manual assets come from ORDERS.md; never call
a provider for them. Paid usage approved: <voice ≈ N s, music ≈ N s, SFX N, AI clips N>.
Skills: hyperframes (+ the route), hyperframes-animation, media-use, hyperframes-audio.

## 10. Gates
G1 concept ✅ · G2 script & voice ✅ · G3 animatic · resource gate (all §5 ✅) · hero beat ·
chapters · G4 draft (by hand, until ok) · formats · technical gate · G5 final.

## 11. Review watch-list
Checked before the colleague sees a draft (references/review.md). Specific to this video: <e.g.
"phone readability of the table in beat 4", "the logo must not animate">.

## 12. Deliverables
final/<slug>-<ratio>.mp4 per format, poster.png, contact-sheet.png, SUMMARY.md.

## Revisions
- <date>: <what changed, requested by>
```

## Director's checklist before handing over

- [ ] Every beat has a complete shot prompt (all fields, "none" where empty) per motion-playbook §3.
- [ ] Every beat names a real resource in §5 or is explicitly design-only.
- [ ] One signature move per beat, one wow moment per chapter, neighbours never share a transition.
- [ ] The hero beat is the most representative beat of the base style, not the simplest.
- [ ] Formats listed with the primary first; 9:16 / 1:1 compositions described, not cropped.
- [ ] Anything the colleague said "no" to appears under Banned.
