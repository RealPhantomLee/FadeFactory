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
    <div className="max-w-md">
      <div className="text-4xl mb-2">✅</div>
      <h2 className="text-2xl font-bold text-[#F5F5F5] mb-1">You&apos;re booked!</h2>
      <p className="text-[#F5F5F5]/60 mb-6">
        Confirmation <span className="text-[#D4AF37] font-bold">{confirmationId}</span>
      </p>

      <div className="rounded-lg border border-white/10 bg-[#141414] p-4 space-y-3">
        <div>
          <p className="text-xs font-bold uppercase text-[#F5F5F5]/50 mb-1">Services</p>
          <ul className="text-[#F5F5F5] text-sm">
            {draft.serviceIds.map((id) => {
              const s = getServiceById(id);
              return s ? (
                <li key={id} className="flex justify-between">
                  <span>{s.name}</span>
                  <span className="text-[#D4AF37]">${s.price}</span>
                </li>
              ) : null;
            })}
          </ul>
        </div>
        <div className="border-t border-white/10 pt-3">
          <p className="text-xs font-bold uppercase text-[#F5F5F5]/50 mb-1">When</p>
          <p className="text-[#F5F5F5] text-sm">{formatSlot(draft.slot?.start)}</p>
        </div>
        <div className="border-t border-white/10 pt-3 flex justify-between text-sm">
          <span className="text-[#F5F5F5]/70">~{minutes} min total</span>
          <span className="text-[#D4AF37] font-bold">${price}</span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => dispatch({ type: "RESET" })}
        className="mt-6 text-sm font-bold uppercase text-[#F5F5F5]/60 hover:text-[#D4AF37]"
      >
        Book another
      </button>
    </div>
  );
}
