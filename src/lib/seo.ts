import type { Metadata } from "next";

const SITE = "https://ruvisibility.com";

/**
 * Every page's metadata export set its own title/description but never its
 * own openGraph/twitter block, so Next.js metadata merging left every route
 * showing the root layout's static Organization title and description in
 * link previews — Slack, WhatsApp, iMessage, Twitter, LinkedIn all read from
 * openGraph, not from <title>. A link to /faq shared anywhere showed "Ru
 * Visibility — We Make Your Business Visible", never "FAQ — SEO, GEO & AI
 * Visibility Questions". This wraps every page's title/description into the
 * social tags too, so what gets shared matches what the page actually is.
 */
export function pageMetadata({
  path,
  title,
  description,
  type = "website",
}: {
  path: string;
  title: string;
  description: string;
  type?: "website" | "article";
}): Metadata {
  return {
    alternates: { canonical: path },
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE}${path}`,
      siteName: "Ru Visibility",
      images: ["/opengraph-image.png"],
      locale: "en_US",
      type,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image.png"],
    },
  };
}
