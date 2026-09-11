import { Badge } from "@/components/ui/badge";
import {
  Search,
  ScanSearch,
  ListChecks,
  FileText,
  Wrench,
  BarChart3,
} from "lucide-react";

export const metadata = {
  alternates: { canonical: "/how-we-work" },
  title: "How We Work — SEO & GEO Process | Ru Visibility",
  description:
    "The six-step process behind every engagement: AI visibility testing, full audit, plain-English report, direct fixes, and a real before/after.",
};

const STEPS = [
  {
    icon: Search,
    title: "1. AI Visibility Test",
    body: "We run the same kind of question a real customer would type — into ChatGPT, Perplexity, Gemini, Claude, and Google's AI Overviews — and record whether your business shows up, gets recommended, or doesn't appear at all. This is the baseline: where you actually stand today, before we touch anything.",
  },
  {
    icon: ScanSearch,
    title: "2. Audit",
    body: "We crawl your site the way Google and AI crawlers actually do. That covers technical SEO (headings, canonical tags, sitemaps, accidental crawl blocks), AI-specific visibility (llms.txt, crawler access, structured data), real accessibility scans using axe-core — not guesses — and basic trust signals like schema markup and contact completeness.",
  },
  {
    icon: ListChecks,
    title: "3. Categorize",
    body: "Every finding gets sorted by what's actually broken versus what's fine, and ranked by how much it matters. No wall of 200 minor warnings drowning out the five things that actually move the needle. No SEO or developer jargon — if a normal person or an AI model wouldn't recognize the term, we don't use it.",
  },
  {
    icon: FileText,
    title: "4. Report",
    body: "You get a single, plain-English page you could hand to anyone on your team — no technical background required. It says what's wrong, why it matters, and what happens if it stays broken.",
  },
  {
    icon: Wrench,
    title: "5. Fix",
    body: "Anything safe to automate — metadata, structured data, sitemap issues — we fix directly. Anything that needs a real judgment call — content rewrites, design decisions, business-specific choices — gets a clear, prioritized checklist instead, so nothing changes without your say-so.",
  },
  {
    icon: BarChart3,
    title: "6. Before / After",
    body: "Once fixes are in, we re-run the exact same AI visibility test from step one and show you the actual difference — a side-by-side comparison using the same prompts, not a promise.",
  },
];

export default function HowWeWorkPage() {
  return (
    <div className="page-surface w-full py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="page-head flex flex-col gap-4 items-start mb-16 max-w-2xl">
          <Badge>How We Work</Badge>
          <h1 className="text-3xl md:text-5xl tracking-tighter font-regular text-left">
            Six steps. No black box.
          </h1>
          <p className="text-lg leading-relaxed tracking-tight text-muted-foreground text-left">
            Every engagement follows the same process, in this order, every
            time. Here's exactly what happens at each stage.
          </p>
        </div>

        <h2 className="text-2xl tracking-tight mb-6">
          The six steps, in order
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {STEPS.map((step) => (
            <div
              key={step.title}
              className="bg-muted rounded-md border border-border/50 p-6 flex flex-col gap-3 transition-transform duration-200 hover:scale-[1.02] hover:shadow-lg"
            >
              <step.icon className="w-8 h-8 stroke-1" />
              <h3 className="text-xl tracking-tight">{step.title}</h3>
              <p className="text-muted-foreground text-base leading-relaxed">
                {step.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-md border border-border/50 bg-muted p-6 md:p-8">
          <h2 className="text-2xl tracking-tight mb-3">
            How long before you see results?
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-3 max-w-3xl">
            Nobody can honestly guarantee AI or search rankings — AI models
            retrain regularly and Google's algorithm changes constantly, and
            that's true no matter who you hire. What we can tell you: AI
            visibility can shift faster than traditional SEO, because AI tools
            can pick up a fix without waiting on a full re-crawl and ranking
            cycle the way Google's index does. Traditional SEO tends to build
            more gradually, as topical authority compounds over time.
          </p>
          <p className="text-muted-foreground leading-relaxed max-w-3xl">
            We'll give you real numbers once we've run the before/after on
            your own site — not a industry-wide average that may not apply to
            you.
          </p>
        </div>
      </div>
    </div>
  );
}
