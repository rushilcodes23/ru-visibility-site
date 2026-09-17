import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AuditCta } from "@/components/ui/audit-cta";
import { CityAuditStats } from "@/components/ui/city-audit-stats";
import { LOCATIONS, OTHER_AREAS } from "@/lib/locations";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import ScrollReveal from "@/components/scroll-reveal";
import { Bot, Globe, Accessibility, FileText } from "lucide-react";

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

  if (!loc) {
    return pageMetadata({
      path: `/locations/${OTHER_AREAS.slug}`,
      title: "Other Areas We Serve | Ru Visibility",
      description:
        "Not in one of our named cities? We work with businesses anywhere — same SEO and GEO visibility management, same process.",
    });
  }

  // Kept deliberately short — a Screaming Frog crawl flagged descriptions
  // over 155 characters as truncating in search results, and the old
  // version pasted the full city intro in here.
  return pageMetadata({
    path: `/locations/${loc.slug}`,
    title: `SEO & GEO in ${loc.city} | Ru Visibility`,
    description: `SEO and AI visibility (GEO) management for ${loc.city} businesses — so Google, ChatGPT, and Gemini can all find and recommend you.`,
  });
}

const WHAT_WE_DO = [
  {
    icon: Bot,
    title: "AI visibility (GEO)",
    body: "We test what ChatGPT, Gemini, and Perplexity actually say when someone asks for a business like yours — then work on the reasons you're not the answer.",
  },
  {
    icon: Globe,
    title: "Technical SEO",
    body: "The crawl-level problems keeping Google from ranking you at all: missing headings, broken canonicals, sitemap gaps, accidental crawler blocks.",
  },
  {
    icon: Accessibility,
    title: "Accessibility scans",
    body: "Real axe-core scans, not guesses. We only raise legal risk when it's genuinely measured on your site.",
  },
  {
    icon: FileText,
    title: "Content and reporting",
    body: "Content written for your site each month, plus a plain-English check-in on what actually changed.",
  },
];

export default async function LocationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const loc = LOCATIONS.find((l) => l.slug === slug);

  if (!loc && slug !== OTHER_AREAS.slug) notFound();

  const place = loc ? loc.city : "your area";
  const heading = loc
    ? `Visible in ${loc.city}, and everywhere your customers search.`
    : "We work beyond our named cities too.";
  const badge = loc ? `Serving ${loc.city}, ${loc.region}` : "Other Areas We Serve";
  const intro = loc ? loc.intro : OTHER_AREAS.intro;

  return (
    <div className="page-surface w-full py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="page-head flex flex-col gap-4 items-start max-w-2xl mb-12">
            <Badge>{badge}</Badge>
            <h1 className="text-3xl md:text-5xl tracking-tighter font-regular text-left">
              {heading}
            </h1>
            <p className="text-lg leading-relaxed tracking-tight text-muted-foreground text-left">
              {intro}
            </p>
          </div>
        </ScrollReveal>

        {loc && (
          <ScrollReveal delay={50}>
            <CityAuditStats slug={loc.slug} city={loc.city} />
          </ScrollReveal>
        )}

        <ScrollReveal delay={100}>
          <div className="mb-16">
            <h2 className="text-2xl tracking-tight mb-3 md:text-3xl">
              What we actually do for {place} businesses
            </h2>
            {loc?.sectors && (
              <p className="text-foreground leading-relaxed mb-4 max-w-2xl font-medium">
                {loc.sectors}
              </p>
            )}
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-2xl">
              The work itself doesn&apos;t change by location — what changes
              is who you&apos;re competing against for the same searches and
              the same AI recommendations. Every engagement covers the same
              four areas, every month, not as a one-time audit you never hear
              about again.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {WHAT_WE_DO.map((item) => (
                <div
                  key={item.title}
                  className="card-surface rounded-md p-6 flex flex-col gap-3 transition-transform duration-200 hover:scale-[1.02]"
                >
                  <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10">
                    <item.icon className="w-6 h-6 stroke-1 text-primary" />
                  </div>
                  <h3 className="text-lg tracking-tight">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <div className="grid gap-6 lg:grid-cols-2">
        <ScrollReveal delay={150}>
          <div className="card-surface rounded-md p-6 md:p-8 h-full">
            <h2 className="text-2xl tracking-tight mb-3 md:text-3xl">
              Why being found in {place} changed
            </h2>
            {loc?.angle && (
              <p className="text-foreground leading-relaxed mb-4 max-w-3xl font-medium">
                {loc.angle}
              </p>
            )}
            {/* Deliberately short. The general argument lives on one page
                instead of being restated on all 24 city pages — repeating it
                everywhere was most of what made these pages near-identical
                (82% wording overlap between the worst pair). */}
            <p className="text-muted-foreground leading-relaxed max-w-3xl">
              The wider shift behind that — why AI answers name one or two
              businesses instead of listing ten — is set out in{" "}
              <a href="/why-it-matters" className="underline underline-offset-4 hover:text-foreground">
                why it matters
              </a>
              , with the measured evidence on our{" "}
              <a href="/research" className="underline underline-offset-4 hover:text-foreground">
                research page
              </a>
              . We won&apos;t promise a ranking or a citation; nobody honestly
              can.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="card-surface rounded-md p-6 md:p-8 h-full">
            <h2 className="text-2xl tracking-tight mb-3 md:text-3xl">
              Getting started in {place}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              It starts with an audit — the same one behind the numbers above.
              The six-step process is on{" "}
              <a href="/how-we-work" className="underline underline-offset-4 hover:text-foreground">
                How We Work
              </a>
              , every package is on{" "}
              <a href="/services" className="underline underline-offset-4 hover:text-foreground">
                what we do
              </a>
              , and{" "}
              <a href="/about" className="underline underline-offset-4 hover:text-foreground">
                who you&apos;d be working with
              </a>{" "}
              is one person, not an account team.
            </p>
            <Button size="lg" render={<a href="#audit">Get Your Visibility Audit</a>} />
          </div>
        </ScrollReveal>
        </div>
      </div>
      <AuditCta />
    </div>
  );
}
