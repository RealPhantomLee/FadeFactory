import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Fade Factory | Elevated Grooming & Premium Barbershop",
    template: "%s | Fade Factory",
  },
  description:
    "Fade Factory is a premium barbershop delivering precision fades, sharp beard work, and elevated grooming. Book your chair today.",
  keywords: ["barbershop", "fades", "haircut", "beard trim", "Fade Factory", "grooming"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-cream">{children}</body>
    </html>
  );
}
