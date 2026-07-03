import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="vignette relative flex min-h-screen items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/BarberDee.jpg"
          alt="Barber giving a precision cut at Fade Factory"
          fill
          priority
          sizes="100vw"
          className="kenburns object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/70 to-ink/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-transparent to-ink/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="max-w-3xl">
          <span className="eyebrow float-up" style={{ animationDelay: "0.1s" }}>
            Est. 1995 · Premium Barbershop
          </span>
          <h1
            className="display float-up mt-6 text-5xl text-cream sm:text-7xl lg:text-[5.5rem]"
            style={{ animationDelay: "0.25s" }}
          >
            Look Sharp.
            <br />
            <span className="text-gold">Feel Legendary.</span>
          </h1>
          <p
            className="float-up mt-7 max-w-xl text-lg text-cream/80"
            style={{ animationDelay: "0.4s" }}
          >
            Precision fades, sculpted beards, and elevated grooming from master barbers who treat
            every cut like a craft. Your best look starts in our chair.
          </p>
          <div className="float-up mt-10 flex flex-wrap items-center gap-4" style={{ animationDelay: "0.55s" }}>
            <Link href="/book" className="btn btn-gold">
              Make an Appointment
            </Link>
            <Link href="/services" className="btn btn-ghost">
              View Services
            </Link>
          </div>

          <div className="float-up mt-14 flex items-center gap-8" style={{ animationDelay: "0.7s" }}>
            <div>
              <p className="display text-3xl text-gold">4.9★</p>
              <p className="text-xs uppercase tracking-[0.2em] text-cream/60">1,200+ reviews</p>
            </div>
            <div className="h-10 w-px bg-line" />
            <div>
              <p className="display text-3xl text-gold">15+</p>
              <p className="text-xs uppercase tracking-[0.2em] text-cream/60">Years of craft</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-cream/30 p-1.5">
          <span className="h-2 w-1 animate-bounce rounded-full bg-gold" />
        </div>
      </div>
    </section>
  );
}
