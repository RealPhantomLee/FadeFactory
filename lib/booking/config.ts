// Booking rules for Fade Factory. Kept consistent with the opening hours in
// lib/schema.ts ("Mo-Su 09:00-19:00"). A real backend can later source these
// from the shop's settings without changing the UI.
export const BOOKING_CONFIG = {
  openingHour: 9, // 09:00 local, 7 days/week
  closingHour: 19, // 19:00 local — a service + buffer must finish by this time
  slotIntervalMin: 15, // granularity that appointment start times land on
  minNoticeMin: 60, // no bookings within the next hour
  maxAdvanceDays: 30, // how far out a customer can book
} as const;
