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
    "w-full border border-line bg-panel px-4 py-3 text-cream placeholder:text-muted/60 focus:border-gold focus:outline-none transition-colors";

  return (
    <div>
      <h2 className="display text-3xl text-cream">Your details</h2>
      <p className="mt-2 text-muted">
        {state.draft.serviceIds.length} service(s) · ~{minutes} min ·{" "}
        <span className="text-gold">${price}</span>
      </p>

      <form onSubmit={handleSubmit} className="mt-8 max-w-md space-y-5">
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.2em] text-cream/70">Name</label>
          <input required value={form.name} onChange={(e) => update("name", e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.2em] text-cream/70">Phone</label>
          <input required type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.2em] text-cream/70">Email</label>
          <input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.2em] text-cream/70">Notes (optional)</label>
          <textarea value={form.notes} onChange={(e) => update("notes", e.target.value)} rows={3} className={inputClass} />
        </div>

        {error && <p className="text-gold-light">{error}</p>}

        <div className="flex items-center gap-6 pt-2">
          <button
            type="button"
            onClick={() => dispatch({ type: "BACK" })}
            className="text-sm font-bold uppercase tracking-wider text-muted transition-colors hover:text-gold"
          >
            ← Back
          </button>
          <button type="submit" disabled={submitting} className="btn btn-gold disabled:opacity-50">
            {submitting ? "Booking…" : "Confirm Booking"}
          </button>
        </div>
      </form>
    </div>
  );
}
