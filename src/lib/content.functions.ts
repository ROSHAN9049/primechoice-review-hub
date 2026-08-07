import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import type { Category } from "@/data/categories";
import type { Comparison } from "@/data/comparisons";
import type { Guide } from "@/data/guides";
import type { Post } from "@/data/posts";
import type { Review } from "@/data/reviews";
import { imageFor } from "@/lib/images";

/** Publishable-key client for public, read-only content. */
function publicClient() {
  const url = process.env["SUPABASE_URL"] ?? process.env["VITE_SUPABASE_URL"]!;
  const key =
    process.env["SUPABASE_PUBLISHABLE_KEY"] ?? process.env["VITE_SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) {
          headers.delete("Authorization");
        }
        headers.set("apikey", key);
        return fetch(input, { ...init, headers });
      },
    },
  });
}

/* eslint-disable @typescript-eslint/no-explicit-any */
type Row = any;

const toReview = (r: Row): Review => ({
  ...(r.content ?? {}),
  slug: r.slug,
  title: r.title,
  product: r.product,
  vendor: r.vendor,
  category: r.category,
  image: imageFor(r.image),
  excerpt: r.excerpt,
  rating: Number(r.rating),
  featured: r.featured,
  productId: r.affiliate_product_id ?? undefined,
  updated: r.publish_date,
});

const toPost = (r: Row): Post => ({
  slug: r.slug,
  title: r.title,
  excerpt: r.excerpt,
  category: r.category,
  image: imageFor(r.image),
  author: r.author,
  date: r.publish_date,
  readingTime: r.reading_time,
  sections: r.sections ?? [],
});

const toGuide = (r: Row): Guide => ({
  ...(r.payload ?? {}),
  slug: r.slug,
  title: r.title,
  excerpt: r.excerpt,
  category: r.category,
  image: imageFor(r.payload?.image),
  updated: r.publish_date,
});

const toComparison = (r: Row): Comparison => ({
  ...(r.payload ?? {}),
  slug: r.slug,
  title: r.title,
  excerpt: r.excerpt,
  category: r.category,
  image: imageFor(r.payload?.image),
  updated: r.publish_date,
});

const REVIEW_COLS =
  "slug,title,product,vendor,category,image,excerpt,rating,featured,affiliate_product_id,publish_date,content";
const POST_COLS = "slug,title,excerpt,category,image,author,reading_time,publish_date,sections";

export const fetchCategories = createServerFn({ method: "GET" }).handler(async () => {
  const { data } = await publicClient()
    .from("categories")
    .select("slug,name,description,icon")
    .order("sort_order");
  return (data ?? []) as Category[];
});

export const fetchReviews = createServerFn({ method: "GET" }).handler(async () => {
  const { data } = await publicClient()
    .from("reviews")
    .select(REVIEW_COLS)
    .eq("status", "published")
    .order("publish_date", { ascending: false });
  return (data ?? []).map(toReview);
});

export const fetchPosts = createServerFn({ method: "GET" }).handler(async () => {
  const { data } = await publicClient()
    .from("blog_posts")
    .select(POST_COLS)
    .eq("status", "published")
    .order("publish_date", { ascending: false });
  return (data ?? []).map(toPost);
});

export const fetchGuides = createServerFn({ method: "GET" }).handler(async () => {
  const { data } = await publicClient()
    .from("guides")
    .select("slug,title,excerpt,category,publish_date,payload")
    .eq("status", "published")
    .order("publish_date", { ascending: false });
  return (data ?? []).map(toGuide);
});

export const fetchComparisons = createServerFn({ method: "GET" }).handler(async () => {
  const { data } = await publicClient()
    .from("comparisons")
    .select("slug,title,excerpt,category,publish_date,payload")
    .eq("status", "published")
    .order("publish_date", { ascending: false });
  return (data ?? []).map(toComparison);
});

/** Everything the homepage and search need in a single round-trip. */
export const fetchSiteContent = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = publicClient();
  const [reviews, posts, categories] = await Promise.all([
    supabase
      .from("reviews")
      .select(REVIEW_COLS)
      .eq("status", "published")
      .order("publish_date", { ascending: false }),
    supabase
      .from("blog_posts")
      .select(POST_COLS)
      .eq("status", "published")
      .order("publish_date", { ascending: false }),
    supabase.from("categories").select("slug,name,description,icon").order("sort_order"),
  ]);
  return {
    reviews: (reviews.data ?? []).map(toReview),
    posts: (posts.data ?? []).map(toPost),
    categories: (categories.data ?? []) as Category[],
  };
});
