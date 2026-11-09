import { AnswerPage, SRC, answerMetadata } from "@/components/answer-page";

const SLUG = "what-is-mobile-first-indexing";
export const metadata = answerMetadata(SLUG);

export default function Page() {
  return (
    <AnswerPage
      slug={SLUG}
      short={
        <>
          Mobile-first indexing means Google crawls your website as a smartphone and uses the phone version of each page for indexing and ranking. If text, links or images only exist on the desktop version, Google does not count them.
        </>
      }
      sources={[SRC.googleMobileFirst]}
    >
      <h2>What this means for your site</h2>

      <ul>
        <li>The phone version needs the same main content as the desktop one. Text tucked inside tap-to-open sections is fine, as long as it is in the page.</li>
        <li>Headings, image alt text, structured data and the page title should be the same on both.</li>
        <li>Pages should not block phone visitors with full-screen pop-ups.</li>
      </ul>

      <h2>The common mistakes</h2>

      <p>
        Older sites sometimes had a separate, cut-down mobile site (m.example.com) with less text. Some themes also hide whole sections on phones to save space. In both cases the hidden content stops counting.
      </p>

      <h2>How to check</h2>

      <p>
        Open your site on a phone and compare it with the desktop version: is every service, price and contact detail still there? In Search Console, the URL Inspection tool shows the page as Google&apos;s smartphone crawler saw it.
      </p>
    </AnswerPage>
  );
}
