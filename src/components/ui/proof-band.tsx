import ScrollReveal from "@/components/scroll-reveal";
import CountUp from "@/components/count-up";
import { LOCATIONS } from "@/lib/locations";
import findings from "@/lib/research-findings.json";

const { corpus } = findings;

/**
 * Four real numbers, early on the homepage, so a visitor sees evidence before
 * any claim. Each one is checkable: the audit count and crawler count come
 * from our own data file, the market count from src/lib/locations.ts, and the
 * demand figure is a cited third-party survey.
 *
 * No rounding up. The audited figure is deduplicated by domain, which is why
 * it is 1,503 rather than the larger raw file count.
 */
const STATS = [
  {
    value: corpus.uniqueDomains,
    label: "websites audited",
    detail: "Real businesses, crawled and scored with our own tool.",
    href: "/research",
  },
  {
    value: LOCATIONS.length,
    label: "markets we work in",
    detail: "Across the US, India and internationally.",
    href: "/locations",
  },
  {
    value: 11,
    label: "AI crawlers we test for",
    detail: "ChatGPT, Claude, Perplexity, Google and Bing, by their real names.",
    href: "/research",
  },
  {
    value: 45,
    suffix: "%",
    label: "of shoppers now use AI to find a local business",
    detail: "Up from 6% a year earlier — BrightLocal, 2026.",
    href: "https://www.brightlocal.com/research/local-consumer-review-survey/",
    external: true,
  },
];

export function ProofBand() {
  return (
    <section className="page-surface w-full border-t py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 max-w-6xl mx-auto">
            {STATS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                {...(s.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex flex-col gap-2 rounded-md -m-2 p-2 transition-colors hover:bg-primary/5 focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
              >
                <span className="text-3xl md:text-5xl tracking-tighter font-medium tabular-nums transition-transform duration-300 group-hover:-translate-y-0.5">
                  <CountUp value={s.value} suffix={s.suffix ?? ""} />
                </span>
                <span className="text-sm font-medium leading-snug">{s.label}</span>
                {/* Hidden on phones on purpose — four stat tiles plus four
                    explanations is a wall of text on a 390px screen. */}
                <span className="hidden md:block text-muted-foreground text-sm leading-relaxed">
                  {s.detail}
                </span>
              </a>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
