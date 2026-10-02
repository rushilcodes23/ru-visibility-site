import {
  AnswerPage,
  answerMetadata,
  Ext,
  FromOurAudits,
  SRC,
} from "@/components/answer-page";
import findings from "@/lib/research-findings.json";

const SLUG = "how-to-know-if-your-website-is-ada-compliant";
export const metadata = answerMetadata(SLUG);

const altGap = findings.subsetOnly.altTextGap;

export default function Page() {
  return (
    <AnswerPage
      slug={SLUG}
      short={
        <>
          Test it against WCAG, the guidelines the Justice Department points
          to. Run an automated scanner first, then use the site yourself with
          only a keyboard and with a screen reader. A scanner alone can&apos;t
          tell you: the W3C says such tools &ldquo;can only assist&rdquo; in
          judging accessibility.
        </>
      }
      sources={[SRC.w3cTools, SRC.adaGuidance, SRC.wcag]}
    >
      <h2>1. Run an automated scan</h2>
      <p>
        Free tools catch the mechanical problems quickly: missing image
        descriptions, low color contrast, form fields with no label. Good
        options are the axe DevTools browser extension, WAVE, and the
        accessibility section of Lighthouse built into Chrome. Run one on your
        homepage, a service page and your contact form.
      </p>

      <h2>2. Put the mouse away</h2>
      <p>
        Press Tab repeatedly from the top of a page. Can you reach every link,
        button and form field? Can you always see where you are? Can you open
        the menu, fill in the form and send it using only the keyboard? If you
        get stuck, so does everyone who can&apos;t use a mouse.
      </p>

      <h2>3. Listen to it</h2>
      <p>
        Turn on a screen reader: VoiceOver is built into Macs and iPhones, and
        NVDA is free for Windows. Listen to your homepage. Do images have
        sensible descriptions? Do buttons say what they do, rather than
        &ldquo;button&rdquo;? Does the page make sense read top to bottom?
      </p>

      <h2>4. Check the problems the Justice Department names</h2>
      <p>
        Its guidance lists poor color contrast, missing alt text, videos
        without captions, and mouse-only navigation as examples of barriers (
        <Ext href={SRC.adaGuidance.href}>US Department of Justice</Ext>). If
        your site has any of those, start there.
      </p>

      <FromOurAudits>
        Of the {altGap.denominator.toLocaleString("en-US")} sites where we
        checked images, {altGap.sitesPct}% had pictures with no description, the
        second item on that list.
      </FromOurAudits>

      <h2>Why a scanner isn&apos;t enough</h2>
      <p>
        The W3C, which writes WCAG, is clear that &ldquo;tools cannot check all
        accessibility aspects automatically. Human judgement is
        required&rdquo;, and that evaluation tools &ldquo;can not
        determine accessibility, they can only assist in doing so&rdquo; (
        <Ext href={SRC.w3cTools.href}>W3C</Ext>). A clean scan means the
        mechanical checks passed, not that real people can use the site.
      </p>

      <h2>Can a site be certified compliant?</h2>
      <p>
        There is no official ADA certification for websites, and anyone
        selling one is overstating it. What you can have is a dated record of
        testing against WCAG and the fixes you made, which is what we publish
        about <a href="/accessibility">our own site</a>.
      </p>
      <p className="text-base text-muted-foreground">
        General information, not legal advice.
      </p>
    </AnswerPage>
  );
}
