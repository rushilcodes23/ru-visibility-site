import { AnswerPage, answerMetadata, Ext, SRC } from "@/components/answer-page";

const SLUG = "how-long-to-show-up-in-chatgpt";
export const metadata = answerMetadata(SLUG);

export default function Page() {
  return (
    <AnswerPage
      slug={SLUG}
      short={
        <>
          It depends which part of ChatGPT you mean. When ChatGPT searches the
          web, a change can show up once OpenAI&apos;s crawler has read the page
          again; OpenAI says robots.txt changes take about 24 hours to
          register. What ChatGPT knows from training only changes when a new
          model is trained, which is out of your hands.
        </>
      }
      sources={[SRC.openaiBots, SRC.googleRecrawl]}
    >
      <h2>Answers that search the web</h2>
      <p>
        When ChatGPT searches as it answers, it relies on OpenAI&apos;s
        crawler, OAI-SearchBot. If you have just unblocked
        it, OpenAI says: &ldquo;It can take ~24 hours from a site&apos;s
        robots.txt update for our systems to adjust&rdquo; (
        <Ext href={SRC.openaiBots.href}>OpenAI</Ext>).
      </p>
      <p>
        After that, your updated pages have to be crawled again before
        they can be used, and OpenAI doesn&apos;t publish a crawl schedule.
        What you can do is make pages easy to find: linked from your own menu
        and from other sites, rather than buried where no crawler looks.
      </p>

      <h2>What ChatGPT learned in training</h2>
      <p>
        The model&apos;s built-in knowledge was fixed when it was trained. A
        page you publish today can&apos;t change it; only a later model can.
        That is why search matters so much for a business: it is the part of
        ChatGPT that can see what you published last week.
      </p>

      <h2>Being named takes longer than being readable</h2>
      <p>
        Being readable is the quick part. Being recommended depends on the
        evidence around you, such as reviews, mentions and listings, and that
        builds over months. Fixes to access and clarity can register within
        weeks; reputation work takes longer.
      </p>

      <h2>How to tell it has worked</h2>
      <p>
        Ask ChatGPT the questions your customers ask, in fresh chats, and keep
        a simple record of whether you are named and what is said. Because
        answers vary, look for a change in how often you appear over several
        weeks rather than in one reply.
      </p>
      <p>
        For comparison, Google says its own crawling &ldquo;can take anywhere
        from a few days to a few weeks&rdquo; (
        <Ext href={SRC.googleRecrawl.href}>Google Search Central</Ext>). AI
        search is no more predictable, so be wary of anyone who quotes you an
        exact date.
      </p>
    </AnswerPage>
  );
}
