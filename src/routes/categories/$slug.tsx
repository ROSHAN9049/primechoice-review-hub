import { createFileRoute, notFound } from "@tanstack/react-router";
import { Breadcrumbs, breadcrumbSchema } from "@/components/Breadcrumbs";
import { ReviewCard } from "@/components/ReviewCard";
import { getCategory, type Category } from "@/data/categories";
import type { Review } from "@/data/reviews";
import { fetchReviews } from "@/lib/content.functions";

export const Route = createFileRoute("/categories/$slug")({
  loader: async ({ params }) => {
    const category = getCategory(params.slug);
    if (!category) throw notFound();
    const all = await fetchReviews();
    return { category, reviews: all.filter((r) => r.category === params.slug) };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Category not found" }, { name: "robots", content: "noindex" }] };
    }
    const t = `${loaderData.category.name} Reviews — PrimeChoiceReviews`;
    const d = loaderData.category.description;
    return {
      meta: [
        { title: t },
        { name: "description", content: d },
        { property: "og:title", content: t },
        { property: "og:description", content: d },
        { property: "og:url", content: `/categories/${params.slug}` },
        { name: "twitter:title", content: t },
        { name: "twitter:description", content: d },
      ],
      links: [{ rel: "canonical", href: `/categories/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbSchema([
              { label: "Home", to: "/" },
              { label: "Categories", to: "/categories" },
              { label: loaderData.category.name },
            ]),
          ),
        },
      ],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { category, reviews: list } = Route.useLoaderData() as {
    category: Category;
    reviews: Review[];
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Categories", to: "/categories" },
          { label: category.name },
        ]}
      />
      <h1 className="text-4xl font-extrabold sm:text-5xl">{category.name}</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">{category.description}</p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((r) => (
          <ReviewCard key={r.slug} review={r} />
        ))}
      </div>
      {list.length === 0 && (
        <p className="mt-10 text-muted-foreground">
          Reviews in this category are in testing right now — check back soon.
        </p>
      )}
    </div>
  );
}