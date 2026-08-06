import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check, RefreshCw, Trophy, X } from "lucide-react";
import { AffiliateCtaGroup } from "@/components/AffiliateCtaGroup";
import { Breadcrumbs, breadcrumbSchema } from "@/components/Breadcrumbs";
import { GuideCard } from "@/components/ContentCards";
import { ReviewCard } from "@/components/ReviewCard";
import { ShareButtons } from "@/components/ShareButtons";
import { StarRating } from "@/components/StarRating";
import { TableOfContents } from "@/components/TableOfContents";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { affiliateConfig } from "@/config/site";
import { getCategory } from "@/data/categories";
import { getComparison, type Comparison, type ComparisonSide } from "@/data/comparisons";
import { relatedGuides, relatedReviews } from "@/lib/related";

const SITE = "https://primechoice-review-hub.lovable.app";

export const Route = createFileRoute("/compare/$slug")({
  loader: ({ params }) => {
    const comparison = getComparison(params.slug);
    if (!comparison) throw notFound();
    return { comparison };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Comparison not found" }, { name: "robots", content: "noindex" }] };
    }
    const c = loaderData.comparison;
    const url = `${SITE}/compare/${params.slug}`;
    return {
      meta: [
        { title: `${c.title} | PrimeChoiceReviews` },
        { name: "description", content: c.excerpt },
        { property: "og:title", content: c.title },
        { property: "og:description", content: c.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: c.title },
        { name: "twitter:description", content: c.excerpt },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: c.faq.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: { "@type": "Answer", text: f.answer },
            })),
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbSchema([
              { label: "Home", to: "/" },
              { label: "Comparisons", to: "/compare" },
              { label: c.title },
            ]),
          ),
        },
      ],
    };
  },
  component: ComparePage,
});

