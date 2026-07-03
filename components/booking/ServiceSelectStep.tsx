"use client";

import ServiceCard from "@/components/booking/ServiceCard";
import { useBooking } from "@/components/booking/BookingProvider";
import { getServicesByCategory, totalDuration, totalPrice } from "@/lib/services";

export default function ServiceSelectStep() {
  const { state, dispatch } = useBooking();
  const groups = getServicesByCategory();
  const { serviceIds } = state.draft;

  const price = totalPrice(serviceIds);
  const minutes = totalDuration(serviceIds);

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#F5F5F5] mb-1">Select services</h2>
      <p className="text-[#F5F5F5]/60 mb-6">Choose one or more. Combos and add-ons stack.</p>

      {groups.map((group) => (
        <div key={group.category} className="mb-8">
          <h3 className="text-sm font-bold uppercase text-[#D4AF37] mb-3">{group.label}</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {group.services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                selected={serviceIds.includes(service.id)}
                onToggle={(id) => dispatch({ type: "TOGGLE_SERVICE", id })}
              />
            ))}
          </div>
        </div>
      ))}

      <div className="sticky bottom-0 -mx-5 px-5 py-4 bg-[#0A0A0A]/95 backdrop-blur-sm border-t border-white/10 flex items-center justify-between">
        <div className="text-sm">
          <span className="text-[#F5F5F5]/60">{serviceIds.length} selected · </span>
          <span className="text-[#F5F5F5]">~{minutes} min</span>
          <span className="text-[#D4AF37] font-bold"> · ${price}</span>
        </div>
        <button
          type="button"
          disabled={serviceIds.length === 0}
          onClick={() => dispatch({ type: "NEXT" })}
          className="px-6 py-2 font-bold uppercase text-sm border-2 border-[#D4AF37] text-[#D4AF37] rounded hover:bg-[#D4AF37] hover:text-[#0A0A0A] transition disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[#D4AF37]"
        >
          Next
        </button>
      </div>
    </div>
  );
}
