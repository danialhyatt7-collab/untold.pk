"use client";
import Reveal from "./Reveal";

// Consistent section header: small kicker + big condensed title.
export default function SectionHeading({ kicker, title, sub, id }) {
  return (
    <div id={id} className="mb-10 sm:mb-14">
      <Reveal>
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.35em] text-neon-purple/80">
          {kicker}
        </p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="display text-4xl leading-[0.95] sm:text-6xl">{title}</h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.1}>
          <p className="mt-4 max-w-2xl text-sm text-white/55 sm:text-base">{sub}</p>
        </Reveal>
      )}
    </div>
  );
}
