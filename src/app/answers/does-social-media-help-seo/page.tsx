import { AnswerPage, SRC, answerMetadata } from "@/components/answer-page";

const SLUG = "does-social-media-help-seo";
export const metadata = answerMetadata(SLUG);

export default function Page() {
  return (
    <AnswerPage
      slug={SLUG}
      short={
        <>
          Not directly. Google does not use likes, followers or shares to rank your website, and links from social posts do not pass ranking value. Social media helps in other ways: more people learn your name and search for it, other sites mention you, and your profiles can show up when people search your business.
        </>
      }
      sources={[SRC.googleStarter]}
    >
      <h2>Where social media does help</h2>

      <ul>
        <li>Brand searches: people who see you on Instagram later search your name on Google.</li>
        <li>Your profiles: Facebook, Instagram, LinkedIn and YouTube pages often rank for your business name, which fills the first page with places you control.</li>
        <li>Mentions: posts that spread can lead journalists, bloggers and local sites to write about you.</li>
        <li>AI answers: tools like ChatGPT read the wider web, and a business discussed in many places is more likely to be named.</li>
      </ul>

      <h2>Where it does not</h2>

      <p>
        Posting every day will not move your website up Google for &quot;dentist near me&quot;. Your Google Business Profile, reviews and service pages do that. If time is short, do those first.
      </p>
    </AnswerPage>
  );
}
