import {
  AnswerPage,
  answerMetadata,
  Ext,
  FromOurAudits,
  OurAudits,
  scores,
  SRC,
} from "@/components/answer-page";

const SLUG = "what-is-an-ai-visibility-audit";
export const metadata = answerMetadata(SLUG);

export default function Page() {
  return (
    <AnswerPage
      slug={SLUG}
      short={
        <>
          An AI visibility audit checks whether AI tools such as ChatGPT,
          Gemini, Perplexity and Google&apos;s AI Overviews can reach your
          website, understand what your business does, and find enough
          evidence to mention you. Think of it as an SEO audit aimed at being
          named in an answer, rather than at ranking in a list.
        </>
      }
      sources={[SRC.googleAi, SRC.openaiBots, SRC.anthropicBots, SRC.perplexityBots]}
    >
      <h2>What it looks at</h2>
      <p>
        A good one covers five things, roughly in the order they can stop you:
      </p>
      <ul className="flex list-disc flex-col gap-2 pl-6">
        <li>
          <strong>Access.</strong> Whether the crawlers AI tools use can fetch
          your pages at all. Each company runs its own: OpenAI&apos;s
          OAI-SearchBot finds pages for ChatGPT search, PerplexityBot does the
          same for Perplexity, and Claude-SearchBot for Claude. A rule in your
          robots.txt file or a security setting can turn any of them away.
        </li>
        <li>
          <strong>Readability.</strong> Whether your important text is in the
          page itself, rather than only appearing after JavaScript runs, and
          whether it says plainly what you do, for whom and where.
        </li>
        <li>
          <strong>Answers.</strong> Whether your pages answer the questions
          customers actually ask, in a sentence or two each, so a tool can
          lift the answer without guessing.
        </li>
        <li>
          <strong>Identity.</strong> Whether your business is described the
          same way on your site, your Google Business Profile and directories,
          and whether your site links those profiles together so a machine can
          tell they are one business.
        </li>
        <li>
          <strong>Evidence.</strong> Reviews, press, associations and other
          sites mentioning you. AI tools lean on what others say, not only on
          what you say about yourself.
        </li>
      </ul>
      <p>
        Some audits also ask the AI tools real customer questions and record
        whether you come up. That is useful as a snapshot, but answers change
        between runs and between people, so a single test proves little on
        its own.
      </p>

      <h2>How it differs from an SEO audit</h2>
      <p>
        There is a lot of overlap. Google says plainly that &ldquo;the best
        practices for SEO remain relevant for AI features in Google
        Search&rdquo; (<Ext href={SRC.googleAi.href}>Google Search Central</Ext>).
        A site Google can&apos;t read is usually hard for AI tools to read too.
      </p>
      <p>
        The differences are in the details. An SEO audit rarely checks whether
        ChatGPT&apos;s or Perplexity&apos;s crawlers are blocked, because they
        don&apos;t affect Google rankings. It measures a position in a list,
        where an AI visibility audit looks at whether, and how accurately, you
        are mentioned. And it judges pages as whole documents, where AI tools
        tend to pick out single facts and short passages.
      </p>

      <FromOurAudits>
        Across <OurAudits />, the average score was {scores.seo.mean} out of
        100 for SEO but {scores.geo.mean} for AI visibility.{" "}
        {scores.seo.grades.A} sites earned an A for SEO;{" "}
        {scores.geo.grades.A === 1 ? "just one" : scores.geo.grades.A} earned an
        A for AI visibility.
      </FromOurAudits>

      <h2>What you should get at the end</h2>
      <p>
        A short list of what is holding you back, ordered by how much each fix
        is worth for the effort, in plain English. Anything the auditor could
        only estimate should be labelled as an estimate, not dressed up as a
        measurement. And nobody should promise you a mention: no one controls
        what these tools say.
      </p>
      <p>
        Ours is free for a first look: send us your web address using the
        form below and we send you the whole result, not a taster.
      </p>
    </AnswerPage>
  );
}
