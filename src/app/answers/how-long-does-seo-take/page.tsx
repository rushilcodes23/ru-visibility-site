import { AnswerPage, SRC, answerMetadata } from "@/components/answer-page";

const SLUG = "how-long-does-seo-take";
export const metadata = answerMetadata(SLUG);

export default function Page() {
  return (
    <AnswerPage
      slug={SLUG}
      short={
        <>
          Usually four months to a year. Google&apos;s own guidance says SEO work typically takes that long to be put in place and then show results. Some fixes work faster, such as removing a block that stopped Google reading your site. New websites and competitive searches take longest.
        </>
      }
      sources={[SRC.googleNeedSeo]}
    >
      <h2>What makes it faster or slower</h2>

      <ul>
        <li>Fast: fixing something broken, such as a noindex tag left on the whole site, a robots.txt block or missing pages. Once Google recrawls, the change can show within weeks.</li>
        <li>Medium: rewriting titles and service pages, building internal links, completing a Google Business Profile.</li>
        <li>Slow: new websites with no history, very competitive searches, and building a reputation through reviews and mentions from other sites.</li>
      </ul>

      <h2>How to tell if it is working early</h2>

      <p>
        Rankings move before sales do. In Google Search Console, watch impressions (how often you appear) and average position for the searches you care about. Impressions rising is usually the first sign, then clicks, then enquiries.
      </p>

      <h2>A warning sign</h2>

      <p>
        Anyone who promises first place on Google, or results in days, is guessing or using tactics that break Google&apos;s rules. Read <a href="/answers/is-seo-worth-it-for-small-business">whether SEO is worth it for a small business</a> before committing to a monthly contract.
      </p>
    </AnswerPage>
  );
}
