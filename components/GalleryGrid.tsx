import Image from "next/image";
import Reveal from "@/components/Reveal";
import type { GalleryImage } from "@/lib/gallery";

// Masonry-style grid. Every 6th tile spans two rows for rhythm.
export default function GalleryGrid({ images }: { images: GalleryImage[] }) {
  return (
    <div className="grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[220px] md:grid-cols-3 lg:grid-cols-4">
      {images.map((img, i) => {
        const tall = i % 6 === 0;
        return (
          <Reveal
            key={img.src}
            delay={(i % 4) * 60}
            className={`img-zoom group relative overflow-hidden ${tall ? "row-span-2" : ""}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-ink/0 opacity-0 transition-all duration-500 group-hover:bg-ink/55 group-hover:opacity-100">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold text-gold">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
                  <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                </svg>
              </span>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
