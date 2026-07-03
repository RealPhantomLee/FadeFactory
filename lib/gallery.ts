export type GalleryImage = { src: string; alt: string };

// 15 shots of real work from the shop (public/images/cut-01..cut-15).
export const GALLERY: GalleryImage[] = Array.from({ length: 15 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return { src: `/images/cut-${n}.jpg`, alt: `Fade Factory haircut ${i + 1}` };
});
