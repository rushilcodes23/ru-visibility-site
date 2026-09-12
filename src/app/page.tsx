import RuVisibilityHero from "@/components/ui/ru-visibility-hero";
import { Feature } from "@/components/ui/feature-section-with-bento-grid";
import { ClosingCta } from "@/components/ui/closing-cta";
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
      <Feature />
      <ClosingCta />
    </>
  );
}
