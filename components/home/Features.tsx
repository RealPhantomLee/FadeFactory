import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

const FEATURES = [
  {
    title: "Precision Fades",
    text: "Skin, low, mid, high — blended flawlessly and tailored to your head shape and style.",
    icon: (
      <path d="M4 20L20 4M9 4h11v11" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    title: "Beard Craftsmanship",
    text: "Shaped, lined, and conditioned. Sculpting that frames your face the right way.",
    icon: <path d="M6 4v6a6 6 0 0012 0V4M4 4h4M16 4h4" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    title: "Hot Towel Shaves",
    text: "The classic ritual — warm lather, straight razor, and a finish that feels brand new.",
    icon: (
      <>
        <circle cx="7" cy="7" r="3" />
        <circle cx="7" cy="17" r="3" />
        <path d="M10 8.5L21 15M10 15.5L21 9" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: "Book in Seconds",
    text: "Pick your service, choose a time, and you're set. No calls, no waiting on hold.",
    icon: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M3 9h18M8 3v4M16 3v4" strokeLinecap="round" />
      </>
    ),
  },
];

export default function Features() {
  return (
    <section className="section bg-charcoal">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          align="center"
          eyebrow="Why Fade Factory"
          title={<>Built On Detail</>}
          subtitle="A cut is more than a haircut. It's confidence — and we sweat every millimeter of it."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 100}>
              <div className="card h-full p-8">
                <span className="flex h-14 w-14 items-center justify-center border border-gold/40 text-gold">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7">
                    {f.icon}
                  </svg>
                </span>
                <h3 className="display mt-6 text-2xl text-cream">{f.title}</h3>
                <p className="mt-3 text-sm text-muted">{f.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
