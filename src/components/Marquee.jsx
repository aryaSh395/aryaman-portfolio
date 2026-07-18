import React, { useEffect, useRef } from 'react';

const SparkIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4L12 2z"/>
  </svg>
);

const TECH = [
  'Shopify', 'React.js', 'Node.js', 'Flutter', '.NET', 'Python',
  'JavaScript', 'MongoDB', 'Express', 'AWS', 'Google Cloud', 'Docker',
];

/*
 * Scroll-velocity-reactive marquee: cruises slowly, accelerates with
 * scroll speed (reading lenis velocity), eases back when you stop.
 */
export default function Marquee() {
  const innerRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const inner = innerRef.current;
    if (!inner) return;

    let raf, offset = 0, speed = 40, last = performance.now(), visible = true;

    const observer = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0 });
    observer.observe(inner);

    const loop = (now) => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!visible) return;
      const v = Math.abs(window.__lenisVelocity || 0);
      const target = 40 + Math.min(v * 22, 420);        // px/s, scroll makes it fly
      speed += (target - speed) * 0.08;
      const w = inner.children[0]?.getBoundingClientRect().width || 0;
      if (w > 0) {
        offset = (offset + speed * dt) % w;
        inner.style.transform = `translateX(${-offset}px)`;
      }
    };
    raf = requestAnimationFrame(loop);

    return () => { cancelAnimationFrame(raf); observer.disconnect(); };
  }, []);

  const Track = ({ hidden }) => (
    <div className="marquee-track" aria-hidden={hidden || undefined}>
      {TECH.map(t => (
        <span key={t} className="marquee-item">
          <SparkIcon /> {t}
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquee-section" role="presentation">
      <div className="marquee">
        <div className="marquee-inner" ref={innerRef}>
          <Track />
          <Track hidden />
        </div>
      </div>
    </div>
  );
}
