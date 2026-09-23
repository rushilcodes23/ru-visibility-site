import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Space_Grotesk, Source_Serif_4 } from "next/font/google";
import SiteNavbar from "@/components/site-navbar";
import SiteFooter from "@/components/site-footer";
import { ThemeProvider } from "@/components/theme-provider";
import ThemeToggle from "@/components/theme-toggle";
import SiteBackground from "@/components/site-background";
import { LOCATIONS } from "@/lib/locations";
import "./globals.css";

// Only confirmed facts — no address/founding date, those don't exist yet.
// areaServed reflects Rushil's actual real target markets (see
// ABOUT-RUSHIL.md for the US cities, confirmed directly for India).
//
// Plain Organization, deliberately. This used to also declare
// ProfessionalService, which is a subtype of LocalBusiness — so it was
// telling Google "physical local business" while carrying no address or geo,
// which is both incomplete markup and wrong for a remote service working
// across the US, India and elsewhere. areaServed below already carries the
// real coverage without implying a storefront.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  // Stable id so the homepage's WebSite node can point its publisher here
  // instead of duplicating the organisation details in a second place.
  "@id": "https://ruvisibility.com/#organization",
  name: "Ru Visibility",
  url: "https://ruvisibility.com",
  email: "rushil@ruvisibility.com",
  telephone: "+91-7222999365",
  // Country only, and deliberately no finer than that. Rushil does not want
  // the specific city published, so nothing here — and nothing on the About
  // page — narrows it below "India". areaServed below still lists every city
  // the work is done in, which is a different claim: where clients are, not
  // where the business sits.
  //
  // Deliberately on the plain Organization, which carries no storefront
  // implication. Upgrading to LocalBusiness to hold an address would claim a
  // physical place customers can visit, which is not true of a remote service.
  address: {
    "@type": "PostalAddress",
    addressCountry: "IN",
  },
  logo: "https://ruvisibility.com/logo-mark.png",
  description:
    "SEO and GEO (Generative Engine Optimization) agency — ongoing management so AI tools and Google can find and recommend a business.",
  // Active profiles only. This is the markup AI systems use to confirm that
  // this site and those profiles describe the same entity — so an inactive or
  // abandoned profile listed here is worse than no entry at all.
  sameAs: [
    "https://www.linkedin.com/in/rushil-a-bajpai-21b99a3a9",
    "https://x.com/RushilA_Bajpai",
  ],
  founder: {
    "@type": "Person",
    "@id": "https://ruvisibility.com/#founder",
    name: "Rushil A. Bajpai",
    jobTitle: "AI Visibility (GEO) & SEO Consultant",
    url: "https://ruvisibility.com/about",
    // Country only, same reasoning as the organisation address above. A
    // homeLocation naming the city is exactly the detail that should not be
    // published, so this states the country and stops there.
    homeLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
      },
    },
    sameAs: [
      "https://www.linkedin.com/in/rushil-a-bajpai-21b99a3a9",
      "https://x.com/RushilA_Bajpai",
    ],
  },
  knowsAbout: [
    "Search Engine Optimization",
    "Generative Engine Optimization",
    // The same discipline is sold under several names, and a prospect or an
    // AI system searching one of them should still land here. These are the
    // terms in current use, spelled out rather than abbreviated so the
    // abbreviation and the full phrase both match.
    "Answer Engine Optimization",
    "AEO",
    "GEO",
    "Large Language Model Optimization",
    "LLMO",
    "AI SEO",
    "E-E-A-T",
    "Experience Expertise Authoritativeness Trustworthiness",
    "AI visibility",
    "Web accessibility (ADA/WCAG)",
    "Website development",
    "Digital marketing",
    "AI automation for business",
    "Local SEO",
    "Google Business Profile optimization",
    "Core Web Vitals optimization",
    "E-commerce SEO",
    "Analytics and conversion tracking",
  ],
  areaServed: [
    ...LOCATIONS.map((l) => ({
      "@type": "City",
      name: l.city,
      containedInPlace: l.country,
    })),
    { "@type": "Country", name: "International" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Ru Visibility Services",
    itemListElement: [
      "AI Visibility (GEO) Management",
      "Answer Engine Optimization (AEO)",
      "LLM Optimization (LLMO) & AI SEO",
      "E-E-A-T Content & Authority Building",
      "Technical SEO Management",
      "Accessibility (ADA) Risk Audits",
      "Blog & Content Writing",
      "Website Design & Development",
      "Website Monetization Consulting",
      "Digital Marketing",
      "AI Integration for Business",
      "Local SEO & Google Business Profile",
      "Site Speed & Core Web Vitals",
      "E-commerce & Product SEO",
      "Analytics & Conversion Tracking",
    ].map((name) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name },
    })),
  },
};

// Geist and Geist Mono used to be loaded here and were never rendered by
// anything: globals.css maps --font-sans to var(--font-sans), which is
// self-referential and resolves to nothing, so body copy has always fallen
// back to the browser's default serif. Measured on the live site: 187
// elements rendering as Times New Roman, 14 as Space Grotesk, zero as Geist.
//
// That is ~52KB of webfont and two render-blocking requests bought nothing on
// every page load. Removing them changes no pixel — the serif you see today
// is the fallback, not Geist. Wiring Geist up properly is a design decision,
// not a performance one, so it is left alone here.

// Self-hosted via next/font — replaces the render-blocking @import in the
// hero and navbar (both were separately fetching the same Google Font
// over the network on every page load).
// 600 is not in this list because nothing uses it. Checked by walking every
// element on all 14 page types and reading the computed font-weight of
// anything set in Space Grotesk: 400 (174 elements), 500 (84, the navbar
// links), 700 (47) and 900 (4, synthesized from 700 since the typeface stops
// at 700). Zero at 600. Each declared weight adds @font-face rules to the
// render-blocking stylesheet, so an unused one is pure cost.
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