function SideCard({ side, tag, winner }: { side: ComparisonSide; tag: string; winner: boolean }) {
  return (
    <div className={`card-surface rounded-2xl p-6 ${winner ? "ring-2 ring-primary" : ""}`}>
      <div className="flex items-center justify-between gap-3">
        <Badge variant={winner ? "default" : "secondary"} className="rounded-full">
          {winner ? "Our winner" : tag}
        </Badge>
        <StarRating rating={side.rating} size="sm" />
      </div>
      <h3 className="mt-3 font-display text-xl font-bold">{side.name}</h3>
      <p className="mt-1 font-display text-2xl font-extrabold text-primary">{side.price}</p>
      <p className="mt-3 text-sm text-muted-foreground">{side.summary}</p>
      <ul className="mt-4 space-y-2">
        {side.pros.map((p) => (
          <li key={p} className="flex gap-2 text-sm">
            <Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
            <span>{p}</span>
          </li>
        ))}
        {side.cons.map((c) => (
          <li key={c} className="flex gap-2 text-sm">
            <X className="mt-0.5 size-4 shrink-0 text-destructive" aria-hidden="true" />
            <span>{c}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <AffiliateCtaGroup
          productName={side.name}
          compact
          {...(side.productId ? { productId: side.productId } : {})}
        />
      </div>
    </div>
  );
}

function Cell({ value }: { value: boolean | string }) {
  if (value === true)
    return <Check className="size-4 text-success" aria-label="Yes" />;
  if (value === false) return <X className="size-4 text-destructive" aria-label="No" />;
  return <span className="text-muted-foreground">{value}</span>;
}

function ComparePage() {
  const { comparison } = Route.useLoaderData() as { comparison: Comparison };
  const c = comparison;
  const category = getCategory(c.category);
  const toc = [
    { id: "at-a-glance", label: "At a glance" },
    { id: "specifications", label: "Specifications" },
    { id: "features", label: "Features" },
    { id: "performance", label: "Performance" },
    { id: "price", label: "Price comparison" },
    { id: "winner", label: "Winner" },
    { id: "faq", label: "FAQs" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Comparisons", to: "/compare" },
          { label: c.a.name },
        ]}
      />

      <article>
        <header>
          {category && (
            <Badge variant="secondary" className="rounded-full font-medium">
              {category.name}
            </Badge>
          )}
          <h1 className="mt-4 text-3xl leading-tight font-extrabold sm:text-4xl">{c.title}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{c.excerpt}</p>
          <p className="mt-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
            <RefreshCw className="size-3.5" aria-hidden="true" />
            Updated{" "}
            {new Date(c.updated).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
          <p className="mt-4 rounded-xl border border-border bg-secondary/60 p-3 text-xs text-muted-foreground">
            {affiliateConfig.disclosure}
          </p>
        </header>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_260px]">
          <div className="min-w-0">
            <div className="space-y-4 text-muted-foreground">
              {c.intro.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>

            <section id="at-a-glance" className="mt-12 scroll-mt-24">
              <h2 className="text-2xl font-bold sm:text-3xl">At a glance</h2>
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <SideCard side={c.a} tag="Option A" winner={c.winner.name === c.a.name} />
                <SideCard side={c.b} tag="Option B" winner={c.winner.name === c.b.name} />
              </div>
            </section>

            <section id="specifications" className="mt-14 scroll-mt-24">
              <h2 className="text-2xl font-bold sm:text-3xl">Specifications</h2>
              <div className="mt-5 overflow-x-auto rounded-2xl border border-border">
                <table className="w-full min-w-[560px] text-left text-sm">
                  <caption className="sr-only">
                    Specification comparison of {c.a.name} and {c.b.name}
                  </caption>
                  <thead className="bg-secondary/70">
                    <tr>
                      <th scope="col" className="px-4 py-3 font-semibold">Specification</th>
                      <th scope="col" className="px-4 py-3 font-semibold">{c.a.name}</th>
                      <th scope="col" className="px-4 py-3 font-semibold">{c.b.name}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {c.specs.map((row, i) => (
                      <tr key={row.label} className={i > 0 ? "border-t border-border" : ""}>
                        <th scope="row" className="px-4 py-3 font-semibold">{row.label}</th>
                        <td className="px-4 py-3 text-muted-foreground">{row.a}</td>
                        <td className="px-4 py-3 text-muted-foreground">{row.b}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section id="features" className="mt-14 scroll-mt-24">
              <h2 className="text-2xl font-bold sm:text-3xl">Feature comparison</h2>
              <div className="mt-5 overflow-x-auto rounded-2xl border border-border">
                <table className="w-full min-w-[560px] text-left text-sm">
                  <caption className="sr-only">
                    Feature comparison of {c.a.name} and {c.b.name}
                  </caption>
                  <thead className="bg-secondary/70">
                    <tr>
                      <th scope="col" className="px-4 py-3 font-semibold">Feature</th>
                      <th scope="col" className="px-4 py-3 font-semibold">{c.a.name}</th>
                      <th scope="col" className="px-4 py-3 font-semibold">{c.b.name}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {c.features.map((row, i) => (
                      <tr key={row.label} className={i > 0 ? "border-t border-border" : ""}>
                        <th scope="row" className="px-4 py-3 font-semibold">{row.label}</th>
                        <td className="px-4 py-3"><Cell value={row.a} /></td>
                        <td className="px-4 py-3"><Cell value={row.b} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section id="performance" className="mt-14 scroll-mt-24">
              <h2 className="text-2xl font-bold sm:text-3xl">Performance</h2>
              {c.performance.map((p) => (
                <p key={p.slice(0, 24)} className="mt-3 text-muted-foreground">{p}</p>
              ))}
            </section>

            <section id="price" className="mt-14 scroll-mt-24">
              <h2 className="text-2xl font-bold sm:text-3xl">Price comparison</h2>
              {c.price.map((p) => (
                <p key={p.slice(0, 24)} className="mt-3 text-muted-foreground">{p}</p>
              ))}
            </section>

            <section
              id="winner"
              className="mt-14 scroll-mt-24 rounded-3xl p-8 sm:p-10"
              style={{ backgroundImage: "var(--gradient-hero)" }}
            >
              <p className="inline-flex items-center gap-2 font-display text-[11px] font-bold tracking-[0.14em] text-primary uppercase">
                <Trophy className="size-4" aria-hidden="true" />
                Winner
              </p>
              <h2 className="mt-3 text-2xl font-bold sm:text-3xl">{c.winner.name}</h2>
              <p className="mt-3 max-w-2xl text-muted-foreground">{c.winner.reason}</p>
              <div className="mt-6 max-w-md">
                <AffiliateCtaGroup productName={c.winner.name} compact />
              </div>
            </section>

            <section id="faq" className="mt-14 scroll-mt-24">
              <h2 className="text-2xl font-bold sm:text-3xl">Frequently asked questions</h2>
              <Accordion type="single" collapsible className="mt-4">
                {c.faq.map((f, i) => (
                  <AccordionItem key={f.question} value={`item-${i}`}>
                    <AccordionTrigger className="text-left text-base font-semibold">
                      {f.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{f.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            <div className="mt-10">
              <ShareButtons title={c.title} path={`/compare/${c.slug}`} />
            </div>
          </div>

          <TableOfContents items={toc} className="lg:sticky lg:top-24 lg:self-start" />
        </div>
      </article>

      <section aria-labelledby="related-reviews" className="mt-16">
        <h2 id="related-reviews" className="text-2xl font-bold">Related reviews</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {relatedReviews(c.category).map((r) => (
            <ReviewCard key={r.slug} review={r} />
          ))}
        </div>
      </section>

      <section aria-labelledby="related-guides" className="mt-16">
        <h2 id="related-guides" className="text-2xl font-bold">Related buying guides</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {relatedGuides(c.category).map((g) => (
            <GuideCard key={g.slug} guide={g} />
          ))}
        </div>
        <p className="mt-6 text-sm">
          <Link to="/compare" className="font-semibold text-primary">
            All comparisons →
          </Link>
        </p>
      </section>
    </div>
  );
}