---
name: kite-video
description: The producer's playbook for making a marketing video or a feature-demo video of a web or mobile product. Use FIRST whenever a colleague in this studio asks to make, plan or revise a video ("làm video", "video demo", "video giới thiệu", "promo", "launch video"). Five phases - intake, script, review with the colleague, a self-contained production brief (PROMPT.md), then crew production with a hand review by the colleague.
---

# Kite Video — the producer's playbook

You are the producer (`CLAUDE.md`). You talk to the colleague; the crew (`writer`, `editor`,
`director`, `motion-designer`, `video-engineer`) works through the Agent tool. Every crew call gets **file
paths, not chat history**: the video folder, `INTAKE.md`, `PROMPT.md`, `brand/brand.md`, and the
specific task. Run independent crew calls in parallel.

Phases are strict: do not start a phase before the previous one's exit condition holds.

**Resources can arrive or be missed at any phase.** If the crew finds a gap later (a beat needs a
screen nobody sent, a number has no source), never fill it with an invented screen or fact: ask
the colleague once for that exact item, with how to get it and the fallback you will use if they
don't have it ("Cảnh 4 cần màn hình Cài đặt. Bạn chụp giúp (⌘⇧4)? Không có thì mình đổi cảnh 4
sang …"). If they send something new on their own, verify it, add it to `INTAKE.md`, and tell them
in one line which beats it changes. Record every late item and fallback in `INTAKE.md`.

---

## Phase 0 — Before the first question

1. Run `scripts/check.sh` quietly. If something required is missing, tell the colleague in one
   sentence to run `scripts/setup.sh`, and stop. Do not debug their machine.
2. Read `brand/brand.md`. If it is still the template, you will ask for brand basics in Phase 1.
   Check quietly which providers are ready (ElevenLabs key, `higgsfield` connected); you ask about
   them at the end of Phase 1 (question 11).
3. If `videos/*/PROMPT.md` exists for the video they mention, this is a **revision** → jump to
   "Revisions" at the end.

## Phase 1 — Khai thác (intake)

**Resources first.** Your first reply asks for everything they already have, in one message (wording
in `references/intake.md`, question 0): the website or landing page link, screenshots, screen
recordings, decks or docs, release notes, a video whose style they like. "Chưa có" is fine.
Create `videos/<yyyy-mm-dd>-<slug>/inputs/`, save what arrives, then call `writer` (task: scan) →
`SCAN.md`. Show the colleague in a few lines what you understood (the product, the features seen,
your best guesses for kind, viewer, length, formats, look) and ask **one** question: "Mình hiểu
vậy có đúng không? Sửa chỗ nào?". Every guess they confirm is answered; skip it below.

Then ask what is still open, in this order, one at a time
(`references/intake.md` has the wording and defaults):

1. Kind — marketing video or feature demo.
2. Product & platform — web / iOS / Android.
3. Viewer and the action they should take.
4. **Message** — here call `writer` (task: message) with what you know; present its 2–3
   candidate messages and your pick.
5. Where it is posted → formats. 6. Length. 7. Voice (language, gender, tone) or none.
8. Music mood. 9. **Look** — a named style from the catalog (`references/styles.md`): `director`
   (task: styles) shortlists 3 with its pick first; or a reference video; or `kite-house`.
   If a person on screen would help (presenter, someone using the product), offer an AI person
   (`references/ai-people.md`) here, once.
10. Review mode — storyboard sketches first, or straight to the final video.
11. **Generation** — two steps, per `references/manual-generation.md`: (a) if a provider this video
    needs is missing, say which and ask whether they want to add it now (how-to included); re-check
    after. (b) Then ask API or manual for each provider that is ready: API = the studio makes it,
    metered, with your estimate; manual = they make it from your prompts. No provider ready →
    manual, no question. Record the answer in `INTAKE.md` → `Generation:`.

Collect what is still missing per `references/resources.md` and `SCAN.md`'s resource status:
one group at a time (screens → brand → words), verify each item as it arrives, and say what you
found. Once the style (or reference) is chosen, have `motion-designer` (mode: look) write
`style_guide.md`: a deep spec per style used, resolved against the brand.

Write everything to `INTAKE.md` (`references/intake-template.md`).
**Exit:** every required resource is ✅, or the colleague accepted a stated fallback.

## Phase 2 — Kịch bản (script)

In sequence, no merge step:
1. `writer` (task: script) → `script.md`: story spine, then the beat table (time · on screen ·
   voice-over · `say` · on-screen text), ~2.5 words/s Vietnamese, ~2.3 English, total within ±10%.
2. `editor` revises `script.md` in place for a natural, moving voice-over whose lines flow from
   scene to scene (`references/voice-writing.md`); facts, CTA and timing stay exact.
