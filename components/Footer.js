"use client";
import { motion } from "framer-motion";
import { site } from "@/data/site";
import GlitchText from "./ui/GlitchText";

const waLink = `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(
  "Hi UNTOLD — I'd like to book / ask about an event"
)}`;

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-coal">
      <div className="aurora absolute inset-0 opacity-30" />
      <div className="container-x relative py-16">
        {/* Big CTA */}
        <div className="mb-12 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="display text-5xl leading-none sm:text-8xl"
          >
            <GlitchText className="neon-text">JOIN THE</GlitchText>{" "}
            <GlitchText className="text-stroke">FLOOR</GlitchText>
          </motion.h2>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-neon-pink px-8 py-3 text-sm font-semibold uppercase tracking-widest text-ink shadow-neon-pink transition-transform hover:scale-105"
          >
            Book on WhatsApp ↗
          </a>
        </div>

        {/* Links grid */}
        <div className="grid gap-8 border-t border-white/10 py-10 sm:grid-cols-3">
          <div>
            <p className="display text-2xl neon-text">UNTOLD</p>
            <p className="mt-2 max-w-xs text-sm text-white/50">{site.tagline}</p>
          </div>

          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-white/40">Contact</p>
            <ul className="space-y-2 text-sm">
              <li>
                <a href={site.contact.instagram} target="_blank" rel="noopener noreferrer"
                   className="text-white/70 transition-colors hover:text-neon-pink">
                  Instagram — {site.contact.instagramHandle}
                </a>
              </li>
              <li>
                <a href={waLink} target="_blank" rel="noopener noreferrer"
                   className="text-white/70 transition-colors hover:text-neon-acid">
                  WhatsApp — {site.contact.whatsappLabel}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.contact.email}`}
                   className="text-white/70 transition-colors hover:text-neon-purple">
                  {site.contact.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-white/40">Cities</p>
            <ul className="space-y-2 text-sm text-white/70">
              {site.cities.map((c) => (
                <li key={c}>{c}, Pakistan</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-white/35">
            © {new Date().getFullYear()} UNTOLD · No Stags · 21+
          </p>
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-white/35">
            If you know, you know.
          </p>
        </div>
      </div>
    </footer>
  );
}
