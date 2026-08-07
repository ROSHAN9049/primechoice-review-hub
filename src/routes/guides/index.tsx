import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs, breadcrumbSchema } from "@/components/Breadcrumbs";
import { GuideCard } from "@/components/ContentCards";
import type { Guide } from "@/data/guides";
import { fetchGuides } from "@/lib/content.functions";

const title = "Buying Guides — Best Product Picks | PrimeChoiceReviews";
const description =
  "Independent buying guides with tested top picks, comparison tables and expert advice across electronics, home, health and more.";

export const Route = createFileRoute("/guides/")({
  loader: () => fetchGuides(),
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://primechoice-review-hub.lovable.app/guides" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "https://primechoice-review-hub.lovable.app/guides" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbSchema([{ label: "Home", to: "/" }, { label: "Buying Guides" }]),
        ),
      },
    ],
  }),
  component: GuidesIndex,
});

function GuidesIndex() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Buying Guides" }]} />
      <header className="max-w-2xl">
        <h1 className="text-3xl font-extrabold sm:text-4xl">Buying guides</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Every guide starts with the same question: which one would we buy with our own money?
          Top picks, full comparison tables and the advice you actually need before you spend.
        </p>
      </header>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {guides.map((g) => (
          <GuideCard key={g.slug} guide={g} />
        ))}
      </div>
    </div>
  );
}