import { AnswerPage, answerMetadata, CodeBlock, Ext, SRC } from "@/components/answer-page";

const SLUG = "do-ai-crawlers-render-javascript";
export const metadata = answerMetadata(SLUG);

export default function Page() {
  return (
    <AnswerPage
      slug={SLUG}
      short={
        <>
          Mostly not. Vercel&apos;s analysis of AI crawler traffic found that
          &ldquo;none of the major AI crawlers currently render
          JavaScript&rdquo;: ChatGPT&apos;s and Claude&apos;s crawlers fetch
          JavaScript files but don&apos;t run them. If your text only appears
          after JavaScript runs, those crawlers may see an empty page.
        </>
      }
      sources={[SRC.vercelAiCrawler, SRC.googleJs]}
    >
      <h2>What the data showed</h2>
      <p>
        Vercel studied traffic from AI crawlers across the sites it hosts and
        published the results in December 2024. Its finding: &ldquo;while
        ChatGPT and Claude crawlers do <em>fetch</em> JavaScript files (ChatGPT:
        11.50%, Claude: 23.84% of requests), they don&apos;t <em>execute</em>{" "}
        them&rdquo; (<Ext href={SRC.vercelAiCrawler.href}>Vercel</Ext>).
      </p>
      <p>
        Google is different. It says it &ldquo;processes JavaScript web apps
        in three main phases&rdquo;: crawling, rendering and indexing. Even so,
        Google itself advises that &ldquo;server-side or pre-rendering is still
        a great idea because it makes your website faster for users and
        crawlers, and not all bots can run JavaScript&rdquo; (
        <Ext href={SRC.googleJs.href}>Google Search Central</Ext>).
      </p>

      <h2>Why it matters for a business</h2>
      <p>
        Some website builders and apps send an almost empty page and fill it in
        with JavaScript in the browser. People see a full page; a crawler that
        doesn&apos;t run scripts sees a shell. Your services, prices and
        location might as well not be there.
      </p>

      <h2>How to check your site</h2>
      <p>
        Open a page, right-click and choose View page source (not Inspect).
        Search the source for a sentence you can see on screen. If it is
        there, crawlers can read it. If it isn&apos;t, it is being added by
        JavaScript. From a terminal you can do the same check:
      </p>
      <CodeBlock label="Checking whether a sentence is in the page as sent">
        {`curl -s https://yourdomain.com/ | grep -i "a sentence from your page"`}
      </CodeBlock>

      <h2>The fix</h2>
      <p>
        Vercel&apos;s advice is to &ldquo;prioritize server-side rendering for
        critical content&rdquo;. In practice, make sure the text that
        describes your business is in the HTML the server sends. Most modern
        frameworks can do this; this site is built that way, so every page
        arrives with its text already in it.
      </p>
    </AnswerPage>
  );
}
