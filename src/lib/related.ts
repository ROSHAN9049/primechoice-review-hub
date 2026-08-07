import type { Comparison } from "@/data/comparisons";
import type { Guide } from "@/data/guides";
import type { Post } from "@/data/posts";
import type { Review } from "@/data/reviews";

/**
 * Automatic internal linking: prefers same-category items, then falls
 * back to the newest content so every page always links onward.
 * Lists are supplied by the route loader (database-backed).
 */
export function pickRelated<T extends { category: string; slug: string }>(
  items: T[],
  category: string,
  excludeSlug?: string,
  limit = 3,
): T[] {
  const pool = items.filter((i) => i.slug !== excludeSlug);
  const same = pool.filter((i) => i.category === category);
  const rest = pool.filter((i) => i.category !== category);
  return [...same, ...rest].slice(0, limit);
}

export const relatedReviews = (items: Review[], category: string, exclude?: string, limit = 3) =>
  pickRelated(items, category, exclude, limit);
export const relatedGuides = (items: Guide[], category: string, exclude?: string, limit = 3) =>
  pickRelated(items, category, exclude, limit);
export const relatedComparisons = (
  items: Comparison[],
  category: string,
  exclude?: string,
  limit = 3,
) => pickRelated(items, category, exclude, limit);
export const relatedPosts = (items: Post[], category: string, exclude?: string, limit = 3) =>
  pickRelated(items, category, exclude, limit);

/** Previous / next article in publication order. */
export function adjacentPosts(posts: Post[], slug: string): { prev?: Post; next?: Post } {
  const ordered = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
  const i = ordered.findIndex((p) => p.slug === slug);
  if (i === -1) return {};
  const prev = ordered[i + 1];
  const next = ordered[i - 1];
  return { ...(prev ? { prev } : {}), ...(next ? { next } : {}) };
}
