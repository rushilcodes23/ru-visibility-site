import { AnswerPage, answerMetadata, Ext, SRC } from "@/components/answer-page";

const SLUG = "what-is-a-website-accessibility-audit";
export const metadata = answerMetadata(SLUG);

export default function Page() {
  return (
    <AnswerPage
      slug={SLUG}
      short={
        <>
          A test of whether people with disabilities can use your website,
          measured against the Web Content Accessibility Guidelines (WCAG). A
          proper one combines automated scans with checks only a person can do,
          and ends with a list of barriers and how to fix them.
        </>
      }
      sources={[SRC.wcag, SRC.w3cTools, SRC.adaGuidance]}
    >
      <h2>What gets tested</h2>
      <p>WCAG is built on four principles, and an audit checks each:</p>
      <ul className="flex list-disc flex-col gap-2 pl-6">
        <li>
          <strong>Perceivable:</strong> can everyone take in the content?
          Image descriptions, color contrast, captions on video.
        </li>
        <li>
          <strong>Operable:</strong> can everyone use it? Keyboard access,
          visible focus, enough time to complete tasks.
        </li>
        <li>
          <strong>Understandable:</strong> labels on form fields, clear error
          messages, predictable behavior.
        </li>
        <li>
          <strong>Robust:</strong> is the code clean enough that screen readers
          and other assistive technology can interpret it?
        </li>
      </ul>

      <h2>Automated and manual, not one or the other</h2>
      <p>
        Scanners are fast and consistent, and catch the mechanical problems.
        But the W3C says &ldquo;tools cannot check all accessibility aspects
        automatically. Human judgement is required&rdquo;, and warns that
        &ldquo;sometimes evaluation tools can produce false or misleading
        results&rdquo; (<Ext href={SRC.w3cTools.href}>W3C</Ext>). Whether an
        image description is actually useful, or whether a form makes sense to
        someone using a screen reader, takes a person to judge.
      </p>

      <h2>What you should get</h2>
      <ul className="flex list-disc flex-col gap-2 pl-6">
        <li>A list of barriers, each tied to the WCAG criterion it fails.</li>
        <li>Where each one is on your site, so it can be found and fixed.</li>
        <li>An order to fix them in, starting with what blocks people most.</li>
        <li>The date and scope of the test, so you know what it covered.</li>
      </ul>

      <h2>Why businesses do it</h2>
      <p>
        Partly because people who can&apos;t use your site can&apos;t become
        customers. Partly because the US Justice Department says the ADA covers
        what businesses open to the public offer on the web (
        <Ext href={SRC.adaGuidance.href}>US Department of Justice</Ext>).{" "}
        <a href="/answers/do-small-business-websites-need-to-be-ada-compliant">
          More on what that means for a small business
        </a>
        .
      </p>

      <h2>How we do it</h2>
      <p>
        We run real scans with axe-core, the open-source engine many
        accessibility tools are built on, check the results by hand, and
        report only what we measured. We hold our own site to the same
        standard and{" "}
        <a href="/accessibility">publish the results with their date</a>.
      </p>
    </AnswerPage>
  );
}
