import {
  Accessibility,
  Bot,
  Globe,
  Wrench,
  FileText,
  Code,
  DollarSign,
  BarChart3,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const SERVICES = [
  {
    icon: Bot,
    title: "AI Visibility (GEO)",
    body: "Ongoing work to get your business found and recommended by ChatGPT, Gemini, Perplexity, and Google's AI Overviews — not a one-time check.",
  },
  {
    icon: Globe,
    title: "Technical SEO",
    body: "The crawl-level issues keeping Google from ranking you, found and fixed on an ongoing basis, not just flagged once.",
  },
  {
    icon: Accessibility,
    title: "Accessibility Audits",
    body: "Real axe-core scans, not guesses. We only flag legal risk when it's actually measured on your site.",
  },
  {
    icon: FileText,
    title: "Blog & Content",
    body: "Content written for your site, built around what actually moves your SEO and GEO visibility — included every month.",
  },
  {
    icon: Code,
    title: "Website Design & Build",
    body: "Building a new site or redesigning an existing one, done right for SEO and AI visibility from the start.",
  },
  {
    icon: DollarSign,
    title: "Website Monetization",
    body: "Turning the traffic you already have into actual revenue — finding the drop-off and fixing it.",
  },
  {
    icon: Wrench,
    title: "Regular Maintenance",
    body: "Ongoing upkeep of your site's technical health — the things that quietly break if nobody's watching.",
  },
  {
    icon: BarChart3,
    title: "Monthly Reporting",
    body: "A plain-English check-in on how your site is actually performing — real results, not a vanity metrics dump.",
  },
];

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
                Not just an audit. Ongoing work, every month.
              </h2>
              <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground text-left">
                We don't hand you a report and disappear. Every month we're
                actively improving your SEO and GEO, writing content,
                keeping the site maintained, and checking in with real
                numbers on how it's actually performing.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((s) => (
              <div
                key={s.title}
                className="bg-muted rounded-md p-6 sm:aspect-square flex justify-between flex-col gap-4"
              >
                <s.icon className="w-8 h-8 stroke-1" />
                <div className="flex flex-col">
                  <h3 className="text-lg tracking-tight">{s.title}</h3>
                  <p className="text-muted-foreground text-sm">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export { Feature };
