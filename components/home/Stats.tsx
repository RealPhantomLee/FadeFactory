import Reveal from "@/components/Reveal";
import { STATS } from "@/lib/testimonials";

export default function Stats() {
  return (
    <section className="border-y border-line bg-charcoal">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-5 py-14 sm:px-8 lg:grid-cols-4">
        {STATS.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 90} className="text-center">
            <p className="display text-4xl text-gold sm:text-5xl">{stat.value}</p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-cream/65">
              {stat.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
