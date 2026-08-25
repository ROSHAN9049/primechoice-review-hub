export const DIGISTORE24_AFFILIATE_ID = "ROSHANpratibha";

/** Build a direct Digistore24 affiliate redirect for a product/order-form ID. */
export function digistore24AffiliateUrl(productId: string | number): string {
  return `https://www.digistore24.com/redir/${productId}/${DIGISTORE24_AFFILIATE_ID}/`;
}
