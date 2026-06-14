import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-16 pt-16 md:grid-cols-2 md:pt-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">{site.tagline}</p>
            <h1 className="mt-5 font-display text-4xl font-medium leading-[1.1] sm:text-5xl lg:text-6xl">
              {site.hero.title}
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-ink-soft">{site.hero.subtitle}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="flex items-center gap-2 bg-ink px-6 py-3 text-sm uppercase tracking-[0.15em] text-paper transition-colors hover:bg-accent"
              >
                Get a quote <ArrowRight size={16} />
              </Link>
              <Link
                href="/projects"
                className="border border-ink px-6 py-3 text-sm uppercase tracking-[0.15em] transition-colors hover:bg-ink hover:text-paper"
              >
                View our work
              </Link>
            </div>
          </div>

          {site.hero.image && (
            <div className="relative h-[420px] w-full overflow-hidden rounded-2xl shadow-xl shadow-ink/10 md:h-[560px]">
              <Image
                src={site.hero.image}
                alt={site.businessName}
                fill
                priority
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          )}
        </div>
      </section>

      {/* Intro */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <p className="font-display text-2xl leading-relaxed text-ink sm:max-w-3xl sm:text-[1.7rem]">{site.homepageText}</p>
      </section>

      {/* Services */}
      <section className="border-y border-line bg-paper-deep/60">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-3xl font-medium sm:text-4xl">Services</h2>
            <Link href="/services" className="flex items-center gap-2 text-sm uppercase tracking-[0.15em] text-accent hover:text-accent-deep">
              All services <ArrowRight size={16} />
            </Link>
          </div>

          <div>
            {site.services.map((service) => (
              <Link
                key={service.title}
                href="/services"
                className="group grid gap-2 border-t border-line py-6 transition-colors hover:bg-paper sm:grid-cols-[1fr_2fr_auto] sm:items-baseline sm:gap-6 sm:px-4"
              >
                <h3 className="font-display text-xl font-medium">{service.title}</h3>
                <p className="text-sm leading-relaxed text-ink-soft">{service.description}</p>
                <ArrowRight size={18} className="hidden text-accent opacity-0 transition-opacity group-hover:opacity-100 sm:block" />
              </Link>
            ))}
            <div className="border-t border-line" />
          </div>
        </div>
      </section>

      {/* Process */}
      {site.process.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="font-display text-3xl font-medium sm:text-4xl">From plot to keys</h2>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {site.process.map((step, i) => (
              <div key={step.title} className="reveal" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-accent" aria-hidden />
                  {i < site.process.length - 1 && <span className="h-px flex-1 bg-line" aria-hidden />}
                </div>
                <h3 className="mt-4 font-display text-lg font-medium">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{step.description}</p>
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
              <h2 className="font-display text-3xl font-medium sm:text-4xl">Projects</h2>
              <Link href="/projects" className="flex items-center gap-2 text-sm uppercase tracking-[0.15em] text-accent hover:text-accent-deep">
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
          <h2 className="font-display text-3xl font-medium sm:text-4xl">What homeowners say</h2>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {site.testimonials.map((t) => (
              <figure key={t.name} className="border-l-2 border-accent pl-6">
                <blockquote className="text-base leading-relaxed text-ink">&ldquo;{t.text}&rdquo;</blockquote>
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
            Share your plot details and ideas, and we&rsquo;ll visit your site and prepare a plan and estimate for you.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4">
            <Link
              href="/contact"
              className="bg-accent px-7 py-3 text-sm uppercase tracking-[0.15em] text-paper transition-colors hover:bg-accent-deep"
            >
              Get a quote
            </Link>
            {contact.phone && (
              <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="text-sm text-paper/70 hover:text-paper">
                or call {contact.phone}
              </a>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
