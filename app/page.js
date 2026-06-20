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
      <Nav />
      <main>
        <Hero />
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
