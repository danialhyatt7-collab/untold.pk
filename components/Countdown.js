"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Returns {days,hours,minutes,seconds,done} for a target ISO date.
function diff(target) {
  const ms = Math.max(0, new Date(target) - new Date());
  const done = ms === 0;
  const s = Math.floor(ms / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
    done,
  };
}

const pad = (n) => String(n).padStart(2, "0");

// A single 2-digit unit. Each digit flips when it changes — the
// "countdown animation" with no background of its own so it sits on
// whatever the hero puts behind it.
function Unit({ value, label }) {
  const digits = pad(value).split("");
  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-1">
        {digits.map((d, i) => (
          <div
            key={i}
            className="relative h-[3.2rem] w-[2.4rem] overflow-hidden rounded-md border border-white/10 bg-white/[0.03] sm:h-[5.5rem] sm:w-[4rem] md:h-[6.5rem] md:w-[5rem]"
            style={{ perspective: 400 }}
          >
            {/* center seam */}
            <div className="pointer-events-none absolute left-0 top-1/2 z-20 h-px w-full -translate-y-1/2 bg-black/60" />
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={d}
                initial={{ rotateX: -90, opacity: 0, y: "-40%" }}
                animate={{ rotateX: 0, opacity: 1, y: "0%" }}
                exit={{ rotateX: 90, opacity: 0, y: "40%" }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="display absolute inset-0 flex items-center justify-center text-3xl text-white neon-text sm:text-5xl md:text-6xl"
                style={{ transformOrigin: "center", backfaceVisibility: "hidden" }}
              >
                {d}
              </motion.span>
            </AnimatePresence>
          </div>
        ))}
      </div>
      <span className="mt-2 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-white/45 sm:text-xs">
        {label}
      </span>
    </div>
  );
}

export default function Countdown({ target, className = "" }) {
  const [t, setT] = useState(null); // null until mounted (avoids hydration mismatch)

  useEffect(() => {
    setT(diff(target));
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (!t) {
    return <div className={`h-[5.5rem] sm:h-[7.5rem] ${className}`} aria-hidden />;
  }

  if (t.done) {
    return (
      <p className={`display text-2xl text-neon-pink neon-text-pink ${className}`}>
        We&apos;re live — doors are open
      </p>
    );
  }

  return (
    <div className={`flex items-start gap-2 sm:gap-4 ${className}`}>
      <Unit value={t.days} label="Days" />
      <span className="display pt-2 text-2xl text-neon-purple/50 sm:pt-5 sm:text-4xl">:</span>
      <Unit value={t.hours} label="Hours" />
      <span className="display pt-2 text-2xl text-neon-purple/50 sm:pt-5 sm:text-4xl">:</span>
      <Unit value={t.minutes} label="Min" />
      <span className="display pt-2 text-2xl text-neon-purple/50 sm:pt-5 sm:text-4xl">:</span>
      <Unit value={t.seconds} label="Sec" />
    </div>
  );
}
