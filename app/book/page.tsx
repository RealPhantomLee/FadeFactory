import { Suspense } from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import BookingWizard from "@/components/booking/BookingWizard";

export const metadata: Metadata = {
  title: "Book | Fade Factory",
  description: "Book your Fade Factory appointment — select services, then pick a date and time.",
};

export default function BookPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="max-w-3xl mx-auto px-5 pt-28 pb-24">
        <Suspense fallback={<p className="text-[#F5F5F5]/50">Loading…</p>}>
          <BookingWizard />
        </Suspense>
      </section>
    </main>
  );
}
