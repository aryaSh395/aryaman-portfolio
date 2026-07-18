import * as THREE from 'three';

/* ────────────────────────────────────────────────
   Three.js Animation Lab — portfolio hero candidates
   Palette: indigo #6d70f6 · violet #a78bfa · cyan #22d3ee on #05060a
   ──────────────────────────────────────────────── */

const COLORS = {
  bg:     0x05060a,
  indigo: 0x6d70f6,
  violet: 0xa78bfa,
  cyan:   0x22d3ee,
};

const wrap = document.getElementById('canvas-wrap');
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(COLORS.bg, 1);
wrap.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);

const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
window.addEventListener('pointermove', (e) => {
  mouse.tx = (e.clientX / window.innerWidth)  * 2 - 1;
  mouse.ty = (e.clientY / window.innerHeight) * 2 - 1;
});

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function disposeScene(scene) {
  scene.traverse(obj => {
    obj.geometry?.dispose();
    if (obj.material) {
      (Array.isArray(obj.material) ? obj.material : [obj.material]).forEach(m => m.dispose());
    }
  });
  scene.clear();
}

/* ── Demo 1: Particle Wave ─────────────────────── */
function particleWave() {
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(COLORS.bg, 8, 26);
  camera.position.set(0, 3.2, 9);

  const COLS = 130, ROWS = 80, GAP = 0.22;
  const count = COLS * ROWS;
  const pos = new Float32Array(count * 3);
  const col = new Float32Array(count * 3);
  const cIndigo = new THREE.Color(COLORS.indigo);
  const cCyan   = new THREE.Color(COLORS.cyan);

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
    opacity: 0.9,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const points = new THREE.Points(geo, mat);
  scene.add(points);

  const tmp = new THREE.Color();
  return {
    scene,
    update(t) {
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
    },
    dispose() { disposeScene(scene); },
  };
}

