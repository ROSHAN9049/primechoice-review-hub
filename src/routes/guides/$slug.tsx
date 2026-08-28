import { ArrowUpRight, Check, RefreshCw, X } from "lucide-react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AffiliateButton } from "@/components/AffiliateButton";
import { AffiliateCtaGroup } from "@/components/AffiliateCtaGroup";
import { Breadcrumbs, breadcrumbSchema } from "@/components/Breadcrumbs";
import { ComparisonCard } from "@/components/ContentCards";
import { ReviewCard } from "@/components/ReviewCard";
import { ShareButtons } from "@/components/ShareButtons";
import { StarRating } from "@/components/StarRating";
import { TableOfContents } from "@/components/TableOfContents";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { affiliateConfig } from "@/config/site";
import { getCategory } from "@/data/categories";
import type { Comparison } from "@/data/comparisons";
import type { Guide } from "@/data/guides";
import type { Review } from "@/data/reviews";
import { fetchComparisons, fetchGuides, fetchReviews } from "@/lib/content.functions";
import { relatedComparisons, relatedReviews } from "@/lib/related";

const SITE = "https://primechoice-review-hub.lovable.app";
const digistore24MarketplaceUrl = "https://www.digistore24-app.com/app/en/affiliate/account/marketplace/all?auth_testpay=1";
const allInOneImage = "/category-art-default.svg";

export const Route = createFileRoute("/guides/$slug")({
  loader: async ({ params }) => {
    const [guides, reviews, comparisons] = await Promise.all([fetchGuides(), fetchReviews(), fetchComparisons()]);
    const guide = guides.find((g) => g.slug === params.slug);
    if (!guide) throw notFound();
    return { guide, reviews: relatedReviews(reviews, guide.category), comparisons: relatedComparisons(comparisons, guide.category) };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Guide not found" }, { name: "robots", content: "noindex" }] };
    const g = loaderData.guide;
    const url = `${SITE}/guides/${params.slug}`;
    return {
      meta: [
        { title: `${g.title} | PrimeChoiceReviews` }, { name: "description", content: g.excerpt },
        { property: "og:title", content: g.title }, { property: "og:description", content: g.excerpt },
        { property: "og:type", content: "article" }, { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" }, { name: "twitter:title", content: g.title }, { name: "twitter:description", content: g.excerpt },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "ItemList", name: g.title, description: g.excerpt, itemListElement: g.picks.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.name })) }) },
        { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: g.faq.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) }) },
        { type: "application/ld+json", children: JSON.stringify(breadcrumbSchema([{ label: "Home", to: "/" }, { label: "Buying Guides", to: "/guides" }, { label: g.title }])) },
      ],
    };
  },
  component: GuidePage,
});

