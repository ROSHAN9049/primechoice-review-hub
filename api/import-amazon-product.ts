type RequestLike = { method?: string; body?: any };
type ResponseLike = { status: (code: number) => ResponseLike; json: (body: unknown) => void };

const TOKEN_ENDPOINTS: Record<string, string> = {
  "www.amazon.com": "https://api.amazon.com/auth/o2/token",
  "www.amazon.ca": "https://api.amazon.com/auth/o2/token",
  "www.amazon.com.mx": "https://api.amazon.com/auth/o2/token",
  "www.amazon.com.br": "https://api.amazon.com/auth/o2/token",
  "www.amazon.co.uk": "https://api.amazon.co.uk/auth/o2/token",
  "www.amazon.de": "https://api.amazon.co.uk/auth/o2/token",
  "www.amazon.fr": "https://api.amazon.co.uk/auth/o2/token",
  "www.amazon.it": "https://api.amazon.co.uk/auth/o2/token",
  "www.amazon.es": "https://api.amazon.co.uk/auth/o2/token",
  "www.amazon.nl": "https://api.amazon.co.uk/auth/o2/token",
  "www.amazon.in": "https://api.amazon.co.uk/auth/o2/token",
  "www.amazon.ie": "https://api.amazon.co.uk/auth/o2/token",
  "www.amazon.pl": "https://api.amazon.co.uk/auth/o2/token",
  "www.amazon.sa": "https://api.amazon.co.uk/auth/o2/token",
  "www.amazon.se": "https://api.amazon.co.uk/auth/o2/token",
  "www.amazon.tr": "https://api.amazon.co.uk/auth/o2/token",
  "www.amazon.ae": "https://api.amazon.co.uk/auth/o2/token",
  "www.amazon.co.jp": "https://api.amazon.co.jp/auth/o2/token",
  "www.amazon.sg": "https://api.amazon.co.jp/auth/o2/token",
  "www.amazon.com.au": "https://api.amazon.co.jp/auth/o2/token",
};

function extractAsin(input: string): string | null {
  try {
    const url = new URL(input);
    const host = url.hostname.toLowerCase();
    if (!TOKEN_ENDPOINTS[host]) return null;
    for (const pattern of [/\/dp\/([A-Z0-9]{10})(?:[/?]|$)/i, /\/gp\/product\/([A-Z0-9]{10})(?:[/?]|$)/i, /\/product\/([A-Z0-9]{10})(?:[/?]|$)/i]) {
      const match = url.pathname.match(pattern);
      if (match) return match[1].toUpperCase();
    }
    const asin = url.searchParams.get("asin");
    return asin && /^[A-Z0-9]{10}$/i.test(asin) ? asin.toUpperCase() : null;
  } catch { return null; }
}

const pick = (value: any): string | null => {
  if (value == null) return null;
  if (typeof value === "string" || typeof value === "number") return String(value);
  if (typeof value === "object" && value.displayValue != null) return String(value.displayValue);
  return null;
};
const unique = (values: unknown[]) => [...new Set(values.filter((v): v is string => typeof v === "string" && v.trim()).map((v) => v.trim()))];
const slug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 90) || `amazon-product-${Date.now()}`;

function category(title: string, nodes: unknown) {
  const text = `${title} ${JSON.stringify(nodes ?? "")}`.toLowerCase();
  const rules: Array<[RegExp, string]> = [[/health|supplement|vitamin|wellness|nutrition/, "Health"], [/fitness|exercise|gym|workout|sport/, "Fitness"], [/computer|laptop|electronic|headphone|camera|phone|tablet|gaming/, "Technology"], [/book|kindle|reading/, "Books"], [/finance|invest|trading/, "Finance"], [/beauty|skin|hair|makeup/, "Beauty"], [/home|kitchen|furniture|garden/, "Home"]];
  return rules.find(([regex]) => regex.test(text))?.[1] ?? "General";
}

async function token(marketplace: string) {
  const id = process.env.AMAZON_CREATORS_CLIENT_ID;
  const secret = process.env.AMAZON_CREATORS_CLIENT_SECRET;
  if (!id || !secret) throw new Error("Amazon Creators API credentials are not configured on Vercel.");
  const response = await fetch(TOKEN_ENDPOINTS[marketplace], { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ grant_type: "client_credentials", client_id: id, client_secret: secret, scope: "creatorsapi::default" }) });
  if (!response.ok) throw new Error(`Amazon authentication failed (${response.status}).`);
  const data = await response.json() as { access_token?: string };
  if (!data.access_token) throw new Error("Amazon did not return an access token.");
  return data.access_token;
}

