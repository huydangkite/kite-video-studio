# Kite Video Studio

Làm **video marketing** và **video demo tính năng** cho sản phẩm web / mobile bằng cách trò chuyện
với một **nhà sản xuất** AI. Phía sau nhà sản xuất là một đội 5 chuyên gia: người viết (thông
điệp + kịch bản), biên tập viên kịch bản, đạo diễn, motion designer và kỹ sư video (kiêm âm thanh). Bạn chỉ làm việc với
nhà sản xuất.

---

## 1. Cài đặt (một lần, khoảng 15 phút)

Kite Video Studio là một **plugin của Claude Code**. Cần: máy Mac, tài khoản Claude của công ty,
và tài khoản GitHub đã được mời vào repo `huydangkite/kite-video-studio` (repo riêng tư).

```bash
# 1. Cài Claude Code (nếu chưa có), rồi gõ `claude` một lần để đăng nhập
curl -fsSL https://claude.ai/install.sh | bash

# 2. Tạo thư mục làm video (đặt ở đâu cũng được)
mkdir -p ~/Documents/Kite-Video && cd ~/Documents/Kite-Video

# 3. Thêm kho plugin của Kite và cài studio vào thư mục này
claude plugin marketplace add huydangkite/kite-video-studio
claude plugin install kite-video@kite-video-studio --scope project

# 4. Mở Claude trong thư mục này và gõ lệnh cài công cụ
claude
/kite-video:setup
```

`/kite-video:setup` cài Node, ffmpeg, Python numpy (trong môi trường riêng của plugin), bộ kỹ năng
HyperFrames và trình duyệt dùng để dựng; rồi tạo trong thư mục làm việc: `.env` (chỗ điền key),
`brand/brand.md` mẫu và thư mục `videos/`. Nếu máy chưa có Homebrew, lệnh sẽ đưa đúng một dòng để
bạn tự chạy trong Terminal (cần mật khẩu máy).

Cài theo `--scope project` thì nhà sản xuất **chỉ xuất hiện trong thư mục làm video**; mở Claude ở
thư mục khác vẫn là Claude bình thường.

**Key:** mở `.env` (`open -e .env`), dán `ELEVENLABS_API_KEY` (giọng đọc, nhạc, hiệu ứng);
`GEMINI_API_KEY` tuỳ chọn. Claude không bao giờ đọc file này (có hook chặn).

**Người AI** không bắt buộc tài khoản Higgsfield. Có tài khoản thì gõ `/mcp` → higgsfield →
Authenticate. Không có key hay tài khoản nào cũng không sao: nhà sản xuất soạn sẵn prompt và thông
số, bạn tạo bằng công cụ quen tay (Google Flow, Grok, Kling, ElevenLabs web…) rồi gửi file.

Kiểm tra máy bất cứ lúc nào: `/kite-video:check`. Mỗi lần mở Claude, studio cũng tự kiểm tra và
báo nếu thiếu gì.

**Cập nhật studio:** `claude plugin update kite-video@kite-video-studio` (hoặc bật tự cập nhật trong
`/plugin` → Marketplaces), rồi `npx hyperframes@latest skills update`.

## 2. Làm video

```bash
cd ~/Documents/Kite-Video
claude          # nhà sản xuất chạy Claude Opus 5.5, mức nỗ lực high (mặc định)
```

Đổi mức nỗ lực trong phiên bằng `/effort medium | high | xhigh | max` (tối thiểu medium).

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

**Máy báo thiếu công cụ hoặc dựng lỗi?** Gõ `/kite-video:check` rồi làm theo dòng ❌.

**Cập nhật studio?** `claude plugin update kite-video@kite-video-studio` rồi `npx hyperframes@latest skills update`.

---

## Dành cho người quản lý studio

Repo này là **gốc plugin** và đồng thời là **marketplace** (`.claude-plugin/`).

| File | Là gì |
|---|---|
| `.claude-plugin/plugin.json`, `marketplace.json` | Khai báo plugin `kite-video` và kho `kite-video-studio` |
| `settings.json` | `"agent": "producer"`: nhà sản xuất chạy làm phiên chính |
| `agents/producer.md` | Vai nhà sản xuất, luật studio, chuẩn chất lượng (Opus 5.5, effort high) |
| `agents/` | Đội: writer, editor, director, motion-designer, video-engineer |
| `skills/kite-video/` | Playbook (SKILL.md), references (phiếu brief, playbook chuyển động, 55 phong cách, giọng văn, âm thanh, người AI, làm thủ công, mẫu bản giao việc, duyệt), scripts âm thanh + test |
| `commands/` | `/kite-video:setup`, `/kite-video:check` |
| `hooks/hooks.json` | Kiểm tra máy khi mở phiên; chặn đọc `.env` |
| `.mcp.json` | MCP Higgsfield (người AI) |
| `scripts/` | setup, check, hook scripts |
| `templates/` | `.env` mẫu, `brand.md` mẫu, `.claude/settings.json` cho thư mục làm việc |

Kiểm tra trước khi push: `claude plugin validate . --strict` và
`python3 -m unittest discover -s skills/kite-video/scripts/tests`. Đổi phiên bản trong
`plugin.json` mỗi lần phát hành để đồng nghiệp nhận bản mới.

**Đội thiết kế cần điền `brand/brand.md` và thêm logo** trong thư mục làm việc (mẫu ở
`templates/brand.md`).

Phần thiết kế cảnh, giọng, nhạc và dựng dùng bộ kỹ năng HyperFrames. Studio thêm lớp của công ty:
vai trò, luồng làm việc và chuẩn chất lượng.
