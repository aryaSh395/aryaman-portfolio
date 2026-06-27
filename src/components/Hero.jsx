import React, { useRef } from 'react';

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
const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.72a16 16 0 0 0 6 6l.88-.88a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.5 16.92z"/>
  </svg>
);
const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

function MagneticBtn({ href, className, children }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = e.clientX - r.left - r.width  / 2;
    const y = e.clientY - r.top  - r.height / 2;
    ref.current.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`;
  };
  const onLeave = () => { ref.current.style.transform = ''; };
  return (
    <a ref={ref} href={href} className={className} onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </a>
  );
}

export default function Hero() {
  return (
    <section id="hero" style={{ display: 'flex', alignItems: 'center', minHeight: '100vh', paddingTop: 68 }}>
      <div className="section-inner" style={{ width: '100%', textAlign: 'center' }}>
        <div className="hero-badge reveal" style={{ display: 'inline-flex', marginBottom: 28 }}>
          <span className="hero-badge-dot" />
          Shopify Developer
        </div>
        <h1 className="hero-name reveal delay-1" style={{ fontSize: 96, textAlign: 'center' }}>
          ARYAMAN
          <span className="line-2">SHARMA</span>
        </h1>
        <p className="hero-sub reveal delay-2" style={{ maxWidth: 500, margin: '20px auto 40px', textAlign: 'center' }}>
          Building scalable web applications and ecommerce solutions.
        </p>
        <div className="hero-btns reveal delay-3" style={{ justifyContent: 'center' }}>
          <MagneticBtn href="#projects" className="btn-glow">
            View My Work <ArrowIcon />
          </MagneticBtn>
          <MagneticBtn href="#contact" className="btn-glass">
            Contact Me <EmailIcon />
          </MagneticBtn>
        </div>
        <div className="hero-socials reveal delay-4" style={{ justifyContent: 'center' }}>
          <a href="https://linkedin.com/in/aryaman-sharma-807562107/" target="_blank" rel="noreferrer" className="hero-social-link">
            <LinkedInIcon /> LinkedIn
          </a>
          <a href="mailto:aryamansharma.it24@gmail.com" className="hero-social-link">
            <EmailIcon /> Email
          </a>
          <a href="tel:+917891039292" className="hero-social-link">
            <PhoneIcon /> Phone
          </a>
        </div>
      </div>
    </section>
  );
}
