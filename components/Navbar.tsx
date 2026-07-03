"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "@/components/Logo";
import { NAV_LINKS } from "@/lib/nav";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "bg-ink/90 backdrop-blur-md border-b border-line py-3 shadow-[0_10px_30px_-20px_rgba(0,0,0,0.9)]"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
        <Logo />

        <ul className="hidden items-center gap-9 lg:flex">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`link-underline text-[0.82rem] font-semibold uppercase tracking-[0.16em] transition-colors ${
                  isActive(href) ? "text-gold active" : "text-cream/80 hover:text-gold"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <Link href="/book" className="btn btn-gold">
            Book Now
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="flex flex-col gap-1.5 lg:hidden"
        >
          <span className={`h-0.5 w-7 bg-cream transition-all ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-0.5 w-7 bg-cream transition-all ${open ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-7 bg-cream transition-all ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`overflow-hidden border-t border-line bg-ink/95 backdrop-blur-md transition-all duration-500 lg:hidden ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col gap-1 px-6 py-4">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={() => setOpen(false)}
                className={`block py-2 text-sm font-semibold uppercase tracking-[0.16em] ${
                  isActive(href) ? "text-gold" : "text-cream/80"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
          <li className="pt-3">
            <Link href="/book" onClick={() => setOpen(false)} className="btn btn-gold w-full">
              Book Now
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
