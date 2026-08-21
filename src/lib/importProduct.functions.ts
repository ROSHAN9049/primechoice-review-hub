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
  if (host === "link.amazon") return "Amazon";
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

function extractAmazonAsin(rawUrl: string) {
  try {
    const parsed = new URL(rawUrl);
    const match = parsed.pathname.match(/(?:\/dp\/|\/gp\/product\/|\/product\/|\/ASIN\/)([A-Z0-9]{10})(?:[/?]|$)/i);
    if (match?.[1]) return match[1].toUpperCase();
    if (parsed.hostname.replace(/^www\./, "") === "link.amazon") {
      const short = parsed.pathname.split("/").filter(Boolean)[0];
      if (short && /^[A-Z0-9]{10}$/i.test(short)) return short.toUpperCase();
    }
  } catch { /* invalid URL handled by caller */ }
  return "";
}

function amazonCandidates(rawUrl: string, asin: string) {
  const original = rawUrl.trim();
  const host = (() => { try { return new URL(original).hostname.replace(/^www\./, "").toLowerCase(); } catch { return ""; } })();
  if (!asin) return [original];
  if (host === "amazon.in" || host === "link.amazon") return [original, `https://www.amazon.in/dp/${asin}`];
  if (host === "amazon.com") return [original, `https://www.amazon.com/dp/${asin}`];
  return [original, `https://www.amazon.in/dp/${asin}`, `https://www.amazon.com/dp/${asin}`];
}

export const importProductFromUrl = createServerFn({ method: "POST" })
  .inputValidator((value: { url: string }) => value)
  .handler(async ({ data }): Promise<ImportedProduct> => {
    let parsed: URL;
    try { parsed = new URL(data.url.trim()); if (!["http:", "https:"].includes(parsed.protocol)) throw new Error("Only HTTP/HTTPS URLs are supported."); }
    catch { throw new Error("Please enter a valid affiliate URL."); }

    const asin = extractAmazonAsin(parsed.toString());
    const isAmazon = networkFromUrl(parsed.toString()).startsWith("Amazon");
    const base: ImportedProduct = {
      sourceUrl: parsed.toString(), network: isAmazon ? (parsed.hostname.includes(".in") ? "Amazon India" : "Amazon US") : networkFromUrl(parsed.toString()),
      title: asin ? `Amazon Product ${asin}` : "", description: "", image: "", price: "", rating: "", category: isAmazon ? "Amazon Products" : "", features: [],
      seoTitle: "", seoDescription: "", slug: asin ? slugify(`amazon-product-${asin}`) : "new-product",
    };

    // Amazon's image CDN can often serve a product image even when the product page blocks automated HTML access.
    if (asin && isAmazon) base.image = `https://images-na.ssl-images-amazon.com/images/P/${asin}.01.LZZZZZZZ.jpg`;

    let lastError = "";
    for (const candidate of amazonCandidates(parsed.toString(), asin)) {
      try {
        const response = await fetch(candidate, {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
            "Accept-Language": "en-IN,en;q=0.9",
          }, redirect: "follow", signal: AbortSignal.timeout(10000)
        });
        if (!response.ok) throw new Error(`Source returned HTTP ${response.status}`);
        const contentType = response.headers.get("content-type") ?? "";
        if (!contentType.includes("text/html")) throw new Error("The URL did not return an HTML product page.");
        const html = await response.text();
        const product = getJsonLdProduct(html);
        const title = clean(product?.name) || getMeta(html, "og:title") || getMeta(html, "twitter:title") || clean(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]);
        const description = clean(product?.description) || getMeta(html, "og:description") || getMeta(html, "description");
        const image = typeof product?.image === "string" ? product.image : Array.isArray(product?.image) ? product.image[0] : getMeta(html, "og:image");
        const offer = Array.isArray(product?.offers) ? product.offers[0] : product?.offers;
        base.title = decode(title) || base.title;
        base.description = decode(description);
        base.image = clean(image) || base.image;
        base.price = clean(offer?.price) || getMeta(html, "product:price:amount");
        base.rating = clean(product?.aggregateRating?.ratingValue) || getMeta(html, "rating");
        base.category = clean(product?.category) || base.category;
        base.features = Array.isArray(product?.additionalProperty) ? product.additionalProperty.map((x: { name?: string; value?: string }) => `${clean(x.name)}: ${clean(x.value)}`).filter(Boolean).slice(0, 12) : [];
        base.seoTitle = base.title ? `${base.title} Review & Buying Guide | PrimeChoiceReviews` : "Product Review & Buying Guide | PrimeChoiceReviews";
        base.seoDescription = (base.description || `Explore this ${base.title} product with PrimeChoiceReviews.`).slice(0, 155);
        base.slug = slugify(base.title);
        base.note = asin ? `Amazon product detected (ASIN ${asin}). Product metadata was imported when publicly available. Verify price, claims and affiliate terms before publishing.` : "Metadata imported from publicly available page metadata. Verify price, claims and affiliate terms before publishing.";
        return base;
      } catch (error) {
        lastError = error instanceof Error ? error.message : "source blocked or unavailable";
      }
    }

    base.seoTitle = base.title ? `${base.title} Review & Buying Guide | PrimeChoiceReviews` : "Product Review & Buying Guide | PrimeChoiceReviews";
    base.seoDescription = `Amazon product ${asin || "listing"} — review and buying guide from PrimeChoiceReviews.`.slice(0, 155);
    base.note = asin
      ? `Amazon detected (ASIN ${asin}). The marketplace blocked automated product-page metadata (${lastError || "source unavailable"}), so the affiliate URL and ASIN-based image fallback were preserved. You can edit the fields and save the product now; official Amazon API can provide complete data later.`
      : `Automatic metadata fetch unavailable (${lastError || "source blocked or unavailable"}). The affiliate URL is preserved; complete the fields manually.`;
    return base;
  });
