import Image from "next/image";

// Nav links mirror site-navbar.tsx. "#" = page not built yet (see WEBSITE-DATA.md).
const LINKS = [
  { label: "How We Work", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Contact", href: "/contact" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
];

export default function SiteFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto flex flex-col gap-8 px-4 py-12 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col gap-2">
          <a href="/" className="flex items-center gap-2">
            <Image src="/logo-mark.png" alt="" width={24} height={24} />
            <span className="font-semibold tracking-tight">Ru Visibility</span>
          </a>
          <a
            href="mailto:rushil@ruvisibility.com"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            rushil@ruvisibility.com
          </a>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {LINKS.map((l) => (
            <a key={l.label} href={l.href} className="text-muted-foreground hover:text-foreground">
              {l.label}
            </a>
          ))}
        </nav>
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
