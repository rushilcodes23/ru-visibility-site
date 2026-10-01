import { AuditCta } from "@/components/ui/audit-cta";
import ReadingProgress from "@/components/reading-progress";
import { POSTS, formatPostDate } from "@/lib/posts";
import { pageMetadata } from "@/lib/seo";
import findings from "@/lib/research-findings.json";

// For business owners, not SEO people. Every figure is read from
// research-findings.json (the same data as /research), and the two outside
// claims quote Google Search Central and the GEO paper's abstract, both
// checked at the source on 1 October 2026. The dental clinic is labelled as
// illustrative in visible text, per CONTENT_RULES.md.

const TITLE = "SEO vs GEO: How Search Is Changing for Businesses";

export const metadata = pageMetadata({
  path: "/blog/seo-vs-geo",
  title: TITLE,
  description:
    "What SEO and GEO mean for a business, how AI answers are changing the way customers find companies, and what is worth doing about it, in plain English.",
  type: "article",
});

/** Same inline emphasis as the other posts. */
function Mark({ children }: { children: React.ReactNode }) {
  return (
    <mark
      className="font-medium text-foreground"
      style={{
        boxDecorationBreak: "clone",
        WebkitBoxDecorationBreak: "clone",
        background: "color-mix(in oklch, var(--accent-green) 22%, transparent)",
        borderRadius: "3px",
        padding: "0.08em 0.24em",
        margin: "0 -0.06em",
      }}
    >
      {children}
    </mark>
  );
}

const post = POSTS.find((p) => p.slug === "seo-vs-geo")!;
const { corpus, scores, crawlerBlocks } = findings;
const N = corpus.uniqueDomains.toLocaleString("en-US");
const blockedPct = (name: string) => crawlerBlocks.find((c) => c.crawler === name)?.combinedPct;

const SECTIONS = [
  { id: "seo", label: "What SEO means for a business" },
  { id: "geo", label: "What GEO means for a business" },
  { id: "difference", label: "SEO vs GEO: the real difference" },
  { id: "example", label: "One business, two kinds of search" },
  { id: "both", label: "Why it makes sense to think about both" },
  { id: "what-to-do", label: "What to do now" },
  { id: "summary", label: "The short version" },
];

/** ~1,750 words at 220wpm. */
const READ_MINUTES = 8;

const postJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: TITLE,
  description: metadata.description,
  author: { "@type": "Person", name: post.author, url: "https://ruvisibility.com/about" },
  publisher: { "@type": "Organization", name: "Ru Visibility", logo: "https://ruvisibility.com/logo-mark.png" },
  image: "https://ruvisibility.com/opengraph-image.png",
  datePublished: post.published,
  dateModified: post.updated ?? post.published,
  mainEntityOfPage: "https://ruvisibility.com/blog/seo-vs-geo",
};

const AT_A_GLANCE = [
  { row: "The goal", seo: "Rank in the list of results", geo: "Get mentioned in the answer" },
  { row: "What the customer sees", seo: "Ten or more links to compare", geo: "A written answer that names a few businesses, sometimes one" },
  { row: "How people ask", seo: "Short phrases: “family dentist Dallas”", geo: "Full questions: “Which Dallas dentists are good with nervous kids?”" },
  { row: "What gets used", seo: "Mostly whole pages, for the visitor to read", geo: "Specific facts and short passages, combined with what other sources say" },
  { row: "How you check it", seo: "Your position for a search", geo: "How often, and how accurately, your business comes up" },
];

