#!/usr/bin/env bash
# One-time setup for a colleague's Mac, run from /kite-video:setup. Safe to run again.
# Usage: setup.sh <plugin data dir>   (current directory = the colleague's video workspace)
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"          # plugin root
DATA="${1:-${CLAUDE_PLUGIN_DATA:-$HOME/.kite-video}}"
WORK="$(pwd)"

say() { printf '\n▶ %s\n' "$1"; }

if [ "$(uname)" != "Darwin" ]; then
  echo "Bộ cài này dành cho macOS. Trên Windows/Linux: cài Node 22+, ffmpeg, Python 3 rồi chạy lại."
  exit 1
fi

say "Homebrew"
if ! command -v brew >/dev/null 2>&1; then
  echo "Máy chưa có Homebrew (cần mật khẩu máy nên phải tự cài). Mở Terminal và chạy:"
  echo '  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"'
  echo "Cài xong, gõ lại /kite-video:setup."
  exit 1
fi

say "Node 22+ và ffmpeg"
if ! command -v node >/dev/null 2>&1 || [ "$(node -p 'process.versions.node.split(".")[0]')" -lt 22 ]; then
  brew install node
fi
command -v ffmpeg >/dev/null 2>&1 || brew install ffmpeg
command -v python3 >/dev/null 2>&1 || brew install python

say "Python numpy (căn nhạc theo beat) — môi trường riêng của plugin"
mkdir -p "$DATA"
[ -x "$DATA/venv/bin/python" ] || python3 -m venv "$DATA/venv"
"$DATA/venv/bin/python" -c 'import numpy' 2>/dev/null || "$DATA/venv/bin/python" -m pip install -q numpy \
  || echo "Không cài được numpy — video vẫn làm được, chỉ thiếu bước căn điểm drop của nhạc."

say "HyperFrames skills và trình duyệt dựng video"
npx -y hyperframes@latest skills
npx -y hyperframes@latest browser ensure

say "Thư mục làm việc: $WORK"
[ -f .env ] || { cp "$ROOT/templates/env.example" .env; echo "Đã tạo .env (điền key vào đây)."; }
mkdir -p brand videos
[ -f brand/brand.md ] || { cp "$ROOT/templates/brand.md" brand/brand.md; echo "Đã tạo brand/brand.md mẫu."; }
if [ ! -f .claude/settings.json ]; then
  mkdir -p .claude && cp "$ROOT/templates/project-settings.json" .claude/settings.json
  echo "Đã tạo .claude/settings.json (cho phép ffmpeg, node, hyperframes chạy không cần hỏi)."
fi
[ -f .gitignore ] || printf '.env\nvideos/*\n.DS_Store\n' > .gitignore

say "Kiểm tra"
bash "$ROOT/scripts/check.sh" "$DATA" || true
echo
echo "Xong. Mở .env (open -e .env) và dán key ElevenLabs (hoặc Gemini) nếu có."
echo "Rồi nói với nhà sản xuất: \"Tôi muốn làm một video …\""
