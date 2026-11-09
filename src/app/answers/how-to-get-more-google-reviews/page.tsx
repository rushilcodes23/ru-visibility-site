import { AnswerPage, SRC, answerMetadata } from "@/components/answer-page";

const SLUG = "how-to-get-more-google-reviews";
export const metadata = answerMetadata(SLUG);

export default function Page() {
  return (
    <AnswerPage
      slug={SLUG}
      short={
        <>
          Ask every customer, soon after the job is done, and make it one tap: Google Business Profile gives you a short review link and a QR code to share. Ask in person, then send the link by WhatsApp, text or email. Many happy customers will leave one if you ask simply.
        </>
      }
      sources={[SRC.gbpReviews, SRC.mapsContentPolicy]}
    >
      <h2>How to ask</h2>

      <ul>
        <li>Get your link: in your Google Business Profile, choose &quot;Ask for reviews&quot; and copy the link.</li>
        <li>Ask at the moment the customer is happiest, such as when the job is finished or the treatment went well.</li>
        <li>Send the link the same day, with one line: &quot;Thanks for coming in. If you have a minute, a review helps other people find us.&quot;</li>
        <li>Put the QR code at the counter, on receipts or on the invoice.</li>
        <li>Reply to every review, good and bad, politely and briefly.</li>
      </ul>

      <h2>What Google does not allow</h2>

      <ul>
        <li>Paying for reviews or giving discounts, gifts or entries to a draw in return.</li>
        <li>Asking only happy customers, or filtering people before sending the link.</li>
        <li>Reviews from staff, family or the owner, or written by an agency.</li>
        <li>Posting fake reviews of any kind. Google removes them and can restrict the profile.</li>
      </ul>

      <h2>Why it is worth the effort</h2>

      <p>
        Google names reviews as part of how it judges prominence in local results, and people read them before they call. A steady flow of recent reviews matters more than a large number from years ago.
      </p>
    </AnswerPage>
  );
}
