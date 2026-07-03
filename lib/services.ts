import type { Service, ServiceCategory } from "@/lib/booking/types";

// The Fade Factory service menu as structured, typed data.
// This is the single source of truth that drives the booking UI and
// availability calculation (duration + bufferTime => slot length).
export const SERVICES: Service[] = [
  { id: "haircut", name: "Haircut", duration: 40, price: 40, category: "Haircut", bufferTime: 10, popular: true },
  { id: "haircut-beard", name: "Haircut + Beard", duration: 60, price: 55, category: "Combo", bufferTime: 10, popular: true },
  { id: "haircut-mustache", name: "Haircut + Mustache/Goatee", duration: 45, price: 50, category: "Combo", bufferTime: 10 },
  { id: "haircut-hot-towel", name: "Haircut + Hot Towel Beard Trim", duration: 70, price: 65, category: "Combo", bufferTime: 10 },
  { id: "beard-work", name: "Beard Work", duration: 30, price: 35, category: "Beard", bufferTime: 10 },
  { id: "hot-towel-beard", name: "Hot Towel Beard Trim", duration: 40, price: 40, category: "Beard", bufferTime: 10 },
  { id: "line-up", name: "Line-up", duration: 30, price: 25, category: "Add-on", bufferTime: 5 },
  { id: "neck-shave", name: "Warm Lather Neck Shave", duration: 5, price: 20, category: "Add-on", bufferTime: 5 },
  { id: "shampoo", name: "Shampoo", duration: 10, price: 15, category: "Add-on", bufferTime: 5 },
];

// Display order for category sections in the UI.
export const CATEGORY_ORDER: ServiceCategory[] = ["Haircut", "Combo", "Beard", "Add-on"];

// Human-friendly section headings per category.
export const CATEGORY_LABELS: Record<ServiceCategory, string> = {
  Haircut: "Haircuts",
  Combo: "Combos",
  Beard: "Beard",
  "Add-on": "Add-ons",
};

export function getServiceById(id: string): Service | undefined {
  return SERVICES.find((s) => s.id === id);
}

// Services grouped by category, in CATEGORY_ORDER, skipping empty categories.
export function getServicesByCategory(): { category: ServiceCategory; label: string; services: Service[] }[] {
  return CATEGORY_ORDER.map((category) => ({
    category,
    label: CATEGORY_LABELS[category],
    services: SERVICES.filter((s) => s.category === category),
  })).filter((group) => group.services.length > 0);
}

// Total slot length for a set of selected services: each service's duration
// plus its cleanup buffer. Matches "60 min + 10 buffer = 70 min slot".
export function totalDuration(serviceIds: string[]): number {
  return serviceIds.reduce((sum, id) => {
    const service = getServiceById(id);
    return service ? sum + service.duration + service.bufferTime : sum;
  }, 0);
}

// Total price for a set of selected services.
export function totalPrice(serviceIds: string[]): number {
  return serviceIds.reduce((sum, id) => {
    const service = getServiceById(id);
    return service ? sum + service.price : sum;
  }, 0);
}
