import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import BarberCard from "@/components/BarberCard";
import Reveal from "@/components/Reveal";
import { TEAM } from "@/lib/team";

export const metadata: Metadata = {
  title: "Meet the Barbers",
  description: "Meet the Fade Factory crew — master barbers obsessed with fades, beards, and the details.",
};

export default function TeamPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="The Crew"
          title={<>Meet the Barbers</>}
          subtitle="Hand-picked, highly trained, and dialed in on every detail. Find your barber."
          image="/images/BarberDee.jpg"
        />

        <section className="section bg-ink">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {TEAM.map((barber, i) => (
                <Reveal key={barber.id} delay={i * 90}>
                  <BarberCard barber={barber} />
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-16 text-center">
              <Link href="/book" className="btn btn-gold">
                Book Your Barber
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
