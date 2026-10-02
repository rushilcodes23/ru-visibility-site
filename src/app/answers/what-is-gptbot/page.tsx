import {
  AiCrawlerTable,
  AnswerPage,
  answerMetadata,
  blockedPct,
  CodeBlock,
  Ext,
  FromOurAudits,
  OurAudits,
  robotsPct,
  SRC,
} from "@/components/answer-page";

const SLUG = "what-is-gptbot";
export const metadata = answerMetadata(SLUG);

export default function Page() {
  return (
    <AnswerPage
      slug={SLUG}
      short={
        <>
          GPTBot is OpenAI&apos;s web crawler for collecting content used to
          improve its AI models. Blocking it tells OpenAI not to use your
          content for training. It does not decide whether you appear in
          ChatGPT search; that is a different crawler, OAI-SearchBot.
        </>
      }
      sources={[SRC.openaiBots]}
    >
      <h2>What GPTBot does</h2>
      <p>
        In OpenAI&apos;s words, &ldquo;GPTBot is used to make our generative AI
        foundation models more useful and safe&rdquo;, and &ldquo;disallowing
        GPTBot indicates a site&apos;s content should not be used in training
        generative AI foundation models&rdquo; (
        <Ext href={SRC.openaiBots.href}>OpenAI</Ext>).
      </p>

      <h2>GPTBot is one of three OpenAI agents</h2>
      <AiCrawlerTable only={["GPTBot", "OAI-SearchBot", "ChatGPT-User"]} />
      <p>
        The one that matters for being found is OAI-SearchBot: &ldquo;Sites
        that are opted out of OAI-SearchBot will not be shown in ChatGPT search
        answers, though can still appear as navigational links.&rdquo;
        ChatGPT-User is different again: it fetches a page because a person
        asked, and OpenAI notes that &ldquo;robots.txt rules may not
        apply&rdquo; to it.
      </p>

      <h2>How to block or allow it</h2>
      <p>Add this to your robots.txt to block it:</p>
      <CodeBlock label="robots.txt rule blocking GPTBot">
        {`User-agent: GPTBot
Disallow: /`}
      </CodeBlock>
      <p>
        OpenAI says &ldquo;each setting is independent of the others&rdquo;,
        so blocking GPTBot leaves OAI-SearchBot untouched, and that &ldquo;it
        can take ~24 hours from a site&apos;s robots.txt update for our
        systems to adjust.&rdquo;
      </p>

      <h2>Should you block it?</h2>
      <p>
        That is your call. It won&apos;t change whether ChatGPT search can show
        you today. The bigger risk is blocking OAI-SearchBot by accident in the
        same sweep;{" "}
        <a href="/answers/should-you-block-ai-crawlers">here is how to tell them apart</a>.
      </p>

      <FromOurAudits>
        Of <OurAudits />, {blockedPct("GPTBot")}% turned GPTBot away:{" "}
        {robotsPct("GPTBot")}% in robots.txt, the rest at the server. Only{" "}
        {blockedPct("OAI-SearchBot")}% turned away OAI-SearchBot, the one that
        decides whether ChatGPT search can show them.
      </FromOurAudits>
    </AnswerPage>
  );
}
