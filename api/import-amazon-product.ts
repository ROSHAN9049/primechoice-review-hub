import type { VercelRequest, VercelResponse } from "@vercel/node";

const MARKETPLACE_TO_TOKEN_ENDPOINT: Record<string, string> = {
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

const AMAZON_HOSTS = new Set(Object.keys(MARKETPLACE_TO_TOKEN_ENDPOINT));

function extractAsin(input: string): string | null {
  try {
    const url = new URL(input);
    const host = url.hostname.replace(/^www\./, "www.");
    if (!AMAZON_HOSTS.has(host)) return null;

    const patterns = [
      /\/dp\/([A-Z0-9]{10})(?:[/?]|$)/i,
      /\/gp\/product\/([A-Z0-9]{10})(?:[/?]|$)/i,
      /\/product\/([A-Z0-9]{10})(?:[/?]|$)/i,
    ];
    for (const pattern of patterns) {
      const match = url.pathname.match(pattern);
      if (match) return match[1].toUpperCase();
    }

    const asin = url.searchParams.get("asin");
    return asin && /^[A-Z0-9]{10}$/i.test(asin) ? asin.toUpperCase() : null;
  } catch {
    return null;
  }
}

function getMarketplace(input: string): string {
  const url = new URL(input);
  return url.hostname.replace(/^www\./, "www.");
}

async function getAccessToken(marketplace: string) {
  const clientId = process.env.AMAZON_CREATORS_CLIENT_ID;
  const clientSecret = process.env.AMAZON_CREATORS_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    throw new Error("Amazon Creators API credentials are not configured on Vercel.");
  }

  const endpoint = MARKETPLACE_TO_TOKEN_ENDPOINT[marketplace];
  if (!endpoint) throw new Error(`Unsupported Amazon marketplace: ${marketplace}`);

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: clientSecret,
      scope: "creatorsapi::default",
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Amazon authentication failed (${response.status}): ${text.slice(0, 300)}`);
  }
  const data = (await response.json()) as { access_token?: string };
  if (!data.access_token) throw new Error("Amazon did not return an access token.");
  return data.access_token;
}

function pick(value: any): string | null {
  if (value == null) return null;
  if (typeof value === "string" || typeof value === "number") return String(value);
  if (typeof value === "object") {
    if (value.displayValue != null) return String(value.displayValue);
    if (value.displayName != null) return String(value.displayName);
    if (value.label != null && value.value != null) return String(value.value);
  }
  return null;
}

function uniqueStrings(values: unknown[]): string[] {
  return [...new Set(values.filter((v): v is string => typeof v === "string" && v.trim().length > 0).map((v) => v.trim()))];
}

function buildSlug(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 90) || `amazon-product-${Date.now()}`;
}

function inferCategory(title: string, classifications: unknown): string {
  const text = `${title} ${JSON.stringify(classifications ?? "")}`.toLowerCase();
  const rules: Array<[RegExp, string]> = [
    [/health|supplement|vitamin|wellness|medical|nutrition/, "Health"],
    [/fitness|exercise|gym|workout|sport/, "Fitness"],
    [/computer|laptop|software|electronic|headphone|camera|phone|tablet|gaming/, "Technology"],
    [/book|kindle|reading/, "Books"],
    [/finance|invest|trading/, "Finance"],
    [/beauty|skin|hair|makeup/, "Beauty"],
    [/home|kitchen|furniture|garden/, "Home"],
  ];
  return rules.find(([regex]) => regex.test(text))?.[1] ?? "General";
}

function mapItem(item: any, affiliateUrl: string, marketplace: string, asin: string) {
  const title = pick(item?.itemInfo?.title) ?? "Amazon Product";
  const brand = pick(item?.itemInfo?.byLineInfo?.brand) ?? pick(item?.itemInfo?.manufactureInfo?.manufacturer) ?? null;
  const description = pick(item?.itemInfo?.productInfo?.description) ?? pick(item?.itemInfo?.contentInfo?.edition);
  const features = Array.isArray(item?.itemInfo?.features)
    ? item.itemInfo.features.map((x: any) => pick(x)).filter(Boolean)
    : [];

  const images = [
    item?.images?.primary?.large?.url,
    item?.images?.primary?.medium?.url,
    item?.images?.primary?.small?.url,
    ...(item?.images?.variants ?? []).flatMap((variant: any) => [variant?.large?.url, variant?.medium?.url, variant?.small?.url]),
  ];

  const offer = item?.offersV2?.listings?.[0] ?? item?.offers?.listings?.[0];
  const price = offer?.price?.amount ?? offer?.price?.displayAmount ?? offer?.price?.pricePerUnit?.amount ?? null;
  const currency = offer?.price?.currency ?? (marketplace === "www.amazon.in" ? "INR" : "USD");
  const rating = item?.customerReviews?.starRating?.value ?? item?.customerReviews?.starRating ?? null;

  const specifications = [
    ["ASIN", asin],
    ["Brand", brand],
    ["Marketplace", marketplace],
    ["Manufacturer", pick(item?.itemInfo?.manufactureInfo?.manufacturer)],
    ["Color", pick(item?.itemInfo?.productInfo?.color)],
    ["Size", pick(item?.itemInfo?.productInfo?.size)],
    ["Release date", pick(item?.itemInfo?.productInfo?.releaseDate)],
  ]
    .filter(([, value]) => value)
    .map(([name, value]) => ({ name, value }));

  const pros = uniqueStrings(features.slice(0, 5));
  const cons = ["Check the current Amazon listing for availability, price and seller details."];
  const category = inferCategory(title, item?.browseNodeInfo);
  const seoTitle = `${title} Review & Details | Prime Choice Reviews`.slice(0, 60);
  const seoDescription = `${title}${brand ? ` by ${brand}` : ""}. See key features, images, specifications and the latest Amazon offer.`.slice(0, 160);

  return {
    title,
    slug: buildSlug(title),
    category,
    brand,
    status: "draft",
    rating: rating == null ? null : Number(rating),
    price: price == null ? null : Number(price),
    currency,
    region: marketplace === "www.amazon.in" ? "in" : marketplace === "www.amazon.com" ? "us" : "global",
    description: description ?? features.join(" "),
    images: uniqueStrings(images),
    affiliate_links: [{ network: "amazon", asin, marketplace, url: affiliateUrl, enabled: true }],
    specifications,
    pros,
    cons,
    seo: { title: seoTitle, description: seoDescription, keywords: uniqueStrings([title, brand ?? "", category, "Amazon review"]).join(", ") },
    source_url: affiliateUrl,
    external_id: asin,
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const affiliateUrl = String(req.body?.affiliateUrl ?? "").trim();
    if (!affiliateUrl) return res.status(400).json({ error: "Affiliate URL is required." });

    const asin = extractAsin(affiliateUrl);
    if (!asin) return res.status(400).json({ error: "This does not look like a supported Amazon product URL. Paste an Amazon product link containing an ASIN." });

    const marketplace = getMarketplace(affiliateUrl);
    const partnerTag = process.env.AMAZON_PARTNER_TAG;
    if (!partnerTag) return res.status(500).json({ error: "AMAZON_PARTNER_TAG is not configured on Vercel." });

    const token = await getAccessToken(marketplace);
    const response = await fetch("https://creatorsapi.amazon/catalog/v1/getItems", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "x-marketplace": marketplace,
      },
      body: JSON.stringify({
        itemIds: [asin],
        itemIdType: "ASIN",
        marketplace,
        partnerTag,
        resources: [
          "images.primary.large",
          "images.primary.medium",
          "images.primary.small",
          "images.variants",
          "itemInfo.title",
          "itemInfo.byLineInfo",
          "itemInfo.features",
          "itemInfo.productInfo",
          "itemInfo.manufactureInfo",
          "browseNodeInfo.browseNodes",
          "parentASIN",
          "offersV2.listings",
        ],
      }),
    });

    const payload = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({ error: `Amazon product lookup failed (${response.status}).`, details: payload });
    }

    const item = payload?.itemsResult?.items?.[0];
    if (!item) return res.status(404).json({ error: "Amazon returned no product for this ASIN." });

    return res.status(200).json({ product: mapItem(item, affiliateUrl, marketplace, asin) });
  } catch (error) {
    console.error("Amazon importer error", error);
    return res.status(500).json({ error: error instanceof Error ? error.message : "Unexpected importer error." });
  }
}
