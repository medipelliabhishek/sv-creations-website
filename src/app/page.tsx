import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionLabel from "@/components/SectionLabel";
import { getContactContent, getGalleryImages, getSiteContent } from "@/lib/content";

// Content is editable at runtime via /admin, so render on every request.
export const dynamic = "force-dynamic";

export default function HomePage() {
  const site = getSiteContent();
  const contact = getContactContent();
  const featured = getGalleryImages().slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="blueprint-grid border-b border-line">
        <div className="mx-auto grid max-w-6xl items-end gap-10 px-5 pb-0 pt-16 md:grid-cols-2 md:pt-24">
          <div className="pb-16">
            <SectionLabel index="SV">{site.tagline}</SectionLabel>
            <h1 className="mt-6 font-display text-4xl font-medium leading-[1.08] sm:text-5xl lg:text-6xl">
              {site.hero.title}
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-ink-soft">{site.hero.subtitle}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/projects"
                className="flex items-center gap-2 bg-ink px-6 py-3 text-sm uppercase tracking-[0.15em] text-paper transition-colors hover:bg-terra"
              >
                View our work <ArrowRight size={16} />
              </Link>
              <Link
                href="/contact"
                className="border border-ink px-6 py-3 text-sm uppercase tracking-[0.15em] transition-colors hover:bg-ink hover:text-paper"
              >
                Get a quote
              </Link>
            </div>
          </div>

          {site.hero.image && (
            <div className="relative mx-auto w-full max-w-md">
              <div className="arch overflow-hidden border border-line bg-paper-deep">
                <Image
                  src={site.hero.image}
                  alt={site.businessName}
                  width={900}
                  height={1200}
                  priority
                  className="h-[420px] w-full object-cover md:h-[520px]"
                />
              </div>
              <p className="border-x border-t border-line bg-paper px-4 py-3 text-center text-[11px] uppercase tracking-[0.3em] text-ink-soft">
                Plan · Build · Live
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Intro */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="grid gap-10 md:grid-cols-[1fr_2fr]">
          <SectionLabel index="01">One team, end to end</SectionLabel>
          <p className="font-display text-2xl leading-relaxed text-ink sm:text-[1.7rem]">{site.homepageText}</p>
        </div>
      </section>

      {/* Services */}
      <section className="border-y border-line bg-paper-deep/60">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
            <div>
              <SectionLabel index="02">What we do</SectionLabel>
              <h2 className="mt-4 font-display text-3xl font-medium sm:text-4xl">Services</h2>
            </div>
            <Link href="/services" className="flex items-center gap-2 text-sm uppercase tracking-[0.15em] text-terra hover:text-terra-deep">
              All services <ArrowRight size={16} />
            </Link>
          </div>

          <div>
            {site.services.map((service, i) => (
              <Link
                key={service.title}
                href="/services"
                className="group grid gap-2 border-t border-line py-6 transition-colors hover:bg-paper sm:grid-cols-[80px_1fr_2fr_auto] sm:items-baseline sm:gap-6 sm:px-4"
              >
                <span className="font-display text-sm italic text-terra">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-display text-xl font-medium">{service.title}</h3>
                <p className="text-sm leading-relaxed text-ink-soft">{service.description}</p>
                <ArrowRight size={18} className="hidden text-terra opacity-0 transition-opacity group-hover:opacity-100 sm:block" />
              </Link>
            ))}
            <div className="border-t border-line" />
          </div>
        </div>
      </section>

      {/* Process */}
      {site.process.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 py-20">
          <SectionLabel index="03">How it works</SectionLabel>
          <h2 className="mt-4 font-display text-3xl font-medium sm:text-4xl">From plot to keys</h2>

          <div className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {site.process.map((step, i) => (
              <div key={step.title} className="bg-paper p-8">
                <span className="font-display text-4xl font-light italic text-terra">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-5 font-display text-lg font-medium">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{step.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Featured projects */}
      {featured.length > 0 && (
        <section className="border-y border-line bg-paper-deep/60">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
              <div>
                <SectionLabel index="04">Recent work</SectionLabel>
                <h2 className="mt-4 font-display text-3xl font-medium sm:text-4xl">Projects</h2>
              </div>
              <Link href="/projects" className="flex items-center gap-2 text-sm uppercase tracking-[0.15em] text-terra hover:text-terra-deep">
                View all projects <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((image) => (
                <Link key={image.name} href="/projects" className="group overflow-hidden border border-line bg-paper">
                  <Image
                    src={image.src}
                    alt="SV Creations project"
                    width={image.width}
                    height={image.height}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {site.testimonials.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 py-20">
          <SectionLabel index="05">Client words</SectionLabel>
          <h2 className="mt-4 font-display text-3xl font-medium sm:text-4xl">What homeowners say</h2>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {site.testimonials.map((t) => (
              <figure key={t.name} className="border-l-2 border-terra pl-6">
                <blockquote className="font-display text-lg italic leading-relaxed text-ink">&ldquo;{t.text}&rdquo;</blockquote>
                <figcaption className="mt-5 text-sm">
                  <span className="font-semibold">{t.name}</span>
                  {t.role && <span className="block text-xs uppercase tracking-[0.15em] text-ink-soft">{t.role}</span>}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="blueprint-grid-light bg-ink text-paper">
        <div className="mx-auto max-w-6xl px-5 py-20 text-center">
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-medium leading-snug sm:text-4xl">
            Have a plot? Let&rsquo;s plan your home.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-paper/70">
            Share your plot details and ideas — we&rsquo;ll visit your site and prepare a plan and estimate for you.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/contact"
              className="bg-terra px-7 py-3 text-sm uppercase tracking-[0.15em] text-paper transition-colors hover:bg-terra-deep"
            >
              Start your project
            </Link>
            {contact.phone && (
              <a
                href={`tel:${contact.phone.replace(/\s/g, "")}`}
                className="border border-paper/40 px-7 py-3 text-sm uppercase tracking-[0.15em] transition-colors hover:border-paper"
              >
                {contact.phone}
              </a>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
