import {
  AnswerPage,
  answerMetadata,
  Ext,
  FromOurAudits,
  OurAudits,
  SRC,
  universal,
} from "@/components/answer-page";

const SLUG = "how-to-increase-ai-visibility";
export const metadata = answerMetadata(SLUG);

export default function Page() {
  return (
    <AnswerPage
      slug={SLUG}
      short={
        <>
          Make sure AI crawlers can reach your site, put clear answers to real
          customer questions in plain text, describe your business the same
          way everywhere, and earn mentions on other sites. Nobody can
          guarantee you a mention, but these are the things AI tools can
          actually use.
        </>
      }
      sources={[SRC.geoPaper, SRC.googleGenAi, SRC.openaiBots, SRC.vercelAiCrawler]}
    >
      <h2>1. Let the right crawlers in</h2>
      <p>
        AI companies run two kinds of crawler. One collects text to train
        future models; the other fetches pages so the tool can answer
        someone right now. OpenAI, for example, says sites that block its
        search crawler, OAI-SearchBot, &ldquo;will not be shown in ChatGPT
        search answers&rdquo; (<Ext href={SRC.openaiBots.href}>OpenAI</Ext>).
        You can block the training crawlers and still allow the answering
        ones;{" "}
        <a href="/answers/should-you-block-ai-crawlers">here is how to tell them apart</a>.
      </p>

      <h2>2. Answer questions in plain sentences</h2>
      <p>
        AI tools pick out short passages and facts, so give them some. Put the
        questions customers ask on your pages, each with a direct answer in
        the first sentence or two: what you charge, how long it takes, which
        areas you cover, who you are best for.
      </p>
      <p>
        The research behind the term GEO tested this. Adding citations,
        quotations and statistics to content raised its visibility in AI
        answers by up to 40% in the authors&apos; benchmark, though the effect
        varied by subject (<Ext href={SRC.geoPaper.href}>Aggarwal et al., KDD 2024</Ext>).
      </p>

      <h2>3. Be the same business everywhere</h2>
      <p>
        Use one business name, address and phone number on your website,
        Google Business Profile, directories and social profiles, and link
        those profiles from your site, including in your structured data. That
        is how a machine works out that they all describe one business.
      </p>

      <FromOurAudits>
        Of <OurAudits />, {universal.noSameAs.sitesPct}% didn&apos;t link
        their social profiles in their structured data, and{" "}
        {universal.noPressSection.sitesPct}% showed no press coverage or
        outside mentions anywhere on their site.
      </FromOurAudits>

      <h2>4. Give other sites a reason to mention you</h2>
      <p>
        Reviews, local press, your industry association, partner pages and
        &ldquo;best of&rdquo; lists all count. AI tools weigh what others say
        about you, and this is the part nobody can fake or shortcut.
      </p>

      <h2>5. Keep your content in the page</h2>
      <p>
        Vercel found that &ldquo;none of the major AI crawlers currently
        render JavaScript&rdquo; (
        <Ext href={SRC.vercelAiCrawler.href}>Vercel, December 2024</Ext>). If
        your text only appears once scripts run, those crawlers may see an
        empty page.
      </p>

      <h2>What not to do</h2>
      <p>
        Don&apos;t pay for &ldquo;guaranteed&rdquo; mentions in ChatGPT; no one
        controls what it says. And don&apos;t mass-produce near-identical pages
        for every keyword. Google warns that generating &ldquo;many pages
        without adding value for users may violate Google&apos;s spam policy
        on scaled content abuse&rdquo; (
        <Ext href={SRC.googleGenAi.href}>Google Search Central</Ext>), and a
        page with nothing new on it gives an AI tool nothing worth quoting.
      </p>
    </AnswerPage>
  );
}
