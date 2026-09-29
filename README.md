# Kite Video Studio

Làm **video marketing** và **video demo tính năng** cho sản phẩm web / mobile bằng cách trò chuyện
với Claude. Bạn nói cần video gì, Claude hỏi lại từng câu, xin đúng tài nguyên cần thiết, rồi tự
tạo giọng đọc, nhạc, hiệu ứng âm thanh và dựng video.

---

## 1. Cài đặt (một lần, khoảng 10 phút)

Cần: máy Mac, tài khoản Claude của công ty.

```bash
# 1. Cài Claude Code (nếu chưa có)
curl -fsSL https://claude.ai/install.sh | bash

# 2. Lấy studio về
git clone <địa-chỉ-repo-công-ty>/kite-video-studio.git
cd kite-video-studio

# 3. Cài công cụ dựng video, giọng đọc, nhạc
./scripts/setup.sh
```

`setup.sh` cài Node, ffmpeg, bộ kỹ năng HyperFrames, trình duyệt dùng để dựng, và HeyGen CLI
(giọng đọc + nhạc nền). Khi trình duyệt mở trang đăng nhập HeyGen, đăng nhập bằng email công ty.

Kiểm tra lại bất cứ lúc nào: `./scripts/check.sh`

**Không cần cài thêm** Python/librosa (HyperFrames tự bắt nhịp nhạc), Playwright (HyperFrames có trình duyệt riêng) hay Remotion (một bộ dựng là đủ).

## 2. Làm video đầu tiên

```bash
cd kite-video-studio
./studio        # mở Claude Opus 5.5 ở mức nỗ lực rất cao (xhigh) cho video mới
```

Rồi gõ, ví dụ:

> Tôi muốn làm video demo tính năng xuất báo cáo PDF trên web, khoảng 1 phút.

> Làm video marketing 30 giây cho app mobile Kite, đăng TikTok và Facebook.

Claude sẽ:

1. **Hỏi từng câu**: loại video, sản phẩm, người xem, thông điệp chính, nơi đăng, độ dài, giọng đọc.
2. **Xin tài nguyên**, từng nhóm một, và chỉ bạn cách lấy (quay màn hình, chụp ảnh, logo…).
   Mỗi thứ bạn gửi đều được kiểm tra ngay: link có mở được không, video quay có rõ không, có lộ
   thông tin cá nhân không.
3. **Viết kịch bản** theo từng nhịp (giây nào, hình gì, lời đọc gì). Bạn duyệt hoặc xin sửa.
4. **Cho nghe thử một câu giọng đọc**, bạn chọn giọng.
5. **Dựng video**, tự chụp lại từng cảnh, tự chấm điểm và sửa tới khi đạt chuẩn.
6. **Giao file** trong `videos/<ngày>-<tên>/final/`, mỗi khổ hình một file.

Muốn sửa? Cứ nói: *"cảnh 3 chữ to quá"*, *"đổi giọng nữ"*, *"thêm logo khách hàng ở cuối"*.

## 3. Chuẩn bị tài nguyên — mẹo nhanh

| Bạn cần | Cách lấy |
|---|---|
| Quay màn hình web | Mac: `Cmd + Shift + 5` → Record Selected Portion. Thao tác chậm, dùng **tài khoản demo**. |
| Quay màn hình iPhone | Trung tâm điều khiển → Ghi màn hình. Bật "Không làm phiền" trước để không lộ thông báo. |
| Quay màn hình Android | Kéo thanh thông báo → Ghi màn hình. |
| Ảnh chụp màn hình | Mac `Cmd + Shift + 4`; điện thoại: nút nguồn + tăng âm lượng. |
| Logo | File SVG hoặc PNG nền trong suốt (thường có sẵn trong `brand/`). |
| Gửi file cho Claude | Kéo thả file vào cửa sổ Terminal, hoặc dán đường dẫn. |

**Video demo cần video quay màn hình.** Video marketing cho web chỉ cần link trang sản phẩm là đủ
để bắt đầu.

## 4. Hai loại video

| | Video marketing | Video demo tính năng |
|---|---|---|
| Mục đích | Làm người xem muốn dùng thử | Người xem biết cách dùng |
| Độ dài | 15 / 30 / 45 giây | 45 / 60 / 90 giây |
| Nhịp | Mở đầu gây chú ý → vấn đề → 2–4 khoảnh khắc sản phẩm → kêu gọi hành động | Tiêu đề → khi nào cần → 3–6 bước có đánh số → kết quả → tìm hiểu thêm |
| Khổ hình | 9:16 cho TikTok/Reels, 1:1 cho feed, 16:9 cho web | 16:9 cho web, 9:16 cho mobile |

## 5. Câu hỏi thường gặp

**Có tốn tiền không?** Giọng đọc và nhạc dùng hạn mức miễn phí hằng tháng của HeyGen (khoảng 10
phút giọng đọc). Claude sẽ hỏi trước khi dùng thứ gì tính phí.

**Video của tôi lưu ở đâu?** Trong `videos/` trên máy bạn. Thư mục này không được đưa lên kho
chung.

**Claude hỏi nhiều quá?** Trả lời "ok" để nhận lựa chọn mặc định. Hoặc viết đủ thông tin ngay câu
đầu: loại video, sản phẩm, độ dài, nơi đăng, giọng.

**Dựng lỗi / máy báo thiếu công cụ?** Chạy `./scripts/check.sh` rồi làm theo dòng ❌.

**Cập nhật studio?** `git pull` rồi `npx hyperframes@latest skills update`.

---

## Dành cho người quản lý studio

- `CLAUDE.md` — quy tắc chung Claude đọc mỗi lần mở.
- `.claude/skills/kite-video/` — luồng hỏi, danh sách tài nguyên, mẫu kịch bản, cách chấm điểm.
- `.claude/agents/critic.md` — "người chấm" xem ảnh từng cảnh và chỉ ra 3 lỗi tệ nhất.
- `brand/` — bộ nhận diện thương hiệu. **Đội thiết kế cần điền `brand/brand.md` và thêm logo
  trước khi phát hành cho cả công ty.**
- Phần sản xuất (thiết kế cảnh, giọng, nhạc, dựng) do bộ kỹ năng HyperFrames đảm nhận; studio chỉ
  thêm lớp của công ty lên trên.
