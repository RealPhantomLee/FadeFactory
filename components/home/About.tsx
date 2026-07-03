import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";

const POINTS = [
  "Master barbers with 10+ years behind the chair",
  "Premium products & spotless, sanitized stations",
  "Walk-ins welcome — online booking encouraged",
];

export default function About() {
  return (
    <section className="section bg-ink">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
        {/* Image mosaic */}
        <Reveal className="order-2 lg:order-1">
          <div className="relative grid grid-cols-2 gap-4">
            <div className="img-zoom relative col-span-2 aspect-[16/10] overflow-hidden">
              <Image src="/images/StoreImage.jpg" alt="Inside Fade Factory" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
            </div>
            <div className="img-zoom relative aspect-square overflow-hidden">
              <Image src="/images/cut-01.jpg" alt="Fresh fade" fill sizes="25vw" className="object-cover" />
            </div>
            <div className="img-zoom relative aspect-square overflow-hidden">
              <Image src="/images/cut-05.jpg" alt="Beard work" fill sizes="25vw" className="object-cover" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -left-6 hidden bg-gold px-7 py-6 text-ink shadow-2xl sm:block">
              <p className="display text-4xl font-extrabold leading-none">15+</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em]">Years of Craft</p>
            </div>
          </div>
        </Reveal>

        {/* Copy */}
        <Reveal className="order-1 lg:order-2" delay={120}>
          <span className="eyebrow">The Fade Factory Story</span>
          <h2 className="display mt-5 text-4xl text-cream sm:text-5xl">
            Where Every Cut
            <br /> Is a <span className="text-gold">Craft</span>.
          </h2>
          <p className="mt-6 text-muted">
            Fade Factory is built for those who take their look seriously. Since 1995 we&apos;ve
            blended old-school barbering tradition with modern precision — delivering fades, beard
            work, and shaves that turn heads and hold up all week.
          </p>
          <p className="mt-4 text-muted">
            No rushed cuts, no shortcuts. Just skilled hands, sharp tools, and a chair that feels
            like home.
          </p>

          <ul className="mt-8 space-y-4">
            {POINTS.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                  ✓
                </span>
                <span className="text-cream/85">{point}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <Link href="/team" className="btn btn-outline">
              Meet the Barbers
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
