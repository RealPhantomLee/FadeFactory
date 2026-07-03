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
      <h2 className="display text-3xl text-cream">Select services</h2>
      <p className="mt-2 text-muted">Choose one or more — combos and add-ons stack.</p>

      {groups.map((group) => (
        <div key={group.category} className="mt-10">
          <div className="mb-4 flex items-center gap-3">
            <span className="rule-gold" />
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gold">{group.label}</h3>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
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

      <div className="sticky bottom-0 z-10 -mx-5 mt-10 flex items-center justify-between border-t border-line bg-ink/95 px-5 py-4 backdrop-blur-md sm:-mx-8 sm:px-8">
        <div className="text-sm">
          <span className="text-muted">{serviceIds.length} selected · </span>
          <span className="text-cream">~{minutes} min</span>
          <span className="display ml-1 text-gold"> ${price}</span>
        </div>
        <button
          type="button"
          disabled={serviceIds.length === 0}
          onClick={() => dispatch({ type: "NEXT" })}
          className="btn btn-gold disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:translate-y-0 disabled:hover:shadow-none"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
