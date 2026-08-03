import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ReviewCard } from "@/components/ReviewCard";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/categories";
import { reviews } from "@/data/reviews";

const title = "All Product Reviews — PrimeChoiceReviews";
const description =
  "Browse every hands-on review we publish: supplements, AI tools, software, finance programs, fitness and more — each scored on a fixed rubric.";

export const Route = createFileRoute("/reviews/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/reviews" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/reviews" }],
  }),
  component: ReviewsPage,
});

function ReviewsPage() {
  const [active, setActive] = useState<string>("all");
  const list = active === "all" ? reviews : reviews.filter((r) => r.category === active);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Reviews" }]} />
      <h1 className="text-4xl font-extrabold sm:text-5xl">Product reviews</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">{description}</p>

      <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter reviews by category">
        <Button
          variant={active === "all" ? "default" : "outline"}
          size="sm"
          className="min-h-10 rounded-full"
          aria-pressed={active === "all"}
          onClick={() => setActive("all")}
        >
          All
        </Button>
        {categories.map((c) => (
          <Button
            key={c.slug}
            variant={active === c.slug ? "default" : "outline"}
            size="sm"
            className="min-h-10 rounded-full"
            aria-pressed={active === c.slug}
            onClick={() => setActive(c.slug)}
          >
            {c.name}
          </Button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((r) => (
          <ReviewCard key={r.slug} review={r} />
        ))}
      </div>
      {list.length === 0 && (
        <p className="mt-10 text-muted-foreground">No reviews in this category yet.</p>
      )}
    </div>
  );
}