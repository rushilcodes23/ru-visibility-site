import type { MetadataRoute } from "next";
import { LOCATIONS, OTHER_AREAS } from "@/lib/locations";

// Add a row here whenever a new page ships that isn't location-based
// (location pages are added automatically from src/lib/locations.ts).
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://ruvisibility.com";
  const locationUrls = [...LOCATIONS.map((l) => l.slug), OTHER_AREAS.slug].map((slug) => ({
    url: `${base}/locations/${slug}`,
    lastModified: new Date(),
    priority: 0.6,
  }));

  return [
    { url: base, lastModified: new Date(), priority: 1 },
    { url: `${base}/how-we-work`, lastModified: new Date(), priority: 0.8 },
    { url: `${base}/why-it-matters`, lastModified: new Date(), priority: 0.7 },
    { url: `${base}/services`, lastModified: new Date(), priority: 0.9 },
    { url: `${base}/faq`, lastModified: new Date(), priority: 0.7 },
    { url: `${base}/work`, lastModified: new Date(), priority: 0.6 },
    { url: `${base}/why-us`, lastModified: new Date(), priority: 0.8 },
    { url: `${base}/blog`, lastModified: new Date(), priority: 0.6 },
    { url: `${base}/blog/why-geo-matters`, lastModified: new Date(), priority: 0.6 },
    { url: `${base}/contact`, lastModified: new Date(), priority: 0.8 },
    { url: `${base}/accessibility`, lastModified: new Date(), priority: 0.5 },
    { url: `${base}/privacy`, lastModified: new Date(), priority: 0.3 },
    { url: `${base}/terms`, lastModified: new Date(), priority: 0.3 },
    { url: `${base}/locations`, lastModified: new Date(), priority: 0.7 },
    ...locationUrls,
  ];
}
