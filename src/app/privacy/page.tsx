import { Badge } from "@/components/ui/badge";
import ScrollReveal from "@/components/scroll-reveal";

export const metadata = {
  alternates: { canonical: "/privacy" },
  title: "Privacy Policy | Ru Visibility",
  description:
    "What we collect, why, and who touches it. No analytics, no tracking pixels, no ad networks — just the contact form and email.",
};

// Bump this whenever the substance of the policy changes, not on every
// wording tweak. It's a real "last updated" date, so keep it honest.
const LAST_UPDATED = "11 September 2026";

export default function PrivacyPage() {
  return (
    <div className="page-surface w-full py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="page-head flex flex-col gap-4 items-start max-w-2xl mb-16">
            <Badge>Privacy</Badge>
            <h1 className="text-3xl md:text-5xl tracking-tighter font-regular text-left">
              We collect almost nothing.
            </h1>
            <p className="text-lg leading-relaxed tracking-tight text-muted-foreground text-left">
              Most privacy policies are long because the site behind them is
              doing a lot. This one is short because ours is not. There is no
              analytics tool on this site, no tracking pixel, no advertising
              network, and no account to sign up for.
            </p>
            <p className="text-sm text-muted-foreground">
              Last updated: {LAST_UPDATED}
            </p>
          </div>
        </ScrollReveal>

        <div className="max-w-2xl flex flex-col gap-10">
          <section>
            <h2 className="text-2xl tracking-tight mb-4 md:text-3xl">
              What we actually collect
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              One thing: whatever you type into the contact form. That is your
              name, your email address, your message, and your phone number if
              you choose to add one. The phone field is optional. The other
              three are not, because we cannot reply without them.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The form also has one hidden field that you will never see. It
              is a spam trap. Real people leave it blank and bots fill it in.
              If it comes back filled, we drop the message. Nothing from a
              trapped submission is stored or sent.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              If you email or call us directly instead, we have whatever you
              chose to put in that email or say on that call. That is it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl tracking-tight mb-4 md:text-3xl">
              What we use it for
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Replying to you. That is the whole purpose. If you ask about an
              audit, we use your message to answer you and, if it goes
              further, to scope the work.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We do not sell your details. We do not rent them, trade them, or
              hand them to an advertiser. We do not add you to a mailing list
              because you filled in a contact form. If we ever start sending a
              newsletter, you will have to ask for it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl tracking-tight mb-4 md:text-3xl">
              Who else touches it
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Two companies, both because they are needed to run the site at
              all:
            </p>
            <ul className="text-muted-foreground leading-relaxed list-disc pl-5 flex flex-col gap-2 mb-4">
              <li>
                <strong className="text-foreground font-medium">Resend</strong>{" "}
                delivers the contact form as an email to us. Your name, email,
                phone and message pass through them on the way.
              </li>
              <li>
                <strong className="text-foreground font-medium">
                  Cloudflare
                </strong>{" "}
                hosts and serves this site. Like any web host, it handles the
                network requests that load these pages, which includes your IP
                address. That is how the site gets to your browser and how it
                is protected from attacks.
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              Beyond those two, your message reaches one inbox: ours. No team
              of people, no CRM full of strangers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl tracking-tight mb-4 md:text-3xl">
              Cookies and what your browser stores
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              This site sets no tracking cookies. There is no cookie banner
              here because there is nothing to consent to.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The one thing stored on your device is which theme you picked,
              light or dark. It is saved in your browser&apos;s local storage
              so the site does not flash the wrong colours next time you
              visit. It never leaves your device and it never reaches us.
              Clearing your browser data removes it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl tracking-tight mb-4 md:text-3xl">
              How long we keep it
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Your message sits in our email, the same way any email does. We
              keep enquiries while a conversation is live and for a reasonable
              period after, in case you come back. If you want yours deleted
              sooner, ask and we will delete it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl tracking-tight mb-4 md:text-3xl">
              Your rights over your data
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You can ask us what we hold about you, ask us to correct it, or
              ask us to delete it. Email{" "}
              <a
                href="mailto:rushil@ruvisibility.com?subject=Privacy%20request"
                className="underline underline-offset-4 text-foreground"
              >
                rushil@ruvisibility.com
              </a>{" "}
              and say which. You do not need a special form or a legal reason.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We will not make you argue for it and we will not charge you for
              it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl tracking-tight mb-4 md:text-3xl">
              Client data during a project
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              This is separate from the contact form, and it matters if you
              hire us. Doing this work means getting access to things like
              your website, your analytics, or your search console.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We ask for the least access that lets us do the job, we use it
              only for your project, and we hand it back or lose it when the
              work ends. We do not use one client&apos;s data to help another
              one. Anything sensitive we see stays between us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl tracking-tight mb-4 md:text-3xl">
              Why we are allowed to hold it
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You sent it to us and you asked us to reply. That is the whole
              basis. In GDPR language it is your consent for an enquiry, and
              our legitimate interest in answering someone who contacted our
              business.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We never rely on a pre-ticked box or bury permission in a longer
              agreement. If you want that consent withdrawn, say so and it is
              withdrawn.
            </p>
          </section>

          <section>
            <h2 className="text-2xl tracking-tight mb-4 md:text-3xl">
              Where in the world it goes
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We are based in India, so if you write to us from the US, the UK,
              or the EU, your message is read in India. Cloudflare serves this
              site from whichever of its locations is nearest you, and Resend
              processes the email that carries your enquiry to us.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We are telling you this plainly rather than hiding it in a
              sub-clause, because a transfer outside your own country is the
              kind of thing you are entitled to know about before you type
              anything into a form.
            </p>
          </section>

          <section>
            <h2 className="text-2xl tracking-tight mb-4 md:text-3xl">
              How it is kept safe
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The form is served over HTTPS, so what you type is encrypted in
              transit. It is not written to any database on this site — it goes
              straight out as an email, which means there is no stored copy
              here for anyone to break into.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              No system is perfect, and we are not going to claim otherwise. If
              something ever did go wrong with data you had given us, we would
              tell you directly and quickly rather than waiting to see whether
              you noticed.
            </p>
          </section>

          <section>
            <h2 className="text-2xl tracking-tight mb-4 md:text-3xl">
              Children
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              This is a service for businesses. It is not aimed at children and
              we do not knowingly collect anything from one. If you believe a
              child has sent us their details, tell us and we will delete them.
            </p>
          </section>

          <section>
            <h2 className="text-2xl tracking-tight mb-4 md:text-3xl">
              If you are unhappy with any of this
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Tell us first — most things are a two-minute fix. If that does
              not satisfy you, you are entitled to complain to a data
              protection regulator: in India that is the Data Protection Board,
              in the UK the ICO, and in the EU your national supervisory
              authority. You do not need our permission to do that, and we are
              not going to make it awkward if you do.
            </p>
          </section>

          <section>
            <h2 className="text-2xl tracking-tight mb-4 md:text-3xl">Who runs this</h2>
            <p className="text-muted-foreground leading-relaxed">
              Ru Visibility is operated by Rushil, based in Raipur,
              Chhattisgarh, India. That is who receives the contact form and
              who you are emailing at rushil@ruvisibility.com.
            </p>
          </section>

          <section>
            <h2 className="text-2xl tracking-tight mb-4 md:text-3xl">
              If this policy changes
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              If we add something that collects data, this page gets updated
              before it goes live, and the date at the top changes with it. We
              are not going to quietly bolt on a tracker and leave this page
              saying otherwise. Questions about any of it go to{" "}
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
