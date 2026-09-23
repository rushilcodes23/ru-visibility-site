import { Badge } from "@/components/ui/badge";
import { AuditCta } from "@/components/ui/audit-cta";
import { AiShift } from "@/components/ui/ai-shift";
import ScrollReveal from "@/components/scroll-reveal";
import { pageMetadata } from "@/lib/seo";
import findings from "@/lib/research-findings.json";

// Deliberately does not destructure component weights or recommendation ids —
// those describe how the audit tool scores, which stays private. See the
// header of scripts/aggregate-findings.mjs.
const { corpus, scores, crawlerBlocks, universal, subsetOnly } = findings;

const N = corpus.uniqueDomains.toLocaleString("en-US");

// Title reads the count rather than hardcoding it. It said 1,503 while the
// corpus had already moved on — the same drift the freshness rules in
// CONTENT_RULES.md exist to prevent, just in a <title> instead of a date.
export const metadata = pageMetadata({
  path: "/research",
  title: `What We Found Auditing ${N} Websites | Ru Visibility`,
  description:
    "Aggregate results from every site audit we have run: AI crawler blocking, schema gaps, and why GEO scores trail SEO scores on almost every site.",
  type: "article",
});

/**
 * Plain-English names for the checks that only cover part of the corpus.
 * Without this the page printed raw field names — "altTextGap (n=1,491)" —
 * at real visitors, which is unreadable to anyone who is not us.
 */
const SUBSET_LABELS: Record<string, string> = {
  altTextGap: "pictures with no description",
  businessValueScored: "extra business checks",
  complianceAccessibility: "accessibility scans",
  trackingOnForms: "tracking on contact forms",
};

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
   pattern visible in one glance; the per-bot table is still below.

   `metric` is the correction that matters here. An earlier version of this
   page headlined one number per bot — every non-OK response lumped together
   — which made it look as though ~10% of sites were shutting Google out.
   They are not. Google and Bing verify their crawlers by IP address, not by
   the name in the request, so a security rule refusing a stranger who merely
   claims to be Googlebot is behaving correctly and proves nothing about the
   real one. Exactly one site in the corpus disallows Googlebot in robots.txt.
   So those two are headlined on robotsDisallowPct — the only figure that can
   be trusted for them — while the AI crawlers, which have no such IP
   verification, are headlined on combinedPct, because for them a refusal at
   either layer genuinely keeps them out.                                    */
const GROUPS = [
  {
    name: "The ones that answer people today",
    match: /SearchBot|ChatGPT-User|Claude-User|PerplexityBot|Perplexity-User/,
    metric: "combinedPct" as const,
    meaning: "Shut these out and ChatGPT, Claude or Perplexity simply cannot mention you when someone asks. Most of this is security software, not a decision anyone made.",
  },
  {
    name: "The ones that only collect text",
    match: /^(GPTBot|ClaudeBot|CCBot)$/,
    metric: "combinedPct" as const,
    meaning: "These gather text to build future AI. Saying no is a fair choice, and it costs you nothing today.",
  },
  {
    name: "Google and Bing",
    match: /Googlebot|Bingbot/,
    metric: "robotsDisallowPct" as const,
    meaning: "Almost nobody shuts these out on purpose, and it would be a bad idea. Counted strictly: only sites whose own robots.txt says no.",
  },
];

/** Worst robots.txt refusal count among the two IP-verified crawlers. Read
 *  from the data rather than written out, so the footnote under the table
 *  cannot quietly become untrue the next time the corpus is re-aggregated. */
const ipVerifiedRobotsMax = Math.max(
  ...crawlerBlocks
    .filter((b) => /Googlebot|Bingbot/.test(b.crawler))
    .map((b) => b.robotsDisallowCount)
);

