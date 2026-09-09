// Real target markets only. US and India cities chosen by actual business
// relevance (major metros / where Rushil already targets or plans to), not
// literal political capitals — a state capital isn't always where the
// business activity actually is (e.g. Sacramento vs. Los Angeles). No
// fabricated local stats or client claims in any intro below — general,
// honest context about each market, nothing invented.
export type Location = {
  slug: string;
  city: string;
  region: string;
  country: string;
  intro: string;
};

export const LOCATIONS: Location[] = [
  // --- US: original Tier 1 outreach markets (see ABOUT-RUSHIL.md) ---
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
  // --- US: additional major metros ---
  {
    slug: "new-york",
    city: "New York",
    region: "New York",
    country: "USA",
    intro:
      "New York is one of the most competitive markets in the country — nearly every category is crowded, and AI tools have no shortage of alternatives to recommend instead of you.",
  },
  {
    slug: "los-angeles",
    city: "Los Angeles",
    region: "California",
    country: "USA",
    intro:
      "Los Angeles spans a huge, fragmented metro area. A business that ranks well in one neighborhood search can be genuinely invisible a few miles away.",
  },
  {
    slug: "chicago",
    city: "Chicago",
    region: "Illinois",
    country: "USA",
    intro:
      "Chicago's business community is dense and well established. Standing out against decades-old competitors takes more than just having a website that technically exists.",
  },
  {
    slug: "austin",
    city: "Austin",
    region: "Texas",
    country: "USA",
    intro:
      "Austin's rapid growth has brought a wave of new service businesses competing for the same searches — and increasingly, the same AI recommendations.",
  },
  {
    slug: "san-francisco",
    city: "San Francisco",
    region: "California",
    country: "USA",
    intro:
      "San Francisco's audience is unusually tech-forward — people here are more likely than most to ask an AI tool for a recommendation instead of searching Google first.",
  },
  {
    slug: "seattle",
    city: "Seattle",
    region: "Washington",
    country: "USA",
    intro:
      "Seattle rewards businesses that show up clearly online — it's a research-heavy audience that checks multiple sources before choosing a provider.",
  },
  {
    slug: "denver",
    city: "Denver",
    region: "Colorado",
    country: "USA",
    intro:
      "Denver has seen rapid business growth in recent years. Visibility here isn't guaranteed just because you've been around longer than a newer competitor.",
  },
  {
    slug: "washington-dc",
    city: "Washington",
    region: "D.C.",
    country: "USA",
    intro:
      "Washington D.C.'s market is unusually professional-services heavy — legal, consulting, healthcare — where trust signals and clear online visibility matter even more than usual.",
  },
  {
    slug: "boston",
    city: "Boston",
    region: "Massachusetts",
    country: "USA",
    intro:
      "Boston's market is education- and healthcare-heavy, with a well-informed audience that tends to do real research before choosing a provider.",
  },
  {
    slug: "charlotte",
    city: "Charlotte",
    region: "North Carolina",
    country: "USA",
    intro:
      "Charlotte is one of the fastest-growing metro areas in the Southeast, with new competitors entering the market regularly.",
  },
  // --- India: original ---
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
  // --- India: additional major metros ---
  {
    slug: "mumbai",
    city: "Mumbai",
    region: "Maharashtra",
    country: "India",
    intro:
      "Mumbai is India's largest and most competitive business market. Visibility here means competing with a genuinely huge number of alternatives, on both Google and AI.",
  },
  {
    slug: "bangalore",
    city: "Bangalore",
    region: "Karnataka",
    country: "India",
    intro:
      "Bangalore's audience skews tech-savvy and increasingly turns to AI tools first. A business invisible to ChatGPT or Gemini here is missing a real and growing channel.",
  },
  {
    slug: "delhi",
    city: "Delhi",
    region: "NCR",
    country: "India",
    intro:
      "Delhi NCR is one of the largest and most fragmented metro markets in India — being findable in one part of the region doesn't mean you're findable everywhere in it.",
  },
  {
    slug: "chennai",
    city: "Chennai",
    region: "Tamil Nadu",
    country: "India",
    intro:
      "Chennai's business community values trust and established reputation — but that reputation has to actually be visible online and to AI tools to matter to a customer searching today.",
  },
  {
    slug: "kolkata",
    city: "Kolkata",
    region: "West Bengal",
    country: "India",
    intro:
      "Kolkata is a major market that most SEO and GEO agencies overlook — a real opportunity to get ahead while competitors aren't paying attention.",
  },
  {
    slug: "hyderabad",
    city: "Hyderabad",
    region: "Telangana",
    country: "India",
    intro:
      "Hyderabad's tech and business sector is growing fast, and visibility here increasingly means AI visibility, not just a Google listing.",
  },
  {
    slug: "pune",
    city: "Pune",
    region: "Maharashtra",
    country: "India",
    intro:
      "Pune is a serious market in its own right — one where visibility can't be assumed just because a business is well known locally.",
  },
];

export const OTHER_AREAS = {
  slug: "other-areas",
  intro:
    "If your city isn't listed here, that doesn't mean we don't work there. The same AI visibility, SEO, and accessibility work applies anywhere — another Indian city, another US metro, or anywhere else in the world.",
};
