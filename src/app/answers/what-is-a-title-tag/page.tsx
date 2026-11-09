import { AnswerPage, SRC, answerMetadata } from "@/components/answer-page";

const SLUG = "what-is-a-title-tag";
export const metadata = answerMetadata(SLUG);

export default function Page() {
  return (
    <AnswerPage
      slug={SLUG}
      short={
        <>
          A title tag is the title of a web page, set in its code. Google usually uses it as the clickable blue headline in search results, and browsers show it on the tab. It is one of the clearest signals of what a page is about.
        </>
      }
      sources={[SRC.googleTitles]}
    >
      <h2>How to write a good one</h2>

      <ul>
        <li>Give every page its own title. Repeated titles such as &quot;Home&quot; or &quot;Services&quot; on many pages make them hard to tell apart.</li>
        <li>Put what the page offers first, then your brand: &quot;Emergency Plumber in Dallas | Smith Plumbing&quot;.</li>
        <li>Write it for a person scanning results, not as a list of keywords.</li>
        <li>Keep it short enough to read in full. Google has no fixed character limit, but cuts titles to fit the screen, which is usually around 50 to 60 characters.</li>
      </ul>

      <h2>Why Google sometimes changes your title</h2>

      <p>
        Since 2021, Google may write its own title link from your main heading or other text when your title tag is missing, too long, stuffed with keywords or the same as other pages. A clear, unique title that matches the page&apos;s main heading is the best way to keep yours.
      </p>

      <h2>Title tag versus H1</h2>

      <p>
        The title tag is for search results and the browser tab. The H1 is the main heading visitors see on the page. They can differ, but they should describe the same thing.
      </p>
    </AnswerPage>
  );
}
