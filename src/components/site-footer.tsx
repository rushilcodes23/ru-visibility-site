import Image from "next/image";

const COMPANY_LINKS = [
  { label: "How We Work", href: "/how-we-work" },
  { label: "Why It Matters", href: "/why-it-matters" },
  { label: "Pricing", href: "/pricing" },
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

export default function SiteFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-16 grid grid-cols-1 gap-10 md:grid-cols-4">
        <div className="flex flex-col gap-3 md:col-span-2">
          <a href="/" className="flex items-center gap-2">
            <Image src="/logo-mark.png" alt="" width={28} height={28} className="dark:invert" />
            <span className="font-semibold tracking-tight text-lg">Ru Visibility</span>
          </a>
          <p className="text-sm text-muted-foreground max-w-xs">
            We make your business visible. Ongoing SEO and GEO management,
            content, website design, and maintenance — real, measured work,
            plain-English reporting, no jargon.
          </p>
          <a
            href="mailto:rushil@ruvisibility.com"
            className="text-sm text-muted-foreground hover:text-foreground w-fit"
          >
            rushil@ruvisibility.com
          </a>
          <a
            href="tel:+917222999365"
            className="text-sm text-muted-foreground hover:text-foreground w-fit"
          >
            +91 72229 99365
          </a>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium mb-1">Company</span>
          {COMPANY_LINKS.map((l) => (
            <a key={l.label} href={l.href} className="text-sm text-muted-foreground hover:text-foreground w-fit">
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium mb-1">Resources</span>
          {RESOURCE_LINKS.map((l) => (
            <a key={l.label} href={l.href} className="text-sm text-muted-foreground hover:text-foreground w-fit">
              {l.label}
            </a>
          ))}
        </div>
      </div>

      <div className="border-t">
        <div className="container mx-auto flex flex-col-reverse gap-2 px-4 py-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} Ru Visibility. All rights reserved.</span>
          <nav aria-label="Legal" className="flex gap-4">
            {LEGAL_LINKS.map((l) => (
              <a key={l.label} href={l.href} className="hover:text-foreground">
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
