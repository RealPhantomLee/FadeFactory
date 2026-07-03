import { NextResponse } from "next/server";
import { availabilityProvider } from "@/lib/booking/availability";

// GET /api/availability?date=YYYY-MM-DD&duration=70&barberId=optional
// Returns the bookable time slots for a given date and total service duration.
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");
  const durationMin = Number(searchParams.get("duration"));
  const barberId = searchParams.get("barberId") ?? undefined;

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: "Missing or invalid `date` (YYYY-MM-DD)" }, { status: 400 });
  }
  if (!Number.isFinite(durationMin) || durationMin <= 0) {
    return NextResponse.json({ error: "Missing or invalid `duration` (minutes)" }, { status: 400 });
  }

  const slots = await availabilityProvider.getSlots({ date, durationMin, barberId });
  return NextResponse.json({ slots });
}
