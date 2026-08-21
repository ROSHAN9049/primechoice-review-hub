import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { categories as staticCategories, type Category } from "@/data/categories";
import type { Comparison } from "@/data/comparisons";
import { comparisons as staticComparisons } from "@/data/comparisons";
import type { Guide } from "@/data/guides";
import { guides as staticGuides } from "@/data/guides";
import { posts as staticPosts, type Post } from "@/data/posts";
import { reviews as staticReviews, type Review } from "@/data/reviews";
import { imageFor } from "@/lib/images";

const DEFAULT_SUPABASE_URL = "https://whtbrmzkbtlnndpnxgyz.supabase.co";
const DEFAULT_SUPABASE_PUBLISHABLE_KEY = "sb_publishable_pwtvSMbXIvjhZerLBBs0nA_BliSKeVX";

// Supabase JS expects the project URL only, never the REST endpoint. Some
// deployments accidentally store a full /rest/v1 URL in an environment var;
// reduce any configured URL to its origin so PostgREST paths are constructed
// exactly once by @supabase/supabase-js.
function normaliseSupabaseUrl(value: string) {
  const fallback = DEFAULT_SUPABASE_URL;
  try {
    const parsed = new URL(value.trim());
    if (!/^https?:$/.test(parsed.protocol)) return fallback;
    return parsed.origin;
  } catch {
    return fallback;
  }
}

function publicClient() {
  const rawUrl = process.env["SUPABASE_URL"] ?? process.env["VITE_SUPABASE_URL"] ?? DEFAULT_SUPABASE_URL;
  const url = normaliseSupabaseUrl(rawUrl);
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"] ?? process.env["SUPABASE_ANON_KEY"] ?? process.env["VITE_SUPABASE_PUBLISHABLE_KEY"] ?? process.env["VITE_SUPABASE_ANON_KEY"] ?? DEFAULT_SUPABASE_PUBLISHABLE_KEY;
  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { fetch: (input, init) => { const headers = new Headers(init?.headers); if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) headers.delete("Authorization"); headers.set("apikey", key); return fetch(input, { ...init, headers }); } },
  });
}

/* eslint-disable @typescript-eslint/no-explicit-any */
type Row = any;

export interface Product {
  id: string; slug: string; title: string; description: string; images: string[]; category?: string; brand?: string; rating: number; price?: number | null; currency: string; region: string;
  affiliateLinks: Array<{ url?: string; network?: string; productId?: string; affiliateId?: string; campaignKey?: string; enabled?: boolean }>;
  reviewSlug?: string; status: string; seoTitle?: string; seoDescription?: string; pros?: string[]; cons?: string[]; specifications?: Record<string, unknown>;
}

const toReview = (r: Row): Review => ({ ...(r.content ?? {}), slug: r.slug, title: r.title, product: r.product, vendor: r.vendor, category: r.category, image: imageFor(r.image), excerpt: r.excerpt, rating: Number(r.rating), featured: r.featured, productId: r.affiliate_product_id ?? undefined, updated: r.publish_date });
const toPost = (r: Row): Post => ({ slug: r.slug, title: r.title, excerpt: r.excerpt, category: r.category, image: imageFor(r.image), author: r.author, date: r.publish_date, readingTime: r.reading_time, sections: r.sections ?? [] });
const toGuide = (r: Row): Guide => ({ ...(r.payload ?? {}), slug: r.slug, title: r.title, excerpt: r.excerpt, category: r.category, image: imageFor(r.payload?.image), updated: r.publish_date });
const toComparison = (r: Row): Comparison => ({ ...(r.payload ?? {}), slug: r.slug, title: r.title, excerpt: r.excerpt, category: r.category, image: imageFor(r.payload?.image), updated: r.publish_date });

function normaliseLinks(r: Row) { const links = Array.isArray(r.affiliate_links) ? r.affiliate_links : []; if (links.length) return links; if (r.affiliate_link) return [{ url: r.affiliate_link, enabled: true, network: r.region === "in" ? "amazon" : "affiliate" }]; return []; }
function normaliseImages(r: Row) { if (Array.isArray(r.images) && r.images.length) return r.images.filter((x: unknown) => typeof x === "string" && x.trim()); if (typeof r.image_url === "string" && r.image_url.trim()) return [r.image_url]; return []; }
const toProduct = (r: Row, reviewByProductId: Map<string, string>, reviewByProductName: Map<string, string>): Product => ({ id: r.id, slug: r.slug, title: r.title, description: r.description ?? r.ai_generated_content ?? "", images: normaliseImages(r), category: r.category ?? undefined, brand: r.brand ?? undefined, rating: Number(r.rating ?? 0), price: r.price == null ? null : Number(r.price), currency: r.currency ?? "USD", region: r.region ?? "global", affiliateLinks: normaliseLinks(r), reviewSlug: reviewByProductId.get(r.id) ?? reviewByProductName.get(String(r.title).trim().toLowerCase()), status: r.status, seoTitle: r.seo_title ?? r.seo?.title, seoDescription: r.seo_description ?? r.seo?.description, pros: Array.isArray(r.pros) ? r.pros : [], cons: Array.isArray(r.cons) ? r.cons : [], specifications: r.specifications && typeof r.specifications === "object" ? r.specifications : {} });

