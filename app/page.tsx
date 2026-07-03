import Link from 'next/link';
import { Metadata } from 'next';
import { generateLocalBusinessSchema } from '@/lib/schema';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Fade Factory | Elevated Grooming',
  description: 'Welcome to Fade Factory. Experience elevated grooming and premium barbershop services.',
};

export default function Home() {
  const schema = generateLocalBusinessSchema();

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Navbar />
      <header className="h-screen flex flex-col items-center justify-center text-center relative bg-[url('/images/StoreImage.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex flex-col items-center gap-5">
          <h1 className="text-7xl text-[#F5F5F5] font-bold">ELEVATED GROOMING</h1>
          <Link href="/book" className="inline-block px-8 py-3 font-bold uppercase border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A0A0A] transition">BOOK NOW</Link>
        </div>
      </header>
    </main>
  );
}
