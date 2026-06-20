"use client";
import { motion } from "framer-motion";
import { useCountdown, pad } from "./useCountdown";
import { events, getNextEvent } from "@/data/events";
import { site } from "@/data/site";

const fade = (d = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay: d, ease: [0.22, 1, 0.36, 1] },
});

/* ---- left sidebar widgets ---------------------------------------- */

function HypeWidget() {
  return (
    <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-white/40">
          ↑ 78% sold
        </span>
        <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white/15 text-[0.6rem] text-white/40">
          ?
        </span>
      </div>
      <div className="relative mt-6 h-20">
        {/* tooltip */}
        <div className="absolute left-1/2 top-1 z-10 -translate-x-1/2 rounded-md bg-white px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-wider text-ink shadow-lg">
          Filling fast
          <span className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-white" />
        </div>
        {/* rising sparkline */}
        <svg viewBox="0 0 240 80" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="spark" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#8aa1ad" />
              <stop offset="100%" stopColor="#d8a577" />
            </linearGradient>
          </defs>
          <motion.path
            d="M4 72 C 60 70, 90 60, 130 44 S 200 14, 236 8"
            fill="none"
            stroke="url(#spark)"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
          />
          <motion.circle
            cx="200" cy="20" r="4" fill="#efe9e1"
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.4 }}
          />
        </svg>
      </div>
    </div>
  );
}

function CityGlobe() {
  // tiny stylised globe with 3 pins for the three cities
  const pins = [
    { cx: 42, cy: 40 },
    { cx: 60, cy: 58 },
    { cx: 50, cy: 70 },
  ];
  return (
    <div className="relative mx-auto h-40 w-40">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/[0.06] to-transparent" />
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <circle cx="50" cy="50" r="38" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.10)" />
        {[18, 30, 50, 70, 82].map((y) => (
          <ellipse key={y} cx="50" cy={y} rx="38" ry={Math.max(4, 38 - Math.abs(50 - y))} fill="none" stroke="rgba(255,255,255,0.07)" />
        ))}
        {[35, 50, 65].map((x) => (
          <line key={x} x1={x} y1="13" x2={x} y2="87" stroke="rgba(255,255,255,0.05)" />
        ))}
        {pins.map((p, i) => (
          <g key={i}>
            <motion.circle
              cx={p.cx} cy={p.cy} r="2.4" fill="#d8a577"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.5 }}
            />
            <circle cx={p.cx} cy={p.cy} r="6" fill="none" stroke="rgba(216,165,119,0.25)" />
          </g>
        ))}
      </svg>
    </div>
  );
}

function Sidebar({ next }) {
  return (
    <motion.aside
      {...fade(0.15)}
      className="hidden w-[280px] shrink-0 flex-col gap-6 rounded-3xl border border-white/10 bg-white/[0.025] p-5 backdrop-blur-2xl lg:flex"
    >
      <div className="text-center">
        <p className="display text-xl tracking-tight text-white/90">UNTOLD</p>
        <div className="mx-auto mt-2 h-px w-16 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      </div>

      <div>
        <p className="mb-2 font-mono text-[0.6rem] uppercase tracking-[0.25em] text-white/40">Status</p>
        <HypeWidget />
        <a href="#tickets" className="mt-3 block text-center font-mono text-[0.65rem] uppercase tracking-[0.2em] text-white/50 transition-colors hover:text-white">
          See ticket tiers ›
        </a>
      </div>

      <div className="mt-auto">
        <p className="mb-3 font-mono text-[0.6rem] uppercase tracking-[0.25em] text-white/40">Select City</p>
        <CityGlobe />
        <div className="mt-3 rounded-full border border-white/10 bg-white/[0.03] py-2 text-center text-xs text-white/70">
          {next.city}, Pakistan
        </div>
      </div>
    </motion.aside>
  );
}

/* ---- bottom event-timeline wave ---------------------------------- */

