import { AnswerPage, SRC, answerMetadata } from "@/components/answer-page";

const SLUG = "is-wordpress-good-for-seo";
export const metadata = answerMetadata(SLUG);

export default function Page() {
  return (
    <AnswerPage
      slug={SLUG}
      short={
        <>
          Yes. Google does not rank a site higher or lower because of the platform it is built on. WordPress gives you full control over titles, addresses, sitemaps and content, so it can do everything SEO needs. Most WordPress problems come from slow themes, too many plugins and missed updates.
        </>
      }
      sources={[SRC.googleStarter]}
    >
      <h2>What WordPress does well</h2>

      <ul>
        <li>Full control of page titles, descriptions, addresses and headings.</li>
        <li>SEO plugins such as Yoast or Rank Math add sitemaps and structured data.</li>
        <li>Easy to add many pages and posts with a clear structure.</li>
      </ul>

      <h2>Where it goes wrong</h2>

      <ul>
        <li>Heavy page-builder themes that load slowly on phones.</li>
        <li>Twenty plugins where five would do, each adding code to every page.</li>
        <li>Out-of-date plugins, which are the most common way small sites get hacked. A hacked site can be flagged or dropped by Google.</li>
        <li>Cheap hosting with slow server response.</li>
      </ul>

      <h2>WordPress, Wix, Squarespace or Shopify?</h2>

      <p>
        All of them can rank. Wix and Squarespace are simpler and harder to break, with a little less control. Shopify suits shops. Choose by who will run the site, then keep it fast, secure and full of useful pages. The platform matters far less than the content.
      </p>
    </AnswerPage>
  );
}
