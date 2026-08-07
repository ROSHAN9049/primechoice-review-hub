import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs, breadcrumbSchema } from "@/components/Breadcrumbs";
import { ComparisonCard } from "@/components/ContentCards";
import type { Comparison } from "@/data/comparisons";
import { fetchComparisons } from "@/lib/content.functions";

const title = "Product Comparisons — Head-to-Head Tests | PrimeChoiceReviews";
const description =
  "Side-by-side product comparisons with spec tables, feature checklists, performance notes and a clear winner for every match-up.";

export const Route = createFileRoute("/compare/")({
  loader: () => fetchComparisons(),
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://primechoice-review-hub.lovable.app/compare" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "https://primechoice-review-hub.lovable.app/compare" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbSchema([{ label: "Home", to: "/" }, { label: "Comparisons" }]),
        ),
      },
    ],
  }),
  component: CompareIndex,
});

function CompareIndex() {
  const comparisons = Route.useLoaderData() as Comparison[];
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Comparisons" }]} />
      <header className="max-w-2xl">
        <h1 className="text-3xl font-extrabold sm:text-4xl">Product comparisons</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Two products, one rubric, one winner. Every comparison covers specifications, features,
          real performance and the price difference that actually decides it.
        </p>
      </header>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {comparisons.map((c) => (
          <ComparisonCard key={c.slug} comparison={c} />
        ))}
      </div>
    </div>
  );
}