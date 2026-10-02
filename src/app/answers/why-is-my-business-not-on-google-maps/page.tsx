import { AnswerPage, answerMetadata, Ext, SRC } from "@/components/answer-page";

const SLUG = "why-is-my-business-not-on-google-maps";
export const metadata = answerMetadata(SLUG);

export default function Page() {
  return (
    <AnswerPage
      slug={SLUG}
      short={
        <>
          Often because the Business Profile isn&apos;t verified or is
          incomplete, or because other businesses are a closer match or simply
          closer to the person searching. Google ranks local results on three
          things: relevance, distance and prominence.
        </>
      }
      sources={[SRC.gbpLocalRanking, SRC.gbpGuidelines]}
    >
      <h2>How Google decides who shows up</h2>
      <p>Google names three factors (
        <Ext href={SRC.gbpLocalRanking.href}>Google Business Profile Help</Ext>):
      </p>
      <ul className="flex list-disc flex-col gap-2 pl-6">
        <li>
          <strong>Relevance:</strong> &ldquo;how well a Business Profile matches
          what someone is searching for.&rdquo;
        </li>
        <li>
          <strong>Distance:</strong> &ldquo;how far each business is from the
          customer who&apos;s searching.&rdquo;
        </li>
        <li>
          <strong>Prominence:</strong> &ldquo;how well-known a business
          is.&rdquo;
        </li>
      </ul>
      <p>
        Distance is why you can appear for one person and not another. Search
        from your shop and you may be first; search from across town and you
        may not appear at all.
      </p>

      <h2>Common reasons, and what to do</h2>
      <ul className="flex list-disc flex-col gap-2 pl-6">
        <li>
          <strong>Not verified.</strong> Google says to verify &ldquo;so
          it&apos;s more likely to show up in search results.&rdquo;
        </li>
        <li>
          <strong>Incomplete.</strong> &ldquo;Businesses with complete and
          accurate info are more likely to show up in local search
          results.&rdquo; Fill in categories, hours, services, website and
          photos.
        </li>
        <li>
          <strong>Wrong category.</strong> Google asks you to &ldquo;choose the
          fewest number of categories it takes to describe your overall core
          business&rdquo;, so pick the one that matches what customers search.
        </li>
        <li>
          <strong>Few reviews or replies.</strong> Prominence includes what
          others say about you. Google also notes that &ldquo;when you reply to
          customer reviews, it shows that you value their feedback.&rdquo;
        </li>
        <li>
          <strong>A rule problem.</strong> Stuffing extra words into your
          business name can backfire: &ldquo;Including unnecessary information
          in your business name isn&apos;t permitted, and could result in the
          suspension of your Business Profile&rdquo; (
          <Ext href={SRC.gbpGuidelines.href}>Google&apos;s guidelines</Ext>).
        </li>
      </ul>

      <h2>No storefront?</h2>
      <p>
        If you travel to customers rather than having them come to you, you
        can still have a profile; you hide your address and list the areas you
        serve.{" "}
        <a href="/answers/google-business-profile-without-an-address">
          Here is how that works
        </a>
        .
      </p>
    </AnswerPage>
  );
}
