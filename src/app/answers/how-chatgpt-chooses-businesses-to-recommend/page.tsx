import {
  AnswerPage,
  answerMetadata,
  Ext,
  FromOurAudits,
  OurAudits,
  SRC,
  universal,
} from "@/components/answer-page";

const SLUG = "how-chatgpt-chooses-businesses-to-recommend";
export const metadata = answerMetadata(SLUG);

export default function Page() {
  return (
    <AnswerPage
      slug={SLUG}
      short={
        <>
          OpenAI doesn&apos;t publish how ChatGPT picks which businesses to
          name. What is known is where its material comes from: what the model
          learned in training, and, when it searches, the pages its crawlers
          can reach. Businesses that material describes clearly and
          consistently are the ones it can name with confidence.
        </>
      }
      sources={[SRC.openaiBots, SRC.geoPaper]}
    >
      <h2>Two places ChatGPT gets its knowledge</h2>
      <p>
        <strong>Training.</strong> The model learned from a large body of text
        before it was released. OpenAI collects some of that with a crawler
        called GPTBot, and says that disallowing it &ldquo;indicates a
        site&apos;s content should not be used in training generative AI
        foundation models&rdquo;. What a model learned this way stays fixed
        until a newer model replaces it.
      </p>
      <p>
        <strong>Search.</strong> For some questions, ChatGPT searches the web
        while it answers. OpenAI&apos;s OAI-SearchBot &ldquo;is used to surface websites
        in search results in ChatGPT&apos;s search features&rdquo;, and a
        separate agent, ChatGPT-User, opens pages when a user&apos;s request
        needs them (<Ext href={SRC.openaiBots.href}>OpenAI</Ext>).
      </p>

      <h2>What makes a business easy to recommend</h2>
      <p>
        Without a published formula, the honest answer comes from what the
        tool can work with. It is easier to name a business when:
      </p>
      <ul className="flex list-disc flex-col gap-2 pl-6">
        <li>its pages can be fetched and state plainly what it does and where;</li>
        <li>the same facts appear on its site, its Google Business Profile and directories;</li>
        <li>other sources, such as reviews, press and associations, say similar things about it;</li>
        <li>its pages answer the specific question asked, rather than hinting at it.</li>
      </ul>
      <p>
        Research supports the content side. The paper that named generative
        engine optimization found that adding citations, statistics and
        quotations raised content&apos;s visibility in AI answers by up to 40%
        in its tests, with results that &ldquo;vary across domains&rdquo; (
        <Ext href={SRC.geoPaper.href}>Aggarwal et al., KDD 2024</Ext>).
      </p>

      <FromOurAudits>
        Of <OurAudits />, {universal.noSameAs.sitesPct}% didn&apos;t link
        their social profiles in their structured data, which is one of the
        simplest ways to show that scattered profiles are one business.
      </FromOurAudits>

      <h2>Why the answer changes</h2>
      <p>
        Ask the same question twice and you may get different businesses.
        Wording, location, what the person asked before and updates to the
        tool all play a part. That is why a single test means little. The
        useful measure is how often you appear across many asks, and whether
        what is said about you is right.
      </p>

      <h2>What we would ignore</h2>
      <p>
        Anyone claiming to know the exact formula, or to guarantee a mention,
        is selling certainty that doesn&apos;t exist. The things above are
        dull, but they are what the tool can actually see.
      </p>
    </AnswerPage>
  );
}
