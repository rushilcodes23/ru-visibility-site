import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "FAQ — SEO, GEO & AI Visibility Questions | Ru Visibility",
  description:
    "Honest answers about SEO and GEO management: do we guarantee results, how is this different from a regular SEO agency, and what do you actually get.",
};

const FAQS = [
  {
    q: "Do you guarantee results?",
    a: "No — and be skeptical of anyone who does. AI models retrain regularly and Google's algorithm changes constantly; nobody controls either. What we do guarantee is a real, measured audit and a report that only says what we can actually verify, not inflated claims to close a sale.",
  },
  {
    q: "How is this different from a regular SEO agency?",
    a: "Most SEO work only covers Google. We check that too, but we also test how ChatGPT, Perplexity, Gemini, and Google's AI Overviews actually see your business — a growing share of how people find providers now. We also run real accessibility scans (axe-core, not guesses), which most SEO shops don't touch at all.",
  },
  {
    q: "What do I actually get at the end of an audit?",
    a: "One plain-English report — not a 40-page technical document. It tells you what's broken, why it matters, and what we're fixing directly versus what needs your input.",
  },
  {
    q: "Do you fix everything yourselves?",
    a: "Whatever's safe to automate, yes — we fix it directly. Anything that needs a real judgment call (content rewrites, design decisions, choices specific to your business) gets a clear checklist instead, so nothing changes on your site without your say-so.",
  },
  {
    q: "What if the audit doesn't find much wrong?",
    a: "Then we tell you that. The same rule that keeps us from inflating a problem applies here too — we're not going to manufacture issues to justify the engagement.",
  },
  {
    q: "How fast will I see AI or search visibility change?",
    a: "It genuinely depends on your starting point — see the How We Work page for the honest version of this answer. Short version: AI visibility can shift faster than traditional Google rankings, but neither is instant.",
  },
];

export default function FaqPage() {
  return (
    <div className="w-full py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-4 items-start max-w-2xl mb-16">
          <Badge>FAQ</Badge>
          <h1 className="text-3xl md:text-5xl tracking-tighter font-regular text-left">
            Questions people actually ask.
          </h1>
        </div>

        <div className="flex flex-col gap-8 max-w-3xl">
          {FAQS.map((item) => (
            <div key={item.q} className="border-b pb-8 last:border-b-0">
              <h3 className="text-xl tracking-tight mb-2">{item.q}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
