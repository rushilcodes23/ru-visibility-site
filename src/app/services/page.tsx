import Image from "next/image";
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
  MapPin,
  Gauge,
  ShoppingCart,
  LineChart,
  Megaphone,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export const metadata = {
  alternates: { canonical: "/services" },
  title: "What We Do — SEO, GEO & AI Services | Ru Visibility",
  description:
    "Everything we can do for your business: SEO, AI visibility, local search, site speed, content, web design, and AI tools. Ask us what it costs.",
};

type Item = {
  icon: LucideIcon;
  title: string;
  body: string;
};

type Package = {
  name: string;
  tagline: string;
  icon: LucideIcon;
  /** Drop a file in /public and set the path here to swap the graphic. */
  image?: string;
  featured?: boolean;
  includes: Item[];
};

const PACKAGES: Package[] = [
  {
    name: "Essentials",
    tagline: "The core work, done every month.",
    icon: Bot,
    includes: [
      {
        icon: Bot,
        title: "SEO and GEO Management",
        body: "We keep working on how you show up on Google and on AI tools like ChatGPT and Gemini. Every month, not once.",
      },
      {
        icon: BarChart3,
        title: "Monthly Check-In",
        body: "A short report in plain words. What we did, what moved, and what is next. No jargon.",
      },
    ],
  },
  {
    name: "Complete",
    tagline: "Everything, handled for you.",
    icon: Sparkles,
    featured: true,
    includes: [
      {
        icon: Bot,
        title: "Full SEO and GEO Management",
        body: "All the search work, plus the deeper fixes. We keep at it month after month.",
      },
      {
        icon: Accessibility,
        title: "Accessibility Checks",
        body: "Real scans, run often. We catch problems early, before they turn into a legal headache.",
      },
      {
        icon: Wrench,
        title: "Site Maintenance",
        body: "Things break quietly on websites. We watch for that and fix it before it costs you visits.",
      },
      {
        icon: FileText,
        title: "Blog and Content",
        body: "We write pages for your site that help people find you, and help AI tools understand you.",
      },
      {
        icon: BarChart3,
        title: "Monthly Check-In",
        body: "The same plain-word report, with more to show, because more is getting done.",
      },
    ],
  },
  {
    name: "Custom",
    tagline: "Pick only what you need.",
    icon: Wrench,
    includes: [
      {
        icon: Check,
        title: "Build Your Own",
        body: "Maybe you only want a new website. Or only local search help. Tell us, and we will price just that.",
      },
      {
        icon: Check,
        title: "One-Off Projects",
        body: "Some jobs have an end date. A site build or a clean-up does not need a monthly plan.",
      },
    ],
  },
];

const ALL_SERVICES: Item[] = [
  {
    icon: Bot,
    title: "AI Visibility (GEO)",
    body: "People ask ChatGPT, Gemini, and Perplexity for advice now. We work on getting your business named when they do. This is called GEO, short for Generative Engine Optimization.",
  },
  {
    icon: Globe,
    title: "Technical SEO",
    body: "The behind-the-scenes work that lets Google read your site properly. Titles, links, sitemaps, and the errors that quietly hold you back.",
  },
  {
    icon: MapPin,
    title: "Local SEO and Google Business Profile",
    body: "When someone searches for a service near them, you want to be in that map box. We set up and clean your Google Business Profile so local customers can find you.",
  },
  {
    icon: Gauge,
    title: "Site Speed and Core Web Vitals",
    body: "A slow website loses people before it even loads. We find what is slowing yours down and fix it, so Google and your visitors both stop leaving.",
  },
  {
    icon: ShoppingCart,
    title: "Online Store SEO",
    body: "If you sell things online, your product pages need their own kind of help. We fix product listings so they show up in search and in Google Shopping.",
  },
  {
    icon: LineChart,
    title: "Tracking and Reports",
    body: "You cannot fix what you cannot see. We set up proper tracking, so you know where your visitors come from and what they do once they arrive.",
  },
  {
    icon: Accessibility,
    title: "Accessibility (ADA) Checks",
    body: "A site that blind or disabled people cannot use is a lost customer and a legal risk. We run real scans and fix what they find.",
  },
  {
    icon: FileText,
    title: "Blog and Content Writing",
    body: "Pages written for your business and your customers. Useful first, because that is what search engines and AI tools reward now.",
  },
  {
    icon: Code,
    title: "Website Design and Development",
    body: "A new site, or a fix for the one you have. Built to be found from day one, instead of adding SEO later and hoping.",
  },
  {
    icon: Megaphone,
    title: "Digital Marketing",
    body: "Getting the word out beyond search. We help you reach people where they already spend their time.",
  },
  {
    icon: Sparkles,
    title: "AI Tools for Your Business",
    body: "AI can do the boring parts of your day. Answering common questions, sorting emails, writing first drafts. We set that up for you.",
  },
  {
    icon: DollarSign,
    title: "Turning Visits Into Money",
    body: "Traffic on its own does not pay you. We look at where people give up on your site, and fix those spots.",
  },
];

