import {
  AnswerPage,
  answerMetadata,
  blockedPct,
  Ext,
  FromOurAudits,
  OurAudits,
  robotsPct,
  SRC,
} from "@/components/answer-page";

const SLUG = "does-cloudflare-block-ai-crawlers";
export const metadata = answerMetadata(SLUG);

export default function Page() {
  return (
    <AnswerPage
      slug={SLUG}
      short={
        <>
          It can, and for some sites it does by default. Cloudflare has
          settings that block AI crawlers, and its defaults for new domains
          have changed more than once since 2025. Check your own dashboard,
          under Security Settings, rather than assuming either way.
        </>
      }
      sources={[SRC.cloudflareAiBots, SRC.cloudflare2025]}
    >
      <h2>The settings</h2>
      <p>
        Cloudflare&apos;s documentation describes two places to manage this:
        &ldquo;Security Settings → Block AI bots&rdquo;, the older option, and
        &ldquo;Security Settings → Configure AI bot policies&rdquo;, the newer
        one, which groups bots into Search, Agent and Training (
        <Ext href={SRC.cloudflareAiBots.href}>Cloudflare docs</Ext>).
      </p>

      <h2>What the older setting blocks</h2>
      <p>
        Cloudflare says it &ldquo;blocks verified bots that are classified as
        crawling for the purpose of AI training, as well as a number of
        unverified bots that behave similarly&rdquo;, and that it
        &ldquo;excludes mixed-purpose bots that are used both for Training and
        for Search.&rdquo;
      </p>

      <h2>The defaults</h2>
      <p>
        On 1 July 2025 Cloudflare announced it was &ldquo;changing the default
        to block AI crawlers unless they pay creators for their content&rdquo;
        (<Ext href={SRC.cloudflare2025.href}>Cloudflare blog</Ext>). Its
        documentation now describes newer defaults: &ldquo;On September 15,
        2026, Cloudflare will set updated defaults for new domains: bots
        classified as Training or as Agent will be blocked on pages that
        display ads, and Search will remain allowed.&rdquo;
      </p>
      <p>
        Because the rules depend on when your domain was added and what
        someone has since switched on, the only reliable answer is to look.
      </p>

      <h2>How to check yours</h2>
      <ol className="flex list-decimal flex-col gap-2 pl-6">
        <li>Log in to Cloudflare and open your domain.</li>
        <li>Go to Security Settings and find the AI bot options.</li>
        <li>
          Make sure the crawlers that fetch pages for answers, such as
          OAI-SearchBot, Claude-SearchBot and PerplexityBot, are allowed if you
          want to appear in those tools.
        </li>
        <li>
          If a developer or agency manages Cloudflare for you, ask them which
          AI bots are blocked and why.
        </li>
      </ol>

      <FromOurAudits>
        Of <OurAudits />, {blockedPct("GPTBot")}% turned away OpenAI&apos;s
        GPTBot, but only {robotsPct("GPTBot")}% did it in robots.txt. The rest
        were refused by the server itself, which is what security services
        like Cloudflare do. We can&apos;t tell from outside which product was
        responsible on a given site.
      </FromOurAudits>

      <h2>Not using Cloudflare?</h2>
      <p>
        Other hosts, firewalls and WordPress security plugins have similar
        options. The same check applies:{" "}
        <a href="/answers/check-if-ai-crawlers-can-access-your-website">
          how to test whether AI crawlers can reach your site
        </a>
        .
      </p>
    </AnswerPage>
  );
}