const REVIEW_COLS = "slug,title,product,vendor,category,image,excerpt,rating,featured,affiliate_product_id,publish_date,content,product_ref";
const POST_COLS = "slug,title,excerpt,category,image,author,reading_time,publish_date,sections";
const PRODUCT_COLS = "id,slug,title,description,images,category,brand,rating,price,currency,region,affiliate_links,specifications,pros,cons,seo,status,created_at,updated_at";

export const fetchCategories = createServerFn({ method: "GET" }).handler(async () => { try { const { data, error } = await publicClient().from("categories").select("slug,name,description,icon").order("sort_order"); if (error) throw error; return data?.length ? (data as Category[]) : staticCategories; } catch (error) { console.error("fetchCategories: using static fallback", error); return staticCategories; } });
export const fetchReviews = createServerFn({ method: "GET" }).handler(async () => { try { const { data, error } = await publicClient().from("reviews").select(REVIEW_COLS).eq("status", "published").order("publish_date", { ascending: false }); if (error) throw error; const reviews = (data ?? []).map(toReview); return reviews.length ? reviews : staticReviews; } catch (error) { console.error("fetchReviews: using static fallback", error); return staticReviews; } });
export const fetchPosts = createServerFn({ method: "GET" }).handler(async () => { try { const { data, error } = await publicClient().from("blog_posts").select(POST_COLS).eq("status", "published").order("publish_date", { ascending: false }); if (error) throw error; const posts = (data ?? []).map(toPost); return posts.length ? posts : staticPosts; } catch (error) { console.error("fetchPosts: using static fallback", error); return staticPosts; } });
export const fetchGuides = createServerFn({ method: "GET" }).handler(async () => { try { const { data, error } = await publicClient().from("guides").select("slug,title,excerpt,category,publish_date,payload").eq("status", "published").order("publish_date", { ascending: false }); if (error) throw error; const guides = (data ?? []).map(toGuide); return guides.length ? guides : staticGuides; } catch (error) { console.error("fetchGuides: using static fallback", error); return staticGuides; } });
export const fetchComparisons = createServerFn({ method: "GET" }).handler(async () => { try { const { data, error } = await publicClient().from("comparisons").select("slug,title,excerpt,category,publish_date,payload").eq("status", "published").order("publish_date", { ascending: false }); if (error) throw error; const comparisons = (data ?? []).map(toComparison); return comparisons.length ? comparisons : staticComparisons; } catch (error) { console.error("fetchComparisons: using static fallback", error); return staticComparisons; } });

async function productList() { const supabase = publicClient(); const [{ data: products, error: productError }, { data: reviews, error: reviewError }] = await Promise.all([supabase.from("products").select(PRODUCT_COLS).eq("status", "published").order("created_at", { ascending: false }), supabase.from("reviews").select("slug,product,product_ref").eq("status", "published")]); if (productError) throw productError; if (reviewError) throw reviewError; const reviewByProductId = new Map<string, string>(); const reviewByProductName = new Map<string, string>(); for (const review of reviews ?? []) { if (review.product_ref) reviewByProductId.set(review.product_ref, review.slug); if (review.product) reviewByProductName.set(String(review.product).trim().toLowerCase(), review.slug); } return (products ?? []).map((p) => toProduct(p, reviewByProductId, reviewByProductName)); }
export const fetchProducts = createServerFn({ method: "GET" }).handler(async () => { try { return await productList(); } catch (error) { console.error("fetchProducts: returning empty product list", error); return [] as Product[]; } });
export const fetchProductBySlug = createServerFn({ method: "GET" }).inputValidator((value: { slug: string }) => value).handler(async ({ data }) => { try { const products = await productList(); return products.find((p) => p.slug === data.slug) ?? null; } catch (error) { console.error("fetchProductBySlug failed", error); return null; } });
export const fetchSiteContent = createServerFn({ method: "GET" }).handler(async () => { try { const supabase = publicClient(); const [reviews, posts, categories, products] = await Promise.all([supabase.from("reviews").select(REVIEW_COLS).eq("status", "published").order("publish_date", { ascending: false }), supabase.from("blog_posts").select(POST_COLS).eq("status", "published").order("publish_date", { ascending: false }), supabase.from("categories").select("slug,name,description,icon").order("sort_order"), supabase.from("products").select(PRODUCT_COLS).eq("status", "published").order("created_at", { ascending: false })]); if (reviews.error) throw reviews.error; if (posts.error) throw posts.error; if (categories.error) throw categories.error; if (products.error) throw products.error; const reviewRows = (reviews.data ?? []).map(toReview); const postRows = (posts.data ?? []).map(toPost); const reviewByProductId = new Map<string, string>(); const reviewByProductName = new Map<string, string>(); for (const review of reviews.data ?? []) { if (review.product_ref) reviewByProductId.set(review.product_ref, review.slug); if (review.product) reviewByProductName.set(String(review.product).trim().toLowerCase(), review.slug); } return { reviews: reviewRows.length ? reviewRows : staticReviews, posts: postRows.length ? postRows : staticPosts, categories: categories.data?.length ? (categories.data as Category[]) : staticCategories, products: (products.data ?? []).map((p) => toProduct(p, reviewByProductId, reviewByProductName)) }; } catch (error) { console.error("fetchSiteContent: using static fallback", error); return { reviews: staticReviews, posts: staticPosts, categories: staticCategories, products: [] as Product[] }; } });
