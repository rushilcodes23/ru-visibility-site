import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Bot, Accessibility, TrendingDown } from "lucide-react";

export const metadata = {
  alternates: { canonical: "/why-it-matters" },
  title: "Why SEO & GEO Matter for Your Business | Ru Visibility",
  description:
    "Why AI visibility and search rankings matter now — and what it actually costs a business to stay invisible to both.",
};

const REASONS = [
  {
    icon: Search,
    title: "Google still decides who gets found first",
    body: "Most people still start looking for a business by searching. If your site has technical issues keeping Google from crawling or ranking it properly, you're invisible to that search before a person ever sees you — no matter how good the business actually is.",
  },
  {
    icon: Bot,
    title: "AI tools are becoming a second front door",
    body: "People are increasingly asking ChatGPT, Gemini, and Perplexity directly for recommendations instead of typing into a search bar. If those tools can't read your site, don't know what you offer, or have no reason to recommend you over a competitor, you're invisible there too — a channel that barely existed a few years ago.",
  },
  {
    icon: Accessibility,
    title: "Accessibility is a real legal exposure, not a nice-to-have",
    body: "ADA-style web accessibility lawsuits are a real and growing category of legal risk for businesses with an online presence. It's also simply more customers you can actually serve — visitors using a screen reader or keyboard navigation are real potential customers, not an edge case.",
  },
  {
    icon: TrendingDown,
    title: "Doing nothing has a cost, even if it's invisible to you",
    body: "If a competitor shows up — on Google, on an AI answer, or both — and you don't, they get the customer instead. That loss doesn't show up as an error message anywhere. It just looks like a customer who went somewhere else.",
  },
];

export default function WhyItMattersPage() {
  return (
    <div className="w-full py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-4 items-start max-w-2xl mb-16">
          <Badge>Why It Matters</Badge>
          <h1 className="text-3xl md:text-5xl tracking-tighter font-regular text-left">
            Why SEO and GEO actually matter.
          </h1>
          <p className="text-lg leading-relaxed tracking-tight text-muted-foreground text-left">
            Not marketing speak — the actual reasons this isn't optional
            anymore for a business with a website.
          </p>
        </div>

        <h2 className="text-2xl tracking-tight mb-6 max-w-2xl">
          Four reasons this isn&apos;t optional anymore
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-16">
          {REASONS.map((r) => (
            <div key={r.title} className="bg-muted rounded-md border border-border/50 p-6 flex flex-col gap-3 transition-transform duration-200 hover:scale-[1.02] hover:shadow-lg">
              <r.icon className="w-8 h-8 stroke-1" />
              <h3 className="text-xl tracking-tight">{r.title}</h3>
              <p className="text-muted-foreground text-base leading-relaxed">
                {r.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-md border border-border/50 bg-muted/50 p-6 md:p-8">
          <p className="text-muted-foreground leading-relaxed mb-6">
            None of this means you need to panic — it means it's worth
            actually checking where you stand today, rather than guessing.
            That's what the audit is for.
          </p>
          <Button size="lg" render={<a href="/contact">Get Your Visibility Audit</a>} />
        </div>
      </div>
    </div>
  );
}
