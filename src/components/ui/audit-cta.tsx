import ScrollReveal from "@/components/scroll-reveal";
import AuditRequestForm from "@/components/audit-request-form";
import { Bot, ListChecks, Gauge } from "lucide-react";

const WHAT_YOU_GET = [
  {
    icon: Bot,
    title: "Whether AI can even read your site",
    body: "ChatGPT, Claude, Perplexity, Google and Bing all send a small program to read your pages. We knock on your door as each one and see who gets let in. If they are being turned away, nothing else matters until that is fixed.",
  },
  {
    icon: Gauge,
    title: "Two scores out of 100 — one for Google, one for AI",
    body: "Plus what is behind each number. Where we could only make a fair guess, we say so instead of dressing it up as a measurement.",
  },
  {
    icon: ListChecks,
    title: "A list of fixes, best one first",
    body: "Ordered by what gives you the most for the least work, so the top of the list is the quickest win. It is yours either way — use it with us or without us.",
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
                Find out what AI says about you.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Send us your web address. We run our own tool on it, free, and
                send you what it says. The whole thing — not a taster with the
                useful bits taken out.
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
                We ran it on our own site too. It told us what we were getting
                wrong, and we published that. A tool you will not point at
                yourself is not worth much.
              </p>

              <p className="text-muted-foreground text-sm leading-relaxed">
                One thing the free check does <em>not</em> do: actually ask
                ChatGPT, Perplexity and Gemini for businesses like yours,
                dozens of times, and count how often your name comes up. That
                costs us real money each time we run it, so it comes with paid
                work.
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
