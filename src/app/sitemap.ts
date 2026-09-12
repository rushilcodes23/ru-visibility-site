import type { MetadataRoute } from "next";
import { LOCATIONS, OTHER_AREAS } from "@/lib/locations";
import pageDates from "@/lib/page-dates.json";

const BASE = "https://ruvisibility.com";

// Dates come from scripts/gen-page-dates.mjs, which resolves real git commit
// times at build time and writes them here as plain JSON.
//
// Two earlier versions of this were wrong. First it used `new Date()` on every
// entry, so all 39 URLs claimed the same modification instant and it moved on
// every deploy — Google discards lastmod it can tell is unreliable, so that
// was worse than sending none. Then it called git directly from this file,
// which worked during a local `next build` and produced nothing on the
// deployed site: this route re-executes inside the Cloudflare Worker, where
// node:child_process does not exist, and the failure was silent. Static JSON
// is the only form that survives both.
const dates: Record<string, string> = pageDates;

function newest(...files: string[]): Date | undefined {
  let out: Date | undefined;
  for (const f of files) {
    const iso = dates[f];
    if (!iso) continue;
    const d = new Date(iso);
    if (!Number.isNaN(d.getTime()) && (!out || d > out)) out = d;
  }
  return out;
}

function entry(
  path: string,
  priority: number,
  ...sourceFiles: string[]
): MetadataRoute.Sitemap[number] {
  const lastModified = newest(...sourceFiles);
  return {
    url: path === "/" ? BASE : `${BASE}${path}`,
    // Omitted rather than faked when a date can't be resolved.
    ...(lastModified ? { lastModified } : {}),
    priority,
  };
}

// Add a row here whenever a new page ships that isn't location-based
// (location pages are added automatically from src/lib/locations.ts), and add
// its source file to FILES in scripts/gen-page-dates.mjs.
export default function sitemap(): MetadataRoute.Sitemap {
  // City pages come from one template plus the data file, so the newer of the
  // two is when that page's content actually last changed.
  const locationSources = [
    "src/app/locations/[slug]/page.tsx",
    "src/lib/locations.ts",
  ];
  const locationUrls = [...LOCATIONS.map((l) => l.slug), OTHER_AREAS.slug].map(
    (slug) => entry(`/locations/${slug}`, 0.6, ...locationSources)
  );

  return [
    entry("/", 1, "src/app/page.tsx", "src/components/ui/ru-visibility-hero.tsx"),
    entry("/how-we-work", 0.8, "src/app/how-we-work/page.tsx"),
    entry("/why-it-matters", 0.7, "src/app/why-it-matters/page.tsx"),
    entry("/services", 0.9, "src/app/services/page.tsx"),
    entry("/faq", 0.7, "src/app/faq/page.tsx"),
    entry("/work", 0.6, "src/app/work/page.tsx"),
    entry("/why-us", 0.8, "src/app/why-us/page.tsx"),
    entry("/blog", 0.6, "src/app/blog/page.tsx"),
    entry("/blog/why-geo-matters", 0.6, "src/app/blog/why-geo-matters/page.tsx"),
    entry("/contact", 0.8, "src/app/contact/page.tsx", "src/components/contact-form.tsx"),
    entry("/accessibility", 0.5, "src/app/accessibility/page.tsx"),
    entry("/privacy", 0.3, "src/app/privacy/page.tsx"),
    entry("/terms", 0.3, "src/app/terms/page.tsx"),
    entry("/locations", 0.7, "src/app/locations/page.tsx", "src/lib/locations.ts"),
    ...locationUrls,
  ];
}
