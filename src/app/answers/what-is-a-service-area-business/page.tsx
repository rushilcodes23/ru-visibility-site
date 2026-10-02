import { AnswerPage, answerMetadata, Ext, SRC } from "@/components/answer-page";

const SLUG = "what-is-a-service-area-business";
export const metadata = answerMetadata(SLUG);

export default function Page() {
  return (
    <AnswerPage
      slug={SLUG}
      short={
        <>
          Google&apos;s term for &ldquo;a business that visits or delivers to
          customers directly but doesn&apos;t serve customers at their business
          address&rdquo;: a plumber, say, or a mobile dog groomer. On a Business
          Profile it shows the areas you serve instead of a street address.
        </>
      }
      sources={[SRC.gbpServiceArea, SRC.gbpGuidelines, SRC.gbpLocalRanking]}
    >
      <h2>How it works on your profile</h2>
      <p>
        Instead of showing an address, a service-area business lists where it
        works. Google&apos;s instruction: &ldquo;If you don&apos;t serve
        customers at your business address, remove your address and only enter
        your service area&rdquo; (
        <Ext href={SRC.gbpServiceArea.href}>Google Business Profile Help</Ext>).
        You can add service areas by city, postal code or region, up to 20 of
        them.
      </p>
      <p>
        Keep the area honest. Google says &ldquo;the boundaries of your overall
        area shouldn&apos;t be more than about 2 hours of driving time from
        where your business is based.&rdquo;
      </p>

      <h2>Does it hurt your visibility?</h2>
      <p>
        Hiding your address is what Google asks service-area businesses to
        do; it isn&apos;t a penalty. Google ranks local results on relevance,
        distance and prominence (
        <Ext href={SRC.gbpLocalRanking.href}>Google Business Profile Help</Ext>
        ), so the same things matter as for a shop: a complete, verified
        profile, the right category, and reviews. What changes is that
        customers see where you work rather than where you live.
      </p>

      <h2>Examples</h2>
      <ul className="flex list-disc flex-col gap-2 pl-6">
        <li>Trades that work at the customer&apos;s home: plumbers, electricians, cleaners.</li>
        <li>Mobile services: mechanics, groomers, tutors who travel.</li>
        <li>Businesses that deliver but have no counter for customers to visit.</li>
      </ul>
      <p>
        If customers can visit you somewhere, you aren&apos;t a pure
        service-area business; that location can be shown.{" "}
        <a href="/answers/home-address-on-google-business-profile">
          Should a home address be shown?
        </a>
      </p>
    </AnswerPage>
  );
}
