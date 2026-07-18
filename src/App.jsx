import React, { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import SideNav from './components/SideNav';
import Preloader from './components/Preloader';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Education from './components/Education';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';

const ArrowUpIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 19V5M5 12l7-7 7 7"/>
  </svg>
);

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function App() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const progRef = useRef(null);
  const mouse   = useRef({ x: 0, y: 0 });
  const ring    = useRef({ x: 0, y: 0 });
  const raf     = useRef(null);
  const [showTop, setShowTop] = useState(false);
  const [intro, setIntro] = useState(() => !reducedMotion());

  // ── Lenis smooth scroll (skipped for reduced motion)
  useEffect(() => {
    if (reducedMotion()) return;
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    window.__lenis = lenis;
    window.__lenisVelocity = 0;
    lenis.on('scroll', (e) => { window.__lenisVelocity = e.velocity; });

    let rafId;
    const loop = (time) => { lenis.raf(time); rafId = requestAnimationFrame(loop); };
    rafId = requestAnimationFrame(loop);

    // Smooth-scroll all in-page anchors through lenis (nav, buttons, scroll cue)
    const onClick = (e) => {
      const a = e.target.closest?.('a[href^="#"]');
      if (!a) return;
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -90, duration: 1.4 });
    };
    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('click', onClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  // ── Freeze scroll while the preloader is up; flag the body when intro ends
  useEffect(() => {
    if (intro) {
      window.__lenis?.stop();
      document.documentElement.style.overflow = 'hidden';
    } else {
      window.__lenis?.start();
      document.documentElement.style.overflow = '';
      document.body.classList.add('intro-done');
    }
  }, [intro]);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;

    // ── Custom cursor + card spotlight
    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px';
        dotRef.current.style.top  = e.clientY + 'px';
      }
      const card = e.target.closest?.('.glass-card');
      if (card) {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - r.left}px`);
        card.style.setProperty('--my', `${e.clientY - r.top}px`);
      }
    };
    const lerp = (a, b, t) => a + (b - a) * t;
    const tick = () => {
      ring.current.x = lerp(ring.current.x, mouse.current.x, 0.14);
      ring.current.y = lerp(ring.current.y, mouse.current.y, 0.14);
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + 'px';
        ringRef.current.style.top  = ring.current.y + 'px';
      }
      raf.current = requestAnimationFrame(tick);
    };
    if (finePointer) tick();
    window.addEventListener('mousemove', onMove);

    // ── Cursor hover effect
    const onOver = (e) => {
      if (e.target.closest?.('a, button, [data-hover]')) ringRef.current?.classList.add('hovered');
      else ringRef.current?.classList.remove('hovered');
    };
    if (finePointer) window.addEventListener('mouseover', onOver);

    // ── Scroll progress + back-to-top
    const onScroll = () => {
      const total = document.body.scrollHeight - window.innerHeight;
      const prog  = total > 0 ? window.scrollY / total : 0;
      if (progRef.current) progRef.current.style.transform = `scaleX(${prog})`;
      setShowTop(window.scrollY > 600);
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  // ── Scroll reveal — armed only after the preloader lifts, so above-the-fold
  //    elements don't animate hidden behind the curtain
  useEffect(() => {
    if (intro) return;
    const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-scale');
    const observer  = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('revealed'); }),
      { threshold: 0.12 }
    );
    revealEls.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [intro]);

  return (
    <>
      {intro && <Preloader onDone={() => setIntro(false)} />}

      {/* Cursor */}
      <div ref={dotRef}  className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />

      {/* Scroll progress */}
      <div ref={progRef} className="scroll-progress" />

      {/* Backdrop: grid + aurora */}
      <div className="backdrop" aria-hidden>
        <div className="backdrop-grid" />
        <div className="aurora aurora-1" />
        <div className="aurora aurora-2" />
        <div className="aurora aurora-3" />
      </div>

      <Navbar />
      <SideNav />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <Marquee />
        <About />
        <Education />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>

      {/* Back to top */}
      <a href="#hero" className={`back-top${showTop ? ' visible' : ''}`} aria-label="Back to top">
        <ArrowUpIcon />
      </a>
    </>
  );
}
