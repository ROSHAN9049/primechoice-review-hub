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
  linkTemplate: "https://www.digistore24.com/redir/{productId}/{affiliateId}/",
  placeholderUrl: "https://www.digistore24.com/",
  disclosure:
    "We may earn a commission if you buy through links on this page — at no extra cost to you.",
} as const;

export function buildAffiliateUrl(productId?: string): string {
  if (!productId) return affiliateConfig.placeholderUrl;
  return affiliateConfig.linkTemplate
    .replace("{productId}", encodeURIComponent(productId))
    .replace("{affiliateId}", encodeURIComponent(affiliateConfig.affiliateId));
}
