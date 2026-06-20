"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import { djs } from "@/data/djs";

// Tiny inline icons (no extra deps)
const IgIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
  </svg>
);
const ScIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M2 14v4h1v-4H2zm2-1v5h1v-5H4zm2-2v7h1v-7H6zm2-1v8h1v-8H8zm2-1v9h1V9h-1zm2 9h6a3 3 0 0 0 0-6 4.5 4.5 0 0 0-8.7-1.5V18h2.7z" />
  </svg>
);

function initials(name) {
  return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}

function DJCard({ dj, i }) {
  const isLocal = dj.tag === "Local";
  return (
    <Reveal delay={(i % 4) * 0.05}>
      <motion.div
        whileHover={{ y: -6 }}
        className="group card-glow relative overflow-hidden rounded-2xl border transition-all hover:border-neon-purple/40 hover:shadow-neon"
      >
        {/* Photo / placeholder */}
        <div className="relative aspect-square overflow-hidden">
          {dj.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={dj.image} alt={dj.name} className="h-full w-full object-cover grayscale transition duration-500 group-hover:grayscale-0 group-hover:scale-105" />
          ) : (
            <div className="relative flex h-full w-full items-center justify-center bg-gradient-to-br from-smoke to-ink">
              <div className="aurora absolute inset-0 opacity-30" />
              <span className="display relative text-6xl text-white/15 transition-colors group-hover:text-white/30">
                {initials(dj.name)}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
          <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 font-mono text-[0.55rem] uppercase tracking-widest ${
            isLocal ? "bg-neon-acid/15 text-neon-acid" : "bg-neon-pink/15 text-neon-pink"
          }`}>
            {dj.tag}
          </span>
          <span className="absolute right-3 top-3 rounded-full bg-black/40 px-2.5 py-1 font-mono text-[0.55rem] uppercase tracking-widest text-white/70 backdrop-blur">
            {dj.role}
          </span>
        </div>

        <div className="p-4">
          <h3 className="display text-xl leading-none">{dj.name}</h3>
          <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-white/40">{dj.origin}</p>
          <p className="mt-2 text-xs leading-relaxed text-white/55">{dj.bio}</p>
          <div className="mt-3 flex gap-2">
            {dj.instagram && (
              <a href={dj.instagram} target="_blank" rel="noopener noreferrer"
                 className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/60 transition-colors hover:border-neon-pink/50 hover:text-neon-pink" aria-label={`${dj.name} Instagram`}>
                <IgIcon width="15" height="15" />
              </a>
            )}
            {dj.soundcloud && (
              <a href={dj.soundcloud} target="_blank" rel="noopener noreferrer"
                 className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/60 transition-colors hover:border-neon-acid/50 hover:text-neon-acid" aria-label={`${dj.name} SoundCloud`}>
                <ScIcon width="17" height="17" />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </Reveal>
  );
}

export default function Lineup() {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "International", "Local"];
  const shown = filter === "All" ? djs : djs.filter((d) => d.tag === filter);

  return (
    <section id="lineup" className="relative border-y border-white/5 bg-coal/40 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          kicker="The Selectors"
          title={<>The <span className="neon-text-pink">Lineup</span></>}
          sub="International headliners alongside the best of Pakistan's underground. Sets, not setlists."
        />

        <div className="mb-8 flex gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] transition-colors ${
                filter === f
                  ? "border-neon-purple bg-neon-purple/10 text-neon-purple"
                  : "border-white/10 text-white/50 hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {shown.map((dj, i) => (
            <DJCard key={dj.id} dj={dj} i={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
