# Feature demo

Goal: after watching, the viewer can find the feature and use it. Clarity beats flash.

## Shape (default 60s)

| Beat | Time | Job |
|---|---|---|
| Title | 0–4s | "<Feature> — <what it lets you do>" over the product. |
| Why | 4–10s | The situation where you need it, one sentence. |
| Steps | 10–50s | 3–6 steps. Each step: where to click/tap (highlight + cursor or tap ripple), what happens, one-line caption "Bước 2: …". |
| Result | 50–56s | The finished state, the benefit restated. |
| Next | 56–60s | Where to learn more / try it, logo. |

## Rules

- **The recording is the source of truth.** Follow the order the colleague actually clicked. Never
  invent a UI state that is not in the recording or screenshots.
- Slow the viewer down where it matters: zoom/punch-in on the control being used, dim the rest,
  speed up waiting/typing (1.5–4×), cut dead time.
- Every step has a numbered caption; captions and voice-over say the same thing in the same order.
- Hide personal data: blur emails, names, phone numbers, tokens visible in the recording.
- Web: show the browser frame with the URL bar cleaned (or hidden). Mobile: device frame, touch
  indicators on each tap.
- 16:9 is the default for web demos (docs, help centre); 9:16 for mobile demos.

## Route

- Screen recording provided (web or mobile) → `general-video` (footage edit: cuts, speed, zooms,
  callouts, captions, voice-over).
- Public web feature and no recording → `product-launch-video` with intent **show** (feature the
  site's captured screens) — but ask for a recording first: a demo from static screenshots is weaker.
