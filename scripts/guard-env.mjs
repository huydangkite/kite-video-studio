// PreToolUse hook: block reading, editing or printing the .env file that holds provider keys.
// Scripts that need a key (elevenlabs.mjs, check.sh) read it themselves without exposing it.
let raw = "";
process.stdin.on("data", (c) => (raw += c));
process.stdin.on("end", () => {
  let input;
  try { input = JSON.parse(raw); } catch { process.exit(0); }
  const t = input.tool_input || {};
  const isEnv = (p) => typeof p === "string" && /(^|\/)\.env$/.test(p.trim());
  const cmdHitsEnv = (c) => typeof c === "string" && /(^|[\s'"=\/<>:])\.env(?![\w.-])/.test(c);
  const hit = isEnv(t.file_path) || isEnv(t.path) || cmdHitsEnv(t.command);
  if (hit) {
    process.stderr.write(
      "Blocked: .env holds provider keys and is never read, edited or printed by Claude. " +
      "Use the check script or the provider scripts, which read it themselves; " +
      "the colleague edits .env with: open -e .env\n",
    );
    process.exit(2);
  }
  process.exit(0);
});
