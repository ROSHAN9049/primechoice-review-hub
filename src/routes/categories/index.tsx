import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CategoryGrid } from "@/components/CategoryGrid";

const title = "Review Categories — PrimeChoiceReviews";
const description =
  "Explore our nine review categories, from health supplements and men's health to AI tools, software, finance and fitness.";

export const Route = createFileRoute("/categories/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/categories" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/categories" }],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Categories" }]} />
      <h1 className="text-4xl font-extrabold sm:text-5xl">Categories</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">{description}</p>
      <div className="mt-10">
        <CategoryGrid />
      </div>
    </div>
  );
}