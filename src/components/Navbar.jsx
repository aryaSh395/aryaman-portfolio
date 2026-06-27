import React, { useState, useEffect, useRef } from 'react';

const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
    strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

const NAV_LINKS = [
  { label: 'Home',       href: '#hero'       },
  { label: 'About',      href: '#about'      },
  { label: 'Education',  href: '#education'  },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills',     href: '#skills'     },
  { label: 'Projects',   href: '#projects'   },
  { label: 'Contact',    href: '#contact'    },
];

export default function Navbar() {
  const [active,   setActive]   = useState('#hero');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [pill,     setPill]     = useState({ left: 0, width: 0, opacity: 0 });

  const listRef  = useRef(null);
  const linksRef = useRef([]);

  const movePillTo = (el) => {
    if (!el || !listRef.current) return;
    const listRect = listRef.current.getBoundingClientRect();
    const elRect   = el.getBoundingClientRect();
    setPill({ left: elRect.left - listRect.left - 10, width: elRect.width + 20, opacity: 1 });
  };

  useEffect(() => {
    const idx = NAV_LINKS.findIndex(l => l.href === active);
    if (idx !== -1) movePillTo(linksRef.current[idx]);
  }, [active]);

  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 20);
      const scrollY = window.scrollY + 100;
      for (let i = NAV_LINKS.length - 1; i >= 0; i--) {
        const el = document.querySelector(NAV_LINKS[i].href);
        if (el && el.offsetTop <= scrollY) { setActive(NAV_LINKS[i].href); break; }
      }
    };
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNav = (href) => { setActive(href); setMenuOpen(false); };

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="navbar-inner">
          <a href="#hero" className="nav-logo">AS</a>

          {/* Desktop nav */}
          <ul ref={listRef} className="nav-links" style={{ position: 'relative' }}
            onMouseLeave={() => {
              const idx = NAV_LINKS.findIndex(l => l.href === active);
              if (idx !== -1) movePillTo(linksRef.current[idx]);
            }}>
            <li aria-hidden style={{
              position: 'absolute', top: '50%', transform: 'translateY(-50%)',
              left: pill.left, width: pill.width, height: 32,
              background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.22) 0%, rgba(139,92,246,0.10) 60%, transparent 100%)',
              border: '1px solid rgba(99,102,241,0.25)', borderRadius: 99,
              boxShadow: '0 0 18px rgba(99,102,241,0.3), 0 0 6px rgba(139,92,246,0.2)',
              opacity: pill.opacity,
              transition: 'left 0.35s cubic-bezier(0.34,1.56,0.64,1), width 0.35s cubic-bezier(0.34,1.56,0.64,1), opacity 0.25s',
              pointerEvents: 'none', zIndex: 0,
            }} />
            {NAV_LINKS.map(({ label, href }, i) => (
              <li key={href} style={{ position: 'relative', zIndex: 1 }}>
                <a href={href} ref={el => linksRef.current[i] = el}
                  className={active === href ? 'active' : ''}
                  onMouseEnter={e => movePillTo(e.currentTarget)}
                  onClick={() => handleNav(href)}>
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <a href="/Aryaman_Sharma_Resume.pdf" download="Aryaman_Sharma_Resume.pdf" className="nav-btn nav-btn-desktop">
            <span>Download Resume</span> <DownloadIcon />
          </a>

          {/* Hamburger */}
          <button className="hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">
            <span className={`ham-line${menuOpen ? ' open' : ''}`} />
            <span className={`ham-line${menuOpen ? ' open' : ''}`} />
            <span className={`ham-line${menuOpen ? ' open' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        <nav className="mobile-nav">
          {NAV_LINKS.map(({ label, href }) => (
            <a key={href} href={href}
              className={`mobile-nav-link${active === href ? ' active' : ''}`}
              onClick={() => handleNav(href)}>
              {label}
            </a>
          ))}
          <a href="/Aryaman_Sharma_Resume.pdf" download="Aryaman_Sharma_Resume.pdf"
            className="nav-btn" style={{ marginTop: 16, justifyContent: 'center' }}
            onClick={() => setMenuOpen(false)}>
            <span>Download Resume</span> <DownloadIcon />
          </a>
        </nav>
      </div>
    </>
  );
}
