// =============================================================
//  UNTOLD — GLOBAL SITE CONFIG
//  Edit brand info, contact links and the "next event" the
//  hero countdown ticks down to. Nothing here touches markup.
// =============================================================

export const site = {
  name: "UNTOLD",
  tagline: "Pakistan's underground after dark.",
  description:
    "UNTOLD is an underground rave collective throwing dark techno & electronic events across Islamabad, Lahore and Karachi. Couples & ladies only. No stags.",

  // Used for SEO / Open Graph (Instagram & WhatsApp link previews)
  url: "https://untold.pk",
  ogImage: "/og.jpg", // TODO: drop a 1200x630 share image at public/og.jpg

  cities: ["Islamabad", "Lahore", "Karachi"],

  // ---- CONTACT / SOCIAL ----  (swap in your real handles & numbers)
  contact: {
    instagram: "https://instagram.com/untold.pk", // TODO: real IG
    instagramHandle: "@untold.pk",
    // WhatsApp booking — international format, no "+" or spaces
    whatsapp: "923001234567", // TODO: real booking number
    whatsappLabel: "+92 300 1234567",
    email: "bookings@untold.pk", // TODO: real email
  },
};

// The hero countdown points at the soonest upcoming event by default.
// Override here if you want it locked to a specific one.
export const FEATURED_EVENT_ID = null; // e.g. "dark-signal" or leave null for auto
