export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/team", label: "Team" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
] as const;

export const SHOP = {
  name: "Fade Factory",
  tagline: "Elevated Grooming",
  phone: "(555) 555-1995",
  phoneHref: "tel:+15555551995",
  email: "hello@fadefactory.com",
  address: "123 Barber Street, Suite 4",
  cityStateZip: "Los Angeles, CA 90001",
  hours: [
    { day: "Mon – Fri", time: "9:00 AM – 7:00 PM" },
    { day: "Saturday", time: "9:00 AM – 6:00 PM" },
    { day: "Sunday", time: "10:00 AM – 4:00 PM" },
  ],
  socials: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Facebook", href: "https://facebook.com" },
    { label: "TikTok", href: "https://tiktok.com" },
  ],
} as const;
