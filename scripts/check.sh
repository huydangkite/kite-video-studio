#!/usr/bin/env bash
# Quick readiness check. One line per item; exits 1 if anything required is missing.
# Usage: check.sh [plugin data dir]   (current directory = the colleague's video workspace)
set -u
DATA="${1:-${CLAUDE_PLUGIN_DATA:-$HOME/.kite-video}}"
fail=0
ok()   { printf '  ✅ %s\n' "$1"; }
bad()  { printf '  ❌ %s — %s\n' "$1" "$2"; fail=1; }
warn() { printf '  ⚠️  %s — %s\n' "$1" "$2"; }

echo "Kite Video Studio — kiểm tra máy"

if command -v node >/dev/null 2>&1; then
  major=$(node -p 'process.versions.node.split(".")[0]')
  if [ "$major" -ge 22 ]; then ok "Node $(node -v)"; else bad "Node $(node -v)" "cần Node 22 trở lên (gõ /kite-video:setup)"; fi
else
  bad "Node" "chưa cài (gõ /kite-video:setup)"
fi
command -v ffmpeg  >/dev/null 2>&1 && ok "ffmpeg"  || bad "ffmpeg"  "chưa cài (gõ /kite-video:setup)"
command -v ffprobe >/dev/null 2>&1 && ok "ffprobe" || bad "ffprobe" "chưa cài (đi kèm ffmpeg)"

if [ -f "$HOME/.claude/skills/hyperframes/SKILL.md" ] || [ -f ".claude/skills/hyperframes/SKILL.md" ]; then
  ok "HyperFrames skills"
else
  bad "HyperFrames skills" "chưa cài (gõ /kite-video:setup)"
fi

if [ -x "$DATA/venv/bin/python" ] && "$DATA/venv/bin/python" -c 'import numpy' >/dev/null 2>&1; then
  ok "Python + numpy (căn nhạc theo beat)"
else
  warn "Python numpy" "chưa có — không căn được điểm drop của nhạc (gõ /kite-video:setup)"
fi

has_key() { [ -n "${!1:-}" ] || { [ -f .env ] && grep -q "^$1=.\+" .env; }; }
has_key ELEVENLABS_API_KEY && ok "ElevenLabs key (giọng đọc, nhạc, hiệu ứng)" \
  || warn "ElevenLabs key" "chưa có trong .env — studio sẽ đề nghị làm thủ công hoặc dùng Gemini"
has_key GEMINI_API_KEY     && ok "Gemini key (giọng đọc Gemini, nhạc Lyria)" || true

[ -f brand/brand.md ] && ok "brand/brand.md" || warn "brand/brand.md" "chưa có (gõ /kite-video:setup để tạo mẫu)"

exit $fail
