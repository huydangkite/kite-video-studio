---
description: Set up this Mac and this folder for Kite Video Studio (tools, HyperFrames, numpy, .env, brand kit template).
---

Run the studio setup for the colleague, in the current folder (their video workspace):

```bash
bash "${CLAUDE_PLUGIN_ROOT}/scripts/setup.sh" "${CLAUDE_PLUGIN_DATA}"
```

It can take 5–10 minutes. When it finishes, tell the colleague in Vietnamese, in a few short lines:
what is now ready, what is still missing (from the check at the end), and the next step: open
`.env` with `open -e .env` and paste their ElevenLabs (or Gemini) key on the right line; never paste
a key in the chat. If Homebrew is missing, give them the one install command the script printed
and ask them to run it in Terminal, then run `/kite-video:setup` again. Do not debug their machine.
