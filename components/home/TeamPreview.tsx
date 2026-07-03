import Link from "next/link";
import BarberCard from "@/components/BarberCard";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { TEAM } from "@/lib/team";

export default function TeamPreview() {
  return (
    <section className="section bg-charcoal">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          align="center"
          eyebrow="The Crew"
          title={<>Master Barbers</>}
          subtitle="Hand-picked, highly trained, and obsessed with the details. Book with a favorite or let us match you."
        />
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((barber, i) => (
            <Reveal key={barber.id} delay={i * 90}>
              <BarberCard barber={barber} />
            </Reveal>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/book" className="btn btn-gold">
            Book Your Barber
          </Link>
        </div>
      </div>
    </section>
  );
}
