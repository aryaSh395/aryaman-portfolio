import React, { useEffect, useRef, useState } from 'react';

/*
 * Particle-wave WebGL background for the hero.
 * - three.js is dynamically imported so it stays out of the initial bundle
 * - skipped entirely on small screens, prefers-reduced-motion, or no WebGL
 * - rAF loop pauses when the hero is scrolled out of view
 */
export default function HeroCanvas() {
  const wrapRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (window.matchMedia('(max-width: 768px)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let renderer, raf, disposed = false, visible = true;
    let onMove, onResize, observer;

    import('three').then((THREE) => {
      if (disposed) return;

      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      } catch {
        return; // no WebGL — silently keep the CSS-only backdrop
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(wrap.clientWidth, wrap.clientHeight);
      wrap.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      scene.fog = new THREE.Fog(0x05060a, 8, 26);
      const camera = new THREE.PerspectiveCamera(60, wrap.clientWidth / wrap.clientHeight, 0.1, 100);
      camera.position.set(0, 3.2, 9);

      const COLS = 120, ROWS = 72, GAP = 0.24;
      const count = COLS * ROWS;
      const pos = new Float32Array(count * 3);
      const col = new Float32Array(count * 3);
      const cIndigo = new THREE.Color(0x6d70f6);
      const cCyan   = new THREE.Color(0x22d3ee);

      let i = 0;
      for (let x = 0; x < COLS; x++) {
        for (let z = 0; z < ROWS; z++) {
          pos[i * 3]     = (x - COLS / 2) * GAP;
          pos[i * 3 + 1] = 0;
          pos[i * 3 + 2] = (z - ROWS / 2) * GAP;
          i++;
        }
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
      const mat = new THREE.PointsMaterial({
        size: 0.045,
        vertexColors: true,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      scene.add(new THREE.Points(geo, mat));

      const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
      onMove = (e) => {
        mouse.tx = (e.clientX / window.innerWidth)  * 2 - 1;
        mouse.ty = (e.clientY / window.innerHeight) * 2 - 1;
      };
      window.addEventListener('pointermove', onMove, { passive: true });

      onResize = () => {
        camera.aspect = wrap.clientWidth / wrap.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(wrap.clientWidth, wrap.clientHeight);
      };
      window.addEventListener('resize', onResize);

      // Pause rendering while the hero is off-screen
      observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { threshold: 0 });
      observer.observe(wrap);

      const tmp = new THREE.Color();
      const clock = new THREE.Clock();

      const loop = () => {
        raf = requestAnimationFrame(loop);
        if (!visible) return;
        const t = clock.getElapsedTime();
        mouse.x += (mouse.tx - mouse.x) * 0.06;
        mouse.y += (mouse.ty - mouse.y) * 0.06;

        const p = geo.attributes.position.array;
        const c = geo.attributes.color.array;
        let i = 0;
        for (let x = 0; x < COLS; x++) {
          for (let z = 0; z < ROWS; z++) {
            const px = p[i * 3], pz = p[i * 3 + 2];
            const y =
              Math.sin(px * 0.55 + t * 0.9) * 0.45 +
              Math.sin(pz * 0.7 + t * 0.7) * 0.35 +
              Math.sin((px + pz) * 0.4 + t * 0.5) * 0.25;
            p[i * 3 + 1] = y;
            const k = THREE.MathUtils.clamp((y + 1) / 2, 0, 1);
            tmp.copy(cIndigo).lerp(cCyan, k);
            c[i * 3] = tmp.r; c[i * 3 + 1] = tmp.g; c[i * 3 + 2] = tmp.b;
            i++;
          }
        }
        geo.attributes.position.needsUpdate = true;
        geo.attributes.color.needsUpdate = true;

        camera.position.x += (mouse.x * 1.4 - camera.position.x) * 0.04;
        camera.position.y += (3.2 - mouse.y * 0.9 - camera.position.y) * 0.04;
        camera.lookAt(0, 0, 0);
        renderer.render(scene, camera);
      };
      loop();
      setReady(true);
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      if (onMove) window.removeEventListener('pointermove', onMove);
      if (onResize) window.removeEventListener('resize', onResize);
      observer?.disconnect();
      if (renderer) {
        renderer.dispose();
        renderer.domElement.remove();
      }
    };
  }, []);

  return <div ref={wrapRef} className={`hero-canvas${ready ? ' ready' : ''}`} aria-hidden />;
}
