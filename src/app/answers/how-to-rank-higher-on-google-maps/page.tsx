import { AnswerPage, SRC, answerMetadata } from "@/components/answer-page";

const SLUG = "how-to-rank-higher-on-google-maps";
export const metadata = answerMetadata(SLUG);

export default function Page() {
  return (
    <AnswerPage
      slug={SLUG}
      short={
        <>
          Fill in every part of your Google Business Profile, choose the most exact main category, keep hours and details correct, earn genuine reviews steadily, and have a website that clearly covers the same services and area. Google ranks Maps results on relevance, distance and prominence.
        </>
      }
      sources={[SRC.gbpLocalRanking, SRC.gbpGuidelines]}
    >
      <h2>The changes that move rankings most</h2>

      <ul>
        <li>Main category: choose the most specific one that fits, such as &quot;Emergency dental service&quot; over &quot;Dentist&quot; if that is your core work. It is one of the strongest relevance signals.</li>
        <li>Services and description: list what you actually do in plain words.</li>
        <li>Reviews: more genuine reviews, with good ratings and recent dates, help. Reply to them.</li>
        <li>Website: link your profile to a page that matches it. A service-area page with real detail helps the profile rank for those searches.</li>
        <li>Photos: add real photos of your premises, team and work, and keep adding them.</li>
      </ul>

      <h2>What breaks the rules</h2>

      <p>
        Adding keywords or a town name to your business name, for example &quot;Smith Dental | Best Dentist Leeds&quot;, goes against Google&apos;s guidelines and can get the profile suspended. So can a virtual office address, or a second profile for the same business.
      </p>

      <h2>Be realistic about distance</h2>

      <p>
        A searcher&apos;s location matters a lot, and no change will make you show to someone across the city. If you are missing from Maps entirely, start with <a href="/answers/why-is-my-business-not-on-google-maps">why a business is not on Google Maps</a>.
      </p>
    </AnswerPage>
  );
}
