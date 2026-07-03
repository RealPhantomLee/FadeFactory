import Link from "next/link";
import type { Service } from "@/lib/booking/types";

type Props = {
  service: Service;
  // Link mode (browse page): where "Book" navigates to.
  href?: string;
  // Select mode (wizard): controlled selection. If provided, the card becomes
  // a toggle button instead of a link.
  selected?: boolean;
  onToggle?: (id: string) => void;
};

export default function ServiceCard({ service, href, selected, onToggle }: Props) {
  const selectable = typeof onToggle === "function";

  const body = (
    <>
      {service.popular && (
        <span className="absolute right-4 top-4 bg-gold px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider text-ink">
          ★ Popular
        </span>
      )}
      <div className="flex items-start justify-between gap-3 pr-16">
        <h3 className="display text-xl text-cream">{service.name}</h3>
      </div>
      <div className="mt-2 flex items-baseline gap-3">
        <span className="display text-2xl text-gold">${service.price}</span>
        <span className="text-xs uppercase tracking-wider text-muted">{service.duration} min</span>
      </div>
      {service.description && <p className="mt-3 text-sm text-muted">{service.description}</p>}
    </>
  );

  const base = "card relative block w-full p-6 text-left";

  if (selectable) {
    return (
      <button
        type="button"
        aria-pressed={selected}
        onClick={() => onToggle!(service.id)}
        className={`${base} ${selected ? "!border-gold ring-1 ring-gold" : ""}`}
      >
        {body}
        <span
          className={`mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${
            selected ? "text-gold" : "text-muted"
          }`}
        >
          {selected ? "Selected ✓" : "+ Add to booking"}
        </span>
      </button>
    );
  }

  return (
    <div className={base}>
      {body}
      {href && (
        <Link href={href} className="btn btn-outline mt-5 !px-5 !py-2 text-xs">
          Book This
        </Link>
      )}
    </div>
  );
}
