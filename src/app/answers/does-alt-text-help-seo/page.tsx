import { AnswerPage, SRC, answerMetadata } from "@/components/answer-page";

const SLUG = "does-alt-text-help-seo";
export const metadata = answerMetadata(SLUG);

export default function Page() {
  return (
    <AnswerPage
      slug={SLUG}
      short={
        <>
          Yes. Alt text is a short written description of an image in the page&apos;s code. Google uses it, along with the page&apos;s text, to understand what an image shows, which helps the image appear in Google Images. It also lets screen readers describe the image to people who cannot see it.
        </>
      }
      sources={[SRC.googleImages]}
    >
      <h2>How to write good alt text</h2>

      <ul>
        <li>Describe what is in the picture in plain words: &quot;Dentist fitting a clear brace on a patient&quot;.</li>
        <li>Keep it to one short sentence.</li>
        <li>Use a keyword only when it really describes the image. A list of keywords is spam.</li>
        <li>Leave alt text empty for purely decorative images, such as background shapes, so screen readers skip them.</li>
      </ul>

      <h2>Other image habits that help</h2>

      <p>
        Give image files sensible names (front-of-shop.jpg, not IMG_4021.jpg), place images near the text they relate to, and compress them so pages load fast. For local businesses, real photos of your work, team and premises beat stock photos for both visitors and search.
      </p>

      <h2>How to check</h2>

      <p>
        On most website builders, alt text is a field in the image settings. To check a live page, right-click an image, choose Inspect and look for alt= in the code.
      </p>
    </AnswerPage>
  );
}
