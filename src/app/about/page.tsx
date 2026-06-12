import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionLabel from "@/components/SectionLabel";
import { getSiteContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
};

export const dynamic = "force-dynamic";

export default function AboutPage() {
  const site = getSiteContent();

  return (
    <>
      <section className="blueprint-grid border-b border-line">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
          <SectionLabel index="05">The studio</SectionLabel>
          <h1 className="mt-4 font-display text-4xl font-medium sm:text-5xl">{site.about.title}</h1>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid items-start gap-12 md:grid-cols-2">
          {site.about.image && (
            <div className="arch overflow-hidden border border-line bg-paper-deep md:sticky md:top-24">
              <Image
                src={site.about.image}
                alt={site.businessName}
                width={900}
                height={1200}
                className="h-[420px] w-full object-cover md:h-[540px]"
              />
            </div>
          )}

          <div>
            {site.about.text.split("\n\n").map((paragraph, i) => (
              <p key={i} className="mb-6 text-base leading-relaxed text-ink-soft first:font-display first:text-xl first:leading-relaxed first:text-ink">
                {paragraph}
              </p>
            ))}

            <Link
              href="/contact"
              className="mt-4 inline-flex items-center gap-2 bg-ink px-6 py-3 text-sm uppercase tracking-[0.15em] text-paper transition-colors hover:bg-terra"
            >
              Talk to us <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
