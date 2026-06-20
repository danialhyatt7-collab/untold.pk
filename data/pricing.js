// =============================================================
//  PRICING  (all amounts in PKR)
//
//  Strict door policy: NO STAGS. Entry is COUPLES, LADIES, or
//  GROUPS (4+ incl. females) only. Prices climb toward the date
//  to reward early buyers — edit freely.
//
//  Change `currency` / numbers here; the table & VIP cards read
//  straight from this file.
// =============================================================

export const currency = "PKR";

// Ladies promo cutoff — free entry before this, set price after.
export const ladiesPromo = {
  freeBefore: "11:30 PM", // free walk-in before this time
  priceAfter: 1500, // door price after cutoff
};

// Standard entry tiers (the climbing price ladder)
export const tiers = [
  {
    id: "ladies",
    name: "Ladies / Girls",
    badge: "Free before " + ladiesPromo.freeBefore,
    price: 0,
    priceLabel: "FREE",
    sub: `then ${currency} ${ladiesPromo.priceAfter.toLocaleString()} at the door`,
    perks: ["Free entry before cutoff", "1 welcome drink", "Priority lane"],
    accent: "pink",
    highlight: false,
  },
  {
    id: "couple-early",
    name: "Early Bird Couple",
    badge: "Limited — best value",
    price: 6000,
    priceLabel: null,
    sub: "1 male + 1 female · while stock lasts",
    perks: ["2 entries", "2 welcome drinks", "Locks in lowest price"],
    accent: "acid",
    highlight: true,
  },
  {
    id: "couple-regular",
    name: "Regular Couple",
    badge: "Advance",
    price: 8000,
    priceLabel: null,
    sub: "1 male + 1 female",
    perks: ["2 entries", "1 welcome drink"],
    accent: "purple",
    highlight: false,
  },
  {
    id: "couple-door",
    name: "Door Couple",
    badge: "On the night",
    price: 11000,
    priceLabel: null,
    sub: "1 male + 1 female · subject to capacity",
    perks: ["2 entries", "No guaranteed entry once full"],
    accent: "violet",
    highlight: false,
  },
  {
    id: "group",
    name: "Group Bundle (4+)",
    badge: "Per-head discount",
    price: 14000,
    priceLabel: null,
    sub: "Must include females · 4 people",
    perks: ["4 entries", "≈ PKR 3,500/head", "Group fast-track"],
    accent: "cyan",
    highlight: false,
  },
];

// VIP / Bottle service — the high-margin packages, shown prominently.
export const vipPackages = [
  {
    id: "vip-booth",
    name: "VIP Booth",
    price: 60000,
    capacity: "Up to 6 guests",
    sub: "Couples / mixed groups only",
    perks: [
      "Private booth, best view of the booth",
      "1 premium bottle + mixers",
      "Dedicated host",
      "Skip-the-line entry for all guests",
    ],
    accent: "purple",
    featured: false,
  },
  {
    id: "vip-table",
    name: "VIP Table — Bottle Service",
    price: 120000,
    capacity: "Up to 10 guests",
    sub: "Most popular · mixed groups only",
    perks: [
      "Prime stage-side table",
      "2 premium bottles + mixers",
      "Hookah + dedicated host",
      "Express entry & coat check",
    ],
    accent: "pink",
    featured: true,
  },
  {
    id: "vip-magnum",
    name: "The Magnum Suite",
    price: 250000,
    capacity: "Up to 16 guests",
    sub: "The full UNTOLD experience",
    perks: [
      "Largest private area on the floor",
      "4 premium bottles + champagne",
      "Personal host + security",
      "Backstage / artist meet (subject to availability)",
    ],
    accent: "acid",
    featured: false,
  },
];

// Shown as the door-policy notice on the pricing section.
export const doorPolicy = {
  title: "Strict Door Policy",
  rules: [
    "NO STAGS — single men will not be admitted.",
    "Entry for COUPLES (1 male + 1 female), LADIES, and GROUPS of 4+ that include females.",
    "Valid CNIC / ID required. 21+ only. Management reserves admission.",
  ],
};
