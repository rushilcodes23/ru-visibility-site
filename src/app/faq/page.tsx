import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

export const metadata = {
  alternates: { canonical: "/faq" },
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

const RELATED = [
  { href: "/how-we-work", label: "How We Work", note: "The six steps, in order." },
  { href: "/pricing", label: "Pricing", note: "What the plans actually include." },
  { href: "/why-us", label: "Why Us", note: "What makes us different, and who we are not for." },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function FaqPage() {
  return (
    <div className="w-full py-20 lg:py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-4 items-start max-w-2xl mb-16">
          <Badge>FAQ</Badge>
          <h1 className="text-3xl md:text-5xl tracking-tighter font-regular text-left">
            Questions people actually ask.
          </h1>
        </div>

        <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
          <div className="flex flex-col gap-8 lg:col-span-2">
            {FAQS.map((item) => (
              <div key={item.q} className="border-b pb-8 last:border-b-0">
                <h2 className="text-xl tracking-tight mb-2">{item.q}</h2>
                <p className="text-muted-foreground leading-relaxed max-w-3xl">
                  {item.a}
                </p>
              </div>
            ))}
          </div>

          {/* Sticky rail — the answers are capped for line length, which
              used to leave the right third of the page empty on desktop. */}
          <aside className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
            <div className="bg-primary text-primary-foreground rounded-md p-6">
              <h2 className="text-xl tracking-tight mb-2">
                Still not answered?
              </h2>
              <p className="opacity-80 text-sm leading-relaxed mb-5">
                Ask us directly. You will get a real answer from the person
                who would do the work, not a sales script.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-1 rounded-full bg-primary-foreground text-primary text-sm font-medium px-4 py-2 transition-transform duration-200 hover:scale-105"
              >
                Talk to Us
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="bg-muted rounded-md border border-border/50 p-6">
              <h2 className="text-lg tracking-tight mb-4">Read next</h2>
              <ul className="flex flex-col gap-3 text-sm">
                {RELATED.map((r) => (
                  <li key={r.href}>
                    <a
                      href={r.href}
                      className="group flex items-start justify-between gap-3 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <span>
                        <span className="block font-medium text-foreground">
                          {r.label}
                        </span>
                        {r.note}
                      </span>
                      <ArrowRight className="w-4 h-4 mt-0.5 shrink-0 transition-transform group-hover:translate-x-1" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