// Reading face for long-form articles only — see .article-body in
// globals.css, which is the only thing that references it.
//
// Scoped deliberately rather than set site-wide. An article asks someone to
// stay for several thousand words, which is a different job from a service
// page they scan in twenty seconds, and it earns a face chosen for that. The
// rest of the site is untouched by this.
//
// Note the separate, pre-existing problem this does NOT fix: --font-sans in
// globals.css is defined as var(--font-sans), which is self-referential and
// resolves to nothing, so every non-blog page is rendering in the browser's
// default serif rather than anything anyone chose. That is a site-wide call
// to make deliberately, not a side effect of a blog redesign.
const sourceSerif = Source_Serif_4({
  variable: "--font-reading",
  weight: ["400", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});
// Space Grotesk only ships up to weight 700 — the hero's font-weight:900
// text always relied on the browser synthesizing bold from 700, both
// before this fix and after. No regression, just noting it's inherent to
// the typeface, not something introduced here.

// Chrome and Brave on Android auto-darken any page they think has no dark
// mode of its own. Declaring support here is the documented opt-out, and it
// has to be a meta tag because the heuristic runs before our CSS applies.
export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8FAFC" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0e17" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ruvisibility.com"),
  title: "Ru Visibility — We Make Your Business Visible",
  description:
    "Ongoing SEO and GEO management, content, website design, and maintenance — so ChatGPT, Gemini, and Google can all find and recommend your business.",
  keywords: [
    "SEO agency",
    "GEO agency",
    "AEO agency",
    "answer engine optimization",
    "LLMO",
    "LLM optimization",
    "AI SEO agency",
    "E-E-A-T audit",
    "AI visibility",
    "generative engine optimization",
    "SEO Dallas",
    "SEO Atlanta",
    "SEO Houston",
    "SEO Miami",
    "SEO Phoenix",
    "SEO Raipur",
    "SEO Jaipur",
    "AI search visibility",
    "AI automation for business",
    "AI integration for business",
    "AI website builder",
    "business process automation",
    "AI chatbot for business",
    "GEO audit",
    "AI visibility audit",
    "ChatGPT SEO",
    "accessibility audit",
    "ADA compliance audit",
    "website development agency",
    "digital marketing agency",
    "local SEO services",
    "Google Business Profile optimization",
    "map pack ranking",
    "page speed optimization",
    "Core Web Vitals",
    "ecommerce SEO",
    "product page SEO",
    "Google Shopping optimization",
    "GA4 setup",
    "conversion tracking",
    "Ru Visibility",
  ],
  openGraph: {
    title: "Ru Visibility — We Make Your Business Visible",
    description:
      "Ongoing SEO and GEO management so ChatGPT, Gemini, and Google can all find and recommend your business.",
    url: "https://ruvisibility.com",
    siteName: "Ru Visibility",
    images: ["/opengraph-image.png"],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ru Visibility — We Make Your Business Visible",
    description:
      "Ongoing SEO and GEO management so ChatGPT, Gemini, and Google can all find and recommend your business.",
    images: ["/opengraph-image.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${sourceSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* next-themes injects a blocking inline script that sets the theme
            class before first paint. OpenNext bundles the server with esbuild
            using keepNames, which rewrites that function and injects a call to
            its __name() helper — a helper that only exists inside the server
            bundle, never in the browser. So the script threw
            "ReferenceError: __name is not defined" and never ran: the site
            rendered LIGHT for ~1.2s on every load and then flipped to dark the
            moment React hydrated. A full-page colour inversion mid-load is
            also exactly what Speed Index measures.

            This defines the helper as an identity function before that script
            parses. It has to be the first thing in <body>, because that is
            where next-themes puts its script. If a future OpenNext release
            stops emitting __name, this becomes a harmless no-op. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "window.__name||(window.__name=function(f){return f});",
          }}
        />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
          />
          {/* Fixed layer at z-index 0; everything else sits above it. */}
          <SiteBackground />
          <div className="relative z-10 flex min-h-full flex-1 flex-col">
            <SiteNavbar />
            <div className="flex-1">{children}</div>
            <SiteFooter />
          </div>
          <ThemeToggle />
          {/* Cloudflare Web Analytics — cookieless, no persistent visitor ID,
              aggregated page-view/performance data only. Guarded on the env
              var so a missing token skips the tag entirely rather than
              rendering a beacon with nothing to report. NEXT_PUBLIC_ vars are
              inlined at build time, so the value must be set before `next
              build` runs (in .env.local for local builds), not only as a
              runtime Cloudflare secret. */}
          {process.env.NEXT_PUBLIC_CF_BEACON_TOKEN && (
            // lazyOnload, not afterInteractive. afterInteractive makes Next
            // emit a <link rel="preload"> for this, so a third-party analytics
            // script was competing for bandwidth with the stylesheet and the
            // font during the first load. Measured on a throttled phone: the
            // beacon finished at 1656ms, in the middle of the window that
            // decides when the page first paints. lazyOnload drops the preload
            // and fetches it once the page is idle. Same analytics, just no
            // longer ahead of the content in the queue.
            <Script
              strategy="lazyOnload"
              src="https://static.cloudflareinsights.com/beacon.min.js"
              data-cf-beacon={JSON.stringify({ token: process.env.NEXT_PUBLIC_CF_BEACON_TOKEN })}
            />
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
