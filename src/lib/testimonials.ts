export type Testimonial = {
  /** The person's real name, as they agreed to have it published. */
  name: string;
  /** Their business, and city if they want it shown. */
  business: string;
  quote: string;
  /** Path under /public, e.g. "/logos/acme.png". Optional. */
  logo?: string;
};

/**
 * Real quotes only, with written permission, from real engagements —
 * see CONTENT_RULES.md. Nothing here is written by us on a client's behalf.
 *
 * While this array is empty the homepage strip renders nothing at all and
 * /testimonials is noindexed, so the site never advertises an absence. Adding
 * one entry turns both on automatically; no other file needs editing.
 *
 * Never add `Review` or `AggregateRating` schema alongside these without real
 * reviews behind them — that is a direct manual-action trigger.
 */
export const TESTIMONIALS: Testimonial[] = [];
