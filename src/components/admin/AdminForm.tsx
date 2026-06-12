"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Plus, Trash2, Upload } from "lucide-react";
import type { ContactContent, GalleryImage, SiteContent } from "@/types/content";

const inputClass =
  "w-full border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-terra";
const labelClass = "mb-1 block text-xs font-semibold uppercase tracking-[0.15em] text-ink-soft";

function Field({
  label,
  value,
  onChange,
  textarea,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  textarea?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      {textarea ? (
        <textarea
          className={`${inputClass} min-h-28`}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          className={inputClass}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </label>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border border-line bg-paper p-6">
      <h2 className="mb-5 font-display text-xl font-medium">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

export default function AdminForm() {
  const [site, setSite] = useState<SiteContent | null>(null);
  const [contact, setContact] = useState<ContactContent | null>(null);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/admin/content")
      .then((res) => res.json())
      .then((data) => {
        setSite(data.site);
        setContact(data.contact);
      });
    fetch("/api/admin/gallery")
      .then((res) => res.json())
      .then((data) => setImages(data.images ?? []));
  }, []);

  if (!site || !contact) {
    return <p className="p-10 text-center text-ink-soft">Loading editor…</p>;
  }

  const flash = (message: string) => {
    setStatus(message);
    setTimeout(() => setStatus(""), 4000);
  };

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ site, contact }),
      });
      flash(res.ok ? "Saved! Changes are live." : "Save failed — please try again.");
    } catch {
      flash("Save failed — please try again.");
    } finally {
      setSaving(false);
    }
  };

  const upload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append("files", file));
    try {
      const res = await fetch("/api/admin/gallery", { method: "POST", body: formData });
      const data = await res.json();
      if (res.ok) {
        setImages(data.images ?? []);
        flash(`Uploaded ${data.saved?.length ?? 0} photo(s).`);
      } else {
        flash(data.error ?? "Upload failed.");
      }
    } catch {
      flash("Upload failed.");
    } finally {
      setUploading(false);
      if (fileInput.current) fileInput.current.value = "";
    }
  };

  const removeImage = async (name: string) => {
    if (!confirm(`Delete ${name}? This cannot be undone.`)) return;
    const res = await fetch(`/api/admin/gallery?file=${encodeURIComponent(name)}`, { method: "DELETE" });
    const data = await res.json();
    if (res.ok) {
      setImages(data.images ?? []);
      flash("Photo deleted.");
    }
  };

  const updateList = <K extends "services" | "process" | "testimonials">(
    key: K,
    index: number,
    patch: Partial<SiteContent[K][number]>,
  ) => {
    setSite({
      ...site,
      [key]: site[key].map((item, i) => (i === index ? { ...item, ...patch } : item)),
    });
  };

  const removeFromList = (key: "services" | "process" | "testimonials", index: number) => {
    setSite({ ...site, [key]: site[key].filter((_, i) => i !== index) });
  };

  const imageOptions = images.map((img) => img.src);

  const ImagePicker = ({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) => (
    <label className="block">
      <span className={labelClass}>{label}</span>
      <select className={inputClass} value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">— none —</option>
        {imageOptions.map((src) => (
          <option key={src} value={src}>
            {src.replace("/gallery/", "")}
          </option>
        ))}
      </select>
    </label>
  );

  return (
    <div className="mx-auto max-w-4xl space-y-6 px-5 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-medium">Site editor</h1>
          <p className="mt-1 text-sm text-ink-soft">
            Edit your website content here, then press <strong>Save changes</strong>. Photos go live immediately.
          </p>
        </div>
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="bg-ink px-6 py-3 text-sm uppercase tracking-[0.15em] text-paper transition-colors hover:bg-terra disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save changes"}
        </button>
      </div>

      {status && <p className="border border-terra bg-terra/10 px-4 py-3 text-sm text-terra-deep">{status}</p>}

      <Section title="Project photos">
        <button
          type="button"
          onClick={() => fileInput.current?.click()}
          disabled={uploading}
          className="flex items-center gap-2 border border-ink px-4 py-2 text-sm uppercase tracking-[0.15em] hover:bg-ink hover:text-paper disabled:opacity-50"
        >
          <Upload size={16} /> {uploading ? "Uploading…" : "Upload photos"}
        </button>
        <input
          ref={fileInput}
          type="file"
          accept=".jpg,.jpeg,.png,.webp,.gif"
          multiple
          hidden
          onChange={(e) => upload(e.target.files)}
        />
        {images.length > 0 && (
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
            {images.map((image) => (
              <div key={image.name} className="group relative border border-line">
                <Image
                  src={image.src}
                  alt={image.name}
                  width={image.width}
                  height={image.height}
                  className="aspect-square w-full object-cover"
                />
                <button
                  type="button"
                  aria-label={`Delete ${image.name}`}
                  onClick={() => removeImage(image.name)}
                  className="absolute right-1 top-1 hidden bg-ink/80 p-1.5 text-paper group-hover:block"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </Section>

      <Section title="Branding">
        <Field label="Business name" value={site.businessName} onChange={(v) => setSite({ ...site, businessName: v })} />
        <Field label="Tagline" value={site.tagline} onChange={(v) => setSite({ ...site, tagline: v })} />
        <Field label="Browser tab title" value={site.siteTitle} onChange={(v) => setSite({ ...site, siteTitle: v })} />
        <Field
          label="Site description (for Google)"
          textarea
          value={site.siteDescription}
          onChange={(v) => setSite({ ...site, siteDescription: v })}
        />
        <ImagePicker label="Logo (optional, upload above first)" value={site.logo} onChange={(v) => setSite({ ...site, logo: v })} />
      </Section>

      <Section title="Homepage hero">
        <Field label="Heading" value={site.hero.title} onChange={(v) => setSite({ ...site, hero: { ...site.hero, title: v } })} />
        <Field
          label="Subheading"
          textarea
          value={site.hero.subtitle}
          onChange={(v) => setSite({ ...site, hero: { ...site.hero, subtitle: v } })}
        />
        <ImagePicker label="Hero image" value={site.hero.image} onChange={(v) => setSite({ ...site, hero: { ...site.hero, image: v } })} />
        <Field
          label="Homepage intro paragraph"
          textarea
          value={site.homepageText}
          onChange={(v) => setSite({ ...site, homepageText: v })}
        />
      </Section>

      <Section title="About page">
        <Field label="Title" value={site.about.title} onChange={(v) => setSite({ ...site, about: { ...site.about, title: v } })} />
        <Field
          label="Text (blank line = new paragraph)"
          textarea
          value={site.about.text}
          onChange={(v) => setSite({ ...site, about: { ...site.about, text: v } })}
        />
        <ImagePicker label="About image" value={site.about.image} onChange={(v) => setSite({ ...site, about: { ...site.about, image: v } })} />
      </Section>

      <Section title="Services">
        {site.services.map((service, i) => (
          <div key={i} className="space-y-3 border border-line p-4">
            <div className="flex items-center justify-between">
              <span className="font-display text-sm italic text-terra">{String(i + 1).padStart(2, "0")}</span>
              <button type="button" aria-label="Remove service" onClick={() => removeFromList("services", i)} className="text-ink-soft hover:text-terra">
                <Trash2 size={16} />
              </button>
            </div>
            <Field label="Title" value={service.title} onChange={(v) => updateList("services", i, { title: v })} />
            <Field label="Description" textarea value={service.description} onChange={(v) => updateList("services", i, { description: v })} />
            <Field label="Price line" value={service.price} onChange={(v) => updateList("services", i, { price: v })} />
          </div>
        ))}
        <button
          type="button"
          onClick={() => setSite({ ...site, services: [...site.services, { title: "", description: "", price: "" }] })}
          className="flex items-center gap-2 text-sm uppercase tracking-[0.15em] text-terra hover:text-terra-deep"
        >
          <Plus size={16} /> Add service
        </button>
        <Field label="Pricing note (shown on Services page)" textarea value={site.pricingText} onChange={(v) => setSite({ ...site, pricingText: v })} />
      </Section>

      <Section title="Process steps">
        {site.process.map((step, i) => (
          <div key={i} className="space-y-3 border border-line p-4">
            <div className="flex items-center justify-between">
              <span className="font-display text-sm italic text-terra">{String(i + 1).padStart(2, "0")}</span>
              <button type="button" aria-label="Remove step" onClick={() => removeFromList("process", i)} className="text-ink-soft hover:text-terra">
                <Trash2 size={16} />
              </button>
            </div>
            <Field label="Step title" value={step.title} onChange={(v) => updateList("process", i, { title: v })} />
            <Field label="Description" textarea value={step.description} onChange={(v) => updateList("process", i, { description: v })} />
          </div>
        ))}
        <button
          type="button"
          onClick={() => setSite({ ...site, process: [...site.process, { title: "", description: "" }] })}
          className="flex items-center gap-2 text-sm uppercase tracking-[0.15em] text-terra hover:text-terra-deep"
        >
          <Plus size={16} /> Add step
        </button>
      </Section>

      <Section title="Testimonials">
        {site.testimonials.map((t, i) => (
          <div key={i} className="space-y-3 border border-line p-4">
            <div className="flex items-center justify-between">
              <span className="font-display text-sm italic text-terra">{String(i + 1).padStart(2, "0")}</span>
              <button type="button" aria-label="Remove testimonial" onClick={() => removeFromList("testimonials", i)} className="text-ink-soft hover:text-terra">
                <Trash2 size={16} />
              </button>
            </div>
            <Field label="Name" value={t.name} onChange={(v) => updateList("testimonials", i, { name: v })} />
            <Field label="Project (e.g. Duplex home, turnkey)" value={t.role} onChange={(v) => updateList("testimonials", i, { role: v })} />
            <Field label="Quote" textarea value={t.text} onChange={(v) => updateList("testimonials", i, { text: v })} />
          </div>
        ))}
        <button
          type="button"
          onClick={() => setSite({ ...site, testimonials: [...site.testimonials, { name: "", role: "", text: "" }] })}
          className="flex items-center gap-2 text-sm uppercase tracking-[0.15em] text-terra hover:text-terra-deep"
        >
          <Plus size={16} /> Add testimonial
        </button>
      </Section>

      <Section title="Contact details">
        <Field label="Phone (shown on site)" value={contact.phone} onChange={(v) => setContact({ ...contact, phone: v })} />
        <Field
          label="WhatsApp number (digits only, with country code)"
          value={contact.whatsapp}
          onChange={(v) => setContact({ ...contact, whatsapp: v })}
          placeholder="919000000000"
        />
        <Field label="Email" value={contact.email} onChange={(v) => setContact({ ...contact, email: v })} />
        <Field label="Instagram link" value={contact.instagram} onChange={(v) => setContact({ ...contact, instagram: v })} />
        <Field label="Address / city" value={contact.address} onChange={(v) => setContact({ ...contact, address: v })} />
      </Section>

      <div className="sticky bottom-4 flex justify-end">
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="bg-ink px-8 py-3 text-sm uppercase tracking-[0.15em] text-paper shadow-lg transition-colors hover:bg-terra disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save changes"}
        </button>
      </div>
    </div>
  );
}
