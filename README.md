# Kite Video Studio

Làm **video marketing** và **video demo tính năng** cho sản phẩm web / mobile bằng cách trò chuyện
với một **nhà sản xuất** AI. Phía sau nhà sản xuất là một đội 5 chuyên gia: người viết (thông
điệp + kịch bản), biên tập viên kịch bản, đạo diễn, motion designer và kỹ sư video (kiêm âm thanh). Bạn chỉ làm việc với
nhà sản xuất.

---

## 1. Cài đặt (một lần, khoảng 10 phút)

Cần: máy Mac, tài khoản Claude của công ty.

```bash
# 1. Cài Claude Code (nếu chưa có)
curl -fsSL https://claude.ai/install.sh | bash

# 2. Lấy studio về
git clone https://github.com/huydangkite/kite-video-studio.git
cd kite-video-studio

# 3. Cài công cụ dựng video, giọng đọc, nhạc
./scripts/setup.sh
```

`setup.sh` cài Node, ffmpeg, Python numpy, bộ kỹ năng HyperFrames và trình duyệt dùng để dựng, rồi
tạo file `.env`. Mở `.env` và điền key công ty cấp: `ELEVENLABS_API_KEY` (giọng đọc, nhạc nền,
hiệu ứng âm thanh). `GEMINI_API_KEY` là tuỳ chọn.

Người AI trong video (người dẫn, người dùng sản phẩm) **không bắt buộc tài khoản Higgsfield**. Có
tài khoản thì studio tự tạo: mở studio, gõ `/mcp`, chọn `higgsfield` → đăng nhập một lần. Không có
thì chọn làm thủ công: nhà sản xuất soạn prompt, bạn tạo bằng Google Flow, Grok, Kling… rồi gửi file.

Không có key hay tài khoản nào ở trên cũng không sao: nhà sản xuất sẽ soạn sẵn prompt và thông số,
bạn tạo bằng công cụ bạn quen (Veo, Grok, Kling, ElevenLabs web…) rồi gửi file lại.

Kiểm tra lại bất cứ lúc nào: `./scripts/check.sh`

**Không cần cài thêm** Python/librosa (HyperFrames tự bắt nhịp nhạc), Playwright (HyperFrames có
trình duyệt riêng) hay Remotion (một bộ dựng là đủ).

## 2. Làm video

```bash
cd kite-video-studio
./studio        # mở Claude Opus 5.5, mức nỗ lực high (mặc định)
# hoặc chọn mức: ./studio medium | ./studio xhigh | ./studio max  (tối thiểu medium)
```

Rồi nói bạn cần gì, và **gửi luôn mọi thứ đang có** (link website, ảnh, video quay màn hình, tài liệu):

> Tôi muốn làm video demo tính năng xuất báo cáo PDF trên web, khoảng 1 phút. (kèm video quay màn hình)

> Làm video marketing 30 giây cho app mobile Kite, đăng TikTok và Facebook. Đây là link: …

### Bảy bước nhà sản xuất sẽ dẫn bạn đi

| Bước | Bạn làm gì | Đội làm gì phía sau |
|---|---|---|
| **1. Khai thác** | Gửi mọi tài nguyên đang có. Đọc **một phiếu brief** đã điền sẵn, "duyệt" hoặc sửa dòng nào. | Người viết quét link, ảnh, video để hiểu sản phẩm và đoán sẵn các lựa chọn. |
| **2. Ý tưởng** ① | Chọn 1 trong 3 hướng ý tưởng (hoặc ghép). | Đạo diễn đưa 3 hướng khác nhau: ý tưởng, mạch chuyện, 2 giây mở đầu, phong cách, khoảnh khắc ấn tượng. |
| **3. Kịch bản & giọng** ② | Duyệt kịch bản, nghe 2 giọng đọc nguyên một chương và chọn một. | Người viết → biên tập viên (cho lời tự nhiên, nối mạch) → đạo diễn (prompt chuyển động từng cảnh). |
| **4. Bản giao việc** | Không cần làm gì. | Đạo diễn viết `PROMPT.md`. |
| **5. Animatic** ③ | Xem bản phác có giọng và nhạc thật; duyệt là **khoá nội dung**. | Thu giọng, nhạc; dựng khung tĩnh từng cảnh ghép theo giọng. |
| **6. Dựng** ④ | Chờ đủ tài nguyên (vd clip người AI). Xem bản nháp, xin sửa tới khi ok. | Chỉ dựng khi đủ tài nguyên; dựng cảnh "hero" làm chuẩn, rồi các chương song song. |
| **7. Giao** ⑤ | Duyệt bản cuối. | Xuất mọi khổ hình, đo âm lượng và lỗi kỹ thuật. |

