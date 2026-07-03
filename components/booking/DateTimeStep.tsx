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
      <h2 className="display text-3xl text-cream">Select date &amp; time</h2>
      <p className="mt-2 text-muted">A {durationMin}-minute slot (service + cleanup).</p>

      <div className="mb-6 mt-8 flex gap-2 overflow-x-auto pb-2">
        {days.map((d) => (
          <button
            key={d.value}
            type="button"
            onClick={() => dispatch({ type: "SET_DATE", date: d.value })}
            className={`w-20 flex-shrink-0 border px-2 py-3 text-center transition ${
              date === d.value
                ? "border-gold bg-gold/10 text-gold"
                : "border-line text-cream/70 hover:border-gold/60"
            }`}
          >
            <span className="block text-xs font-bold uppercase tracking-wider">{d.weekday}</span>
            <span className="mt-1 block text-sm">{d.day}</span>
          </button>
        ))}
      </div>

      {!date && <p className="text-muted">Pick a day to see available times.</p>}
      {date && loading && <p className="text-muted">Loading times…</p>}
      {date && error && <p className="text-gold-light">{error}</p>}

      {date && !loading && !error && (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
          {slots.length === 0 && <p className="col-span-full text-muted">No times available for this day.</p>}
          {slots.map((slot) => (
            <button
              key={slot.start}
              type="button"
              disabled={!slot.available}
              onClick={() => {
                dispatch({ type: "SET_SLOT", slot });
                dispatch({ type: "NEXT" });
              }}
              className="border border-line py-2.5 text-sm text-cream transition hover:border-gold hover:text-gold disabled:cursor-not-allowed disabled:line-through disabled:opacity-25 disabled:hover:border-line disabled:hover:text-cream"
            >
              {formatTime(slot.start)}
            </button>
          ))}
        </div>
      )}

      <div className="mt-10">
        <button
          type="button"
          onClick={() => dispatch({ type: "BACK" })}
          className="text-sm font-bold uppercase tracking-wider text-muted transition-colors hover:text-gold"
        >
          ← Back
        </button>
      </div>
    </div>
  );
}
