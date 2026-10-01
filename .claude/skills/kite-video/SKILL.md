---
name: kite-video
description: The producer's playbook for making a marketing, feature-demo or B2B case-study video of a web or mobile product. Use FIRST whenever a colleague in this studio asks to make, plan or revise a video ("làm video", "video demo", "video giới thiệu", "promo", "launch video", "case study"). Resources and a one-page brief, three concepts, script and voice, an animatic that locks content, a hero beat, the build, a hand review, delivery - with five recorded approval gates.
---

# Kite Video — the producer's playbook

You are the producer (`CLAUDE.md`). You talk to the colleague; the crew (`writer`, `editor`,
`director`, `motion-designer`, `video-engineer`) works through the Agent tool. Every crew call gets
**file paths, not chat history**: the video folder, `INTAKE.md`, `PROMPT.md`, `brand/brand.md`, and
the specific task. Run independent crew calls in parallel.

Phases are strict: do not start a phase before the previous one's gate is passed.

**Five gates, each recorded in `INTAKE.md` → Approvals** (gate, date, who, their exact words, the
file and version they saw): **G1 Ý tưởng · G2 Kịch bản & giọng · G3 Animatic (khoá nội dung) ·
G4 Bản nháp (khoá hình) · G5 Bản cuối.** A gate passes only when the colleague answers the gate
question about the artefact you showed. "Làm đi, lát review" lets you continue, but the gate stays
*pending*: show that artefact again together with the next one. After G3, any change to words,
order or timing costs a rebuild of the affected chapters: say so, with the rough time, before
doing it. After G4, only fixes.

**Resources can arrive or be missed at any phase.** If the crew finds a gap later (a beat needs a
screen nobody sent, a number has no source), never fill it with an invented screen or fact: ask
the colleague once for that exact item, with how to get it and the fallback you will use if they
don't have it ("Cảnh 4 cần màn hình Cài đặt. Bạn chụp giúp (⌘⇧4)? Không có thì mình đổi cảnh 4
sang …"). If they send something new on their own, verify it, add it to `INTAKE.md`, and tell them
in one line which beats it changes.

---

## Phase 0 — Before the first question

1. Run `scripts/check.sh` quietly. If something required is missing, tell the colleague in one
   sentence to run `scripts/setup.sh`, and stop. Do not debug their machine.
2. Read `brand/brand.md`. Check quietly which providers are ready (ElevenLabs / Gemini key,
   `higgsfield` connected); they go into the brief sheet.
3. If `videos/*/PROMPT.md` exists for the video they mention, this is a **revision** → "Revisions".

## Phase 1 — Khai thác (resources + one-page brief)

1. **Resources first.** Your first reply asks for everything they have, in one message
   (`references/intake.md`, question 0). Create `videos/<yyyy-mm-dd>-<slug>/inputs/`, save what
   arrives, call `writer` (task: scan) → `SCAN.md`.
2. **One brief sheet.** From `SCAN.md`, send one pre-filled sheet (`references/intake.md`):
   what you understood, then kind (marketing · feature demo · case study), viewer → action, where
   posted → formats, length, voice, music, AI person yes/no, how assets get made (API with the cost
   estimate, or manual; a missing key is one line with how to add it). One question:
   "Duyệt, hay sửa dòng nào?". Everything they don't change is decided.
3. Collect what is still missing per `references/resources.md` and `SCAN.md`'s resource status,
   one group at a time, verifying each item as it arrives.

Write `INTAKE.md` (`references/intake-template.md`).
**Exit:** sheet approved; every required resource ✅ or a stated fallback accepted.

## Phase 2 — Ý tưởng (concept) · gate G1

1. `writer` (task: message) → `notes.md`: audience in their words, candidate messages, hooks,
   proof, CTA (or learning goal and steps for a demo).
2. `director` (task: concepts) → `CONCEPTS.md`: **three** directions, each a different story about
   the product, each in Vietnamese: the idea in one line, the story spine, the first 2 seconds, the
   look in plain words (the catalog style stays internal), the signature motion moment, why it fits
   this viewer. At least one must not look like a typical video of this industry.
3. Present the three in a few lines each with the director's pick first; one question: "Chọn hướng
   nào (hoặc ghép)?". Record **G1**.
4. `motion-designer` (mode: look) writes `style_guide.md` for the chosen direction's style(s).

## Phase 3 — Kịch bản & giọng · gate G2

In sequence:
1. `writer` (task: script) → `script.md` from the chosen concept: spine, then the beat table.
2. `editor` revises it for a natural, moving voice-over that flows scene to scene
   (`references/voice-writing.md`); facts, CTA and timing stay exact.
