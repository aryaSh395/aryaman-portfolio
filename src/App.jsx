import React, { useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';

export default function App() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const progRef = useRef(null);
  const mouse   = useRef({ x: 0, y: 0 });
  const ring    = useRef({ x: 0, y: 0 });
  const raf     = useRef(null);

  useEffect(() => {
    // ── Custom cursor
    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px';
        dotRef.current.style.top  = e.clientY + 'px';
      }
    };
    const lerp = (a, b, t) => a + (b - a) * t;
    const tick = () => {
      ring.current.x = lerp(ring.current.x, mouse.current.x, 0.12);
      ring.current.y = lerp(ring.current.y, mouse.current.y, 0.12);
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + 'px';
        ringRef.current.style.top  = ring.current.y + 'px';
      }
      raf.current = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener('mousemove', onMove);

    // ── Cursor hover effect
    const addHover = () => ringRef.current?.classList.add('hovered');
    const removeHover = () => ringRef.current?.classList.remove('hovered');
    const hoverTargets = document.querySelectorAll('a, button, [data-hover]');
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', addHover);
      el.addEventListener('mouseleave', removeHover);
    });

    // ── Scroll progress
    const onScroll = () => {
      const total = document.body.scrollHeight - window.innerHeight;
      const prog  = total > 0 ? window.scrollY / total : 0;
      if (progRef.current) progRef.current.style.transform = `scaleX(${prog})`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // ── Scroll reveal (IntersectionObserver)
    const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-scale');
    const observer  = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('revealed'); }),
      { threshold: 0.12 }
    );
    revealEls.forEach(el => observer.observe(el));

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf.current);
      hoverTargets.forEach(el => {
        el.removeEventListener('mouseenter', addHover);
        el.removeEventListener('mouseleave', removeHover);
      });
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Cursor */}
      <div ref={dotRef}  className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />

      {/* Scroll progress */}
      <div ref={progRef} className="scroll-progress" />

      {/* Ambient mesh blobs */}
      <div className="blobs" aria-hidden>
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
        <div className="blob blob-4" />
      </div>

      <Navbar />
      <main style={{ paddingTop: 68, position: 'relative', zIndex: 1 }}>
        <Hero />
        <About />
        <Education />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
