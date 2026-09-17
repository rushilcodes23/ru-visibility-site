import { Badge } from "@/components/ui/badge";
import { AuditCta } from "@/components/ui/audit-cta";
import { AiShift } from "@/components/ui/ai-shift";
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

const N = corpus.uniqueDomains.toLocaleString("en-US");

function fmtDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/* ── Crawler blocking, grouped ──────────────────────────────────────────
   Eleven individual bots is more precision than the finding needs. What
   actually matters is the split: bots that feed live AI answers, bots that
   only collect training data, and classic search. Grouping makes the real
   pattern visible in one glance; the per-bot table is still below.         */
const GROUPS = [
  {
    name: "Feed live AI answers",
    match: /SearchBot|ChatGPT-User|Claude-User|PerplexityBot|Perplexity-User/,
    meaning: "Block these and you cannot be cited in ChatGPT, Claude or Perplexity answers.",
  },
  {
    name: "Collect training data only",
    match: /^(GPTBot|ClaudeBot|CCBot)$/,
    meaning: "Blocking these is a legitimate choice. It does not affect whether you get cited today.",
  },
  {
    name: "Classic search",
    match: /Googlebot|Bingbot/,
    meaning: "Blocking these removes you from Google or Bing. Almost always an accident.",
  },
];

const grouped = GROUPS.map((g) => {
  const rows = crawlerBlocks.filter((b) => g.match.test(b.crawler));
  const pcts = rows.map((r) => r.blockedPct);
  return {
    ...g,
    low: Math.min(...pcts),
    high: Math.max(...pcts),
    crawlers: rows.map((r) => r.crawler),
  };
});

/* ── Problems, all pointing the same way ────────────────────────────────
   The previous version mixed "96.7% have no press section" (bad) with
   "100% enforce HTTPS" (good) in one table, so a long bar meant nothing on
   its own. Every row here is a problem, and higher always means worse.
   `invert` flips a signal stored as a positive.                            */
type Row = { key: keyof typeof universal; label: string; note: string; invert?: boolean };

const PROBLEMS: Row[] = [
  { key: "noPressSection", label: "No press or “as featured in” section", note: "Nothing independent vouching for them" },
  { key: "anyTable", label: "No comparison table anywhere", note: "Tables are the format AI lifts intact", invert: true },
  { key: "anyFaqBlock", label: "No FAQ block", note: "The shape AI answers quote from", invert: true },
  { key: "noSameAs", label: "No sameAs links in their schema", note: "Their own profiles left undeclared" },
  { key: "missingMetaSomewhere", label: "Missing a meta description somewhere", note: "Google writes its own instead" },
  { key: "missingH1Somewhere", label: "Missing an H1 somewhere", note: "A page with no stated topic" },
];

const MORE: Row[] = [
  { key: "multipleH1Somewhere", label: "More than one H1 on a page", note: "Competing topic signals" },
  { key: "missingCanonicalSomewhere", label: "Missing a canonical tag somewhere", note: "Duplicate-content risk" },
  { key: "anySchema", label: "No structured data at all", note: "Nothing machine-readable to parse", invert: true },
  { key: "sitemapFound", label: "No working XML sitemap", note: "Crawlers left to guess the page list", invert: true },
  { key: "brokenInternalLinks", label: "Broken internal links in a 10-link sample", note: "Dead ends for crawlers and people" },
  { key: "anyNoindex", label: "A noindex tag on a crawled page", note: "Sometimes deliberate, often not" },
  { key: "redirectChains", label: "Redirect chains longer than one hop", note: "Wasted crawl budget" },
];

const share = (r: Row) =>
  r.invert ? Math.round((100 - universal[r.key].sitesPct) * 10) / 10 : universal[r.key].sitesPct;

const problems = [...PROBLEMS].sort((a, b) => share(b) - share(a));
const more = [...MORE].sort((a, b) => share(b) - share(a));

function Bar({ pct }: { pct: number }) {
  return (
    <div aria-hidden="true" className="h-1.5 rounded-full bg-primary/10 overflow-hidden">
      <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
    </div>
  );
}

