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

const SLUG = "how-to-get-chatgpt-to-recommend-your-business";
export const metadata = answerMetadata(SLUG);

export default function Page() {
  return (
    <AnswerPage
      slug={SLUG}
      short={
        <>
          You can&apos;t make ChatGPT recommend you, and anyone promising that
          is guessing. What you can do is make sure ChatGPT&apos;s search
          crawler is allowed to read your site, that your pages say exactly
          what you do, for whom and where, and that other websites back that
          up.
        </>
      }
      sources={[SRC.openaiBots, SRC.geoPaper]}
    >
      <h2>1. Let ChatGPT&apos;s search crawler in</h2>
      <p>
        When ChatGPT searches the web, it relies on OpenAI&apos;s crawler,
        OAI-SearchBot. OpenAI is direct about what blocking it does:
        &ldquo;Sites that are opted out of OAI-SearchBot will not be shown in
        ChatGPT search answers, though can still appear as navigational
        links&rdquo; (<Ext href={SRC.openaiBots.href}>OpenAI</Ext>).
      </p>
      <p>
        If your robots.txt file has a rule like this, ChatGPT search
        can&apos;t use your pages:
      </p>
      <CodeBlock label="A robots.txt rule that blocks ChatGPT search">
        {`User-agent: OAI-SearchBot
Disallow: /`}
      </CodeBlock>
      <p>
        Blocking OpenAI&apos;s training crawler, GPTBot, is a separate choice.
        OpenAI says &ldquo;each setting is independent of the others&rdquo;, so
        you can keep your content out of training and still appear in search
        answers.
      </p>

      <FromOurAudits>
        Of <OurAudits />, {blockedPct("OAI-SearchBot")}% turned away
        OAI-SearchBot, almost always through security software rather than a
        robots.txt rule anyone chose.
      </FromOurAudits>

      <h2>2. Say what you do in plain words</h2>
      <p>
        ChatGPT can only describe you accurately if your pages describe you
        accurately. Spell out the services you offer, the towns or areas you
        cover, who you are best for, and roughly what things cost. If you are
        good with nervous patients, rush jobs or small budgets, say so in
        those words; that is exactly the kind of detail people put in their
        questions.
      </p>

      <h2>3. Be easy to recognize as one business</h2>
      <p>
        Use the same business name, address and phone number everywhere: your
        site, your Google Business Profile, directories, social profiles. Link
        those profiles from your website. When the details match, it is easy
        to tell they all describe you; when they don&apos;t, you look like
        several smaller, less certain businesses.
      </p>

      <h2>4. Get other people talking about you</h2>
      <p>
        Recommendations lean on outside evidence: reviews, local press, your
        industry association, partners and lists of providers. This is the
        slowest part, and the one that can&apos;t be faked. Research on AI
        answers also found that content with citations, statistics and
        quotations was more visible in them, by up to 40% in the authors&apos;
        tests (<Ext href={SRC.geoPaper.href}>Aggarwal et al., KDD 2024</Ext>).
      </p>

      <h2>5. Check, then check again</h2>
      <p>
        Ask ChatGPT the questions your customers ask, several times and in
        fresh chats, and note whether you come up. Answers vary from one
        person and one moment to the next, so judge by how often you appear
        over weeks, not by a single reply.
      </p>
    </AnswerPage>
  );
}
