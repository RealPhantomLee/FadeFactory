import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { SERVICES } from "@/lib/services";

// A curated slice for the homepage; full menu lives on /services.
const FEATURED_IDS = ["haircut", "haircut-beard", "haircut-hot-towel", "beard-work", "hot-towel-beard", "line-up"];
const featured = FEATURED_IDS.map((id) => SERVICES.find((s) => s.id === id)!).filter(Boolean);

export default function ServicesPreview() {
  return (
    <section className="section relative overflow-hidden bg-ink">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-end justify-between gap-6 sm:flex-row">
          <SectionHeading
            eyebrow="What We Do"
            title={<>The Menu</>}
            subtitle="Signature services, honest pricing. Every appointment includes a consultation so you leave with exactly the look you wanted."
          />
          <Link href="/services" className="btn btn-outline flex-shrink-0">
            Full Service Menu
          </Link>
        </div>

        <div className="mt-14 grid gap-x-16 gap-y-2 md:grid-cols-2">
          {featured.map((s, i) => (
            <Reveal key={s.id} delay={(i % 2) * 80}>
              <div className="group flex items-baseline gap-3 border-b border-line py-5">
                <div className="flex-shrink-0">
                  <span className="text-lg font-semibold text-cream transition-colors group-hover:text-gold">
                    {s.name}
                  </span>
                  {s.popular && (
                    <span className="ml-2 align-middle text-[0.6rem] font-bold uppercase tracking-wider text-gold">
                      ★ Popular
                    </span>
                  )}
                  <span className="ml-2 text-xs text-muted">{s.duration} min</span>
                </div>
                <span className="mb-1 flex-1 border-b border-dotted border-line/80" />
                <span className="display flex-shrink-0 text-xl text-gold">${s.price}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
