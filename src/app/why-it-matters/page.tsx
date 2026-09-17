import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AuditCta } from "@/components/ui/audit-cta";
import { Search, Bot, Accessibility, TrendingDown } from "lucide-react";
import { formatPostDate } from "@/lib/posts";
import { pageMetadata } from "@/lib/seo";
import findings from "@/lib/research-findings.json";

// The date this page's substance was last changed, not the build date. Per
// CONTENT_RULES.md it only moves when the content genuinely does.
const REVIEWED = "2026-09-17";

/**
 * Every figure here is linked to its source. Nothing is quoted from memory,
 * and no figure appears that could not be checked at the link beside it.
 */
const EVIDENCE = [
  {
    stat: "45%",
    claim: "of shoppers used AI to find a local business in the past year",
    detail: "Up from 6% the year before. Counting Google's own AI answers, it reaches 76%.",
    source: "BrightLocal, Local Consumer Review Survey 2026",
    href: "https://www.brightlocal.com/research/local-consumer-review-survey/",
  },
  {
    stat: "+41%",
    claim: "visibility gain from adding a quoted passage",
    detail: "Adding statistics and citing sources follow close behind. Keyword stuffing measured worse than making no change at all.",
    source: "GEO, ACM SIGKDD 2024",
    href: "https://dl.acm.org/doi/10.1145/3637528.3671900",
  },
  {
    stat: `1 in ${findings.corpus.uniqueDomains.toLocaleString("en-US")}`,
    claim: "businesses we audited were genuinely ready for it",
    detail: `The same sites average ${findings.scores.seo.mean} out of 100 on ordinary Google SEO. This is not a story about bad websites.`,
    source: "Our own audits — see the method",
    href: "/research",
  },
];

export const metadata = pageMetadata({
  path: "/why-it-matters",
  title: "Why SEO & GEO Matter for Your Business | Ru Visibility",
  description: "Why AI visibility and search rankings matter now — and what it actually costs a business to stay invisible to both.",
});

const REASONS = [
  {
    icon: Search,
    title: "Google still decides who gets found first",
    body: "Most people still start looking for a business by searching. If your site has technical issues keeping Google from crawling or ranking it properly, you're invisible to that search before a person ever sees you — no matter how good the business actually is.",
  },
  {
    icon: Bot,
    title: "AI tools are becoming a second front door",
    body: "People are increasingly asking ChatGPT, Gemini, and Perplexity directly for recommendations instead of typing into a search bar. If those tools can't read your site, don't know what you offer, or have no reason to recommend you over a competitor, you're invisible there too — a channel that barely existed a few years ago.",
  },
  {
    icon: Accessibility,
    title: "Accessibility is a real legal exposure, not a nice-to-have",
    body: "ADA-style web accessibility lawsuits are a real and growing category of legal risk for businesses with an online presence. It's also simply more customers you can actually serve — visitors using a screen reader or keyboard navigation are real potential customers, not an edge case.",
  },
  {
    icon: TrendingDown,
    title: "Doing nothing has a cost, even if it's invisible to you",
    body: "If a competitor shows up — on Google, on an AI answer, or both — and you don't, they get the customer instead. That loss doesn't show up as an error message anywhere. It just looks like a customer who went somewhere else.",
  },
];

export default function WhyItMattersPage() {
  return (
    <div className="page-surface w-full py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="page-head flex flex-col gap-4 items-start max-w-2xl mb-16">
          <Badge>Why It Matters</Badge>
          <h1 className="text-3xl md:text-5xl tracking-tighter font-regular text-left">
            Why SEO and GEO actually matter.
          </h1>
          <p className="text-lg leading-relaxed tracking-tight text-muted-foreground text-left">
            Not marketing speak — the actual reasons this isn&apos;t optional
            anymore for a business with a website.
          </p>
          <p className="text-sm text-muted-foreground">
            By Rushil A. Bajpai, founder · Last reviewed{" "}
            <time dateTime={REVIEWED}>{formatPostDate(REVIEWED)}</time>
          </p>
        </div>

        <h2 className="text-2xl tracking-tight mb-6 max-w-2xl">
          Four reasons this isn&apos;t optional anymore
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-16">
          {REASONS.map((r) => (
            <div key={r.title} className="card-surface rounded-md p-6 flex flex-col gap-3 transition-transform duration-200 hover:scale-[1.02]">
              <r.icon className="w-8 h-8 stroke-1" />
              <h3 className="text-xl tracking-tight">{r.title}</h3>
              <p className="text-muted-foreground text-base leading-relaxed">
                {r.body}
              </p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl tracking-tight mb-3 max-w-2xl">
          What the evidence actually says
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-8 max-w-3xl">
          Three findings, each linked to its source so you can check it rather
          than take our word for it.
        </p>

        <div className="grid gap-6 md:grid-cols-3 mb-16">
          {EVIDENCE.map((e) => (
            <div key={e.stat} className="card-surface rounded-md p-6 flex flex-col gap-3">
              <span className="text-3xl md:text-4xl tracking-tighter font-medium">
                {e.stat}
              </span>
              <p className="text-foreground font-medium text-sm">{e.claim}</p>
              <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                {e.detail}
              </p>
              <a
                href={e.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors w-fit"
              >
                {e.source}
              </a>
            </div>
          ))}
        </div>

        {/* A position already stated on /about, marked up as the quotation it
            is. AI answers lift self-contained quoted passages; this was one,
            it just wasn't marked as one. */}
        <figure className="max-w-3xl mb-16">
          <blockquote className="rounded-md border-l-4 border-primary bg-muted py-5 pl-6 pr-5 text-lg font-medium leading-relaxed text-foreground md:text-xl">
            I will not promise you a ranking or a guaranteed AI citation,
            because nobody can honestly promise either. What I can do is
            measure where you stand now, fix what is genuinely holding you
            back, and show you the before and after using the same prompts
            both times.
          </blockquote>
          <figcaption className="text-muted-foreground text-sm mt-3">
            — Rushil A. Bajpai, founder,{" "}
            <a href="/about" className="underline underline-offset-4">
              Ru Visibility
            </a>
          </figcaption>
        </figure>

        <div className="mt-12 card-surface rounded-md p-6 md:p-8">
          <p className="text-muted-foreground leading-relaxed mb-6">
            None of this means you need to panic — it means it&apos;s worth
            actually checking where you stand today, rather than guessing.
            That&apos;s what the audit is for.
          </p>
          <Button size="lg" render={<a href="#audit">Get Your Visibility Audit</a>} />
        </div>
      </div>
      <AuditCta />
    </div>
  );
}
