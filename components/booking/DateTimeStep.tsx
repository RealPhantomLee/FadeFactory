"use client";

import { useEffect, useMemo, useState } from "react";
import { useBooking } from "@/components/booking/BookingProvider";
import { BOOKING_CONFIG } from "@/lib/booking/config";
import { totalDuration } from "@/lib/services";
import type { TimeSlot } from "@/lib/booking/types";

// Local (not UTC) YYYY-MM-DD so day boundaries match the shop's timezone.
function toLocalDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function upcomingDays(count: number): { value: string; weekday: string; day: string }[] {
  const days = [];
  const today = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push({
      value: toLocalDate(d),
      weekday: i === 0 ? "Today" : d.toLocaleDateString(undefined, { weekday: "short" }),
      day: d.toLocaleDateString(undefined, { month: "short", day: "numeric" }),
    });
  }
  return days;
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
}

export default function DateTimeStep() {
  const { state, dispatch } = useBooking();
  const durationMin = useMemo(() => totalDuration(state.draft.serviceIds), [state.draft.serviceIds]);
  const days = useMemo(() => upcomingDays(Math.min(BOOKING_CONFIG.maxAdvanceDays, 14)), []);

  const date = state.draft.date;
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!date) return;
    let cancelled = false;

    async function load(d: string) {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/availability?date=${d}&duration=${durationMin}`);
        if (!res.ok) throw new Error("Failed to load availability");
        const data: { slots: TimeSlot[] } = await res.json();
        if (!cancelled) setSlots(data.slots);
      } catch (e) {
        if (!cancelled) setError((e as Error).message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load(date);
    return () => {
      cancelled = true;
    };
  }, [date, durationMin]);

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#F5F5F5] mb-1">Select date &amp; time</h2>
      <p className="text-[#F5F5F5]/60 mb-6">A {durationMin}-minute slot (service + cleanup).</p>

      <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
        {days.map((d) => (
          <button
            key={d.value}
            type="button"
            onClick={() => dispatch({ type: "SET_DATE", date: d.value })}
            className={`flex-shrink-0 w-20 rounded-lg border px-2 py-3 text-center transition ${
              date === d.value
                ? "border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]"
                : "border-white/10 text-[#F5F5F5]/70 hover:border-[#D4AF37]/60"
            }`}
          >
            <span className="block text-xs font-bold uppercase">{d.weekday}</span>
            <span className="block text-sm mt-1">{d.day}</span>
          </button>
        ))}
      </div>

      {!date && <p className="text-[#F5F5F5]/50">Pick a day to see available times.</p>}
      {date && loading && <p className="text-[#F5F5F5]/50">Loading times…</p>}
      {date && error && <p className="text-[#FF4500]">{error}</p>}

      {date && !loading && !error && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {slots.length === 0 && <p className="text-[#F5F5F5]/50 col-span-full">No times available for this day.</p>}
          {slots.map((slot) => (
            <button
              key={slot.start}
              type="button"
              disabled={!slot.available}
              onClick={() => {
                dispatch({ type: "SET_SLOT", slot });
                dispatch({ type: "NEXT" });
              }}
              className="rounded border border-white/10 py-2 text-sm text-[#F5F5F5] hover:border-[#D4AF37] hover:text-[#D4AF37] transition disabled:opacity-25 disabled:line-through disabled:cursor-not-allowed disabled:hover:border-white/10 disabled:hover:text-[#F5F5F5]"
            >
              {formatTime(slot.start)}
            </button>
          ))}
        </div>
      )}

      <div className="mt-8">
        <button
          type="button"
          onClick={() => dispatch({ type: "BACK" })}
          className="text-sm font-bold uppercase text-[#F5F5F5]/60 hover:text-[#D4AF37]"
        >
          ← Back
        </button>
      </div>
    </div>
  );
}
