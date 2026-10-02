import {
  AiCrawlerTable,
  AnswerPage,
  answerMetadata,
  blockedPct,
  CodeBlock,
  FromOurAudits,
  OurAudits,
  robotsPct,
  SRC,
} from "@/components/answer-page";

const SLUG = "check-if-ai-crawlers-can-access-your-website";
export const metadata = answerMetadata(SLUG);

export default function Page() {
  return (
    <AnswerPage
      slug={SLUG}
      short={
        <>
          Look in two places. First your robots.txt file, at
          yourdomain.com/robots.txt, for rules that name AI crawlers. Then your
          security or CDN settings, because that is where most of the blocks
          we find come from, usually without the owner knowing.
        </>
      }
      sources={[SRC.openaiBots, SRC.anthropicBots, SRC.perplexityBots, SRC.googleCrawlers, SRC.cloudflareAiBots]}
    >
      <h2>1. Read your robots.txt</h2>
      <p>
        Open yourdomain.com/robots.txt in a browser. It is a plain text file of
        rules, each starting with <code>User-agent:</code> followed by a
        crawler&apos;s name. A block looks like this:
      </p>
      <CodeBlock label="A robots.txt rule that blocks one crawler">
        {`User-agent: PerplexityBot
Disallow: /`}
      </CodeBlock>
      <p>
        <code>Disallow: /</code> means &ldquo;stay out of the whole
        site&rdquo;. Also check the rules under <code>User-agent: *</code>,
        which apply to every crawler without its own section. These are the
        names to look for:
      </p>
      <AiCrawlerTable />
      <p>
        Two caveats from the companies themselves. Perplexity says its
        user-triggered fetcher &ldquo;generally ignores robots.txt
        rules&rdquo;, and OpenAI says of ChatGPT-User that &ldquo;robots.txt
        rules may not apply&rdquo;, because a person asked for the page. So
        robots.txt mainly governs the crawlers that build each tool&apos;s
        index.
      </p>

      <h2>2. Check your security and CDN settings</h2>
      <p>
        This is where most blocks come from. Services like Cloudflare and many
        security plugins can refuse bots before robots.txt is ever read.
        Cloudflare, for instance, has a setting under Security Settings called
        Block AI bots, and a newer one for AI bot policies;{" "}
        <a href="/answers/does-cloudflare-block-ai-crawlers">here is what each does</a>.
        If someone else manages your site, ask them directly which AI bots are
        allowed.
      </p>

      <FromOurAudits>
        Of <OurAudits />, {blockedPct("OAI-SearchBot")}% turned away
        OAI-SearchBot and {blockedPct("PerplexityBot")}% turned away
        PerplexityBot. Only {robotsPct("OAI-SearchBot")}% and{" "}
        {robotsPct("PerplexityBot")}% did it in robots.txt; the rest was the
        server refusing the request.
      </FromOurAudits>

      <h2>3. Test what a crawler gets</h2>
      <p>
        A rough test from your own computer: request your homepage while
        identifying as the crawler, and see whether you get the page or an
        error.
      </p>
      <CodeBlock label="Fetching a page while identifying as OAI-SearchBot">
        {`curl -I -A "OAI-SearchBot" https://yourdomain.com/`}
      </CodeBlock>
      <p>
        A <code>200</code> means the page was served; a <code>403</code> means
        it was refused. Treat it as a hint rather than proof: the real crawler
        comes from the company&apos;s own servers, and some security tools
        treat it differently from a test on your laptop, in either direction.
      </p>

      <h2>Found a block?</h2>
      <p>
        Decide crawler by crawler. Blocking the ones that only collect
        training data is a reasonable choice; blocking the ones that fetch
        pages for answers keeps you out of those answers.{" "}
        <a href="/answers/should-you-block-ai-crawlers">Which to allow, and why</a>.
      </p>
    </AnswerPage>
  );
}
