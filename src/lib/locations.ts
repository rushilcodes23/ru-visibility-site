// Real target markets only. US cities are Rushil's actual existing
// outreach markets (see ABOUT-RUSHIL.md); India cities named directly by
// Rushil. No fabricated local stats or client claims in any intro below —
// general, honest context about each market, nothing invented.
export type Location = {
  slug: string;
  city: string;
  region: string;
  country: string;
  intro: string;
};

export const LOCATIONS: Location[] = [
  {
    slug: "dallas",
    city: "Dallas",
    region: "Texas",
    country: "USA",
    intro:
      "Dallas-Fort Worth is one of the fastest-growing metro areas in the US — which also makes it one of the most competitive. Service businesses here compete for the same searches and the same AI recommendations as dozens of nearby providers.",
  },
  {
    slug: "atlanta",
    city: "Atlanta",
    region: "Georgia",
    country: "USA",
    intro:
      "Atlanta's business footprint spans a huge metro area, from downtown to the suburbs. A business that's easy to find in one part of the metro can be invisible a few miles away, on both Google and AI search.",
  },
  {
    slug: "houston",
    city: "Houston",
    region: "Texas",
    country: "USA",
    intro:
      "Houston is sprawling and diverse — one of the largest metro economies in the US. Standing out here means being findable across a genuinely wide area, not just a single neighborhood search.",
  },
  {
    slug: "miami",
    city: "Miami",
    region: "Florida",
    country: "USA",
    intro:
      "Miami's market moves fast and skews heavily mobile and international. A business that isn't visible to AI tools and mobile search is invisible to a large share of the people actually looking.",
  },
  {
    slug: "phoenix",
    city: "Phoenix",
    region: "Arizona",
    country: "USA",
    intro:
      "Phoenix is one of the fastest-growing cities in the US, with new service businesses opening constantly. Visibility here isn't static — falling behind for even a few months matters.",
  },
  {
    slug: "raipur",
    city: "Raipur",
    region: "Chhattisgarh",
    country: "India",
    intro:
      "Raipur's business landscape is growing quickly, and most SEO or GEO agencies simply aren't paying attention to it yet — which is exactly why it's worth getting ahead on AI and search visibility now, while competitors aren't.",
  },
  {
    slug: "jaipur",
    city: "Jaipur",
    region: "Rajasthan",
    country: "India",
    intro:
      "Jaipur draws both a local customer base and a large tourism-driven audience — meaning visibility matters not just to nearby customers, but to people searching from somewhere else entirely, often through AI travel and recommendation tools.",
  },
];

export const OTHER_AREAS = {
  slug: "other-areas",
  intro:
    "If your city isn't listed here, that doesn't mean we don't work there. The same AI visibility, SEO, and accessibility work applies anywhere — another Indian city, another US metro, or anywhere else in the world.",
};