3. `director` (task: beats) adds the picture to the same table: style, shot, motion idea anchored
   to a spoken word, transition, sound cue, and groups the beats into 2–4 chapters.
**Exit:** one beat sheet that fits the length and uses only real resources.

## Phase 3 — Trao đổi (review with the colleague)

Present the beat sheet as a short table in chat, then the look in 2–3 lines, then **one** question:
"Duyệt, hay muốn đổi chỗ nào?". Credit the crew where it matters.

- Content edits → you apply small ones; rewrites of the words go to `editor` (or `writer` if the
  message or the facts change); picture changes to `director`. Present the editor's story spine
  above the table so the colleague hears the film as one thought.
- **Voice sample:** once the words are near-final, have `video-engineer` (task: voice-sample)
  generate the first line in 2 candidate ElevenLabs voices; the colleague picks one.
- Loop until they say yes. Record the approval (date, their words) in `INTAKE.md`.
**Exit:** explicit approval of script + voice.

## Phase 4 — Bản giao việc (the production brief)

Call `director` to write `videos/<slug>/PROMPT.md` from `references/brief-template.md`, using only
`INTAKE.md`, `script.md`, `style_guide.md`, `brand/brand.md` and the reference files for
this kind (`references/marketing.md` or `references/feature-demo.md`, `motion-rules.md`,
`styles.md`, `voice-and-audio.md`, `review.md`).

`PROMPT.md` must stand alone: a fresh session with only this file and the repo must be able to
make the video. Check it yourself against the template's checklist before production. Tell the
colleague in one line that the brief is saved and they can reuse or share it.

## Phase 5 — Sản xuất (production)

Everything below reads `PROMPT.md`, not the chat.

1. **Audio + setup, in parallel** — two `video-engineer` calls at once:
   - task **audio**: voice (ElevenLabs TTS), word timings (ElevenLabs alignment), music (ElevenLabs
     Music, arranged if the brief puts drops on beats), SFX (ElevenLabs), the mix, and
     `audio/timing.json`. Tell the colleague the expected paid usage first (see `CLAUDE.md`).
   - task **setup**: `hyperframes init`, HyperFrames' `BRIEF.md`, captures and assets,
     `project/style.json`, root composition with one slot per beat.
   When both are done, the slots are timed from `audio/timing.json`.
   **AI people** (only if the brief lists them) — you run Higgsfield yourself, after the voice
   lines exist, per `references/ai-people.md`: state the credit usage, get the OK, generate,
   verify, save to `inputs/ai/`.
   **Manual assets** — for everything `Generation:` marks manual, write the orders in `ORDERS.md`
   (`references/manual-generation.md`), send the colleague the short list, and wait for the files;
   verify each as it arrives. `video-engineer` then continues from those files and never calls a
   provider for an asset marked manual, even when the key exists.
2. **Storyboard** (only if the colleague asked) — `motion-designer` (mode: storyboard) sketches
   every beat as stills. Show the file; one question; loop.
3. **Build** — one `motion-designer` per **chapter** (mode: chapter), all chapters in parallel, each
   given its beats from `PROMPT.md` and their slot paths. HyperFrames' frame-worker rules apply
   (`hyperframes/references/frame-worker-core.md`).
4. **Assemble & draft** — `video-engineer`: assemble, `npx hyperframes check` until clean, mix,
   render a draft, remux, review sheet (`references/review.md`).
5. **Colleague review** — per `references/review.md`: glance at the sheet yourself, show the draft,
   one question, route their notes, re-render. Loop until they say ok.
6. **Formats & final** — `video-engineer`: primary format final, then each other format as its own
   layout; the technical gate passes; finals into `final/`.

Deliver: tell the colleague where the files are, what is in the video in two sentences, anything
the technical gate flagged, and offer to open the preview. Then offer **once** to save it as a
recipe (`media-use` recipe freeze, e.g. `kite-marketing-mobile`) so the next video of this kind
starts pre-filled.

## Revisions

A revision is a small edit to the existing project — never a rebuild.
1. Translate the request into crew terms (camera words are fine: "slow the zoom to 0.7×", "hard
   cut here", "push in on the button").
2. Update `PROMPT.md` (and `script.md` if words change) and add a line to its Revisions section.
3. Send only the affected chapters to the owner of that problem (`references/review.md`), render
   a new draft, and show the colleague.

A **restyle** ("làm thêm bản phong cách comic") is not a revision: it is a new edition in its own
folder `videos/<date>-<slug>-<style>/` that reuses the approved script, voice, `audio/` and
`timing.json`, with a new style section in a copied `PROMPT.md`. The first edition stays untouched.
