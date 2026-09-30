# Manual generation — when a key or connector is missing

The studio never stops because a provider is missing. If `ELEVENLABS_API_KEY` is not set, or the
`higgsfield` MCP server is not signed in (or the colleague prefers their own tool), the producer
**writes an order** for each asset and the colleague makes it in any tool they have (Veo, Grok
Imagine, Kling, Higgsfield web, HeyGen, ElevenLabs web, Suno…), then drops the file in the folder.
Everything after that is the same pipeline: the files become resources like any other.

## Check, then ask (Phase 0 checks, Phase 1 question 11 asks)

**Check (silently, Phase 0):**
- Voice / music / SFX: the ElevenLabs line of `scripts/check.sh`.
- AI people (only if the video will use them): `claude mcp list` shows `higgsfield` connected.

**Ask (a) — only if something this video needs is missing,** one message, e.g.:
"Máy chưa có key ElevenLabs (để mình tự tạo giọng đọc, nhạc, hiệu ứng). Bạn có muốn thêm không?
Mở file `.env` trong thư mục studio, dán key vào dòng `ELEVENLABS_API_KEY=`, lưu lại rồi báo mình.
Đừng dán key vào chat nhé." For Higgsfield: "gõ `/mcp`, chọn higgsfield → Authenticate".
Default: "Không, làm thủ công". If they add it, re-check before question (b).

**Ask (b) — API or manual,** for each provider that is ready, with an estimate:
"Phần âm thanh: mình tự tạo qua API (ElevenLabs, khoảng ~N giây giọng, ~N giây nhạc, N hiệu ứng,
tính vào tài khoản công ty), hay bạn tự tạo theo prompt mình soạn? Mặc định: API."
Mixed answers are fine (API for voice, manual for AI people). Nothing ready and nothing added →
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
| Person, no speech (scene / customer role) | Veo (Gemini app, Flow) · Grok Imagine · Kling · Higgsfield web | Attach the same character image every time. Turn **off** or discard generated audio. |
| Person speaking (presenter) | Higgsfield web · HeyGen | The tool must accept **our** voice file (upload audio → lipsync). Veo and Grok generate their own voice: use them only for shots without speech. |
| Character reference image | Higgsfield Soul · Midjourney · Imagen/Gemini · Grok | Generate once, save as `inputs/ai/character.png`, reuse for every shot. |

## Licensing (say it once, in the order)

The colleague must use a plan whose terms allow **commercial use** of the output (many free tiers,
e.g. Suno's, do not). Note the tool and plan in `inputs/ai/log.md` (or `audio/log.md`).

## When files arrive

Verify like any resource (`resources.md`): `ffprobe` for duration, resolution, aspect ratio, audio
present or not; extract frames and look (faces, hands, flicker, text or logos, the screen area clean
for compositing). Say what you found in one line. If it fails, say exactly what to change in the
prompt or setting and ask for one retry; after two, fall back to a design-only shot.

- Voice files from outside: normalise to WAV, trim silence, then word timings with
  `npx hyperframes transcribe` (local, free), since there is no key for alignment.
- Music from outside: fit the beat grid and arrange (`voice-and-audio.md`) exactly as with generated
  music.
- All rules still apply: `ai-people.md` (no fake testimonials, AI never draws the product) and the
  banned look.
