#!/usr/bin/env bash
# One-time setup for a colleague's Mac. Safe to run again.
set -euo pipefail
cd "$(dirname "$0")/.."

say() { printf '\n▶ %s\n' "$1"; }

if [ "$(uname)" != "Darwin" ]; then
  echo "Script này dành cho macOS. Trên Windows/Linux, làm theo mục 'Cài đặt thủ công' trong README."
  exit 1
fi

say "Homebrew"
if ! command -v brew >/dev/null 2>&1; then
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  eval "$(/opt/homebrew/bin/brew shellenv 2>/dev/null || /usr/local/bin/brew shellenv)"
fi

say "Node 22+ và ffmpeg"
if ! command -v node >/dev/null 2>&1 || [ "$(node -p 'process.versions.node.split(".")[0]')" -lt 22 ]; then
  brew install node
fi
command -v ffmpeg >/dev/null 2>&1 || brew install ffmpeg

say "Python numpy (căn nhạc theo beat)"
python3 -c 'import numpy' 2>/dev/null || python3 -m pip install --user numpy \
  || echo "Không cài được numpy — video vẫn làm được, chỉ thiếu bước căn điểm drop của nhạc."

say "HyperFrames skills (cho Claude Code)"
npx -y hyperframes@latest skills

say "Trình duyệt dùng để dựng video"
npx -y hyperframes@latest browser ensure


say "File cấu hình"
[ -f .env ] || cp .env.example .env
echo "Mở file .env và điền ELEVENLABS_API_KEY (giọng đọc, nhạc, hiệu ứng); GEMINI_API_KEY tuỳ chọn."
echo "Key do công ty cấp. Không gửi key cho ai và không commit file .env."

say "Kiểm tra"
npx -y hyperframes@latest doctor || true
./scripts/check.sh
echo
echo "Xong. Gõ:  claude   rồi nói: \"Tôi muốn làm một video …\""
