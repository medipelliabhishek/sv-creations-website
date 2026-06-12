import fs from "fs";
import path from "path";
import { imageSize } from "image-size";
import type { ContactContent, GalleryImage, SiteContent } from "@/types/content";

// Default content bundled with the app (used the first time it runs, before
// any edits are made through /admin).
const DEFAULT_CONTENT_DIR = path.join(process.cwd(), "content");
const DEFAULT_SITE_FILE = path.join(DEFAULT_CONTENT_DIR, "site.json");
const DEFAULT_CONTACT_FILE = path.join(DEFAULT_CONTENT_DIR, "contact.json");

// Gallery + saved content both live on the persistent volume mounted at
// public/gallery, so a single volume covers everything /admin edits.
const GALLERY_DIR = path.join(process.cwd(), "public", "gallery");
const SITE_FILE = path.join(GALLERY_DIR, "site.json");
const CONTACT_FILE = path.join(GALLERY_DIR, "contact.json");

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);

export function getSiteContent(): SiteContent {
  const file = fs.existsSync(SITE_FILE) ? SITE_FILE : DEFAULT_SITE_FILE;
  const raw = fs.readFileSync(file, "utf-8");
  return { process: [], testimonials: [], ...JSON.parse(raw) } as SiteContent;
}

export function getContactContent(): ContactContent {
  const file = fs.existsSync(CONTACT_FILE) ? CONTACT_FILE : DEFAULT_CONTACT_FILE;
  const raw = fs.readFileSync(file, "utf-8");
  return JSON.parse(raw) as ContactContent;
}

export function saveSiteContent(data: SiteContent): void {
  fs.mkdirSync(GALLERY_DIR, { recursive: true });
  fs.writeFileSync(SITE_FILE, JSON.stringify(data, null, 2) + "\n", "utf-8");
}

export function saveContactContent(data: ContactContent): void {
  fs.mkdirSync(GALLERY_DIR, { recursive: true });
  fs.writeFileSync(CONTACT_FILE, JSON.stringify(data, null, 2) + "\n", "utf-8");
}

export function getGalleryImages(): GalleryImage[] {
  if (!fs.existsSync(GALLERY_DIR)) return [];

  const files = fs
    .readdirSync(GALLERY_DIR)
    .filter((file) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  const images: GalleryImage[] = [];

  for (const file of files) {
    try {
      const filePath = path.join(GALLERY_DIR, file);
      const buffer = fs.readFileSync(filePath);
      const dimensions = imageSize(buffer);
      images.push({
        src: `/gallery/${file}`,
        name: file,
        width: dimensions.width,
        height: dimensions.height,
      });
    } catch {
      // Skip files that can't be read as images
    }
  }

  return images;
}
