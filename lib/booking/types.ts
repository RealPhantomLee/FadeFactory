// Shared types for the Fade Factory service engine + booking wizard.

export type ServiceCategory = "Haircut" | "Beard" | "Combo" | "Add-on";

export type Service = {
  id: string;
  name: string;
  duration: number; // service length in minutes
  price: number; // USD
  category: ServiceCategory;
  bufferTime: number; // cleanup minutes reserved after the service
  description?: string;
  popular?: boolean;
};

// A bookable slot. `start`/`end` are ISO 8601 strings.
export type TimeSlot = {
  start: string;
  end: string;
  available: boolean;
};

export type Customer = {
  name: string;
  phone: string;
  email: string;
  notes?: string;
};

// The evolving state of a booking as the user moves through the wizard.
export type BookingDraft = {
  serviceIds: string[];
  barberId?: string; // reserved for a future barber-selection step
  date?: string; // YYYY-MM-DD
  slot?: TimeSlot;
  customer?: Customer;
};
