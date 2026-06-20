# UNTOLD

Dark, neon, underground rave-event site for **UNTOLD** — techno & electronic
nights across Islamabad, Lahore and Karachi. Built with **Next.js (App Router)**,
**Tailwind CSS** and **Framer Motion**. Mobile-first, fast, SEO + Open Graph ready
so links preview well on Instagram / WhatsApp.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Where to edit (no component code needed)

Everything you'll change lives in `/data`:

| File | What it controls |
|------|------------------|
| `data/site.js` | Brand name, tagline, **Instagram / WhatsApp / email**, cities, OG image. |
| `data/events.js` | Each event: name, city, **venue**, **date** (drives the hero countdown), lineup, **ticket link**. |
| `data/djs.js` | DJ roster: names, bios, photos, **Instagram / SoundCloud** links. |
| `data/pricing.js` | All ticket tiers, VIP tables and the no-stags door policy. Prices in **PKR**. |

Search the data files for `TODO:` — those mark every spot to drop in real
**venue names, images, phone numbers and ticket URLs**.

### Swapping in real images
- Hero/background is pure CSS (no image needed).
- DJ photos: set `image: "/djs/name.jpg"` in `data/djs.js` and drop the file in `public/djs/`. Leave `null` for a styled neon placeholder.
- Event posters: `image` in `data/events.js` → `public/events/`.
- Gallery: edit `components/Gallery.js` `media[]` to point at `public/gallery/` photos or videos.
- Share image: add a 1200×630 `public/og.jpg` (referenced by `data/site.js`).

### Ticket links
Each event's `ticketUrl` and every pricing button can point to a ticketing
platform **or** a `https://wa.me/<number>?text=...` WhatsApp link. The WhatsApp
number comes from `data/site.js` → `contact.whatsapp`.

## Re-skin the palette
Neon colors and shadows are defined once in `tailwind.config.js`
(`colors.neon.*`). Change them there to recolor the whole site.

## Sections
Hero (logo + animated countdown) · Events · Lineup/DJs · Tickets & VIP ·
Gallery · About · Footer. Composed in `app/page.js`.

> Door policy is intentionally prominent: **NO STAGS** — couples, ladies and
> groups (4+ incl. females) only.

---

DJ roster sourced from the live 2026 Pakistani + international scene — verify
each artist's official Instagram/SoundCloud handle before launch (handles
flagged with `TODO` in `data/djs.js`).