/** Shows a real image once one exists, and a styled panel until then. */
function PicSlot({
  icon: Icon,
  image,
  alt,
}: {
  icon: LucideIcon;
  image?: string;
  alt: string;
}) {
  if (image) {
    return (
      <Image
        src={image}
        alt={alt}
        width={640}
        height={220}
        className="mb-6 h-36 w-full rounded-md object-cover"
      />
    );
  }
  return (
    <div className="mb-6 flex h-36 items-center justify-center rounded-md border border-border/50 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent">
      <Icon className="h-10 w-10 stroke-1 text-primary/70" />
    </div>
  );
}

export default function ServicesPage() {
  return (
    <div className="w-full">
      <div className="w-full py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="flex max-w-2xl flex-col items-start gap-4">
            <Badge>What We Do</Badge>
            <h1 className="text-left text-3xl font-regular tracking-tighter md:text-5xl">
              Everything we can do for your business.
            </h1>
            <p className="text-left text-lg leading-relaxed tracking-tight text-muted-foreground">
              Most of this work is ongoing. We do not hand you a report and
              disappear. We keep working on your site every month, and we tell
              you what changed in words you can actually use.
            </p>
            <p className="text-left text-lg leading-relaxed tracking-tight text-muted-foreground">
              Every business needs something a little different. So pick a
              package below, or tell us what you need and we will build one
              around it.
            </p>
          </div>
        </div>
      </div>

      {/* Tinted band so the packages read as their own section */}
      <div className="w-full border-y bg-muted/30 py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="mb-10 max-w-2xl">
            <h2 className="mb-3 text-2xl tracking-tight md:text-3xl">
              Our packages
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              What each one costs depends on how big your site is and how much
              of it needs work. That is why there is no number here. Tell us
              about your business and we will give you a real price, not a
              guess.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {PACKAGES.map((pkg, i) => (
              <ScrollReveal key={pkg.name} delay={i * 100}>
                <div
                  className={
                    (pkg.featured
                      ? "border-primary/40 ring-2 ring-primary/20 "
                      : "border-border/50 ") +
                    "flex h-full flex-col rounded-md border bg-card p-8 shadow-sm transition-transform duration-200 hover:scale-[1.01] hover:shadow-lg"
                  }
                >
                  <PicSlot icon={pkg.icon} image={pkg.image} alt={pkg.name} />

                  <div className="mb-1 flex flex-wrap items-center gap-3">
                    <h3 className="text-2xl tracking-tight">{pkg.name}</h3>
                    {pkg.featured && (
                      <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium uppercase tracking-wide text-primary-foreground">
                        Most chosen
                      </span>
                    )}
                  </div>
                  <p className="mb-6 text-sm text-muted-foreground">
                    {pkg.tagline}
                  </p>

                  <div className="mb-8 flex flex-1 flex-col gap-4">
                    {pkg.includes.map((item) => (
                      <div key={item.title} className="flex gap-3">
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                        <div>
                          <p className="text-sm font-medium">{item.title}</p>
                          <p className="text-sm leading-relaxed text-muted-foreground">
                            {item.body}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button
                    size="lg"
                    variant={pkg.featured ? "default" : "outline"}
                    className="w-full"
                    render={<a href="/contact">Talk to Us</a>}
                  />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="mb-10 max-w-2xl">
            <h2 className="mb-3 text-2xl tracking-tight md:text-3xl">
              The full list
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              Here is everything we handle. Some of it sits inside a package.
              Some of it is a one-time job. If you are not sure which you need,
              just ask.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ALL_SERVICES.map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 60}>
                <div className="flex h-full flex-col gap-3 rounded-md border border-border/50 bg-muted/50 p-6 transition-transform duration-200 hover:scale-[1.03] hover:shadow-lg">
                  <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10">
                    <s.icon className="h-6 w-6 stroke-1 text-primary" />
                  </div>
                  <h3 className="text-lg tracking-tight">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {s.body}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full border-t bg-muted/30 py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
              <h2 className="text-3xl tracking-tighter md:text-4xl">
                Not sure what you need?
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                That is normal, and it is fine. Send us your website address.
                We will look at it and tell you what we would fix first, and
                what can wait. Then you decide.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" render={<a href="/contact">Talk to Us</a>} />
                <Button
                  variant="outline"
                  size="lg"
                  render={<a href="/how-we-work">See How We Work</a>}
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
