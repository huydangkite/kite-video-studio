#!/usr/bin/env bash
# Quick readiness check. Prints one line per tool; exits 1 if anything required is missing.
set -u
fail=0
ok()   { printf '  ✅ %s\n' "$1"; }
bad()  { printf '  ❌ %s — %s\n' "$1" "$2"; fail=1; }
warn() { printf '  ⚠️  %s — %s\n' "$1" "$2"; }

echo "Kite Video Studio — kiểm tra máy"

if command -v node >/dev/null 2>&1; then
  major=$(node -p 'process.versions.node.split(".")[0]')
  if [ "$major" -ge 22 ]; then ok "Node $(node -v)"; else bad "Node $(node -v)" "cần Node 22 trở lên"; fi
else
  bad "Node" "chưa cài (chạy scripts/setup.sh)"
fi

command -v ffmpeg  >/dev/null 2>&1 && ok "ffmpeg"  || bad "ffmpeg"  "chưa cài (chạy scripts/setup.sh)"
command -v ffprobe >/dev/null 2>&1 && ok "ffprobe" || bad "ffprobe" "chưa cài (đi kèm ffmpeg)"
command -v claude  >/dev/null 2>&1 && ok "Claude Code" || bad "Claude Code" "chưa cài (xem README)"

if [ -f "$HOME/.claude/skills/hyperframes/SKILL.md" ] || [ -f ".claude/skills/hyperframes/SKILL.md" ]; then
  ok "HyperFrames skills"
else
  bad "HyperFrames skills" "chưa cài (chạy scripts/setup.sh)"
fi

if command -v heygen >/dev/null 2>&1; then
  ok "HeyGen CLI (giọng đọc, nhạc)"
elif [ -f .env ] && grep -q '^ELEVENLABS_API_KEY=.\+' .env; then
  warn "HeyGen CLI" "chưa cài — sẽ dùng ElevenLabs trong .env cho giọng đọc; nhạc nền cần HeyGen"
else
  warn "HeyGen CLI" "chưa cài — chưa tạo được giọng đọc và nhạc nền (chạy scripts/setup.sh)"
fi

exit $fail
