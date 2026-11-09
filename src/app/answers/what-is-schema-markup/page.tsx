import { AnswerPage, Ext, SRC, answerMetadata } from "@/components/answer-page";

const SLUG = "what-is-schema-markup";
export const metadata = answerMetadata(SLUG);

export default function Page() {
  return (
    <AnswerPage
      slug={SLUG}
      short={
        <>
          Schema markup, also called structured data, is code on a page that labels its facts: this is the business name, this is the phone number, these are the opening hours. Search engines read it to understand the page and to show extras in results, like star ratings or prices.
        </>
      }
      sources={[SRC.googleStructured, SRC.richResults]}
    >
      <h2>Does it help rankings?</h2>

      <p>
        Not directly. Google says structured data helps it understand a page and makes the page eligible for rich results. It is not a ranking boost on its own. The gain is a clearer, larger result that more people click.
      </p>

      <h2>Which types matter for a small business</h2>

      <ul>
        <li>LocalBusiness (or a more exact type such as Dentist or Restaurant): name, address, phone, hours.</li>
        <li>Organization: logo and social profiles.</li>
        <li>Product and Offer: price and stock, for shops.</li>
        <li>BreadcrumbList: the page&apos;s place in your site.</li>
        <li>Article: author and date, for blog posts.</li>
      </ul>

      <p>
        FAQ markup now only shows as a rich result for well-known government and health sites, so adding it to a business site no longer earns the dropdown in results.
      </p>

      <h2>How to add and test it</h2>

      <p>
        Google recommends the JSON-LD format, a block of code in the page. Many website builders and SEO plugins add it for you. Paste your page into <Ext href="https://search.google.com/test/rich-results">Google&apos;s Rich Results Test</Ext> to see what Google reads and whether anything is broken. The markup must match what the page shows, or Google may ignore it.
      </p>
    </AnswerPage>
  );
}
