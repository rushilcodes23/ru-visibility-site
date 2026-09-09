import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
} from "lucide-react";

const INCLUDED = [
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

export default function PricingPage() {
  return (
    <div className="w-full py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-4 items-start mb-16 max-w-2xl">
          <Badge>Pricing</Badge>
          <h1 className="text-3xl md:text-5xl tracking-tighter font-regular text-left">
            One plan. Everything included.
          </h1>
          <p className="text-lg leading-relaxed tracking-tight text-muted-foreground text-left">
            This isn't a one-time audit you pay for and never hear from us
            again. It's ongoing SEO and GEO work, every month.
          </p>
        </div>

        <div className="bg-muted rounded-md p-8 md:p-12 mb-16 max-w-3xl">
          <h2 className="text-2xl tracking-tight mb-2">Visibility Management</h2>
          <div className="flex items-baseline gap-3 mb-1">
            <span className="text-4xl md:text-5xl font-semibold tracking-tight">$899</span>
            <span className="text-muted-foreground">first month</span>
          </div>
          <p className="text-muted-foreground mb-8">then $1,199/month</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
            {INCLUDED.map((item) => (
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

        <Button size="lg" className="mb-20" render={<a href="/contact">Get Your Visibility Audit</a>} />

        <div className="max-w-2xl mb-8">
          <h2 className="text-2xl tracking-tight mb-2">Also available, quoted separately</h2>
          <p className="text-muted-foreground leading-relaxed">
            Bigger, project-based work — priced once we know the actual
            scope, same honesty rule as everything else here.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-16 max-w-3xl">
          {PROJECT_SERVICES.map((s) => (
            <div key={s.title} className="bg-muted rounded-md p-6 flex flex-col gap-3">
              <s.icon className="w-8 h-8 stroke-1" />
              <h3 className="text-xl tracking-tight">{s.title}</h3>
              <p className="text-muted-foreground text-base leading-relaxed">
                {s.body}
              </p>
            </div>
          ))}
        </div>

        <div className="max-w-2xl border-t pt-10">
          <Button variant="outline" size="lg" render={<a href="/contact">Ask About a Custom Scope</a>} />
        </div>
      </div>
    </div>
  );
}
