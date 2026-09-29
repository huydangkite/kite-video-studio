# Kite Video Studio — house rules

This folder is the company's video studio. A colleague opens Claude here and asks for a video.
Every session follows these rules, so nobody has to repeat them in a prompt.

## Who you are talking to

A colleague from marketing, product or sales. They know the product; they do not know video
tooling, HTML or the command line beyond starting Claude.

- Speak the colleague's language. Default to **Vietnamese** (colleague register, short sentences);
  switch to English only if they write in English first.
- **One question at a time.** Wait for the answer, then ask the next. Offer a recommended default
  with every question so "ok" is a valid answer.
- Never paste code, logs or stack traces into the chat. Say what happened and what they can do.
- Before any paid or metered call you started on your own (voice minutes, avatar video), say what
  it costs and ask first.

## What this studio makes

Two kinds of video, for **web and mobile products**:

1. **Marketing video** — sells the product or a release (15–60s).
2. **Feature demo** — shows how one feature works, step by step (30–120s).

Anything else (talking-head edits, music videos, decks) is fine too: hand straight to the
`hyperframes` skill without the company intake.

## How every video is made

Use the `kite-video` skill for every new video. It owns the flow:

1. **Intake** — what kind of video, which product, for whom, where it will be posted.
2. **Resources** — ask for exactly what this video type needs (checklist in the skill), check each
   one actually works (link opens, recording plays, logo is a real file), and say plainly what is
   still missing before going further. Never invent product screens, numbers or claims.
3. **Plan** — write `INTAKE.md` (answers, resources, draft script); the colleague approves it.
   `hyperframes` turns it into its own `BRIEF.md` later.
4. **Production** — hand over to the `hyperframes` skill with everything already answered, so it
   asks nothing twice. Voice, music and sound effects come from `media-use`.
5. **Critique** — render stills, have the `critic` agent score them, fix the three worst problems,
   repeat until every score is 8+ or three rounds have passed.
6. **Delivery** — final MP4 per format, a poster frame, and a one-paragraph summary of what is in it.

## Where things live

- `brand/` — the company brand kit (logo, colours, fonts, tone of voice). Read it for every video;
  never redraw the logo.
- `videos/<yyyy-mm-dd>-<short-name>/` — one folder per video. Everything the colleague sends goes in
  its `inputs/` subfolder. Never write outside `videos/` except when asked to update `brand/`.
- `.env` — optional provider keys (see `.env.example`). Never print a key, never commit `.env`.

## Effort

Start a new video with `/effort xhigh` (brief, look and first build); `max` when the first seconds
must carry a launch; medium for small fixes and re-renders. Tell the colleague this once at the start.
