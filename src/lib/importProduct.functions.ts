import { createServerFn } from "@tanstack/react-start";

export type ImportedProduct = {
  sourceUrl: string; network: string; title: string; description: string; image: string;
  price: string; rating: string; category: string; features: string[]; seoTitle: string;
  seoDescription: string; slug: string; note?: string;
};

function networkFromUrl(rawUrl: string) {
  const host = new URL(rawUrl).hostname.toLowerCase().replace(/^www\./, "");
  if (host === "amazon.in") return "Amazon India";
  if (host === "amazon.com") return "Amazon US";
  if (host.endsWith("digistore24.com")) return "Digistore24";
  return host;
}
function clean(value: unknown) { return typeof value === "string" ? value.replace(/\s+/g, " ").trim() : ""; }
function decode(value: string) { return value.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">"); }
function getMeta(html: string, property: string) {
  const escaped = property.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const patterns = [
    new RegExp(`<meta[^>]+property=["']${escaped}["'][^>]+content=["']([^"']*)["'][^>]*>`, "i"),
    new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+property=["']${escaped}["'][^>]*>`, "i"),
    new RegExp(`<meta[^>]+name=["']${escaped}["'][^>]+content=["']([^"']*)["'][^>]*>`, "i"),
  ];
  for (const pattern of patterns) { const match = html.match(pattern); if (match?.[1]) return decode(clean(match[1])); }
  return "";
}
function getJsonLdProduct(html: string) {
  const scripts = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  for (const match of scripts) {
    try {
      const parsed = JSON.parse(match[1]);
      const candidates = Array.isArray(parsed) ? parsed : [parsed, ...(Array.isArray(parsed?.["@graph"]) ? parsed["@graph"] : [])];
      const product = candidates.find((item) => item && (item["@type"] === "Product" || (Array.isArray(item["@type"]) && item["@type"].includes("Product"))));
      if (product) return product;
    } catch { /* fall back to standard meta tags */ }
  }
  return null;
}
function slugify(value: string) { return value.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 90) || "new-product"; }

export const importProductFromUrl = createServerFn({ method: "POST" })
  .inputValidator((value: { url: string }) => value)
  .handler(async ({ data }): Promise<ImportedProduct> => {
    let parsed: URL;
    try { parsed = new URL(data.url.trim()); if (!["http:", "https:"].includes(parsed.protocol)) throw new Error("Only HTTP/HTTPS URLs are supported."); }
    catch { throw new Error("Please enter a valid affiliate URL."); }

    const base: ImportedProduct = {
      sourceUrl: parsed.toString(), network: networkFromUrl(parsed.toString()), title: "", description: "", image: "", price: "", rating: "", category: "", features: [], seoTitle: "", seoDescription: "", slug: "new-product",
    };
    try {
      const response = await fetch(parsed.toString(), { headers: { "User-Agent": "Mozilla/5.0 (compatible; PrimeChoiceReviews/1.0)" }, redirect: "follow", signal: AbortSignal.timeout(8000) });
      if (!response.ok) throw new Error(`Source returned HTTP ${response.status}`);
      const contentType = response.headers.get("content-type") ?? "";
      if (!contentType.includes("text/html")) throw new Error("The URL did not return an HTML product page.");
      const html = await response.text();
      const product = getJsonLdProduct(html);
      const title = clean(product?.name) || getMeta(html, "og:title") || getMeta(html, "twitter:title") || clean(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]);
      const description = clean(product?.description) || getMeta(html, "og:description") || getMeta(html, "description");
      const image = typeof product?.image === "string" ? product.image : Array.isArray(product?.image) ? product.image[0] : getMeta(html, "og:image");
      const offer = Array.isArray(product?.offers) ? product.offers[0] : product?.offers;
      base.title = decode(title); base.description = decode(description); base.image = clean(image); base.price = clean(offer?.price) || getMeta(html, "product:price:amount");
      base.rating = clean(product?.aggregateRating?.ratingValue) || getMeta(html, "rating"); base.category = clean(product?.category);
      base.features = Array.isArray(product?.additionalProperty) ? product.additionalProperty.map((x: { name?: string; value?: string }) => `${clean(x.name)}: ${clean(x.value)}`).filter(Boolean).slice(0, 12) : [];
      base.seoTitle = base.title ? `${base.title} Review & Buying Guide | PrimeChoiceReviews` : "Product Review & Buying Guide | PrimeChoiceReviews";
      base.seoDescription = base.description.slice(0, 155); base.slug = slugify(base.title);
      base.note = base.title ? "Metadata imported from publicly available page metadata. Verify price, claims and affiliate terms before publishing." : "The source page was reachable but did not expose standard product metadata. Fill the fields manually before publishing.";
    } catch (error) {
      base.seoTitle = "Product Review & Buying Guide | PrimeChoiceReviews"; base.seoDescription = "Independent product review and buying guide from PrimeChoiceReviews.";
      base.note = `Automatic metadata fetch unavailable (${error instanceof Error ? error.message : "source blocked or unavailable"}). The affiliate URL is preserved; complete the fields manually.`;
    }
    return base;
  });
