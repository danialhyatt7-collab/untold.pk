"use client";
import { motion } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import { tiers, vipPackages, doorPolicy, currency } from "@/data/pricing";
import { site } from "@/data/site";

const accentText = {
  pink: "text-neon-pink", acid: "text-neon-acid", purple: "text-neon-purple",
  violet: "text-neon-violet", cyan: "text-neon-cyan",
};

const money = (n) => `${currency} ${n.toLocaleString()}`;
const waLink = (msg) => `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(msg)}`;

function TierCard({ t, i }) {
  const accent = accentText[t.accent] || accentText.purple;
  return (
    <Reveal delay={i * 0.05}>
      <motion.div
        whileHover={{ y: -5 }}
        className={`relative flex h-full flex-col rounded-2xl border p-5 transition-all ${
          t.highlight
            ? "border-neon-acid/50 bg-neon-acid/[0.04] shadow-neon-acid"
            : "card-glow hover:border-white/20"
        }`}
      >
        {t.highlight && (
          <span className="absolute -top-3 left-5 rounded-full bg-neon-acid px-3 py-1 font-mono text-[0.55rem] uppercase tracking-widest text-ink">
            Best Value
          </span>
        )}
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-white/40">{t.badge}</p>
        <h3 className="mt-1 display text-2xl">{t.name}</h3>
        <div className="mt-3 flex items-end gap-1">
          <span className={`display text-4xl ${accent}`}>{t.priceLabel || money(t.price)}</span>
        </div>
        <p className="mt-1 text-xs text-white/50">{t.sub}</p>
        <ul className="mt-4 flex-1 space-y-2">
          {t.perks.map((p, k) => (
            <li key={k} className="flex items-start gap-2 text-xs text-white/65">
              <span className={`mt-1 h-1 w-1 rounded-full ${accent.replace("text-", "bg-")}`} />
              {p}
            </li>
          ))}
        </ul>
        <a
          href={waLink(`Hi UNTOLD — I want ${t.name} tickets`)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 rounded-xl border border-white/10 py-2.5 text-center text-xs font-semibold uppercase tracking-widest text-white/80 transition-colors hover:bg-white/[0.04]"
        >
          Reserve
        </a>
      </motion.div>
    </Reveal>
  );
}

function VipCard({ v, i }) {
  const accent = accentText[v.accent] || accentText.purple;
  return (
    <Reveal delay={i * 0.06}>
      <motion.div
        whileHover={{ y: -6 }}
        className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 transition-all ${
          v.featured ? "border-neon-pink/50 shadow-neon-pink" : "card-glow hover:border-white/20"
        }`}
      >
        <div className="aurora absolute inset-0 -z-10 opacity-20 transition-opacity group-hover:opacity-40" />
        {v.featured && (
          <span className="mb-2 w-max rounded-full bg-neon-pink/15 px-3 py-1 font-mono text-[0.55rem] uppercase tracking-widest text-neon-pink">
            Most Popular
          </span>
        )}
        <h3 className="display text-2xl">{v.name}</h3>
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-white/40">{v.capacity}</p>
        <div className="mt-3 display text-4xl text-white">{money(v.price)}</div>
        <p className="mt-1 text-xs text-white/50">{v.sub}</p>
        <ul className="mt-4 flex-1 space-y-2">
          {v.perks.map((p, k) => (
            <li key={k} className="flex items-start gap-2 text-sm text-white/70">
              <span className={accent}>◆</span> {p}
            </li>
          ))}
        </ul>
        <a
          href={waLink(`Hi UNTOLD — I want to book the ${v.name} package`)}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-5 rounded-xl border py-3 text-center text-sm font-semibold uppercase tracking-widest transition-colors ${
            v.featured
              ? "border-neon-pink/60 text-neon-pink hover:bg-neon-pink/10"
              : "border-white/15 text-white/80 hover:bg-white/[0.04]"
          }`}
        >
          Book Table
        </a>
      </motion.div>
    </Reveal>
  );
}

export default function Pricing() {
  return (
    <section id="tickets" className="container-x py-24 sm:py-32">
      <SectionHeading
        kicker="Entry & Tables"
        title={<>Tickets <span className="text-stroke">&amp; VIP</span></>}
        sub="Early birds pay the least — prices climb as the date nears. Book ahead."
      />

      {/* Door policy notice */}
      <Reveal>
        <div className="mb-10 overflow-hidden rounded-2xl border border-neon-pink/30 bg-neon-pink/[0.04]">
          <div className="flex items-center gap-3 border-b border-neon-pink/20 px-5 py-3">
            <span className="rounded-md bg-neon-pink/20 px-2 py-0.5 font-mono text-xs uppercase tracking-widest text-neon-pink">
              No Stags
            </span>
            <p className="display text-lg text-neon-pink">{doorPolicy.title}</p>
          </div>
          <ul className="grid gap-2 px-5 py-4 sm:grid-cols-3">
            {doorPolicy.rules.map((r, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-white/65">
                <span className="text-neon-pink">✕</span> {r}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      {/* Entry tiers */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {tiers.map((t, i) => (
          <TierCard key={t.id} t={t} i={i} />
        ))}
      </div>

      {/* VIP / bottle service */}
      <div className="mt-16">
        <Reveal>
          <h3 className="display mb-2 text-3xl">
            VIP <span className="neon-text">Tables</span> & Bottle Service
          </h3>
          <p className="mb-8 max-w-xl text-sm text-white/55">
            Skip the line, own the floor. Tables are couples / mixed groups only and sell out first — message us to lock yours.
          </p>
        </Reveal>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {vipPackages.map((v, i) => (
            <VipCard key={v.id} v={v} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
