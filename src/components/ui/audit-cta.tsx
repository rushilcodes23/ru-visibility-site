import ScrollReveal from "@/components/scroll-reveal";
import AuditRequestForm from "@/components/audit-request-form";
import { Bot, ListChecks, Gauge } from "lucide-react";

const WHAT_YOU_GET = [
  {
    icon: Bot,
    title: "Whether AI crawlers can reach you at all",
    body: "We test the eleven real crawler user-agents — OAI-SearchBot, PerplexityBot, Claude-SearchBot, Googlebot and the rest — against your robots.txt and your server. A block here makes everything else moot.",
  },
  {
    icon: Gauge,
    title: "A GEO score and an SEO score, out of 100",
    body: "With the breakdown: what was measured, what was inferred, and what can't be checked from outside your site. Anything we couldn't measure is labelled, not guessed.",
  },
  {
    icon: ListChecks,
    title: "A prioritised fix list",
    body: "Sorted by points recovered per unit of effort, so the top of the list is the cheapest real win. Yours to act on with or without us.",
  },
];

/**
 * The site's single lead-capture offer. Deliberately one CTA everywhere it
 * appears — the homepage, articles and location pages all point here rather
 * than each making a competing offer.
 */
export function AuditCta() {
  return (
    <section id="audit" className="page-surface w-full py-20 lg:py-28 border-t scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-start max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="flex flex-col gap-6">
              <h2 className="text-3xl md:text-4xl tracking-tighter">
                Find out what AI search says about you.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Send us your website and we&apos;ll run our own audit tool
                against it, free. You get the real output — not a teaser with
                the useful parts removed.
              </p>

              <div className="flex flex-col gap-5">
                {WHAT_YOU_GET.map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <item.icon className="w-5 h-5 stroke-1 text-primary" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className="font-medium text-sm">{item.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {item.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Real output from the same tool, run on this site — so the
                  offer is demonstrable rather than described. */}
              <p className="text-muted-foreground text-sm leading-relaxed border-l-2 border-border pl-4">
                We ran it on this site too, on 16 September 2026: <strong className="text-foreground font-medium">GEO 75, SEO 96</strong>,
                with &ldquo;add sameAs schema links&rdquo; as our own top fix. We
                publish our own score because a tool you won&apos;t point at
                yourself isn&apos;t worth much.
              </p>

              <p className="text-muted-foreground text-sm leading-relaxed">
                What the free check does <em>not</em> include: the paid prompt
                testing, where we ask ChatGPT, Perplexity and Gemini for
                businesses like yours across dozens of real prompts and count
                how often you actually come up. That one costs us API money to
                run, so it&apos;s part of a paid engagement.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="card-surface rounded-md p-6 md:p-8">
              <AuditRequestForm />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
