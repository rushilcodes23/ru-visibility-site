import { Badge } from "@/components/ui/badge";
import ScrollReveal from "@/components/scroll-reveal";

export const metadata = {
  alternates: { canonical: "/terms" },
  title: "Terms of Service | Ru Visibility",
  description:
    "The plain-English terms for working with us: what we do, what we need from you, and what nobody in this industry can honestly promise.",
};

const LAST_UPDATED = "10 September 2026";

export default function TermsPage() {
  return (
    <div className="w-full py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="flex flex-col gap-4 items-start max-w-2xl mb-16">
            <Badge>Terms</Badge>
            <h1 className="text-3xl md:text-5xl tracking-tighter font-regular text-left">
              The deal, in plain English.
            </h1>
            <p className="text-lg leading-relaxed tracking-tight text-muted-foreground text-left">
              These terms cover using this website and working with us. They
              are written to be read, not to hide things in a wall of capital
              letters. If anything here is unclear, ask before you sign
              anything.
            </p>
            <p className="text-sm text-muted-foreground">
              Last updated: {LAST_UPDATED}
            </p>
          </div>
        </ScrollReveal>

        <div className="max-w-2xl flex flex-col gap-10">
          <section>
            <h2 className="text-2xl tracking-tight mb-4">What we do</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Ru Visibility provides ongoing SEO and GEO work: improving how a
              business shows up in search engines and in AI tools, plus the
              related content, website, and maintenance work described across
              this site.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              What is actually included for you, what it costs, and when it is
              billed are agreed in writing before any work starts. That
              written agreement wins if it ever disagrees with a page on this
              site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl tracking-tight mb-4">
              What we do not promise
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Nobody can honestly guarantee a search ranking, a position in an
              AI answer, a traffic number, or a sales figure. That is not
              modesty, it is how these systems work. Google changes its
              algorithm constantly and AI models retrain on their own
              schedule. Anyone promising you a specific rank is either
              guessing or lying.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              What we commit to is the work itself: the audits, the fixes, the
              content, the reporting, done properly and shown to you in plain
              language. Results follow good work, but they are not something
              we can put a number on in advance, and we will not pretend
              otherwise to win a contract.
            </p>
          </section>

          <section>
            <h2 className="text-2xl tracking-tight mb-4">
              What we need from you
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              This work needs access and answers. Practically, that means
              access to your website and the relevant accounts, accurate
              information about your business, and replies within a reasonable
              time when we need a decision.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              If we are blocked waiting on access or approval, timelines move.
              We will tell you when that happens rather than letting a
              deadline slide quietly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl tracking-tight mb-4">
              Fees and payment
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Fees, billing dates, and the length of the engagement are set out
              in your written agreement before work begins. Prices shown on
              this site are the current published rates and can change, but a
              change never applies retroactively to an engagement already
              agreed.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              If an invoice goes unpaid, we may pause work until it is
              settled. We will tell you before we pause anything.
            </p>
          </section>

          <section>
            <h2 className="text-2xl tracking-tight mb-4">
              Who owns what
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Work we produce for you — the content, the pages, the fixes on
              your site — is yours once it is paid for. You keep it if we stop
              working together.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              What stays ours is the general know-how, the methods, and the
              internal tooling we bring to the job. We do not hand those over,
              and equally we do not need to hold your site hostage to protect
              them.
            </p>
          </section>

          <section>
            <h2 className="text-2xl tracking-tight mb-4">
              Confidentiality
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Anything non-public you share with us during a project stays
              between us. We do not use one client&apos;s data or results to
              benefit another, and we do not name you as a client publicly
              without your say-so. How we handle your data day to day is set
              out in our{" "}
              <a
                href="/privacy"
                className="underline underline-offset-4 text-foreground"
              >
                privacy policy
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl tracking-tight mb-4">
              Ending the engagement
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Either side can end the engagement on the notice set out in your
              agreement. On the way out you get what you have paid for,
              handed over properly, along with your access back. No hostage
              taking, no withheld logins.
            </p>
          </section>

          <section>
            <h2 className="text-2xl tracking-tight mb-4">
              Limits on liability
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We are responsible for doing our work competently. We are not
              responsible for things outside our control: a search engine
              changing its algorithm, an AI tool changing what it cites, a
              third-party platform going down, or a change someone else makes
              to your site.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Where liability can be limited by law, ours is limited to the
              fees you paid us for the work in question. Nothing here limits
              liability that cannot legally be limited.
            </p>
          </section>

          <section>
            <h2 className="text-2xl tracking-tight mb-4">
              Using this website
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              The text, design, and code of this site are ours. Read it, quote
              it, link to it. Do not copy it wholesale to build a competing
              site. Do not try to break into it or disrupt it. If you find a
              security problem here, tell us at{" "}
              <a
                href="mailto:rushil@ruvisibility.com?subject=Security%20issue"
                className="underline underline-offset-4 text-foreground"
              >
                rushil@ruvisibility.com
              </a>{" "}
              and we will fix it and thank you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl tracking-tight mb-4">
              Changes to these terms
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              If these terms change, the date at the top changes with them. A
              change here does not rewrite an agreement you have already
              signed. Questions go to{" "}
              <a
                href="mailto:rushil@ruvisibility.com"
                className="underline underline-offset-4 text-foreground"
              >
                rushil@ruvisibility.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
