import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import {
  fetchCategories,
  fetchComparisons,
  fetchGuides,
  fetchPosts,
  fetchReviews,
} from "@/lib/content.functions";

// TODO: replace with your project URL once a project name or custom domain is set.
const BASE_URL = "https://primechoice-review-hub.lovable.app";

interface SitemapEntry {
  path: string;
  changefreq?: "daily" | "weekly" | "monthly" | "yearly";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const [reviews, posts, guides, comparisons, categories] = await Promise.all([
          fetchReviews(),
          fetchPosts(),
          fetchGuides(),
          fetchComparisons(),
          fetchCategories(),
        ]);
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/reviews", changefreq: "weekly", priority: "0.9" },
          { path: "/categories", changefreq: "monthly", priority: "0.8" },
          { path: "/blog", changefreq: "weekly", priority: "0.8" },
          { path: "/guides", changefreq: "weekly", priority: "0.8" },
          { path: "/compare", changefreq: "weekly", priority: "0.8" },
          { path: "/about", changefreq: "yearly", priority: "0.5" },
          { path: "/contact", changefreq: "yearly", priority: "0.5" },
          { path: "/privacy-policy", changefreq: "yearly", priority: "0.3" },
          { path: "/disclaimer", changefreq: "yearly", priority: "0.3" },
          { path: "/terms", changefreq: "yearly", priority: "0.3" },
          ...reviews.map((r) => ({
            path: `/reviews/${r.slug}`,
            changefreq: "monthly" as const,
            priority: "0.9",
          })),
          ...categories.map((c) => ({
            path: `/categories/${c.slug}`,
            changefreq: "monthly" as const,
            priority: "0.7",
          })),
          ...posts.map((p) => ({
            path: `/blog/${p.slug}`,
            changefreq: "monthly" as const,
            priority: "0.7",
          })),
          ...guides.map((g) => ({
            path: `/guides/${g.slug}`,
            changefreq: "monthly" as const,
            priority: "0.8",
          })),
          ...comparisons.map((c) => ({
            path: `/compare/${c.slug}`,
            changefreq: "monthly" as const,
            priority: "0.8",
          })),
        ];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});