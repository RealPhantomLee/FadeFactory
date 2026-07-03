"use client";

import { useBooking } from "@/components/booking/BookingProvider";
import { getServiceById, totalDuration, totalPrice } from "@/lib/services";

function formatSlot(startIso?: string): string {
  if (!startIso) return "—";
  return new Date(startIso).toLocaleString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function ConfirmationStep() {
  const { state, dispatch } = useBooking();
  const { draft, confirmationId } = state;
  const price = totalPrice(draft.serviceIds);
  const minutes = totalDuration(draft.serviceIds);

  return (
    <div className="mx-auto max-w-md text-center">
      <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gold/15 text-4xl text-gold">
        ✓
      </span>
      <h2 className="display mt-6 text-3xl text-cream">You&apos;re booked!</h2>
      <p className="mt-2 text-muted">
        Confirmation <span className="font-bold text-gold">{confirmationId}</span>
      </p>

      <div className="card mt-8 space-y-4 p-6 text-left">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold">Services</p>
          <ul className="space-y-1 text-sm">
            {draft.serviceIds.map((id) => {
              const s = getServiceById(id);
              return s ? (
                <li key={id} className="flex justify-between text-cream/90">
                  <span>{s.name}</span>
                  <span className="text-gold">${s.price}</span>
                </li>
              ) : null;
            })}
          </ul>
        </div>
        <div className="border-t border-line pt-4">
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-gold">When</p>
          <p className="text-sm text-cream/90">{formatSlot(draft.slot?.start)}</p>
        </div>
        <div className="flex justify-between border-t border-line pt-4 text-sm">
          <span className="text-muted">~{minutes} min total</span>
          <span className="display text-gold">${price}</span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => dispatch({ type: "RESET" })}
        className="mt-8 text-sm font-bold uppercase tracking-wider text-muted transition-colors hover:text-gold"
      >
        Book Another
      </button>
    </div>
  );
}
