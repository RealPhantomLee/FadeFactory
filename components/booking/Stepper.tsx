"use client";

import { STEP_LABELS, useBooking } from "@/components/booking/BookingProvider";

export default function Stepper() {
  const { state } = useBooking();

  return (
    <ol className="mb-12 flex items-center justify-center gap-2 sm:gap-3">
      {STEP_LABELS.map((label, i) => {
        const done = i < state.step;
        const current = i === state.step;
        return (
          <li key={label} className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-2">
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm font-bold transition-all ${
                  current
                    ? "border-gold bg-gold text-ink"
                    : done
                      ? "border-gold/50 bg-gold/15 text-gold"
                      : "border-line bg-panel text-muted"
                }`}
              >
                {done ? "✓" : i + 1}
              </span>
              <span
                className={`hidden text-xs font-semibold uppercase tracking-[0.15em] sm:inline ${
                  current ? "text-gold" : done ? "text-cream/70" : "text-muted"
                }`}
              >
                {label}
              </span>
            </div>
            {i < STEP_LABELS.length - 1 && (
              <span className={`h-px w-5 sm:w-8 ${done ? "bg-gold/50" : "bg-line"}`} />
            )}
          </li>
        );
      })}
    </ol>
  );
}
