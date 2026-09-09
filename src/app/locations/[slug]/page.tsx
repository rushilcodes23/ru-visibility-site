import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LOCATIONS, OTHER_AREAS } from "@/lib/locations";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export function generateStaticParams() {
  return [...LOCATIONS.map((l) => ({ slug: l.slug })), { slug: OTHER_AREAS.slug }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const loc = LOCATIONS.find((l) => l.slug === slug);
  if (!loc) return { title: "Ru Visibility — Other Areas We Serve" };
  return {
    title: `AI & SEO Visibility in ${loc.city}, ${loc.region} — Ru Visibility`,
    description: `SEO and GEO visibility management for businesses in ${loc.city}, ${loc.region}. ${loc.intro}`,
  };
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const loc = LOCATIONS.find((l) => l.slug === slug);

  if (!loc && slug !== OTHER_AREAS.slug) notFound();

  const heading = loc ? `Visible in ${loc.city}, and everywhere your customers search.` : "We work beyond our named cities too.";
  const badge = loc ? `Serving ${loc.city}, ${loc.region}` : "Other Areas We Serve";
  const intro = loc ? loc.intro : OTHER_AREAS.intro;

  return (
    <div className="w-full py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-4 items-start max-w-2xl mb-12">
          <Badge>{badge}</Badge>
          <h1 className="text-3xl md:text-5xl tracking-tighter font-regular text-left">
            {heading}
          </h1>
          <p className="text-lg leading-relaxed tracking-tight text-muted-foreground text-left">
            {intro}
          </p>
        </div>

        <div className="max-w-2xl mb-12">
          <p className="text-muted-foreground leading-relaxed">
            The work doesn&apos;t change by location: we test how ChatGPT,
            Gemini, and Google actually see your business, audit the
            technical SEO and accessibility issues holding you back, and
            keep improving your visibility every month — the same honest,
            measured process outlined on{" "}
            <a href="/how-we-work" className="underline underline-offset-4 hover:text-foreground">
              How We Work
            </a>
            .
          </p>
        </div>

        <Button size="lg" render={<a href="/contact">Get Your Visibility Audit</a>} />
      </div>
    </div>
  );
}
