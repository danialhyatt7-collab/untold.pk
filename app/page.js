import Background from "@/components/Background";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Events from "@/components/Events";
import Lineup from "@/components/Lineup";
import Pricing from "@/components/Pricing";
import Gallery from "@/components/Gallery";
import About from "@/components/About";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Background />
      <Nav />
      <Hero />
      {/* content below the cinematic hero sits on solid dark */}
      <main className="relative bg-ink/90 backdrop-blur-sm">
        <Events />
        <Lineup />
        <Pricing />
        <Gallery />
        <About />
      </main>
      <Footer />
    </>
  );
}
