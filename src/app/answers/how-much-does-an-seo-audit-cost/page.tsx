import { AnswerPage, answerMetadata, Ext, SRC } from "@/components/answer-page";

const SLUG = "how-much-does-an-seo-audit-cost";
export const metadata = answerMetadata(SLUG);

export default function Page() {
  return (
    <AnswerPage
      slug={SLUG}
      short={
        <>
          Anywhere from free to several thousand dollars. In Ahrefs&apos;
          survey of 439 SEO providers, the most common fee for a one-off SEO
          project was $2,501 to $5,000. The survey didn&apos;t break audits out
          on their own, and automated checks cost far less, sometimes nothing.
        </>
      }
      sources={[SRC.ahrefsPricing]}
    >
      <h2>What the survey found</h2>
      <p>
        Ahrefs asked 439 SEO providers what they charge (
        <Ext href={SRC.ahrefsPricing.href}>Ahrefs, updated August 2024</Ext>):
      </p>
      <ul className="flex list-disc flex-col gap-2 pl-6">
        <li>
          &ldquo;$2,501–$5,000 is the most popular per-project fee, with 21.2%
          of respondents charging this rate.&rdquo;
        </li>
        <li>
          &ldquo;$75–$100 per hour is the most popular hourly rate for SEOs,
          with 24% of respondents charging this rate,&rdquo; and the average was
          $111 an hour.
        </li>
      </ul>
      <p>
        An audit is a typical one-off project, so that band is a fair guide to
        a hands-on audit by an agency or consultant. Treat it as a guide, not a
        price list: the survey covered SEO projects in general, and rates vary
        by country.
      </p>

      <h2>What changes the price</h2>
      <ul className="flex list-disc flex-col gap-2 pl-6">
        <li>
          <strong>Size.</strong> A ten-page local site and a store with
          thousands of products are different jobs.
        </li>
        <li>
          <strong>Depth.</strong> A technical check, a content review and a
          backlink review are often priced separately.
        </li>
        <li>
          <strong>Who reads the results.</strong> Raw tool output is cheap. A
          person checking it, ruling out false alarms and putting fixes in
          order is what you pay for.
        </li>
        <li>
          <strong>Whether fixes are included.</strong> Some audits end with a
          list; others include doing the work.
        </li>
      </ul>

      <h2>What a free audit usually is</h2>
      <p>
        An automated report: a crawler visits your pages and lists what it
        finds. That is genuinely useful for spotting broken links, missing
        titles and pages blocked from Google. Its limit is judgement. Tools
        flag things that don&apos;t matter, and can miss things that do.
      </p>

      <h2>What ours costs</h2>
      <p>
        Our first check is free. Send your web address using the form below
        and we send you the full result, covering Google and AI tools, not a
        taster with the useful parts held back. Ongoing work is quoted after
        we have looked at your site, because the work genuinely differs from
        one business to the next;{" "}
        <a href="/services">here is what we offer</a>.
      </p>
    </AnswerPage>
  );
}
