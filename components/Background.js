import Image from "next/image";
import clouds from "@/public/bg/clouds.png";

// Fixed cinematic cloud backdrop for the whole site. next/image handles
// the GitHub Pages basePath automatically. Heavy dark overlays keep text
// readable and let the warm glow sit behind the dashboard.
// TODO: swap /public/bg/clouds.png for your own stormy-sky photo any time.
export default function Background() {
  return (
    <div className="fixed inset-0 -z-10">
      <Image
        src={clouds}
        alt=""
        fill
        priority
        placeholder="blur"
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* darken + vignette so the dashboard reads on top */}
      <div className="absolute inset-0 bg-ink/55" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/30 to-ink" />
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_30%,transparent,rgba(10,10,12,0.7))]" />
    </div>
  );
}
