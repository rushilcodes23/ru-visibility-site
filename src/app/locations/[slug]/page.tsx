import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LOCATIONS, OTHER_AREAS } from "@/lib/locations";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
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
    return {
      title: "Other Areas We Serve | Ru Visibility",
      description:
        "Not in one of our named cities? We work with businesses anywhere — same SEO and GEO visibility management, same process.",
      alternates: { canonical: `/locations/${OTHER_AREAS.slug}` },
    };
  }

  // Kept deliberately short — a Screaming Frog crawl flagged descriptions
  // over 155 characters as truncating in search results, and the old
  // version pasted the full city intro in here.
  return {
    title: `SEO & GEO in ${loc.city} | Ru Visibility`,
    description: `SEO and AI visibility (GEO) management for ${loc.city} businesses — so Google, ChatGPT, and Gemini can all find and recommend you.`,
    alternates: { canonical: `/locations/${loc.slug}` },
  };
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

        <ScrollReveal delay={100}>
          <div className="mb-16">
            <h2 className="text-2xl tracking-tight mb-3">
              What we actually do for {place} businesses
            </h2>
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
            <h2 className="text-2xl tracking-tight mb-3">
              Why being found in {place} changed
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4 max-w-3xl">
              For years, showing up locally meant ranking on Google and
              little else. That still matters — most people still start with
              a search. But a growing share now ask an AI tool directly for a
              recommendation instead, and those tools answer with one or two
              businesses, not a page of ten blue links. If yours isn&apos;t
              one of them, you aren&apos;t further down the list; you&apos;re
              simply absent from that conversation.
            </p>
            <p className="text-muted-foreground leading-relaxed max-w-3xl">
              We won&apos;t promise you a specific ranking or a guaranteed
              citation — nobody honestly can, and anyone who does is selling
              you something. What we can do is measure exactly where you
              stand today, fix what&apos;s genuinely holding you back, and
              show you the before-and-after using the same prompts.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="card-surface rounded-md p-6 md:p-8 h-full">
            <h2 className="text-2xl tracking-tight mb-3">
              Getting started in {place}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              It starts with an audit: we run the real prompts, crawl the
              site, and hand you a plain-English report on what&apos;s
              actually wrong. The full six-step process is laid out on{" "}
              <a href="/how-we-work" className="underline underline-offset-4 hover:text-foreground">
                How We Work
              </a>
              , and{" "}
              <a href="/services" className="underline underline-offset-4 hover:text-foreground">
                what we do
              </a>{" "}
              lists every service and package, so you know what you are
              getting before you ask.
            </p>
            <Button size="lg" render={<a href="/contact">Get Your Visibility Audit</a>} />
          </div>
        </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
