---
name: kite-video
description: Company entry point for making a marketing video or a feature-demo video of a web or mobile product. Use FIRST whenever a colleague in this studio asks to make, create or plan a video ("làm video", "video demo", "video giới thiệu", "promo", "launch video"). Runs the intake, collects and checks the resources, writes INTAKE.md, then hands production to the hyperframes skill with every answer pre-filled, and closes with a frame critique loop.
---

# Kite Video — intake, resources, hand-off

HyperFrames and media-use already know how to design, voice and render a video. This skill adds
what they cannot know: **our** two video types, what each one needs from the colleague, our brand
kit, and a quality bar. Its job ends when `hyperframes` has a complete intake; it comes back for the
critique loop and delivery.

Talk per `CLAUDE.md`: the colleague's language (Vietnamese by default), one question at a time,
a recommended default with every question.

## 0. Before the first question

1. Run `scripts/check.sh` quietly. If something is missing, tell the colleague in one sentence what to
   run (`scripts/setup.sh`) and stop until it passes. Do not debug their machine.
2. Read `brand/brand.md`. If it is still the empty template, note it: you will ask for brand basics
   during resources.
3. If the colleague's first message already answers some questions below, do not ask them again.

## 1. Intake — the questions, in this order

Ask only what is still unknown. Stop asking once you can fill every field of `INTAKE.md`.

1. **Kind** — marketing video, or feature demo? (Default: infer from their wording; confirm.)
2. **Product & platform** — which product, web or mobile (iOS / Android / both)?
3. **Viewer** — who watches it and what they should do afterwards (sign up, try the feature, book a
   demo, understand a change). This becomes the call to action.
4. **The one message** — in one sentence, what should the viewer remember? Offer two or three
   candidate sentences from what you know; let them pick or edit.
5. **Where it will be posted** → format. Website/YouTube/email → 16:9; LinkedIn/Facebook feed → 1:1;
   TikTok/Reels/Shorts/app stores → 9:16. Several places → several formats from one build.
6. **Length** — marketing 15/30/45s (default 30), demo 45/60/90s (default 60).
7. **Language & voice** — voice-over language (default Vietnamese), male/female/neutral, calm or
   energetic. No voice-over (music + on-screen text only) is a valid answer.
8. **Music** — upbeat, calm, corporate, none. (Default: calm for demos, upbeat for marketing.)
9. **Look** — a reference they like: a frame (screenshot of a video), a video file/link, or a
   competitor's launch film. Default: the company house style from `brand/`. With a reference,
   extract a few frames (ffmpeg), describe palette, type, pacing and transitions shot by shot, and
   write `videos/<slug>/style_guide.md` — what to take and what **not** to take (never copy its
   subject or brand). Without a reference, the model falls back to centered text on a gradient;
   the brand kit plus a named style ("Apple keynote", "Linear launch", "hand-drawn") beats that.
10. **Review mode** — see a storyboard (still layouts) before the full build, or go straight to the
   video? Default: storyboard for the colleague's first video of this kind, straight through after.

Then read the matching reference and go to resources:
- marketing → `references/marketing.md`
- feature demo → `references/feature-demo.md`

## 2. Resources — ask, receive, verify

Open `references/resources.md` for the full checklist per kind × platform. Rules:

- Create the video folder now: `videos/<yyyy-mm-dd>-<short-slug>/inputs/`. Tell the colleague they
  can drag files into the terminal or give a path; copy everything they give into `inputs/`.
- Ask for resources **one group at a time** (screens → brand → copy), not as one long list.
  Show the whole checklist once, as a short preview, so they know what is coming.
- **Verify every item as it arrives**, and say what you found:
  - link → open it (capture or fetch); report if it needs login, is a 404, or redirects elsewhere.
  - screen recording → probe it with ffprobe: duration, resolution, orientation; flag < 720p,
    notification banners, personal data visible (look at a few frames).
  - image / logo → real file, resolution, transparent background for logos.
  - document → read it and quote back the 2–3 facts you will use.
- **Never fabricate.** No invented screens, features, prices, customer names or numbers. If a scene
  needs something they cannot provide, propose a design-only scene (typography, icons, abstract UI)
  and say so.
- Keep a live checklist in `INTAKE.md` (✅ received & checked / ⚠️ usable with caveat / ❌ missing).
  Continue only when every **required** item is ✅ or the colleague explicitly accepts a fallback.

## 3. Plan — INTAKE.md, then approval

Write `videos/<slug>/INTAKE.md` using `references/intake-template.md`: every answer from step 1, the
resource checklist, and a **beat-by-beat draft script** (time range · what is on screen · voice-over
line · on-screen text). Voice-over pace: about 2.5 words/second in Vietnamese, 2.3 in English —
check the draft fits the length.

Show the colleague the script as a short table and ask one question: approve, or what to change.
Loop until approved. This approval is the only content gate before rendering.

## 4. Hand-off to HyperFrames

Invoke the `hyperframes` skill with a message that says:

- This is a **formed request**; every answer in `videos/<slug>/INTAKE.md` is confirmed by the user —
  do not re-ask them, skip the pitch round, ask only fields the route still lacks.
- Project directory: `videos/<slug>/project/` (let `hyperframes init` create it; `INTAKE.md` and
  `inputs/` stay one level up).
- Route: see the reference for this kind (`product-launch-video` for marketing and public-site
  tours; `general-video` for demos built on screen recordings or mobile).
- Brand: `brand/` is the design system source — colours, fonts, logo file, tone. Logo is never redrawn.
- Voice-over is the approved script, **verbatim** (`VO_MODE: verbatim`), in the chosen language.
  Voice, music and SFX through `media-use` (see `references/voice-and-audio.md`).
- Formats to deliver: the list from intake, each laid out for its frame, never cropped from 16:9.
- Look: `videos/<slug>/style_guide.md` when there is one, else the brand kit. Motion quality bar:
  follow `hyperframes-animation` rules — spring-like easing with a hair of overshoot on UI, none on
  type; one focal point per beat; a visual change every 3–5s; no "everything fades in" default.
- Review mode: `storyboard: yes` (collaborative) or `no` (autonomous) from intake.
- Check `media-use` recipes first: if a company recipe for this kind exists (e.g.
  `kite-feature-demo`), adopt it.

From here HyperFrames drives production. Stay available: answer its questions from `INTAKE.md`
when possible; pass to the colleague only what `INTAKE.md` cannot answer.

## 5. Critique loop (before showing the colleague any render)

Follow `references/critique.md`: snapshot key frames, hand them to the `critic` agent with
`INTAKE.md` and `brand/brand.md`, fix the three worst problems, repeat. Stop when every axis scores
8+, after 3 rounds, or when the score stops improving — and tell the colleague which issues remain.

## 6. Delivery

Put finals in `videos/<slug>/final/`: `<slug>-16x9.mp4` (etc. per format), `poster.png`, and
`contact-sheet.png` (one still per beat), and `SUMMARY.md` (length, formats, voice, music, sources
used, known limitations). Tell the colleague
where the files are, offer to open the preview, and ask what they would like changed.

Once the colleague approves the video, offer **once** to save it as a recipe (`media-use` recipe
freeze) named after the kind, e.g. `kite-marketing-mobile` — the next video of that kind then starts
with brand, formats, voice and structure pre-filled. Tell the studio owner when a recipe is good
enough to share with everyone.

**Revisions** are small edits to the existing project — never a rebuild. Update `INTAKE.md` when the
content changes so the next session starts from the truth.
