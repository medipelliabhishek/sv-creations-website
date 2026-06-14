import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import InstagramIcon from "@/components/icons/InstagramIcon";
import { getContactContent, getSiteContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
};

export const dynamic = "force-dynamic";

export default function ContactPage() {
  const site = getSiteContent();
  const contact = getContactContent();

  const whatsappHref = contact.whatsapp
    ? `https://wa.me/${contact.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
        `Hi ${site.businessName}, I'd like to discuss a project.`,
      )}`
    : "";

  return (
    <>
      <section className="blueprint-grid border-b border-line">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
          <h1 className="font-display text-4xl font-medium sm:text-5xl">Contact</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-soft">
            Tell us about your plot, your home or your interiors. Call, WhatsApp or email, and we&rsquo;ll get back to you
            within a day.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-px border border-line bg-line sm:grid-cols-2">
          {contact.phone && (
            <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="group bg-paper p-8 transition-colors hover:bg-paper-deep/60">
              <Phone className="text-accent" size={22} />
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.25em] text-ink-soft">Call us</p>
              <p className="mt-2 font-display text-xl">{contact.phone}</p>
            </a>
          )}

          {whatsappHref && (
            <a href={whatsappHref} target="_blank" rel="noreferrer" className="group bg-paper p-8 transition-colors hover:bg-paper-deep/60">
              <svg viewBox="0 0 32 32" width="22" height="22" fill="currentColor" className="text-accent" aria-hidden>
                <path d="M16 3C9.4 3 4 8.3 4 14.9c0 2.6.9 5 2.3 7L4 29l7.3-2.3c1.9 1 4 1.6 6.2 1.6h.5c6.6 0 12-5.3 12-11.9C30 8.3 24.6 3 16 3zm5.9 16.9c-.3.8-1.5 1.5-2.4 1.7-.6.1-1.4.2-4.2-.9-3.5-1.4-5.8-5-5.9-5.2-.2-.2-1.4-1.9-1.4-3.6s.9-2.5 1.2-2.9c.3-.3.7-.4 1-.4h.7c.2 0 .5-.1.8.6.3.8 1 2.6 1.1 2.8.1.2.2.4 0 .7-.1.3-.2.4-.4.7l-.6.7c-.2.2-.4.4-.2.8.2.4 1 1.7 2.2 2.7 1.5 1.3 2.8 1.7 3.2 1.9.4.2.6.2.8-.1.2-.2 1-1.1 1.2-1.5.3-.4.5-.3.9-.2.4.1 2.1 1 2.5 1.2.4.2.6.3.7.5.1.1.1.7-.2 1.5z" />
              </svg>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.25em] text-ink-soft">WhatsApp</p>
              <p className="mt-2 font-display text-xl">Chat with us</p>
            </a>
          )}

          {contact.email && (
            <a href={`mailto:${contact.email}`} className="group bg-paper p-8 transition-colors hover:bg-paper-deep/60">
              <Mail className="text-accent" size={22} />
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.25em] text-ink-soft">Email</p>
              <p className="mt-2 font-display text-xl break-all">{contact.email}</p>
            </a>
          )}

          {contact.address && (
            <div className="bg-paper p-8">
              <MapPin className="text-accent" size={22} />
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.25em] text-ink-soft">Studio</p>
              <p className="mt-2 font-display text-xl">{contact.address}</p>
            </div>
          )}
        </div>

        {contact.instagram && (
          <a
            href={contact.instagram}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 text-sm uppercase tracking-[0.15em] text-accent hover:text-accent-deep"
          >
            <InstagramIcon size={18} /> Follow our work on Instagram
          </a>
        )}
      </section>
    </>
  );
}