3. `director` (task: beats) adds the picture: per beat a **shot prompt**
   (`references/motion-playbook.md`), style, transition, sound cue; groups beats into 2–4 chapters
   and marks the **hero beat**.
4. `video-engineer` (task: voice-sample): 2 candidate voices each reading the **first chapter**;
   measure each voice's real words per second. If the script would run more than 10% long at that
   pace, `editor` trims before you present.

Present the editor's spine, the beat table (voice-over and on-screen text), and the two voice
samples; one question: "Duyệt kịch bản và chọn giọng nào?". Wording edits → `editor`; message or
facts → `writer`; picture → `director`. Record **G2**.

## Phase 4 — Bản giao việc (the production brief)

`director` writes `PROMPT.md` from `references/brief-template.md`. It **references** `script.md`,
`style_guide.md`, `CONCEPTS.md` (chosen direction) and `brand/brand.md` by path instead of copying
them, and adds what only the brief holds: the per-beat shot prompts, formats, sound, gates,
generation plan, watch-list. A fresh session with the brief and those files can make the video.
Check it against the template's checklist yourself.

## Phase 5 — Animatic · gate G3 (content lock)

1. **Audio + setup in parallel** — `video-engineer` task **audio** (voice, word timings, music,
   SFX, mix, `audio/timing.json`; state the paid usage first) and task **setup** (`hyperframes
   init`, captures, `project/style.json`, one slot per beat). Manual assets: write `ORDERS.md`
   (`references/manual-generation.md`) and wait for the files. AI people: per
   `references/ai-people.md` (you run Higgsfield, with the credit estimate and an OK).
2. `motion-designer` (mode: storyboard): one styled key frame per beat at the real layout.
3. `video-engineer` (task: animatic): the key frames cut on `audio/timing.json` with the real
   voice and music, simple moves only (push, cut), low resolution → `review/animatic.mp4`.
4. Show it; one question: "Nội dung, thứ tự và nhịp này ổn chưa?". Record **G3**.

## Phase 6 — Dựng (build) · gate G4 (picture lock)

**Resource gate — nothing is built until everything is here.** Before the hero beat, check every
asset `PROMPT.md` names: inputs, captures, AI clips (`inputs/ai/`), files from `ORDERS.md`, voice,
music, SFX, `audio/timing.json`. Each must exist and be verified (`INTAKE.md` resource table all ✅).
If anything is missing (e.g. the AI presenter clip is not back yet), do not start the build, not
even partially: tell the colleague exactly what is still missing and who makes it, and wait. The
animatic may use a labelled placeholder frame ("CHỜ CLIP AI — cảnh 3"); the build may not. If the
colleague decides to drop the asset instead, that is a content change after G3: update the script
and brief, re-show the affected part, then build.

1. **Hero beat first** — one `motion-designer` (mode: chapter) builds only the hero beat; you glance
   at its snapshot against `motion-playbook.md`'s "looks expensive" checklist. It becomes the
   reference frame every chapter matches.
2. **All chapters in parallel** — one `motion-designer` per chapter, each given the hero beat's
   snapshot and composition as the reference.
3. **Assemble & draft** — `video-engineer`: assemble, `npx hyperframes check` clean, mix, render a
   draft, remux, review sheet (`references/review.md`).
4. **Colleague review** — per `references/review.md`: glance yourself, show the draft, one
   question, route notes, re-render. Their ok records **G4**.

## Phase 7 — Giao (delivery) · gate G5

`video-engineer`: primary format final, each other format as its own layout, the technical gate
(`references/review.md`). Show the finals; their ok records **G5**.
Deliver: where the files are, what is in the video in two sentences, anything the gate flagged,
AI-content labelling if an AI person appears. Offer **once** to save a recipe (`media-use` recipe
freeze) so the next video of this kind starts pre-filled.

## Revisions

A revision is a small edit to the existing project — never a rebuild.
1. Translate the request into crew terms (camera words are fine: "slow the zoom to 0.7×", "hard
   cut here", "push in on the button").
2. Update `PROMPT.md` (and `script.md` if words change) and add a line to its Revisions section.
3. Send only the affected chapters to the owner (`references/review.md`), render a new draft, show
   the colleague.

A **restyle** ("làm thêm bản phong cách comic") is a new edition in its own folder
`videos/<date>-<slug>-<style>/` that reuses the approved script, voice, `audio/` and `timing.json`,
with a new style section in a copied `PROMPT.md`. The first edition stays untouched.
