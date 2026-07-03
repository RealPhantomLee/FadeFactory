import { Suspense } from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingWizard from "@/components/booking/BookingWizard";

export const metadata: Metadata = {
  title: "Book an Appointment",
  description: "Book your Fade Factory appointment — select services, then pick a date and time.",
};

export default function BookPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-ink">
        <section className="mx-auto max-w-3xl px-5 pb-24 pt-32 sm:px-8">
          <div className="mb-10 text-center">
            <span className="eyebrow eyebrow-center">Reserve Your Chair</span>
            <h1 className="display mt-4 text-4xl text-cream sm:text-5xl">Book an Appointment</h1>
          </div>
          <Suspense fallback={<p className="text-center text-muted">Loading…</p>}>
            <BookingWizard />
          </Suspense>
        </section>
      </main>
      <Footer />
    </>
  );
}
