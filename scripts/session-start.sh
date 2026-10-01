#!/usr/bin/env bash
# SessionStart hook: run the readiness check quietly and hand the result to the producer as context.
out="$(bash "${CLAUDE_PLUGIN_ROOT}/scripts/check.sh" "${CLAUDE_PLUGIN_DATA:-}" 2>&1)"
status=$?
if [ $status -eq 0 ] && ! printf '%s' "$out" | grep -q '⚠️'; then
  msg="Kite Video Studio: máy đã sẵn sàng."
else
  msg="Kite Video Studio session check (tell the colleague in one sentence what is missing and offer /kite-video:setup before anything else):
$out"
fi
node -e 'process.stdout.write(JSON.stringify({hookSpecificOutput:{hookEventName:"SessionStart",additionalContext:process.argv[1]}}))' "$msg"
