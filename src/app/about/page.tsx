import { Badge } from "@/components/ui/badge";
import { AuditCta } from "@/components/ui/audit-cta";
import ScrollReveal from "@/components/scroll-reveal";
import { pageMetadata } from "@/lib/seo";
import findings from "@/lib/research-findings.json";
import { Mail, Phone } from "lucide-react";

// Inline rather than from lucide — v1 dropped brand icons.
function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const AUDITED = findings.corpus.uniqueDomains.toLocaleString("en-US");

export const metadata = pageMetadata({
  path: "/about",
  title: "About — Rushil A. Bajpai, Founder | Ru Visibility",
  // Kept under 155 characters — longer descriptions truncate in search
  // results, which an earlier Screaming Frog crawl flagged across the site.
  description: `Ru Visibility is Rushil A. Bajpai — an AI visibility (GEO) and SEO consultant working internationally, on research from ${AUDITED} site audits.`,
});

const PROFILES = [
  {
    icon: (c: string) => <LinkedInIcon className={`${c} fill-primary`} />,
    label: "LinkedIn",
    value: "rushil-a-bajpai",
    href: "https://www.linkedin.com/in/rushil-a-bajpai-21b99a3a9",
  },
  {
    icon: (c: string) => <XIcon className={`${c} fill-primary`} />,
    label: "X",
    value: "@RushilA_Bajpai",
    href: "https://x.com/RushilA_Bajpai",
  },
  {
    icon: (c: string) => <Mail className={`${c} stroke-1 text-primary`} />,
    label: "Email",
    value: "rushil@ruvisibility.com",
    href: "mailto:rushil@ruvisibility.com",
  },
  {
    icon: (c: string) => <Phone className={`${c} stroke-1 text-primary`} />,
    label: "Phone",
    value: "+91 72229 99365",
    href: "tel:+917222999365",
  },
];

export default function AboutPage() {
  return (
    <>
      <div className="page-surface w-full py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="page-head flex flex-col gap-4 items-start max-w-3xl mb-14">
              <Badge>About</Badge>
              <h1 className="text-3xl md:text-5xl tracking-tighter font-regular text-left">
                Ru Visibility is Rushil A. Bajpai.
              </h1>
              <p className="text-lg leading-relaxed tracking-tight text-muted-foreground text-left">
                Founder, and the person who does the work. AI visibility (GEO)
                and SEO consultant, working with businesses internationally.
                When you send a message here, it reaches me — there is no
                account manager in between, and no team to hand you off to.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-6 lg:grid-cols-3 mb-16">
            <ScrollReveal delay={100}>
              <div className="card-surface rounded-md p-6 md:p-8 h-full">
                <h2 className="text-2xl tracking-tight mb-4 md:text-3xl">
                  What the work is built on
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  I built the audit tooling this business runs on, and I have
                  pointed it at{" "}
                  <a href="/research" className="underline underline-offset-4 text-foreground">
                    {AUDITED} real business websites
                  </a>{" "}
                  so far. That is where the opinions on this site come from —
                  measured results across a large number of sites, not a
                  recycled checklist.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  The findings from those audits are published in aggregate,
                  including the parts that undercut a sales pitch. The single
                  clearest one: these sites average far worse on AI visibility
                  than on conventional SEO, and almost nobody is doing it well
                  yet.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <div className="card-surface rounded-md p-6 md:p-8 h-full">
                <h2 className="text-2xl tracking-tight mb-4 md:text-3xl">
                  How I work
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Ongoing management rather than a one-time report. GEO is not
                  something you fix once — models retrain, competitors move,
                  and what gets a business recommended this month can change.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  I will not promise you a ranking or a guaranteed AI citation,
                  because nobody can honestly promise either. What I can do is
                  measure where you stand now, fix what is genuinely holding
                  you back, and show you the before and after using the same
                  prompts both times.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="card-surface rounded-md p-6 md:p-8 h-full">
                <h2 className="text-2xl tracking-tight mb-4 md:text-3xl">
                  Where to find me
                </h2>
                <ul className="flex flex-col gap-4">
                  {PROFILES.map((p) => (
                    <li key={p.label}>
                      <a
                        href={p.href}
                        className="group flex items-center gap-3 min-h-11"
                        {...(p.href.startsWith("http")
                          ? { target: "_blank", rel: "me noopener noreferrer" }
                          : {})}
                      >
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                          {p.icon("w-4 h-4")}
                        </span>
                        <span className="flex flex-col">
                          <span className="text-xs text-muted-foreground">
                            {p.label}
                          </span>
                          <span className="text-sm group-hover:underline underline-offset-4">
                            {p.value}
                          </span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={100}>
            <div className="card-surface rounded-md p-6 md:p-8 max-w-3xl">
              <h2 className="text-2xl tracking-tight mb-4 md:text-3xl">
                What this business is, plainly
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Ru Visibility is a one-person consultancy, not an agency with a
                floor of staff. That is worth saying outright, because it
                changes what you should expect: direct access and work done by
                the person you spoke to, but a limit on how many clients can be
                taken on at once.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                There is no office to visit — the work is remote, for clients
                in the US, India and elsewhere. The{" "}
                <a href="/locations" className="underline underline-offset-4 text-foreground">
                  markets page
                </a>{" "}
                lists where work has actually been done, and{" "}
                <a href="/accessibility" className="underline underline-offset-4 text-foreground">
                  this site&apos;s own accessibility scan
                </a>{" "}
                is published with its date, because a consultancy that sells
                audits should be willing to show its own.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
      <AuditCta />
    </>
  );
}
