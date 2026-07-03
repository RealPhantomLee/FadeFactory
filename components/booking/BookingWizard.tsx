"use client";

import { useSearchParams } from "next/navigation";
import { BookingProvider, Step, useBooking } from "@/components/booking/BookingProvider";
import Stepper from "@/components/booking/Stepper";
import ServiceSelectStep from "@/components/booking/ServiceSelectStep";
import DateTimeStep from "@/components/booking/DateTimeStep";
import DetailsStep from "@/components/booking/DetailsStep";
import ConfirmationStep from "@/components/booking/ConfirmationStep";

function CurrentStep() {
  const { state } = useBooking();
  switch (state.step) {
    case Step.Services:
      return <ServiceSelectStep />;
    case Step.DateTime:
      return <DateTimeStep />;
    case Step.Details:
      return <DetailsStep />;
    case Step.Confirmation:
      return <ConfirmationStep />;
  }
}

export default function BookingWizard() {
  const seedServiceId = useSearchParams().get("service") ?? undefined;

  return (
    <BookingProvider seedServiceId={seedServiceId}>
      <Stepper />
      <CurrentStep />
    </BookingProvider>
  );
}
