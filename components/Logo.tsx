import Link from "next/link";

// Badge-style wordmark: a gold gear+scissors glyph beside a stacked "FADE FACTORY".
export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label="Fade Factory home">
      <span className="relative flex h-10 w-10 items-center justify-center">
        {/* gear ring */}
        <svg viewBox="0 0 48 48" className="h-10 w-10 text-gold transition-transform duration-700 group-hover:rotate-90">
          <path
            fill="currentColor"
            d="M24 3l3.2 3.9 4.9-1.4 1.4 5 5 1.4-1.4 4.9L45 24l-3.9 3.2 1.4 4.9-5 1.4-1.4 5-4.9-1.4L24 45l-3.2-3.9-4.9 1.4-1.4-5-5-1.4 1.4-4.9L3 24l3.9-3.2-1.4-4.9 5-1.4 1.4-5 4.9 1.4L24 3z"
            opacity="0.9"
          />
          <circle cx="24" cy="24" r="12" fill="#0b0b0c" />
        </svg>
        {/* scissors glyph */}
        <svg viewBox="0 0 24 24" className="absolute h-5 w-5 text-gold-light" fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="6" cy="6" r="2.2" />
          <circle cx="6" cy="18" r="2.2" />
          <path d="M8 7.5L20 17M8 16.5L20 7" strokeLinecap="round" />
        </svg>
      </span>
      {!compact && (
        <span className="leading-none">
          <span className="block font-display text-lg font-extrabold uppercase tracking-[0.18em] text-cream">
            Fade
          </span>
          <span className="block font-display text-lg font-extrabold uppercase tracking-[0.18em] text-gold">
            Factory
          </span>
        </span>
      )}
    </Link>
  );
}