①–⑤ là các mốc duyệt; mỗi mốc được ghi lại ai duyệt, lúc nào, nói gì. Sau khi duyệt animatic, đổi
lời hoặc thứ tự sẽ phải dựng lại phần liên quan; nhà sản xuất sẽ báo trước.

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

## 4. Ba loại video

| | Video marketing | Video demo tính năng | Case study / chào bán B2B |
|---|---|---|---|
| Mục đích | Làm người xem muốn dùng thử | Người xem biết cách dùng | Lãnh đạo khách hàng tin và đồng ý bước tiếp |
| Độ dài | 15 / 30 / 45 giây | 45 / 60 / 90 giây | 45–120 giây |
| Nhịp | Mở đầu gây chú ý → vấn đề → 2–4 khoảnh khắc sản phẩm → kêu gọi hành động | Tiêu đề → khi nào cần → 3–6 bước có đánh số → kết quả → tìm hiểu thêm | Bối cảnh khách → điểm nghẽn → giải pháp → cách hoạt động trên quy trình của họ → bằng chứng → bước tiếp |
| Khổ hình | 9:16 cho TikTok/Reels, 1:1 cho feed, 16:9 cho web | 16:9 cho web, 9:16 cho mobile | 16:9 (phòng họp, email) |

Case study nhắc tên, logo hoặc dữ liệu của khách cần **xác nhận bằng văn bản** của khách.

## 5. Câu hỏi thường gặp

**Có tốn tiền không?** Có, một ít: giọng đọc, nhạc nền và hiệu ứng âm thanh (ElevenLabs) tính theo
lượng dùng trên tài khoản công ty. Trước khi tạo âm thanh, nhà sản xuất báo ước tính (bao
nhiêu giây giọng, giây nhạc, số hiệu ứng) và chờ bạn đồng ý.

**Mất bao lâu?** Khai thác, ý tưởng và kịch bản khoảng 20–40 phút trò chuyện. Animatic thêm khoảng
15 phút; dựng một video 30 giây 30–60 phút máy chạy (ước tính). Trong lúc đó bạn làm việc khác được.

**Video của tôi lưu ở đâu?** Trong `videos/` trên máy bạn. Thư mục này không được đưa lên kho chung.

**Làm lại video tương tự?** Sau mỗi video được duyệt, nhà sản xuất đề nghị lưu thành "công thức".
Lần sau chỉ cần nói *"làm video giống công thức demo tính năng"*.

**Máy báo thiếu công cụ hoặc dựng lỗi?** Chạy `./scripts/check.sh` rồi làm theo dòng ❌.

**Cập nhật studio?** `git pull` rồi `npx hyperframes@latest skills update`.

---

## Dành cho người quản lý studio

| File | Là gì |
|---|---|
| `CLAUDE.md` | Vai nhà sản xuất, bảng phân vai đội, luồng 7 bước và 5 mốc duyệt, chuẩn chất lượng |
| `.claude/skills/kite-video/SKILL.md` | Kịch bản làm việc của nhà sản xuất, từng bước và điều kiện chuyển bước |
| `.claude/skills/kite-video/references/` | Phiếu brief, danh sách tài nguyên, playbook chuyển động theo loại video, 55 phong cách, giọng văn, âm thanh, người AI, làm thủ công, mẫu bản giao việc, cách duyệt |
| `.claude/agents/` | 5 chuyên gia: writer, editor, director, motion-designer, video-engineer |
| `brand/` | Bộ nhận diện. **Đội thiết kế cần điền `brand/brand.md` và thêm logo trước khi phát hành.** |

Phần thiết kế cảnh, giọng, nhạc và dựng dùng bộ kỹ năng HyperFrames. Studio thêm lớp của công ty:
vai trò, luồng làm việc và chuẩn chất lượng. Các kỹ thuật lấy từ khoá học "How to build motion
design studio with Opus 5.5" (@0xMovez): bản giao việc của đạo diễn, phong cách tham khảo, chuyển
động có quán tính, nhiều khổ hình từ một bản dựng.
