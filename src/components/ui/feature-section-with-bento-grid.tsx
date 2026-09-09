import {
  Accessibility,
  Bot,
  Globe,
  Wrench,
  FileText,
  Code,
  DollarSign,
  BarChart3,
  Megaphone,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ScrollReveal from "@/components/scroll-reveal";

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
    icon: Megaphone,
    title: "Digital Marketing",
    body: "Beyond SEO and GEO — the paid and organic channels that bring people to your site in the first place.",
  },
  {
    icon: Sparkles,
    title: "AI Integration for Your Business",
    body: "Custom AI tools built for how your business actually runs — customer support chatbots, automated reports, internal workflow automation. This entire site was built the same way, using AI coding tools.",
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
    <div className="w-full py-20 lg:py-40 relative overflow-hidden">
      {/* Soft depth accents — same motif as the hero, so scrolling
          doesn't hit a flat, empty section */}
      <div
        className="absolute -top-20 -right-20 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: "rgba(15,23,42,0.05)", filter: "blur(100px)" }}
      />
      <div
        className="absolute bottom-0 -left-20 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: "rgba(203,213,225,0.4)", filter: "blur(100px)" }}
      />

      <div className="container mx-auto px-4 relative">
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
            {SERVICES.map((s, i) => (
              <ScrollReveal key={s.title} delay={(i % 4) * 80}>
                <div className="bg-muted rounded-md border border-border/50 p-6 sm:aspect-square flex justify-between flex-col gap-4 transition-transform duration-200 hover:scale-[1.03] hover:shadow-lg">
                  <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10">
                    <s.icon className="w-6 h-6 stroke-1 text-primary" />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-lg tracking-tight">{s.title}</h3>
                    <p className="text-muted-foreground text-sm">{s.body}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export { Feature };
