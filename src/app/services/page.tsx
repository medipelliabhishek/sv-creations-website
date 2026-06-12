import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionLabel from "@/components/SectionLabel";
import { getSiteContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
};

export const dynamic = "force-dynamic";

export default function ServicesPage() {
  const site = getSiteContent();

  return (
    <>
      <section className="blueprint-grid border-b border-line">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
          <SectionLabel index="02">What we do</SectionLabel>
          <h1 className="mt-4 font-display text-4xl font-medium sm:text-5xl">Services</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-soft">
            Design, plans, construction and interiors — take any one service, or hand us the whole project end to end.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-px border border-line bg-line md:grid-cols-2">
          {site.services.map((service, i) => (
            <article key={service.title} className="flex flex-col bg-paper p-8 md:p-10">
              <span className="font-display text-4xl font-light italic text-terra">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="mt-5 font-display text-2xl font-medium">{service.title}</h2>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-soft">{service.description}</p>
              {service.price && (
                <p className="mt-6 border-t border-line pt-4 text-xs font-semibold uppercase tracking-[0.2em] text-terra">
                  {service.price}
                </p>
              )}
            </article>
          ))}
        </div>

        {site.pricingText && (
          <div className="mt-12 grid gap-8 border border-line bg-paper-deep/60 p-8 md:grid-cols-[1fr_auto] md:items-center md:p-10">
            <p className="max-w-3xl text-sm leading-relaxed text-ink-soft">{site.pricingText}</p>
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 bg-ink px-6 py-3 text-sm uppercase tracking-[0.15em] text-paper transition-colors hover:bg-terra"
            >
              Request an estimate <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </section>

      {site.process.length > 0 && (
        <section className="border-t border-line">
          <div className="mx-auto max-w-6xl px-5 py-16">
            <SectionLabel index="03">How it works</SectionLabel>
            <h2 className="mt-4 font-display text-3xl font-medium">From plot to keys</h2>
            <ol className="mt-10 space-y-0">
              {site.process.map((step, i) => (
                <li key={step.title} className="grid gap-2 border-t border-line py-6 sm:grid-cols-[80px_1fr_2fr] sm:gap-6">
                  <span className="font-display text-sm italic text-terra">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="font-display text-xl font-medium">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-ink-soft">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}
    </>
  );
}