function TimelineWave({ list, nextId }) {
  const n = list.length;
  // even x positions; a gentle wave with the peak on the next event
  const xs = list.map((_, i) => (100 / (n + 1)) * (i + 1));
  const nextIdx = Math.max(0, list.findIndex((e) => e.id === nextId));
  const ys = list.map((_, i) => 60 - 26 * Math.exp(-Math.pow((i - nextIdx) / 1.3, 2)) + (i % 2 ? 4 : -2));
  const d = xs.map((x, i) => `${i === 0 ? "M" : "L"} ${x} ${ys[i]}`).join(" ");

  return (
    <div className="relative mt-8 sm:mt-10">
      <svg viewBox="0 0 100 80" preserveAspectRatio="none" className="h-28 w-full sm:h-40">
        {/* peak marker line */}
        <line x1={xs[nextIdx]} y1="6" x2={xs[nextIdx]} y2={ys[nextIdx]} stroke="rgba(255,255,255,0.25)" strokeDasharray="1.5 2" strokeWidth="0.4" />
        <motion.path
          d={d}
          fill="none"
          stroke="rgba(231,231,234,0.7)"
          strokeWidth="0.7"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        />
        {xs.map((x, i) => (
          <g key={i}>
            {i === nextIdx ? (
              <>
                <circle cx={x} cy={ys[i]} r="3.4" fill="rgba(216,165,119,0.25)" />
                <circle cx={x} cy={ys[i]} r="1.6" fill="#efe9e1" />
              </>
            ) : (
              <circle cx={x} cy={ys[i]} r="0.9" fill="rgba(255,255,255,0.5)" />
            )}
          </g>
        ))}
      </svg>

      {/* labels row */}
      <div className="grid" style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}>
        {list.map((e) => {
          const dt = new Date(e.date);
          const isNext = e.id === nextId;
          return (
            <a key={e.id} href="#events" className="group flex flex-col items-center px-1 text-center">
              <span className={`truncate text-[0.6rem] font-medium uppercase tracking-wider sm:text-xs ${isNext ? "text-white" : "text-white/55"}`}>
                {dt.toLocaleDateString("en-GB", { weekday: "long" })}
              </span>
              <span className={`mt-2 display text-2xl leading-none sm:text-4xl ${isNext ? "text-white" : "text-white/25"}`}>
                {pad(dt.getDate())}
              </span>
              <span className="mt-1 hidden text-[0.55rem] uppercase tracking-wider text-white/40 sm:block">
                {e.city}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}

/* ---- upcoming cards (right column) ------------------------------- */

function MiniEventCard({ e }) {
  const dt = new Date(e.date);
  return (
    <a href="#events" className="group flex-1 rounded-2xl border border-white/10 bg-white/[0.03] p-3.5 backdrop-blur-xl transition-colors hover:bg-white/[0.06]">
      <div className="flex items-start justify-between">
        <span className="text-2xl">🌩️</span>
        <span className="display text-2xl text-white">{pad(dt.getDate())}</span>
      </div>
      <p className="mt-3 truncate text-sm font-medium text-white">{e.name}</p>
      <p className="truncate text-xs text-white/45">{e.city} · {dt.toLocaleDateString("en-GB", { month: "short" })}</p>
    </a>
  );
}

/* ---- main hero --------------------------------------------------- */

export default function Hero() {
  const next = getNextEvent();
  const t = useCountdown(next.date);
  const upcoming = events.filter((e) => new Date(e.date) > new Date()).slice(0, 5);
  const twoUp = upcoming.filter((e) => e.id !== next.id).slice(0, 2);

  const dateLabel = new Date(next.date).toLocaleDateString("en-GB", {
    weekday: "short", day: "numeric", month: "long",
  });

  return (
    <section id="top" className="relative min-h-[100svh] w-full px-4 pb-10 pt-24 sm:px-6">
      <div className="container-x flex gap-6">
        <Sidebar next={next} />

        {/* main panel */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* location + date */}
          <motion.div {...fade(0.1)} className="flex items-center gap-2 text-sm text-white/80">
            <span className="text-white/50">📍</span>
            {next.city}, Pakistan
            <span className="text-white/40">( {dateLabel} )</span>
          </motion.div>

          {/* big countdown + headline + right column */}
          <div className="mt-6 grid flex-1 grid-cols-1 gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div className="flex flex-col">
              {/* giant number = days, with HRS/MIN pills */}
              <motion.div {...fade(0.2)} className="flex items-start gap-4">
                <div className="flex items-end gap-3">
                  <span className="text-[7rem] font-extralight leading-[0.8] tracking-tighter text-white sm:text-[10rem]">
                    {t ? pad(t.days) : "00"}
                  </span>
                  <span className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-white/45">days</span>
                </div>
                <div className="mt-2 flex flex-col gap-2">
                  <span className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm backdrop-blur-xl">
                    <span className="text-white/45">HRS</span>
                    <span className="text-white">{t ? pad(t.hours) : "00"}</span>
                  </span>
                  <span className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm backdrop-blur-xl">
                    <span className="text-white/45">MIN</span>
                    <span className="text-white">{t ? pad(t.minutes) : "00"}</span>
                  </span>
                </div>
              </motion.div>

              {/* headline */}
              <motion.h1 {...fade(0.3)} className="mt-8 text-5xl font-light leading-[0.95] text-white/45 sm:text-7xl">
                {next.name}
                <br />
                <span className="text-white/30">{next.tagline}</span>
              </motion.h1>

              <motion.div {...fade(0.4)} className="mt-8 flex flex-wrap gap-3">
                <a href={next.ticketUrl} target="_blank" rel="noopener noreferrer"
                   className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-ink transition-transform hover:scale-[1.03]">
                  Get Tickets ↗
                </a>
                <a href="#events"
                   className="rounded-full border border-white/20 px-7 py-3 text-sm font-semibold text-white/85 backdrop-blur-xl transition-colors hover:bg-white/5">
                  All Events
                </a>
              </motion.div>
            </div>

            {/* right column */}
            <motion.div {...fade(0.35)} className="flex flex-col">
              <p className="text-sm leading-relaxed text-white/65">
                {site.description}
              </p>

              <div className="mt-6 flex items-center justify-between">
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-white/40">Upcoming</span>
                <a href="#events" className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-white/50 hover:text-white">See All ›</a>
              </div>
              <div className="mt-3 flex gap-3">
                {twoUp.map((e) => <MiniEventCard key={e.id} e={e} />)}
              </div>
            </motion.div>
          </div>

          {/* bottom timeline wave */}
          <TimelineWave list={upcoming} nextId={next.id} />
        </div>
      </div>
    </section>
  );
}
