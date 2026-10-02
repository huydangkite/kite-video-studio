// Chapter 1 — example scenes. Replace with the real beats. Every value is a function of time; sizes in u
// (1% of the short side) and positions as fractions of W/H, so 9:16 and 1:1 re-lay out instead of cropping.
import { el, tf, sp, track, range, clamp, stagger, ease } from "/kv/kv.js";

export default ({ T, W, H, u, portrait }) => {
  // Anchor to words when there is a voice: const tKite = T.word("kite", 1);  Fallback: seconds.
  const has = T.beats.length > 0;
  const tHook = 0.1, tCard = has ? T.beat(1).start + 1.6 : 1.6, tClick = 3.2, end = has ? T.beat(1).end : 8;

  return [{
    id: "b1-hook",
    from: 0, to: end,
    setup(root) {
      this.words = ["Đơn hàng", "nằm rải rác", "khắp nơi"].map((w, i) =>
        el("div", { class: "headline", text: w, style: { position: "absolute", left: `${8 * u}px`,
          top: `${(portrait ? 14 : 12) * u + i * 11 * u}px`, fontSize: `${10 * u}px` } }, root));
      // A real UI rebuilt as parts (never a flat screenshot): card, rows, a button the cursor clicks.
      // The UI is the hero: it fills most of the frame (~70% of the width or height), never a small card on empty ground.
      const cw = portrait ? W - 10 * u : 0.56 * W, ch = portrait ? 0.5 * H : 0.72 * H;
      this.card = el("div", { class: "card", style: { width: `${cw}px`, height: `${ch}px`,
        left: portrait ? `${5 * u}px` : `${W - cw - 5 * u}px`, top: portrait ? `${H - ch - 8 * u}px` : `${(H - ch) / 2}px` } }, root);
      this.rows = [0, 1, 2, 3].map((i) => el("div", { style: { position: "absolute", left: `${3 * u}px`, right: `${3 * u}px`,
        top: `${(5 + i * 12) * u}px`, height: `${9 * u}px`, borderRadius: `${1.2 * u}px`, background: "var(--line)" } }, this.card));
      this.btn = el("div", { text: "Xuất PDF", style: { position: "absolute", right: `${3 * u}px`, bottom: `${3 * u}px`,
        padding: `${2 * u}px ${4 * u}px`, borderRadius: `${1.4 * u}px`, background: "var(--accent)", fontSize: `${4 * u}px`,
        fontWeight: 600 } }, this.card);
      this.cursor = el("div", { style: { position: "absolute", width: `${3 * u}px`, height: `${3 * u}px`, borderRadius: "50%",
        background: "#fff", boxShadow: "0 4px 14px rgba(0,0,0,.5)" } }, root);
      this.cardRect = { x: parseFloat(this.card.style.left), y: parseFloat(this.card.style.top), w: cw, h: ch };
    },
    draw(t) {
      // Headline: lines arrive on a heavy spring, 0.12s apart, and are already moving at frame 1.
      this.words.forEach((w, i) => {
        const p = sp(t - tHook - stagger(i, 0.12), "heavy");
        tf(w, { y: (1 - p) * 6 * u });
        w.style.opacity = clamp(p * 1.4);
      });
      // Card lands on the default spring and pushes the type up (cause → effect).
      const c = sp(t - tCard, "default");
      tf(this.card, { y: (1 - c) * 30 * u, s: 0.94 + 0.06 * c });
      this.card.style.opacity = clamp(c * 2);
      this.words.forEach((w) => { w.style.translate = `0 ${-c * 4 * u}px`; });
      this.rows.forEach((r, i) => { const p = sp(t - tCard - 0.25 - stagger(i), "snappy"); r.style.transform = `scaleX(${p})`; r.style.transformOrigin = "0 50%"; });
      // Cursor: one target after another, never restarted (track = one spring per change).
      const R = this.cardRect, bx = R.x + R.w - 10 * u, by = R.y + R.h - 6 * u;
      const x = track(t, [[0, W * 0.5], [tCard + 0.4, R.x + R.w * 0.5], [tClick - 0.5, bx]], "snappy");
      const y = track(t, [[0, H * 1.1], [tCard + 0.4, R.y + R.h * 0.4], [tClick - 0.5, by]], "snappy");
      const press = range(t, tClick, tClick + 0.08) - range(t, tClick + 0.08, tClick + 0.3);
      tf(this.cursor, { x, y, s: 1 - 0.25 * press });
      tf(this.btn, { s: 1 - 0.06 * press });
      // Hold, then leave before the next move.
      const out = ease.inOut(range(t, end - 0.5, end));
      this.card.style.filter = out ? `brightness(${1 - out * 0.4})` : "";
    },
  }];
};
