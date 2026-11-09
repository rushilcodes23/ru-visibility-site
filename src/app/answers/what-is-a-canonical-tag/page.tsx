import { AnswerPage, CodeBlock, SRC, answerMetadata } from "@/components/answer-page";

const SLUG = "what-is-a-canonical-tag";
export const metadata = answerMetadata(SLUG);

export default function Page() {
  return (
    <AnswerPage
      slug={SLUG}
      short={
        <>
          A canonical tag is a line in a page&apos;s code that names the main address of that page. It is used when the same content can be reached at more than one address, so Google knows which one to show and where to send the ranking signals.
        </>
      }
      sources={[SRC.googleCanonical]}
    >
      <h2>What it looks like</h2>

      <CodeBlock label="A canonical tag in a page&apos;s head">
        {`<link rel="canonical" href="https://www.example.com/services/" />`}
      </CodeBlock>

      <h2>Why the same page ends up at several addresses</h2>

      <ul>
        <li>With and without www, or with http and https.</li>
        <li>Tracking codes added to links, such as ?utm_source=facebook.</li>
        <li>Shops where one product sits in several categories.</li>
        <li>Printer-friendly or filtered versions of a page.</li>
      </ul>

      <h2>It is a hint, not a command</h2>

      <p>
        Google weighs the canonical tag alongside redirects, sitemaps and internal links, and can pick a different main version if the signals disagree. You can see which one Google chose with the URL Inspection tool in Search Console. For pages that have moved for good, a 301 redirect is stronger than a canonical tag. Read more about <a href="/answers/what-is-duplicate-content">duplicate content</a>.
      </p>
    </AnswerPage>
  );
}
