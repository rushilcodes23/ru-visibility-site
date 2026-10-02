import { AnswerPage, answerMetadata, Ext, SRC } from "@/components/answer-page";

const SLUG = "home-address-on-google-business-profile";
export const metadata = answerMetadata(SLUG);

export default function Page() {
  return (
    <AnswerPage
      slug={SLUG}
      short={
        <>
          Only if customers come to you there. If you work from home and travel
          to clients, Google says to hide it: &ldquo;if you&apos;re a plumber
          and run your business from your residential address, clear the
          address from your Business Profile,&rdquo; and list the areas you
          serve instead.
        </>
      }
      sources={[SRC.gbpGuidelines, SRC.gbpServiceArea]}
    >
      <h2>If customers visit you at home</h2>
      <p>
        A home salon, a music teacher whose students come to the house, a
        workshop where people pick up orders: your home is then a location
        customers visit, which is exactly what Google&apos;s guidelines
        describe as eligible. In that case the address is what lets customers
        find you, so it belongs on the profile.
      </p>

      <h2>If you travel to customers</h2>
      <p>
        Then Google is clear that the address shouldn&apos;t be on show:
        &ldquo;If you&apos;re a service-area business, you should hide your
        business address from customers&rdquo; (
        <Ext href={SRC.gbpGuidelines.href}>Google&apos;s guidelines</Ext>). In
        its service-area help: &ldquo;If you don&apos;t serve customers at your
        business address, remove your address and only enter your service
        area&rdquo; (
        <Ext href={SRC.gbpServiceArea.href}>Google Business Profile Help</Ext>).
      </p>
      <p>
        That also keeps your home off a public map, which most people working
        from home would rather have anyway.
      </p>

      <h2>What not to do instead</h2>
      <p>
        Don&apos;t rent a virtual office or a mailbox to get a &ldquo;proper&rdquo;
        address. Google treats a rented address you don&apos;t work from as
        ineligible: &ldquo;that location isn&apos;t eligible for a Business
        Profile&rdquo;, and &ldquo;P.O. boxes or mailboxes located at remote
        locations aren&apos;t acceptable.&rdquo;
      </p>

      <h2>Keep it consistent</h2>
      <p>
        Whatever you decide, make your website and other listings match it.
        If your profile hides the address, don&apos;t publish it in every
        directory; if it shows it, make sure every listing uses the same
        version, word for word.
      </p>
    </AnswerPage>
  );
}