function GuidePage() {
  const { guide, ...related } = Route.useLoaderData() as { guide: Guide; reviews: Review[]; comparisons: Comparison[] };
  const category = getCategory(guide.category);
  const toc = [{ id: "top-picks", label: "Top picks" }, { id: "comparison-table", label: "Comparison table" }, ...guide.buyingGuide.map((s) => ({ id: s.id, label: s.heading })), { id: "faq", label: "FAQs" }, { id: "final-recommendation", label: "Final recommendation" }];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Buying Guides", to: "/guides" }, { label: guide.title }]} />
      <article>
        <header>
          {category && <Badge variant="secondary" className="rounded-full font-medium">{category.name}</Badge>}
          <h1 className="mt-4 text-3xl leading-tight font-extrabold sm:text-4xl">{guide.title}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{guide.excerpt}</p>
          <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground"><span className="inline-flex items-center gap-1.5"><RefreshCw className="size-3.5" aria-hidden="true" /> Updated {new Date(guide.updated).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span><span>· {guide.picks.length} products tested</span></p>
          <img src={guide.image} alt={guide.title} width={1024} height={576} className="mt-8 aspect-[16/9] w-full rounded-2xl object-cover shadow-soft" onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = allInOneImage; }} />
          <p className="mt-4 rounded-xl border border-border bg-secondary/60 p-3 text-xs text-muted-foreground">{affiliateConfig.disclosure}</p>
        </header>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_260px]">
          <div className="min-w-0">
            <div className="space-y-4 text-muted-foreground">{guide.intro.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}</div>
            <section aria-labelledby="top-picks" id="top-picks" className="mt-12 scroll-mt-24">
              <h2 id="top-picks-heading" className="text-2xl font-bold sm:text-3xl">Top picks</h2>
              <div className="mt-6 space-y-6">{guide.picks.map((p, i) => <div key={p.name} className="card-surface rounded-2xl p-6"><div className="flex flex-wrap items-center justify-between gap-3"><Badge className="rounded-full">{p.badge}</Badge><StarRating rating={p.rating} size="sm" /></div><h3 className="mt-3 font-display text-xl font-bold">{i + 1}. {p.name}</h3><p className="mt-1 font-display text-2xl font-extrabold text-primary">{p.price}</p><p className="mt-3 text-sm text-muted-foreground">{p.why}</p><div className="mt-5 grid gap-5 sm:grid-cols-2"><ul className="space-y-2">{p.pros.map((pro) => <li key={pro} className="flex gap-2 text-sm"><Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" /><span>{pro}</span></li>)}</ul><ul className="space-y-2">{p.cons.map((con) => <li key={con} className="flex gap-2 text-sm"><X className="mt-0.5 size-4 shrink-0 text-destructive" aria-hidden="true" /><span>{con}</span></li>)}</ul></div><div className="mt-6"><AffiliateCtaGroup productName={p.name} {...(p.productId ? { productId: p.productId } : {})} /></div></div>)}</div>
            </section>

            <section aria-labelledby="comparison-table-heading" id="comparison-table" className="mt-14 scroll-mt-24">
              <h2 id="comparison-table-heading" className="text-2xl font-bold sm:text-3xl">Comparison table</h2>
              <div className="mt-5 overflow-x-auto rounded-2xl border border-border"><table className="w-full min-w-[560px] text-left text-sm"><caption className="sr-only">Side-by-side comparison of every pick</caption><thead className="bg-secondary/70"><tr>{guide.specColumns.map((c) => <th key={c} scope="col" className="px-4 py-3 font-semibold">{c}</th>)}</tr></thead><tbody>{guide.specRows.map((row, i) => <tr key={row[0]} className={i === 0 ? "bg-primary/5" : "border-t border-border"}>{row.map((cell, j) => j === 0 ? <th key={cell} scope="row" className="px-4 py-3 font-semibold">{cell}</th> : <td key={`${row[0]}-${j}`} className="px-4 py-3 text-muted-foreground">{cell}</td>)}</tr>)}</tbody></table></div>
            </section>
            {guide.buyingGuide.map((s) => <section key={s.id} id={s.id} className="mt-14 scroll-mt-24"><h2 className="text-2xl font-bold sm:text-3xl">{s.heading}</h2>{s.paragraphs.map((p) => <p key={p.slice(0, 24)} className="mt-3 text-muted-foreground">{p}</p>)}</section>)}
            <section aria-labelledby="faq-heading" id="faq" className="mt-14 scroll-mt-24"><h2 id="faq-heading" className="text-2xl font-bold sm:text-3xl">Frequently asked questions</h2><Accordion type="single" collapsible className="mt-4">{guide.faq.map((f, i) => <AccordionItem key={f.question} value={`item-${i}`}><AccordionTrigger className="text-left text-base font-semibold">{f.question}</AccordionTrigger><AccordionContent className="text-muted-foreground">{f.answer}</AccordionContent></AccordionItem>)}</Accordion></section>
            <section aria-labelledby="final-recommendation-heading" id="final-recommendation" className="mt-14 scroll-mt-24 rounded-3xl p-8 sm:p-10" style={{ backgroundImage: "var(--gradient-hero)" }}><h2 id="final-recommendation-heading" className="text-2xl font-bold sm:text-3xl">Final recommendation</h2><p className="mt-3 text-muted-foreground">{guide.recommendation}</p><div className="mt-6 max-w-md"><AffiliateButton label={`Check price on ${guide.picks[0]?.name ?? "our top pick"}`} subLabel="Official vendor · secure checkout" /></div></section>
            <div className="mt-10"><ShareButtons title={guide.title} path={`/guides/${guide.slug}`} /></div>
          </div>
          <TableOfContents items={toc} className="lg:sticky lg:top-24 lg:self-start" />
        </div>
      </article>

      <section id="all-in-one" aria-labelledby="all-in-one-heading" className="mt-16 rounded-2xl border border-border bg-card p-5 shadow-elevated sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-4">
            <img src={allInOneImage} alt="All-in-One guides" width={112} height={80} className="h-20 w-28 shrink-0 rounded-xl object-cover" loading="lazy" decoding="async" onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.style.visibility = "hidden"; }} />
            <div><span className="text-xs font-bold uppercase tracking-[0.18em] text-primary-glow">All-in-One</span><h2 id="all-in-one-heading" className="mt-1 text-2xl font-bold">All-in-One</h2><p className="mt-1 text-sm text-muted-foreground">Independent guides with practical reviews, buying research and category deep-dives.</p></div>
          </div>
          <a href={digistore24MarketplaceUrl} target="_blank" rel="noopener noreferrer sponsored nofollow" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90" aria-label="View all Digistore24 marketplace offers">View all <ArrowUpRight className="size-4" aria-hidden="true" /></a>
        </div>
      </section>

      <section aria-labelledby="related-reviews" className="mt-16"><h2 id="related-reviews" className="text-2xl font-bold">Related reviews</h2><div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{related.reviews.map((r) => <ReviewCard key={r.slug} review={r} />)}</div></section>
      <section aria-labelledby="related-comparisons" className="mt-16"><h2 id="related-comparisons" className="text-2xl font-bold">Related comparisons</h2><div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{related.comparisons.map((c) => <ComparisonCard key={c.slug} comparison={c} />)}</div><p className="mt-6 text-sm"><Link to="/guides" className="font-semibold text-primary">All buying guides →</Link></p></section>
    </div>
  );
}