export default function SeoVsGeoPost() {
  return (
    <article className="w-full pb-20 pt-24 lg:pb-32 lg:pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(postJsonLd) }}
      />
      <ReadingProgress />

      <div className="container mx-auto max-w-[78rem] px-4">
        <div className="article-shell">
          <aside className="article-rail" aria-label="Article contents">
            <p className="article-rail-title">In this piece</p>
            <nav>
              {SECTIONS.map((s) => (
                <a key={s.id} href={`#${s.id}`}>
                  {s.label}
                </a>
              ))}
            </nav>
          </aside>

          <div className="article-scrim min-w-0">
            <header className="mb-12">
              <h1
                className="text-[2.35rem] font-regular leading-[1.06] tracking-tighter md:text-[4rem]"
                style={{ textWrap: "balance" }}
              >
                {TITLE}
              </h1>
              <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 border-t pt-5 text-sm text-muted-foreground">
                <span className="text-foreground">{post.author}</span>
                <span aria-hidden="true">·</span>
                <span>Founder</span>
                <span aria-hidden="true">·</span>
                <time dateTime={post.published}>{formatPostDate(post.published)}</time>
                <span aria-hidden="true">·</span>
                <span>{READ_MINUTES} min read</span>
              </div>
            </header>

            <div className="article-body flex flex-col gap-6">
              <p>
                For about twenty years, being found online meant one thing:
                showing up on Google. Someone types &ldquo;accountant for small
                business&rdquo; or &ldquo;dentist near me&rdquo;, looks down a
                list of links, and picks one.
              </p>
              <p>
                That still happens all day, every day. But there is now a second
                way people look for businesses. They ask an AI assistant such as
                ChatGPT, Gemini or Perplexity a question in ordinary language,
                and instead of a list of links they get a written answer.
                Sometimes that answer names specific businesses.
              </p>
              <p>
                Google is doing the same thing inside its own results. For many
                searches it now shows an AI-written summary, which it calls an
                AI Overview, above the usual links.
              </p>
              <p>
                Two terms have grown up around this: <strong>SEO</strong> for
                the first kind of search, and <strong>GEO</strong> for the
                second. Here is what each one means in practice, how they fit
                together, and what is worth doing about it, whatever the size
                of your business.
              </p>

              <h2 id="seo">What SEO means for a business</h2>
              <p>
                SEO stands for search engine optimisation. In plain terms, it is
                the work of making your website easy for Google to find,
                understand and trust. Done well, your site shows up when people
                search for what you offer.
              </p>
              <p>For most businesses, good SEO comes down to a handful of things:</p>
              <ul className="list-disc pl-6 flex flex-col gap-2">
                <li>Google can reach and read every page that matters.</li>
                <li>
                  Each page is clearly about one thing: a service, a location,
                  or a question customers ask.
                </li>
                <li>The site loads quickly and works properly on a phone.</li>
                <li>Other reputable websites link to you or mention you.</li>
                <li>
                  Your name, address and phone number are the same everywhere
                  they appear.
                </li>
              </ul>
              <p>
                The reward is a place in front of people who are already
                looking. Someone searching &ldquo;emergency plumber
                Houston&rdquo; needs a plumber today. If you are near the top of
                that list, you have a real chance at the call.
              </p>

              <h2 id="geo">What GEO means for a business</h2>
              <p>
                GEO stands for generative engine optimisation.
                &ldquo;Generative&rdquo; refers to AI tools that write an answer
                instead of listing links: ChatGPT, Gemini, Perplexity,
                Microsoft Copilot and Google&apos;s AI Overviews.
              </p>
              <p>
                GEO is the work of making sure those tools can find your
                business, understand what you do, and have good reason to
                mention you when someone asks a relevant question.
              </p>
              <p>
                Depending on the tool, an answer is built from what the AI
                learned in training, from a live search of the web, or both. It
                draws on websites, reviews, directories and articles, then
                writes a short reply that might name two or three businesses.{" "}
                <Mark>
                  GEO is about giving it clear, accurate, trustworthy material to
                  work with
                </Mark>
                , so your business has a fair chance of being one of them.
              </p>
              <p>What tends to help:</p>
              <ul className="list-disc pl-6 flex flex-col gap-2">
                <li>
                  AI tools can actually reach your website. Some sites block
                  them by accident, often through a security setting.
                </li>
                <li>
                  Your pages answer real customer questions directly, in plain
                  sentences, instead of hinting at the answer.
                </li>
                <li>
                  Your business is described the same way on your website, your
                  Google Business Profile and in directories, so an AI tool can
                  tell it is all one business.
                </li>
                <li>
                  Other people talk about you: reviews, local press, industry
                  associations, &ldquo;best of&rdquo; lists.
                </li>
              </ul>
              <p>
                The term itself comes from a research paper,{" "}
                <em>GEO: Generative Engine Optimization</em>, published at the
                KDD 2024 conference. Its authors reported that changes such as
                citing sources and adding statistics and quotations{" "}
                &ldquo;can boost visibility by up to 40% in generative engine
                responses&rdquo;. They also noted that results vary from one
                subject to another (
                <a href="https://arxiv.org/abs/2311.09735" target="_blank" rel="noopener noreferrer">
                  read the paper
                </a>
                ). It is a real effect, but not a guaranteed one.
              </p>

              <h2 id="difference">SEO vs GEO: the real difference</h2>
              <p>The shortest way to put it:</p>
              <blockquote className="my-2 rounded-md border-l-4 border-primary bg-muted py-5 pl-6 pr-5 text-lg font-medium leading-relaxed text-foreground md:text-xl">
                SEO helps you rank in a list. GEO helps you get mentioned in an
                answer.
              </blockquote>
              <p>A few differences matter in practice:</p>

              <h3 className="text-lg font-medium">The result looks different</h3>
              <p>
                A results page shows ten or more options and lets the person
                compare. An AI answer usually names a handful of businesses,
                sometimes only one, and often says why it chose them.
              </p>

              <h3 className="text-lg font-medium">People ask differently</h3>
              <p>
                People type short phrases into Google, like &ldquo;roof repair
                cost&rdquo;. They ask AI tools whole questions: &ldquo;How much
                should a roof repair cost on a two-storey house, and what should
                I watch out for?&rdquo; Those longer questions reward a business
                that has explained itself in detail.
              </p>

              <h3 className="text-lg font-medium">Different parts of your site get used</h3>
              <p>
                Google mostly sends people to a page and lets them read it. AI
                tools tend to pick out specific facts and short passages: a
                price range, a clear answer to a common question, a sentence
                about who you serve. They combine those with what other sources
                say about you.
              </p>

              <h3 className="text-lg font-medium">You measure them differently</h3>
              <p>
                You can check where you rank on Google for a search. AI answers
                change from one person, and one moment, to the next, so there is
                no single position. What you look at instead is how often your
                business comes up, and whether what is said about it is right.
              </p>

              <div
                tabIndex={0}
                role="region"
                aria-label="SEO and GEO at a glance"
                className="overflow-x-auto rounded-md border focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
              >
                <table className="w-full min-w-[30rem] text-sm">
                  <caption className="sr-only">SEO and GEO compared at a glance</caption>
                  <thead>
                    <tr className="border-b">
                      <th scope="col" className="p-3 text-left font-medium"><span className="sr-only">Compared on</span></th>
                      <th scope="col" className="p-3 text-left font-medium">SEO</th>
                      <th scope="col" className="p-3 text-left font-medium">GEO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {AT_A_GLANCE.map((r) => (
                      <tr key={r.row} className="border-b last:border-0 align-top">
                        <th scope="row" className="p-3 text-left font-medium">{r.row}</th>
                        <td className="p-3">{r.seo}</td>
                        <td className="p-3">{r.geo}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 className="text-lg font-medium">Where they overlap</h3>
              <p>
                A lot. Google says plainly that{" "}
                <Mark>
                  &ldquo;the best practices for SEO remain relevant for AI
                  features in Google Search&rdquo;
                </Mark>
                . It adds that there are &ldquo;no additional requirements to
                appear in AI Overviews or AI Mode&rdquo; (
                <a href="https://developers.google.com/search/docs/appearance/ai-features" target="_blank" rel="noopener noreferrer">
                  Google Search Central
                </a>
                ). A website that is hard for Google to read is usually hard for
                AI tools too. GEO does not replace SEO. It builds on it.
              </p>

              <h2 id="example">One business, two kinds of search</h2>
              <p className="text-muted-foreground text-sm">
                An illustrative example, not a client.
              </p>
              <p>
                Picture a family dental clinic in Dallas. Good dentists, solid
                reviews, a decent website.
              </p>

              <h3 className="text-lg font-medium">In a traditional Google search</h3>
              <p>
                Someone types &ldquo;family dentist Dallas&rdquo;. Google shows a
                map with a few local listings, then a list of websites. The
                clinic appears on the map because its Google Business Profile is
                complete and well reviewed. Its website is on the first page
                because it is fast, clear and has a page about family dentistry.
                The searcher compares three or four options, reads some reviews
                and calls one. That is SEO doing its job.
              </p>

              <h3 className="text-lg font-medium">In an AI answer</h3>
              <p>
                Another parent asks ChatGPT: &ldquo;I&apos;m in Dallas and my
                kids are scared of the dentist. Which family dentists are good
                with anxious children, and do any take Delta Dental?&rdquo; The
                answer names three clinics, with a sentence about each.
              </p>
              <p>Whether this clinic is one of the three likely depends on things like:</p>
              <ul className="list-disc pl-6 flex flex-col gap-2">
                <li>
                  whether its website actually says it works with nervous
                  children, or only says &ldquo;we offer family dentistry&rdquo;;
                </li>
                <li>whether it lists the insurance plans it accepts in plain text;</li>
                <li>whether its reviews and other websites mention it in that context;</li>
                <li>whether the AI tool can reach its website at all.</li>
              </ul>
              <p>
                Same clinic, same city, same quality of care. In the first case
                it is competing for a place on a list. In the second, what
                matters most is how clearly the clinic has explained itself, on
                its own site and elsewhere, because the answer is built from
                exactly that.
              </p>

              <h2 id="both">Why it makes sense to think about both</h2>
              <p>
                <strong>Traditional search is not going anywhere.</strong> Plenty
                of your customers will keep searching the way they always have,
                and a strong position on Google remains one of the most valuable
                things a business can have online.
              </p>
              <p>
                <strong>More people are also asking AI tools</strong>, especially
                research-style questions: which provider to choose, what
                something should cost, what to look out for. Those are often the
                moments a decision is being made.
              </p>
              <p>
                <strong>The work overlaps.</strong> Most of what helps you on
                Google helps with AI answers too. Doing both is not twice the
                work. It is mostly the same foundation, with more attention to
                clear answers and to what other people say about you.
              </p>
              <p>
                <strong>Most businesses have done far more of one than the
                other.</strong> We have audited {N} business websites. On a
                100-point scale they average <strong>{scores.seo.mean}</strong>{" "}
                for SEO and <strong>{scores.geo.mean}</strong> for GEO.{" "}
                <Mark>
                  {scores.seo.grades.A} of them earned an A for SEO. Just{" "}
                  {scores.geo.grades.A} earned an A for GEO.
                </Mark>{" "}
                The basics of being found on Google are in reasonable shape for
                most of them. The newer part is where the gap is, which also
                means there is room to stand out. The full results are on our{" "}
                <a href="/research">research page</a>.
              </p>

              <h2 id="what-to-do">What to do now</h2>
              <p>
                None of this needs secret tricks, and it does not have to be a
                long technical project. A sensible order:
              </p>

              <h3 className="text-lg font-medium">1. Look yourself up both ways</h3>
              <p>
                Search Google for your main service and town. Then ask ChatGPT,
                Gemini or Perplexity the questions your customers ask you on the
                phone. Note which businesses come up and what is said about
                them. Ask more than once, because AI answers vary.
              </p>

              <h3 className="text-lg font-medium">2. Make sure AI tools can reach your site</h3>
              <p>
                Ask whoever looks after your website to check that it is not
                turning AI tools away. In our audits, {blockedPct("PerplexityBot")}%
                of sites blocked Perplexity and {blockedPct("OAI-SearchBot")}%
                blocked the crawler ChatGPT uses for search, often without the
                owner knowing. It is normally a quick fix.
              </p>

              <h3 className="text-lg font-medium">3. Say clearly what you do, for whom, and where</h3>
              <p>
                On your own pages, say in plain words what services you offer,
                who they are for and which areas you cover. Include a price or a
                price range if you can, and what makes you different. Answer the
                questions customers ask you every week. If you are good with
                nervous patients, first-time buyers or small budgets, say so.
              </p>

              <h3 className="text-lg font-medium">4. Keep your details consistent everywhere</h3>
              <p>
                Use the same business name, address and phone number on your
                website, your Google Business Profile, directories and social
                profiles, and link to those profiles from your website. It helps
                Google and AI tools recognise that they are all the same
                business.
              </p>

              <h3 className="text-lg font-medium">5. Give people reasons to talk about you</h3>
              <p>
                Ask happy customers for reviews. Get listed with your industry
                association. Say yes to local press and partner features. This
                is the slowest part and nobody can shortcut it, but it helps on
                Google and in AI answers alike.
              </p>
              <p>
                One caution: be wary of anyone who promises guaranteed mentions
                in ChatGPT or guaranteed first-place rankings. Nobody controls
                what these tools say. What you can control is how clear, accurate
                and trustworthy the information about your business is.
              </p>

              <h2 id="summary">The short version</h2>
              <p>
                Search is not being replaced. It is widening. People still use
                Google, and more of them now also ask AI tools.{" "}
                <Mark>
                  SEO helps you show up when people search. GEO helps you get
                  mentioned when they ask.
                </Mark>{" "}
                Both rest on the same foundation: a clear, well-built website,
                consistent business details, and a business that other people
                talk about. Get that right and you are in a good position for
                both.
              </p>
              <p>
                If you would like to know where your business stands on each,{" "}
                <a href="https://ruvisibility.com">Ru Visibility</a> audits
                websites for both. We look at how a site performs in traditional
                search and how ready it is to be mentioned in AI answers, then
                explain the findings in plain English.
              </p>
            </div>
          </div>
        </div>
      </div>
      <AuditCta />
    </article>
  );
}
