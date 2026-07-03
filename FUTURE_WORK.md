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
  `AvailabilityProvider` interface. Add a `BarberSelectStep` + per-barber availability using the
  now-existing `lib/team.ts` data.
- [x] **Nav pages** — `/team`, `/gallery`, `/contact` are built (2026-07-03 redesign).
- [ ] **Contact form** — `components/ContactForm.tsx` is front-end only (shows a success state, no
  send). Wire to an email service or a `/api/contact` route handler.

## Content to replace (placeholders from the redesign)

- [ ] **`lib/team.ts`** — Marcus/Ray/Los are placeholder barbers with monogram avatars; only Dee
  has a real photo. Replace with the real crew + headshots.
- [ ] **`lib/testimonials.ts`** — example reviews + stats; swap for real ones.
- [ ] **`lib/nav.ts`** (`SHOP`) — placeholder phone/email/address/hours/socials.
- [ ] **`lib/schema.ts`** — replace placeholder LocalBusiness JSON-LD (`123 Barber St`,
  `example.com`, dummy phone) with real details; keep it in sync with `SHOP` in `lib/nav.ts`.

## Design / redesign notes (2026-07-03)

The site was overhauled to a premium dark + gold aesthetic inspired by the Slidium barbershop
template. Design system lives in `app/globals.css` (Tailwind v4 `@theme` tokens: `ink`, `charcoal`,
`panel`, `gold`, `gold-light`, `cream`, `muted`; fonts Playfair Display + Inter). Reusable pieces:
`Navbar`, `Footer`, `PageHero`, `SectionHeading`, `Reveal` (scroll animation), `BarberCard`,
`GalleryGrid`, `Logo`. Home sections are under `components/home/`.

## Cleanup / launch prep

- [ ] **Deploy** — Vercel (project name is `fade-factory-migration`).
- [ ] **`app/favicon.ico`** — still the default Next.js icon; replace with the Fade Factory mark.

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
