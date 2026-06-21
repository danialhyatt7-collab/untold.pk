/* ============================================================
   UNTOLD — real-time 3D journey (Three.js)
   Cold, misty, glacial. Scroll flies the camera toward a solid
   stone monolith → through its glowing seam → down an ice
   corridor past three event blocks frozen in ice → into a portal.
   Built + started only on "untold:enter" so the loader stays smooth.
   Falls back to the video build when WebGL is absent / reduced-motion.
   ============================================================ */
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function webglOK() {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
  } catch (e) { return false; }
}

// Mark early so CSS reveals the canvas / hides the video bg, but defer the
// heavy build + render loop until the user enters (keeps the loader smooth).
if (!reduced && webglOK()) {
  document.documentElement.classList.add('has-webgl');
  let started = false;
  const go = () => { if (started) return; started = true; try { build(); } catch (e) { console.warn('[UNTOLD] 3D failed:', e); document.documentElement.classList.remove('has-webgl'); } };
  window.addEventListener('untold:enter', go, { once: true });
  // safety: if no preloader fired within 8s, start anyway
  setTimeout(() => { if (!started && !document.body.classList.contains('is-loading')) go(); }, 8000);
}

function build() {
  const canvas = document.getElementById('webgl');
  if (!canvas) return;

  const COL = {
    sky:   0x2c3a48,
    fog:   0x2a3744,
    stone: 0x2b333d,
    ice:   0xbcd7e8,
    amber: 0xf4a94b,
    cyan:  0x9fe0ef,
  };

  /* ---------- renderer ---------- */
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;

  const scene = new THREE.Scene();

  /* cold vertical gradient sky (dark top → misty horizon) */
  const gradCanvas = document.createElement('canvas');
  gradCanvas.width = 4; gradCanvas.height = 512;
  const gctx = gradCanvas.getContext('2d');
  const grad = gctx.createLinearGradient(0, 0, 0, 512);
  grad.addColorStop(0.0, '#0b1018');
  grad.addColorStop(0.55, '#243140');
  grad.addColorStop(0.82, '#3a4c5e');
  grad.addColorStop(1.0, '#4a6076');
  gctx.fillStyle = grad; gctx.fillRect(0, 0, 4, 512);
  const skyTex = new THREE.CanvasTexture(gradCanvas);
  skyTex.colorSpace = THREE.SRGBColorSpace;
  scene.background = skyTex;
  scene.fog = new THREE.FogExp2(COL.fog, 0.012);

  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 400);

  /* env reflections (subtle) */
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

  /* ---------- lighting (cool, with one warm seam) ---------- */
  scene.add(new THREE.HemisphereLight(0xcfe0ee, 0x0a0f15, 0.85));
  const key = new THREE.DirectionalLight(0xdfeaff, 1.6);
  key.position.set(5, 13, 9); scene.add(key);
  const rim = new THREE.DirectionalLight(0xbcd4ea, 0.7);
  rim.position.set(-4, 6, -14); scene.add(rim);
  const seamLight = new THREE.PointLight(COL.amber, 2.6, 14, 2);
  seamLight.position.set(0, 4, 1.4); scene.add(seamLight);
  const portalLight = new THREE.PointLight(COL.cyan, 9, 60, 2);
  portalLight.position.set(0, 0, -80); scene.add(portalLight);

  /* ---------- materials ---------- */
  const stoneMat = new THREE.MeshStandardMaterial({ color: COL.stone, roughness: 0.94, metalness: 0, envMapIntensity: 0.25 });
  const iceMat = new THREE.MeshStandardMaterial({
    color: COL.ice, roughness: 0.32, metalness: 0, transparent: true, opacity: 0.5,
    emissive: 0x16384f, emissiveIntensity: 0.4, envMapIntensity: 0.8,
  });

  /* ---------- monolith: solid stone, narrow glowing seam ---------- */
  const monolith = new THREE.Group();
  const slabGeo = new THREE.BoxGeometry(3.6, 13, 3);
  const slabL = new THREE.Mesh(slabGeo, stoneMat); slabL.position.set(-1.9, 4.5, 0);
  const slabR = new THREE.Mesh(slabGeo, stoneMat); slabR.position.set( 1.9, 4.5, 0);
  monolith.add(slabL, slabR);
  const seamMat = new THREE.MeshStandardMaterial({ color: COL.amber, emissive: COL.amber, emissiveIntensity: 5, roughness: 0.4 });
  const seam = new THREE.Mesh(new THREE.PlaneGeometry(0.14, 12.4), seamMat);
  seam.position.set(0, 4.5, 1.46);
  const seamBack = seam.clone(); seamBack.position.z = -1.46; seamBack.rotation.y = Math.PI;
  monolith.add(seam, seamBack);
  scene.add(monolith);

  /* ---------- ground fading into mist ---------- */
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(600, 600),
    new THREE.MeshStandardMaterial({ color: 0x1a2430, roughness: 1, metalness: 0 })
  );
  ground.rotation.x = -Math.PI / 2; ground.position.y = -2; scene.add(ground);

  /* ---------- ice corridor ---------- */
  const corridor = new THREE.Group();
  const ringGeo = new THREE.TorusGeometry(6.2, 0.5, 8, 26);
  const ringMat = new THREE.MeshStandardMaterial({ color: COL.ice, roughness: 0.3, metalness: 0.05, emissive: 0x16384f, emissiveIntensity: 0.5, transparent: true, opacity: 0.92 });
  for (let i = 0; i < 9; i++) {
    const r = new THREE.Mesh(ringGeo, ringMat);
    r.position.z = -18 - i * 6.2;
    r.position.y = Math.sin(i * 0.6) * 0.4;
    r.rotation.z = i * 0.45;
    r.scale.setScalar(1 - i * 0.02);
    corridor.add(r);
  }
  scene.add(corridor);

  /* ---------- event objects frozen in ice ---------- */
  const blocks = [];
  const blockData = [
    { z: -30, x: -6.4, core: COL.cyan,  shape: 'ico'   },
    { z: -44, x:  6.4, core: 0xc3b2ff,  shape: 'oct'   },
    { z: -58, x: -6.2, core: COL.amber, shape: 'torus' },
  ];
  blockData.forEach((d) => {
    const g = new THREE.Group();
    const cube = new THREE.Mesh(new THREE.BoxGeometry(2.6, 2.6, 2.6), iceMat);
    let coreGeo;
    if (d.shape === 'ico') coreGeo = new THREE.IcosahedronGeometry(0.9, 0);
    else if (d.shape === 'oct') coreGeo = new THREE.OctahedronGeometry(1.0, 0);
    else coreGeo = new THREE.TorusGeometry(0.66, 0.26, 12, 22);
    const core = new THREE.Mesh(coreGeo, new THREE.MeshStandardMaterial({ color: d.core, emissive: d.core, emissiveIntensity: 2.8, roughness: 0.35 }));
    g.add(cube, core);
    g.position.set(d.x, 0.2, d.z);
    g.userData.core = core;
    scene.add(g); blocks.push(g);
  });

  /* ---------- portal ---------- */
  const portal = new THREE.Mesh(
    new THREE.TorusGeometry(4.2, 0.2, 16, 60),
    new THREE.MeshStandardMaterial({ color: COL.cyan, emissive: COL.cyan, emissiveIntensity: 4.5, roughness: 0.3 })
  );
  portal.position.set(0, 0, -80); scene.add(portal);
  const portalGlow = new THREE.Mesh(
    new THREE.CircleGeometry(3.9, 40),
    new THREE.MeshBasicMaterial({ color: 0xe6f6fb, transparent: true, opacity: 0.42 })
  );
  portalGlow.position.set(0, 0, -80.4); scene.add(portalGlow);

  /* ---------- snow ---------- */
  const SNOW = 900;
  const snowGeo = new THREE.BufferGeometry();
  const sp = new Float32Array(SNOW * 3);
  const range = { x: 64, y: 42, z: 120 };
  for (let i = 0; i < SNOW; i++) {
    sp[i * 3]     = (Math.random() - 0.5) * range.x;
    sp[i * 3 + 1] = Math.random() * range.y - 4;
    sp[i * 3 + 2] = -Math.random() * range.z + 20;
  }
  snowGeo.setAttribute('position', new THREE.BufferAttribute(sp, 3));
  const snow = new THREE.Points(snowGeo, new THREE.PointsMaterial({
    color: 0xeaf2ff, size: 0.06, sizeAttenuation: true, transparent: true, opacity: 0.7, depthWrite: false,
  }));
  scene.add(snow);

  /* ---------- bloom ---------- */
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.62, 0.5, 0.72);
  composer.addPass(bloom);
  composer.addPass(new OutputPass());

  /* ---------- camera path ---------- */
  const KEYS = [
    { p: 0.00, pos: [0, 3.0, 21],   tgt: [0, 4.0, 0]   },
    { p: 0.15, pos: [1.3, 3.2, 12], tgt: [0, 4.0, 0]   },
    { p: 0.33, pos: [0, 3.4, 4.2],  tgt: [0, 3.6, -10] },
    { p: 0.50, pos: [0, 0.8, -8],   tgt: [0, 0.6, -36] },
    { p: 0.72, pos: [-1.0, 0.4, -32], tgt: [0, 0, -58] },
    { p: 0.90, pos: [0.8, 0.2, -50], tgt: [0, 0, -72] },
    { p: 1.00, pos: [0, 0, -66],    tgt: [0, 0, -82]   },
  ];
  const vA = new THREE.Vector3(), vB = new THREE.Vector3();
  const tA = new THREE.Vector3(), tB = new THREE.Vector3();
  const curPos = new THREE.Vector3(), curTgt = new THREE.Vector3();
  const smooth = (t) => t * t * (3 - 2 * t);
  function sampleCamera(p) {
    let i = 0;
    while (i < KEYS.length - 1 && p > KEYS[i + 1].p) i++;
    const a = KEYS[i], b = KEYS[Math.min(i + 1, KEYS.length - 1)];
    const span = (b.p - a.p) || 1;
    const lt = smooth(Math.min(1, Math.max(0, (p - a.p) / span)));
    vA.fromArray(a.pos); vB.fromArray(b.pos);
    tA.fromArray(a.tgt); tB.fromArray(b.tgt);
    curPos.lerpVectors(vA, vB, lt);
    curTgt.lerpVectors(tA, tB, lt);
  }

  /* ---------- scroll + pointer ---------- */
  let progress = 0, targetProgress = 0, px = 0, py = 0, tpx = 0, tpy = 0;
  function readScroll() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    targetProgress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
  }
  window.addEventListener('scroll', readScroll, { passive: true });
  readScroll();
  window.addEventListener('pointermove', (e) => {
    tpx = (e.clientX / window.innerWidth - 0.5) * 2;
    tpy = (e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  function onResize() {
    const w = window.innerWidth, h = window.innerHeight;
    camera.aspect = w / h; camera.updateProjectionMatrix();
    renderer.setSize(w, h); composer.setSize(w, h);
  }
  window.addEventListener('resize', onResize);

  /* prime shaders once (one-time hitch hidden under the loader fade) */
  sampleCamera(0); camera.position.copy(curPos); camera.lookAt(curTgt);
  composer.render();

  /* ---------- loop ---------- */
  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();
    const dt = Math.min(0.05, clock.getDelta());

    progress += (targetProgress - progress) * 0.06;
    px += (tpx - px) * 0.05; py += (tpy - py) * 0.05;

    sampleCamera(progress);
    const gate = 1 - Math.max(0, 1 - Math.abs(progress - 0.4) / 0.14); // kill parallax while threading the seam
    const par = 0.55 * gate;
    camera.position.copy(curPos);
    camera.position.x += px * par;
    camera.position.y += -py * 0.45 * gate;
    curTgt.x += px * 0.35 * gate;
    camera.lookAt(curTgt);

    seamMat.emissiveIntensity = 4.4 + Math.sin(t * 1.6) * 1.2;
    seamLight.intensity = 2.2 + Math.sin(t * 1.6) * 0.8;
    portal.material.emissiveIntensity = 4 + Math.sin(t * 0.9) * 1.3;
    portal.rotation.z = t * 0.15;
    portalGlow.material.opacity = 0.34 + Math.sin(t * 0.9) * 0.1;

    corridor.children.forEach((r, i) => { r.rotation.z += dt * (0.04 + i * 0.003); });
    blocks.forEach((g, i) => {
      g.rotation.y += dt * 0.25;
      g.userData.core.rotation.x += dt * 0.5;
      g.userData.core.rotation.y -= dt * 0.35;
      g.position.y = 0.2 + Math.sin(t * 0.8 + i) * 0.16;
    });

    const pos = snowGeo.attributes.position.array;
    for (let i = 0; i < SNOW; i++) {
      pos[i * 3 + 1] -= dt * (0.5 + (i % 5) * 0.13);
      pos[i * 3]     += Math.sin(t * 0.3 + i) * dt * 0.04;
      if (pos[i * 3 + 1] < -4) pos[i * 3 + 1] = range.y - 4;
    }
    snowGeo.attributes.position.needsUpdate = true;

    composer.render();
  }
  animate();

  window.UNTOLD_SCENE = { scene, camera, renderer };
}
