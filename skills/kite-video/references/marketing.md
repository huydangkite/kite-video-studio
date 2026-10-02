# Marketing video

Goal: make the viewer want the product (or the release) and act on the call to action.

## Shape (default 30s)

| Beat | Time | Job |
|---|---|---|
| Hook | 0–2s | A problem, a bold claim, or the product's most striking screen. No logo intro. |
| Problem / promise | 2–8s | The pain the viewer knows, in their words. |
| Show it | 8–22s | 2–4 real product moments, one benefit each. One idea per beat, a visual change every 2–4s. |
| Proof | 22–26s | A real number, customer logo or quote — **only if the colleague provided it**. Otherwise skip. |
| CTA | 26–30s | Logo + one action (URL, store badge, "Dùng thử miễn phí"). Hold ≥ 2s. |

15s: hook → 2 moments → CTA. 45–60s: add a second "show it" block or a short how-it-works.

## Rules

- Sell benefits, show features: every product screen gets a benefit headline, not a feature name.
- Don't paste screenshots flat: break them into components (cards, buttons, icons, text) and
  animate those; keep one flat "this is the real product" moment at most.
- Real screens beat mock-ups. Public web → capture the site. Logged-in or mobile → use their
  recordings/screenshots, framed in a device or browser chrome, with zoom-ins on the part that matters.
- On-screen text ≤ 7 words per card; the voice-over carries the rest.
- Mobile product → prefer 9:16 as the primary format and show the phone full-bleed or in a frame.

## Route

- Public website available → `product-launch-video` (intent: sell; capture on).
- Mobile app or logged-in product → `product-launch-video` with the recordings/screenshots as
  `asset_candidates` and capture off, or `general-video` if the piece is mostly footage editing.
