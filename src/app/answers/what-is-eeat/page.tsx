import { AnswerPage, SRC, answerMetadata } from "@/components/answer-page";

const SLUG = "what-is-eeat";
export const metadata = answerMetadata(SLUG);

export default function Page() {
  return (
    <AnswerPage
      slug={SLUG}
      short={
        <>
          E-E-A-T stands for Experience, Expertise, Authoritativeness and Trustworthiness. It comes from Google&apos;s guidelines for the people who rate search results, and describes what makes content believable. Google says trust is the most important part. It is not one ranking score you can measure.
        </>
      }
      sources={[SRC.googleHelpful]}
    >
      <h2>What each part means</h2>

      <ul>
        <li>Experience: the writer has done the thing, such as fixed the AC or treated the patient.</li>
        <li>Expertise: the writer knows the subject well.</li>
        <li>Authoritativeness: others in the field recognise the business or person.</li>
        <li>Trust: the page is accurate, honest and safe, and it is clear who is behind it.</li>
      </ul>

      <h2>How a small business shows it</h2>

      <ul>
        <li>Say who wrote or checked the page, with their real qualifications.</li>
        <li>Show your own work: photos, project details, prices you actually charge.</li>
        <li>Make contact details, address and business registration easy to find.</li>
        <li>Collect genuine reviews and reply to them.</li>
        <li>Keep facts accurate and dated, and correct them when they change.</li>
      </ul>

      <h2>What it is not</h2>

      <p>
        There is no E-E-A-T score in any tool, and fake signals backfire: invented reviews, stock photos passed off as your team, or claims you cannot back up. For health, money and safety topics Google holds pages to a higher standard.
      </p>
    </AnswerPage>
  );
}
