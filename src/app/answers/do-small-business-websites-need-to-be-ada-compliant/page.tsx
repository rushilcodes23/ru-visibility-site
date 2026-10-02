import { AnswerPage, answerMetadata, Ext, SRC } from "@/components/answer-page";

const SLUG = "do-small-business-websites-need-to-be-ada-compliant";
export const metadata = answerMetadata(SLUG);

export default function Page() {
  return (
    <AnswerPage
      slug={SLUG}
      short={
        <>
          In the US, the Department of Justice says the ADA&apos;s requirements
          apply to the goods and services businesses open to the public offer
          on the web. It has no regulation setting detailed technical standards
          for them, but points to the Web Content Accessibility Guidelines
          (WCAG) as helpful guidance. This is general information, not legal
          advice.
        </>
      }
      sources={[SRC.adaGuidance, SRC.wcag]}
    >
      <h2>What the Justice Department says</h2>
      <p>
        Its guidance on web accessibility is direct: &ldquo;the ADA&apos;s
        requirements apply to all the goods, services, privileges, or
        activities offered by public accommodations, including those offered
        on the web&rdquo; (
        <Ext href={SRC.adaGuidance.href}>US Department of Justice, March 2022</Ext>).
      </p>
      <p>
        &ldquo;Public accommodations&rdquo; means businesses open to the
        public. The Department&apos;s examples include &ldquo;retail stores
        and other sales or retail establishments; banks; hotels, inns, and
        motels; hospitals and medical offices; food and drink establishments;
        and auditoriums, theaters, and sports arenas.&rdquo;
      </p>

      <h2>Is there a technical rule to follow?</h2>
      <p>
        Not a detailed one for businesses. The Department says it &ldquo;does
        not have a regulation setting out detailed standards&rdquo;, and that
        businesses &ldquo;have flexibility in how they comply&rdquo;. It points
        to existing standards as &ldquo;helpful guidance&rdquo;, naming the
        Web Content Accessibility Guidelines.
      </p>
      <p>
        In practice, WCAG 2.1 at level AA is the standard ADA web claims are
        generally measured against, and the one our audits use.
      </p>

      <h2>What problems it is talking about</h2>
      <p>The Department&apos;s own examples of barriers:</p>
      <ul className="flex list-disc flex-col gap-2 pl-6">
        <li>poor color contrast, such as light gray text on a light background;</li>
        <li>no text alternatives (&ldquo;alt text&rdquo;) on images;</li>
        <li>no captions on videos;</li>
        <li>navigation that only works with a mouse, not a keyboard.</li>
      </ul>

      <h2>What a small business can sensibly do</h2>
      <p>
        Find out where your site stands, fix the barriers that stop people
        using it, and keep checking as the site changes.{" "}
        <a href="/answers/how-to-know-if-your-website-is-ada-compliant">
          How to test your own site
        </a>{" "}
        walks through the first step. We publish{" "}
        <a href="/accessibility">our own results</a>, with dates, because we
        test other people&apos;s sites for this.
      </p>
      <p className="text-base text-muted-foreground">
        Not legal advice. If you have received a complaint or demand letter,
        speak to a lawyer.
      </p>
    </AnswerPage>
  );
}
