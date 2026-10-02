import {
  AnswerPage,
  answerMetadata,
  Ext,
  FromOurAudits,
  OurAudits,
  SRC,
  universal,
} from "@/components/answer-page";

const SLUG = "is-seo-worth-it-for-small-business";
export const metadata = answerMetadata(SLUG);

export default function Page() {
  return (
    <AnswerPage
      slug={SLUG}
      short={
        <>
          Usually, if people search for what you sell in the places you sell
          it. SEO is slow, nobody can guarantee rankings, and it suits
          businesses with steady search demand better than one-off sales. The
          basics are mostly one-off fixes, so start there before paying for
          anything ongoing.
        </>
      }
      sources={[SRC.ahrefsPricing]}
    >
      <h2>When it is worth it</h2>
      <p>
        When customers look for your kind of business on Google: a dentist,
        an accountant, a plumber, a florist. Those searches happen every day,
        and the people making them are ready to choose. A good position puts
        you in front of them without paying for each click.
      </p>
      <p>
        You can check demand for free. Type your service and town into Google
        and see what it suggests; those suggestions are searches people
        actually make. If you already have a site, Google Search Console shows
        the searches it appears for.
      </p>

      <h2>When it isn&apos;t, yet</h2>
      <ul className="flex list-disc flex-col gap-2 pl-6">
        <li>Nobody searches for what you offer, because the category is new.</li>
        <li>You need customers next week. SEO takes months; ads are faster.</li>
        <li>
          Your website itself is the problem, such as a slow or broken site.
          Fix that first.
        </li>
      </ul>

      <h2>What it costs</h2>
      <p>
        In Ahrefs&apos; survey of 439 SEO providers, &ldquo;$501–$1,000 per
        month is the most popular monthly retainer rate for SEOs&rdquo;, and
        the average across respondents was $2,917 a month (
        <Ext href={SRC.ahrefsPricing.href}>Ahrefs, updated August 2024</Ext>).
      </p>

      <h2>Start with the basics</h2>
      <p>
        A lot of what holds small sites back is fixable once, not monthly.
      </p>

      <FromOurAudits>
        Of <OurAudits />, {universal.missingMetaSomewhere.sitesPct}% had a page
        with no meta description and {universal.missingH1Somewhere.sitesPct}% a
        page with no main heading. Fixes like these are usually a one-off
        job, not a monthly retainer.
      </FromOurAudits>

      <h2>A warning</h2>
      <p>
        Anyone who guarantees a first-place ranking is promising something they
        don&apos;t control. What a good provider can promise is honest
        measurement and work you can see.
      </p>
    </AnswerPage>
  );
}
