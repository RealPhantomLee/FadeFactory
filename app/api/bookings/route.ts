import { NextResponse } from "next/server";
import { getServiceById } from "@/lib/services";
import type { BookingDraft } from "@/lib/booking/types";

// In-memory hold so the flow works end-to-end without a database.
// TODO(real backend): persist bookings, re-check slot availability atomically,
// and send a confirmation email to contact@... on success.
const bookings = new Map<string, BookingDraft>();

function makeConfirmationId(): string {
  return "FF-" + Math.random().toString(36).slice(2, 8).toUpperCase();
}

// POST /api/bookings  — body: BookingDraft
export async function POST(request: Request) {
  let draft: BookingDraft;
  try {
    draft = (await request.json()) as BookingDraft;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const serviceIds = draft.serviceIds ?? [];
  if (serviceIds.length === 0 || serviceIds.some((id) => !getServiceById(id))) {
    return NextResponse.json({ error: "One or more selected services are invalid" }, { status: 400 });
  }
  if (!draft.slot?.start || !draft.slot?.end) {
    return NextResponse.json({ error: "A time slot is required" }, { status: 400 });
  }
  const { name, phone, email } = draft.customer ?? {};
  if (!name?.trim() || !phone?.trim() || !email?.trim()) {
    return NextResponse.json({ error: "Name, phone, and email are required" }, { status: 400 });
  }

  const confirmationId = makeConfirmationId();
  bookings.set(confirmationId, draft);
  console.log(`[bookings] created ${confirmationId}`, draft.slot.start, serviceIds.join(","));

  return NextResponse.json({ confirmationId }, { status: 201 });
}
