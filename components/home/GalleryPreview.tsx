import Link from "next/link";
import GalleryGrid from "@/components/GalleryGrid";
import SectionHeading from "@/components/SectionHeading";
import { GALLERY } from "@/lib/gallery";

export default function GalleryPreview() {
  return (
    <section className="section bg-ink">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-end justify-between gap-6 sm:flex-row">
          <SectionHeading
            eyebrow="The Work"
            title={<>Fresh Off the Chair</>}
            subtitle="A look at the fades, tapers, and beard work coming out of the shop."
          />
          <Link href="/gallery" className="btn btn-outline flex-shrink-0">
            View Full Gallery
          </Link>
        </div>
        <div className="mt-14">
          <GalleryGrid images={GALLERY.slice(0, 8)} />
        </div>
      </div>
    </section>
  );
}
