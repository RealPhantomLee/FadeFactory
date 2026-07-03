import Image from "next/image";
import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  image?: string;
};

// Compact banner for interior pages. Sits beneath the fixed navbar.
export default function PageHero({ eyebrow, title, subtitle, image = "/images/cut-03.jpg" }: Props) {
  return (
    <section className="vignette relative flex min-h-[46vh] items-center overflow-hidden pt-24">
      <div className="absolute inset-0">
        <Image src={image} alt="" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/75 to-ink/95" />
      </div>
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-16 text-center sm:px-8">
        {eyebrow && <span className="eyebrow eyebrow-center float-up">{eyebrow}</span>}
        <h1 className="display float-up mt-5 text-4xl text-cream sm:text-6xl" style={{ animationDelay: "0.1s" }}>
          {title}
        </h1>
        {subtitle && (
          <p className="float-up mx-auto mt-5 max-w-2xl text-muted" style={{ animationDelay: "0.2s" }}>
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
