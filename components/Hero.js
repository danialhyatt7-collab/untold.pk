"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Countdown from "./Countdown";
import GlitchText from "./ui/GlitchText";
import NeonButton from "./ui/NeonButton";
import { site } from "@/data/site";
import { getNextEvent } from "@/data/events";

export default function Hero() {
  const next = getNextEvent();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yLogo = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const fmtDate = new Date(next.date).toLocaleDateString("en-GB", {
    weekday: "short", day: "numeric", month: "long", year: "numeric",
  });

  return (
    <section ref={ref} id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden">
      {/* ---- Animated background (the "suitable bg" for the countdown) ---- */}
      <div className="aurora" />
      <div className="absolute inset-0 grid-floor opacity-60" />
      {/* scanning light bar */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-neon-purple/15 to-transparent"
        animate={{ y: ["-10%", "120%"] }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink" />

      {/* ---- Top marquee ticker ---- */}
      <div className="relative z-10 border-b border-white/5 py-2">
        <div className="flex w-max animate-marquee gap-8 whitespace-nowrap font-mono text-[0.65rem] uppercase tracking-[0.3em] text-white/40">
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k} className="flex gap-8">
              {["No Stags", "Couples & Ladies Only", "21+", "Location Drops 24h Before",
                "Islamabad · Lahore · Karachi", "Dark Techno", "RSVP Now", "•"].map((w, i) => (
                <span key={i}>{w} <span className="text-neon-pink">/</span></span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ---- Center stack ---- */}
      <motion.div
        style={{ opacity }}
        className="container-x relative z-10 flex flex-1 flex-col items-center justify-center py-12 text-center"
      >
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.25em] text-white/60"
        >
          <span className="h-1.5 w-1.5 animate-pulseGlow rounded-full bg-neon-acid" />
          Next: {next.name} — {next.city}
        </motion.span>

        <motion.h1
          style={{ y: yLogo }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="display text-[22vw] leading-[0.8] sm:text-[16vw] lg:text-[13rem]"
        >
          <GlitchText className="text-stroke">UNT</GlitchText>
          <GlitchText className="neon-text">OLD</GlitchText>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-2 max-w-md text-balance text-sm text-white/60 sm:text-base"
        >
          {site.tagline} Dark techno &amp; electronic rituals across Pakistan.
        </motion.p>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="mt-10 flex flex-col items-center"
        >
          <p className="mb-4 font-mono text-[0.65rem] uppercase tracking-[0.3em] text-white/40">
            Time until {next.name} · {fmtDate}
          </p>
          <Countdown target={next.date} />
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <NeonButton href={next.ticketUrl} solid>
            Get Tickets ↗
          </NeonButton>
          <NeonButton href="#events" accent="purple">
            See Events
          </NeonButton>
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        className="relative z-10 mb-6 flex justify-center font-mono text-[0.6rem] uppercase tracking-[0.3em] text-white/35"
      >
        Scroll ↓
      </motion.div>
    </section>
  );
}
