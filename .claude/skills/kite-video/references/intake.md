# Intake questions — wording and defaults

One question per message. Always offer the default so "ok" answers it. Skip what is known,
including every guess from `SCAN.md` the colleague confirmed.

| # | Ask (Vietnamese) | Default / options |
|---|---|---|
| 0 | "Để mình hiểu nhanh nhất, bạn gửi giúp mọi thứ đang có: **link website** hoặc landing page, **ảnh chụp màn hình**, **video quay màn hình**, slide hoặc tài liệu, release notes, và video mẫu bạn thích (nếu có). Kéo thả file vào đây hoặc dán link. Chưa có gì cũng được." | Then `writer` scan → confirm "Mình hiểu vậy có đúng không?" |
| 1 | "Mình làm video **marketing** (để người xem muốn dùng) hay **demo tính năng** (để người xem biết cách dùng)?" | Infer from wording; confirm |
| 2 | "Sản phẩm nào, chạy trên web hay mobile (iOS/Android)?" | — |
| 3 | "Ai sẽ xem, và xem xong mình muốn họ làm gì?" | Marketing: đăng ký dùng thử. Demo: tự làm được tính năng |
| 4 | "Đây là 3 thông điệp chính [writer] đề xuất — chọn một hay sửa?" | Producer's pick first |
| 5 | "Đăng ở đâu?" → formats | Web/YouTube 16:9 · feed 1:1 · TikTok/Reels/Shorts 9:16 |
| 6 | "Dài bao nhiêu?" | Marketing 30s (15/30/45) · Demo 60s (45/60/90) |
| 7 | "Giọng đọc: tiếng Việt hay Anh, nam hay nữ, trầm ấm hay năng động? Hoặc không cần giọng?" | Tiếng Việt, nữ, rõ ràng |
| 8 | "Nhạc nền kiểu gì?" | Demo: nhẹ nhàng · Marketing: sôi động · hoặc không |
| 9 | "Về phong cách, [đạo diễn] đề xuất 3 kiểu: … Chọn một, gửi video mẫu bạn thích, hay giữ phong cách công ty?" | Director's pick first; không → `kite-house` |
| 10 | "Bạn muốn xem **bản phác từng cảnh** trước, hay nhận thẳng **video cuối**?" | First video → bản phác; later → video cuối |
| 11a | Only if a needed key/connector is missing: "Máy chưa có [key]. Bạn có muốn thêm không? (cách thêm …)" | Không → làm thủ công |
| 11b | "Mình tự tạo qua API (~[ước tính], tính phí), hay bạn tự tạo theo prompt mình soạn?" | API if ready; nothing ready → thủ công, không hỏi |

Style handling (Q9): the shortlist, mixing and the visual picker are in `styles.md`. Present each
style in one Vietnamese line (feel + where it fits), never the catalog name alone. Ask about mixing
styles only for marketing videos ≥ 30s, and only after the base is chosen.

Style reference handling (Q9, reference given): `motion-designer` in look mode extracts a frame every 0.5s (ffmpeg),
describes palette (hex), type, shot lengths and transitions, and writes `style_guide.md` with
**take** (grammar) and **never take** (subject, brand, copy) lists. Show it back in 3 lines.
