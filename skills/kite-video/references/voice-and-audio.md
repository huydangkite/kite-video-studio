# Voice, music and sound

Provider: **ElevenLabs** for voice, music, sound effects and word alignment (Gemini TTS as the
alternative for directed delivery), all through the studio's scripts in
`${CLAUDE_PLUGIN_ROOT}/skills/kite-video/scripts/`: `elevenlabs.mjs` (`voices` | `tts` | `music` | `sfx` |
`align`), `gemini.mjs` (`tts`), and `mix.mjs` for the mix. Keys: `ELEVENLABS_API_KEY` (required) and
`GEMINI_API_KEY` (optional) in `.env`; never printed.
Do not download music from random sites. No ElevenLabs key → the colleague makes the voice, music
and SFX from your orders (`manual-generation.md`); the rest of this file still applies. All of these are metered: the producer states the expected
usage before the first paid call of a video.

## Voice-over

- **Record voice first, then time the picture to it.** Generate each script line, measure its real
  length, and let scene durations follow the audio (plus ~0.3s breathing room). Never squeeze a line
  to fit a pre-set scene length; if the total runs long, shorten the script and get approval.
- Provider order:
  1. **ElevenLabs TTS** (default) — `elevenlabs.mjs voices --lang=vi` to find candidates, then
     `elevenlabs.mjs tts audio/vo/lines.json audio/vo` with a multilingual model that covers
     Vietnamese (`eleven_v3`, `eleven_multilingual_v2` or `eleven_flash_v2_5`) and a native Vietnamese
     voice from the voice library (or the company's cloned voice). Keep the same model, voice id and voice settings for
     every line of a video, so lines generated separately sound like one read.
  2. **Gemini TTS** — when only the Gemini key is set, or the colleague wants delivery directed by a
     prompt: `gemini.mjs tts audio/vo/lines.json audio/vo` with model `gemini-3.8-flash-tts`, a prebuilt voice (e.g. Kore, Puck, Fenrir) and a **style** prompt that
     directs delivery. Style prompts that worked: *keynote* "Energetic, upbeat tech product launch
     announcer. Confident, warm and playful, fast pace, crisp diction, smiling voice."; *hype*
     "Hyped trailer narrator, fast, punchy, playful, dramatic little pauses before reveals.";
     *outro* "Calm, warm and intimate, slow and soft, a quiet hopeful promise." Write the style in
     English even for Vietnamese lines.
  3. No key: the colleague records or generates the voice from `ORDERS.md` (`manual-generation.md`).
- Energetic lines may be sped up to 1.08× in the mix (ffmpeg `atempo`); calm and outro lines keep
  natural pace. Record the tempo in the brief.
- Before generating the whole script, the colleague hears the **first chapter** in 2 candidate
  voices (gate G2). Measure each voice's real pace (words per second); the script length is checked
  against the chosen voice's pace, not the 2.5 words/s default.
- Record the chosen voice id in `INTAKE.md` so revisions use the same voice.
- **Pronunciation:** when the display text and what should be spoken differ (version numbers,
  English product names in a Vietnamese line, abbreviations), the script carries both: `text`
  (shown in captions, matched for timing) and `say` (sent to TTS), e.g. "v3.34" / "phiên bản ba
  chấm ba mươi tư".
- **Word timings are the clock.** The TTS route gives no word timestamps, so align every line
  against its text: `node ${CLAUDE_PLUGIN_ROOT}/skills/kite-video/scripts/elevenlabs.mjs align <line.wav> "<text>" <out.json>`
  (fallback without a key: `npx hyperframes transcribe`, local and free). Store them in `audio/timing.json`, per beat:
  `"words": [["text", start, end], …]` with times in the film's timeline, lower-cased and without
  punctuation. Visuals are choreographed to words ("the chip appears on *đồng bộ*"), not to "0.8s
  after the beat starts", so re-timing the voice moves the picture with it.
- **One file per line**, trimmed to its first and last word (0.08s pre-roll, 0.15s tail, never past
  the midpoint to the neighbouring line). Lines are then placed independently, which is what lets a
  short line sit in a silent stop or a single word land on a music drop.
- The colleague may record their own voice (`inputs/voice.m4a`); then transcribe it for captions and
  time the picture to it.

## Music

- **ElevenLabs Music** from a composition plan, `audio/music/plan.json`:
  `positive_global_styles` (instrumental, genre, "exactly N bpm", "steady 4/4 grid", instruments,
  mood), `negative_global_styles` (vocals, singing, lyrics, tempo changes, long silence), and one
  `section` per chapter (`section_name`, `positive_local_styles` with its intent — intro, build,
  drop, groove, breakdown, tail —, `negative_local_styles`, `duration_ms`, `lines: []`). Ask for
  "one beat of total silence at the very end" of a build if a shout line sits before the drop.
  `node ${CLAUDE_PLUGIN_ROOT}/skills/kite-video/scripts/elevenlabs.mjs music audio/music/plan.json audio/music/source.mp3`
- ElevenLabs does **not** honour section lengths exactly: expect the drops in the wrong places and
  fix them with the arrangement step below, not by re-rolling. Keep the previous `source.mp3`
  before regenerating so you can compare. A calm ending can be a separate short composition faded
  in under the main track's tail.
- Fallback without an ElevenLabs key: the colleague makes the track from `ORDERS.md` (Suno, Udio,
  ElevenLabs web) or supplies a licensed one.
- **Beat grid:**
  `"${CLAUDE_PLUGIN_DATA}/venv/bin/python" ${CLAUDE_PLUGIN_ROOT}/skills/kite-video/scripts/fit-beat-grid.py <music> [--min-bpm N --max-bpm N]`,
  which prints BPM, BEAT0 and one row per bar with kick marks and energy, so you can see the track's
  own intro, builds, drops and breakdowns.
- **Arrange the drops (marketing, when the script has a big moment):** a catalog track rarely has
  its drop where the reveal is. Rather than re-rolling tracks, splice whole bars (multiples of 4
  beats) so a source build → drop lands on the target beat. Write
  `audio/music/arrangement.json` (`source`, `output`, `bpm`, `beat0`, `crossfade` 0.025,
  `fadeOut {beat, seconds}`, `segments [{to: [a, b], from, role}]`), then:
  ```bash
  node ${CLAUDE_PLUGIN_ROOT}/skills/kite-video/scripts/arrange-music.mjs videos/<slug>/audio/music/arrangement.json
  "${CLAUDE_PLUGIN_DATA}/venv/bin/python" ${CLAUDE_PLUGIN_ROOT}/skills/kite-video/scripts/verify-arrangement.py videos/<slug>/audio/music/arrangement.json
  ```
  Every segment must verify within ±2 ms. The first segment must start at 0s (otherwise the mixer
  re-bases the stream and everything shifts). A gap between segments is a **silent stop**: the
  place for a short line right before the drop. Voice timing still wins; move the music, not the voice.
- **Duck, but not too much.** Target: music **~5 dB under the voice while speaking**, close to voice
  level in the gaps. ~10 dB under reads as "there is no music". `mix.mjs` places every voice line from
  `timing.json`, ducks the music with a sidechain (threshold 0.03, ratio 3, attack 15 ms, release
  350 ms; change in `audio/mix/plan.json`), adds the SFX cues and normalises in two passes; tune the
  balance with `music.gain_db` (a generated track often needs +5 to +7 dB).
- **Measure, don't trust laptop speakers:** render the voice bus and the ducked music bus as stems
  and run
  `"${CLAUDE_PLUGIN_DATA}/venv/bin/python" ${CLAUDE_PLUGIN_ROOT}/skills/kite-video/scripts/measure-mix-balance.py --voice <stem> --music <stem>`.
- Final mix: −14 LUFS for social, −16 for web, true peak ≤ −1.5 dBTP (two-pass loudnorm).

## Sound effects

- Sparse: UI clicks/taps on demo steps, a whoosh on big transitions, a soft hit on the logo.
- **ElevenLabs SFX** from `audio/sfx/list.json` (`[{id, prompt, duration}]`, prompt influence 0.6):
  `node ${CLAUDE_PLUGIN_ROOT}/skills/kite-video/scripts/elevenlabs.mjs sfx audio/sfx/list.json audio/sfx`.
  Describe the sound concretely ("crisp soft UI click tap, modern app interface", 0.5s). Generate
  each once and reuse it across cues.
- Place cues by anchor: a spoken word (preferred), a music beat, or seconds after a cut. Never
  louder than the voice.

## Captions

- Always burn in captions for social formats (1:1, 9:16) — most people watch muted.
- Use the word timings: karaoke highlight on the current word (unread dimmed, current in the
  accent, read in full ink), ≤ 9 words per caption chunk split at punctuation.
- Keep captions in the caption band (`motion-rules.md` → Text on screen); nothing else lives there.

## After render

`render.mjs video --audio=../audio/mix.wav` encodes the mix once to AAC with the picture. Measure the
final (`review.md`, technical gate); if AAC pushed the true peak above −1.5 dBTP, lower the mix target
by 0.5 dB in `mix.mjs` and re-mux.
