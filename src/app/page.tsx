import RuVisibilityHero from "@/components/ui/ru-visibility-hero";
import { Feature } from "@/components/ui/feature-section-with-bento-grid";
import { ClosingCta } from "@/components/ui/closing-cta";

export const metadata = {
  alternates: { canonical: "/" },
  title: "Ru Visibility — SEO & GEO Agency for AI Visibility",
  description:
    "Ongoing SEO and AI visibility (GEO) management for US and India businesses — so ChatGPT, Gemini, and Google can all find and recommend you.",
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
