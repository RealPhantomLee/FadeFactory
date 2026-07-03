import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { TESTIMONIALS } from "@/lib/testimonials";

export default function Testimonials() {
  return (
    <section className="section bg-ink">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          align="center"
          eyebrow="Word on the Street"
          title={<>What Clients Say</>}
        />
        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 110}>
              <figure className="card h-full p-8">
                <div className="text-gold" aria-hidden>
                  <span className="display text-6xl leading-none">&ldquo;</span>
                </div>
                <blockquote className="-mt-4 text-cream/85">{t.quote}</blockquote>
                <figcaption className="mt-6 border-t border-line pt-5">
                  <p className="font-semibold text-cream">{t.name}</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-gold">{t.detail}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
