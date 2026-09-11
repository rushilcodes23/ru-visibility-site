import Image from "next/image";
import { LOCATIONS } from "@/lib/locations";

const COMPANY_LINKS = [
  { label: "How We Work", href: "/how-we-work" },
  { label: "Why It Matters", href: "/why-it-matters" },
  { label: "What We Do", href: "/services" },
  { label: "Our Work", href: "/work" },
  { label: "Why Us", href: "/why-us" },
];

const RESOURCE_LINKS = [
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Locations", href: "/locations" },
  { label: "Accessibility", href: "/accessibility" },
  { label: "Talk to Us", href: "/contact" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

// The city pages are the deepest part of the site and were reachable only
// through the locations index. Surfacing a few here gives them a link from
// every page, which is how they get crawled, and it lets someone who landed
// on the blog find out we work in their city at all. Read from the real list
// rather than retyped, so the labels cannot drift out of sync.
const FEATURED_CITY_SLUGS = ["dallas", "new-york", "los-angeles", "mumbai", "bangalore"];
const FEATURED_CITIES = FEATURED_CITY_SLUGS.map((slug) =>
  LOCATIONS.find((l) => l.slug === slug)
).filter((l): l is (typeof LOCATIONS)[number] => Boolean(l));

export default function SiteFooter() {
  return (
    <footer className="page-surface border-t">
      <div className="container mx-auto px-4 py-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
        <div className="flex flex-col gap-3 sm:col-span-2">
          <a href="/" className="flex items-center gap-2">
            <Image src="/logo-mark-220.png" alt="" width={28} height={28} className="dark:invert" unoptimized />
            <span className="font-semibold tracking-tight text-lg">Ru Visibility</span>
          </a>
          <p className="text-sm text-muted-foreground max-w-xs">
            We make your business visible. Ongoing SEO and GEO management,
            content, website design, and maintenance — real, measured work,
            plain-English reporting, no jargon.
          </p>
          <a href="mailto:rushil@ruvisibility.com" className="footer-link text-sm">
            rushil@ruvisibility.com
          </a>
          <a href="tel:+917222999365" className="footer-link text-sm">
            +91 72229 99365
          </a>
          <p className="text-xs text-muted-foreground mt-2 max-w-xs">
            Send us a website address and you get a real answer, usually within
            a day. Not a calendar link.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium mb-1">Company</span>
          {COMPANY_LINKS.map((l) => (
            <a key={l.label} href={l.href} className="footer-link text-sm">
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium mb-1">Resources</span>
          {RESOURCE_LINKS.map((l) => (
            <a key={l.label} href={l.href} className="footer-link text-sm">
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium mb-1">Where We Work</span>
          {FEATURED_CITIES.map((l) => (
            <a key={l.slug} href={`/locations/${l.slug}`} className="footer-link text-sm">
              {l.city}
            </a>
          ))}
          <a href="/locations" className="footer-link text-sm">
            All {LOCATIONS.length} cities →
          </a>
        </div>
      </div>

      <div className="border-t">
        <div className="container mx-auto flex flex-col-reverse gap-2 px-4 py-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} Ru Visibility. All rights reserved.</span>
          <nav aria-label="Legal" className="flex gap-4">
            {LEGAL_LINKS.map((l) => (
              <a key={l.label} href={l.href} className="footer-legal">
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
