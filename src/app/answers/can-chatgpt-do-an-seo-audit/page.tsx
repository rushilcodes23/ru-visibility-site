import { AnswerPage, answerMetadata, Ext, SRC } from "@/components/answer-page";

const SLUG = "can-chatgpt-do-an-seo-audit";
export const metadata = answerMetadata(SLUG);

export default function Page() {
  return (
    <AnswerPage
      slug={SLUG}
      short={
        <>
          Partly. ChatGPT can review a page or a block of HTML you give it and
          suggest better titles, headings and wording. It can&apos;t crawl your
          whole site the way an audit tool does, see your Google Search Console
          data, or measure your real speed, and it can state things
          confidently that aren&apos;t true.
        </>
      }
      sources={[SRC.googleGenAi]}
    >
      <h2>What it does well</h2>
      <ul className="flex list-disc flex-col gap-2 pl-6">
        <li>Explaining an SEO term or a report in plain English.</li>
        <li>Suggesting clearer titles and descriptions for a page you paste in.</li>
        <li>Turning a list of customer questions into short, direct answers.</li>
        <li>Spotting obvious gaps on a single page: no main heading, a vague title, no mention of where you work.</li>
      </ul>

      <h2>What an audit needs that it doesn&apos;t have</h2>
      <ul className="flex list-disc flex-col gap-2 pl-6">
        <li>
          <strong>Every page, checked the same way.</strong> An audit tool
          visits each page and records status codes, redirects, titles,
          canonicals and broken links. Looking at a handful of pages is not the
          same as checking all of them.
        </li>
        <li>
          <strong>Your Google data.</strong> Which pages are indexed, which
          searches you appear for and what Google flags as broken live in
          Search Console, behind your login.
        </li>
        <li>
          <strong>Real measurements.</strong> Load speed and Core Web Vitals
          come from testing the page, not from reading it.
        </li>
        <li>
          <strong>Verified facts.</strong> Google&apos;s own guidance warns
          that &ldquo;generative AI outputs may contain inaccuracies (also known
          as hallucinations)&rdquo; and that it is &ldquo;critical to manually
          factcheck and review all AI-generated content&rdquo; (
          <Ext href={SRC.googleGenAi.href}>Google Search Central</Ext>). An
          audit full of confident guesses is worse than none, because you act
          on it.
        </li>
      </ul>

      <h2>A sensible way to combine them</h2>
      <p>
        Get the facts from tools first: a crawler, Search Console and a speed
        test. Then use ChatGPT for what it is good at: explaining the findings
        and drafting the fixes. Check its suggestions before they go live.
      </p>
      <p>
        If you&apos;d like the tool side done for you, our first check is free:
        send your web address using the form below and we send back the whole
        result, for Google and for AI tools.
      </p>
    </AnswerPage>
  );
}
