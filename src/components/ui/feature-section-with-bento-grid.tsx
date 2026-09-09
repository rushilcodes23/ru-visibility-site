import { Accessibility, Bot, Globe, Wrench } from "lucide-react";
import { Badge } from "@/components/ui/badge";

function Feature() {
  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-10">
          <div className="flex gap-4 flex-col items-start">
            <div>
              <Badge>What We Do</Badge>
            </div>
            <div className="flex gap-2 flex-col">
              <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular text-left">
                Four checks. One plain-English report.
              </h2>
              <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground  text-left">
                Every audit covers the same ground — how AI sees you, how
                Google crawls you, what puts you at legal risk, and what we
                can fix right now.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-muted rounded-md h-full lg:col-span-2 p-6 aspect-square lg:aspect-auto flex justify-between flex-col">
              <Bot className="w-8 h-8 stroke-1" />
              <div className="flex flex-col">
                <h3 className="text-xl tracking-tight">AI Visibility Audit</h3>
                <p className="text-muted-foreground max-w-xs text-base">
                  We check whether ChatGPT, Perplexity, Gemini, and Google’s
                  AI Overviews can find your business — and whether they’d
                  actually recommend it.
                </p>
              </div>
            </div>
            <div className="bg-muted rounded-md  aspect-square p-6 flex justify-between flex-col">
              <Globe className="w-8 h-8 stroke-1" />
              <div className="flex flex-col">
                <h3 className="text-xl tracking-tight">Technical SEO Audit</h3>
                <p className="text-muted-foreground max-w-xs text-base">
                  Missing H1s, broken canonicals, thin meta descriptions,
                  sitemap gaps — the crawl issues keeping Google from ranking
                  you.
                </p>
              </div>
            </div>

            <div className="bg-muted rounded-md aspect-square p-6 flex justify-between flex-col">
              <Accessibility className="w-8 h-8 stroke-1" />
              <div className="flex flex-col">
                <h3 className="text-xl tracking-tight">
                  Accessibility Risk Audit
                </h3>
                <p className="text-muted-foreground max-w-xs text-base">
                  Real axe-core scans, not guesses. We only flag legal risk
                  when it’s actually measured on your site.
                </p>
              </div>
            </div>
            <div className="bg-muted rounded-md h-full lg:col-span-2 p-6 aspect-square lg:aspect-auto flex justify-between flex-col">
              <Wrench className="w-8 h-8 stroke-1" />
              <div className="flex flex-col">
                <h3 className="text-xl tracking-tight">
                  A Report You Can Actually Read
                </h3>
                <p className="text-muted-foreground max-w-xs text-base">
                  One plain-English PDF, no dev jargon. We fix what’s safely
                  automatable and hand you a clear checklist for the rest.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Feature };
