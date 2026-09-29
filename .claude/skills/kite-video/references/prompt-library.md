# Prompt library

Tested prompt shapes from the Opus 5.5 wave, adapted to our two video types. The producer uses them
as starting points inside `PROMPT.md`; power users can also paste one straight into `./studio`.

## A. Marketing — one paragraph

> Make a dynamic [30]-second marketing video for [PRODUCT] ([URL]) with a motion designer's
> showreel energy. Use the real product screens, logo and colours. Don't paste screenshots flat —
> break them into components and icons and animate those. Motion follows the music. Make it a
> professional production, not a prototype. Formats: [9:16, 1:1].

## B. Marketing — brand beats

> One beat each, 2–4s: hook with the problem in ≤ 5 big words · the product UI assembles · [2–3]
> features, each a real UI action driven by a cursor or tap · proof [REAL metric, or skip] · logo +
> [CTA], held 2s. Show me stills of every beat before the full render.

## C. Feature demo

> [60]s demo of [FEATURE] for [USER], built from inputs/[recording]. Follow my click order and never
> invent a screen. Punch in on each control I use, speed up waiting and typing, blur personal data.
> Numbered step captions match the voice-over word for word.

## D. Reference first

> Reference: inputs/ref.mp4. Extract a frame every 0.5s, write style_guide.md (hex palette, type,
> shot lengths, transitions), then a shot list for our video in THAT style. Take the grammar, never
> the content. Wait for my OK before building.

## E. UI morph loop

See `ui-morph.md` — XML spec with inputs / direction / structure / gotchas / start.

## F. Critique pass

> You are a harsh motion director, not the proud author. Score every beat 1–10 on hook (first 2s),
> phone readability, motion, variety, composition, brand and sound sync. List the 3 worst problems
> with timestamps — overlapping swap text, sliding instead of easing, corner labels, centered title
> on gradient, blurry scaled text, dead beats. Fix only those, then re-score.

## Director notes (for revisions)

Speak in camera words; they translate directly: "slow every zoom to 0.7×", "hard cut here, no
transition", "push in on the button", "hold the logo one more second", "text bigger, background
calmer in beat 1".
