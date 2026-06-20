// =============================================================
//  DJ LINEUP  (real artists pulled from the 2026 scene)
//
//  NOTE ON PHOTOS: leave `image` null to render a styled neon
//  placeholder. To use a real photo, drop it in /public/djs and
//  set image: "/djs/<file>.jpg". Please use licensed / press
//  photos only.
//
//  Instagram handles below are the artists' known official
//  accounts — double-check before launch in case any changed.
// =============================================================

export const djs = [
  // ---------------- INTERNATIONAL ----------------
  {
    id: "charlotte-de-witte",
    name: "Charlotte de Witte",
    origin: "Belgium",
    tag: "International",
    role: "Headliner",
    bio: "The leading figure of modern techno — dark, driving sets and her KNTXT label.",
    image: null, // TODO: /djs/charlotte.jpg (press photo)
    instagram: "https://instagram.com/charlottedewitte",
    soundcloud: "https://soundcloud.com/charlottedewitteofficial",
  },
  {
    id: "amelie-lens",
    name: "Amelie Lens",
    origin: "Belgium",
    tag: "International",
    role: "Headliner",
    bio: "Belgian techno powerhouse behind the Lenske and Exhale labels.",
    image: null, // TODO: /djs/amelie.jpg
    instagram: "https://instagram.com/amelie_lens",
    soundcloud: "https://soundcloud.com/amelielensofficial",
  },
  {
    id: "sara-landry",
    name: "Sara Landry",
    origin: "USA",
    tag: "International",
    role: "Headliner",
    bio: "The biggest rising name in hard techno — raw energy and hypnotic, heavy sets.",
    image: null, // TODO: /djs/sara.jpg
    instagram: "https://instagram.com/saralandry",
    soundcloud: "https://soundcloud.com/saralandry",
  },
  {
    id: "carl-cox",
    name: "Carl Cox",
    origin: "UK",
    tag: "International",
    role: "Legend",
    bio: "The icon. Three decades bridging rave culture and techno, Ibiza resident in 2026.",
    image: null, // TODO: /djs/carlcox.jpg
    instagram: "https://instagram.com/carlcoxofficial",
    soundcloud: "https://soundcloud.com/carl-cox",
  },
  {
    id: "indira-paganotto",
    name: "Indira Paganotto",
    origin: "Spain",
    tag: "International",
    role: "Headliner",
    bio: "Psy-techno force and founder of the ARTCORE label, dominating 2026 festival stages.",
    image: null, // TODO: /djs/indira.jpg
    instagram: "https://instagram.com/indirapaganotto",
    soundcloud: "https://soundcloud.com/indirapaganotto",
  },
  {
    id: "999999999",
    name: "999999999",
    origin: "Italy",
    tag: "International",
    role: "Live",
    bio: "Italian hard-rave duo (label Nineteen93) — relentless 150-160 BPM live sets.",
    image: null, // TODO: /djs/999.jpg
    instagram: "https://instagram.com/999999999_act",
    soundcloud: "https://soundcloud.com/999999999-1",
  },

  // ---------------- LOCAL (PAKISTAN) ----------------
  {
    id: "dj-tiger",
    name: "DJ Tiger",
    origin: "Islamabad",
    tag: "Local",
    role: "Resident",
    bio: "Islamabad selector spanning EDM, techno, house and progressive.",
    image: null, // TODO: /djs/dj-tiger.jpg
    instagram: "https://instagram.com/", // TODO: confirm official handle
    soundcloud: null,
  },
  {
    id: "brooklyn-baxter",
    name: "Brooklyn Baxter",
    origin: "Islamabad",
    tag: "Local",
    role: "Resident",
    bio: "Islamabad-based DJ working techno and house for the capital's underground.",
    image: null, // TODO: /djs/baxter.jpg
    instagram: "https://instagram.com/", // TODO: confirm official handle
    soundcloud: null,
  },
  {
    id: "dj-zee",
    name: "Zeeshan Shafiq",
    origin: "Lahore",
    tag: "Local",
    role: "Resident",
    bio: "Lahore electronic-music DJ — @dj_zee_official.",
    image: null, // TODO: /djs/dj-zee.jpg
    instagram: "https://instagram.com/dj_zee_official",
    soundcloud: null,
  },
  {
    id: "dj-arnee",
    name: "DJ Arnee",
    origin: "Lahore",
    tag: "Local",
    role: "Resident",
    bio: "Lahore crate-digger crossing disco, house and techno with vinyl roots.",
    image: null, // TODO: /djs/arnee.jpg
    instagram: "https://instagram.com/", // TODO: confirm official handle
    soundcloud: null,
  },
  {
    id: "saadi",
    name: "Saadi",
    origin: "Karachi",
    tag: "Local",
    role: "Resident",
    bio: "Karachi's Saad Chohan — melodic & afro techno, progressive and tech house.",
    image: null, // TODO: /djs/saadi.jpg
    instagram: "https://instagram.com/", // TODO: confirm official handle
    soundcloud: null,
  },
  {
    id: "shaka",
    name: "Shaka",
    origin: "Karachi",
    tag: "Local",
    role: "Rising",
    bio: "Young Karachi producer — dark melodic techno with 500k+ Spotify streams.",
    image: null, // TODO: /djs/shaka.jpg
    instagram: "https://instagram.com/", // TODO: confirm official handle
    soundcloud: null,
  },
  {
    id: "raja",
    name: "Raja Shehryar",
    origin: "Pakistan",
    tag: "Local",
    role: "Resident",
    bio: "Four years deep in the Pakistan underground — house & techno, shared bills with internationals.",
    image: null, // TODO: /djs/raja.jpg
    instagram: "https://instagram.com/rajashehryarofficial",
    soundcloud: null,
  },
];

export const djById = Object.fromEntries(djs.map((d) => [d.id, d]));
