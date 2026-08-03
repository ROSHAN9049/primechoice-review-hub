import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BlogCard } from "@/components/BlogCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { getCategory } from "@/data/categories";
import { posts } from "@/data/posts";

const title = "Blog — Buying Guides & Review Methodology | PrimeChoiceReviews";
const description =
  "Buying guides, testing methodology and category deep-dives from the PrimeChoiceReviews research team.";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/blog" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogPage,
});

function BlogPage() {
  const used = Array.from(new Set(posts.map((p) => p.category)));
  const [active, setActive] = useState("all");
  const list = active === "all" ? posts : posts.filter((p) => p.category === active);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Blog" }]} />
      <h1 className="text-4xl font-extrabold sm:text-5xl">Blog</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">{description}</p>

      <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter articles by category">
        <Button
          variant={active === "all" ? "default" : "outline"}
          size="sm"
          className="min-h-10 rounded-full"
          aria-pressed={active === "all"}
          onClick={() => setActive("all")}
        >
          All
        </Button>
        {used.map((slug) => (
          <Button
            key={slug}
            variant={active === slug ? "default" : "outline"}
            size="sm"
            className="min-h-10 rounded-full"
            aria-pressed={active === slug}
            onClick={() => setActive(slug)}
          >
            {getCategory(slug)?.name ?? slug}
          </Button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <BlogCard key={p.slug} post={p} />
        ))}
      </div>
    </div>
  );
}