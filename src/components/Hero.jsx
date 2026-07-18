import React, { useEffect, useRef, useState } from 'react';
import HeroCanvas from './HeroCanvas';
import Slot from './Slot';

/* Letter-split word: each character rises out of its own mask, staggered */
function Word({ text, className, base = 0 }) {
  const span = text.length - 1 || 1;
  return (
    <span className={className}>
      {text.split('').map((ch, i) => (
        <span className="ltr-mask" key={i}>
          <span className="ltr" style={{ '--i': base + i, '--p': i / span }}>{ch}</span>
        </span>
      ))}
    </span>
  );
}

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
);
const EmailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);
const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

const ROLES = ['Shopify Developer', 'Full Stack Developer', '.NET Developer', 'Flutter Developer'];

function useTypewriter(words, { typeMs = 70, deleteMs = 40, holdMs = 1800 } = {}) {
  const [text, setText] = useState('');

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setText(words[0]);
      return;
    }
    let word = 0, len = 0, dir = 1, timer;
    const step = () => {
      const target = words[word];
      len += dir;
      setText(target.slice(0, len));
      let delay = dir === 1 ? typeMs : deleteMs;
      if (dir === 1 && len === target.length) { dir = -1; delay = holdMs; }
      else if (dir === -1 && len === 0) { dir = 1; word = (word + 1) % words.length; delay = typeMs * 3; }
      timer = setTimeout(step, delay);
    };
    timer = setTimeout(step, 600);
    return () => clearTimeout(timer);
  }, []);

  return text;
}

function MagneticBtn({ href, className, children }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = e.clientX - r.left - r.width  / 2;
    const y = e.clientY - r.top  - r.height / 2;
    ref.current.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  };
  const onLeave = () => { ref.current.style.transform = ''; };
  return (
    <a ref={ref} href={href} className={className} onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </a>
  );
}

const STATS = [
  { num: '4+',  label: 'Years Experience' },
  { num: '3',   label: 'Companies' },
  { num: '4+',  label: 'Projects Shipped' },
  { num: '9.0', label: 'CGPA / 10' },
];

export default function Hero() {
  const typed = useTypewriter(ROLES);

  return (
    <section id="hero">
      <HeroCanvas />
      <div className="hero-badge reveal">
        <span className="hero-badge-dot" />
        Available for new opportunities
      </div>

      <h1 className="hero-name" aria-label="Aryaman Sharma">
        <Word text="ARYAMAN" />
        <Word text="SHARMA" className="line-2" base={5} />
      </h1>

      <div className="hero-role reveal delay-2" aria-label="Shopify, Full Stack, .NET and Flutter developer">
        <span className="bracket">&#123;</span>
        <span className="typed">{typed}</span>
        <span className="caret" />
        <span className="bracket">&#125;</span>
      </div>

      <p className="hero-sub reveal delay-2">
        I build <strong>scalable web applications</strong> and <strong>e-commerce experiences</strong> that
        merchants and users love — from Shopify storefronts to full-stack products.
      </p>

      <div className="hero-btns reveal delay-3">
        <MagneticBtn href="#projects" className="btn-glow">
          <Slot>View My Work</Slot> <ArrowIcon />
        </MagneticBtn>
        <MagneticBtn href="https://www.linkedin.com/in/aryaman-sharma-807562107/" className="btn-glass">
          <LinkedInIcon /> <Slot>LinkedIn</Slot>
        </MagneticBtn>
        <MagneticBtn href="mailto:aryamansharma.it24@gmail.com" className="btn-glass">
          <EmailIcon /> <Slot>Email Me</Slot>
        </MagneticBtn>
      </div>

      <div className="hero-stats reveal delay-4">
        {STATS.map(({ num, label }) => (
          <div key={label} className="hero-stat">
            <span className="hero-stat-num">{num}</span>
            <span className="hero-stat-label">{label}</span>
          </div>
        ))}
      </div>

      <a href="#about" className="scroll-cue" aria-label="Scroll to about section">
        <span className="scroll-cue-mouse" />
        Scroll
      </a>
    </section>
  );
}
