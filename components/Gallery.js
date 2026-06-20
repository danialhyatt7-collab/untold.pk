"use client";
import { motion } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";

// Placeholder grid. To use real media, replace the `media` items with
// { src: "/gallery/01.jpg" } (images) or { video: "/gallery/clip.mp4" }.
// TODO: drop past-event photos/videos into /public/gallery and map them here.
const media = [
  { label: "DARK SIGNAL '25", span: "row-span-2", accent: "from-neon-purple/30" },
  { label: "Crowd", span: "", accent: "from-neon-pink/30" },
  { label: "Lasers", span: "", accent: "from-neon-cyan/30" },
  { label: "INFRASOUND", span: "col-span-2", accent: "from-neon-acid/25" },
  { label: "Booth", span: "", accent: "from-neon-violet/30" },
  { label: "Afterhours", span: "", accent: "from-neon-pink/25" },
  { label: "SOUND WAVES", span: "row-span-2", accent: "from-neon-cyan/30" },
  { label: "Smoke", span: "", accent: "from-neon-purple/30" },
];

export default function Gallery() {
  return (
    <section id="gallery" className="relative border-y border-white/5 bg-coal/40 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          kicker="The Archive"
          title={<>Past <span className="neon-text">Nights</span></>}
          sub="What happens at UNTOLD usually stays at UNTOLD. A few frames that escaped."
        />
        <div className="grid auto-rows-[140px] grid-cols-2 gap-3 sm:auto-rows-[180px] sm:grid-cols-4">
          {media.map((m, i) => (
            <Reveal key={i} delay={(i % 4) * 0.05} className={m.span}>
              <motion.div
                whileHover={{ scale: 0.98 }}
                className={`group relative h-full w-full overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br ${m.accent} to-ink`}
              >
                <div className="aurora absolute inset-0 opacity-30 transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 grid-floor opacity-20" />
                <div className="absolute inset-0 flex items-end p-3">
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-white/60 transition-colors group-hover:text-white">
                    {m.label}
                  </span>
                </div>
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="rounded-full border border-white/30 px-3 py-1 font-mono text-[0.55rem] uppercase tracking-widest text-white/80">
                    View
                  </span>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
