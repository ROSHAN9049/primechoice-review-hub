import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

const DEFAULT_URL = "https://whtbrmzkbtlnndpnxgyz.supabase.co";
const DEFAULT_KEY = "sb_publishable_pwtvSMbXIvjhZerLBBs0nA_BliSKeVX";

function client() {
  const url = process.env["SUPABASE_URL"] ?? process.env["VITE_SUPABASE_URL"] ?? DEFAULT_URL;
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"] ?? process.env["SUPABASE_ANON_KEY"] ?? process.env["VITE_SUPABASE_PUBLISHABLE_KEY"] ?? process.env["VITE_SUPABASE_ANON_KEY"] ?? DEFAULT_KEY;
  return createClient<Database>(url.replace(/\/(rest\/v1|auth\/v1)\/?$/i, ""), key, { auth: { persistSession: false, autoRefreshToken: false } });
}

export interface PublicProduct {
  id: string;
  slug: string;
  title: string;
  description: string;
  images: string[];
  category?: string;
  brand?: string;
  rating: number;
  price?: number | null;
  currency: string;
  region: string;
  affiliateLinks: Array<{ url?: string; network?: string; enabled?: boolean }>;
  status: string;
}

function mapProduct(row: Record<string, unknown>): PublicProduct {
  return {
    id: String(row.id),
    slug: String(row.slug),
    title: String(row.title),
    description: String(row.description ?? ""),
    images: Array.isArray(row.images) ? row.images.filter((v): v is string => typeof v === "string") : [],
    category: row.category ? String(row.category) : undefined,
    brand: row.brand ? String(row.brand) : undefined,
    rating: Number(row.rating ?? 0),
    price: row.price == null ? null : Number(row.price),
    currency: String(row.currency ?? "USD"),
    region: String(row.region ?? "global"),
    affiliateLinks: Array.isArray(row.affiliate_links) ? row.affiliate_links as PublicProduct["affiliateLinks"] : [],
    status: String(row.status ?? "published"),
  };
}

export const fetchPublicProducts = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await client().from("products").select("id,slug,title,description,images,category,brand,rating,price,currency,region,affiliate_links,status").eq("status", "published").order("created_at", { ascending: false }).limit(12);
  if (error) {
    console.error("fetchPublicProducts failed", error.message);
    return [] as PublicProduct[];
  }
  return (data ?? []).map((row) => mapProduct(row as Record<string, unknown>));
});

export const fetchPublicProduct = createServerFn({ method: "GET" }).handler(async ({ data }) => {
  const slug = String(data ?? "");
  const { data: row, error } = await client().from("products").select("id,slug,title,description,images,category,brand,rating,price,currency,region,affiliate_links,status").eq("slug", slug).eq("status", "published").maybeSingle();
  if (error || !row) return null;
  return mapProduct(row as Record<string, unknown>);
});
