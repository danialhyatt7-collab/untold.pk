"use client";
import { motion } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import GlitchText from "./ui/GlitchText";
import { events } from "@/data/events";
import { djById } from "@/data/djs";

const accentMap = {
  purple: { text: "text-neon-purple", ring: "hover:border-neon-purple/50", glow: "group-hover:shadow-neon" },
  pink: { text: "text-neon-pink", ring: "hover:border-neon-pink/50", glow: "group-hover:shadow-neon-pink" },
  acid: { text: "text-neon-acid", ring: "hover:border-neon-acid/50", glow: "group-hover:shadow-neon-acid" },
  cyan: { text: "text-neon-cyan", ring: "hover:border-neon-cyan/50", glow: "group-hover:shadow-neon" },
  violet: { text: "text-neon-violet", ring: "hover:border-neon-violet/50", glow: "group-hover:shadow-neon" },
};

function EventCard({ ev, i }) {
  const a = accentMap[ev.accent] || accentMap.purple;
  const d = new Date(ev.date);
  const day = d.toLocaleDateString("en-GB", { day: "2-digit" });
  const mon = d.toLocaleDateString("en-GB", { month: "short" }).toUpperCase();
  const full = d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  return (
    <Reveal delay={i * 0.06}>
      <motion.article
        whileHover={{ y: -6 }}
        className={`group card-glow relative flex h-full flex-col overflow-hidden rounded-2xl border transition-all ${a.ring} ${a.glow}`}
      >
        {/* Poster area — TODO: replace with real <Image src={ev.image} /> */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-smoke to-ink">
          <div className="aurora absolute inset-0 opacity-40 transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 grid-floor opacity-30" />
          <div className="absolute left-4 top-4 flex flex-col items-center rounded-lg border border-white/10 bg-ink/70 px-3 py-2 backdrop-blur">
            <span className="display text-2xl leading-none text-white">{day}</span>
            <span className="font-mono text-[0.6rem] tracking-widest text-white/60">{mon}</span>
          </div>
          <span className={`absolute right-4 top-4 rounded-full border border-current px-3 py-1 font-mono text-[0.6rem] uppercase tracking-widest ${a.text}`}>
            {ev.status}
          </span>
          <div className="absolute inset-x-0 bottom-0 flex items-end p-5">
            <h3 className="display text-3xl leading-none sm:text-4xl">
              <GlitchText className={a.text}>{ev.name}</GlitchText>
            </h3>
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-1 flex-col p-5">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/50">
            {ev.city} · {full}
          </p>
          <p className="mt-1 text-sm text-white/45">{ev.venue}</p>
          <p className="mt-3 text-sm text-white/70">{ev.tagline}</p>

          {/* Lineup chips */}
          <div className="mt-4 flex flex-wrap gap-2">
            {ev.lineup.map((id) => {
              const dj = djById[id];
              if (!dj) return null;
              return (
                <span key={id} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/70">
                  {dj.name}
                </span>
              );
            })}
          </div>

          <a
            href={ev.ticketUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-5 inline-flex items-center justify-between gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold uppercase tracking-wider transition-colors hover:bg-white/[0.04] ${a.text}`}
          >
            Get Tickets <span aria-hidden>↗</span>
          </a>
        </div>
      </motion.article>
    </Reveal>
  );
}

export default function Events() {
  return (
    <section id="events" className="container-x relative py-24 sm:py-32">
      <SectionHeading
        kicker="The Calendar"
        title={<>Upcoming<br className="sm:hidden" /> <span className="text-stroke">Rituals</span></>}
        sub="Five nights. Three cities. Each one its own world — different lineup, different darkness. Exact location drops 24 hours before doors."
      />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((ev, i) => (
          <EventCard key={ev.id} ev={ev} i={i} />
        ))}
      </div>
    </section>
  );
}
