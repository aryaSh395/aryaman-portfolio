import React, { useEffect, useRef, useState } from 'react';
import { scramble, prefersReducedMotion } from '../fx';

const SECTIONS = [
  { label: 'HOME',       href: '#hero'       },
  { label: 'ABOUT',      href: '#about'      },
  { label: 'EDUCATION',  href: '#education'  },
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'SKILLS',     href: '#skills'     },
  { label: 'PROJECTS',   href: '#projects'   },
  { label: 'CONTACT',    href: '#contact'    },
];

/* alche-style side progress rail: ticks + labels, active tick extends */
export default function SideNav() {
  const [active, setActive] = useState('#hero');
  const navRef = useRef(null);

  useEffect(() => {
    const handler = () => {
      const scrollY = window.scrollY + window.innerHeight * 0.4;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.querySelector(SECTIONS[i].href);
        if (el && el.offsetTop <= scrollY) { setActive(SECTIONS[i].href); break; }
      }
    };
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // scramble the newly active label (alche ScrambleText behaviour)
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = navRef.current?.querySelector(`a[href="${active}"] .sidenav-label`);
    if (el) return scramble(el, { holdMs: 0 });
  }, [active]);

  return (
    <nav className="sidenav" aria-label="Section progress" ref={navRef}>
      {SECTIONS.map(({ label, href }) => (
        <a key={href} href={href}
          className={`sidenav-item${active === href ? ' active' : ''}`}>
          <span className="sidenav-label">{label}</span>
          <span className="sidenav-line" />
        </a>
      ))}
    </nav>
  );
}
