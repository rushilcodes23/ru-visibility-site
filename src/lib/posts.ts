export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  /**
   * ISO date. Single source of truth — the index card, the byline on the post
   * itself, and the BlogPosting schema all read from here, so a date can't be
   * shown in one place and contradicted in another.
   *
   * Per CONTENT_RULES.md, never bump `updated` without a real content change.
   * Only set it when the substance changed, not for a styling or layout edit.
   */
  published: string;
  updated?: string;
};

// Newest first — the blog index features POSTS[0].
export const POSTS: Post[] = [
  {
    slug: "seo-mistakes-from-1500-audits",
    title: "I Audited 1,500+ Websites: The 21 SEO Mistakes I See Most Often",
    excerpt:
      "Every number here comes from crawling 1,504 real business websites. The 21 problems that kept repeating, what each one actually costs, and the order I would fix them in.",
    author: "Rushil A. Bajpai",
    published: "2026-09-23",
  },
  {
    slug: "why-geo-matters",
    title: "Why GEO Matters",
    excerpt:
      "GEO isn't a buzzword — it's whether AI tools recommend your business at all. Why that's different from regular SEO, and what to actually do about it.",
    author: "Rushil",
    published: "2026-09-10",
  },
];

export function formatPostDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
