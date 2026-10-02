import { getImageProps } from "next/image";
import { cn } from "cn";
import accessibilityLight from "@/assets/illustrations/accessibility-light.svg";
import accessibilityDark from "@/assets/illustrations/accessibility-dark.svg";
import aiIntegrationLight from "@/assets/illustrations/ai-integration-light.svg";
import aiIntegrationDark from "@/assets/illustrations/ai-integration-dark.svg";
import buildLight from "@/assets/illustrations/build-light.svg";
import buildDark from "@/assets/illustrations/build-dark.svg";
import completeLight from "@/assets/illustrations/complete-light.svg";
import completeDark from "@/assets/illustrations/complete-dark.svg";
import contentLight from "@/assets/illustrations/content-light.svg";
import contentDark from "@/assets/illustrations/content-dark.svg";
import customLight from "@/assets/illustrations/custom-light.svg";
import customDark from "@/assets/illustrations/custom-dark.svg";
import designLight from "@/assets/illustrations/design-light.svg";
import designDark from "@/assets/illustrations/design-dark.svg";
import essentialsLight from "@/assets/illustrations/essentials-light.svg";
import essentialsDark from "@/assets/illustrations/essentials-dark.svg";
import geoLight from "@/assets/illustrations/geo-light.svg";
import geoDark from "@/assets/illustrations/geo-dark.svg";
import localLight from "@/assets/illustrations/local-light.svg";
import localDark from "@/assets/illustrations/local-dark.svg";
import maintenanceLight from "@/assets/illustrations/maintenance-light.svg";
import maintenanceDark from "@/assets/illustrations/maintenance-dark.svg";
import marketingLight from "@/assets/illustrations/marketing-light.svg";
import marketingDark from "@/assets/illustrations/marketing-dark.svg";
import monetizationLight from "@/assets/illustrations/monetization-light.svg";
import monetizationDark from "@/assets/illustrations/monetization-dark.svg";
import reportingLight from "@/assets/illustrations/reporting-light.svg";
import reportingDark from "@/assets/illustrations/reporting-dark.svg";
import storeLight from "@/assets/illustrations/store-light.svg";
import storeDark from "@/assets/illustrations/store-dark.svg";
import technicalLight from "@/assets/illustrations/technical-light.svg";
import technicalDark from "@/assets/illustrations/technical-dark.svg";

// One drawing per service, in a light and a dark palette (generated together,
// so the two always match). Pictures of the kind of work only: no numbers,
// names or scores anywhere in them, so none can read as a result we claim.
const ART = {
  "accessibility": [accessibilityLight, accessibilityDark],
  "ai-integration": [aiIntegrationLight, aiIntegrationDark],
  "build": [buildLight, buildDark],
  "complete": [completeLight, completeDark],
  "content": [contentLight, contentDark],
  "custom": [customLight, customDark],
  "design": [designLight, designDark],
  "essentials": [essentialsLight, essentialsDark],
  "geo": [geoLight, geoDark],
  "local": [localLight, localDark],
  "maintenance": [maintenanceLight, maintenanceDark],
  "marketing": [marketingLight, marketingDark],
  "monetization": [monetizationLight, monetizationDark],
  "reporting": [reportingLight, reportingDark],
  "store": [storeLight, storeDark],
  "technical": [technicalLight, technicalDark],
} as const;

export type ArtName = keyof typeof ART;

/**
 * A service illustration that follows the site theme. Both versions are lazy
 * <img>s, and a lazy image hidden with display:none is never fetched, so each
 * visitor downloads only the one their theme shows (about 1.5 KB). Decorative:
 * the card heading beside it already says what it is, so alt is empty.
 *
 * getImageProps rather than <Image>: same server-rendered tag (lazy, async
 * decoding, width and height, hashed immutable URL), but <Image> is a client
 * component, so twenty of them on the homepage were twenty more things React
 * had to hydrate before the page settled. These are plain markup.
 */
export function ServiceArt({ name, className }: { name: ArtName; className?: string }) {
  const [light, dark] = ART[name];
  const { props: l } = getImageProps({ src: light, alt: "" });
  const { props: d } = getImageProps({ src: dark, alt: "" });
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element -- props come from getImageProps */}
      <img {...l} alt="" className={cn(className, "dark:hidden")} />
      {/* eslint-disable-next-line @next/next/no-img-element -- props come from getImageProps */}
      <img {...d} alt="" className={cn(className, "hidden dark:block")} />
    </>
  );
}
