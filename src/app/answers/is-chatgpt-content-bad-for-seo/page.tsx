import { AnswerPage, answerMetadata, Ext, SRC } from "@/components/answer-page";

const SLUG = "is-chatgpt-content-bad-for-seo";
export const metadata = answerMetadata(SLUG);

export default function Page() {
  return (
    <AnswerPage
      slug={SLUG}
      short={
        <>
          Not by itself. Google&apos;s concern is using AI &ldquo;to generate
          many pages without adding value for users&rdquo;, which can break its
          spam policy on scaled content abuse, and publishing AI text without
          checking it. Useful, accurate content is fine however it was
          drafted.
        </>
      }
      sources={[SRC.googleGenAi]}
    >
      <h2>What Google actually says</h2>
      <p>Google&apos;s guidance on generative AI content makes three points:</p>
      <ul className="flex list-disc flex-col gap-2 pl-6">
        <li>
          Scale without value is the problem: &ldquo;using generative AI tools
          or other similar tools to generate many pages without adding value
          for users may violate Google&apos;s spam policy on scaled content
          abuse.&rdquo;
        </li>
        <li>
          Accuracy is your job: &ldquo;It is critical to manually factcheck and
          review all AI-generated content for accuracy and trustworthiness
          before publishing.&rdquo;
        </li>
        <li>
          That includes the small print: the same review &ldquo;also applies to
          metadata like <code>&lt;title&gt;</code> elements, meta description
          elements, structured data, and alternate texts for images.&rdquo;
        </li>
      </ul>
      <p>
        Source: <Ext href={SRC.googleGenAi.href}>Google Search Central</Ext>.
      </p>

      <h2>Where AI content goes wrong</h2>
      <p>
        Not because a machine wrote it, but because of what it tends to be
        when nobody adds anything: generic, because it averages what already
        exists; wrong in places, stated confidently; and the same as every
        competitor who asked the same question. A page like that gives
        neither Google nor a customer a reason to pick you.
      </p>

      <h2>How to use it safely</h2>
      <ol className="flex list-decimal flex-col gap-2 pl-6">
        <li>Start from your own facts: prices, process, areas, the questions customers ask you.</li>
        <li>Add what only you know: real examples, numbers, what you have seen go wrong.</li>
        <li>Check every claim before it is published.</li>
        <li>Write one page per real question, not ten variations of the same page for ten keywords.</li>
      </ol>

      <h2>The same applies to AI answers</h2>
      <p>
        ChatGPT and Google&apos;s AI Overviews quote pages that say something
        specific and checkable. A page of generic filler has nothing in it
        worth quoting, whoever wrote it.
      </p>
    </AnswerPage>
  );
}
