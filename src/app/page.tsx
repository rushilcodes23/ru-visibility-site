import RuVisibilityHero from "@/components/ui/ru-visibility-hero";
import { Feature } from "@/components/ui/feature-section-with-bento-grid";
import { ClosingCta } from "@/components/ui/closing-cta";

export const metadata = {
  title: "Ru Visibility — SEO & GEO Agency | We Make Your Business Visible",
  description:
    "Ongoing SEO and AI visibility (GEO) management for businesses in the US and India — so ChatGPT, Gemini, and Google all find and recommend you. Real audits, plain-English reports, no guesswork.",
};

export default function Home() {
  return (
    <>
      <RuVisibilityHero />
      <Feature />
      <ClosingCta />
    </>
  );
}
