import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

// Consistent eyebrow + serif title + optional subtitle used across sections.
export default function SectionHeading({ eyebrow, title, subtitle, align = "left", className = "" }: Props) {
  const centered = align === "center";
  return (
    <div className={`${centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}>
      {eyebrow && <span className={`eyebrow ${centered ? "eyebrow-center" : ""}`}>{eyebrow}</span>}
      <h2 className="display mt-5 text-4xl text-cream sm:text-5xl">{title}</h2>
      {subtitle && <p className="mt-5 text-muted">{subtitle}</p>}
    </div>
  );
}
