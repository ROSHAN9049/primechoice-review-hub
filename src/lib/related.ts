import { comparisons, type Comparison } from "@/data/comparisons";
import { guides, type Guide } from "@/data/guides";
import { posts, type Post } from "@/data/posts";
import { reviews, type Review } from "@/data/reviews";

/**
 * Automatic internal linking: prefers same-category items, then falls
 * back to the newest content so every page always links onward.
 */
function pickRelated<T extends { category: string }>(
  items: T[],
  category: string,
  exclude: (item: T) => boolean,
  limit: number,
): T[] {
  const pool = items.filter((i) => !exclude(i));
  const same = pool.filter((i) => i.category === category);
  const rest = pool.filter((i) => i.category !== category);
  return [...same, ...rest].slice(0, limit);
}

export const relatedReviews = (category: string, excludeSlug?: string, limit = 3): Review[] =>
  pickRelated(reviews, category, (r) => r.slug === excludeSlug, limit);

export const relatedGuides = (category: string, excludeSlug?: string, limit = 3): Guide[] =>
  pickRelated(guides, category, (g) => g.slug === excludeSlug, limit);

export const relatedComparisons = (
  category: string,
  excludeSlug?: string,
  limit = 3,
): Comparison[] => pickRelated(comparisons, category, (c) => c.slug === excludeSlug, limit);

export const relatedPosts = (category: string, excludeSlug?: string, limit = 3): Post[] =>
  pickRelated(posts, category, (p) => p.slug === excludeSlug, limit);

/** Previous / next article in publication order. */
export function adjacentPosts(slug: string): { prev?: Post; next?: Post } {
  const ordered = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
  const i = ordered.findIndex((p) => p.slug === slug);
  if (i === -1) return {};
  const prev = ordered[i + 1];
  const next = ordered[i - 1];
  return { ...(prev ? { prev } : {}), ...(next ? { next } : {}) };
}