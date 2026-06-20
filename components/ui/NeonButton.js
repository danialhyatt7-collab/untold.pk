"use client";
import { motion } from "framer-motion";

const accents = {
  purple: "shadow-neon border-neon-purple/60 hover:bg-neon-purple/10 text-neon-purple",
  pink: "shadow-neon-pink border-neon-pink/60 hover:bg-neon-pink/10 text-neon-pink",
  acid: "shadow-neon-acid border-neon-acid/60 hover:bg-neon-acid/10 text-neon-acid",
};

// Filled (primary) or outlined (ghost) neon CTA. Renders an <a>.
export default function NeonButton({
  children,
  href = "#",
  accent = "purple",
  solid = false,
  className = "",
  ...props
}) {
  const base =
    "group relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-semibold uppercase tracking-widest transition-colors";
  const style = solid
    ? "bg-neon-pink text-ink shadow-neon-pink hover:bg-neon-pink/90"
    : `border bg-white/[0.02] ${accents[accent] || accents.purple}`;

  return (
    <motion.a
      href={href}
      className={`${base} ${style} ${className}`}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      {...props}
    >
      {children}
    </motion.a>
  );
}
