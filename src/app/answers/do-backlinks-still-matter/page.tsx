import { AnswerPage, SRC, answerMetadata } from "@/components/answer-page";

const SLUG = "do-backlinks-still-matter";
export const metadata = answerMetadata(SLUG);

export default function Page() {
  return (
    <AnswerPage
      slug={SLUG}
      short={
        <>
          Yes. Links from other websites still help Google discover your pages and judge how trusted they are. But a few links from real, relevant sites count for far more than many links from low-quality ones, and paying for links breaks Google&apos;s spam policies.
        </>
      }
      sources={[SRC.googleSpam, SRC.googleLinks]}
    >
      <h2>Links that help a small business</h2>

      <ul>
        <li>Local news coverage, community groups and events you sponsor.</li>
        <li>Suppliers, partners and trade associations that list you.</li>
        <li>Real directories in your industry and area.</li>
        <li>Articles or guides of yours that others choose to link to.</li>
      </ul>

      <p>
        These are also the mentions AI tools pick up when deciding which businesses to name.
      </p>

      <h2>Links to avoid</h2>

      <ul>
        <li>Paid links, link packages and &quot;guest posts&quot; sold in bulk.</li>
        <li>Link swaps arranged only for SEO.</li>
        <li>Comment spam and low-quality directory blasts.</li>
      </ul>

      <p>
        Google&apos;s systems try to ignore these links, and a clear pattern of them can lead to a manual action.
      </p>

      <h2>Where links rank among other work</h2>

      <p>
        For most local businesses, the Google Business Profile, reviews and clear service pages matter more than chasing links. Links matter most when competing for wider, national searches.
      </p>
    </AnswerPage>
  );
}
