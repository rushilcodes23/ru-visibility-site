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
  /** What this local economy actually runs on. Widely documented facts only. */
  sectors: string;
  /** A different argument per city, so no two pages make the same case. */
  angle: string;
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
    sectors:
      "Dallas-Fort Worth runs on corporate relocations, logistics, finance and a large construction and home-services trade.",
    angle:
      "Because the metroplex is really two cities that grew into each other, someone searching from Fort Worth often gets a different set of results than someone in Plano. If you only rank in one half, you are invisible to the other.",
  },
  {
    slug: "atlanta",
    city: "Atlanta",
    region: "Georgia",
    country: "USA",
    intro:
      "Atlanta's business footprint spans a huge metro area, from downtown to the suburbs. A business that's easy to find in one part of the metro can be invisible a few miles away, on both Google and AI search.",
    sectors:
      "Atlanta is a logistics and film hub with a heavy concentration of healthcare, fintech and professional services.",
    angle:
      "The metro sprawls across dozens of named suburbs, and people search by suburb rather than by city. A business optimised only for “Atlanta” misses the way its own customers actually type.",
  },
  {
    slug: "houston",
    city: "Houston",
    region: "Texas",
    country: "USA",
    intro:
      "Houston is sprawling and diverse — one of the largest metro economies in the US. Standing out here means being findable across a genuinely wide area, not just a single neighborhood search.",
    sectors:
      "Houston's economy leans on energy, petrochemicals, shipping and one of the largest medical complexes in the world.",
    angle:
      "Houston has no zoning in the conventional sense, so commercial and residential areas interleave. Service-area targeting matters more here than a pin on a map, because the neighbourhood boundary a customer has in their head rarely matches an official one.",
  },
  {
    slug: "miami",
    city: "Miami",
    region: "Florida",
    country: "USA",
    intro:
      "Miami's market moves fast and skews heavily mobile and international. A business that isn't visible to AI tools and mobile search is invisible to a large share of the people actually looking.",
    sectors:
      "Miami is a gateway for Latin American trade, tourism, real estate and a growing tech and crypto scene.",
    angle:
      "A large share of searches here happen in Spanish, and AI tools answer in whichever language the question was asked. A site that exists only in English is invisible to half the question phrasings in its own city.",
  },
  {
    slug: "phoenix",
    city: "Phoenix",
    region: "Arizona",
    country: "USA",
    intro:
      "Phoenix is one of the fastest-growing cities in the US, with new service businesses opening constantly. Visibility here isn't static — falling behind for even a few months matters.",
    sectors:
      "Phoenix has a fast-growing base of semiconductor manufacturing, healthcare, construction and home services.",
    angle:
      "The valley added residents faster than most metros in the country, which means a lot of your potential customers are new here and have no existing supplier. They ask a search engine or an AI tool, and whoever it names first wins the relationship.",
  },
  // --- US: additional major metros ---
  {
    slug: "new-york",
    city: "New York",
    region: "New York",
    country: "USA",
    intro:
      "New York is one of the most competitive markets in the country — nearly every category is crowded, and AI tools have no shortage of alternatives to recommend instead of you.",
    sectors:
      "New York concentrates finance, media, fashion, law and an enormous independent service economy into five boroughs.",
    angle:
      "Competition is dense enough that ranking city-wide is unrealistic for most businesses. Borough and neighbourhood-level visibility is the achievable goal, and it is usually the more valuable one anyway.",
  },
  {
    slug: "los-angeles",
    city: "Los Angeles",
    region: "California",
    country: "USA",
    intro:
      "Los Angeles spans a huge, fragmented metro area. A business that ranks well in one neighborhood search can be genuinely invisible a few miles away.",
    sectors:
      "Los Angeles is built on entertainment, aerospace, international trade through its ports, and a vast small-business economy.",
    angle:
      "LA is geographically enormous and traffic makes distance feel longer than it is. People filter hard by proximity, so being the right answer in your part of the county beats being a weak answer across all of it.",
  },
  {
    slug: "chicago",
    city: "Chicago",
    region: "Illinois",
    country: "USA",
    intro:
      "Chicago's business community is dense and well established. Standing out against decades-old competitors takes more than just having a website that technically exists.",
    sectors:
      "Chicago's base is manufacturing, transport and logistics, futures trading, healthcare and professional services.",
    angle:
      "The city is unusually neighbourhood-conscious, and residents identify with a named neighbourhood before the city. Search behaviour follows that, and so should the way a site describes where it works.",
  },
  {
    slug: "austin",
    city: "Austin",
    region: "Texas",
    country: "USA",
    intro:
      "Austin's rapid growth has brought a wave of new service businesses competing for the same searches — and increasingly, the same AI recommendations.",
    sectors:
      "Austin is a technology and startup centre with a large creative, music and hospitality economy alongside it.",
    angle:
      "This is a market where customers are unusually likely to ask an AI assistant rather than open a search engine. Being absent from AI answers costs more here than it would in a less early-adopting city.",
  },
  {
    slug: "san-francisco",
    city: "San Francisco",
    region: "California",
    country: "USA",
    intro:
      "San Francisco's audience is unusually tech-forward — people here are more likely than most to ask an AI tool for a recommendation instead of searching Google first.",
    sectors:
      "San Francisco and the wider Bay Area are dominated by technology, venture capital, biotech and professional services.",
    angle:
      "Buyers here check more than one source before deciding, and increasingly one of those sources is an AI tool summarising your site back to them. If your own pages are vague, the summary is vague, and vague loses.",
  },
  {
    slug: "seattle",
    city: "Seattle",
    region: "Washington",
    country: "USA",
    intro:
      "Seattle rewards businesses that show up clearly online — it's a research-heavy audience that checks multiple sources before choosing a provider.",
    sectors:
      "Seattle combines cloud and software with aerospace, shipping, coffee and a substantial maritime trade.",
    angle:
      "The region is split by water and bridges, so travel time shapes buying decisions more than raw distance. Making your actual service area explicit matters more here than in a city laid out on a grid.",
  },
  {
    slug: "denver",
    city: "Denver",
    region: "Colorado",
    country: "USA",
    intro:
      "Denver has seen rapid business growth in recent years. Visibility here isn't guaranteed just because you've been around longer than a newer competitor.",
    sectors:
      "Denver's economy spans aerospace, energy, outdoor recreation brands, healthcare and a growing tech sector.",
    angle:
      "Denver serves as the commercial hub for a large, thinly populated region, so the catchment for many businesses extends far past the metro. Pages written only for the city undersell how far the service really reaches.",
  },
  {
    slug: "washington-dc",
    city: "Washington",
    region: "D.C.",
    country: "USA",
    intro:
      "Washington D.C.'s market is unusually professional-services heavy — legal, consulting, healthcare — where trust signals and clear online visibility matter even more than usual.",
    sectors:
      "Washington D.C. runs on government, contracting, law, policy institutions and international organisations.",
    angle:
      "A large share of buyers here are procurement-driven and research thoroughly before making contact. Credibility signals on your own site carry unusual weight, because they are what gets quoted back in an internal recommendation.",
  },
  {
    slug: "boston",
    city: "Boston",
    region: "Massachusetts",
    country: "USA",
    intro:
      "Boston's market is education- and healthcare-heavy, with a well-informed audience that tends to do real research before choosing a provider.",
    sectors:
      "Boston is anchored by universities, hospitals, biotech, robotics and financial services.",
    angle:
      "The population turns over every academic year, which means a steady supply of people with no established supplier and no local word-of-mouth. They ask the internet, and the answer they get is whatever is most findable.",
  },
  {
    slug: "charlotte",
    city: "Charlotte",
    region: "North Carolina",
    country: "USA",
    intro:
      "Charlotte is one of the fastest-growing metro areas in the Southeast, with new competitors entering the market regularly.",
    sectors:
      "Charlotte is a major banking centre with growing energy, healthcare and motorsport-adjacent manufacturing.",
    angle:
      "The city is growing quickly and absorbing surrounding towns, so the name a customer uses for their own area is often out of date relative to official boundaries. Covering the language people actually use beats covering the map.",
  },
  // --- India: original ---
  {
    slug: "raipur",
    city: "Raipur",
    region: "Chhattisgarh",
    country: "India",
    intro:
      "Raipur's business landscape is growing quickly, and most SEO or GEO agencies simply aren't paying attention to it yet — which is exactly why it's worth getting ahead on AI and search visibility now, while competitors aren't.",
    sectors:
      "Raipur is a steel, power and mining centre and the commercial hub of Chhattisgarh.",
    angle:
      "Local digital competition here is genuinely thinner than in the metros, which is an opportunity rather than a reason to skip the work. Being the one business in your category with a properly built site is a bigger advantage in Raipur than it would be in Mumbai.",
  },
  {
    slug: "jaipur",
    city: "Jaipur",
    region: "Rajasthan",
    country: "India",
    intro:
      "Jaipur draws both a local customer base and a large tourism-driven audience — meaning visibility matters not just to nearby customers, but to people searching from somewhere else entirely, often through AI travel and recommendation tools.",
    sectors:
      "Jaipur's economy mixes tourism, handicrafts and gems, education and a growing IT services base.",
    angle:
      "A lot of demand here starts outside the city entirely, with someone planning a visit or sourcing from another state. That makes visibility in general search and AI answers matter as much as strictly local ranking.",
  },
  // --- India: additional major metros ---
  {
    slug: "mumbai",
    city: "Mumbai",
    region: "Maharashtra",
    country: "India",
    intro:
      "Mumbai is India's largest and most competitive business market. Visibility here means competing with a genuinely huge number of alternatives, on both Google and AI.",
    sectors:
      "Mumbai is India's financial capital, with banking, entertainment, shipping and a huge professional services layer.",
    angle:
      "Competition is the heaviest in the country and generic terms are effectively unwinnable for most businesses. The realistic route is specificity: the exact service, the exact area, the exact question a customer would ask.",
  },
  {
    slug: "bangalore",
    city: "Bangalore",
    region: "Karnataka",
    country: "India",
    intro:
      "Bangalore's audience skews tech-savvy and increasingly turns to AI tools first. A business invisible to ChatGPT or Gemini here is missing a real and growing channel.",
    sectors:
      "Bangalore is India's technology centre, with software, aerospace, biotech and a dense startup ecosystem.",
    angle:
      "Customers here are more likely than anywhere else in India to evaluate you through an AI tool first. If ChatGPT or Gemini cannot describe what you do, a technically literate buyer takes that as a signal in itself.",
  },
  {
    slug: "delhi",
    city: "Delhi",
    region: "NCR",
    country: "India",
    intro:
      "Delhi NCR is one of the largest and most fragmented metro markets in India — being findable in one part of the region doesn't mean you're findable everywhere in it.",
    sectors:
      "Delhi NCR spans government, manufacturing, retail and a large corporate presence across Gurugram and Noida.",
    angle:
      "NCR is several cities administratively but one market in practice, and customers move between them without thinking about boundaries. A site built around a single municipal name misses most of its own catchment.",
  },
  {
    slug: "chennai",
    city: "Chennai",
    region: "Tamil Nadu",
    country: "India",
    intro:
      "Chennai's business community values trust and established reputation — but that reputation has to actually be visible online and to AI tools to matter to a customer searching today.",
    sectors:
      "Chennai is a manufacturing and automotive centre with strong healthcare, IT services and port trade.",
    angle:
      "A significant share of searching happens in Tamil or in Tamil-English mixes, and AI tools answer in the language they were asked in. Content that exists only in formal English is not reachable by a large part of the local audience.",
  },
  {
    slug: "kolkata",
    city: "Kolkata",
    region: "West Bengal",
    country: "India",
    intro:
      "Kolkata is a major market that most SEO and GEO agencies overlook — a real opportunity to get ahead while competitors aren't paying attention.",
    sectors:
      "Kolkata's economy covers trade, engineering, education, publishing and a substantial small-manufacturing base.",
    angle:
      "Many established businesses here have decades of offline reputation and almost no digital footprint, so search results often do not reflect who is actually the strongest provider. Closing that gap is usually the fastest win available.",
  },
  {
    slug: "hyderabad",
    city: "Hyderabad",
    region: "Telangana",
    country: "India",
    intro:
      "Hyderabad's tech and business sector is growing fast, and visibility here increasingly means AI visibility, not just a Google listing.",
    sectors:
      "Hyderabad hosts pharmaceuticals, biotech and a large technology corridor alongside its traditional trades.",
    angle:
      "Growth around the tech corridor has pulled in people from across the country who have no local network to ask. For them the search result and the AI answer are the recommendation, with nothing else to weigh it against.",
  },
  {
    slug: "pune",
    city: "Pune",
    region: "Maharashtra",
    country: "India",
    intro:
      "Pune is a serious market in its own right — one where visibility can't be assumed just because a business is well known locally.",
    sectors:
      "Pune combines automotive and engineering manufacturing with IT services and a large student population.",
    angle:
      "The city runs on two different clocks: an established industrial base and a fast-moving services economy. The two search very differently, and a site usually has to speak to whichever one it actually sells to rather than splitting the difference.",
  },
];

export const OTHER_AREAS = {
  slug: "other-areas",
  intro:
    "If your city isn't listed here, that doesn't mean we don't work there. The same AI visibility, SEO, and accessibility work applies anywhere — another Indian city, another US metro, or anywhere else in the world.",
};
