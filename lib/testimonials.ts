export type Testimonial = {
  quote: string;
  name: string;
  detail: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Best fade in the city, hands down. Dee took his time and the line-up was razor sharp. I won't sit in another chair.",
    name: "Andre W.",
    detail: "Regular · 2 years",
  },
  {
    quote:
      "Booked online in thirty seconds, walked in, walked out looking brand new. The hot towel shave is unreal.",
    name: "Chris M.",
    detail: "First visit",
  },
  {
    quote:
      "Clean shop, great energy, and the attention to detail is next level. My beard has never looked better.",
    name: "Jordan P.",
    detail: "Regular · 8 months",
  },
];

export const STATS = [
  { value: "15+", label: "Years of Craft" },
  { value: "12K", label: "Cuts & Counting" },
  { value: "4", label: "Master Barbers" },
  { value: "4.9★", label: "Average Rating" },
];
