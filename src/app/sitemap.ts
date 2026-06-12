import type { MetadataRoute } from "next";

const BASE_URL = process.env.SITE_URL ?? "https://sv-creations-website-production.up.railway.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/projects", "/services", "/about", "/contact"].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
