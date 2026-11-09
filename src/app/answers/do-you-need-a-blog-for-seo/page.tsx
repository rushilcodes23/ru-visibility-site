import { AnswerPage, SRC, answerMetadata } from "@/components/answer-page";

const SLUG = "do-you-need-a-blog-for-seo";
export const metadata = answerMetadata(SLUG);

export default function Page() {
  return (
    <AnswerPage
      slug={SLUG}
      short={
        <>
          No. A blog is just one way to publish pages. What helps SEO is having a useful page for each thing your customers search for. For most small businesses, clear service and location pages matter more than a stream of blog posts.
        </>
      }
      sources={[SRC.googleHelpful]}
    >
      <h2>When articles help</h2>

      <p>
        Articles earn their place when customers ask questions before they buy: &quot;how much does a new water heater cost&quot;, &quot;is teeth whitening safe&quot;. A good answer page can bring those searchers to you, and link them on to the service page. AI tools that search the web can also quote a page that answers a question directly.
      </p>

      <h2>When a blog does not help</h2>

      <p>
        Posting news, company updates or short generic posts to look active does little. Neither does publishing many thin posts written for keywords. Google&apos;s guidance asks whether content was made to help people or mainly to rank, and favours the first.
      </p>

      <h2>What to do instead</h2>

      <p>
        Start with one page for each service you sell, written with real details: what is included, prices or price ranges, areas covered, photos of your work. Then add answers to the questions customers ask you on the phone. <a href="/answers/how-to-do-keyword-research-for-free">Free keyword research</a> shows which ones people type into Google.
      </p>
    </AnswerPage>
  );
}
