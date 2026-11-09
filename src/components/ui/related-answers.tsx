import { answerBySlug } from "@/lib/answers";

/**
 * A short set of /answers pages at the end of a blog post, the services page
 * or a location page, so readers (and crawlers) reach the answers from the
 * pages that raise those questions. An unknown slug fails the build rather
 * than shipping a dead link.
 */
export function RelatedAnswers({
  slugs,
  title = "Questions people ask about this",
}: {
  slugs: string[];
  title?: string;
}) {
  const items = slugs.map((slug) => {
    const a = answerBySlug(slug);
    if (!a) throw new Error(`RelatedAnswers: unknown answer "${slug}"`);
    return a;
  });

  return (
    <section aria-labelledby="related-answers" className="w-full border-t py-16 lg:py-20">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <h2 id="related-answers" className="text-2xl tracking-tight md:text-3xl">
            {title}
          </h2>
          <a href="/answers" className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground">
            All answers
          </a>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((a) => (
            <li key={a.slug}>
              <a
                href={`/answers/${a.slug}`}
                className="flex h-full flex-col gap-2 rounded-xl border bg-background/60 p-5 transition-colors hover:border-foreground/40 hover:bg-background"
              >
                <span className="text-lg font-medium leading-snug">{a.question}</span>
                <span className="text-sm leading-relaxed text-muted-foreground">{a.description}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
