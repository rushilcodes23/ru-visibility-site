import type { MetadataRoute } from "next";

// Completes the icon set. Before this the site had only app/icon.png, so
// there was no apple-touch-icon and no manifest — an iOS home-screen save or
// an Android install prompt had nothing to work from and fell back to a
// screenshot of the page.
//
// Colours match the dark theme, which is now the site default, so the splash
// and address bar don't flash a light background before the page paints.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ru Visibility",
    short_name: "Ru Visibility",
    description:
      "Ongoing SEO and GEO management so AI tools and Google can find and recommend your business.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0e17",
    theme_color: "#0a0e17",
    icons: [
      { src: "/icon.png", sizes: "128x128", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
