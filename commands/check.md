---
description: Check whether this Mac and folder are ready for Kite Video Studio.
---

Run the readiness check in the current folder:

```bash
bash "${CLAUDE_PLUGIN_ROOT}/scripts/check.sh" "${CLAUDE_PLUGIN_DATA}"
```

Summarise it for the colleague in Vietnamese in two or three short lines: what is ready, what is
missing, and what to do (usually `/kite-video:setup`, or adding a key to `.env` with `open -e .env`).
