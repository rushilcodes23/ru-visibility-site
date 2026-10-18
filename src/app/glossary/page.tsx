import { Badge } from "@/components/ui/badge";
import { AuditCta } from "@/components/ui/audit-cta";
import { compactCount } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";
import findings from "@/lib/research-findings.json";

export const metadata = pageMetadata({
  path: "/glossary",
  title: "SEO, GEO and AEO Glossary | Ru Visibility",
  description: "Plain definitions of SEO, GEO and AEO terms, from AI crawlers to canonical tags, with figures from our audit of 1.5k+ business websites.",
});

// Why this page exists: one place that defines every term the answers and
// posts use, and links each to the page that explains it properly. What makes
// it more than a list a prompt could write is the "In our audits" line under
// most terms, read from research-findings.json like every other figure on the
// site (CONTENT_RULES.md). Definitions agree with the answer pages they link
// to; when one of those changes, check the matching term here.
const SITE = "https://ruvisibility.com";
const AUDITED = compactCount(findings.corpus.uniqueDomains);
const { scores, universal: u } = findings;

type Term = {
  id: string;
  term: string;
  /** Plain text: it is also the schema.org description. */
  definition: string;
  /** What our own audits measured, where they measured it. */
  measured?: string;
  link?: { href: string; label: string };
};

const GROUPS: { title: string; terms: Term[] }[] = [
  {
    title: "AI search",
    terms: [
      {
        id: "geo",
        term: "GEO (generative engine optimization)",
        definition: "Work that makes a business more likely to be named in answers written by AI tools such as ChatGPT, Gemini, Perplexity and Google's AI Overviews. It builds on SEO rather than replacing it.",
        measured: `Across ${AUDITED} business websites, the average AI visibility score was ${scores.geo.mean}/100, against ${scores.seo.mean}/100 for SEO.`,
        link: { href: "/answers/what-is-generative-engine-optimization", label: "What is generative engine optimization?" },
      },
      {
        id: "aeo",
        term: "AEO (answer engine optimization)",
        definition: "Shaping a page so a direct answer can be lifted from it: the answer comes first, headings are phrased as the questions people ask, and each section makes sense on its own.",
        measured: `${u.anyFaqBlock.sitesPct}% of the sites we checked had a questions-and-answers section on any page we read.`,
        link: { href: "/answers/seo-vs-geo-vs-aeo", label: "SEO vs GEO vs AEO" },
      },
      {
        id: "llmo",
        term: "LLMO and AI SEO",
        definition: "Other names for GEO and AEO. LLM optimization and AI SEO describe the same work under a newer label, not a separate service.",
        link: { href: "/answers/seo-vs-geo-vs-aeo", label: "SEO vs GEO vs AEO" },
      },
      {
        id: "ai-overview",
        term: "AI Overview",
        definition: "The AI-written summary Google shows above the normal results for some searches, with links to pages that support it. A page has to be indexed and allowed a snippet to be one of those links.",
        link: { href: "/answers/where-google-ai-overviews-get-information", label: "Where do Google AI Overviews get their information?" },
      },
      {
        id: "query-fan-out",
        term: "Query fan-out",
        definition: "How Google says its AI Overviews and AI Mode may answer: by issuing several related searches across subtopics and combining what they find. A page can be cited for one sub-question it answers well.",
        link: { href: "/answers/how-to-appear-in-google-ai-overviews", label: "How do I appear in Google AI Overviews?" },
      },
      {
        id: "ai-visibility-audit",
        term: "AI visibility audit",
        definition: "A check of whether ChatGPT, Gemini, Perplexity and Google's AI answers can reach a website, understand it, and have reason to mention the business.",
        link: { href: "/answers/what-is-an-ai-visibility-audit", label: "What is an AI visibility audit?" },
      },
    ],
  },
];

const ALL = GROUPS.flatMap((g) => g.terms);

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  "@id": `${SITE}/glossary#terms`,
  name: "SEO, GEO and AEO glossary",
  url: `${SITE}/glossary`,
  hasDefinedTerm: ALL.map((t) => ({
    "@type": "DefinedTerm",
    name: t.term,
    description: t.definition,
    url: `${SITE}/glossary#${t.id}`,
    inDefinedTermSet: `${SITE}/glossary#terms`,
  })),
};

export default function GlossaryPage() {
  return (
    <div className="page-surface w-full py-20 lg:py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto px-4">
        <div className="page-head flex flex-col gap-4 items-start max-w-2xl mb-12">
          <Badge>Glossary</Badge>
          <h1 className="text-3xl md:text-5xl tracking-tighter font-regular text-left">
            SEO, GEO and AEO terms, in plain words
          </h1>
          <p className="text-lg leading-relaxed tracking-tight text-muted-foreground text-left">
            Every term the answers and posts on this site use, defined in a
            sentence or two, with a link to the page that explains it. Where we
            measured something, the figure comes from our own audit of{" "}
            {AUDITED} business websites.
          </p>
          <nav aria-label="Glossary sections" className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {GROUPS.map((g) => (
              <a key={g.title} href={`#${slugify(g.title)}`} className="underline underline-offset-4">
                {g.title}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-16 max-w-3xl">
          {GROUPS.map((g) => (
            <section key={g.title} aria-labelledby={slugify(g.title)}>
              <h2 id={slugify(g.title)} className="text-2xl tracking-tight mb-6 md:text-3xl scroll-mt-24">
                {g.title}
              </h2>
              <div className="flex flex-col gap-8">
                {g.terms.map((t) => (
                  <div key={t.id} id={t.id} className="scroll-mt-24">
                    <h3 className="text-lg font-medium tracking-tight mb-2">{t.term}</h3>
                    <p className="text-muted-foreground leading-relaxed">{t.definition}</p>
                    {t.measured && (
                      <p className="text-sm leading-relaxed mt-2">
                        <span className="font-medium">In our audits:</span>{" "}
                        <span className="text-muted-foreground">{t.measured}</span>
                      </p>
                    )}
                    {t.link && (
                      <a href={t.link.href} className="text-sm underline underline-offset-4 mt-2 inline-block">
                        {t.link.label} →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
      <AuditCta />
    </div>
  );
}

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
