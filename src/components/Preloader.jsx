import React, { useEffect, useState } from 'react';

/*
 * Intro preloader: mono logo + eased 0→100 counter, then the whole
 * overlay lifts away like a curtain. Kept deliberately short (~1.3s).
 */
export default function Preloader({ onDone }) {
  const [pct, setPct]   = useState(0);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    let raf;
    const t0 = performance.now();
    const DUR = 1300;
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / DUR);
      const eased = 1 - Math.pow(1 - p, 3);
      setPct(Math.round(eased * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setExit(true);
        setTimeout(onDone, 800); // matches the curtain transition
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className={`preloader${exit ? ' exit' : ''}`} aria-hidden>
      <div className="preloader-inner">
        <div className="preloader-logo">
          <span className="accent">&lt;</span>AS<span className="accent">/&gt;</span>
        </div>
        <div className="preloader-count">{pct}</div>
        <div className="preloader-bar"><div className="preloader-bar-fill" style={{ width: `${pct}%` }} /></div>
        <div className="preloader-tag">PORTFOLIO — 2026</div>
      </div>
    </div>
  );
}
