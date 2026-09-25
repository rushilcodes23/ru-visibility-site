import RuVisibilityHero from "@/components/ui/ru-visibility-hero";
import { Feature } from "@/components/ui/feature-section-with-bento-grid";
import { ClosingCta } from "@/components/ui/closing-cta";
import { AuditCta } from "@/components/ui/audit-cta";
import { ProofBand } from "@/components/ui/proof-band";
import { TestimonialsStrip } from "@/components/ui/testimonials";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/",
  title: "Ru Visibility — SEO & GEO Agency for AI Visibility",
  description: "Ongoing SEO and AI visibility (GEO) management for US and India businesses — so ChatGPT, Gemini, and Google can all find and recommend you.",
});

// Homepage only, and deliberately minimal: name plus url, nothing invented.
// This is the markup Google documents for controlling the site name shown in
// search results — without it, Google guesses one from the domain or title.
// The site isn't indexed yet, so this is in place before the first crawl
// rather than trying to correct a wrong name later. No searchAction here:
// the site has no internal search, and claiming one would be false.
const webSiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Ru Visibility",
  // Google reads name and alternateName from this node to decide the site
  // name it shows in results (documented in Search Central under "site
  // names"). These are the two other spellings people genuinely use: the
  // navbar sets the brand in capitals, and the domain runs it together as one
  // word. Without this, a search for either has nothing connecting it to the
  // brand. Deliberately NOT padded with invented variants like "Ru Visibility
  // SEO" — an alternate name has to be something the business is actually
  // called.
  alternateName: ["RU Visibility", "RuVisibility"],
  url: "https://ruvisibility.com",
  publisher: { "@id": "https://ruvisibility.com/#organization" },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
      />
      <RuVisibilityHero />
      <ProofBand />
      <AuditCta />
      <Feature />
      <TestimonialsStrip />
      <ClosingCta ctaHref="#audit" />
    </>
  );
}
