# Style catalog

54 studio styles in 8 families, plus the 8 HyperFrames built-ins (`hyperframes-creative`
`visual-styles.md`: Swiss Pulse, Velvet Standard, Deconstructed, Maximalist Type, Data Drift, Soft
Signal, Folk Frequency, Shadow Cut), which can be named the same way. Rules for choosing, mixing and
brand precedence are in `styles.md`; read that first.

Two styles have a **deep spec** (layers, components, full motion language) in `styles/`:
`glass-keynote` and `comic-multiverse`. For any other style, `motion-designer` (look mode) expands
the entry below into a deep spec with `styles/_template.md` before the brief is written.

**How to read an entry**

- Header line: feel · energy (calm / medium / high) · **demo-safe** if it keeps real UI large and
  readable enough for a feature demo.
- **Ground** — background, surface, line, ink, muted. **Sig** is the style's signature colour: used
  only when the colleague opts into style colours; otherwise the brand accent takes its place.
- **Type** — the treatment (case, weight, tracking, scale). Faces in brackets are suggestions for
  when the brand kit has no display face. Every face must include the Google Fonts `vietnamese`
  subset; check it before use.
- **Motion** — tier from `motion-rules.md`, ease and duration, the **signature move** that makes the
  style recognisable, and transitions (rotate them: no two neighbouring beats share one).
- **Texture**: anything baked (grain, halftone, paper) is a PNG tile, never live filters (renderer
  limit, see `motion-rules.md`).
- **Avoid**: how this style most often goes wrong.

