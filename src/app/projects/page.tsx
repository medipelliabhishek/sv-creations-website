import type { Metadata } from "next";
import SectionLabel from "@/components/SectionLabel";
import ProjectGallery from "@/components/ProjectGallery";
import { getGalleryImages } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
};

// Gallery images can be uploaded via /admin at any time, so this page must
// re-read the directory on every request rather than being prerendered.
export const dynamic = "force-dynamic";

export default function ProjectsPage() {
  const images = getGalleryImages();

  return (
    <>
      <section className="blueprint-grid border-b border-line">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
          <SectionLabel index="04">Our work</SectionLabel>
          <h1 className="mt-4 font-display text-4xl font-medium sm:text-5xl">Projects</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-soft">
            Elevations, homes under construction and finished interiors — a look at what we&rsquo;ve designed and built.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        {images.length > 0 ? (
          <ProjectGallery images={images} />
        ) : (
          <p className="py-20 text-center text-ink-soft">Project photos are coming soon.</p>
        )}
      </section>
    </>
  );
}
