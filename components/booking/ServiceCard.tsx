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
        <span className="absolute -top-3 left-4 bg-[#D4AF37] text-[#0A0A0A] text-xs font-bold uppercase px-2 py-0.5 rounded">
          Most Popular
        </span>
      )}
      <div className="flex justify-between items-baseline gap-3">
        <h3 className="text-lg font-bold text-[#F5F5F5]">{service.name}</h3>
        <span className="text-[#D4AF37] font-bold text-lg whitespace-nowrap">${service.price}</span>
      </div>
      <p className="text-sm text-[#F5F5F5]/60 mt-1">{service.duration} min</p>
      {service.description && <p className="text-sm text-[#F5F5F5]/70 mt-2">{service.description}</p>}
    </>
  );

  const base =
    "relative block text-left w-full rounded-lg border p-4 pt-5 bg-[#141414] transition";

  if (selectable) {
    return (
      <button
        type="button"
        aria-pressed={selected}
        onClick={() => onToggle!(service.id)}
        className={`${base} ${
          selected ? "border-[#D4AF37] ring-1 ring-[#D4AF37]" : "border-white/10 hover:border-[#D4AF37]/60"
        }`}
      >
        {body}
        <span className={`mt-3 inline-block text-xs font-bold uppercase ${selected ? "text-[#D4AF37]" : "text-[#F5F5F5]/50"}`}>
          {selected ? "Selected ✓" : "Tap to add"}
        </span>
      </button>
    );
  }

  return (
    <div className={`${base} border-white/10`}>
      {body}
      {href && (
        <Link
          href={href}
          className="mt-3 inline-block px-4 py-1.5 text-sm font-bold uppercase border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A0A0A] transition rounded"
        >
          Book
        </Link>
      )}
    </div>
  );
}
