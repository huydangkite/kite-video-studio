# Resource checklist

Required (R) items block production; optional (O) items improve it. Ask one group at a time.
When asking for something, tell the colleague **how** to get it (the "how" column) — they may never
have done it before.

## Group 1 — Product screens

| Item | Marketing | Demo | How the colleague gets it | How you check it |
|---|---|---|---|---|
| Public URL of the product/landing page | R (web) | O | Copy from the browser | Fetch it / `npx hyperframes capture <url> -o videos/<slug>/inputs/capture --json`; report 404, login walls, cookie banners |
| Screen recording of the flow | O | **R** | Mac: `Cmd+Shift+5` → record selected portion. Windows: `Win+Alt+R`. iPhone: Control Centre → Screen Recording. Android: Quick Settings → Screen record. Record slowly, one take per step is fine. | ffprobe: duration, resolution ≥ 720p, orientation; look at 3–5 frames for personal data and notification banners |
| Screenshots of key screens | R if no URL/recording | O | Mac `Cmd+Shift+4`, phone power+volume | Real image, not blurry, not a photo of a screen |
| Test account (for logged-in pages you capture yourself) | O | O | A demo account — **never** their personal account | Never write the password into any file; ask them to type it only when needed, or prefer a recording |
| List of steps / features to show | R | **R** | 3–6 bullets in their words | Matches what the recording actually shows |

Mobile: ask which device frame (iPhone / Android / none) and whether both platforms look the same.

## Group 2 — Brand

Skip whatever `brand/brand.md` already has.

| Item | Req. | How | Check |
|---|---|---|---|
| Logo (SVG or PNG with transparent background) | R | Design team / website footer | Real file, transparency, light + dark variants if they exist |
| Brand colours (hex) | O | Brand guide, or you sample from the website capture | Show the palette back for confirmation |
| Fonts | O | Brand guide | Available on Google Fonts or provided as files |
| App store badges / QR (mobile marketing) | O | Official badge kits | Official artwork only |

## Group 3 — Words

| Item | Marketing | Demo | Notes |
|---|---|---|---|
| The one message | R | R | From intake |
| CTA text + destination (URL, store, "liên hệ sales") | R | O | Exact wording |
| Proof: numbers, customer quotes, logos | O | – | Only real, approved ones; ask "được phép công khai chưa?" |
| Existing copy: release notes, landing text, docs | O | O | Read it, quote back the facts you will use |
| Words/claims to avoid (legal, competitor names) | O | O | Ask once for marketing videos |

## Fallbacks (offer, never assume)

- No recording for a demo → capture public pages, or design-only UI scenes clearly styled as
  illustration (not presented as real screens).
- No logo file → use the logo captured from the site (`media-use` `logo` type); never redraw it.
- No brand colours → sample from capture/screenshots and confirm.
