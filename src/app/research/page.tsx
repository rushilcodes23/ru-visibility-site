import { Badge } from "@/components/ui/badge";
import { AuditCta } from "@/components/ui/audit-cta";
import ScrollReveal from "@/components/scroll-reveal";
import { pageMetadata } from "@/lib/seo";
import findings from "@/lib/research-findings.json";

export const metadata = pageMetadata({
  path: "/research",
  title: "What We Found Auditing 1,503 Websites | Ru Visibility",
  description:
    "Aggregate results from every site audit we have run: AI crawler blocking, schema gaps, and why GEO scores trail SEO scores on almost every site.",
  type: "article",
});

// Deliberately does not destructure component weights or recommendation ids —
// those describe how the audit tool scores, which stays private. See the
// header of scripts/aggregate-findings.mjs.
const { corpus, scores, crawlerBlocks, universal, subsetOnly } = findings;

function fmtDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const HEADLINES = [
  {
    stat: corpus.uniqueDomains.toLocaleString("en-US"),
    label: "websites audited",
    detail: `Every site we crawled between ${fmtDate(corpus.firstAudit)} and ${fmtDate(corpus.lastAudit)}, deduplicated by domain.`,
  },
  {
    stat: `${scores.geo.mean} vs ${scores.seo.mean}`,
    label: "average GEO score vs average SEO score",
    detail:
      "The same sites score fifteen points worse on AI visibility than on conventional SEO. This gap is the single clearest pattern in the data.",
  },
  {
    stat: `${scores.geo.grades.A ?? 0}`,
    label: `sites out of ${corpus.uniqueDomains.toLocaleString("en-US")} scored an A for GEO`,
    detail: `By comparison ${(scores.seo.grades.A ?? 0).toLocaleString("en-US")} scored an A for SEO. Almost nobody is doing this well yet — which is the opportunity.`,
  },
  {
    stat: `${universal.noSameAs.sitesPct}%`,
    label: "have no sameAs links in their schema",
    detail:
      "The cheapest off-site signal there is — markup listing the profiles a business already runs. Half of all sites skip it entirely.",
  },
];

/** Universal signals only — every one of these was answerable on all records. */
const FINDINGS_TABLE: { key: keyof typeof universal; label: string; note: string }[] = [
  { key: "noPressSection", label: "No press or “as featured in” section", note: "Nothing independent to point at" },
  { key: "noSameAs", label: "No sameAs links in schema", note: "Profiles exist but aren't declared" },
  { key: "missingMetaSomewhere", label: "Missing a meta description on at least one page", note: "Google writes its own instead" },
  { key: "missingH1Somewhere", label: "Missing an H1 on at least one page", note: "No stated topic for that page" },
  { key: "multipleH1Somewhere", label: "More than one H1 on at least one page", note: "Competing topic signals" },
  { key: "missingCanonicalSomewhere", label: "Missing a canonical tag on at least one page", note: "Duplicate-content risk" },
  { key: "anyNoindex", label: "A noindex tag on at least one crawled page", note: "Sometimes deliberate, often not" },
  { key: "brokenInternalLinks", label: "Broken internal links in a 10-link sample", note: "Dead ends for crawlers and people" },
  { key: "redirectChains", label: "Redirect chains longer than one hop", note: "Wasted crawl budget" },
  { key: "anyFaqBlock", label: "Have at least one FAQ block", note: "The shape AI answers lift from" },
  { key: "anyTable", label: "Have at least one table", note: "Tables get lifted intact by AI systems" },
  { key: "sitemapFound", label: "Have a working XML sitemap", note: "Found and parsed successfully" },
  { key: "anySchema", label: "Have any structured data at all", note: "One or more JSON-LD blocks" },
  { key: "httpsEnforced", label: "Enforce HTTPS", note: "The one thing almost everyone gets right" },
];

