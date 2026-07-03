import { BOOKING_CONFIG } from "@/lib/booking/config";
import type { TimeSlot } from "@/lib/booking/types";

// ---------------------------------------------------------------------------
// Availability provider seam.
//
// The UI never talks to a scheduling system directly — it hits /api/availability,
// which delegates to an AvailabilityProvider. Today that is MockAvailabilityProvider
// (deterministic, no persistence). To go live, implement this interface against a
// real data source (DB, Google Calendar, Booksy, ...) and swap `availabilityProvider`
// below. No UI changes required.
// ---------------------------------------------------------------------------

export interface AvailabilityProvider {
  getSlots(input: { date: string; durationMin: number; barberId?: string }): Promise<TimeSlot[]>;
}

// Pure helper: every valid appointment start for `date` where a service of
// `durationMin` (service + buffer) fits before closing, honoring min notice.
// All slots are returned as available; a provider decides what is actually free.
export function generateSlots(date: string, durationMin: number, now: Date = new Date()): TimeSlot[] {
  const { openingHour, closingHour, slotIntervalMin, minNoticeMin } = BOOKING_CONFIG;
  const slots: TimeSlot[] = [];

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || durationMin <= 0) return slots;

  const [year, month, day] = date.split("-").map(Number);
  const earliest = new Date(now.getTime() + minNoticeMin * 60_000);

  const openMinutes = openingHour * 60;
  const closeMinutes = closingHour * 60;

  for (let start = openMinutes; start + durationMin <= closeMinutes; start += slotIntervalMin) {
    const startDate = new Date(year, month - 1, day, 0, start, 0, 0);
    if (startDate < earliest) continue; // too soon / in the past
    const endDate = new Date(startDate.getTime() + durationMin * 60_000);
    slots.push({ start: startDate.toISOString(), end: endDate.toISOString(), available: true });
  }

  return slots;
}

// Deterministic pseudo-random flag so the grid looks realistically half-booked
// without a backend. Same date always yields the same pattern.
function isBooked(date: string, index: number): boolean {
  let hash = 0;
  for (const ch of date) hash = (hash * 31 + ch.charCodeAt(0)) & 0xffff;
  // ~35% of slots appear taken.
  return ((hash + index * 7) % 20) < 7;
}

export class MockAvailabilityProvider implements AvailabilityProvider {
  async getSlots({ date, durationMin }: { date: string; durationMin: number; barberId?: string }): Promise<TimeSlot[]> {
    return generateSlots(date, durationMin).map((slot, i) => ({
      ...slot,
      available: !isBooked(date, i),
    }));
  }
}

// The active provider. Replace this line to go live.
export const availabilityProvider: AvailabilityProvider = new MockAvailabilityProvider();
