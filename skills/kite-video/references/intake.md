# Intake questions — wording and defaults

Two messages, two questions: question 0 (send everything), then the brief sheet. Always offer the
default so "ok" answers it.

| # | Ask (Vietnamese) | Default / options |
|---|---|---|
| 0 | "Để mình hiểu nhanh nhất, bạn gửi giúp mọi thứ đang có: **link website** hoặc landing page, **ảnh chụp màn hình**, **video quay màn hình**, slide hoặc tài liệu, release notes, và video mẫu bạn thích (nếu có). Kéo thả file vào đây hoặc dán link. Chưa có gì cũng được." | Then `writer` scan → the brief sheet below |

## The brief sheet (one message after the scan)

Pre-fill every line from `SCAN.md` and the defaults; mark guesses with "(đoán)". Then one question.

```
Mình hiểu thế này:
• Sản phẩm: <tên> — <web / iOS / Android>; tính năng thấy được: <…>
• Loại video: <marketing / demo tính năng / case study B2B>
• Người xem → xem xong làm gì: <…> → <…>
• Đăng ở đâu → khổ hình: <…> → <16:9 / 9:16 / 1:1>
• Độ dài: <30s marketing · 60s demo · 60s case study>
• Giọng đọc: <tiếng Việt, nữ, rõ ràng>    • Nhạc: <nhẹ nhàng / sôi động / không>
• Người AI trong video: <không / người dẫn / diễn vai người dùng>
• Cách tạo giọng, nhạc, hiệu ứng<, người AI>: <studio tự tạo qua API ≈ … (tính phí) / bạn tự tạo theo prompt>
  <only if a key is missing: "Máy chưa có key ElevenLabs. Muốn studio tự tạo thì mở .env (open -e .env), dán key vào dòng ELEVENLABS_API_KEY=, lưu lại rồi báo mình; không thì mình soạn prompt để bạn tự tạo.">
• Còn thiếu: <resources still needed, with how to get them>

Duyệt, hay sửa dòng nào?
```

Defaults: marketing 30s (15/30/45), demo 60s (45/60/90), case study 60s (45–120); web/YouTube
16:9, feed 1:1, TikTok/Reels/Shorts 9:16, meeting room 16:9; voice Vietnamese, female, clear; music
calm for demos and case studies, upbeat for marketing; generation = API when a key is ready.
The look is not asked here: it comes with the concepts (G1). A reference video they sent is
used there.

Style reference handling (reference video sent): `motion-designer` in look mode extracts a frame every 0.5s (ffmpeg),
describes palette (hex), type, shot lengths and transitions, and writes `style_guide.md` with
**take** (grammar) and **never take** (subject, brand, copy) lists. Show it back in 3 lines.
