import {
  AnswerPage,
  answerMetadata,
  blockedPct,
  FromOurAudits,
  OurAudits,
  robotsPct,
  SRC,
} from "@/components/answer-page";

const SLUG = "how-to-check-your-websites-ai-visibility";
export const metadata = answerMetadata(SLUG);

export default function Page() {
  return (
    <AnswerPage
      slug={SLUG}
      short={
        <>
          Ask the AI tools your customers use the questions those customers
          ask you, a few times each, and note who gets named and what is said.
          Then check the plumbing: whether your robots.txt file or your
          security settings stop AI crawlers from reading your site.
        </>
      }
      sources={[SRC.openaiBots, SRC.perplexityBots, SRC.anthropicBots]}
    >
      <h2>1. Ask the questions your customers ask</h2>
      <p>
        Write down five to ten questions people really put to you on the
        phone or by email, worded the way they word them. Not &ldquo;dentist
        Dallas&rdquo; but &ldquo;which dentists near me are good with nervous
        children?&rdquo;
      </p>
      <p>
        Put each one to ChatGPT, Gemini, Perplexity and Google, and look at
        Google&apos;s AI Overview if one appears. Ask each question more than
        once, in a fresh chat, because the answers change between runs and
        between people. For each answer, note three things: whether you are
        named, who is named instead, and whether what is said about you is
        right.
      </p>

      <h2>2. Check that AI crawlers can get in</h2>
      <p>
        Most AI tools read websites through their own crawlers, and a site can
        turn them away without its owner knowing. Open
        yourdomain.com/robots.txt in a browser and look for rules under names
        such as OAI-SearchBot (ChatGPT search), PerplexityBot or
        Claude-SearchBot. A <code>Disallow: /</code> under one of those names
        keeps that tool out.
      </p>
      <p>
        Then check your security settings or CDN, such as Cloudflare or a
        WordPress security plugin. In our data that is where most blocks come
        from: the server refusing the request, which is usually security
        software doing its job too broadly rather than a decision anyone made.
      </p>

      <FromOurAudits>
        Of <OurAudits />, {blockedPct("PerplexityBot")}% turned away
        PerplexityBot and {blockedPct("OAI-SearchBot")}% turned away
        OAI-SearchBot. Only {robotsPct("OAI-SearchBot")}% did it through
        robots.txt; the rest was the server refusing the request.
      </FromOurAudits>

      <h2>3. Check what they would find</h2>
      <p>
        If the crawlers can get in, look at your pages the way they do. Is
        what you offer, where you work and roughly what it costs written in
        plain text, or is it buried in images and menus? Does anything only
        appear after JavaScript runs? (Several AI crawlers don&apos;t run it;{" "}
        <a href="/answers/do-ai-crawlers-render-javascript">more on that here</a>.)
        Is your business name, address and phone number the same everywhere it
        appears?
      </p>

      <h2>What a one-off check can&apos;t tell you</h2>
      <p>
        One round of questions is a snapshot. AI answers move as the tools
        update and as the web changes, so the useful measure is how often you
        are named across many asks, tracked over months. That part takes
        repetition, not a single afternoon.
      </p>
      <p>
        If you&apos;d rather not do the crawler and site checks by hand, our
        free check does them for you: send your web address using the form
        below.
      </p>
    </AnswerPage>
  );
}
