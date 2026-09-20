import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/scroll-reveal";
import { pageMetadata } from "@/lib/seo";
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

export const metadata = pageMetadata({
  path: "/services",
  title: "What We Do — SEO, GEO & AI Services | Ru Visibility",
  description: "Everything we can do for your business: SEO, AI visibility, local search, site speed, content, web design, and AI tools. Ask us what it costs.",
});

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

/**
 * Rows for the side-by-side table, in PACKAGES order (Essentials, Complete,
 * Custom). Kept literal rather than derived: the cards describe what each
 * package *contains*, and the useful comparison is the difference between
 * them, which is a judgement the card data does not encode. Change both
 * together — a table that disagrees with the cards above it is worse than no
 * table at all.
 */
const COMPARISON: { label: string; cells: (boolean | string)[] }[] = [
  { label: "SEO and GEO management, every month", cells: [true, true, "Optional"] },
  { label: "Monthly plain-English check-in", cells: [true, true, "Optional"] },
  { label: "Deeper technical fixes", cells: [false, true, "Optional"] },
  { label: "Accessibility scans", cells: [false, true, "Optional"] },
  { label: "Site maintenance and monitoring", cells: [false, true, "Optional"] },
  { label: "Blog and content written for you", cells: [false, true, "Optional"] },
  { label: "Pick only the parts you want", cells: [false, false, true] },
];

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

/**
 * One-off projects, as a second grid below the monthly packages.
 *
 * The three cards above are ongoing retainers, and the full list further down
 * already named website builds, local search, online-store work, tracking and
 * monetisation — but none of those were buyable, they were only mentioned.
 * Anyone who wanted just a website had to read to the bottom and then guess.
 *
 * Three of them on purpose: the grid is lg:grid-cols-3, so three fills a row
 * exactly and the layout is untouched. They reuse PackageCard, so these look
 * identical to the cards above rather than introducing a second style.
 *
 * Deliberately NOT added to the COMPARISON table. That table compares the
 * three monthly plans against each other, which is a fair comparison; a
 * one-off build has no monthly column to fill and would only add empty cells.
 */
const PROJECTS: Package[] = [
  {
    name: "Website Build",
    tagline: "A new site, or a rebuild of the one you have.",
    icon: Code,
    includes: [
      {
        icon: Code,
        title: "Design and Development",
        body: "A site built to be fast, to be found, and to work on a phone. Not a template with your logo dropped on it.",
      },
      {
        icon: Gauge,
        title: "Speed and Core Web Vitals",
        body: "Built quick from the start, so you are not paying someone later to undo a slow build.",
      },
      {
        icon: Accessibility,
        title: "Accessibility Built In",
        body: "Checked against the real standards as it is built, rather than bolted on after a complaint.",
      },
    ],
  },
  {
    name: "Local and Maps",
    tagline: "For a business people search for nearby.",
    icon: MapPin,
    includes: [
      {
        icon: MapPin,
        title: "Google Business Profile",
        body: "Your listing set up properly, so you turn up in the map results and not just the blue links.",
      },
      {
        icon: Globe,
        title: "Local Search Work",
        body: "The details that decide whether you show up for someone searching in your town, not the whole country.",
      },
      {
        icon: FileText,
        title: "Consistent Details Everywhere",
        body: "Name, address and phone matched across every listing. A mismatch quietly costs you rankings.",
      },
    ],
  },
  {
    name: "Store and Revenue",
    tagline: "For selling online, and measuring it.",
    icon: ShoppingCart,
    includes: [
      {
        icon: ShoppingCart,
        title: "Online Store SEO",
        body: "Product and category pages written and structured so they can actually be found and compared.",
      },
      {
        icon: LineChart,
        title: "Tracking and Reports",
        body: "Set up so you can see what is working. Without this you are guessing about where sales come from.",
      },
      {
        icon: DollarSign,
        title: "Turning Visits Into Money",
        body: "Traffic that never buys anything is a cost. We look at what happens after someone lands.",
      },
    ],
  },
];

