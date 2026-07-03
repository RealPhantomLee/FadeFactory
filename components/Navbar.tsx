import Link from "next/link";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/team", label: "Team" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full flex justify-between p-5 bg-[rgba(10,10,10,0.9)] backdrop-blur-sm z-50 items-center">
      <Link href="/" className="text-3xl text-[#D4AF37] uppercase font-bold">
        FADE FACTORY
      </Link>
      <ul className="flex list-none gap-5">
        {LINKS.map(({ href, label }) => (
          <li key={href}>
            <Link href={href} className="text-[#F5F5F5] font-bold uppercase hover:text-[#D4AF37]">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
