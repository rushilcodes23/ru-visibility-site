import { Badge } from "@/components/ui/badge";
import ScrollReveal from "@/components/scroll-reveal";

export const metadata = {
  alternates: { canonical: "/terms" },
  title: "Terms of Service | Ru Visibility",
  description:
    "The plain-English terms for working with us: what we do, what we need from you, and what nobody in this industry can honestly promise.",
};

const LAST_UPDATED = "11 September 2026";

export default function TermsPage() {
  return (
    <div className="page-surface w-full py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="page-head flex flex-col gap-4 items-start max-w-2xl mb-16">
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
            <h2 className="text-2xl tracking-tight mb-4 md:text-3xl">What we do</h2>
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
            <h2 className="text-2xl tracking-tight mb-4 md:text-3xl">
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
            <h2 className="text-2xl tracking-tight mb-4 md:text-3xl">
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
            <h2 className="text-2xl tracking-tight mb-4 md:text-3xl">
              Fees and payment
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Fees, billing dates, and the length of the engagement are set out
              in your written agreement before work begins. We do not publish
              prices, because what the work costs depends on the size of your
              site and how much of it needs fixing. You get a real figure after
              we have looked, not a guess before.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              <strong className="text-foreground font-medium">
                We ask for 30% to 45% of the fee up front
              </strong>{" "}
              before work starts. The exact share is set in your agreement. This
              is normal for this kind of work and it protects both sides: it
              covers the hours that go in before anything is visible, and it
              means we are committed to your project rather than juggling it
              against whoever pays first.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The balance is invoiced as set out in your agreement — on
              completion for one-off projects, or monthly for ongoing work.
              Monthly retainers are billed in advance for the month ahead.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              If an invoice goes unpaid, we may pause work until it is settled.
              We will tell you before we pause anything. The advance is applied
              against your total, not charged on top of it, and it is
              non-refundable once work has started, since the time it covers has
              already been spent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl tracking-tight mb-4 md:text-3xl">
              Tax, currency, and third-party costs
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Quoted fees are exclusive of tax. Any tax that applies — GST or
              equivalent — is added to the invoice and shown separately. The
              currency of your invoice is set in your agreement before work
              begins, and bank or conversion charges are yours.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Some work needs things we do not supply: ad spend, paid tools,
              domain or hosting fees, stock licences. Those are billed at cost
              or paid by you directly, and we will never commit you to one
              without asking first.
            </p>
          </section>

          <section>
            <h2 className="text-2xl tracking-tight mb-4 md:text-3xl">
              When the work changes
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Projects grow. If you ask for something outside what was agreed,
              we will tell you what it adds in time and cost before we start
              it, and you decide. We do not quietly absorb extra work and we do
              not quietly bill for it either.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Small adjustments inside the agreed scope are just part of the
              job and are not charged separately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl tracking-tight mb-4 md:text-3xl">
              Refunds
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Work already done is payable. The advance is non-refundable once
              work has started, because it covers time already spent. If you
              cancel before we begin, it is returned in full.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              For monthly work, cancelling part-way through a month does not
              refund that month, but you keep everything delivered in it and we
              will not bill the next one. We do not refund on the basis of
              rankings or traffic, for the reason set out above: nobody
              controls those, so nobody can sell a guarantee on them.
            </p>
          </section>

          <section>
            <h2 className="text-2xl tracking-tight mb-4 md:text-3xl">
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
            <h2 className="text-2xl tracking-tight mb-4 md:text-3xl">
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
            <h2 className="text-2xl tracking-tight mb-4 md:text-3xl">
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
            <h2 className="text-2xl tracking-tight mb-4 md:text-3xl">
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
            <h2 className="text-2xl tracking-tight mb-4 md:text-3xl">
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
            <h2 className="text-2xl tracking-tight mb-4 md:text-3xl">
              Who you are agreeing with
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Ru Visibility operates out of Raipur, Chhattisgarh, India.
              These terms are governed by the laws of India, and any dispute
              that can&apos;t be resolved directly is subject to the
              jurisdiction of the courts in Raipur, Chhattisgarh.
            </p>
          </section>

          <section>
            <h2 className="text-2xl tracking-tight mb-4 md:text-3xl">
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
