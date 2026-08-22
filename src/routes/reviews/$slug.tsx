import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check, RefreshCw, X } from "lucide-react";
import { AffiliateButton } from "@/components/AffiliateButton";
import { Breadcrumbs, breadcrumbSchema } from "@/components/Breadcrumbs";
import { ReviewCard } from "@/components/ReviewCard";
import { StarRating } from "@/components/StarRating";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { affiliateConfig } from "@/config/site";
import { getCategory } from "@/data/categories";
import type { Review } from "@/data/reviews";
import { fetchReviews } from "@/lib/content.functions";
import { relatedReviews } from "@/lib/related";

export const Route = createFileRoute("/reviews/$slug")({
  loader: async ({ params }) => { const all = await fetchReviews(); const review = all.find((r) => r.slug === params.slug); if (!review) throw notFound(); return { review, related: relatedReviews(all, review.category, review.slug) }; },
  head: ({ params, loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Review not found" }, { name: "robots", content: "noindex" }] };
    const r = loaderData.review;
    return { meta: [{ title: r.title }, { name: "description", content: r.excerpt }, { property: "og:title", content: r.title }, { property: "og:description", content: r.excerpt }, { property: "og:type", content: "article" }, { property: "og:url", content: `/reviews/${params.slug}` }], links: [{ rel: "canonical", href: `/reviews/${params.slug}` }], scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: r.title, description: r.excerpt, datePublished: r.updated, author: { "@type": "Organization", name: "PrimeChoiceReviews" } }) }, { type: "application/ld+json", children: JSON.stringify(breadcrumbSchema([{ label: "Home", to: "/" }, { label: "Reviews", to: "/reviews" }, { label: r.product }])) }] };
  },
  component: ReviewPage,
});

function ReviewPage() {
  const { review, related } = Route.useLoaderData() as { review: Review; related: Review[] };
  const category = getCategory(review.category);
  const amazonUrl = category?.affiliateUrl;
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Reviews", to: "/reviews" }, { label: review.product }]} />
      <article>
        <header className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>{category && <Badge variant="secondary" className="rounded-full font-medium">{category.name}</Badge>}<h1 className="mt-4 text-3xl leading-tight font-extrabold sm:text-4xl">{review.title}</h1><p className="mt-4 text-lg text-muted-foreground">{review.excerpt}</p><p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground"><span className="inline-flex items-center gap-1.5"><RefreshCw className="size-3.5" aria-hidden="true" />Updated {new Date(review.updated).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span><span>· Editorial review</span></p><p className="mt-4 rounded-xl border border-border bg-secondary/60 p-3 text-xs text-muted-foreground">{affiliateConfig.disclosure}</p></div>
          <div className="card-surface rounded-2xl p-6">
            <img src="/category-art-default.svg" alt={`${category?.name ?? "Category"} editorial review guide`} width={1024} height={768} className="aspect-[4/3] w-full rounded-2xl object-cover" />
            <div className="mt-5 flex items-center justify-between gap-4"><div><p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Editorial rating</p><p className="font-display text-4xl font-extrabold text-primary">{review.rating.toFixed(1)}<span className="text-base text-muted-foreground">/5</span></p></div><StarRating rating={review.rating} size="lg" showValue={false} /></div>
            <dl className="mt-5 space-y-3">{review.scores.map((s) => <div key={s.label}><div className="flex items-center justify-between text-sm"><dt className="text-muted-foreground">{s.label}</dt><dd className="font-semibold">{s.value.toFixed(1)}</dd></div><Progress value={(s.value / 5) * 100} className="mt-1.5 h-1.5" /></div>)}</dl>
            <div className="mt-6">{amazonUrl ? <AffiliateButton href={amazonUrl} label={`Shop ${category?.name ?? "Amazon India"}`} subLabel="Amazon India · affiliate link" showDisclosure={false} path={`/reviews/${review.slug}`} /> : <AffiliateButton productId={review.productId} label={`Get ${review.product}`} subLabel="Official vendor · secure checkout" showDisclosure={false} />}</div>
          </div>
        </header>
        <section aria-labelledby="verdict" className="mt-14"><h2 id="verdict" className="text-2xl font-bold sm:text-3xl">Review summary</h2><div className="mt-4 space-y-4 text-muted-foreground">{review.summary.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}</div></section>
        <section aria-labelledby="proscons" className="mt-14"><h2 id="proscons" className="text-2xl font-bold sm:text-3xl">Pros & cons</h2><div className="mt-5 grid gap-5 sm:grid-cols-2"><div className="card-surface rounded-xl p-6"><h3 className="font-semibold text-success">What we liked</h3><ul className="mt-4 space-y-2.5">{review.pros.map((p) => <li key={p} className="flex gap-2.5 text-sm"><Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" /><span>{p}</span></li>)}</ul></div><div className="card-surface rounded-xl p-6"><h3 className="font-semibold text-destructive">What could be better</h3><ul className="mt-4 space-y-2.5">{review.cons.map((c) => <li key={c} className="flex gap-2.5 text-sm"><X className="mt-0.5 size-4 shrink-0 text-destructive" aria-hidden="true" /><span>{c}</span></li>)}</ul></div></div></section>
        <section aria-labelledby="features" className="mt-14"><h2 id="features" className="text-2xl font-bold sm:text-3xl">Key features</h2><div className="mt-5 grid gap-4 sm:grid-cols-2">{review.features.map((f) => <div key={f.title} className="card-surface rounded-xl p-5"><h3 className="font-semibold">{f.title}</h3><p className="mt-2 text-sm text-muted-foreground">{f.description}</p></div>)}</div></section>
        <section className="mt-14"><h2 className="text-2xl font-bold sm:text-3xl">Pricing & options</h2><div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{review.pricing.map((p) => <div key={p.plan} className={`card-surface rounded-xl p-5 ${p.best ? "ring-2 ring-primary" : ""}`}><p className="font-semibold">{p.plan}</p><p className="mt-2 text-2xl font-extrabold">{p.price}</p><p className="mt-1 text-sm text-muted-foreground">{p.detail}</p></div>)}</div></section>
        <section className="mt-14"><h2 className="text-2xl font-bold sm:text-3xl">FAQs</h2><Accordion type="single" collapsible className="mt-5">{review.faq.map((f, i) => <AccordionItem value={`faq-${i}`} key={f.question}><AccordionTrigger>{f.question}</AccordionTrigger><AccordionContent>{f.answer}</AccordionContent></AccordionItem>)}</Accordion></section>
      </article>
      <section className="mt-16"><h2 className="text-2xl font-bold">More {category?.name ?? "reviews"}</h2><div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{related.map((r) => <ReviewCard key={r.slug} review={r} />)}</div><p className="mt-6 text-sm"><Link to="/reviews" className="font-semibold text-primary">All reviews →</Link></p></section>
    </div>
  );
}