export default function ResearchPage() {
  return (
    <>
      <div className="page-surface w-full py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="page-head flex flex-col gap-4 items-start max-w-3xl mb-12">
              <Badge>Research</Badge>
              <h1 className="text-3xl md:text-5xl tracking-tighter font-regular text-left">
                What we found auditing {N} websites.
              </h1>
              <p className="text-lg leading-relaxed tracking-tight text-muted-foreground text-left">
                We crawled and scored {N} real business websites with our own
                audit tool between {fmtDate(corpus.firstAudit)} and{" "}
                {fmtDate(corpus.lastAudit)}. No site is named. None were
                clients — most never heard from us.
              </p>
            </div>
          </ScrollReveal>

          {/* The whole study in one sentence, before any table. */}
          <ScrollReveal delay={100}>
            <div className="card-surface rounded-md p-6 md:p-10 mb-14 max-w-4xl">
              <p className="text-xl md:text-2xl leading-snug tracking-tight">
                Most of these businesses have a perfectly decent website and are
                nearly invisible to AI.{" "}
                <span className="text-muted-foreground">
                  They average {scores.seo.mean} out of 100 on conventional SEO
                  but only {scores.geo.mean} on AI visibility — and out of all{" "}
                  {N} sites, exactly {scores.geo.grades.A ?? 0} scored an A.
                </span>
              </p>

              {/* No stat row here on purpose — the section immediately below
                  carries these same numbers, and repeating them two screens
                  apart made the page feel longer than it is. */}
            </div>
          </ScrollReveal>

          {/* Plain-English argument first. The tables below are the evidence
              for it, but a business owner should not have to read a crawler
              table to find out why any of this concerns them. */}
          <div className="mb-16">
            <AiShift heading="What this means if you run one of these businesses" />
          </div>

          <ScrollReveal delay={100}>
            <div className="mb-14">
              <h2 className="text-2xl tracking-tight mb-2 md:text-3xl">
                Who they block
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6 max-w-3xl">
                Sites block the crawlers that only take training data about
                twice as often as the ones that decide whether you get cited.
                That is mostly working as intended.
              </p>

              <div className="grid gap-4 md:grid-cols-3">
                {grouped.map((g) => (
                  <div key={g.name} className="card-surface rounded-md p-6 flex flex-col gap-3">
                    <span className="text-3xl tracking-tighter font-medium tabular-nums">
                      {g.low === g.high ? `${g.low}%` : `${g.low}–${g.high}%`}
                    </span>
                    <span className="font-medium text-sm">{g.name}</span>
                    <Bar pct={g.high} />
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {g.meaning}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="mb-14">
              <h2 className="text-2xl tracking-tight mb-2 md:text-3xl">
                What was wrong, most often first
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6 max-w-3xl">
                Share of the {N} sites with each problem. Every bar points the
                same way: longer is worse.
              </p>

              {/* Capped: a bar stretched the full container width pushes its
                  label and its number so far apart they read as unrelated. */}
              <div className="card-surface rounded-md divide-y max-w-4xl">
                {problems.map((r) => (
                  <div key={r.key} className="p-5 flex flex-col gap-2">
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="font-medium text-sm">{r.label}</span>
                      <span className="tabular-nums text-sm shrink-0">{share(r)}%</span>
                    </div>
                    <Bar pct={share(r)} />
                    <span className="text-muted-foreground text-xs">{r.note}</span>
                  </div>
                ))}
              </div>

              <details className="group mt-4 max-w-4xl">
                <summary className="cursor-pointer text-sm text-foreground hover:text-muted-foreground transition-colors list-none flex items-center gap-2 min-h-11 underline underline-offset-4 decoration-muted-foreground/40">
                  <span className="inline-block transition-transform group-open:rotate-90">
                    ›
                  </span>
                  Seven more checks, and the three things nearly everyone gets right
                </summary>

                <div className="card-surface rounded-md divide-y mt-3">
                  {more.map((r) => (
                    <div key={r.key} className="p-5 flex flex-col gap-2">
                      <div className="flex items-baseline justify-between gap-4">
                        <span className="font-medium text-sm">{r.label}</span>
                        <span className="tabular-nums text-sm shrink-0">{share(r)}%</span>
                      </div>
                      <Bar pct={share(r)} />
                      <span className="text-muted-foreground text-xs">{r.note}</span>
                    </div>
                  ))}
                </div>

                <div className="card-surface rounded-md p-5 mt-3">
                  <h3 className="font-medium text-sm mb-3">Nearly everyone gets these right</h3>
                  <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                    <li>
                      <span className="tabular-nums text-foreground">
                        {universal.httpsEnforced.sitesPct}%
                      </span>{" "}
                      enforce HTTPS
                    </li>
                    <li>
                      <span className="tabular-nums text-foreground">
                        {universal.sitemapFound.sitesPct}%
                      </span>{" "}
                      have a working XML sitemap
                    </li>
                    <li>
                      <span className="tabular-nums text-foreground">
                        {universal.anySchema.sitesPct}%
                      </span>{" "}
                      have some structured data
                    </li>
                  </ul>
                </div>

                <div className="card-surface rounded-md overflow-x-auto mt-3">
                  <table className="w-full text-sm">
                    <caption className="sr-only">
                      Share of audited sites blocking each individual crawler
                    </caption>
                    <thead>
                      <tr className="border-b">
                        <th scope="col" className="text-left font-medium p-4">Crawler</th>
                        <th scope="col" className="text-right font-medium p-4">Blocked on</th>
                      </tr>
                    </thead>
                    <tbody>
                      {crawlerBlocks.map((b) => (
                        <tr key={b.crawler} className="border-b last:border-0">
                          <th scope="row" className="text-left font-normal p-4 whitespace-nowrap">
                            {b.crawler}
                          </th>
                          <td className="p-4 text-right tabular-nums whitespace-nowrap">
                            {b.blockedPct}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </details>
            </div>
          </ScrollReveal>

          <div className="grid gap-6 lg:grid-cols-2">
            <ScrollReveal delay={100}>
              <div className="card-surface rounded-md p-6 md:p-8 h-full">
                <h2 className="text-xl tracking-tight mb-4 md:text-2xl">How we measured it</h2>
                <ul className="flex flex-col gap-3 text-muted-foreground text-sm leading-relaxed">
                  <li>
                    A sample of pages per site, drawn from the sitemap and
                    homepage navigation, using the same tool we run for clients.
                  </li>
                  <li>
                    Eleven crawlers tested with their full published user-agent
                    strings, not short tokens — the shortcut produces false
                    negatives on exactly the sites that block hardest.
                  </li>
                  <li>
                    A normal browser request ran first on every site. If it
                    failed, nothing is reported — so downtime and geo-blocking
                    are never recorded as bot-blocking.
                  </li>
                  <li>
                    One audit per domain, the most recent. Of{" "}
                    {corpus.jsonFilesScanned.toLocaleString("en-US")} files
                    scanned,{" "}
                    {corpus.nonAuditFilesSkipped.toLocaleString("en-US")} were
                    not audit records and were excluded.
                  </li>
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <div className="card-surface rounded-md p-6 md:p-8 h-full">
                <h2 className="text-xl tracking-tight mb-4 md:text-2xl">What this does not show</h2>
                <ul className="flex flex-col gap-3 text-muted-foreground text-sm leading-relaxed">
                  <li>
                    <strong className="text-foreground font-medium">
                      This is not a random sample of the web.
                    </strong>{" "}
                    Every site came from a prospect list in a specific industry
                    and city — clinics in the UAE, local service businesses
                    across US metros, dental practices in France. Small
                    independent businesses are heavily over-represented. Read
                    these as true of businesses like these, not of the internet.
                  </li>
                  <li>
                    A few checks arrived partway through and could not be
                    answered for every site. They are reported against their own
                    denominators, never averaged into the rest:{" "}
                    {Object.entries(subsetOnly)
                      .map(([k, v]) => `${k} (n=${v.denominator.toLocaleString("en-US")})`)
                      .join(", ")}
                    .
                  </li>
                  <li>
                    Two parts of the GEO score depend on what other sites say
                    about a business, which cannot be measured by crawling its
                    own site. Those are reported unverified rather than guessed
                    — so the real picture is, if anything, slightly worse than
                    the averages above.
                  </li>
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
      <AuditCta />
    </>
  );
}