Excluded on purpose: *holographic HUD* and other looks whose core is corner labels, frame borders or
glow on UI chrome (the studio's banned look).

---

## 1. Product & keynote

### `precision-dark-product`
Linear-style launch page in motion: exact, quiet, expensive · medium · demo-safe
- Ground: bg `#0B0B0F` · surface `#16161D` · line `#26262F` · ink `#EDEDF2` · muted `#8A8A99`. Sig: `#7C6CFF`.
- Type: display = UI face at 600, −2% tracking, sentence case; labels in mono 12px caps [JetBrains Mono].
- Layout: UI panels at 60–70% of frame, 1px hairlines, left-aligned copy, generous negative space.
- Motion: Default, `power3.out` 0.5s; slow camera push 1.00→1.06 per beat. Signature: a hairline
  draws, then the panel settles onto it. Transitions: hard cut, card-morph, zoom-through.
- Texture: none (2% noise max). Avoid: violet glow behind panels; gradient headline text.

### `premium-ui-demo`
The product is the hero, shot like a keynote demo · medium · demo-safe
- Ground: bg `#F4F4F2` · surface `#FFFFFF` · line `#E3E3DF` · ink `#141414` · muted `#6B6B66`. Sig: brand.
- Type: UI face throughout, headline 600 at 64–80px, captions as subtitles.
- Layout: one real screen at 75–85% of frame, soft drop shadow (y 24, blur 60, 12%), cursor visible.
- Motion: Snappy cursor, Default camera. Signature: camera follows the cursor, punches in 1.4× on
  each control used. Transitions: continuous camera moves, match-cut between screens.
- Texture: none. Avoid: tilting the device in 3D for no reason; tiny UI.

### `saas-bento`
A feature grid that assembles like a landing page · medium · demo-safe
- Ground: bg `#0E0F12` or `#F6F5F1` · tiles `#17181C` / `#FFFFFF` · line 8% ink · ink / muted. Sig: brand.
- Type: tile titles UI face 600 at 28–36px; one big headline 600 per chapter.
- Layout: 2×3 or 3×3 bento of unequal tiles, radius 20–28, gutters 16–24; each tile = one real
  UI crop or number.
- Motion: Default. Signature: tiles land in a stagger (60ms) then one tile expands to full frame
  (`anchored-layout-expand`). Transitions: tile-expand, tile-collapse.
- Texture: none. Avoid: identical tile sizes; placeholder icons in tiles.

### `glass-keynote` — deep spec: `styles/glass-keynote.md`
Calm premium launch: indigo space, frosted cards, serif-italic accents · medium · demo-safe
- Ground: bg `#070817` · card indigo 94% · stroke `rgba(196,181,253,.26)` · ink `#F5F3FF` · muted `#AEACD6`. Sig: `#A78BFA`.
- Type: display 800 −3.5% tracking with one italic-serif accent word; mono kickers.
- Motion: Default, `power3.out`/`expo.out`. Signature: headline rises, accent word lands in italic.

### `keynote-stage`
One statement at a time on a dark stage · calm · demo-safe
- Ground: bg `#050505` · surface `#111` · ink `#F5F5F5` · muted `#7A7A7A`. Sig: brand.
- Type: display 700 at 120–180px, sentence case, max 5 words; nothing else on screen.
- Layout: statement left-third or product alone at center with a soft floor shadow.
- Motion: Heavy, `power4.out` 0.8s. Signature: word-by-word on the voice, previous words dim to 30%.
  Transitions: hard cut to black and back, slow push.
- Texture: faint vignette only. Avoid: centered statement on a gradient (banned); two ideas per card.

### `minimal-future-product`
White space, thin type, slow camera · calm · demo-safe
- Ground: bg `#FAFAFA` · surface `#FFFFFF` · line `#EAEAEA` · ink `#111` · muted `#8C8C8C`. Sig: brand.
- Type: display 300–400 at 96px+, generous tracking (+1%); tiny mono meta labels.
- Layout: 60%+ empty frame; objects small and precise; strict margins.
- Motion: Heavy, `power2.inOut` 1.0s; everything drifts slowly. Signature: long camera dolly across
  a clean surface. Transitions: dissolve-free cuts, long dolly continues across the cut.
- Texture: none. Avoid: filling the space; fast cuts.

### `product-spec-film`
Engineering spec callouts around the real UI · medium · demo-safe
- Ground: bg `#0F1115` · surface `#171A20` · line `#2E333D` · ink `#E8EAED` · muted `#8B93A1`. Sig: `#4DA3FF`.
- Type: UI face for values, mono for labels; numbers large with units small.
- Layout: UI at center-left; leader lines run to callouts on the right with one value each.
- Motion: Default. Signature: leader line draws from the UI element, callout value counts up.
  Transitions: rotate-around (2D pan), cut.
- Texture: none. Avoid: callouts on fake specs; more than 4 callouts per frame.

### `device-hero`
Phone or laptop as sculpture, product-photography light · calm · demo-safe
- Ground: bg `#E9E7E3` or `#0A0A0A` · floor shadow · ink / muted. Sig: brand.
- Type: display 600 short lines above or beside the device.
- Layout: device at 50–65% of frame height, real screen recording inside (`device-surface-showcase`).
- Motion: Heavy device, Default screen. Signature: slow 2D turn + light sweep on the bezel (not the
  UI). Transitions: device slides out, next device slides in on the same axis.
- Texture: soft studio gradient on the background only. Avoid: glare over the UI; fake devices.

### `systematic-enterprise`
Calm, trustworthy B2B: grids, tables, process · calm · demo-safe
- Ground: bg `#F5F7FA` · surface `#FFFFFF` · line `#DDE3EA` · ink `#0F1B2D` · muted `#5B6B80`. Sig: `#1F5EFF`.
- Type: UI face 600 headlines, tabular numerals for data.
- Layout: 12-column grid, content aligned to it; tables and flow steps from the real product.
- Motion: Default, no overshoot. Signature: rows fill in sequence, a status chip flips to done.
  Transitions: slide along the grid, cut.
- Texture: none. Avoid: stock-photo people; generic "enterprise" icons.

### `fintech-trust`
Numbers you can trust: deep navy, crisp figures · medium · demo-safe
- Ground: bg `#0A1628` · surface `#12223A` · line `#223552` · ink `#F1F5FB` · muted `#8FA3BF`. Sig: `#2EE6A6`.
- Type: tabular figures huge (120px+), labels UI face; currency small beside the figure.
- Layout: one figure per beat, a real chart or transaction row beneath it.
- Motion: Default; `dataviz-countup`, `counting-dynamic-scale`. Signature: figure counts up and the
  row it came from highlights. Transitions: number morphs into the next number.
- Texture: none. Avoid: gradient UI chrome; invented figures (use only real numbers).

### `ambient-intelligence`
AI that feels calm, not sci-fi · calm · demo-safe
- Ground: bg `#F3F1EC` or `#101010` · soft colour field (one blurred shape, baked PNG) · ink / muted. Sig: `#E07A5F`.
- Type: display serif or grotesk 400 [Fraunces / Bricolage Grotesque], sentence case, conversational.
- Layout: prompt box and answer from the real product; answer streams in.
- Motion: Default; `prompt-type-submit-generate`, `agent-progress-theater`. Signature: text streams
  token by token while the colour field breathes slowly. Transitions: soft push, cut.
- Texture: baked colour-field PNG. Avoid: neurons, robots, glowing brains, particle bursts.

---

## 2. Cinematic

### `cinematic-product-launch`
Apple-like opening: darkness, light, reveal · calm → high at the reveal · demo-safe
- Ground: bg `#000` · surface `#0D0D0D` · ink `#F5F5F7` · muted `#86868B`. Sig: brand.
- Type: display 600 at 100–160px, tight tracking, 2–4 words; small "By default" style kickers.
- Layout: product or logo emerges from darkness, center or golden-ratio point.
- Motion: Heavy, `expo.out` 1.0s; slow push 1.00→1.10. Signature: a light sweep crosses the headline
  once. Transitions: fade through black (the only style where this is allowed), zoom-through.
- Texture: 3% film grain PNG. Avoid: lens flares; sweeping light over UI.

### `cinematic-technology`
Macro lens on the product: depth, focus pulls · calm · demo-safe
- Ground: bg `#07090C` · surface `#0F1318` · ink `#E6EDF3` · muted `#6E7B88`. Sig: `#58A6FF`.
- Type: display 500, wide tracking (+4%) caps for 1–2 word titles.
- Layout: extreme close-ups of real UI (a button, a number), background elements out of focus.
- Motion: Heavy. Signature: focus pull (blur swaps between layers on 2 elements only). Transitions:
  rack focus, whip-free cut.
- Texture: grain PNG, vignette. Avoid: blur on readable text; more than 2 blurred layers (render limit).

### `cinematic-streaming`
Streaming-service title sequence: rows, posters, a hero · medium
- Ground: bg `#0B0B0B` · tiles `#1A1A1A` · ink `#FFF` · muted `#A3A3A3`. Sig: `#E50914`-like red → brand.
- Type: display condensed 700 caps [Bebas Neue / Oswald] for titles; UI face for metadata.
- Layout: horizontal rows of real screens as "posters"; one expands to a hero.
- Motion: Default rows, Heavy hero. Signature: row scrolls, one tile scales up to fill the frame.
  Transitions: tile zoom-through.
- Texture: none. Avoid: mimicking a real streaming brand's logo or red.

### `sensory-tech`
Tactile, slow, beautiful close details · calm
- Ground: bg `#12100E` · surface `#1E1A17` · ink `#F2EDE6` · muted `#9A9087`. Sig: `#D9A45B`.
- Type: serif display 400 italic accents [Fraunces], UI face small.
- Layout: macro crops of UI textures, cursor micro-interactions, haptics shown as ripples.
- Motion: Heavy `sine.inOut`; everything slower than feels safe. Signature: a single interaction
  shown in slow motion with its ripple. Transitions: match-cut on shape.
- Texture: warm grain PNG. Avoid: speed; more than one idea per beat.

---

## 3. Editorial & type

### `kinetic-typography`
The words are the picture · high
- Ground: solid fields that swap per beat: `#0A0A0A`, brand accent, `#F2EFE9`. Ink contrasts. Sig: `#FF4D00`.
- Type: condensed display 800 caps [Anton / Big Shoulders Display], 140–400px; one word can fill the frame.
- Layout: flush-left stacks, words cropped by the frame edge on purpose.
- Motion: Snappy entries, `expo.out` 0.35s; `kinetic-type-beats` (restrained). Signature: a number
  or word counts/flips in huge, background colour swaps on the downbeat. Transitions: colour-field
  cut on the beat.
- Texture: none. Avoid: slamming every word; more than 3 background swaps in 10s.

### `swiss-kinetic-editorial`
International style: grid, red, flush left · medium · demo-safe
- Ground: bg `#F2F0EB` · ink `#111` · rule `#111` · muted `#6A6A6A`. Sig: `#E30613`.
- Type: grotesk 700 [Archivo / Hanken Grotesk] flush left, tight leading; numbers as giant numerals;
  mono meta line ("03 / SECTION · GRID · RED").
- Layout: visible 12-col discipline, asymmetric, a thick red rule as the only ornament.
- Motion: Default, `power3.out`. Signature: rule draws across, numeral drops into its grid cell.
  Transitions: grid slide (horizontal), cut.
- Texture: faint baseline grid PNG (optional). Avoid: centering anything; a second colour.

### `data-editorial`
Newspaper data desk: charts that explain · calm · demo-safe
- Ground: bg `#FFF8F0` · ink `#1A1A1A` · gridline `#E0D8CC` · muted `#6E665C`. Sig: `#0F5499`.
- Type: serif headlines [Source Serif 4 / Newsreader], sans labels, tabular figures.
- Layout: one chart per beat with a one-line takeaway headline; annotated, sourced.
- Motion: Default; bars grow, lines draw (`dataviz-countup`). Signature: annotation arrow appears on
  the key data point on the spoken word. Transitions: chart morph (bar → line), cut.
- Texture: none. Avoid: 3D charts; unsourced numbers.

### `editorial-intelligence`
Research-report gravitas: findings, quotes, footnotes · calm · demo-safe
- Ground: bg `#F7F6F2` · ink `#1C1C1C` · rule `#CFCBC2` · muted `#77736B`. Sig: `#B5442C`.
- Type: serif display 500, sans UI, small caps labels; footnote markers.
- Layout: two-column report page; a finding highlighted, the real UI shown as a "figure".
- Motion: Default. Signature: highlighter sweeps a sentence as it is spoken. Transitions: page turn
  (2D), cut.
- Texture: paper grain PNG. Avoid: tiny body text.

### `quirky-editorial`
Magazine with a sense of humour · medium
- Ground: bg `#FFF4E0` · ink `#1B1B1B` · muted `#6D6457`. Sig: `#FF5A36`, second only by opt-in `#2D6CDF`.
- Type: serif italic display [Fraunces italic] mixed with
  sans; one word per headline rotated or set in a sticker.
- Layout: off-grid on purpose, cut-out UI crops, hand-drawn arrows (SVG).
- Motion: Default, Playful for stickers only. Signature: an arrow draws to the thing being mocked.
  Transitions: slide with slight rotation, cut.
- Texture: paper PNG. Avoid: clutter that hides the UI.

### `expressive-editorial`
Big serif, big image, big feeling · calm · demo-safe
- Ground: bg `#111` or `#F3EFE8` · ink contrasts · muted. Sig: brand.
- Type: serif display 400 at 120px+ with italic emphasis [Fraunces / Newsreader Display].
- Layout: full-bleed image or UI with an overlapping headline, strong crops.
- Motion: Heavy. Signature: headline wipes in by line mask while the image slow-zooms. Transitions:
  line-mask wipe, cut.
- Texture: grain PNG. Avoid: more than one italic word per line.

### `monochrome-luxury`
Black, white, silence · calm
- Ground: `#0A0A0A` / `#F5F5F0` alternating · ink inverse · hairline. Sig: none (monochrome), brand accent only on the CTA.
- Type: high-contrast serif 400 caps, +8% tracking; tiny sans.
- Layout: centered is allowed here only for the logo end card; everything else asymmetric.
- Motion: Heavy `power2.inOut` 1.2s. Signature: slow reveal by a horizontal line mask. Transitions:
  inverse cut (black → white).
- Texture: none. Avoid: colour; speed; more than 4 words.

### `music-editorial`
Tour-poster typography cut to the beat · high
- Ground: bg `#0D0D0D` · poster colours per chapter (2 max) · ink. Sig: `#FFDD00`.
- Type: stacked condensed caps, mixed sizes like a gig poster.
- Layout: poster compositions; UI shown as "tracklist" rows.
- Motion: cuts on every bar (`hyperframes beats`), Snappy. Signature: the poster rebuilds line by
  line on the downbeats. Transitions: beat cut.
- Texture: print grain PNG. Avoid: cutting against the voice (voice wins).

### `documentary-purpose`
Mission and people, told honestly · calm · demo-safe
- Ground: bg `#1B1A17` · surface `#26241F` · ink `#F2EEE6` · muted `#A39D90`. Sig: `#E8B04A`.
- Type: serif 500 for quotes, sans lower thirds with name/role.
- Layout: real photos or recordings full-bleed, lower thirds, quote cards.
- Motion: Heavy, slow Ken Burns (`hyperframes-keyframes`). Signature: a quote builds line by line
  over a still. Transitions: cut, slow push.
- Texture: film grain PNG. Avoid: invented quotes or people.

### `human-storytelling`
Warm, personal, hand-made · calm · demo-safe
- Ground: bg `#FBF7F1` · surface `#FFFFFF` · ink `#2A2622` · muted `#8A8178`. Sig: `#F28C6B`.
- Type: rounded sans or humanist serif; handwritten notes only as accents (one face).
- Layout: phone UI with notes and doodles around it; photos as polaroids.
- Motion: Default, gentle. Signature: a doodle underline draws under the spoken benefit.
  Transitions: slide, cut.
- Texture: paper PNG. Avoid: childish tone for adult products.

---

## 4. Impact & sport

### `athletic-impact`
Nike-style finale: black, condensed, lime slab · high
- Ground: bg `#000` · ink `#FFF` · muted `#555`. Sig: `#D7FF1E` (slab behind one word).
- Type: condensed 800 caps italic-free [Anton / Oswald], 160–320px, tight leading; one word per
  line; one word on a highlight slab.
- Layout: frame-filling type, edge-to-edge; chips of real commands/features in a marquee.
- Motion: Snappy, `power4.out` 0.3s; hard cuts on the beat. Signature: the slab slams in behind a
  word, then the next line hard-cuts. Transitions: hard cut only.
- Texture: none. Avoid: using it for more than the finale in a mixed film; bouncy type.

### `sport-editorial`
Sports-magazine energy with stats · high · demo-safe
- Ground: bg `#0E0E10` · surface `#1A1A1E` · ink `#FFF` · muted `#8E8E93`. Sig: `#FF3B30`.
- Type: condensed italic display for names, tabular stats.
- Layout: player-card compositions: big number, name, stat bars; real UI as the "scoreboard".
- Motion: Snappy. Signature: stat bars race to their value. Transitions: diagonal wipe, cut.
- Texture: halftone PNG optional. Avoid: fake stats.

### `neo-brutalist-web`
Raw web: thick black strokes, hard shadows, loud colour · high · demo-safe
- Ground: bg `#FFFDF5` · surface `#FFFFFF` · stroke `#000` 3px · hard shadow 6px 6px `#000` · ink `#000`. Sig: `#FFE600`.
- Type: grotesk 800 [Archivo 800] + mono labels.
- Layout: UI crops as bordered cards (element borders, not frame borders), overlaps on purpose.
- Motion: Snappy `steps` feel on shadows (shadow snaps in 2 frames). Signature: card drops, its hard
  shadow snaps in after. Transitions: card push, cut.
- Texture: none. Avoid: borders around the whole frame (banned).

---

## 5. Technical

### `blueprint-engineering`
How-it-works drawn as an engineering sheet · medium · demo-safe
- Ground: bg `#123A7A` · grid `#2A58A6` (baked PNG) · line `#E8F0FF` · ink `#FFF` · muted `#A9C1EA`. Sig: `#FFD23F` (markers).
- Type: condensed display caps for the title; mono for boxes and labels [JetBrains Mono / IBM Plex Mono].
- Layout: box-and-arrow pipelines, waveforms, measurement ticks; a title block ("SHEET 05 · REV A")
  as part of the drawing, not a corner label.
- Motion: Default; `draw` for lines. Signature: boxes draw stroke-first, arrows extend, yellow
  markers pop on the spoken word. Transitions: pan across the sheet.
- Texture: grid PNG. Avoid: diagrams that describe features the product doesn't have.

### `terminal-ops`
The terminal is the stage · medium · demo-safe (CLI products)
- Ground: bg `#0C0E12` · window `#141821` · line `#232A36` · ink `#D6DEEB` · muted `#6C7A91`. Sig: `#3DDC84` (✓).
- Type: mono only for the terminal; UI face for one headline per chapter.
- Layout: one terminal window at 70% of frame, real commands and real output; preview pane optional.
- Motion: typed commands (`typeIn`) at human speed, output lines appear per line, ✓ ticks in green.
  Signature: each ✓ line lands on the spoken word. Transitions: window scroll, cut.
- Texture: none. Avoid: fake commands; typing faster than readable.

### `monochrome-developer`
Black-and-white code aesthetic · medium · demo-safe
- Ground: `#000` / `#FFF` · grey `#777`. Sig: none; brand accent for one highlight per beat.
- Type: mono display 700 [JetBrains Mono / Space Mono] at 80–140px.
- Layout: code as typography; diffs highlighted by inversion.
- Motion: Snappy; line-by-line reveals. Signature: a line inverts (white bar) as it is read.
  Transitions: inversion cut.
- Texture: none. Avoid: syntax-highlight rainbows.

### `developer-flow`
Nodes and flows that explain architecture · medium · demo-safe
- Ground: bg `#0F1117` · node `#1A1D27` · edge `#3A4152` · ink `#E6E8EE` · muted `#8088A0`. Sig: brand.
- Type: UI face 600 in nodes, mono for payloads.
- Layout: left-to-right flow of 3–5 nodes; packets travel along edges.
- Motion: Default; packets on SVG paths. Signature: a packet travels, the receiving node pulses once.
  Transitions: camera follows the packet into the next diagram.
- Texture: dot grid PNG. Avoid: more than 5 nodes on screen.

### `mission-control`
Operations dashboard at launch time · medium · demo-safe
- Ground: bg `#05070A` · panel `#0D1117` · line `#1E2633` · ink `#E6EDF3` · muted `#7D8590`. Sig: `#FFB020`.
- Type: tabular mono numbers, UI face labels.
- Layout: real dashboard panels, status rows, one live metric enlarged.
- Motion: Default; numbers tick, status dots switch. Signature: countdown → all systems green.
  Transitions: panel expand, cut.
- Texture: none. Avoid: HUD corner brackets, scanlines, glow (banned look).

### `isometric-systems`
Architecture as isometric blocks · medium
- Ground: bg `#EEF1F6` · block tops/sides 3 tints of one hue · ink `#1B2433`. Sig: brand.
- Type: UI face labels on leader lines.
- Layout: 30° isometric stacks for services, data moving between them.
- Motion: Default; blocks rise from the floor plane. Signature: a layer lifts to show what is
  inside. Transitions: camera pan across the isometric plane.
- Texture: none. Avoid: detail no one can read at phone size.

### `modular-build`
Pieces snap together into the product · medium · demo-safe
- Ground: bg `#F2F2F0` · pieces `#FFFFFF` · line `#D6D6D2` · ink `#161616`. Sig: brand.
- Type: UI face 600.
- Layout: the real UI decomposed into components that snap into place.
- Motion: Snappy snaps, Default camera. Signature: the final piece clicks in and the whole screen
  comes alive. Transitions: disassemble → reassemble.
- Texture: none. Avoid: components that don't exist in the real UI.

### `accelerated-compute`
Speed and scale for infrastructure products · high
- Ground: bg `#000` · surface `#0E0E0E` · line `#262626` · ink `#FFF` · muted `#8A8A8A`. Sig: `#76B900`-like green → brand.
- Type: grotesk 700 caps; huge throughput numbers.
- Layout: numbers vs. time; bars racing; real benchmark screens only.
- Motion: Snappy with motion blur on fast bars only. Signature: before/after bars race, the winner
  locks. Transitions: speed-ramp cut.
- Texture: none. Avoid: unverifiable benchmark claims.

---

## 6. Playful & consumer

### `joyful-pop`
Bright, flat, happy · high
- Ground: bg `#FFE7F0` / `#E5F4FF` alternating per chapter · ink `#1B1B1B`. Sig: `#FF3E8A`.
- Type: rounded display 800 [Baloo 2 / Be Vietnam Pro 800].
- Layout: UI on phone, surrounded by simple flat shapes (circles, blobs) in 2 colours.
- Motion: Default for UI, Playful for shapes only. Signature: shapes pop around the phone on the
  downbeat. Transitions: shape wipe, cut.
- Texture: none. Avoid: bouncy text (banned); more than 3 colours.

### `playful-productivity`
Friendly SaaS with illustration · medium · demo-safe
- Ground: bg `#FFFBF3` · surface `#FFFFFF` · line `#ECE4D6` · ink `#2B2B2B`. Sig: `#6C5CE7`.
- Type: UI face; one hand-drawn accent per beat (SVG, not a font).
- Layout: real UI with small spot illustrations; tasks ticking off.
- Motion: Default. Signature: a checkbox ticks and a small confetti of 6 shapes (not particles)
  settles. Transitions: slide, cut.
- Texture: none. Avoid: generic particle bursts (banned).

### `playful-game-system`
The product as a game: levels, XP, achievements · high
- Ground: bg `#14122B` · surface `#211E45` · ink `#FFF` · muted `#A8A3D6`. Sig: `#FFC83D`.
- Type: rounded display 800 for level titles, mono for counters.
- Layout: XP bar, level badges, achievement toasts built from real product events.
- Motion: Default; Playful for badges. Signature: XP bar fills, "level up" badge flips in.
  Transitions: level-card flip.
- Texture: none. Avoid: gamifying something the product doesn't do.

### `character-comedy`
A mascot carries the story · high
- Ground: brand light bg · ink. Sig: brand.
- Type: rounded display; speech bubbles.
- Layout: mascot (the brand's own, or an abstract blob) reacts to real UI.
- Motion: Playful for the mascot (squash & stretch), Default for UI; mouth driven by the voice
  envelope. Signature: mascot does a take at the key moment. Transitions: mascot walks across the cut.
- Texture: none. Avoid: inventing a mascot the brand hasn't approved; ask first.

### `community-chaos`
UGC energy: stacked posts, stickers, reactions · high
- Ground: bg `#F7F7F7` or `#111` · cards white · ink. Sig: brand.
- Type: UI face; sticker words in display 800 rotated ±4°.
- Layout: real posts/comments (anonymised) piling up, reactions flying in.
- Motion: Snappy stacks; Playful stickers only. Signature: the pile collapses into one clean card
  with the message. Transitions: pile push, cut.
- Texture: none. Avoid: real customer names or faces without permission.

### `creative-canvas`
An infinite canvas, panned like a design tool · medium · demo-safe
- Ground: bg `#F1F1F1` · artboards `#FFF` · selection `#2F80ED`. Sig: brand.
- Type: UI face; artboard names small.
- Layout: artboards on a canvas; camera pans and zooms between them.
- Motion: Default camera with chained moves (never restart from rest). Signature: zoom out to the
  whole canvas, then dive into one artboard. Transitions: camera move only.
- Texture: dot grid PNG. Avoid: tiny unreadable artboards held too long.

### `soft-clay-3d`
Soft, rounded, tactile objects · medium
- Ground: bg `#F3E9E2` · objects pastel (3 max) · ink `#3A2E2A`. Sig: `#F28E6B`.
- Type: rounded sans 700.
- Layout: UI cards as soft rounded objects with inner shadows; icons as clay shapes (asset needed:
  generate via `media-use` image or skip).
- Motion: Default with a soft settle. Signature: objects press down and spring back when tapped.
  Transitions: object push.
- Texture: baked soft-shadow PNGs. Avoid: faking 3D with many live blur filters (render limit).

### `paper-cut-collage`
Cut paper, torn edges, layered craft · medium
- Ground: bg `#EFE6D8` · paper layers 3 tones · ink `#2A241E`. Sig: `#D9462B`.
- Type: display serif or slab 700 printed on paper strips.
- Layout: UI crops as paper cut-outs with torn-edge masks (PNG), layered with hard shadows.
- Motion: stepped (on twos) for paper pieces. Signature: pieces slide in with a slight rotation and
  a paper sound. Transitions: tear wipe.
- Texture: paper + torn-edge PNGs. Avoid: torn edges over readable UI.

---

## 7. Comic & illustration

### `comic-multiverse` — deep spec: `styles/comic-multiverse.md`
Spider-Verse-inspired comic energy: halftone, ink, misregistration · high
- Ground: ink `#0D0A1A` · paper `#FFF6E5` · cyan `#19D3FF` · magenta `#FF2E9A` · yellow `#FFD21F`. Sig: `#FFD21F`.
- Type: condensed display caps [Anton] with ink stroke; comic labels [Bangers].
- Motion: on twos (12 fps poses) for characters and UI, smooth camera. Signature: RGB-split glitch cut.

### `manga-ink`
Black-and-white manga panels · high
- Ground: `#FFF` paper · `#0A0A0A` ink · screentone greys (PNG). Sig: `#E60012` (one red stamp).
- Type: condensed caps for SFX words; UI face for captions.
- Layout: panel grids with diagonal gutters; UI inside panels; speed lines.
- Motion: on twos. Signature: speed-line burst behind the key panel. Transitions: panel slide.
- Texture: screentone + speed-line PNGs. Avoid: copying real manga characters.

---

## 8. Retro & graphic

### `pixel-arcade`
8-bit game screen · high
- Ground: bg `#1A1C2C` with dot grid PNG · ink `#F4F4F4` · muted `#94B0C2`. Sig: `#FFCD75` + `#41A6F6` title pair.
- Type: pixel display [VT323; check the vietnamese subset of any other pixel face] with a hard
  2px offset shadow; mono UI.
- Layout: game HUD row (1UP · COINS · LV) as content, a command box, pixel sprites.
- Motion: stepped (`steps(n)`), no smooth eases. Signature: coins pop and score ticks on the word.
  Transitions: pixel dissolve (baked).
- Texture: dot grid PNG. Avoid: anti-aliased blur on pixels; scale by non-integer factors.

### `retro-crt-broadcast`
Late-night TV graphics · medium
- Ground: bg `#101820` · bars `#1E3A5F` · ink `#F5F1E3`. Sig: `#FFB000`.
- Type: broadcast sans 700 caps, lower-third bars.
- Layout: TV lower thirds, channel bugs are part of content not decoration; UI on a "screen".
- Motion: Default; slide-in bars. Signature: channel-change cut with a 2-frame roll (registry block).
  Transitions: channel change.
- Texture: scanline PNG (light). Avoid: scanlines over readable UI text.

### `vaporwave-memphis`
80s Memphis shapes meet pastel web · high
- Ground: bg `#FDE2E4` · shapes `#7BDFF2`, `#F7D6E0`, `#1B1B1B` squiggles. Sig: `#FF6F91`.
- Type: geometric display 800.
- Layout: UI cards floating with Memphis squiggles and dots around the edges.
- Motion: Default; shapes drift slowly. Signature: shapes rearrange on each downbeat.
  Transitions: shape wipe.
- Texture: pattern PNGs. Avoid: shapes covering UI.

### `y2k-liquid-chrome`
Chrome type, bubbles, 2000s optimism · high
- Ground: bg `#E8ECF5` or `#0A0A14` · ink. Sig: chrome (gradient on display type only).
- Type: display extended 800 [Unbounded] with chrome fill (baked or gradient on type, never on UI).
- Layout: chrome word + real UI in glossy-free cards.
- Motion: Default; chrome shimmer once per word. Signature: liquid chrome word morphs into the next.
  Transitions: liquid wipe (registry).
- Texture: chrome PNG. Avoid: chrome or gloss on UI chrome (banned).

### `neon-cyberpunk`
Night city, neon type · high
- Ground: bg `#0A0714` · surface `#140E24` · ink `#EDE7FF`. Sig: `#FF2E88` (type only).
- Type: condensed display caps; neon look on type only (inner stroke + small soft shadow, baked).
- Layout: UI on dark panels (no glow on panels), neon headline above.
- Motion: Snappy flickers (2 max per film). Signature: sign flicker-on for the headline.
  Transitions: glitch cut (brief).
- Texture: rain/noise PNG. Avoid: glow on UI chrome (banned); flicker on body text.

### `bauhaus-geometry`
Circles, squares, primaries · medium
- Ground: bg `#F2EDE4` · `#1D1D1B` · `#E63322` · `#1E4B9C` · `#F2B705`. Sig: `#E63322`.
- Type: geometric sans 700 [Jost / League Spartan], flush left.
- Layout: strong geometric shapes that frame the UI; asymmetric balance.
- Motion: Default; shapes rotate/slide to new positions. Signature: shapes reconfigure into the
  next layout. Transitions: shape morph.
- Texture: none. Avoid: more than 3 primaries at once.

### `organic-biomorphic`
Soft blobs, natural colour, calm tech · calm · demo-safe
- Ground: bg `#F1EFE7` · blobs `#C9D8B6`, `#E7C8A0` · ink `#23301F`. Sig: `#4F7942`.
- Type: humanist serif or rounded sans 500.
- Layout: UI cards resting on slowly morphing blob shapes (SVG path morph, 2 max).
- Motion: Heavy `sine.inOut`. Signature: a blob morphs to reveal the next card. Transitions: morph.
- Texture: paper grain PNG. Avoid: many simultaneous morphs (render cost).

### `immersive-console`
Game-console system UI · medium
- Ground: bg `#0B0F1A` · tiles `#1B2233` · selection outline `#FFF` 3px · ink. Sig: brand.
- Type: UI face 600; large tile titles.
- Layout: horizontal tile rail, selected tile enlarged with info panel.
- Motion: Snappy selection moves (tab-stretch rule). Signature: selection glides along the rail,
  tile expands to the product screen. Transitions: tile expand.
- Texture: none. Avoid: console-brand lookalike UI.
