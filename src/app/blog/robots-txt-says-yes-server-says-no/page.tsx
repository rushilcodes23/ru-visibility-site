import { compactCount } from "@/lib/format";
import { AuditCta } from "@/components/ui/audit-cta";
import ReadingProgress from "@/components/reading-progress";
import { POSTS, formatPostDate } from "@/lib/posts";
import { pageMetadata } from "@/lib/seo";
import findings from "@/lib/research-findings.json";

// Every figure is read from research-findings.json. The "by name" counts are
// the sites whose server refused an AI crawler's request but served the very
// same request when it said Googlebot (scripts/aggregate-findings.mjs,
// aiCrawlerAccess and httpBlockedNameOnly*). The two examples were tested by
// hand on 8 October 2026 and are left unnamed on purpose: the point is the
// pattern, not the site.

const SLUG = "robots-txt-says-yes-server-says-no";
const TITLE = "Your robots.txt Says Yes, but Your Server Says No: Why AI Crawlers Get Blocked";

export const metadata = pageMetadata({
  path: `/blog/${SLUG}`,
  title: TITLE,
  description:
    "A robots.txt file can welcome AI crawlers while your server quietly turns them away. What 1.5k+ audits show about these hidden blocks, why they happen, and how to check your own site.",
  type: "article",
  image: `/covers/${SLUG}.png`,
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

const post = POSTS.find((p) => p.slug === SLUG)!;
const { corpus, crawlerBlocks, aiCrawlerAccess } = findings;
const N = compactCount(corpus.uniqueDomains);
const row = (name: string) => crawlerBlocks.find((c) => c.crawler === name)!;
const gpt = row("GPTBot");
const byName = aiCrawlerAccess.blockedByNameAtServer;
const inRobots = aiCrawlerAccess.disallowedInRobots;
/** One decimal everywhere, so 2% doesn't sit beside 2.9% looking like a different kind of number. */
const pctText = (n: number) => `${n.toFixed(1)}%`;
const ratio = Math.round((byName.count / inRobots.count) * 10) / 10;
/** Range across the crawlers that feed live answers (search + on-request). */
const liveRange = ["OAI-SearchBot", "Claude-SearchBot", "PerplexityBot", "ChatGPT-User", "Claude-User", "Perplexity-User"]
  .map((n) => row(n).httpBlockedNameOnlyPct);
const liveMin = Math.min(...liveRange);
const liveMax = Math.max(...liveRange);

/** Grouped the way the companies themselves describe these crawlers. */
const GROUPS = [
  { group: "Collect training data", bots: ["GPTBot", "ClaudeBot", "CCBot"] },
  { group: "Build AI search results", bots: ["OAI-SearchBot", "Claude-SearchBot", "PerplexityBot"] },
  { group: "Open a page when someone asks", bots: ["ChatGPT-User", "Claude-User", "Perplexity-User"] },
];

const SECTIONS = [
  { id: "two-doors", label: "Two different doors" },
  { id: "numbers", label: "What 1.5k+ audits show" },
  { id: "name-or-address", label: "A name block or an address check?" },
  { id: "why", label: "Why it happens without anyone deciding it" },
  { id: "examples", label: "Two examples from this week" },
  { id: "cost", label: "What each block costs you" },
  { id: "check", label: "Check your own site in five minutes" },
  { id: "summary", label: "The short version" },
];

/** ~1,600 words at 220wpm. */
const READ_MINUTES = 7;

const postJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: TITLE,
  description: metadata.description,
  author: { "@type": "Person", name: post.author, url: "https://ruvisibility.com/about" },
  publisher: { "@type": "Organization", name: "Ru Visibility", logo: "https://ruvisibility.com/logo-mark.png" },
  image: `https://ruvisibility.com/covers/${SLUG}.png`,
  datePublished: post.published,
  dateModified: post.updated ?? post.published,
  mainEntityOfPage: `https://ruvisibility.com/blog/${SLUG}`,
};

const CODE = `# 1. As a normal browser (the control)
curl -s -o /dev/null -w "%{http_code}\\n" -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0 Safari/537.36" https://yourdomain.com/

# 2. The same request, saying it is Googlebot
curl -s -o /dev/null -w "%{http_code}\\n" -A "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" https://yourdomain.com/

# 3. The same request, saying it is GPTBot
curl -s -o /dev/null -w "%{http_code}\\n" -A "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.1; +https://openai.com/gptbot)" https://yourdomain.com/`;

export default function RobotsTxtVsServerPost() {
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
                Your website might be telling AI crawlers they&apos;re welcome,
                while your server quietly turns them away.
              </p>
              <p>
                A robots.txt file can allow crawlers, but that doesn&apos;t
                guarantee they can reach your content. Firewalls, bot
                protection and server-level rules can still get in the way, and
                none of them show up when you read robots.txt.
              </p>
              <p>
                In this post I look at why this happens, how to find these
                hidden blocks on your own site, and why checking robots.txt
                alone isn&apos;t enough for AI visibility. The numbers come from
                the {N} business websites I have audited.
              </p>

              <h2 id="two-doors">Two different doors</h2>
              <p>
                Every crawler introduces itself by name. OpenAI&apos;s training
                crawler calls itself GPTBot, Anthropic&apos;s calls itself
                ClaudeBot, Google&apos;s calls itself Googlebot. What happens
                next depends on two separate things.
              </p>
              <p>
                <strong>robots.txt is a sign on the door.</strong> It is a plain
                text file at yourdomain.com/robots.txt that says which crawlers
                are welcome and where. Well-behaved crawlers read it and do what
                it says. It is a request, not a lock.
              </p>
              <p>
                <strong>Your server is the lock.</strong> When a crawler asks for
                a page, your server, your hosting firewall, your security plugin
                or your CDN decides whether to send it. If any of them refuses,
                the crawler gets an error instead of your page, whatever
                robots.txt says.
              </p>
              <p>
                So a site can have a perfectly friendly robots.txt and still be
                closed. The owner reads the sign, sees &ldquo;everyone
                welcome&rdquo;, and never learns that the lock says otherwise.
              </p>

              <h2 id="numbers">What 1.5k+ audits show</h2>
              <p>
                For every site I audit, my tool reads robots.txt and then
                requests a page as each crawler, by its full published name,
                after a normal browser request has confirmed the site is up.
              </p>
              <p>
                Take GPTBot. Across the {N} sites, {gpt.robotsDisallowCount}{" "}
                ({gpt.robotsDisallowPct}%) told it no in robots.txt. Far more,{" "}
                {gpt.httpBlockedCount} ({gpt.httpBlockedPct}%), refused it at the
                server. And {gpt.httpBlockedNameOnlyCount} of those served{" "}
                <em>the very same request</em> the moment it said
                &ldquo;Googlebot&rdquo; instead.
              </p>
              <p>
                Across every AI crawler I test,{" "}
                <Mark>
                  {byName.count} sites turned at least one away by name at the
                  server, against {inRobots.count} that said no in robots.txt
                </Mark>
                . For every site that blocks an AI crawler where its owner can
                see it, about {ratio} block one where they can&apos;t.
              </p>

              <div
                tabIndex={0}
                role="region"
                aria-label="Where AI crawlers get refused"
                className="overflow-x-auto rounded-md border focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
              >
                <table className="w-full min-w-[19rem] text-sm">
                  <caption className="sr-only">
                    Share of {N} audited sites refusing each AI crawler, in robots.txt and by name at the server
                  </caption>
                  <thead>
                    <tr className="border-b">
                      <th scope="col" className="p-3 text-left font-medium">Crawler</th>
                      <th scope="col" className="p-3 text-right font-medium">Refused in robots.txt</th>
                      <th scope="col" className="p-3 text-right font-medium">Refused by name at the server</th>
                    </tr>
                  </thead>
                  {GROUPS.map((g) => (
                    <tbody key={g.group}>
                      <tr className="border-b">
                        <th scope="colgroup" colSpan={3} className="p-3 pb-1 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                          {g.group}
                        </th>
                      </tr>
                      {g.bots.map((name) => {
                        const b = row(name);
                        return (
                          <tr key={name} className="border-b last:border-0">
                            <th scope="row" className="p-3 text-left font-normal">{name}</th>
                            <td className="p-3 text-right tabular-nums">{pctText(b.robotsDisallowPct)}</td>
                            <td className="p-3 text-right tabular-nums">{pctText(b.httpBlockedNameOnlyPct)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  ))}
                </table>
              </div>
              <p className="text-muted-foreground text-sm">
                The server column counts only sites that served the same request
                when it said Googlebot, so it is a floor, not a ceiling. The full
                crawler table is on the <a href="/research">research page</a>.
              </p>

              <h2 id="name-or-address">A name block or an address check?</h2>
              <p>
                There is one honest complication. Some firewalls don&apos;t trust
                names at all. They check the address a request comes from
                against the address list the crawler&apos;s owner publishes, and
                refuse anything that only <em>claims</em> to be GPTBot. A firewall
                like that would refuse my test, then let the real GPTBot in.
              </p>
              <p>
                That is why the Googlebot comparison matters. Google checks its
                own crawler by address too, so a firewall that verifies
                addresses refuses a fake Googlebot as well. If a server refuses
                &ldquo;GPTBot&rdquo; but serves the identical request labelled
                &ldquo;Googlebot&rdquo;, it isn&apos;t checking addresses. It is
                reacting to the name alone, and{" "}
                <Mark>the real GPTBot carries that same name, so it gets refused too</Mark>
                .
              </p>
              <p>
                It is strong evidence rather than proof for any single site,
                which is why the test further down is worth running on your own.
              </p>

              <h2 id="why">Why it happens without anyone deciding it</h2>
              <p>
                Some of these blocks are deliberate. Many arrive with something
                else, and nobody notices:
              </p>
              <ul className="list-disc pl-6 flex flex-col gap-2">
                <li>
                  <strong>CDN and firewall settings.</strong> Cloudflare has
                  settings that block AI crawlers, and its defaults for new
                  domains have changed more than once since 2025 (
                  <a href="/answers/does-cloudflare-block-ai-crawlers">more on that here</a>).
                </li>
                <li>
                  <strong>Security plugins.</strong> Some ship with a list of
                  &ldquo;bad bots&rdquo; to refuse, and AI crawlers can be on
                  it.
                </li>
                <li>
                  <strong>Rules copied into server files.</strong> A blocklist
                  pasted into .htaccess or an nginx config years ago keeps
                  working long after everyone has forgotten it.
                </li>
                <li>
                  <strong>Challenge pages.</strong> Bot protection that asks every
                  visitor to prove it is a browser, usually by running
                  JavaScript. Crawlers don&apos;t do that, so they never get
                  past it.
                </li>
              </ul>
              <p>
                None of these touch robots.txt, which is exactly why reading
                robots.txt tells you nothing about them.
              </p>

              <h2 id="examples">Two examples from this week</h2>
              <p>
                Both tested by hand on 8 October 2026. I&apos;ve left the sites
                unnamed because the pattern is the point.
              </p>
              <h3 className="text-lg font-medium">The site that blocks by name</h3>
              <p>
                Its robots.txt allows every crawler. Its server answers
                &ldquo;403 Forbidden&rdquo; to GPTBot, ClaudeBot and
                PerplexityBot, and to the Ahrefs and Semrush crawlers. The same
                page, requested as Googlebot, OAI-SearchBot or ChatGPT-User,
                comes back normally. So Perplexity&apos;s own search crawler
                cannot read this site, and nothing in robots.txt would ever tell
                the owner.
              </p>
              <h3 className="text-lg font-medium">The site behind a checkpoint</h3>
              <p>
                Every request I sent without a real browser got a security
                checkpoint page with an HTTP 429 status, even a request for
                robots.txt itself. Its host says this mode lets verified crawlers such as
                Googlebot through. Anything it can&apos;t verify gets the
                checkpoint, including every test I sent, whatever name it used,
                and an AI tool&apos;s page fetcher.
              </p>

              <h2 id="cost">What each block costs you</h2>
              <p>
                Not every block is a mistake. Some owners refuse training
                crawlers on purpose, and that is a fair choice. What matters is
                knowing which kind you are refusing:
              </p>
              <ul className="list-disc pl-6 flex flex-col gap-2">
                <li>
                  <strong>Training crawlers</strong> (GPTBot, ClaudeBot, CCBot)
                  collect material that future models learn from. Blocking them
                  doesn&apos;t stop AI search tools from showing you today.
                </li>
                <li>
                  <strong>Search crawlers</strong> (OAI-SearchBot,
                  Claude-SearchBot, PerplexityBot) are how AI search tools find
                  your pages in the first place. Block them and those tools
                  can&apos;t use your site in their answers.
                </li>
                <li>
                  <strong>On-request fetchers</strong> (ChatGPT-User,
                  Claude-User, Perplexity-User) open a page when someone asks
                  about it. Block them and the AI can&apos;t read your site even
                  while a customer is asking about you.
                </li>
              </ul>
              <p>
                In the table above, each crawler in the second and third groups
                is refused by name on {pctText(liveMin)} to {pctText(liveMax)} of sites. That sounds small until it is your site. If you do
                want to block training, do it in robots.txt, where you can see
                it and change it (
                <a href="/answers/should-you-block-ai-crawlers">which ones to block, and which not to</a>
                ).
              </p>

              <h2 id="check">Check your own site in five minutes</h2>
              <p>
                You don&apos;t need special tools. Run these three commands, or
                send them to whoever looks after your website. Each one asks for
                your homepage and prints only the status code.
              </p>
              <pre className="overflow-x-auto rounded-md border bg-muted p-4 text-[0.8125rem] leading-relaxed">
                <code>{CODE}</code>
              </pre>
              <p className="text-muted-foreground text-sm">
                On Windows, type <code>curl.exe</code> instead of{" "}
                <code>curl</code>: in Windows PowerShell, plain{" "}
                <code>curl</code> runs a different command.
              </p>
              <p>How to read the three numbers:</p>
              <ul className="list-disc pl-6 flex flex-col gap-2">
                <li>
                  <strong>200, 200, 200:</strong> nothing at your server is
                  refusing GPTBot. Repeat the third command with the other
                  crawler names you care about.
                </li>
                <li>
                  <strong>200, 200, then 403 (or 401, 429, 503):</strong> your
                  server is blocking GPTBot by name, so the real one is blocked
                  too. Find the rule and decide whether you meant it.
                </li>
                <li>
                  <strong>200, then a refusal for both Googlebot and GPTBot:</strong>{" "}
                  your firewall is probably checking addresses, and the real
                  crawlers may well get in. Your firewall&apos;s bot settings or
                  logs will confirm it.
                </li>
                <li>
                  <strong>A refusal on the first one:</strong> the test itself is
                  being blocked, perhaps by location. Try again from another
                  network before reading anything into the rest.
                </li>
              </ul>
              <p>
                If something is refusing a crawler you want, look in this order:
                your CDN&apos;s bot or AI crawler settings, your security
                plugin&apos;s firewall rules, your host&apos;s firewall, then
                your server configuration files. And read robots.txt last, for
                completeness, not first. There is a{" "}
                <a href="/answers/check-if-ai-crawlers-can-access-your-website">shorter version of this check</a>{" "}
                in the answers section.
              </p>

              <h2 id="summary">The short version</h2>
              <ul className="list-disc pl-6 flex flex-col gap-2">
                <li>robots.txt is a sign on the door. Your server is the lock.</li>
                <li>
                  Across {N} audited sites, {byName.count} block at least one AI
                  crawler by name at the server, against {inRobots.count} that do
                  it in robots.txt.
                </li>
                <li>
                  If your server refuses GPTBot but serves the same request as
                  Googlebot, the real GPTBot is refused too.
                </li>
                <li>
                  Many of these blocks come with a setting, a plugin or an old
                  rule rather than a decision.
                </li>
                <li>
                  Three commands will tell you which kind of site yours is.
                </li>
              </ul>
              <p>
                If you&apos;d rather have it checked for you,{" "}
                <a href="https://ruvisibility.com">Ru Visibility</a> tests every
                major search and AI crawler at robots.txt and at the server as
                part of every audit, and tells you in plain English what is
                being refused and why.
              </p>
            </div>
          </div>
        </div>
      </div>
      <AuditCta />
    </article>
  );
}
