/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#05050a", // near-black base
        coal: "#0b0b12",
        smoke: "#13131d",
        // Neon accent palette — tweak these to re-skin the whole site
        neon: {
          purple: "#a855f7", // electric purple
          violet: "#7c3aed",
          acid: "#aaff00", // acid green
          pink: "#ff2d95", // hot pink
          cyan: "#22d3ee",
        },
      },
      fontFamily: {
        // wired up in app/layout.js via next/font
        display: ["var(--font-display)", "Impact", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        neon: "0 0 20px rgba(168,85,247,0.45), 0 0 60px rgba(168,85,247,0.25)",
        "neon-pink": "0 0 20px rgba(255,45,149,0.45), 0 0 60px rgba(255,45,149,0.25)",
        "neon-acid": "0 0 20px rgba(170,255,0,0.4), 0 0 60px rgba(170,255,0,0.2)",
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
