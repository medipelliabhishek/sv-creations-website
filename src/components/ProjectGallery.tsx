"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryImage } from "@/types/content";

export default function ProjectGallery({ images }: { images: GalleryImage[] }) {
  const [current, setCurrent] = useState<number | null>(null);

  const close = useCallback(() => setCurrent(null), []);
  const prev = useCallback(
    () => setCurrent((c) => (c === null ? c : (c + images.length - 1) % images.length)),
    [images.length],
  );
  const next = useCallback(
    () => setCurrent((c) => (c === null ? c : (c + 1) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (current === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [current, close, prev, next]);

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image, i) => (
          <button
            key={image.name}
            type="button"
            onClick={() => setCurrent(i)}
            className="group relative overflow-hidden border border-line bg-paper-deep text-left"
          >
            <Image
              src={image.src}
              alt={`SV Creations project ${i + 1}`}
              width={image.width}
              height={image.height}
              className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {current !== null && images[current] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/95 p-4" onClick={close}>
          <button type="button" aria-label="Close" onClick={close} className="absolute right-5 top-5 text-paper/70 hover:text-paper">
            <X size={28} />
          </button>
          <button
            type="button"
            aria-label="Previous image"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 text-paper/70 hover:text-paper"
          >
            <ChevronLeft size={36} />
          </button>
          <Image
            src={images[current].src}
            alt={`SV Creations project ${current + 1}`}
            width={images[current].width}
            height={images[current].height}
            className="max-h-[85vh] w-auto max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            aria-label="Next image"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-paper/70 hover:text-paper"
          >
            <ChevronRight size={36} />
          </button>
        </div>
      )}
    </>
  );
}
