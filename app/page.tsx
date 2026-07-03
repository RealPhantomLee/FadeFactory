import { generateLocalBusinessSchema } from "@/lib/schema";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Stats from "@/components/home/Stats";
import ServicesPreview from "@/components/home/ServicesPreview";
import Features from "@/components/home/Features";
import GalleryPreview from "@/components/home/GalleryPreview";
import TeamPreview from "@/components/home/TeamPreview";
import Testimonials from "@/components/home/Testimonials";
import CtaBand from "@/components/home/CtaBand";

export default function Home() {
  const schema = generateLocalBusinessSchema();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Stats />
        <ServicesPreview />
        <Features />
        <GalleryPreview />
        <TeamPreview />
        <Testimonials />
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
