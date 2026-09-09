import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SiteNavbar from "@/components/site-navbar";
import SiteFooter from "@/components/site-footer";
import "./globals.css";

// Only confirmed facts — no address/phone/founding date, none exist yet.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Ru Visibility",
  url: "https://ruvisibility.com",
  email: "rushil@ruvisibility.com",
  logo: "https://ruvisibility.com/logo-mark.png",
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
