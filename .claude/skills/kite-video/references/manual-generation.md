# Manual generation — when a key or connector is missing

The studio never stops because a provider is missing. If `ELEVENLABS_API_KEY` is not set, or the
`higgsfield` MCP server is not signed in (or the colleague prefers their own tool), the producer
**writes an order** for each asset and the colleague makes it in any tool they have (Veo, Grok
Imagine, Kling, Higgsfield web, HeyGen, ElevenLabs web, Suno…), then drops the file in the folder.
Everything after that is the same pipeline: the files become resources like any other.

## Check, then ask (Phase 0 checks; the brief sheet asks)

**Check (silently, Phase 0):**
- Voice: ready with **either** key — ElevenLabs (default) or Gemini (Gemini TTS).
- Music: ElevenLabs Music; with only a Gemini key, Lyria through `media-use`.
- SFX and word alignment: ElevenLabs only (alignment falls back to local `npx hyperframes transcribe`).
- Keys: the ElevenLabs and Gemini lines of `scripts/check.sh`.
- AI people (only if the video will use them): `claude mcp list` shows `higgsfield` connected.

**(a) Missing key — one line in the brief sheet,** only if something this video needs is missing. With neither key, e.g.:
"Máy chưa có key ElevenLabs (để mình tự tạo giọng đọc, nhạc, hiệu ứng). Bạn có muốn thêm không?
Mở file `.env` trong thư mục studio, dán key vào dòng `ELEVENLABS_API_KEY=`, lưu lại rồi báo mình.
Đừng dán key vào chat nhé." For Higgsfield: "gõ `/mcp`, chọn higgsfield → Authenticate".
With only a Gemini key, voice and music are covered; mention that SFX would be manual and offer
the ElevenLabs key as optional. Default: "Không, làm thủ công". If they add a key, re-check before
line (b).

**(b) API or manual — one line in the brief sheet,** for each provider that is ready, with an estimate:
"Phần âm thanh: mình tự tạo qua API (ElevenLabs, khoảng ~N giây giọng, ~N giây nhạc, N hiệu ứng,
tính vào tài khoản công ty), hay bạn tự tạo theo prompt mình soạn? Mặc định: API."
With only a Gemini key, the estimate names Gemini TTS for voice and Lyria for music. Mixed answers
are fine (API for voice, manual for AI people). Nothing ready and nothing added →
manual, no question.

Record in `INTAKE.md`: `Generation: voice api|manual · music api|manual · sfx api|manual ·
ai-people api|manual|none`. The colleague can switch any line later; ask again only if they do.

## The order (`videos/<slug>/ORDERS.md`, one block per asset)

Write every order to the file and show the colleague a short list in chat (asset, tool, where to
save). Each block has:

1. **What and why** — one line in Vietnamese: "Cảnh 3: chị chủ shop cầm điện thoại, mỉm cười".
2. **Suggested tool** — the one that fits best (table below) and one alternative.
3. **Prompt to paste** — complete, in English for video/music tools (they follow it better),
   self-contained: subject, action, setting, light, camera move, lens, mood, duration, and what must
   NOT appear (text, logos, UI on screens, extra people, watermarks).
4. **Settings** — aspect ratio (the primary format's), resolution (≥ 1080p), duration, fps if the
   tool asks, the reference image to attach (for character consistency).
5. **Save as** — exact path and name, e.g. `videos/<slug>/inputs/ai/03-shop-owner.mp4`.
6. **Check before sending** — 2–3 things the colleague can see themselves ("tay đủ 5 ngón",
   "màn hình điện thoại trống", "không có chữ trên hình").

## Which tool for what

| Asset | Good choices | Notes |
|---|---|---|
| Voice-over (Vietnamese) | ElevenLabs web · the colleague's own recording | One file per script line, named `audio/vo/<beat>-<n>.mp3`; same voice and settings for every line. Paste the exact line from `script.md`. |
| Music bed | ElevenLabs Music web · Suno · Udio | Give genre, BPM, length, sections (intro/build/drop/tail), "instrumental, no vocals". |
| SFX | ElevenLabs SFX web · a licensed library | One file per sound, `audio/sfx/<id>.mp3`. |
| Person, no speech (scene / customer role), b-roll | **Google Flow** (first choice) · Grok Imagine · Kling · Higgsfield web | Flow runs Veo: use **Ingredients to Video** with the character image for the same face in every shot, **Frames to Video** when the start/end frame must match a layout, **Scenebuilder** to extend a shot. Needs a Google AI Pro/Ultra plan. For shots without speech, discard the audio it generates. |
| Person speaking a short line on screen (customer role, dialogue) | **Google Flow** · Higgsfield web · HeyGen | Flow (Veo) generates the voice and lip-sync from the prompt: put the exact line in quotes, state language ("speaks Vietnamese"), voice (gender, age, tone) and "no background music". One line per clip (≤ 8s). The voice is the character's own, not the narrator's. |
| Presenter across several shots (narrator on camera) | Higgsfield web · HeyGen | Upload **our** voice file (lipsync), so the presenter sounds the same in every shot and timing follows `audio/timing.json`. Flow can also do it, but each clip may come out with a slightly different voice; only for a 1–2 shot presenter, and keep the character prompt identical. |
| Character reference image | Google Flow / Gemini (Imagen) · Higgsfield Soul · Midjourney · Grok | Generate once, save as `inputs/ai/character.png`, reuse for every shot (in Flow, as an ingredient). |

## Licensing (say it once, in the order)

The colleague must use a plan whose terms allow **commercial use** of the output (many free tiers,
e.g. Suno's, do not). Note the tool and plan in `inputs/ai/log.md` (or `audio/log.md`).

## When files arrive

Verify like any resource (`resources.md`): `ffprobe` for duration, resolution, aspect ratio, audio
present or not; extract frames and look (faces, hands, flicker, text or logos, the screen area clean
for compositing). Say what you found in one line. If it fails, say exactly what to change in the
prompt or setting and ask for one retry; after two, fall back to a design-only shot.

- A clip with its own spoken line (Flow): transcribe it (`npx hyperframes transcribe`) and check the
  words against the script **verbatim**, Vietnamese tones included; a wrong word means regenerate.
  Keep the dialogue track, discard any music or effects in it, and time that beat to the clip's
  real length (it replaces the voice-over for that beat in `audio/timing.json`).
- Voice files from outside: normalise to WAV, trim silence, then word timings with
  `npx hyperframes transcribe` (local, free), since there is no key for alignment.
- Music from outside: fit the beat grid and arrange (`voice-and-audio.md`) exactly as with generated
  music.
- All rules still apply: `ai-people.md` (no fake testimonials, AI never draws the product) and the
  banned look.
