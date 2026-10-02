import {
  AnswerPage,
  answerMetadata,
  blockedPct,
  CodeBlock,
  Ext,
  FromOurAudits,
  OurAudits,
  SRC,
} from "@/components/answer-page";

const SLUG = "should-you-block-ai-crawlers";
export const metadata = answerMetadata(SLUG);

export default function Page() {
  return (
    <AnswerPage
      slug={SLUG}
      short={
        <>
          It depends which ones. Crawlers that only collect training data, such
          as GPTBot and ClaudeBot, can be blocked without affecting whether AI
          search tools can show you today. Crawlers that fetch pages for live
          answers, such as OAI-SearchBot, Claude-SearchBot and PerplexityBot,
          are different: block them and those tools can&apos;t use your site
          in their answers.
        </>
      }
      sources={[SRC.openaiBots, SRC.anthropicBots, SRC.perplexityBots, SRC.googleCrawlers]}
    >
      <h2>Two kinds of AI crawler</h2>
      <p>
        <strong>Training crawlers</strong> collect text that may be used to
        build future models. OpenAI says disallowing GPTBot &ldquo;indicates a
        site&apos;s content should not be used in training generative AI
        foundation models&rdquo;, and Anthropic says restricting ClaudeBot
        signals that &ldquo;the site&apos;s future materials should be
        excluded from our AI model training datasets&rdquo;.
      </p>
      <p>
        <strong>Answer crawlers</strong> fetch pages so a tool can answer
        people now. OpenAI: &ldquo;Sites that are opted out of OAI-SearchBot
        will not be shown in ChatGPT search answers, though can still appear
        as navigational links.&rdquo; Anthropic says disabling Claude-SearchBot
        &ldquo;may reduce your site&apos;s visibility and accuracy in user
        search results&rdquo;. Perplexity describes PerplexityBot as
        &ldquo;designed to surface and link websites in search results on
        Perplexity&rdquo;, adding that it &ldquo;is not used to crawl content
        for AI foundation models&rdquo;.
      </p>

      <h2>Blocking training crawlers: a fair choice</h2>
      <p>
        Some businesses don&apos;t want their writing used to train AI, and
        that is a legitimate decision. It costs you nothing in today&apos;s
        answers, because the companies keep the settings separate; OpenAI
        says &ldquo;each setting is independent of the others&rdquo; (
        <Ext href={SRC.openaiBots.href}>OpenAI</Ext>).
      </p>

      <h2>Blocking answer crawlers: usually a mistake for a business</h2>
      <p>
        If you want customers to find you through ChatGPT, Claude or
        Perplexity, these are the crawlers that make it possible. Shutting them
        out is like asking not to be listed in a directory your customers use.
      </p>

      <FromOurAudits>
        Of <OurAudits />, {blockedPct("GPTBot")}% turned away GPTBot, but{" "}
        {blockedPct("OAI-SearchBot")}% also turned away OAI-SearchBot and{" "}
        {blockedPct("PerplexityBot")}% PerplexityBot. Most of those refusals
        came from security software rather than a deliberate rule.
      </FromOurAudits>

      <h2>A robots.txt that does both</h2>
      <p>
        This keeps your content out of OpenAI&apos;s and Anthropic&apos;s
        training and Google&apos;s Gemini training, while leaving the answer
        crawlers free:
      </p>
      <CodeBlock label="Example robots.txt: block training crawlers, allow answer crawlers">
        {`User-agent: GPTBot
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /`}
      </CodeBlock>
      <p>
        Google-Extended only affects Gemini; Google says it &ldquo;does not
        impact a site&apos;s inclusion in Google Search&rdquo; (
        <Ext href={SRC.googleCrawlers.href}>Google</Ext>). And robots.txt only
        works if your firewall lets the crawler reach it in the first place,
        so{" "}
        <a href="/answers/check-if-ai-crawlers-can-access-your-website">check that too</a>.
      </p>
    </AnswerPage>
  );
}
