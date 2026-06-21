/* ============================================================
   UNTOLD — real-time 3D journey (Three.js)
   Scroll-driven camera: monolith → through the seam →
   ice corridor → event blocks frozen in ice → portal.
   Falls back silently to the video build if WebGL is absent.
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

if (!reduced && webglOK()) {
  try { init(); } catch (e) { console.warn('[UNTOLD] 3D init failed, using video fallback:', e); }
}

function init() {
  const canvas = document.getElementById('webgl');
  if (!canvas) return;
  document.documentElement.classList.add('has-webgl');

  const COL = {
    bg:    0x0a0d12,
    ice:   0x9fc2d8,
    amber: 0xf4a94b,
    cyan:  0x86d3e6,
    stone: 0x141a22,
  };

  /* ---------- renderer ---------- */
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(COL.bg);
  scene.fog = new THREE.FogExp2(COL.bg, 0.021);

  const camera = new THREE.PerspectiveCamera(52, window.innerWidth / window.innerHeight, 0.1, 400);
  camera.position.set(0, 2, 20);

  /* ---------- environment reflections ---------- */
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

  /* ---------- lighting ---------- */
  scene.add(new THREE.HemisphereLight(COL.ice, 0x05080c, 0.55));
  const key = new THREE.DirectionalLight(0xeaf2ff, 1.25);
  key.position.set(6, 14, -22);
  scene.add(key);
  const seamLight = new THREE.PointLight(COL.amber, 8, 26, 2);
  seamLight.position.set(0, 3, 0.6);
  scene.add(seamLight);
  const portalLight = new THREE.PointLight(COL.cyan, 14, 60, 2);
  portalLight.position.set(0, 0, -78);
  scene.add(portalLight);

  /* ---------- materials ---------- */
  const stoneMat = new THREE.MeshStandardMaterial({ color: COL.stone, roughness: 0.85, metalness: 0.1 });
  const iceMat = new THREE.MeshPhysicalMaterial({
    color: COL.ice, roughness: 0.12, metalness: 0, transparent: true, opacity: 0.42,
    clearcoat: 1, clearcoatRoughness: 0.2, envMapIntensity: 1.4, side: THREE.DoubleSide,
  });

  /* ---------- monolith (two slabs + glowing seam) ---------- */
  const monolith = new THREE.Group();
  const slabGeo = new THREE.BoxGeometry(3.4, 12, 3);
  const slabL = new THREE.Mesh(slabGeo, stoneMat); slabL.position.set(-2.7, 4, 0);
  const slabR = new THREE.Mesh(slabGeo, stoneMat); slabR.position.set( 2.7, 4, 0);
  monolith.add(slabL, slabR);
  const seamMat = new THREE.MeshStandardMaterial({ color: COL.amber, emissive: COL.amber, emissiveIntensity: 6, roughness: 0.4 });
  const seam = new THREE.Mesh(new THREE.PlaneGeometry(0.18, 11.4), seamMat);
  seam.position.set(0, 4, 1.51);
  const seamBack = seam.clone(); seamBack.position.z = -1.51; seamBack.rotation.y = Math.PI;
  monolith.add(seam, seamBack);
  scene.add(monolith);

  /* ---------- ground + drifting mist plane ---------- */
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(400, 400),
    new THREE.MeshStandardMaterial({ color: 0x0c1118, roughness: 1, metalness: 0 })
  );
  ground.rotation.x = -Math.PI / 2; ground.position.y = -2;
  scene.add(ground);

  /* ---------- ice corridor (rings the camera flies through) ---------- */
  const corridor = new THREE.Group();
  const ringGeo = new THREE.TorusGeometry(6.2, 0.5, 8, 28);
  const ringMat = new THREE.MeshStandardMaterial({ color: COL.ice, roughness: 0.25, metalness: 0.1, emissive: 0x14304a, emissiveIntensity: 0.6 });
  for (let i = 0; i < 11; i++) {
    const r = new THREE.Mesh(ringGeo, ringMat);
    r.position.z = -14 - i * 6;
    r.position.y = Math.sin(i * 0.6) * 0.5;
    r.rotation.z = i * 0.4;
    r.scale.setScalar(1 - i * 0.015);
    corridor.add(r);
  }
  scene.add(corridor);

  /* ---------- event blocks frozen in ice ---------- */
  const blocks = [];
  const blockData = [
    { z: -26, x: -5.2, core: COL.cyan,  shape: 'ico'   },
    { z: -40, x:  5.2, core: 0xbca6ff,  shape: 'oct'   },
    { z: -54, x: -5.0, core: COL.amber, shape: 'torus' },
  ];
  blockData.forEach((d) => {
    const g = new THREE.Group();
    const cube = new THREE.Mesh(new THREE.BoxGeometry(3.2, 3.2, 3.2), iceMat);
    let coreGeo;
    if (d.shape === 'ico') coreGeo = new THREE.IcosahedronGeometry(1.05, 0);
    else if (d.shape === 'oct') coreGeo = new THREE.OctahedronGeometry(1.15, 0);
    else coreGeo = new THREE.TorusGeometry(0.8, 0.32, 12, 24);
    const core = new THREE.Mesh(coreGeo, new THREE.MeshStandardMaterial({ color: d.core, emissive: d.core, emissiveIntensity: 3.2, roughness: 0.3 }));
    g.add(cube, core);
    g.position.set(d.x, 0.2, d.z);
    g.userData.core = core;
    scene.add(g); blocks.push(g);
  });

  /* ---------- portal ---------- */
  const portal = new THREE.Mesh(
    new THREE.TorusGeometry(4.2, 0.22, 16, 64),
    new THREE.MeshStandardMaterial({ color: COL.cyan, emissive: COL.cyan, emissiveIntensity: 5, roughness: 0.3 })
  );
  portal.position.set(0, 0, -78);
  scene.add(portal);
  const portalGlow = new THREE.Mesh(
    new THREE.CircleGeometry(4, 48),
    new THREE.MeshBasicMaterial({ color: 0xdff4fb, transparent: true, opacity: 0.5 })
  );
  portalGlow.position.set(0, 0, -78.4);
  scene.add(portalGlow);

  /* ---------- snow ---------- */
  const SNOW = 1800;
  const snowGeo = new THREE.BufferGeometry();
  const sp = new Float32Array(SNOW * 3);
  const range = { x: 60, y: 40, z: 110 };
  for (let i = 0; i < SNOW; i++) {
    sp[i * 3]     = (Math.random() - 0.5) * range.x;
    sp[i * 3 + 1] = Math.random() * range.y - 4;
    sp[i * 3 + 2] = -Math.random() * range.z + 20;
  }
  snowGeo.setAttribute('position', new THREE.BufferAttribute(sp, 3));
  const snow = new THREE.Points(snowGeo, new THREE.PointsMaterial({
    color: 0xeaf2ff, size: 0.07, sizeAttenuation: true, transparent: true, opacity: 0.8, depthWrite: false,
  }));
  scene.add(snow);

  /* ---------- post-processing (bloom) ---------- */
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.82, 0.62, 0.62);
  composer.addPass(bloom);
  composer.addPass(new OutputPass());

  /* ---------- camera path keyframes (by scroll progress) ---------- */
  const KEYS = [
    { p: 0.00, pos: [0, 2.4, 20],   tgt: [0, 3.0, 0]   },
    { p: 0.15, pos: [1.4, 2.8, 11], tgt: [0, 3.0, 0]   },
    { p: 0.33, pos: [0, 1.8, 3.4],  tgt: [0, 2.6, -10] },
    { p: 0.50, pos: [0, 0.5, -7],   tgt: [0, 0.4, -34] },
    { p: 0.72, pos: [-1.0, 0.3, -30], tgt: [0, 0, -56] },
    { p: 0.90, pos: [0.8, 0.1, -47], tgt: [0, 0, -68] },
    { p: 1.00, pos: [0, 0, -62],    tgt: [0, 0, -80]   },
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

  /* ---------- scroll + pointer state ---------- */
  let progress = 0, targetProgress = 0;
  let px = 0, py = 0, tpx = 0, tpy = 0;

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

  /* ---------- resize ---------- */
  function onResize() {
    const w = window.innerWidth, h = window.innerHeight;
    camera.aspect = w / h; camera.updateProjectionMatrix();
    renderer.setSize(w, h); composer.setSize(w, h);
  }
  window.addEventListener('resize', onResize);

  /* ---------- loop ---------- */
  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();
    const dt = Math.min(0.05, clock.getDelta());

    progress += (targetProgress - progress) * 0.06;
    px += (tpx - px) * 0.05; py += (tpy - py) * 0.05;

    sampleCamera(progress);
    // soften parallax while threading the monolith seam (progress ~0.3–0.5)
    const gate = 1 - Math.max(0, 1 - Math.abs(progress - 0.4) / 0.14);
    const sampleParallax = 0.6 * gate;
    camera.position.copy(curPos);
    camera.position.x += px * sampleParallax;
    camera.position.y += -py * 0.5 * gate;
    curTgt.x += px * 0.4 * gate;
    camera.lookAt(curTgt);

    // seam + portal pulse
    seamMat.emissiveIntensity = 5 + Math.sin(t * 1.6) * 1.6;
    seamLight.intensity = 7 + Math.sin(t * 1.6) * 2;
    portal.material.emissiveIntensity = 4.5 + Math.sin(t * 0.9) * 1.5;
    portal.rotation.z = t * 0.15;
    portalGlow.material.opacity = 0.4 + Math.sin(t * 0.9) * 0.12;

    // corridor + blocks motion
    corridor.children.forEach((r, i) => { r.rotation.z += dt * (0.05 + i * 0.004); });
    blocks.forEach((g, i) => {
      g.rotation.y += dt * 0.25;
      g.userData.core.rotation.x += dt * 0.5;
      g.userData.core.rotation.y -= dt * 0.35;
      g.position.y = 0.2 + Math.sin(t * 0.8 + i) * 0.18;
    });

    // snow fall
    const pos = snowGeo.attributes.position.array;
    for (let i = 0; i < SNOW; i++) {
      pos[i * 3 + 1] -= dt * (0.6 + (i % 5) * 0.15);
      pos[i * 3]     += Math.sin(t * 0.3 + i) * dt * 0.05;
      if (pos[i * 3 + 1] < -4) pos[i * 3 + 1] = range.y - 4;
    }
    snowGeo.attributes.position.needsUpdate = true;

    composer.render();
  }
  animate();

  // expose for debugging / hooks
  window.UNTOLD_SCENE = { scene, camera, renderer };
}
