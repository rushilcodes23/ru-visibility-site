import { AnswerPage, answerMetadata, Ext, SRC } from "@/components/answer-page";

const SLUG = "google-business-profile-without-an-address";
export const metadata = answerMetadata(SLUG);

export default function Page() {
  return (
    <AnswerPage
      slug={SLUG}
      short={
        <>
          Yes, if you go to your customers. Google&apos;s rule is that if your
          business &ldquo;either has a physical location that customers can
          visit, or travels to customers where they are, you can create a
          Business Profile.&rdquo; Businesses that travel to customers hide
          their address. A virtual office or a remote mailbox doesn&apos;t
          qualify.
        </>
      }
      sources={[SRC.gbpGuidelines, SRC.gbpServiceArea]}
    >
      <h2>Who qualifies</h2>
      <p>
        Google&apos;s eligibility test has two routes: customers come to you,
        or you go to them (
        <Ext href={SRC.gbpGuidelines.href}>Google&apos;s guidelines</Ext>). A
        plumber, a cleaner, a mobile mechanic or a home tutor who travels to
        clients all meet the second one, even working from home.
      </p>

      <h2>What to do with your address</h2>
      <p>
        If customers don&apos;t visit you, Google wants the address off your
        public profile: &ldquo;If you&apos;re a service-area business, you
        should hide your business address from customers.&rdquo; Its own
        example: &ldquo;if you&apos;re a plumber and run your business from
        your residential address, clear the address from your Business
        Profile.&rdquo; You list the areas you serve instead;{" "}
        <a href="/answers/what-is-a-service-area-business">here is how service areas work</a>.
      </p>

      <h2>What doesn&apos;t count</h2>
      <ul className="flex list-disc flex-col gap-2 pl-6">
        <li>
          Mailboxes: &ldquo;P.O. boxes or mailboxes located at remote locations
          aren&apos;t acceptable.&rdquo;
        </li>
        <li>
          Virtual offices: &ldquo;If your business rents a physical mailing
          address but doesn&apos;t operate out of that location, also known as
          a virtual office, that location isn&apos;t eligible for a Business
          Profile.&rdquo;
        </li>
      </ul>

      <h2>What if you only work online?</h2>
      <p>
        Then Google&apos;s test isn&apos;t met: there is no place customers
        visit and no travelling to them. Plenty of online businesses are in
        this position, ours included. The alternative is to be findable in
        ordinary search and in AI answers instead: a clear website, consistent
        listings and directories that do accept online businesses, and other
        sites mentioning you.{" "}
        <a href="/answers/how-to-increase-ai-visibility">Where to start on that</a>.
      </p>
    </AnswerPage>
  );
}
