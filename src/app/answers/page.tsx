import { Badge } from "@/components/ui/badge";
import { AuditCta } from "@/components/ui/audit-cta";
import { pageMetadata } from "@/lib/seo";
import { ANSWERS, TOPICS } from "@/lib/answers";
import { AUDITED } from "@/components/answer-page";

export const metadata = pageMetadata({
  path: "/answers",
  title: "SEO and AI Search Questions, Answered | Ru Visibility",
  description:
    "Plain answers to the questions business owners actually search about Google, ChatGPT, AI Overviews, AI crawlers, accessibility and local listings.",
});

export default function AnswersPage() {
  return (
    <div className="w-full">
      <div className="page-surface w-full pt-28 pb-16 lg:pt-36 lg:pb-20">
        <div className="container mx-auto px-4">
          <div className="page-head flex max-w-2xl flex-col items-start gap-4">
            <Badge>Answers</Badge>
            <h1 className="text-left text-3xl font-regular tracking-tighter md:text-5xl">
              The questions people search, answered plainly.
            </h1>
            <p className="text-left text-lg leading-relaxed tracking-tight text-muted-foreground">
              Every question here is one people really type into Google. We
              took them from Google&apos;s own search suggestions, then wrote
              one short page for each, built on what Google, OpenAI and others
              have published and on what we found auditing {AUDITED} business
              websites. No guarantees, because nobody can honestly give one.
            </p>
          </div>

          <nav aria-label="Topics" className="mt-10 max-w-3xl">
            <ul className="flex flex-wrap gap-2">
              {TOPICS.map((t) => (
                <li key={t.key}>
                  <a
                    href={`#${t.key}`}
                    className="rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    <Badge variant="secondary">{t.title}</Badge>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className="page-surface w-full border-t py-16 lg:py-24">
        <div className="container mx-auto grid gap-x-10 gap-y-14 px-4 md:grid-cols-2">
          {TOPICS.map((t) => (
            <section key={t.key} id={t.key} aria-labelledby={`${t.key}-h`} className="scroll-mt-28">
              <h2 id={`${t.key}-h`} className="mb-1 text-2xl tracking-tight md:text-3xl">
                {t.title}
              </h2>
              <p className="mb-5 text-sm text-muted-foreground">
                From the search &ldquo;{t.search}&rdquo;
              </p>
              <ul className="flex flex-col gap-3">
                {ANSWERS.filter((a) => a.topic === t.key).map((a) => (
                  <li key={a.slug}>
                    <a
                      href={`/answers/${a.slug}`}
                      className="card-surface block rounded-md p-5 transition-transform duration-200 hover:scale-[1.01]"
                    >
                      <span className="block text-base font-medium tracking-tight">
                        {a.question}
                      </span>
                      <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                        {a.description}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>

      <AuditCta />
    </div>
  );
}
