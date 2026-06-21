# UNTOLD — Expedition 2026

A cinematic, scroll-driven site for **UNTOLD**, a music expedition / rave-festival
company based in Islamabad, Pakistan. Glacial / interstellar aesthetic inspired by
the MONOLITH reference, built with vanilla HTML/CSS/JS + GSAP ScrollTrigger + Lenis
smooth scroll. All hero/section visuals are AI-generated (Higgsfield — Nano Banana
Pro stills, Kling 3.0 motion).

## Run locally

It's a static site — any static server works:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Structure

```
index.html            # markup: preloader, hero, manifest, structure, events, contact
styles/main.css       # design system — ALL brand tokens live in :root at the top
scripts/main.js       # preloader, Lenis, cursor, magnetic, scramble, scroll anims, sound
assets/
  img/                # Nano Banana Pro key art (hero, airbeat, dimensions, awakening)
  video/              # Kling 3.0 clips (hero, descent, + per-event hover loops)
  logo/               # favicon.svg + untold-light.svg / untold-dark.svg (placeholders)
```

## Swapping brand assets

- **Colors / fonts:** edit the `:root` block at the top of `styles/main.css`. Every
  color and font reads from those variables — change them once, the whole site retints.
- **Logo:** the wordmark is CSS text (`.wordmark`). Drop your real SVGs into
  `assets/logo/untold-light.svg` / `untold-dark.svg` and reference them, or replace
  the `.wordmark` markup in `index.html`.

## Sound

Ambient audio is baked into the full-screen Kling clips (hero + descent). Browsers
block autoplay audio until a gesture, so it unlocks on the **CLICK TO ENTER** button
and defaults ON, with a **SOUND** toggle in the nav (global mute across all videos).

## Events

Airbeat (07 Aug 2026) · Dimensions (15 Aug 2026) · Awakening (22 Aug 2026) —
all Islamabad, venue disclosed to ticket holders only. Contact +92 33 7484 1818.
Dates are placeholders — update in `index.html`.
