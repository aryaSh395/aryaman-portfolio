/*
 * Tiny animation utilities ported from patterns observed on alche.studio
 * (GSAP ScrambleText / SplitText equivalents, dependency-free).
 */

/* Scramble-in text: random glyphs settle left-to-right into the real string. */
export function scramble(el, { chars = 'ARYAMNSH</>#_*', holdMs = 90 } = {}) {
  const original = el.dataset.text ?? el.textContent;
  el.dataset.text = original;
  const len = original.length;
  const dur = 420 + len * 26;
  const start = performance.now();
  let raf;
  const tick = (now) => {
    const p = Math.min(1, (now - start - holdMs) / dur);
    if (p < 0) { raf = requestAnimationFrame(tick); return; }
    const settled = Math.ceil(p * len);
    let out = original.slice(0, settled);
    for (let i = settled; i < len; i++) {
      const ch = original[i];
      out += /\s/.test(ch) ? ch : chars[(Math.random() * chars.length) | 0];
    }
    el.textContent = out;
    if (p < 1) raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(raf);
}

export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;
