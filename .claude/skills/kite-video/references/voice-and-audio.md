# Voice, music and sound

All audio goes through the `media-use` skill (resolve / generate), mixed with `hyperframes-audio`.
Do not write your own TTS or download music from random sites.

## Voice-over

- **Record voice first, then time the picture to it.** Generate each script line, measure its real
  length, and let scene durations follow the audio (plus ~0.3s breathing room). Never squeeze a line
  to fit a pre-set scene length; if the total runs long, shorten the script and get approval.
- Provider order:
  1. **HeyGen TTS** (default) — signed in via `heygen auth login --oauth`; pass `--lang vi` for
     Vietnamese (list voices with `--list` and pick a Vietnamese one) and it returns word timestamps
     for captions. Free monthly allowance (~10 min), then paid.
  2. **ElevenLabs** — if `ELEVENLABS_API_KEY` is in `.env`; strong multilingual voices.
  3. **Kokoro** (local, free) — English and a few other languages only; **not Vietnamese**.
- Play one sample line to the colleague before generating the whole script, so they approve the voice.
- Record the chosen voice id in `INTAKE.md` so revisions use the same voice.
- The colleague may record their own voice (`inputs/voice.m4a`); then transcribe it for captions and
  time the picture to it.

## Music

- `media-use` `bgm` from the HeyGen catalog (licensed). Mood from intake.
- Duck music under the voice (`hyperframes-audio` voiceover carve); music −18 to −22 LUFS under
  speech, final mix around −14 LUFS for social, −16 for web.
- Cut on the beat where it helps; do not let the beat override the voice timing.

## Sound effects

- Sparse: UI clicks/taps on demo steps, a whoosh on big transitions, a soft hit on the logo.
- From `media-use` `sfx`. Never louder than the voice.

## Captions

- Always burn in captions for social formats (1:1, 9:16) — most people watch muted.
- Use the TTS word timestamps; keep captions in the safe zone (see `hyperframes-studio`).