/* ── Demo 2: Constellation Network ─────────────── */
function constellation() {
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(COLORS.bg, 6, 20);
  camera.position.set(0, 0, 10);

  const N = 170, RANGE = 11;
  const velocities = [];
  const pos = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    pos[i * 3]     = (Math.random() - 0.5) * RANGE * 1.7;
    pos[i * 3 + 1] = (Math.random() - 0.5) * RANGE;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    velocities.push(new THREE.Vector3(
      (Math.random() - 0.5) * 0.012,
      (Math.random() - 0.5) * 0.012,
      (Math.random() - 0.5) * 0.006,
    ));
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const pMat = new THREE.PointsMaterial({
    color: COLORS.violet,
    size: 0.09,
    transparent: true,
    opacity: 0.95,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  scene.add(new THREE.Points(pGeo, pMat));

  // Line segments buffer (worst case pairs capped)
  const MAX_LINKS = 900;
  const lPos = new Float32Array(MAX_LINKS * 6);
  const lGeo = new THREE.BufferGeometry();
  lGeo.setAttribute('position', new THREE.BufferAttribute(lPos, 3));
  const lMat = new THREE.LineBasicMaterial({
    color: COLORS.indigo,
    transparent: true,
    opacity: 0.22,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const lines = new THREE.LineSegments(lGeo, lMat);
  scene.add(lines);

  const LINK_DIST = 1.65;
  return {
    scene,
    update() {
      const p = pGeo.attributes.position.array;
      for (let i = 0; i < N; i++) {
        p[i * 3]     += velocities[i].x;
        p[i * 3 + 1] += velocities[i].y;
        p[i * 3 + 2] += velocities[i].z;
        if (Math.abs(p[i * 3])     > RANGE * 0.85) velocities[i].x *= -1;
        if (Math.abs(p[i * 3 + 1]) > RANGE * 0.5)  velocities[i].y *= -1;
        if (Math.abs(p[i * 3 + 2]) > 3)            velocities[i].z *= -1;
      }
      pGeo.attributes.position.needsUpdate = true;

      let li = 0;
      for (let a = 0; a < N && li < MAX_LINKS; a++) {
        for (let b = a + 1; b < N && li < MAX_LINKS; b++) {
          const dx = p[a * 3] - p[b * 3];
          const dy = p[a * 3 + 1] - p[b * 3 + 1];
          const dz = p[a * 3 + 2] - p[b * 3 + 2];
          if (dx * dx + dy * dy + dz * dz < LINK_DIST * LINK_DIST) {
            lPos[li * 6]     = p[a * 3];
            lPos[li * 6 + 1] = p[a * 3 + 1];
            lPos[li * 6 + 2] = p[a * 3 + 2];
            lPos[li * 6 + 3] = p[b * 3];
            lPos[li * 6 + 4] = p[b * 3 + 1];
            lPos[li * 6 + 5] = p[b * 3 + 2];
            li++;
          }
        }
      }
      lGeo.setDrawRange(0, li * 2);
      lGeo.attributes.position.needsUpdate = true;

      camera.position.x += (mouse.x * 1.6 - camera.position.x) * 0.04;
      camera.position.y += (-mouse.y * 1.0 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);
    },
    dispose() { disposeScene(scene); },
  };
}

/* ── Demo 3: Wireframe Icosahedron ─────────────── */
function icosphere() {
  const scene = new THREE.Scene();
  camera.position.set(0, 0, 7);

  const group = new THREE.Group();
  scene.add(group);

  const wire = new THREE.Mesh(
    new THREE.IcosahedronGeometry(2.4, 1),
    new THREE.MeshBasicMaterial({ color: COLORS.indigo, wireframe: true, transparent: true, opacity: 0.5 }),
  );
  group.add(wire);

  const inner = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.55, 1),
    new THREE.MeshBasicMaterial({ color: COLORS.cyan, wireframe: true, transparent: true, opacity: 0.25 }),
  );
  group.add(inner);

  // Vertex glow points
  const vGeo = new THREE.IcosahedronGeometry(2.4, 1);
  const vPts = new THREE.Points(
    vGeo,
    new THREE.PointsMaterial({
      color: COLORS.violet, size: 0.09, transparent: true, opacity: 0.9,
      blending: THREE.AdditiveBlending, depthWrite: false,
    }),
  );
  group.add(vPts);

  // Ambient starfield behind
  const S = 400;
  const sPos = new Float32Array(S * 3);
  for (let i = 0; i < S * 3; i++) sPos[i] = (Math.random() - 0.5) * 30;
  const sGeo = new THREE.BufferGeometry();
  sGeo.setAttribute('position', new THREE.BufferAttribute(sPos, 3));
  const stars = new THREE.Points(sGeo, new THREE.PointsMaterial({
    color: 0x9aa5b8, size: 0.03, transparent: true, opacity: 0.6,
  }));
  scene.add(stars);

  return {
    scene,
    update(t) {
      group.rotation.y = t * 0.18;
      group.rotation.x = Math.sin(t * 0.14) * 0.25;
      inner.rotation.y = -t * 0.3;
      const s = 1 + Math.sin(t * 0.8) * 0.035;
      group.scale.setScalar(s);
      stars.rotation.y = t * 0.012;

      group.rotation.y += mouse.x * 0.25;
      group.rotation.x += mouse.y * 0.18;
      camera.lookAt(0, 0, 0);
    },
    dispose() { disposeScene(scene); },
  };
}

/* ── Demo 4: Galaxy Spiral ─────────────────────── */
function galaxy() {
  const scene = new THREE.Scene();
  camera.position.set(0, 2.6, 5.2);

  const COUNT = 14000, BRANCHES = 4, RADIUS = 5.2, SPIN = 1.15, RAND = 0.42, RAND_POW = 2.6;
  const pos = new Float32Array(COUNT * 3);
  const col = new Float32Array(COUNT * 3);
  const cIn  = new THREE.Color(COLORS.cyan);
  const cOut = new THREE.Color(COLORS.indigo);
  const tmp = new THREE.Color();

  for (let i = 0; i < COUNT; i++) {
    const r = Math.random() * RADIUS;
    const branch = ((i % BRANCHES) / BRANCHES) * Math.PI * 2;
    const spin = r * SPIN;
    const rnd = () => Math.pow(Math.random(), RAND_POW) * (Math.random() < 0.5 ? 1 : -1) * RAND * r * 0.35;
    pos[i * 3]     = Math.cos(branch + spin) * r + rnd();
    pos[i * 3 + 1] = rnd() * 0.55;
    pos[i * 3 + 2] = Math.sin(branch + spin) * r + rnd();
    tmp.copy(cIn).lerp(cOut, Math.min(r / RADIUS * 1.15, 1));
    col[i * 3] = tmp.r; col[i * 3 + 1] = tmp.g; col[i * 3 + 2] = tmp.b;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  const mat = new THREE.PointsMaterial({
    size: 0.022,
    vertexColors: true,
    transparent: true,
    opacity: 0.95,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const pts = new THREE.Points(geo, mat);
  scene.add(pts);

  return {
    scene,
    update(t) {
      pts.rotation.y = t * 0.055;
      camera.position.x += (mouse.x * 1.3 - camera.position.x) * 0.04;
      camera.position.y += (2.6 - mouse.y * 1.1 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);
    },
    dispose() { disposeScene(scene); },
  };
}

/* ── Lab runner ────────────────────────────────── */
const DEMOS = [
  { key: 'wave',   name: 'Particle Wave',         desc: 'undulating point grid · indigo→cyan by height · camera parallax', make: particleWave },
  { key: 'net',    name: 'Constellation Network', desc: 'drifting nodes with proximity links · subtle parallax',           make: constellation },
  { key: 'ico',    name: 'Wireframe Icosahedron', desc: 'nested wireframes + vertex glow + starfield · mouse tilt',        make: icosphere },
  { key: 'galaxy', name: 'Galaxy Spiral',         desc: '14k particles · 4 branches · cyan core → indigo rim',             make: galaxy },
];

let current = null;
let currentIdx = -1;

const hud = document.getElementById('hud');
const nameEl = document.getElementById('demoName');
const descEl = document.getElementById('demoDesc');

DEMOS.forEach((d, i) => {
  const btn = document.createElement('button');
  btn.textContent = d.name;
  btn.dataset.idx = i;
  btn.addEventListener('click', () => select(i));
  hud.appendChild(btn);
});

function select(i) {
  if (i === currentIdx) return;
  current?.dispose();
  currentIdx = i;
  current = DEMOS[i].make();
  nameEl.textContent = DEMOS[i].name;
  descEl.textContent = DEMOS[i].desc;
  [...hud.children].forEach((b, j) => b.classList.toggle('active', j === i));
  // expose for automation/debugging
  window.__demo = DEMOS[i].key;
}

document.getElementById('heroToggle').addEventListener('click', () => {
  document.body.classList.toggle('show-hero');
});

// FPS meter
const fpsEl = document.getElementById('fps');
let frames = 0, lastFps = performance.now();

const clock = new THREE.Clock();
function loop() {
  requestAnimationFrame(loop);
  mouse.x += (mouse.tx - mouse.x) * 0.06;
  mouse.y += (mouse.ty - mouse.y) * 0.06;
  const t = clock.getElapsedTime();
  if (current) {
    current.update(t);
    renderer.render(current.scene, camera);
  }
  frames++;
  const now = performance.now();
  if (now - lastFps >= 1000) {
    fpsEl.textContent = frames;
    window.__fps = frames;
    frames = 0;
    lastFps = now;
  }
}

select(0);
loop();
