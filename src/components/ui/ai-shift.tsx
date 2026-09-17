import ScrollReveal from "@/components/scroll-reveal";
import CountUp from "@/components/count-up";
import findings from "@/lib/research-findings.json";

const { corpus, scores, segments, universal } = findings;

/**
 * The one argument this business rests on, in the order a buyer needs it:
 * what customers now do, what that means for a business that ignores it, and
 * what we actually measured.
 *
 * Every number here is either our own audit data or a cited third-party
 * survey. Nothing is estimated, and nothing about how the audit scores is
 * disclosed — see scripts/aggregate-findings.mjs.
 */

/** What each market's numbers mean in plain terms, not as a metric. */
const MARKET_NOTES: Record<string, string> = {
  "dental-us":
    "The biggest group we have looked at. Most of these practices rank perfectly well on Google and have simply never been set up for anything else — which is why the gap between their two scores is the widest of any market here.",
  "dental-fr":
    "The weakest of the markets we audited. Four in five have no FAQ content for an AI to quote and no declared profiles to confirm who they are, so an AI asked to recommend a practice has very little to work with.",
  "dental-dubai":
    "A crowded, heavily-marketed market where most clinics already spend on advertising. They score about the same on AI visibility as practices that spend nothing, because the two are not the same problem.",
  "dental-ad":
    "The lowest average AI visibility of any market here, and the highest share actively blocking an AI crawler that decides citations — usually without meaning to.",
  "hair-uae":
    "A small sample and treated as such, but the pattern is the same one every other market shows.",
};

function pctOf(n: number) {
  return Math.round(n);
}

export function AiShift({ heading = "Why this matters now" }: { heading?: string }) {
  const featured = segments.filter((s) => s.sites >= 20);

  return (
    <div className="w-full">
      <ScrollReveal>
        <div className="max-w-3xl mb-10">
          <h2 className="text-2xl md:text-4xl tracking-tighter mb-4">{heading}</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Two things happened at once. Customers started asking AI for
            recommendations, and almost no business got ready for it. That gap
            is the whole opportunity, and it is closing.
          </p>
        </div>
      </ScrollReveal>

      {/* Demand side — third-party, cited. */}
      <ScrollReveal delay={100}>
        <div className="grid gap-4 md:grid-cols-2 mb-4">
          <div className="card-surface rounded-md p-6 md:p-8 flex flex-col gap-3">
            <span className="text-4xl md:text-5xl tracking-tighter font-medium">
              <CountUp value={45} suffix="%" />
            </span>
            <p className="text-foreground font-medium">
              of shoppers used AI to find a local business in the last year
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              It was 6% the year before. Including Google&apos;s own AI answers
              it reaches 76%. Your customers did not announce this change —
              they just started doing it.
            </p>
            <a
              href="https://www.brightlocal.com/research/local-consumer-review-survey/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors w-fit"
            >
              BrightLocal, Local Consumer Review Survey 2026
            </a>
          </div>

          <div className="card-surface rounded-md p-6 md:p-8 flex flex-col gap-3">
            <span className="text-4xl md:text-5xl tracking-tighter font-medium">
              <CountUp value={scores.geo.grades.A ?? 0} /> in{" "}
              <CountUp value={corpus.uniqueDomains} />
            </span>
            <p className="text-foreground font-medium">
              businesses we audited were genuinely ready for it
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Exactly one site out of {corpus.uniqueDomains.toLocaleString("en-US")} scored
              an A for AI visibility. The same sites average{" "}
              {scores.seo.mean} out of 100 on ordinary Google SEO — so this is
              not a story about bad websites. It is a story about websites
              built for a different decade.
            </p>
            <span className="text-xs text-muted-foreground">
              Our own audits, {corpus.firstAudit} to {corpus.lastAudit}
            </span>
          </div>
        </div>
      </ScrollReveal>

      {/* The mechanism, in plain words. */}
      <ScrollReveal delay={150}>
        <div className="card-surface rounded-md p-6 md:p-8 mb-4">
          <h3 className="text-lg md:text-xl tracking-tight mb-4">
            What actually goes wrong
          </h3>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex flex-col gap-2">
              <span className="text-2xl tracking-tighter font-medium">
                <CountUp value={universal.noPressSection.sitesPct} decimals={1} suffix="%" />
              </span>
              <p className="text-sm font-medium">
                have nothing independent to point to
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                No press, no coverage, nothing outside their own marketing. An
                AI asked &ldquo;who is good at this&rdquo; looks for other
                people saying so, finds nothing, and names someone else.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-2xl tracking-tighter font-medium">
                <CountUp value={universal.noSameAs.sitesPct} decimals={1} suffix="%" />
              </span>
              <p className="text-sm font-medium">
                never told anyone their profiles are theirs
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Their social and directory pages exist, but nothing on the site
                connects them. An AI cannot confirm it is all one business, and
                an unconfirmed match rarely gets recommended by name.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-2xl tracking-tighter font-medium">
                <CountUp
                  value={pctOf(100 - universal.anyFaqBlock.sitesPct)}
                  suffix="%"
                />
              </span>
              <p className="text-sm font-medium">
                answer no questions on the page
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                AI answers are built by lifting short, direct passages. A page
                of flowing brochure copy gives it nothing to quote, even when
                it is the best answer available.
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Per-market, as a disclosure so nobody has to read all of it. */}
      <ScrollReveal delay={200}>
        <div>
          <h3 className="text-lg md:text-xl tracking-tight mb-1">
            Is it different in your industry?
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4 max-w-2xl">
            Tap a market to see what we measured there. These are the
            industries we have audited so far — if yours is not listed, the
            honest answer is that we have not tested it yet.
          </p>

          <div className="flex flex-col gap-2 max-w-3xl">
            {featured.map((s) => (
              <details key={s.key} className="group card-surface rounded-md overflow-hidden">
                <summary className="flex items-center justify-between gap-4 p-4 md:p-5 cursor-pointer list-none min-h-11 transition-colors hover:bg-primary/5">
                  <span className="flex flex-col gap-0.5">
                    <span className="font-medium text-sm md:text-base">
                      {s.industry} · {s.market}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      {s.sites.toLocaleString("en-US")} sites audited
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-90"
                  >
                    ›
                  </span>
                </summary>

                <div className="px-4 md:px-5 pb-5 pt-0 flex flex-col gap-4 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-top-1 motion-safe:duration-200">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {MARKET_NOTES[s.key]}
                  </p>
                  <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { k: "Google SEO, average", v: `${s.seoMean}` },
                      { k: "AI visibility, average", v: `${s.geoMean}` },
                      { k: "no declared profiles", v: `${s.noSameAsPct}%` },
                      { k: "no questions answered", v: `${s.noFaqPct}%` },
                    ].map((m) => (
                      <div key={m.k} className="flex flex-col gap-1">
                        <dt className="sr-only">{m.k}</dt>
                        <dd className="text-xl tracking-tighter font-medium tabular-nums">
                          {m.v}
                        </dd>
                        <span aria-hidden="true" className="text-muted-foreground text-xs leading-snug">
                          {m.k}
                        </span>
                      </div>
                    ))}
                  </dl>
                </div>
              </details>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
