import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SiteNavbar from "@/components/site-navbar";
import SiteFooter from "@/components/site-footer";
import { LOCATIONS } from "@/lib/locations";
import "./globals.css";

// Only confirmed facts — no address/founding date, those don't exist yet.
// areaServed reflects Rushil's actual real target markets (see
// ABOUT-RUSHIL.md for the US cities, confirmed directly for India).
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Ru Visibility",
  url: "https://ruvisibility.com",
  email: "rushil@ruvisibility.com",
  telephone: "+91-7222999365",
  logo: "https://ruvisibility.com/logo-mark.png",
  areaServed: [
    ...LOCATIONS.map((l) => ({
      "@type": "City",
      name: l.city,
      containedInPlace: l.country,
    })),
    { "@type": "Country", name: "International" },
  ],
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ruvisibility.com"),
  title: "Ru Visibility — We Make Your Business Visible",
  description:
    "Ongoing SEO and GEO management, content, website design, and maintenance — so ChatGPT, Gemini, and Google can all find and recommend your business.",
  keywords: [
    "SEO agency",
    "GEO agency",
    "AI visibility",
    "generative engine optimization",
    "SEO Dallas",
    "SEO Atlanta",
    "SEO Houston",
    "SEO Miami",
    "SEO Phoenix",
    "SEO Raipur",
    "SEO Jaipur",
    "AI search visibility",
    "AI automation for business",
    "AI integration for business",
    "AI website builder",
    "business process automation",
    "AI chatbot for business",
  ],
  openGraph: {
    title: "Ru Visibility — We Make Your Business Visible",
    description:
      "Ongoing SEO and GEO management so ChatGPT, Gemini, and Google can all find and recommend your business.",
    url: "https://ruvisibility.com",
    siteName: "Ru Visibility",
    images: ["/opengraph-image.png"],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ru Visibility — We Make Your Business Visible",
    description:
      "Ongoing SEO and GEO management so ChatGPT, Gemini, and Google can all find and recommend your business.",
    images: ["/opengraph-image.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <SiteNavbar />
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
