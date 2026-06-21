/* ============================================================
   UNTOLD — Expedition 2026  ▸  interaction layer
   GSAP + ScrollTrigger + Lenis. Degrades gracefully.
   ============================================================ */
(() => {
  'use strict';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  /* ----------------------------------------------------------
     1. SMOOTH SCROLL (Lenis) + GSAP wiring
  ---------------------------------------------------------- */
  let lenis = null;
  function initSmoothScroll() {
    if (prefersReduced || typeof Lenis === 'undefined') return;
    lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      lerp: 0.085,
    });
    lenis.on('scroll', () => { if (window.ScrollTrigger) ScrollTrigger.update(); });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);

    if (window.gsap && window.ScrollTrigger) {
      gsap.ticker.lagSmoothing(0);
    }
  }

  /* Anchor links route through Lenis */
  function initAnchors() {
    $$('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const id = a.getAttribute('href');
        if (id.length < 2) return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        if (lenis) lenis.scrollTo(target, { offset: 0, duration: 1.4 });
        else target.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }

  /* ----------------------------------------------------------
     2. CUSTOM CURSOR
  ---------------------------------------------------------- */
  function initCursor() {
    if (!hasFinePointer) return;
    const cursor = $('.cursor');
    if (!cursor) return;
    let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y;
    document.addEventListener('mousemove', (e) => { x = e.clientX; y = e.clientY; });
    document.addEventListener('mousedown', () => cursor.classList.add('is-down'));
    document.addEventListener('mouseup', () => cursor.classList.remove('is-down'));
    const render = () => {
      cx += (x - cx) * 0.2; cy += (y - cy) * 0.2;
      cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      requestAnimationFrame(render);
    };
    render();
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest('[data-cursor="hover"], a, button')) cursor.classList.add('is-hover');
    });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest('[data-cursor="hover"], a, button')) cursor.classList.remove('is-hover');
    });
  }

  /* ----------------------------------------------------------
     3. MAGNETIC BUTTONS
  ---------------------------------------------------------- */
  function initMagnetic() {
    if (!hasFinePointer || prefersReduced) return;
    $$('[data-magnetic]').forEach((el) => {
      const strength = 0.32;
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const mx = e.clientX - (r.left + r.width / 2);
        const my = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate(${mx * strength}px, ${my * strength}px)`;
      });
      el.addEventListener('mouseleave', () => { el.style.transform = 'translate(0,0)'; });
    });
  }

  /* ----------------------------------------------------------
     4. PRELOADER  (counter 000 -> 100, then unlock)
  ---------------------------------------------------------- */
  function initPreloader() {
    const pre = $('#preloader');
    const countEl = $('#loadCount');
    const barEl = $('#loadBar');
    const statusEl = $('#loadStatus');
    const enterBtn = $('#enterBtn');
    if (!pre) { startSite(); return; }

    const phrases = [
      '// the signal is forming',
      '// raising the structure',
      '// tuning the silence',
      '// the structure is awake',
    ];
    let n = 0;
    const duration = 2600;
    const start = performance.now();

    function tick(now) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      n = Math.round(eased * 100);
      countEl.textContent = String(n).padStart(3, '0');
      barEl.style.width = n + '%';
      const pi = Math.min(phrases.length - 1, Math.floor(t * phrases.length));
      statusEl.textContent = phrases[pi];
      if (t < 1) requestAnimationFrame(tick);
      else {
        enterBtn.removeAttribute('disabled');
        statusEl.textContent = '// ready — click to descend';
      }
    }
    requestAnimationFrame(tick);

    const enter = () => {
      pre.classList.add('is-done');
      document.body.classList.remove('is-loading');
      document.body.classList.add('is-entered');
      window.dispatchEvent(new CustomEvent('untold:enter'));   // boot the 3D scene
      unlockAudio();
      startSite();
      setTimeout(() => pre.remove(), 1100);
    };
    enterBtn.addEventListener('click', enter);
  }

  /* ----------------------------------------------------------
     5. VIDEO HANDLING (lazy reveal + scroll-linked play)
  ---------------------------------------------------------- */
  const managedVideos = new Set();

  function readyVideo(v) {
    if (!v) return;
    const onReady = () => { v.classList.add('is-ready'); managedVideos.add(v); v.play().catch(() => {}); };
    if (v.readyState >= 2) onReady();
    else v.addEventListener('loadeddata', onReady, { once: true });
    v.addEventListener('error', () => {/* poster fallback stays */}, { once: true });
  }

  function initHeroVideo() {
    const webgl = document.documentElement.classList.contains('has-webgl');
    const v = $('#heroVideo');
    if (v) readyVideo(v);              // always: visual in video-mode, ambient audio bed in 3D-mode
    const d = $('#descentVideo');
    if (d) { if (webgl) d.pause(); else readyVideo(d); }
  }

  /* Event hover -> swap to video if a real source is present */
  function initEventVideos() {
    $$('.event').forEach((ev) => {
      const v = $('.event__video', ev);
      if (!v) return;
      const src = v.getAttribute('data-src');
      let loaded = false;
      const load = () => {
        if (loaded || !src) return;
        loaded = true;
        v.src = src;
        v.addEventListener('loadeddata', () => v.classList.add('is-ready'), { once: true });
        v.addEventListener('error', () => { loaded = false; v.removeAttribute('src'); }, { once: true });
        v.play().catch(() => {});
      };
      ev.addEventListener('mouseenter', load);
      // also load when scrolled into view on touch devices
      if (!hasFinePointer) {
        const io = new IntersectionObserver((es) => {
          es.forEach((e) => { if (e.isIntersecting) { load(); io.disconnect(); } });
        }, { threshold: 0.4 });
        io.observe(ev);
      }
    });
  }

  /* ----------------------------------------------------------
     6. SOUND  (videos carry ambient audio; toggle = global mute)
  ---------------------------------------------------------- */
  let soundOn = false;
  let audioUnlocked = false;

  function allVideos() { return $$('video'); }

  function applyMute() {
    // Hero clip is the single ambient bed; every other video stays muted.
    const hero = $('#heroVideo');
    allVideos().forEach((v) => {
      if (v === hero) {
        v.muted = !soundOn;
        v.play().catch(() => {});      // keep playing so unmute is instant
      } else {
        v.muted = true;
      }
    });
    const btn = $('#soundToggle');
    if (btn) btn.setAttribute('aria-pressed', String(soundOn));
  }

  function unlockAudio() {
    audioUnlocked = true;
    soundOn = true;          // sound ON by default after the entry gesture
    applyMute();
  }

  function initSoundToggle() {
    const btn = $('#soundToggle');
    if (!btn) return;
    btn.addEventListener('click', () => {
      if (!audioUnlocked) audioUnlocked = true;
      soundOn = !soundOn;
      applyMute();
    });
  }

  /* ----------------------------------------------------------
     7. TEXT SCRAMBLE  (headline glitch like the reference)
  ---------------------------------------------------------- */
  const GLYPHS = '█▓▒░/\\<>*+=-_:.#§01';
  function scrambleTo(el, finalText, opts = {}) {
    const dur = opts.duration || 1400;
    const start = performance.now();
    const chars = finalText.split('');
    function frame(now) {
      const t = Math.min(1, (now - start) / dur);
      let out = '';
      for (let i = 0; i < chars.length; i++) {
        const reveal = t * chars.length;
        if (i < reveal - 2) out += chars[i];
        else if (chars[i] === ' ') out += ' ';
        else out += GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      el.textContent = out;
      if (t < 1) requestAnimationFrame(frame);
      else el.textContent = finalText;
    }
    requestAnimationFrame(frame);
  }

  function initScrambleHeading() {
    const el = $('[data-scramble-heading]');
    if (!el) return;
    const finalText = el.textContent.trim();
    el.textContent = '';
    let played = false;
    const trigger = () => { if (played) return; played = true; scrambleTo(el, finalText, { duration: 1600 }); };
    if (window.ScrollTrigger && !prefersReduced) {
      ScrollTrigger.create({ trigger: el, start: 'top 75%', onEnter: trigger });
    } else { trigger(); }
  }

  /* ----------------------------------------------------------
     8. HUD TICKERS (live telemetry feel)
  ---------------------------------------------------------- */
  function initTickers() {
    if (prefersReduced) return;
    const drift = $('[data-ticker="drift"]');
    const res = $('[data-ticker="res"]');
    setInterval(() => {
      if (drift) drift.textContent = 'DRIFT ' + (0.3 + Math.random() * 0.5).toFixed(2);
    }, 2200);
    setInterval(() => {
      if (res) res.textContent = 'RES ' + (6.8 + Math.random() * 0.6).toFixed(2);
    }, 1700);
  }

  /* ----------------------------------------------------------
     9. SCROLL ANIMATIONS (reveals, parallax, line splits)
  ---------------------------------------------------------- */
  function splitIntoWords(el) {
    const text = el.textContent;
    el.innerHTML = '';
    text.split(/(\s+)/).forEach((tok) => {
      if (/^\s+$/.test(tok)) { el.appendChild(document.createTextNode(tok)); return; }
      const span = document.createElement('span');
      span.className = 'word';
      span.textContent = tok;
      el.appendChild(span);
    });
    return $$('.word', el);
  }

  function initScrollAnimations() {
    if (!window.gsap || !window.ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);

    // Manifest: word-by-word reveal
    const lead = $('.manifest__lead');
    if (lead && !prefersReduced) {
      const words = splitIntoWords(lead);
      gsap.set(words, { opacity: 0.12 });
      gsap.to(words, {
        opacity: 1, stagger: 0.04, ease: 'none',
        scrollTrigger: { trigger: lead, start: 'top 78%', end: 'bottom 55%', scrub: true },
      });
    }

    // Generic fade-ups
    $$('.section-index, .manifest__meta > div, .events__heading, .contact__title, .contact__sub, .contact__phone, .contact__row, .footer > *')
      .forEach((el) => {
        gsap.from(el, {
          opacity: 0, y: 30, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        });
      });

    // Event rows: media + body reveal
    $$('.event').forEach((ev) => {
      const media = $('.event__media', ev);
      const body = $('.event__body', ev);
      gsap.from(media, { opacity: 0, y: 60, scale: 0.96, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: ev, start: 'top 80%' } });
      gsap.from(body.children, { opacity: 0, y: 28, stagger: 0.07, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: ev, start: 'top 74%' } });
    });

    // Hero parallax on the media
    const heroMedia = $('.hero__media');
    if (heroMedia && !prefersReduced) {
      gsap.to(heroMedia, { yPercent: 18, scale: 1.08, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    }
    const heroCenter = $('.hero__center');
    if (heroCenter && !prefersReduced) {
      gsap.to(heroCenter, { yPercent: -30, opacity: 0, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    }

    // Structure video subtle zoom across its pinned range
    const descent = $('#descentVideo');
    if (descent && !prefersReduced) {
      gsap.fromTo(descent, { scale: 1.15 }, { scale: 1, ease: 'none',
        scrollTrigger: { trigger: '.structure', start: 'top bottom', end: 'bottom top', scrub: true } });
    }
  }

  /* ----------------------------------------------------------
     10. NAV state on scroll
  ---------------------------------------------------------- */
  function initNav() {
    const nav = $('#nav');
    if (!nav || !window.ScrollTrigger) return;
    ScrollTrigger.create({
      trigger: '.hero', start: 'bottom top',
      onEnter: () => nav.classList.add('is-scrolled'),
      onLeaveBack: () => nav.classList.remove('is-scrolled'),
    });
  }

  /* ----------------------------------------------------------
     BOOT
  ---------------------------------------------------------- */
  let started = false;
  function startSite() {
    if (started) return;
    started = true;
    initHeroVideo();
    if (window.ScrollTrigger) ScrollTrigger.refresh();
  }

  function boot() {
    initSmoothScroll();
    initCursor();
    initMagnetic();
    initAnchors();
    initSoundToggle();
    initEventVideos();
    initTickers();
    initScrambleHeading();
    initScrollAnimations();
    initNav();
    initPreloader();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
