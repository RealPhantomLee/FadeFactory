import Link from "next/link";
import Logo from "@/components/Logo";
import { NAV_LINKS, SHOP } from "@/lib/nav";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-charcoal">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <Logo />
            <p className="mt-5 text-sm leading-relaxed text-muted">
              Precision fades, sharp beard work, and elevated grooming — crafted chair by chair.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">Explore</h3>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-cream/75 transition-colors hover:text-gold">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">Visit</h3>
            <ul className="mt-5 space-y-3 text-sm text-cream/75">
              <li>{SHOP.address}</li>
              <li>{SHOP.cityStateZip}</li>
              <li>
                <a href={SHOP.phoneHref} className="transition-colors hover:text-gold">
                  {SHOP.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${SHOP.email}`} className="transition-colors hover:text-gold">
                  {SHOP.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">Hours</h3>
            <ul className="mt-5 space-y-3 text-sm text-cream/75">
              {SHOP.hours.map((h) => (
                <li key={h.day} className="flex justify-between gap-4">
                  <span>{h.day}</span>
                  <span className="text-cream/55">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 sm:flex-row">
          <p className="text-xs uppercase tracking-[0.2em] text-muted">
            © {new Date().getFullYear()} {SHOP.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            {SHOP.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold uppercase tracking-[0.2em] text-cream/70 transition-colors hover:text-gold"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
