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
    body: "We work every month to get you named by ChatGPT, Gemini, Perplexity and Google's AI answers. Not one check and done.",
  },
  {
    icon: Globe,
    title: "Technical SEO",
    body: "The hidden faults that stop Google ranking you. We find them, fix them, and keep checking. We do not just hand you a list.",
  },
  {
    icon: Accessibility,
    title: "Accessibility Audits",
    body: "We test whether people with a disability can actually use your site. Real tests, not guesswork. We only warn you about legal risk if we have measured it.",
  },
  {
    icon: FileText,
    title: "Blog & Content",
    body: "Pages and posts written for your site, on the topics that actually help people find you. Included every month.",
  },
  {
    icon: Code,
    title: "Website Design & Build",
    body: "A new site, or a fresh look for the one you have — built to be found by Google and AI from day one.",
  },
  {
    icon: DollarSign,
    title: "Website Monetization",
    body: "You already have visitors. We find where they give up and leave, then fix that spot.",
  },
  {
    icon: Megaphone,
    title: "Digital Marketing",
    body: "The other ways people reach you — ads, social, email — so visitors arrive in the first place.",
  },
  {
    icon: Sparkles,
    title: "AI Integration for Your Business",
    body: "AI tools built around how your business really works: a chatbot to answer customers, reports that write themselves, jobs that run without you. This whole site was built that way.",
  },
  {
    icon: Wrench,
    title: "Regular Maintenance",
    body: "Websites break quietly. We keep watch and fix things before they cost you visitors.",
  },
  {
    icon: BarChart3,
    title: "Monthly Reporting",
    body: "A short update each month in plain words. What we did, what changed, what is next. No jargon, no padding.",
  },
];

function Feature() {
  return (
    <div className="page-surface w-full py-20 lg:py-40 relative overflow-hidden">
      {/* Soft depth accents — same motif as the hero, so scrolling
          doesn't hit a flat, empty section */}
      <div
        className="absolute -top-20 -right-20 w-40 h-40 sm:w-72 sm:h-72 rounded-full pointer-events-none opacity-60 sm:opacity-100"
        style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--foreground) 5%, transparent) 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-0 -left-20 w-40 h-40 sm:w-72 sm:h-72 rounded-full pointer-events-none opacity-60 sm:opacity-100"
        style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--muted-foreground) 25%, transparent) 0%, transparent 70%)" }}
      />

      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col gap-10">
          <div className="page-head flex gap-4 flex-col items-start">
            <div>
              <Badge>What We Do</Badge>
            </div>
            <div className="flex gap-2 flex-col">
              <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular text-left">
                Not just an audit. Ongoing work, every month.
              </h2>
              <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground text-left">
                We do not hand you a report and vanish. Every month we keep
                working on your site, write new pages for it, watch for things
                breaking, and send you real numbers on how it is doing.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((s, i) => (
              <ScrollReveal key={s.title} delay={(i % 4) * 80}>
                <div className="card-surface rounded-md p-6 sm:aspect-square flex justify-between flex-col gap-4 transition-transform duration-200 hover:scale-[1.03]">
                  <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10">
                    <s.icon className="w-6 h-6 stroke-1 text-primary" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-lg tracking-tight">{s.title}</h3>
                    <p className="text-muted-foreground text-[0.95rem] leading-relaxed sm:text-sm">{s.body}</p>
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
