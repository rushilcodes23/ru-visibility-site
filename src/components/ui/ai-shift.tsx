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
    "The biggest group we looked at. Most of these clinics do fine on Google and were simply never set up for anything else. That is why the gap between their two scores is the widest here.",
  "dental-fr":
    "The weakest group we checked. Four in five answer no questions on their site and never link their own pages together — so when AI is asked to recommend a clinic, it has almost nothing to go on.",
  "dental-dubai":
    "A crowded market where most clinics already pay for advertising. They score about the same on AI as clinics that spend nothing, because advertising and AI are two different problems.",
  "dental-ad":
    "The lowest AI score of any group here, and the most likely to be turning AI away at the door — usually by accident.",
  "hair-uae":
    "A small group, so treat it lightly. The pattern is the same as everywhere else.",
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
            Two things happened at the same time. People started asking AI
            who to use. Almost no business got ready for it. That gap is the
            opportunity — and it is closing.
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
              of shoppers used AI to find a local business last year
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              The year before it was 6%. Count Google&apos;s own AI answers
              and it reaches 76%. Nobody announced this. Your customers just
              quietly started doing it.
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
              of the businesses we checked were actually ready
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              One site out of {corpus.uniqueDomains.toLocaleString("en-US")} scored
              an A for AI. Those same sites score {scores.seo.mean} out of 100
              on normal Google search. So these are not bad websites. They are
              good websites, built for a world that has moved on.
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
            So what is actually going wrong?
          </h3>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex flex-col gap-2">
              <span className="text-2xl tracking-tighter font-medium">
                <CountUp value={universal.noPressSection.sitesPct} decimals={1} suffix="%" />
              </span>
              <p className="text-sm font-medium">
                have nobody but themselves saying they are good
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                No news story, no write-up, nothing outside their own website.
                Ask AI &ldquo;who is good at this?&rdquo; and it goes looking
                for other people saying so. It finds none, and names someone
                else instead.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-2xl tracking-tighter font-medium">
                <CountUp value={universal.noSameAs.sitesPct} decimals={1} suffix="%" />
              </span>
              <p className="text-sm font-medium">
                never linked their own social pages to their website
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Their Instagram and LinkedIn pages exist. Their website just
                never points at them. So AI cannot be sure it is all the same
                business — and when it is not sure, it stays quiet about you.
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
                never answer a single question on their site
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                AI answers by copying out a short, clear sentence. Pages full
                of long flowery paragraphs give it nothing to copy — even when
                that business really is the best answer.
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
            Tap one to see what we found there. These are the industries we
            have checked so far. If yours is not here, the honest answer is
            that we have not tested it yet.
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
                      { k: "average score on Google", v: `${s.seoMean}` },
                      { k: "average score on AI", v: `${s.geoMean}` },
                      { k: "never linked their own pages", v: `${s.noSameAsPct}%` },
                      { k: "answer no questions", v: `${s.noFaqPct}%` },
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
