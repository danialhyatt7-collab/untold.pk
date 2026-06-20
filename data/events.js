// =============================================================
//  EVENTS
//  Add / remove events here. Each one renders its own card and
//  feeds the hero countdown (soonest future date wins).
//
//  date  -> ISO string, local Pakistan time (PKT, +05:00)
//  ticketUrl -> a ticketing page OR a wa.me WhatsApp link
//  lineup -> array of dj `id`s from data/djs.js
//  image -> TODO: drop a poster in /public/events and point here
// =============================================================

export const events = [
  {
    id: "dark-signal",
    name: "DARK SIGNAL",
    city: "Islamabad",
    venue: "The Hangar — F-9 (venue revealed 24h before)", // TODO: real venue
    date: "2026-07-18T22:00:00+05:00",
    tagline: "Industrial techno until the signal drops.",
    accent: "purple",
    lineup: ["charlotte-de-witte", "dj-tiger", "raja", "brooklyn-baxter"],
    ticketUrl: "https://wa.me/923001234567?text=DARK%20SIGNAL%20tickets", // TODO
    image: "/events/dark-signal.jpg",
    status: "On Sale",
  },
  {
    id: "sound-waves-2",
    name: "SOUND WAVES 2.0",
    city: "Lahore",
    venue: "Riverfront Warehouse (venue revealed 24h before)", // TODO
    date: "2026-08-09T22:00:00+05:00",
    tagline: "Melodic house & afterhours by the water.",
    accent: "cyan",
    lineup: ["amelie-lens", "dj-zee", "dj-arnee", "saadi"],
    ticketUrl: "https://wa.me/923001234567?text=SOUND%20WAVES%20tickets", // TODO
    image: "/events/sound-waves.jpg",
    status: "Early Bird",
  },
  {
    id: "infrasound",
    name: "INFRASOUND",
    city: "Karachi",
    venue: "Seaview Rooftop (venue revealed 24h before)", // TODO
    date: "2026-09-06T22:00:00+05:00",
    tagline: "Sub-bass, salt air, dark melodic techno.",
    accent: "pink",
    lineup: ["sara-landry", "shaka", "saadi", "indira-paganotto"],
    ticketUrl: "https://wa.me/923001234567?text=INFRASOUND%20tickets", // TODO
    image: "/events/infrasound.jpg",
    status: "Coming Soon",
  },
  {
    id: "blackout",
    name: "BLACKOUT 003",
    city: "Islamabad",
    venue: "Undisclosed — RSVP only", // TODO
    date: "2026-10-25T22:00:00+05:00",
    tagline: "Lights off. Lasers on. Hard techno only.",
    accent: "acid",
    lineup: ["999999999", "indira-paganotto", "brooklyn-baxter", "dj-tiger"],
    ticketUrl: "https://wa.me/923001234567?text=BLACKOUT%20tickets", // TODO
    image: "/events/blackout.jpg",
    status: "RSVP",
  },
  {
    id: "nocturne",
    name: "NOCTURNE",
    city: "Lahore",
    venue: "Old Town Courtyard (venue revealed 24h before)", // TODO
    date: "2026-12-13T22:00:00+05:00",
    tagline: "New Year warm-up. Progressive till sunrise.",
    accent: "violet",
    lineup: ["carl-cox", "amelie-lens", "dj-zee", "raja"],
    ticketUrl: "https://wa.me/923001234567?text=NOCTURNE%20tickets", // TODO
    image: "/events/nocturne.jpg",
    status: "Coming Soon",
  },
];

// Helper: soonest event still in the future (drives the hero countdown)
export function getNextEvent(now = new Date()) {
  const upcoming = events
    .filter((e) => new Date(e.date) > now)
    .sort((a, b) => new Date(a.date) - new Date(b.date));
  return upcoming[0] || events[0];
}
