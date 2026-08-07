import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Search as SearchIcon } from "lucide-react";
import { useState, type FormEvent } from "react";
import { BlogCard } from "@/components/BlogCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ReviewCard } from "@/components/ReviewCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchSiteContent } from "@/lib/content.functions";

const title = "Search — PrimeChoiceReviews";
const description = "Search product reviews, buying guides and articles on PrimeChoiceReviews.";

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search['q'] === "string" ? (search['q'] as string) : "",
  }),
  loader: () => fetchSiteContent(),
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "noindex, follow" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/search" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { reviews, posts } = Route.useLoaderData();
  const { q } = Route.useSearch();
  const navigate = useNavigate();
  const [value, setValue] = useState(q);
  const term = q.trim().toLowerCase();

  const matchedReviews = term
    ? reviews.filter((r) =>
        `${r.title} ${r.product} ${r.excerpt} ${r.category}`.toLowerCase().includes(term),
      )
    : [];
  const matchedPosts = term
    ? posts.filter((p) => `${p.title} ${p.excerpt} ${p.category}`.toLowerCase().includes(term))
    : [];
  const total = matchedReviews.length + matchedPosts.length;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    navigate({ to: "/search", search: { q: value } });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Search" }]} />
      <h1 className="text-4xl font-extrabold sm:text-5xl">Search results</h1>
      <form onSubmit={submit} role="search" className="mt-6 flex max-w-xl gap-3">
        <label htmlFor="search-page-input" className="sr-only">
          Search reviews and articles
        </label>
        <Input
          id="search-page-input"
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search reviews and articles…"
          className="min-h-12 rounded-lg px-5"
        />
        <Button type="submit" size="lg" className="min-h-12 rounded-lg px-6">
          <SearchIcon className="size-4" aria-hidden="true" />
          Search
        </Button>
      </form>

      <p aria-live="polite" className="mt-5 text-muted-foreground">
        {term
          ? `${total} result${total === 1 ? "" : "s"} for “${q}”`
          : "Type a product, category or topic to begin."}
      </p>

      {matchedReviews.length > 0 && (
        <section aria-labelledby="sr-reviews" className="mt-10">
          <h2 id="sr-reviews" className="text-2xl font-bold">
            Reviews
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {matchedReviews.map((r) => (
              <ReviewCard key={r.slug} review={r} />
            ))}
          </div>
        </section>
      )}

      {matchedPosts.length > 0 && (
        <section aria-labelledby="sr-posts" className="mt-12">
          <h2 id="sr-posts" className="text-2xl font-bold">
            Articles
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {matchedPosts.map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}