// Plain-English definitions of the acronyms this industry throws around.
// Written so a business owner who has never heard any of them can follow it,
// and honest about the two that are the same thing under different names.
const ACRONYMS: { term: string; means: string; where: string }[] = [
  {
    term: "SEO",
    means:
      "Search engine optimisation. Getting found on Google when someone searches.",
    where: "The base. Everything else is built on top of it.",
  },
  {
    term: "GEO",
    means:
      "Generative engine optimisation. Getting named when someone asks ChatGPT, Gemini or Perplexity for a recommendation.",
    where: "Its own score in your audit.",
  },
  {
    term: "AEO",
    means:
      "Answer engine optimisation. Writing so the answer can be lifted straight off your page, instead of the machine having to work it out.",
    where: "Its own score in your audit.",
  },
  {
    term: "LLMO",
    means:
      "Large language model optimisation. A newer name for the same work as GEO and AEO together.",
    where: "Covered by GEO and AEO. Not a separate job.",
  },
  {
    term: "AI SEO",
    means:
      "An umbrella term some agencies use for all of the above. There is no separate technique behind it.",
    where: "Covered by GEO and AEO. Not a separate job.",
  },
  {
    term: "E-E-A-T",
    means:
      "Experience, expertise, authoritativeness and trust. Google's own test of whether your site looks like it was written by someone who knows the subject.",
    where: "Its own score in your audit.",
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

/**
 * One package card. Lifted out of the packages grid unchanged so the one-off
 * projects grid below can render with exactly the same markup — the point of
 * extracting it was to add a second grid without a second copy of the card
 * drifting away from this one.
 */
function PackageCard({ pkg, delay }: { pkg: Package; delay: number }) {
  return (
    <ScrollReveal delay={delay}>
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
        <p className="mb-6 text-sm text-muted-foreground">{pkg.tagline}</p>

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
  );
}

export default function ServicesPage() {
  return (
    <div className="w-full">
      <div className="page-surface w-full py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="page-head flex max-w-2xl flex-col items-start gap-4">
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

          {/* The acronyms, up front rather than only explained at the bottom
              of the page. People shopping for this arrive searching one of
              these words and need to see it covered before they scroll. Uses
              the same Badge already on this page, so it introduces no new
              visual language — and each one links to the table lower down
              that says what it actually means. */}
          <div className="mt-10 max-w-3xl">
            <p className="mb-3 text-sm text-muted-foreground">
              Covered here, whichever name you know it by:
            </p>
            <ul className="flex flex-wrap gap-2">
              {ACRONYMS.map((a) => (
                <li key={a.term}>
                  <a
                    href="#what-these-mean"
                    className="rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    <Badge variant="secondary">{a.term}</Badge>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Tinted band so the packages read as their own section */}
      <div className="band-surface w-full border-y py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="mb-10 max-w-2xl">
            <h2 className="mb-3 text-3xl tracking-tight md:text-4xl">
              Our packages
            </h2>
            <p className="leading-relaxed text-muted-foreground mb-4">
              What each one costs depends on how big your site is and how much
              of it needs work. That is why there is no number here. Tell us
              about your business and we will give you a real price, not a
              guess.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              Once you agree, we ask for 30&ndash;45% up front and the rest as
              set out in your agreement. That is standard for this kind of work,
              and we would rather you read it here than find it in the small
              print later. The full detail is in our{" "}
              <a
                href="/terms"
                className="underline underline-offset-4 text-foreground"
              >
                terms
              </a>
              .
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {PACKAGES.map((pkg, i) => (
              <PackageCard key={pkg.name} pkg={pkg} delay={i * 100} />
            ))}
          </div>

          {/* Side by side, because the three cards above answer "what is in
              this one" but not "what is the difference". A table is also the
              one format AI answers lift intact rather than paraphrasing. */}
          <ScrollReveal delay={100}>
            <div className="mt-16">
              <h3 className="mb-3 text-2xl tracking-tight">
                The three side by side
              </h3>
              <p className="mb-6 max-w-2xl leading-relaxed text-muted-foreground">
                Same information as the cards above, arranged so you can see
                what actually changes between them.
              </p>
              {/* tabIndex + role/label: this scrolls sideways on a phone, and
                  a scrollable region that cannot be focused is unreachable by
                  keyboard. axe flags it as scrollable-region-focusable. */}
              <div
                className="card-surface overflow-x-auto rounded-md focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
                tabIndex={0}
                role="region"
                aria-label="Package comparison, scrollable"
              >
                <table className="w-full text-sm">
                  <caption className="sr-only">
                    What each package includes, compared
                  </caption>
                  <thead>
                    <tr className="border-b">
                      <th scope="col" className="p-4 text-left font-medium">
                        What you get
                      </th>
                      {PACKAGES.map((p) => (
                        <th key={p.name} scope="col" className="p-4 text-left font-medium whitespace-nowrap">
                          {p.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON.map((row) => (
                      <tr key={row.label} className="border-b last:border-0">
                        <th scope="row" className="p-4 text-left font-normal">
                          {row.label}
                        </th>
                        {row.cells.map((cell, i) => (
                          <td key={i} className="p-4 text-muted-foreground">
                            {cell === true ? (
                              <>
                                <Check className="inline h-4 w-4 text-primary" aria-hidden="true" />
                                <span className="sr-only">Included</span>
                              </>
                            ) : cell === false ? (
                              <>
                                <span aria-hidden="true">—</span>
                                <span className="sr-only">Not included</span>
                              </>
                            ) : (
                              cell
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Pricing is quoted per business rather than listed, because the
                work genuinely differs — see{" "}
                <a href="/faq" className="underline underline-offset-4 hover:text-foreground">
                  the FAQ
                </a>{" "}
                for how that is worked out. Accessibility scans are run against{" "}
                <a
                  href="https://www.w3.org/WAI/standards-guidelines/wcag/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 hover:text-foreground"
                >
                  WCAG 2.1 AA
                </a>
                , the standard ADA web claims are generally measured against —
                not a checklist of our own invention. Our own results are{" "}
                <a href="/accessibility" className="underline underline-offset-4 hover:text-foreground">
                  published with their date
                </a>
                .
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* One-off projects. Same card, same three-column grid as the monthly
          packages above, so this reads as a second row of the same thing
          rather than a new section style. */}
      <div className="page-surface w-full py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="mb-10 max-w-2xl">
            <h2 className="mb-3 text-3xl tracking-tight md:text-4xl">
              One-off projects
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              Not everything needs a monthly plan. Some jobs have a start and
              an end. These are priced as a single project, and you can take
              one on its own or add it to a package above.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {PROJECTS.map((pkg, i) => (
              <PackageCard key={pkg.name} pkg={pkg} delay={i * 100} />
            ))}
          </div>
        </div>
      </div>

      <div className="page-surface w-full border-t py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="mb-10 max-w-2xl">
            <h2 className="mb-3 text-3xl tracking-tight md:text-4xl">
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
                <div className="flex h-full flex-col gap-3 card-surface rounded-md p-6 transition-transform duration-200 hover:scale-[1.03]">
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

      {/* The same work is sold under half a dozen names. Prospects arrive
          searching one of them and need to know it is covered, so the terms
          are stated plainly and mapped to what is actually done — rather than
          listed as six separate services, which would be six names for two
          jobs. */}
      <div className="page-surface w-full border-t py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="mb-10 max-w-2xl">
            <h2
              id="what-these-mean"
              className="mb-3 scroll-mt-28 text-3xl tracking-tight md:text-4xl"
            >
              AEO, GEO, LLMO, AI SEO, E-E-A-T — what these mean
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              You will see these on other websites, often with no explanation.
              Here is what each one actually means, in plain words, and where
              it sits in the work we do. Two of them are different names for
              the same thing, and we would rather tell you that than sell it
              to you twice.
            </p>
          </div>

          <div
            tabIndex={0}
            role="region"
            aria-label="What AEO, GEO, LLMO, AI SEO and E-E-A-T mean"
            className="overflow-x-auto card-surface rounded-md"
          >
            <table className="w-full min-w-[34rem] text-left text-sm">
              <thead>
                <tr className="border-b">
                  <th scope="col" className="p-4 font-medium">Term</th>
                  <th scope="col" className="p-4 font-medium">What it means</th>
                  <th scope="col" className="p-4 font-medium">Where it sits</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                {ACRONYMS.map((a) => (
                  <tr key={a.term} className="border-b last:border-0">
                    <th scope="row" className="p-4 align-top font-medium text-foreground whitespace-nowrap">
                      {a.term}
                    </th>
                    <td className="p-4 align-top leading-relaxed">{a.means}</td>
                    <td className="p-4 align-top leading-relaxed">{a.where}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Our audit gives a separate score for SEO, GEO, AEO and E-E-A-T, so
            you can see which one is actually holding you back. LLMO and AI SEO
            get no score of their own on purpose — they are measured from the
            same evidence as GEO and AEO, and inventing two more numbers out of
            it would just be the same answer written four times.
          </p>
        </div>
      </div>

      <div className="band-surface w-full border-t py-20 lg:py-28">
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