export default function ResearchPage() {
  return (
    <>
      <div className="page-surface w-full py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="page-head flex flex-col gap-4 items-start max-w-3xl mb-14">
              <Badge>Research</Badge>
              <h1 className="text-3xl md:text-5xl tracking-tighter font-regular text-left">
                What we found auditing {corpus.uniqueDomains.toLocaleString("en-US")} websites.
              </h1>
              <p className="text-lg leading-relaxed tracking-tight text-muted-foreground text-left">
                Between {fmtDate(corpus.firstAudit)} and {fmtDate(corpus.lastAudit)} we
                crawled and scored {corpus.uniqueDomains.toLocaleString("en-US")} real
                business websites with our own audit tool, as part of outreach
                research across several industries and cities. These are the
                aggregate results. No site is named, and none of these were
                clients — they were businesses we looked at, most of whom never
                heard from us.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-20">
              {HEADLINES.map((h) => (
                <div key={h.label} className="card-surface rounded-md p-6 md:p-8 flex flex-col gap-2">
                  <span className="text-4xl md:text-5xl tracking-tighter font-medium">
                    {h.stat}
                  </span>
                  <span className="text-foreground font-medium text-sm">{h.label}</span>
                  <p className="text-muted-foreground text-sm leading-relaxed">{h.detail}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="mb-20">
              <h2 className="text-2xl tracking-tight mb-3 md:text-3xl">
                How many sites block AI crawlers
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6 max-w-3xl">
                Each crawler was tested with its full published user-agent
                string against the site&apos;s robots.txt and its actual server
                response. A control request with a normal browser user-agent ran
                first, so a site that was simply down or geo-blocked is not
                counted here as blocking a bot.
              </p>
              <div className="card-surface rounded-md overflow-x-auto">
                <table className="w-full text-sm">
                  <caption className="sr-only">
                    Share of audited sites blocking each crawler
                  </caption>
                  <thead>
                    <tr className="border-b">
                      <th scope="col" className="text-left font-medium p-4">Crawler</th>
                      <th scope="col" className="text-left font-medium p-4">What it affects</th>
                      <th scope="col" className="text-right font-medium p-4">Blocked on</th>
                    </tr>
                  </thead>
                  <tbody>
                    {crawlerBlocks.map((b) => (
                      <tr key={b.crawler} className="border-b last:border-0">
                        <th scope="row" className="text-left font-normal p-4 whitespace-nowrap">
                          {b.crawler}
                        </th>
                        <td className="p-4 text-muted-foreground">
                          {/GPTBot|ClaudeBot|CCBot/.test(b.crawler)
                            ? "Training data only"
                            : /Googlebot|Bingbot/.test(b.crawler)
                              ? "Classic search"
                              : "AI answers"}
                        </td>
                        <td className="p-4 text-right tabular-nums whitespace-nowrap">
                          {b.blockedPct}%{" "}
                          <span className="text-muted-foreground">
                            ({b.blockedCount.toLocaleString("en-US")})
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mt-4 max-w-3xl">
                The training-only crawlers are blocked roughly three times as
                often as the ones that feed live AI answers. That pattern is
                consistent with sites installing a generic &ldquo;block AI
                scrapers&rdquo; rule — and it mostly does what they intended.
                The more expensive mistake is the {universal.noSameAs.sitesPct}%
                with no sameAs markup, which costs visibility without anyone
                choosing it.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="mb-20">
              <h2 className="text-2xl tracking-tight mb-3 md:text-3xl">
                What was wrong, and how often
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6 max-w-3xl">
                Every row below was answerable on all{" "}
                {corpus.uniqueDomains.toLocaleString("en-US")} sites, so every
                percentage shares the same denominator.
              </p>
              <div className="card-surface rounded-md overflow-x-auto">
                <table className="w-full text-sm">
                  <caption className="sr-only">
                    Frequency of each finding across all audited sites
                  </caption>
                  <thead>
                    <tr className="border-b">
                      <th scope="col" className="text-left font-medium p-4">Finding</th>
                      <th scope="col" className="text-left font-medium p-4">Why it matters</th>
                      <th scope="col" className="text-right font-medium p-4">Share of sites</th>
                    </tr>
                  </thead>
                  <tbody>
                    {FINDINGS_TABLE.map((row) => (
                      <tr key={row.key} className="border-b last:border-0">
                        <th scope="row" className="text-left font-normal p-4">
                          {row.label}
                        </th>
                        <td className="p-4 text-muted-foreground">{row.note}</td>
                        <td className="p-4 text-right tabular-nums whitespace-nowrap">
                          {universal[row.key].sitesPct}%{" "}
                          <span className="text-muted-foreground">
                            ({universal[row.key].count.toLocaleString("en-US")})
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid gap-6 lg:grid-cols-2">
            <ScrollReveal delay={100}>
              <div className="card-surface rounded-md p-6 md:p-8 h-full">
                <h2 className="text-2xl tracking-tight mb-4 md:text-3xl">Methodology</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Each site was crawled with the same tool we run for clients:
                  a sample of pages per site, drawn from the sitemap and
                  homepage navigation. Eleven crawler user-agents were tested
                  using their full published strings rather than short tokens,
                  and robots.txt was evaluated to spec rather than pattern-
                  matched — both matter, because the shortcuts produce false
                  negatives on exactly the sites that block most aggressively.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  A control request using an ordinary browser user-agent ran
                  first on every site. Nothing is reported for a site where that
                  control failed, so downtime and geo-blocking are never
                  recorded as bot-blocking.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Where a domain was audited more than once, only the most
                  recent audit counts. Of{" "}
                  {corpus.jsonFilesScanned.toLocaleString("en-US")} files
                  scanned, {corpus.nonAuditFilesSkipped.toLocaleString("en-US")}{" "}
                  were not audit records and were excluded rather than
                  partially counted.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <div className="card-surface rounded-md p-6 md:p-8 h-full">
                <h2 className="text-2xl tracking-tight mb-4 md:text-3xl">Limitations</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  <strong className="text-foreground font-medium">
                    This is not a random sample of the web.
                  </strong>{" "}
                  Every site here came from a prospect list in a specific
                  industry and city — healthcare clinics in the UAE, local
                  service businesses across US metros, and dental practices in
                  France. Small independent businesses are heavily
                  over-represented. Do not read these percentages as true of
                  the internet generally; read them as true of businesses like
                  these.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Some checks arrived partway through the campaign and so could
                  not be answered for every site. Those are reported against
                  their own denominators rather than the full corpus:{" "}
                  {Object.entries(subsetOnly)
                    .map(([k, v]) => `${k} (n=${v.denominator.toLocaleString("en-US")})`)
                    .join(", ")}
                  .
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Two components of the GEO score depend on what third-party
                  sites say about a business, which cannot be measured by
                  crawling that business&apos;s own site. Those points are
                  reported as unverified rather than inferred, which means the
                  real-world GEO picture is, if anything, slightly worse than
                  the averages above.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
      <AuditCta />
    </>
  );
}
