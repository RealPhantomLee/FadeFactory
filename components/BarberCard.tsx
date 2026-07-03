import Image from "next/image";
import type { Barber } from "@/lib/team";

export default function BarberCard({ barber }: { barber: Barber }) {
  const initials = barber.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="card group overflow-hidden">
      <div className="img-zoom relative aspect-[4/5] bg-panel">
        {barber.image ? (
          <Image
            src={barber.image}
            alt={barber.name}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-panel to-charcoal">
            <span className="display text-6xl text-gold/70">{initials}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <h3 className="display text-2xl text-cream">{barber.name}</h3>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{barber.role}</p>
        </div>
      </div>
      <div className="p-5">
        <p className="text-sm text-muted">{barber.bio}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {barber.specialties.map((s) => (
            <span
              key={s}
              className="rounded-full border border-line px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-wide text-cream/70"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
