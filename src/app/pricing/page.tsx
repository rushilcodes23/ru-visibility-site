import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/scroll-reveal";
import {
  Bot,
  Globe,
  Accessibility,
  Wrench,
  FileText,
  BarChart3,
  Code,
  DollarSign,
  Check,
  ImageIcon,
} from "lucide-react";

export const metadata = {
  alternates: { canonical: "/pricing" },
  title: "Pricing — SEO & GEO Management Plans | Ru Visibility",
  description:
    "Two ongoing SEO and GEO plans: Essentials at $699/month, or full Visibility Management at $899 first month, then $1,199/month.",
};

const ESSENTIALS_INCLUDED = [
  {
    icon: Bot,
    title: "SEO + GEO Management",
    body: "Ongoing improvement of how your business shows up on Google and on AI tools like ChatGPT and Gemini.",
  },
  {
    icon: BarChart3,
    title: "Monthly Business Check-In",
    body: "A plain-English report on how your site is actually performing.",
  },
];

const FULL_INCLUDED = [
  {
    icon: Bot,
    title: "Full SEO + GEO Management",
    body: "Not a one-time audit — ongoing, month-over-month improvement of how your business shows up on Google and on AI tools like ChatGPT and Gemini.",
  },
  {
    icon: Accessibility,
    title: "Accessibility Monitoring",
    body: "Real axe-core scans, checked regularly, so new issues get caught before they become legal exposure.",
  },
  {
    icon: Wrench,
    title: "Regular Maintenance",
    body: "Ongoing upkeep of the technical health of your site — the things that quietly break and hurt visibility if nobody's watching.",
  },
  {
    icon: BarChart3,
    title: "Monthly Business Check-In",
    body: "A plain-English report on how your site is actually performing — real results, not a vanity metrics dump.",
  },
  {
    icon: FileText,
    title: "Blog & Content",
    body: "Ongoing content written for your site, built around what actually helps your SEO and GEO visibility.",
  },
];

const PROJECT_SERVICES = [
  {
    icon: Code,
    title: "Website Design & Development",
    body: "Building a new site or redesigning an existing one — done right from the ground up for SEO and AI visibility, not bolted on after.",
  },
  {
    icon: DollarSign,
    title: "Website Monetization",
    body: "Turning the traffic you already have into actual revenue — figuring out where the drop-off is and fixing it.",
  },
];

// ponytail: image slot for a plan graphic Rushil will provide — placeholder
// only, swap the icon block below for a real <Image> once one exists.
function PlanImagePlaceholder() {
  return (
    <div className="flex items-center justify-center h-32 rounded-md border border-dashed border-border mb-6 text-muted-foreground/50">
      <ImageIcon className="w-8 h-8" />
    </div>
  );
}

export default function PricingPage() {
  return (
    <div className="w-full py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-4 items-start mb-16 max-w-2xl">
          <Badge>Pricing</Badge>
          <h1 className="text-3xl md:text-5xl tracking-tighter font-regular text-left">
            Two plans. Everything is ongoing.
          </h1>
          <p className="text-lg leading-relaxed tracking-tight text-muted-foreground text-left">
            This isn't a one-time audit you pay for and never hear from us
            again. Pick the depth of work you need — both are month-over-month.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <ScrollReveal>
            <div className="bg-muted rounded-md border border-border/50 p-8 md:p-10 h-full transition-transform duration-200 hover:scale-[1.01] hover:shadow-lg">
              <PlanImagePlaceholder />
              <h2 className="text-2xl tracking-tight mb-2">Essentials</h2>
              <div className="flex items-baseline gap-3 mb-8">
                <span className="text-4xl font-semibold tracking-tight">$699</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <div className="flex flex-col gap-4">
                {ESSENTIALS_INCLUDED.map((item) => (
                  <div key={item.title} className="flex gap-3">
                    <Check className="w-5 h-5 shrink-0 mt-0.5 text-primary" />
                    <div>
                      <p className="font-medium text-sm">{item.title}</p>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {item.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div
              className="rounded-md p-8 md:p-10 h-full relative overflow-hidden transition-transform duration-200 hover:scale-[1.01] hover:shadow-xl text-white"
              style={{ background: "linear-gradient(135deg, #0f172a, #1e293b)" }}
            >
              <span className="absolute top-6 right-6 text-xs font-medium tracking-wide uppercase bg-primary text-primary-foreground rounded-full px-3 py-1">
                Most Complete
              </span>
              <div className="flex items-center justify-center h-32 rounded-md border border-dashed border-white/20 mb-6 text-white/30">
                <ImageIcon className="w-8 h-8" />
              </div>
              <h2 className="text-2xl tracking-tight mb-2">Visibility Management</h2>
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-4xl font-semibold tracking-tight">$899</span>
                <span className="text-white/60">first month</span>
              </div>
              <p className="text-white/60 mb-8">then $1,199/month</p>
              <div className="flex flex-col gap-4">
                {FULL_INCLUDED.map((item) => (
                  <div key={item.title} className="flex gap-3">
                    <Check className="w-5 h-5 shrink-0 mt-0.5 text-primary" />
                    <div>
                      <p className="font-medium text-sm">{item.title}</p>
                      <p className="text-white/60 text-sm leading-relaxed">
                        {item.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        <Button size="lg" className="mb-20" render={<a href="/contact">Get Your Visibility Audit</a>} />

        <div className="max-w-2xl mb-8">
          <h2 className="text-2xl tracking-tight mb-2">Also available, quoted separately</h2>
          <p className="text-muted-foreground leading-relaxed">
            Bigger, project-based work — priced once we know the actual
            scope, same honesty rule as everything else here.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-16 max-w-3xl">
          {PROJECT_SERVICES.map((s, i) => (
            <ScrollReveal key={s.title} delay={i * 100}>
              <div className="bg-muted rounded-md border border-border/50 p-6 flex flex-col gap-3 transition-transform duration-200 hover:scale-[1.03] hover:shadow-lg h-full">
                <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10">
                  <s.icon className="w-6 h-6 stroke-1 text-primary" />
                </div>
                <h3 className="text-xl tracking-tight">{s.title}</h3>
                <p className="text-muted-foreground text-base leading-relaxed">
                  {s.body}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="max-w-2xl border-t pt-10">
          <Button variant="outline" size="lg" render={<a href="/contact">Ask About a Custom Scope</a>} />
        </div>
      </div>
    </div>
  );
}
