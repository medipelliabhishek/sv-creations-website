"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar({ businessName, logo }: { businessName: string; logo: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          {logo ? (
            <Image src={logo} alt={businessName} width={40} height={40} className="h-10 w-10 object-contain" />
          ) : (
            <span className="flex h-10 w-10 items-center justify-center border-2 border-ink font-display text-lg font-bold">
              SV
            </span>
          )}
          <span className="flex flex-col leading-tight">
            <span className="font-display text-lg font-semibold tracking-wide uppercase">{businessName}</span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-ink-soft">Architects &amp; Builders</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm uppercase tracking-[0.15em] transition-colors ${
                  active ? "text-accent" : "text-ink-soft hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="border border-ink px-4 py-2 text-sm uppercase tracking-[0.15em] transition-colors hover:bg-ink hover:text-paper"
          >
            Get a quote
          </Link>
        </nav>

        <button
          type="button"
          className="md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-line bg-paper md:hidden">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`block border-b border-line px-5 py-4 text-sm uppercase tracking-[0.15em] ${
                pathname === link.href ? "text-accent" : "text-ink-soft"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
