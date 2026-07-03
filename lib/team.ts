export type Barber = {
  id: string;
  name: string;
  role: string;
  bio: string;
  image?: string; // /images/... — falls back to a monogram if absent
  specialties: string[];
  instagram?: string;
};

// TODO: replace placeholder barbers/photos with the real crew.
export const TEAM: Barber[] = [
  {
    id: "dee",
    name: "Dee",
    role: "Owner · Master Barber",
    bio: "Founder of Fade Factory with 15+ years behind the chair. Known for razor-sharp skin fades and beard sculpting.",
    image: "/images/BarberDee.jpg",
    specialties: ["Skin Fades", "Beard Sculpting", "Hot Towel Shave"],
    instagram: "https://instagram.com",
  },
  {
    id: "marcus",
    name: "Marcus T.",
    role: "Senior Barber",
    bio: "A precision specialist who lives for clean line-ups and textured crops. Ten years of steady hands.",
    specialties: ["Line-ups", "Textured Crops", "Kids' Cuts"],
    instagram: "https://instagram.com",
  },
  {
    id: "ray",
    name: "Ray V.",
    role: "Barber · Color",
    bio: "Blends classic technique with modern styling and grey-blending for a look that lasts.",
    specialties: ["Scissor Work", "Grey Blending", "Styling"],
    instagram: "https://instagram.com",
  },
  {
    id: "los",
    name: "Los",
    role: "Barber",
    bio: "The go-to for tapers, designs, and a warm-lather finish. Detail-obsessed, every single time.",
    specialties: ["Tapers", "Hair Designs", "Neck Shave"],
    instagram: "https://instagram.com",
  },
];
