"use client";

import { useState } from "react";
import { useBooking } from "@/components/booking/BookingProvider";
import { totalDuration, totalPrice } from "@/lib/services";
import type { Customer } from "@/lib/booking/types";

export default function DetailsStep() {
  const { state, dispatch } = useBooking();
  const [form, setForm] = useState<Customer>(
    state.draft.customer ?? { name: "", phone: "", email: "", notes: "" },
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const price = totalPrice(state.draft.serviceIds);
  const minutes = totalDuration(state.draft.serviceIds);

  function update(field: keyof Customer, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const customer: Customer = form;
    dispatch({ type: "SET_CUSTOMER", customer });
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...state.draft, customer }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Could not complete booking");
      dispatch({ type: "SET_CONFIRMATION", id: data.confirmationId });
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    "w-full rounded border border-white/10 bg-[#141414] px-3 py-2 text-[#F5F5F5] focus:border-[#D4AF37] focus:outline-none";

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#F5F5F5] mb-1">Your details</h2>
      <p className="text-[#F5F5F5]/60 mb-6">
        {state.draft.serviceIds.length} service(s) · ~{minutes} min · ${price}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label className="block text-sm font-bold uppercase text-[#F5F5F5]/70 mb-1">Name</label>
          <input required value={form.name} onChange={(e) => update("name", e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-bold uppercase text-[#F5F5F5]/70 mb-1">Phone</label>
          <input required type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-bold uppercase text-[#F5F5F5]/70 mb-1">Email</label>
          <input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-bold uppercase text-[#F5F5F5]/70 mb-1">Notes (optional)</label>
          <textarea value={form.notes} onChange={(e) => update("notes", e.target.value)} rows={3} className={inputClass} />
        </div>

        {error && <p className="text-[#FF4500]">{error}</p>}

        <div className="flex items-center gap-4 pt-2">
          <button
            type="button"
            onClick={() => dispatch({ type: "BACK" })}
            className="text-sm font-bold uppercase text-[#F5F5F5]/60 hover:text-[#D4AF37]"
          >
            ← Back
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2 font-bold uppercase text-sm border-2 border-[#D4AF37] text-[#D4AF37] rounded hover:bg-[#D4AF37] hover:text-[#0A0A0A] transition disabled:opacity-40"
          >
            {submitting ? "Booking…" : "Confirm booking"}
          </button>
        </div>
      </form>
    </div>
  );
}
