import type { MetadataRoute } from "next";

// Add a row here whenever a new page ships (How We Work, Pricing, Blog, etc.)
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://ruvisibility.com";
  return [
    { url: base, lastModified: new Date(), priority: 1 },
    { url: `${base}/how-we-work`, lastModified: new Date(), priority: 0.8 },
    { url: `${base}/pricing`, lastModified: new Date(), priority: 0.8 },
    { url: `${base}/faq`, lastModified: new Date(), priority: 0.7 },
    { url: `${base}/work`, lastModified: new Date(), priority: 0.6 },
    { url: `${base}/blog`, lastModified: new Date(), priority: 0.6 },
    { url: `${base}/contact`, lastModified: new Date(), priority: 0.8 },
  ];
}
