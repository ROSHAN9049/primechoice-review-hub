/**
 * Central site + affiliate configuration.
 * Change affiliate IDs and links here — nowhere else.
 */
export const siteConfig = {
  name: "PrimeChoiceReviews",
  tagline: "Honest Reviews. Smarter Choices.",
  description:
    "Independent, data-driven product reviews and buying guides across health, AI tools, software, finance and more.",
  email: "hello@primechoicereviews.com",
  social: {
    twitter: "https://twitter.com/",
    facebook: "https://facebook.com/",
    youtube: "https://youtube.com/",
    linkedin: "https://linkedin.com/",
  },
} as const;

export const affiliateConfig = {
  network: "Digistore24",
  affiliateId: "ROSHANpratibha",
  campaignKey: "site",
  linkTemplate: "https://www.checkout-ds24.com/redir/{productId}/{affiliateId}/{campaignKey}",
  placeholderUrl: "https://www.digistore24.com/",
  disclosure:
    "We may earn a commission if you buy through links on this page — at no extra cost to you.",
} as const;

export const amazonAffiliateConfig = {
  india: {
    marketplace: "amazon.in",
    associateTag: "rehanroshan08-21",
  },
  us: {
    marketplace: "amazon.com",
    associateTag: "rehanroshan90-20",
  },
} as const;

export type AmazonMarketplace = keyof typeof amazonAffiliateConfig;

export function getAmazonMarketplace(url: string): AmazonMarketplace | null {
  try {
    const hostname = new URL(url).hostname.toLowerCase().replace(/^www\./, "");
    if (hostname === "amazon.in" || hostname.endsWith(".amazon.in")) return "india";
    if (hostname === "amazon.com" || hostname.endsWith(".amazon.com")) return "us";
    return null;
  } catch {
    return null;
  }
}

/** Adds the correct Amazon Associates tag to Amazon.in/Amazon.com URLs. */
export function buildAmazonAffiliateUrl(url: string): string {
  const marketplace = getAmazonMarketplace(url);
  if (!marketplace) return url;

  try {
    const parsed = new URL(url);
    parsed.searchParams.set("tag", amazonAffiliateConfig[marketplace].associateTag);
    return parsed.toString();
  } catch {
    return url;
  }
}

export function buildAffiliateUrl(productId?: string, campaignKey = affiliateConfig.campaignKey): string {
  if (!productId) return affiliateConfig.placeholderUrl;
  return affiliateConfig.linkTemplate
    .replace("{productId}", encodeURIComponent(productId))
    .replace("{affiliateId}", encodeURIComponent(affiliateConfig.affiliateId))
    .replace("{campaignKey}", encodeURIComponent(campaignKey));
}
