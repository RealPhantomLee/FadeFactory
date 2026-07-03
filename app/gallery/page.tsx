import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import GalleryGrid from "@/components/GalleryGrid";
import Reveal from "@/components/Reveal";
import { GALLERY } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Fresh fades, tapers, and beard work straight from the Fade Factory chair.",
};

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="The Work"
          title={<>The Gallery</>}
          subtitle="No filters needed. Real cuts, real clients, real Fade Factory."
          image="/images/cut-11.jpg"
        />

        <section className="section bg-ink">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <GalleryGrid images={GALLERY} />

            <Reveal className="mt-16 text-center">
              <h3 className="display text-3xl text-cream">Like what you see?</h3>
              <p className="mx-auto mt-3 max-w-lg text-muted">Book your chair and get one of your own.</p>
              <Link href="/book" className="btn btn-gold mt-8">
                Book an Appointment
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
