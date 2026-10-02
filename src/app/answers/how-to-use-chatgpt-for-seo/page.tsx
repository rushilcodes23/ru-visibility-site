import { AnswerPage, answerMetadata, Ext, SRC } from "@/components/answer-page";

const SLUG = "how-to-use-chatgpt-for-seo";
export const metadata = answerMetadata(SLUG);

export default function Page() {
  return (
    <AnswerPage
      slug={SLUG}
      short={
        <>
          Use it as a fast assistant, not as the author. Let it draft from
          facts you give it, tighten titles and descriptions, turn customer
          questions into clear answers and sketch structured data. Then check
          everything it writes, because it will sometimes state things that
          aren&apos;t true.
        </>
      }
      sources={[SRC.googleGenAi, SRC.richResults]}
    >
      <h2>Good jobs to give it</h2>
      <ul className="flex list-disc flex-col gap-2 pl-6">
        <li>
          <strong>Titles and descriptions.</strong> Paste a page and ask for
          five title options under 60 characters that say what the page offers
          and where.
        </li>
        <li>
          <strong>Answers to real questions.</strong> Give it the questions
          customers ask you, with your actual answers in rough form, and ask
          for a two-sentence version of each.
        </li>
        <li>
          <strong>Plain-English rewrites.</strong> Ask it to rewrite a dense
          paragraph so a customer understands it, without changing the facts.
        </li>
        <li>
          <strong>A first draft of structured data.</strong> Give it your
          business details and ask for LocalBusiness or Organization markup.
          Then test it in{" "}
          <Ext href={SRC.richResults.href}>Google&apos;s Rich Results Test</Ext>{" "}
          before using it, and make sure every detail in it is true.
        </li>
      </ul>

      <h2>Jobs not to give it</h2>
      <ul className="flex list-disc flex-col gap-2 pl-6">
        <li>
          Writing dozens of near-identical pages for different towns or
          keywords. Google warns this kind of mass generation &ldquo;may violate
          Google&apos;s spam policy on scaled content abuse&rdquo;.
        </li>
        <li>Inventing statistics, reviews or case studies. If it isn&apos;t true, don&apos;t publish it.</li>
        <li>Telling you how your site is doing. That needs real data, from Search Console and testing tools.</li>
      </ul>

      <h2>Check before you publish</h2>
      <p>
        Google is clear that &ldquo;generative AI outputs may contain
        inaccuracies&rdquo; and asks site owners to fact-check everything,
        including titles, meta descriptions, structured data and image
        descriptions (<Ext href={SRC.googleGenAi.href}>Google Search Central</Ext>).
        A wrong price or a made-up service in your structured data is worse
        than none at all.
      </p>

      <h2>The part it can&apos;t do</h2>
      <p>
        It doesn&apos;t know your customers, your prices or what makes you
        different. Those are what make a page worth ranking and worth quoting,
        so they have to come from you.
      </p>
    </AnswerPage>
  );
}
