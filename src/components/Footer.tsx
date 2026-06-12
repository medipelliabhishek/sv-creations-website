import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import InstagramIcon from "@/components/icons/InstagramIcon";
import type { ContactContent } from "@/types/content";

export default function Footer({
  businessName,
  tagline,
  contact,
}: {
  businessName: string;
  tagline: string;
  contact: ContactContent;
}) {
  return (
    <footer className="blueprint-grid-light bg-ink text-paper">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <p className="font-display text-3xl font-semibold uppercase tracking-wide">{businessName}</p>
            <p className="mt-2 text-sm uppercase tracking-[0.25em] text-paper/60">{tagline}</p>
          </div>

          <div className="space-y-3 text-sm text-paper/80">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-terra">Contact</p>
            {contact.phone && (
              <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 hover:text-paper">
                <Phone size={15} /> {contact.phone}
              </a>
            )}
            {contact.email && (
              <a href={`mailto:${contact.email}`} className="flex items-center gap-2 hover:text-paper">
                <Mail size={15} /> {contact.email}
              </a>
            )}
            {contact.address && (
              <p className="flex items-center gap-2">
                <MapPin size={15} /> {contact.address}
              </p>
            )}
            {contact.instagram && (
              <a href={contact.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-paper">
                <InstagramIcon size={15} /> Instagram
              </a>
            )}
          </div>

          <div className="space-y-3 text-sm text-paper/80">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-terra">Explore</p>
            <Link href="/projects" className="block hover:text-paper">Projects</Link>
            <Link href="/services" className="block hover:text-paper">Services</Link>
            <Link href="/about" className="block hover:text-paper">About</Link>
            <Link href="/contact" className="block hover:text-paper">Contact</Link>
          </div>
        </div>

        <p className="mt-14 border-t border-paper/15 pt-6 text-xs text-paper/50">
          © {new Date().getFullYear()} {businessName}. Architecture, construction &amp; interiors.
        </p>
      </div>
    </footer>
  );
}
