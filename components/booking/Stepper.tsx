"use client";

import { STEP_LABELS, useBooking } from "@/components/booking/BookingProvider";

export default function Stepper() {
  const { state } = useBooking();

  return (
    <ol className="flex items-center gap-2 mb-8">
      {STEP_LABELS.map((label, i) => {
        const done = i < state.step;
        const current = i === state.step;
        return (
          <li key={label} className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                  current
                    ? "bg-[#D4AF37] text-[#0A0A0A]"
                    : done
                      ? "bg-[#D4AF37]/30 text-[#D4AF37]"
                      : "bg-white/10 text-[#F5F5F5]/50"
                }`}
              >
                {done ? "✓" : i + 1}
              </span>
              <span
                className={`hidden sm:inline text-sm font-bold uppercase ${
                  current ? "text-[#D4AF37]" : "text-[#F5F5F5]/50"
                }`}
              >
                {label}
              </span>
            </div>
            {i < STEP_LABELS.length - 1 && <span className="w-6 h-px bg-white/15" />}
          </li>
        );
      })}
    </ol>
  );
}
