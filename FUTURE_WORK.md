# Fade Factory — Future Work

Status of the Next.js rewrite as of 2026-07-03. The booking **service engine + wizard**
(Select Services → Date & Time → Your Details → Confirmation) is built, typechecked, linted,
and verified end-to-end against a mock backend. The items below remain.

## Backend (seams exist, implementations do not)

- [ ] **Real availability provider** — replace `MockAvailabilityProvider` in
  `lib/booking/availability.ts`. Implement the `AvailabilityProvider` interface against a real
  source (DB / Google Calendar / Booksy). Going live is a one-line swap of `availabilityProvider`;
  **no UI changes required**.
- [ ] **Persist bookings** — `app/api/bookings/route.ts` currently holds bookings in an in-memory
  `Map`. Add durable storage and an **atomic slot re-check** so two customers can't grab the same
  slot between the availability fetch and the POST.
- [ ] **Confirmation email** — on successful booking, email the customer and
  `contact@phantomcybersolutions.com` (per global email convention).

## Features

- [ ] **Barber selection step** — `barberId` is already threaded through `BookingDraft` and the
  `AvailabilityProvider` interface. Add a `BarberSelectStep` + per-barber availability once
  `/team` data exists.
- [ ] **Missing nav pages** — `/team`, `/gallery`, `/contact` are linked in `components/Navbar.tsx`
  but not implemented yet (currently 404).

## Cleanup / launch prep

- [ ] **`lib/schema.ts`** — replace placeholder LocalBusiness JSON-LD (`123 Barber St`,
  `example.com`, dummy phone) with real address, phone, and URL for SEO.
- [ ] **`app/layout.tsx`** — root metadata still says `"Create Next App"`; set real title/description.
- [ ] **Deploy** — Vercel (project name is `fade-factory-migration`).

## Architecture reference

| Concern | File |
|---|---|
| Service data & helpers | `lib/services.ts` |
| Types | `lib/booking/types.ts` |
| Booking rules (hours, buffers, notice) | `lib/booking/config.ts` |
| Availability seam | `lib/booking/availability.ts` |
| Availability API | `app/api/availability/route.ts` |
| Bookings API | `app/api/bookings/route.ts` |
| Wizard state machine | `components/booking/BookingProvider.tsx` |
| Wizard steps | `components/booking/*Step.tsx` |
| Browse page | `app/services/page.tsx` |
| Booking page | `app/book/page.tsx` |
