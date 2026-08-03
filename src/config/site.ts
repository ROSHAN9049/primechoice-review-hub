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

/**
 * Digistore24 affiliate configuration.
 * Replace AFFILIATE_ID with your real Digistore24 ID once approved.
 */
export const affiliateConfig = {
  network: "Digistore24",
  affiliateId: "YOUR_DIGISTORE24_ID",
  /** Base vendor URL pattern. {productId} and {affiliateId} are replaced. */
  linkTemplate: "https://www.digistore24.com/redir/{productId}/{affiliateId}/",
  /** Fallback used when a product has no configured productId yet. */
  placeholderUrl: "https://www.digistore24.com/",
  disclosure:
    "We may earn a commission if you buy through links on this page — at no extra cost to you.",
} as const;

export function buildAffiliateUrl(productId?: string): string {
  if (!productId) return affiliateConfig.placeholderUrl;
  return affiliateConfig.linkTemplate
    .replace("{productId}", productId)
    .replace("{affiliateId}", affiliateConfig.affiliateId);
}