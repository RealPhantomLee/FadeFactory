import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import ServiceCard from "@/components/booking/ServiceCard";
import { getServicesByCategory } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services | Fade Factory",
  description: "Explore Fade Factory grooming services — haircuts, combos, beard work, and add-ons.",
};

export default function ServicesPage() {
  const groups = getServicesByCategory();

  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="max-w-4xl mx-auto px-5 pt-28 pb-20">
        <h1 className="text-4xl md:text-5xl font-bold text-[#F5F5F5] mb-2">Services</h1>
        <p className="text-[#F5F5F5]/60 mb-10">Pick a service to start booking.</p>

        {groups.map((group) => (
          <div key={group.category} className="mb-10">
            <h2 className="text-xl font-bold uppercase text-[#D4AF37] mb-4">{group.label}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {group.services.map((service) => (
                <ServiceCard key={service.id} service={service} href={`/book?service=${service.id}`} />
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
