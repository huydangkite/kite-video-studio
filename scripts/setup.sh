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

say "Engine dựng video (Playwright + Chromium) — môi trường riêng của plugin"
mkdir -p "$DATA/engine"
cp "$ROOT/skills/kite-video/engine/package.json" "$DATA/engine/package.json"
( cd "$DATA/engine" && npm install --silent --no-audit --no-fund && npx --yes playwright install chromium )

if [ "${2:-}" = "--hyperframes" ]; then
  say "HyperFrames (tuỳ chọn, chỉ dùng khi cần)"
  npx -y hyperframes@latest skills
  npx -y hyperframes@latest browser ensure
fi

say "Thư mục làm việc: $WORK"
[ -f .env ] || { cp "$ROOT/templates/env.example" .env; echo "Đã tạo .env (điền key vào đây)."; }
mkdir -p brand videos
[ -f brand/brand.md ] || { cp "$ROOT/templates/brand.md" brand/brand.md; echo "Đã tạo brand/brand.md mẫu."; }
# Project settings: merge the studio's permissions, and pin PATH so every crew agent finds node/ffmpeg
# (agents run non-interactive shells that do not load nvm or the user's profile).
mkdir -p .claude
TOOL_PATH="$(dirname "$(command -v node)"):$(dirname "$(command -v ffmpeg)"):/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
node -e '
  const fs = require("fs"), [tpl, out, path] = process.argv.slice(1);
  const base = fs.existsSync(out) ? JSON.parse(fs.readFileSync(out, "utf8")) : {};
  const t = JSON.parse(fs.readFileSync(tpl, "utf8"));
  base.permissions = base.permissions || {};
  for (const k of ["allow", "deny"]) base.permissions[k] = [...new Set([...(base.permissions[k] || []), ...(t.permissions[k] || [])])];
  base.permissions.defaultMode = base.permissions.defaultMode || t.permissions.defaultMode;
  base.env = { ...(base.env || {}), PATH: path };
  fs.writeFileSync(out, JSON.stringify(base, null, 2) + "\n");
' "$ROOT/templates/project-settings.json" .claude/settings.json "$TOOL_PATH"
echo "Đã cập nhật .claude/settings.json (quyền chạy ffmpeg, node; PATH cho các agent)."
[ -f .gitignore ] || printf '.env\nvideos/*\n.DS_Store\n' > .gitignore

say "Kiểm tra"
bash "$ROOT/scripts/check.sh" "$DATA" || true
echo
echo "Xong. Mở .env (open -e .env) và dán key ElevenLabs (hoặc Gemini) nếu có."
echo "Rồi nói với nhà sản xuất: \"Tôi muốn làm một video …\""
