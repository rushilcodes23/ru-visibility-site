// Writes real per-file git commit dates to a JSON file that sitemap.ts
// imports as plain data.
//
// This exists because the sitemap route re-executes inside the Cloudflare
// Worker at runtime, where node:child_process does not exist — so calling git
// from sitemap.ts worked during `next build` locally and then silently
// produced no lastmod at all on the deployed site. Resolving the dates here,
// at build time, and importing the result as static JSON means the values are
// baked into the bundle and survive wherever the route runs.
//
// Runs from both `npm run build` and `npm run deploy` (see package.json).

import { execFileSync } from "node:child_process";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(root, "src/lib/page-dates.json");

// Every source file whose commit date should drive a sitemap lastmod.
const FILES = [
  "src/app/page.tsx",
  "src/components/ui/ru-visibility-hero.tsx",
  "src/app/how-we-work/page.tsx",
  "src/app/why-it-matters/page.tsx",
  "src/app/services/page.tsx",
  "src/app/faq/page.tsx",
  "src/app/work/page.tsx",
  "src/app/why-us/page.tsx",
  "src/app/blog/page.tsx",
  "src/app/blog/why-geo-matters/page.tsx",
  "src/app/contact/page.tsx",
  "src/components/contact-form.tsx",
  "src/app/accessibility/page.tsx",
  "src/app/privacy/page.tsx",
  "src/app/terms/page.tsx",
  "src/app/locations/page.tsx",
  "src/app/locations/[slug]/page.tsx",
  "src/lib/locations.ts",
];

const dates = {};
let resolved = 0;

for (const file of FILES) {
  try {
    const iso = execFileSync("git", ["log", "-1", "--format=%cI", "--", file], {
      cwd: root,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    if (iso) {
      dates[file] = new Date(iso).toISOString();
      resolved++;
    }
  } catch {
    // No git, shallow clone, or untracked file. The sitemap omits lastmod for
    // anything missing here rather than inventing a date.
  }
}

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, JSON.stringify(dates, null, 2) + "\n");
console.log(`page-dates.json: resolved ${resolved}/${FILES.length} commit dates`);
