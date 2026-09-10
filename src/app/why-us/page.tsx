import { Badge } from "@/components/ui/badge";
import ScrollReveal from "@/components/scroll-reveal";
import { ClosingCta } from "@/components/ui/closing-cta";
import {
  UserCheck,
  Wrench,
  Bot,
  Accessibility,
  FileText,
  Eye,
} from "lucide-react";

export const metadata = {
  alternates: { canonical: "/why-us" },
  title: "Why Us — What Makes Us Different | Ru Visibility",
  description:
    "No guaranteed rankings, no account managers, no invented numbers. What you actually get working with Ru Visibility, and who it isn't for.",
};

const REASONS = [
  {
    icon: UserCheck,
    title: "You get Rushil, not a queue",
    body: "The person who reads your message is the person who does the work. There is no account manager passing notes to a team you never meet, and no support ticket to chase.",
  },
  {
    icon: Wrench,
    title: "Ongoing work, not a PDF",
    body: "Most agencies hand over an audit and invoice you for it. An audit is where we start, not what we sell. We fix what it finds, then keep working every month.",
  },
  {
    icon: Bot,
    title: "AI search, not just Google",
    body: "People ask ChatGPT and Gemini for recommendations now. That is a second front door to your business, and most agencies are still only optimising the first one.",
  },
  {
    icon: FileText,
    title: "Reports you can actually read",
    body: "Plain English, every time. What we did, what changed, what it means. If a report needs a glossary to understand, it was written to impress you, not inform you.",
  },
  {
    icon: Eye,
    title: "Real numbers or none",
    body: "Every figure we show you comes from an actual scan of your actual site. We do not pad reports with industry averages or invented benchmarks to look busy.",
  },
  {
    icon: Accessibility,
    title: "Accessibility is included",
    body: "Not an upsell. Real axe-core scans, because an inaccessible site is both a legal risk and a pile of customers who cannot use what you built.",
  },
];

export default function WhyUsPage() {
  return (
    <>
      <div className="w-full py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="flex flex-col gap-4 items-start max-w-2xl mb-16">
              <Badge>Why Us</Badge>
              <h1 className="text-3xl md:text-5xl tracking-tighter font-regular text-left">
                We fix our own site first.
              </h1>
              <p className="text-lg leading-relaxed tracking-tight text-muted-foreground text-left">
                Anyone can sell you an audit. The question worth asking is
                whether they have run one on themselves and acted on it. We
                did, and this page explains what that says about how we
                work.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="max-w-2xl mb-16 bg-primary text-primary-foreground rounded-md p-8">
              <span className="inline-block text-xs font-medium tracking-wide uppercase bg-primary-foreground text-primary rounded-full px-3 py-1 mb-4">
                The short version
              </span>
              <h2 className="text-2xl md:text-3xl tracking-tight mb-3">
                If we cannot fix our own site, why would you trust us with
                yours?
              </h2>
              <p className="opacity-80 leading-relaxed">
                We crawled ruvisibility.com with the same tool we use on
                client sites. It came back with real problems: missing
                canonical tags, pages too thin to rank, meta descriptions
                over the limit, security headers absent on static files.
                Every one of them is fixed. That is the standard we are
                asking you to hold us to.
              </p>
            </div>
          </ScrollReveal>

          <h2 className="text-2xl tracking-tight mb-6">
            What working with us actually looks like
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {REASONS.map((r, i) => (
              <ScrollReveal key={r.title} delay={i * 80}>
                <div className="bg-muted rounded-md border border-border/50 p-6 flex flex-col gap-3 h-full transition-transform duration-200 hover:scale-[1.03] hover:shadow-lg">
                  <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10">
                    <r.icon className="w-6 h-6 stroke-1 text-primary" />
                  </div>
                  <h3 className="text-lg tracking-tight">{r.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {r.body}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="max-w-2xl rounded-md border border-border/50 bg-muted/50 p-6 md:p-8 mb-16">
              <h2 className="text-2xl tracking-tight mb-4">
                What we will not tell you
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We will not promise you a number one ranking, a spot in an AI
                answer, or a traffic figure by a certain date. Nobody can
                promise those honestly. Google changes its algorithm
                constantly and AI models retrain on their own schedule.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Anyone who does guarantee a rank is either guessing or
                counting on you not checking. We would rather lose the deal
                than win it on a promise we cannot keep.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="max-w-2xl mt-12 rounded-md border border-border/50 bg-muted/50 p-6 md:p-8">
              <h2 className="text-2xl tracking-tight mb-4">
                Who this is not for
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you want someone to hit a rank by next month whatever it
                takes, we are the wrong fit. The shortcuts that look fast
                are the ones that get sites penalised, and we are not going
                to point those at your business.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                If you want steady work that compounds, explained in
                language you can repeat to someone else, that is exactly
                what this is.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
      <ClosingCta />
    </>
  );
}
