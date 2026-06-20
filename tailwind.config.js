/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0a0a0c", // near-black neutral base
        coal: "#0e0f12",
        smoke: "#16171b",
        // Cinematic, desaturated accent palette. One warm ember accent +
        // muted steel, tuned to the smoky reference. Edit here to re-skin.
        // (key names kept from the old neon set so the whole site shifts.)
        neon: {
          purple: "#c9a27a", // primary warm ember/sand
          violet: "#a87f56", // deep bronze
          acid: "#9fb0ad", // muted sage-steel (was acid green)
          pink: "#d8a577", // soft warm peach (was hot pink)
          cyan: "#8aa1ad", // muted steel blue
        },
      },
      fontFamily: {
        // wired up in app/layout.js via next/font
        display: ["var(--font-display)", "Impact", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        // Soft cinematic elevation + faint warm rim (no hard neon glow)
        neon: "0 18px 50px rgba(0,0,0,0.55), 0 0 0 1px rgba(201,162,122,0.10)",
        "neon-pink": "0 18px 50px rgba(0,0,0,0.55), 0 0 0 1px rgba(216,165,119,0.14)",
        "neon-acid": "0 18px 50px rgba(0,0,0,0.55), 0 0 0 1px rgba(159,176,173,0.12)",
      },
      keyframes: {
        flicker: {
          "0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%": { opacity: "1" },
          "20%, 24%, 55%": { opacity: "0.35" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        flicker: "flicker 3s linear infinite",
        float: "float 6s ease-in-out infinite",
        scan: "scan 6s linear infinite",
        marquee: "marquee 22s linear infinite",
        pulseGlow: "pulseGlow 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
