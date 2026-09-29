# Kite Video Studio

Làm **video marketing** và **video demo tính năng** cho sản phẩm web / mobile bằng cách trò chuyện
với một **nhà sản xuất** AI. Phía sau nhà sản xuất là một đội 8 chuyên gia: marketer, người viết
kịch bản, đạo diễn, motion designer, sound designer, kỹ sư video, người duyệt chất lượng… Bạn chỉ
làm việc với nhà sản xuất.

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

`setup.sh` cài Node, ffmpeg, bộ kỹ năng HyperFrames, trình duyệt dùng để dựng, và HeyGen CLI (giọng
đọc + nhạc nền). Khi trình duyệt mở trang đăng nhập HeyGen, đăng nhập bằng email công ty.

Kiểm tra lại bất cứ lúc nào: `./scripts/check.sh`

**Không cần cài thêm** Python/librosa (HyperFrames tự bắt nhịp nhạc), Playwright (HyperFrames có
trình duyệt riêng) hay Remotion (một bộ dựng là đủ).

## 2. Làm video

```bash
cd kite-video-studio
./studio        # mở Claude Opus 5.5 ở mức nỗ lực rất cao (xhigh)
```

Rồi nói bạn cần gì:

> Tôi muốn làm video demo tính năng xuất báo cáo PDF trên web, khoảng 1 phút.

> Làm video marketing 30 giây cho app mobile Kite, đăng TikTok và Facebook.

### Năm bước nhà sản xuất sẽ dẫn bạn đi

| Bước | Bạn làm gì | Đội làm gì phía sau |
|---|---|---|
| **1. Khai thác** | Trả lời từng câu (có sẵn lựa chọn mặc định, "ok" là đủ). Gửi tài nguyên khi được hỏi. | Marketer (hoặc chuyên gia hướng dẫn sản phẩm) đề xuất thông điệp. Mọi file bạn gửi đều được kiểm tra ngay. |
| **2. Kịch bản** | Chờ vài phút. | Người viết kịch bản viết lời đọc và chữ trên màn hình. Đạo diễn chia cảnh, chọn chuyển động. |
| **3. Trao đổi** | Duyệt hoặc xin sửa kịch bản. Nghe 2 giọng mẫu, chọn một. | Nhà sản xuất sửa theo ý bạn tới khi bạn duyệt. |
| **4. Bản giao việc** | Không cần làm gì. | Đạo diễn viết `PROMPT.md`: bản giao việc đầy đủ cho đội sản xuất. Bạn giữ lại để làm lại hoặc chia sẻ. |
| **5. Sản xuất** | (Tuỳ chọn) duyệt bản phác từng cảnh. Nhận video. | Thu giọng trước, dựng từng cảnh song song, người duyệt chấm điểm, sửa tới khi đạt 8/10, xuất mọi khổ hình. |

Video nằm trong `videos/<ngày>-<tên>/final/`.

### Xin sửa video

Nói như với một đạo diễn thật, càng cụ thể càng tốt:
*"chậm phần phóng to lại"*, *"cắt thẳng ở đây, không chuyển cảnh"*, *"phóng vào nút Xuất PDF"*,
*"giữ logo thêm 1 giây"*, *"cảnh 1 chữ to hơn, nền đơn giản hơn"*, *"đổi giọng nữ"*.

## 3. Chuẩn bị tài nguyên — mẹo nhanh

| Bạn cần | Cách lấy |
|---|---|
| Quay màn hình web | Mac: `Cmd + Shift + 5` → Record Selected Portion. Thao tác chậm, dùng **tài khoản demo**. |
| Quay màn hình iPhone | Trung tâm điều khiển → Ghi màn hình. Bật "Không làm phiền" trước để không lộ thông báo. |
| Quay màn hình Android | Kéo thanh thông báo → Ghi màn hình. |
| Ảnh chụp màn hình | Mac `Cmd + Shift + 4`; điện thoại: nút nguồn + tăng âm lượng. |
| Video mẫu về phong cách | Link hoặc file một video bạn thích. Studio chỉ học cách chuyển động và màu sắc, không chép nội dung. |
| Gửi file cho nhà sản xuất | Kéo thả file vào cửa sổ Terminal, hoặc dán đường dẫn. |

**Video demo cần một video quay màn hình.** Video marketing cho web chỉ cần link trang sản phẩm
là bắt đầu được.

## 4. Hai loại video

| | Video marketing | Video demo tính năng |
|---|---|---|
| Mục đích | Làm người xem muốn dùng thử | Người xem biết cách dùng |
| Độ dài | 15 / 30 / 45 giây | 45 / 60 / 90 giây |
| Nhịp | Mở đầu gây chú ý → vấn đề → 2–4 khoảnh khắc sản phẩm → kêu gọi hành động | Tiêu đề → khi nào cần → 3–6 bước có đánh số → kết quả → tìm hiểu thêm |
| Khổ hình | 9:16 cho TikTok/Reels, 1:1 cho feed, 16:9 cho web | 16:9 cho web, 9:16 cho mobile |

## 5. Câu hỏi thường gặp

**Có tốn tiền không?** Giọng đọc và nhạc dùng hạn mức miễn phí hằng tháng của HeyGen (khoảng 10
phút giọng đọc). Nhà sản xuất sẽ hỏi trước khi dùng thứ gì tính phí.

**Mất bao lâu?** Khai thác và kịch bản khoảng 10–15 phút trò chuyện. Sản xuất một video 30 giây
có thể mất 30–60 phút máy chạy (ước tính). Trong lúc đó bạn làm việc khác được.

**Video của tôi lưu ở đâu?** Trong `videos/` trên máy bạn. Thư mục này không được đưa lên kho chung.

**Làm lại video tương tự?** Sau mỗi video được duyệt, nhà sản xuất đề nghị lưu thành "công thức".
Lần sau chỉ cần nói *"làm video giống công thức demo tính năng"*.

**Máy báo thiếu công cụ hoặc dựng lỗi?** Chạy `./scripts/check.sh` rồi làm theo dòng ❌.

**Cập nhật studio?** `git pull` rồi `npx hyperframes@latest skills update`.

---

## Dành cho người quản lý studio

| File | Là gì |
|---|---|
| `CLAUDE.md` | Vai nhà sản xuất, bảng phân vai đội, luồng 5 bước, chuẩn chất lượng |
| `.claude/skills/kite-video/SKILL.md` | Kịch bản làm việc của nhà sản xuất, từng bước và điều kiện chuyển bước |
| `.claude/skills/kite-video/references/` | Câu hỏi khai thác, danh sách tài nguyên, mẫu bản giao việc, quy tắc chuyển động, cách chấm điểm, thư viện câu lệnh, mẫu phim "biến hình UI" |
| `.claude/agents/` | 8 chuyên gia: marketer, product-educator, scriptwriter, director, motion-designer, sound-designer, video-engineer, qa |
| `brand/` | Bộ nhận diện. **Đội thiết kế cần điền `brand/brand.md` và thêm logo trước khi phát hành.** |

Phần thiết kế cảnh, giọng, nhạc và dựng dùng bộ kỹ năng HyperFrames. Studio thêm lớp của công ty:
vai trò, luồng làm việc và chuẩn chất lượng. Các kỹ thuật lấy từ khoá học "How to build motion
design studio with Opus 5.5" (@0xMovez): bản giao việc của đạo diễn, phong cách tham khảo, chuyển
động có quán tính, vòng tự chấm điểm, nhiều khổ hình từ một bản dựng.
