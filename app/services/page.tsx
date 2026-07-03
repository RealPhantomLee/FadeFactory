import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ServiceCard from "@/components/booking/ServiceCard";
import { getServicesByCategory } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services & Pricing",
  description:
    "Explore Fade Factory's full service menu — haircuts, combos, beard work, and grooming add-ons with honest pricing.",
};

export default function ServicesPage() {
  const groups = getServicesByCategory();

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="What We Do"
          title={<>Services &amp; Pricing</>}
          subtitle="Every appointment includes a consultation. Pick a service to start your booking."
          image="/images/cut-07.jpg"
        />

        <section className="section bg-ink">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            {groups.map((group, gi) => (
              <div key={group.category} className={gi > 0 ? "mt-16" : ""}>
                <Reveal className="mb-8 flex items-center gap-4">
                  <span className="rule-gold" />
                  <h2 className="display text-3xl text-cream">{group.label}</h2>
                </Reveal>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {group.services.map((service, i) => (
                    <Reveal key={service.id} delay={(i % 3) * 80}>
                      <ServiceCard service={service} href={`/book?service=${service.id}`} />
                    </Reveal>
                  ))}
                </div>
              </div>
            ))}

            <Reveal className="mt-16 border-t border-line pt-12 text-center">
              <h3 className="display text-3xl text-cream">Ready for your best cut?</h3>
              <p className="mx-auto mt-3 max-w-lg text-muted">
                Build your appointment in seconds — stack services, pick a time, and you&apos;re set.
              </p>
              <Link href="/book" className="btn btn-gold mt-8">
                Start Booking
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
