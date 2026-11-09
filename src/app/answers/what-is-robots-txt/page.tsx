import { AnswerPage, CodeBlock, SRC, answerMetadata } from "@/components/answer-page";

const SLUG = "what-is-robots-txt";
export const metadata = answerMetadata(SLUG);

export default function Page() {
  return (
    <AnswerPage
      slug={SLUG}
      short={
        <>
          robots.txt is a plain text file at yoursite.com/robots.txt that tells crawlers, such as Googlebot or GPTBot, which parts of your site they may visit. It controls crawling. It is not a way to keep a page out of Google.
        </>
      }
      sources={[SRC.googleRobots]}
    >
      <h2>What a simple robots.txt looks like</h2>

      <CodeBlock label="A robots.txt that allows everything and lists the sitemap">
        {`User-agent: *
Disallow:

Sitemap: https://www.example.com/sitemap.xml`}
      </CodeBlock>

      <p>
        An empty Disallow line means nothing is blocked. &quot;Disallow: /&quot; on its own blocks the whole site, which is a common and costly mistake. It often gets left in after a website is built.
      </p>

      <h2>Blocking a page does not hide it</h2>

      <p>
        Google can still list a blocked page if other sites link to it, just without a description. To keep a page out of Google, let it be crawled and add a noindex tag instead. A page blocked in robots.txt can&apos;t show Google its noindex tag.
      </p>

      <h2>AI crawlers read it too</h2>

      <p>
        ChatGPT, Claude and Perplexity each have their own crawler names, Google has a separate setting for Gemini (Google-Extended), and robots.txt is where you allow or block them. Blocking the wrong one can remove you from AI answers. See <a href="/answers/should-you-block-ai-crawlers">should you block AI crawlers</a> before copying a block list from somewhere else.
      </p>
    </AnswerPage>
  );
}