function mapItem(item: any, affiliateUrl: string, marketplace: string, asin: string) {
  const title = pick(item?.itemInfo?.title) ?? "Amazon Product";
  const brand = pick(item?.itemInfo?.byLineInfo?.brand) ?? pick(item?.itemInfo?.manufactureInfo?.manufacturer);
  const features = Array.isArray(item?.itemInfo?.features) ? item.itemInfo.features.map(pick).filter(Boolean) : [];
  const images = unique([item?.images?.primary?.large?.url, item?.images?.primary?.medium?.url, item?.images?.primary?.small?.url, ...(item?.images?.variants ?? []).flatMap((v: any) => [v?.large?.url, v?.medium?.url, v?.small?.url])]);
  const offer = item?.offersV2?.listings?.[0] ?? item?.offers?.listings?.[0];
  const rawPrice = offer?.price?.amount ?? null;
  const price = rawPrice == null ? null : Number(rawPrice);
  const curr = offer?.price?.currency ?? (marketplace === "www.amazon.in" ? "INR" : "USD");
  const cat = category(title, item?.browseNodeInfo);
  const description = pick(item?.itemInfo?.productInfo?.description) ?? features.join(" ");
  return { title, slug: slug(title), category: cat, brand, status: "draft", rating: null, price, currency: curr, region: marketplace === "www.amazon.in" ? "in" : marketplace === "www.amazon.com" ? "us" : "global", description, images, affiliate_links: [{ network: "amazon", asin, marketplace, url: affiliateUrl, enabled: true }], specifications: [["ASIN", asin], ["Brand", brand], ["Marketplace", marketplace], ["Manufacturer", pick(item?.itemInfo?.manufactureInfo?.manufacturer)], ["Color", pick(item?.itemInfo?.productInfo?.color)], ["Size", pick(item?.itemInfo?.productInfo?.size)]].filter(([, v]) => v).map(([name, value]) => ({ name, value })), pros: unique(features.slice(0, 5)), cons: ["Check the current Amazon listing for availability, price and seller details."], seo: { title: `${title} Review & Details | Prime Choice Reviews`.slice(0, 60), description: `${title}${brand ? ` by ${brand}` : ""}. See key features, images, specifications and the latest Amazon offer.`.slice(0, 160), keywords: unique([title, brand ?? "", cat, "Amazon review"]).join(", ") } };
}

export default async function handler(req: RequestLike, res: ResponseLike) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  try {
    const affiliateUrl = String(req.body?.affiliateUrl ?? "").trim();
    const asin = extractAsin(affiliateUrl);
    if (!affiliateUrl) return res.status(400).json({ error: "Affiliate URL is required." });
    if (!asin) return res.status(400).json({ error: "Paste an Amazon product link containing an ASIN." });
    const marketplace = new URL(affiliateUrl).hostname.toLowerCase();
    const partnerTag = process.env.AMAZON_PARTNER_TAG;
    if (!partnerTag) return res.status(500).json({ error: "AMAZON_PARTNER_TAG is not configured on Vercel." });
    const accessToken = await token(marketplace);
    const response = await fetch("https://creatorsapi.amazon/catalog/v1/getItems", { method: "POST", headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json", "x-marketplace": marketplace }, body: JSON.stringify({ itemIds: [asin], itemIdType: "ASIN", marketplace, partnerTag, resources: ["images.primary.large", "images.primary.medium", "images.primary.small", "images.variants", "itemInfo.title", "itemInfo.byLineInfo", "itemInfo.features", "itemInfo.productInfo", "itemInfo.manufactureInfo", "browseNodeInfo.browseNodes", "parentASIN", "offersV2.listings"] }) });
    const data = await response.json();
    if (!response.ok) return res.status(response.status).json({ error: `Amazon product lookup failed (${response.status}).`, details: data });
    const item = data?.itemsResult?.items?.[0];
    if (!item) return res.status(404).json({ error: "Amazon returned no product for this ASIN." });
    return res.status(200).json({ product: mapItem(item, affiliateUrl, marketplace, asin) });
  } catch (error) { console.error("Amazon importer error", error); return res.status(500).json({ error: error instanceof Error ? error.message : "Unexpected importer error." }); }
}
