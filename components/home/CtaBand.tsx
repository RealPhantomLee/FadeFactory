import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { SHOP } from "@/lib/nav";

export default function CtaBand() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image src="/images/cut-09.jpg" alt="" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-ink/85" />
      </div>
      <Reveal className="relative z-10 mx-auto max-w-3xl px-5 py-24 text-center sm:px-8">
        <span className="eyebrow eyebrow-center">Ready When You Are</span>
        <h2 className="display mt-6 text-4xl text-cream sm:text-6xl">
          Your Best Look Is
          <br />
          <span className="text-gold">One Booking Away.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-cream/80">
          Reserve your chair in seconds. Walk out looking — and feeling — like the sharpest version
          of yourself.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link href="/book" className="btn btn-gold">
            Book an Appointment
          </Link>
          <a href={SHOP.phoneHref} className="btn btn-ghost">
            Call {SHOP.phone}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
