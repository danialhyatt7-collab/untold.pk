"use client";
import { motion } from "framer-motion";
import Reveal from "./ui/Reveal";
import { site } from "@/data/site";

const stats = [
  { n: "3", l: "Cities" },
  { n: "20+", l: "Artists" },
  { n: "5K+", l: "Ravers" },
  { n: "100%", l: "Underground" },
];

export default function About() {
  return (
    <section id="about" className="container-x py-24 sm:py-32">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <Reveal>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.35em] text-neon-purple/80">
              The Story
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display text-4xl leading-[0.95] sm:text-6xl">
              We are <span className="neon-text-pink">UNTOLD</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-white/60 sm:text-base">
              <p>
                UNTOLD started as a whisper — a few hundred people, one warehouse, no
                phones on the floor. Pakistan&apos;s electronic underground had always
                been here; it just never had a home loud enough.
              </p>
              <p>
                We build nights for the dancers, not the feeds. Dark rooms, heavy
                systems, and a strict door so everyone inside can let go. Couples and
                ladies only. No stags, no exceptions — that&apos;s how the floor stays
                ours.
              </p>
              <p>
                Islamabad, Lahore, Karachi. Locations stay quiet until 24 hours out.
                If you know, you know.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-white/40">
              {site.cities.join(" · ")}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="relative overflow-hidden rounded-2xl border border-white/10 p-8">
            <div className="aurora absolute inset-0 opacity-50" />
            <div className="absolute inset-0 grid-floor opacity-30" />
            <div className="relative grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-white/10">
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  whileHover={{ backgroundColor: "rgba(168,85,247,0.08)" }}
                  className="flex flex-col items-center justify-center gap-1 bg-ink/80 py-10"
                >
                  <span className="display text-5xl neon-text">{s.n}</span>
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-white/50">
                    {s.l}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
