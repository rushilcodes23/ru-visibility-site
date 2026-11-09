import { AnswerPage, CodeBlock, SRC, answerMetadata } from "@/components/answer-page";

const SLUG = "what-is-llms-txt";
export const metadata = answerMetadata(SLUG);

export default function Page() {
  return (
    <AnswerPage
      slug={SLUG}
      short={
        <>
          llms.txt is a proposed file, placed at yoursite.com/llms.txt, that gives AI tools a short plain-text summary of your website with links to its most useful pages. It was suggested in 2024 as a way to help language models read sites. Google has said it does not use it for Search, and the big AI companies have not confirmed reading it.
        </>
      }
      sources={[SRC.llmsTxt]}
    >
      <h2>What it looks like</h2>

      <CodeBlock label="A short llms.txt file">
        {`# Smith Plumbing

> Emergency and planned plumbing in Leeds since 2009.

## Services
- [Boiler repair](https://www.example.com/boiler-repair): prices and areas
- [Leak detection](https://www.example.com/leaks): how we find hidden leaks`}
      </CodeBlock>

      <h2>Should you add one?</h2>

      <p>
        It takes minutes and does no harm, so adding one is fine. Just don&apos;t expect it to change whether ChatGPT, Gemini or Perplexity mention you. What they do rely on is being allowed to crawl your site and finding clear answers on your pages.
      </p>

      <h2>What matters more for AI visibility</h2>

      <ul>
        <li>Let the AI search crawlers in through robots.txt and your firewall. <a href="/answers/check-if-ai-crawlers-can-access-your-website">Check if they can reach your site</a>.</li>
        <li>Put key facts in plain text on the page, not only in images or scripts.</li>
        <li>Answer the questions customers ask, in direct sentences near the top of each page.</li>
      </ul>
    </AnswerPage>
  );
}