const grouped = GROUPS.map((g) => {
  const rows = crawlerBlocks.filter((b) => g.match.test(b.crawler));
  const pcts = rows.map((r) => r[g.metric]);
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
  { key: "noPressSection", label: "Nobody else has written about them", note: "No press, no mentions — only their own words" },
  { key: "anyTable", label: "No table anywhere on the site", note: "AI copies tables out whole. Nothing to copy", invert: true },
  { key: "anyFaqBlock", label: "They answer no questions", note: "No “common questions” section for AI to quote", invert: true },
  { key: "noSameAs", label: "Their social pages are not linked up", note: "So AI cannot tell it is all the same business" },
  { key: "missingMetaSomewhere", label: "A page with no short description", note: "Google then writes one for them" },
  { key: "missingH1Somewhere", label: "A page with no headline", note: "Nothing says what the page is about" },
];

const MORE: Row[] = [
  { key: "multipleH1Somewhere", label: "A page with two headlines", note: "Two answers to “what is this page?”" },
  { key: "missingCanonicalSomewhere", label: "A page that does not say it is the original", note: "Google may treat it as a copy" },
  { key: "anySchema", label: "Nothing written for machines to read", note: "Computers have to guess the basics", invert: true },
  { key: "sitemapFound", label: "No list of their own pages", note: "Search engines have to find them by luck", invert: true },
  { key: "sitemapFoundNotDeclared", label: "A page list they never told anyone about", note: "It exists and works — nothing points to it" },
  { key: "brokenInternalLinks", label: "Links on the site that lead nowhere", note: "Dead ends for people and for AI" },
  { key: "anyNoindex", label: "A page told to hide from Google", note: "Sometimes on purpose, often by accident" },
  { key: "redirectChains", label: "Pages that bounce twice before loading", note: "Slower, and easy to get wrong" },
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
              <p className="text-sm text-muted-foreground">
                Research and analysis by{" "}
                <a href="/about" className="underline underline-offset-4">
                  Rushil A. Bajpai
                </a>
                , founder · Data collected to{" "}
                <time dateTime={corpus.lastAudit ?? undefined}>
                  {fmtDate(corpus.lastAudit)}
                </time>
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
                Who they shut out
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6 max-w-3xl">
                AI companies send small programs to read your website. You can
                let them in or turn them away. Most sites turn away the ones
                that only collect text, and let in the ones that actually
                answer people — which is the sensible way round.
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
                What was wrong, starting with the most common
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6 max-w-3xl">
                How many of the {N} sites had each problem. Every bar points the
                same way, so a longer bar is always worse.
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
                  {more.length} more checks, and the three things nearly everyone gets right
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
                      have a secure padlock on their site
                    </li>
                    <li>
                      <span className="tabular-nums text-foreground">
                        {universal.sitemapFound.sitesPct}%
                      </span>{" "}
                      give search engines a list of their pages
                    </li>
                    <li>
                      <span className="tabular-nums text-foreground">
                        {universal.anySchema.sitesPct}%
                      </span>{" "}
                      label a few basics for computers to read
                    </li>
                  </ul>
                </div>

                {/* Focusable for the same reason as the services table: a
                    region that scrolls must be reachable by keyboard. */}
                <div
                  className="card-surface rounded-md overflow-x-auto mt-3 focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
                  tabIndex={0}
                  role="region"
                  aria-label="Per-crawler blocking rates, scrollable"
                >
                  <table className="w-full text-sm">
                    <caption className="sr-only">
                      Share of audited sites turning each crawler away, split by
                      whether robots.txt says so or the server refuses the request
                    </caption>
                    <thead>
                      <tr className="border-b">
                        <th scope="col" className="text-left font-medium p-4">Crawler</th>
                        <th scope="col" className="text-right font-medium p-4">Told no in robots.txt</th>
                        <th scope="col" className="text-right font-medium p-4">Refused by the server</th>
                      </tr>
                    </thead>
                    <tbody>
                      {crawlerBlocks.map((b) => (
                        <tr key={b.crawler} className="border-b last:border-0">
                          <th scope="row" className="text-left font-normal p-4 whitespace-nowrap">
                            {b.crawler}
                            {/* The two IP-verified crawlers. Without this the
                                right-hand number reads as "Google is blocked",
                                which is exactly the wrong conclusion. */}
                            {/Googlebot|Bingbot/.test(b.crawler) && (
                              <span className="text-muted-foreground"> *</span>
                            )}
                          </th>
                          <td className="p-4 text-right tabular-nums whitespace-nowrap">
                            {b.robotsDisallowPct}%
                          </td>
                          <td className="p-4 text-right tabular-nums whitespace-nowrap">
                            {b.httpBlockedPct}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p className="text-muted-foreground text-xs leading-relaxed mt-3 max-w-4xl">
                  <span aria-hidden="true">* </span>Google and Bing check their
                  own crawlers by address, not by name. So a site refusing
                  something that merely <em>says</em> it is Google is behaving
                  sensibly, and that right-hand number tells you nothing about
                  whether the real Googlebot gets in. For those two, only the
                  robots.txt column counts — and across all {N} sites, at most{" "}
                  {ipVerifiedRobotsMax} of them say no there. We report the
                  other number because we measured it, not because it means
                  anything for those two rows.
                </p>
              </details>
            </div>
          </ScrollReveal>

          <div className="grid gap-6 lg:grid-cols-2">
            <ScrollReveal delay={100}>
              <div className="card-surface rounded-md p-6 md:p-8 h-full">
                <h2 className="text-xl tracking-tight mb-4 md:text-2xl">How we measured it</h2>
                <ul className="flex flex-col gap-3 text-muted-foreground text-sm leading-relaxed">
                  <li>
                    We opened a handful of pages on each site — the same tool we
                    run for paying clients, no different version.
                  </li>
                  <li>
                    We asked each site eleven times, once pretending to be each
                    AI and search company&apos;s reader, to see which ones it
                    lets in and which it turns away.
                  </li>
                  <li>
                    Before any of that, we visited each site as a normal person
                    would. If it did not load, we threw the result away. A site
                    that was simply down never gets counted as blocking anyone.
                  </li>
                  <li>
                    Where a single request timed out or errored, we count it as
                    neither let in nor turned away. It tells us nothing either
                    way, so it is left out of both columns rather than quietly
                    counted as a block.
                  </li>
                  <li>
                    Each website counts once, using its most recent check.
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
                      These are not random websites.
                    </strong>{" "}
                    They all came from lists of businesses we were thinking of
                    contacting — dental clinics in the UAE and France, and
                    local businesses in US cities. Nearly all of them are small.
                    So these numbers are true of businesses like these. They are
                    not a fact about the whole internet.
                  </li>
                  <li>
                    We added a couple of checks partway through, so they only
                    cover some of the sites. We count those against the smaller
                    group, not all {N} —{" "}
                    {Object.entries(subsetOnly)
                      .map(([k, v]) => `${SUBSET_LABELS[k] ?? k} (${v.denominator.toLocaleString("en-US")} sites)`)
                      .join(", ")}
                    .
                  </li>
                  <li>
                    Part of the AI score depends on what <em>other</em> websites
                    say about a business. You cannot see that by reading the
                    business&apos;s own site, so we leave it blank instead of
                    guessing. That means the real picture is probably a little
                    worse than the numbers above, not better.
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
