import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, BadgeCheck, FlaskConical, Scale, ShieldCheck, Users } from "lucide-react";
import heroImage from "@/assets/hero.jpg";
import { BlogCard } from "@/components/BlogCard";
import { CategoryGrid } from "@/components/CategoryGrid";
import { HomeSearch } from "@/components/HomeSearch";
import { Newsletter } from "@/components/Newsletter";
import { ReviewCard, ScoreBadge } from "@/components/ReviewCard";
import { StarRating } from "@/components/StarRating";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { getCategory } from "@/data/categories";
import type { Post } from "@/data/posts";
import type { Review } from "@/data/reviews";
import { fetchSiteContent } from "@/lib/content.functions";
import { testimonials } from "@/data/testimonials";

const title = "Find the Best Products Before You Buy — PrimeChoiceReviews";
const description = "Independent, hands-on product reviews, comparisons and buying guides. Real testing, transparent scoring, no paid placements.";
const amazonDealsUrl = "https://www.amazon.in/deals?ref_=nav_cs_gb";
const amazonTrendingNowUrl = "https://www.amazon.com/b?node=120697190011&ref=CG_ac_dyk_240424_Inspiration_TrendingCU&tag=rehanroshan90-20";
const digistoreMarketplaceUrl = "https://www.digistore24-app.com/app/en/affiliate/account/marketplace/all";

const homeFaq = [
  { question: "How does PrimeChoiceReviews make money?", answer: "We earn affiliate commissions when readers buy through links on this site, at no extra cost to you. Commissions never influence a score or ranking." },
  { question: "Do you actually test the products you review?", answer: "Yes. Every product is bought at full retail price through normal checkout and tested against a fixed rubric before we publish a verdict." },
  { question: "How are your ratings calculated?", answer: "Each product is scored on effectiveness, quality, value and support using the same weighting, so scores stay comparable across a category." },
  { question: "How often are reviews updated?", answer: "We revisit reviews when pricing, formulation or features change, and every published review shows its last-updated date." },
  { question: "Can brands pay for a better review?", answer: "No. We accept no paid placements, and we regularly publish low scores for products that pay high commissions." },
];

export const Route = createFileRoute("/")({
  loader: () => fetchSiteContent(),
  head: () => ({
    meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:url", content: "/" }, { name: "twitter:title", content: title }, { name: "twitter:description", content: description }],
    links: [{ rel: "canonical", href: "/" }, { rel: "preload", as: "image", href: heroImage }, { rel: "preload", as: "image", href: "/amazon-trending-now.svg" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: homeFaq.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) }) }],
  }),
  component: Index,
});

const trust = [
  { icon: FlaskConical, title: "We buy and test everything", body: "Products are purchased at full retail price through normal checkout — no vendor samples, no special treatment." },
  { icon: Scale, title: "Scores follow a fixed rubric", body: "Effectiveness, quality, value and support are weighted the same way for every product we publish." },
  { icon: BadgeCheck, title: "Commissions never buy a rating", body: "We publish low scores on high-paying products. Our disclosure sits at the top of every review, not buried in the footer." },
  { icon: Users, title: "Real testing panels", body: "Health products run through multi-person, multi-week panels so a single lucky result never becomes a headline." },
];

function SectionHead({ kicker, heading, sub, linkTo, linkLabel, id }: { kicker: string; heading: string; sub?: string; linkTo?: "/reviews" | "/blog" | "/categories"; linkLabel?: string; id: string }) {
  return <div className="rule-line flex flex-wrap items-end justify-between gap-4 pt-6"><div className="max-w-2xl"><span className="kicker">{kicker}</span><h2 id={id} className="mt-2 text-3xl font-bold sm:text-4xl">{heading}</h2>{sub && <p className="mt-2 text-muted-foreground">{sub}</p>}</div>{linkTo && <Link to={linkTo} className="group inline-flex items-center gap-1.5 font-display text-sm font-bold tracking-wide text-primary-glow uppercase">{linkLabel}<ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></Link>}</div>;
}

function Index() {
  const { reviews, posts } = Route.useLoaderData() as { reviews: Review[]; posts: Post[] };

  // One review/product can only occupy one homepage product section.
  const seen = new Set<string>();
  const unique = (items: Review[]) => items.filter((item) => {
    const key = item.slug || item.id || item.title;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  const featured = unique(reviews.filter((r) => r.featured));
  const [lead, ...rest] = featured;
  const leadCategory = lead ? getCategory(lead.category) : undefined;
  const [leadPost, ...otherPosts] = posts;
  const trending = unique([...reviews].sort((a, b) => b.rating - a.rating)).slice(0, 3);
  const latest = unique([...reviews].sort((a, b) => b.updated.localeCompare(a.updated))).slice(0, 3);
  const deals = unique(reviews).slice(0, 3);
  const brands = Array.from(new Set(reviews.map((r) => r.vendor))).slice(0, 10);

  return <>
    <section className="hero-surface relative overflow-hidden border-b border-border"><div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:py-20 lg:px-8"><div className="reveal"><span className="inline-flex items-center gap-2 rounded-md border border-border bg-background/70 px-3 py-1.5 font-display text-[11px] font-bold tracking-[0.16em] text-foreground uppercase backdrop-blur-sm"><ShieldCheck className="size-3.5 text-primary-glow" aria-hidden="true" />Independent · Reader-funded</span><h1 className="mt-6 text-[2.4rem] leading-[1.02] font-bold sm:text-5xl lg:text-[3.75rem]">Find the best products<br /><span className="text-primary-glow">before you buy</span></h1><p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">Trusted, independently tested product reviews and comparisons. We buy every product at retail, score it against a fixed rubric and publish exactly what we found.</p><div className="mt-7"><HomeSearch reviews={reviews} posts={posts} /></div><div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"><Button asChild size="lg" className="min-h-12 rounded-lg px-7 text-base"><Link to="/reviews">Browse reviews<ArrowRight className="size-4" aria-hidden="true" /></Link></Button><Button asChild size="lg" variant="outline" className="min-h-12 rounded-lg bg-background/60 px-7 text-base"><Link to="/categories">Explore categories</Link></Button></div><dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 rule-line pt-6">{[{ k: `${reviews.length}+`, v: "In-depth reviews" }, { k: "90 days", v: "Average test length" }, { k: "0", v: "Paid placements" }].map((s) => <div key={s.v}><dt className="font-display text-2xl font-bold tracking-tight text-primary-glow sm:text-3xl">{s.k}</dt><dd className="mt-1 text-xs text-muted-foreground">{s.v}</dd></div>)}</dl></div><div className="relative"><img src={heroImage} alt="PrimeChoiceReviews scoring dashboard showing product ratings and top categories" width={1600} height={1008} fetchPriority="high" decoding="async" className="w-full rounded-xl border border-border shadow-elevated" /><div className="card-surface absolute -bottom-5 left-4 hidden items-center gap-3 rounded-xl px-4 py-3 sm:flex"><span className="grid size-9 place-items-center rounded-lg bg-success/12 text-success"><BadgeCheck className="size-5" aria-hidden="true" /></span><span><span className="block font-display text-sm font-bold tracking-tight">Verified testing log</span><span className="block text-xs text-muted-foreground">Every score traceable to a test</span></span></div></div></div></section>
    <div className="border-b border-border bg-secondary/40"><div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-4 py-3 text-center font-display text-[11px] font-bold tracking-[0.16em] text-muted-foreground uppercase sm:px-6 lg:px-8"><span>Bought at retail</span><span aria-hidden="true" className="text-border">●</span><span>Multi-week panels</span><span aria-hidden="true" className="text-border">●</span><span>Fixed scoring rubric</span><span aria-hidden="true" className="hidden text-border sm:inline">●</span><span className="hidden sm:inline">Disclosure on every page</span></div></div>
    <section aria-labelledby="today-deal-heading" className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8"><a href={amazonDealsUrl} target="_blank" rel="noopener noreferrer sponsored" aria-label="Today's Best Deal — open Amazon Deals" className="group relative block overflow-hidden rounded-2xl border border-border bg-black shadow-elevated transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"><img src="/amazon-todays-best-deal.svg" alt="Today's Best Deal — shop Amazon Deals" width={1600} height={520} loading="eager" decoding="async" className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.01]" /><span id="today-deal-heading" className="sr-only">Today's Best Deal</span></a></section>
    <section aria-labelledby="amazon-trending-now-heading" className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8"><a href={amazonTrendingNowUrl} target="_blank" rel="noopener noreferrer sponsored" aria-label="Trending Now — shop Amazon US trending products" className="group relative block overflow-hidden rounded-2xl border border-border bg-black shadow-elevated transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"><img src="/amazon-trending-now.svg" alt="Trending Now — discover trending products on Amazon US" width={1600} height={520} loading="eager" decoding="async" className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.01]" /><span id="amazon-trending-now-heading" className="sr-only">Trending Now</span></a></section>
    <section aria-labelledby="digistore-all-in-one-heading" className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8"><a href={digistoreMarketplaceUrl} target="_blank" rel="noopener noreferrer sponsored" aria-label="All in One Problem Solve — open Digistore24 Marketplace" className="group relative block overflow-hidden rounded-2xl border border-border bg-background shadow-elevated transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"><img src="/digistore-all-in-one.svg" alt="All in One Problem Solve — explore Digistore24 digital solutions" width={1600} height={520} loading="eager" decoding="async" className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.01]" /><span id="digistore-all-in-one-heading" className="sr-only">All in One Problem Solve</span></a></section>
    <div className="mx-auto max-w-7xl space-y-16 px-4 py-14 sm:px-6 lg:space-y-24 lg:px-8">
      <section aria-labelledby="categories-heading"><SectionHead id="categories-heading" kicker="Browse" heading="Featured categories" sub="Every category has its own testing protocol and scoring rubric." linkTo="/categories" linkLabel="All categories" /><div className="mt-8"><CategoryGrid /></div></section>
      <section aria-labelledby="trending-heading"><SectionHead id="trending-heading" kicker="Most read" heading="Trending reviews" sub="The verdicts readers are checking most this week." linkTo="/reviews" linkLabel="All reviews" /><div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{trending.map((r, i) => <ReviewCard key={r.slug} review={r} index={i} />)}</div></section>
      <section aria-labelledby="featured-heading"><SectionHead id="featured-heading" kicker="Top rated" heading="Editor's Choice" sub="Our highest-scoring verdicts from the last 90 days of testing." linkTo="/reviews" linkLabel="All reviews" />{lead && <article className="card-surface group relative mt-8 grid overflow-hidden rounded-2xl lg:grid-cols-2 hover:border-primary/30 hover:shadow-elevated"><Link to="/reviews/$slug" params={{ slug: lead.slug }} tabIndex={-1} aria-hidden="true" className="relative block overflow-hidden bg-secondary"><img src={lead.image} alt="" width={1024} height={768} decoding="async" className="h-full min-h-64 w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" /><span className="absolute top-4 left-4 rounded-md bg-primary px-3 py-1.5 font-display text-[10px] font-bold tracking-[0.16em] text-primary-foreground uppercase">Editor's pick</span></Link><div className="flex flex-col justify-center gap-4 p-6 sm:p-10"><div className="flex flex-wrap items-center gap-3"><span className="kicker">{leadCategory?.name}</span><ScoreBadge rating={lead.rating} /></div><h3 className="font-display text-2xl leading-tight font-bold tracking-tight sm:text-3xl"><Link to="/reviews/$slug" params={{ slug: lead.slug }} className="editorial-underline"><span className="absolute inset-0" aria-hidden="true" />{lead.title}</Link></h3><StarRating rating={lead.rating} /><p className="text-sm leading-relaxed text-muted-foreground sm:text-base">{lead.excerpt}</p><ul className="grid gap-2 text-sm sm:grid-cols-2">{lead.pros.slice(0, 4).map((pro) => <li key={pro} className="flex items-start gap-2 text-muted-foreground"><BadgeCheck className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" /><span className="line-clamp-1">{pro}</span></li>)}</ul><span className="inline-flex items-center gap-1.5 font-display text-sm font-bold tracking-wide text-primary-glow uppercase">Read the full verdict<ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" /></span></div></article>}<div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{rest.map((r, i) => <ReviewCard key={r.slug} review={r} index={i} />)}</div></section>
      <section aria-labelledby="latest-heading"><SectionHead id="latest-heading" kicker="Just published" heading="Latest reviews" sub="Freshly tested products, newest verdicts first." linkTo="/reviews" linkLabel="All reviews" /><div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{latest.map((r, i) => <ReviewCard key={r.slug} review={r} index={i} />)}</div></section>
      <section aria-labelledby="deals-heading"><SectionHead id="deals-heading" kicker="Save more" heading="Best deals right now" sub="Current vendor pricing we verified at checkout. Prices change without notice." /><div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{deals.map((r, i) => <ReviewCard key={r.slug} review={r} index={i} />)}</div></section>
      <section aria-labelledby="trust-heading"><SectionHead id="trust-heading" kicker="Our standard" heading="Why readers trust PrimeChoiceReviews" sub="A transparent process, built to keep affiliate incentives out of the verdict." /><div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{trust.map(({ icon: Icon, title, body }) => <div key={title} className="card-surface rounded-2xl p-6"><Icon className="size-6 text-primary-glow" aria-hidden="true" /><h3 className="mt-4 font-display text-base font-bold">{title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p></div>)}</div></section>
      {leadPost && <section aria-labelledby="blog-heading"><SectionHead id="blog-heading" kicker="From the journal" heading="Latest guides" sub="Practical buying advice, testing notes and explainers." linkTo="/blog" linkLabel="All guides" /><div className="mt-8 grid gap-6 lg:grid-cols-3"><BlogCard post={leadPost} index={0} />{otherPosts.slice(0, 2).map((p, i) => <BlogCard key={p.slug} post={p} index={i + 1} />)}</div></section>}
      <section aria-labelledby="brands-heading"><SectionHead id="brands-heading" kicker="Reviewed" heading="Brands we've tested" sub="A growing library of products reviewed against the same standards." /><div className="mt-8 flex flex-wrap gap-3">{brands.map((brand) => <Link key={brand} to="/reviews" className="rounded-full border border-border bg-secondary/50 px-4 py-2 font-display text-xs font-bold tracking-wide text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground">{brand}</Link>)}</div></section>
      <section aria-labelledby="testimonials-heading"><SectionHead id="testimonials-heading" kicker="Reader notes" heading="What our readers say" /><div className="mt-8 grid gap-6 md:grid-cols-3">{testimonials.slice(0, 3).map((t) => <figure key={t.name} className="card-surface rounded-2xl p-6"><div className="flex items-center gap-2 text-primary-glow"><StarRating rating={5} /></div><blockquote className="mt-4 text-sm leading-relaxed text-muted-foreground">“{t.quote}”</blockquote><figcaption className="mt-5 font-display text-xs font-bold tracking-wide">{t.name}</figcaption></figure>)}</div></section>
      <section aria-labelledby="faq-heading"><SectionHead id="faq-heading" kicker="Questions" heading="Frequently asked questions" /><div className="mt-8 max-w-3xl"><Accordion type="single" collapsible>{homeFaq.map((f, i) => <AccordionItem key={f.question} value={`faq-${i}`}><AccordionTrigger>{f.question}</AccordionTrigger><AccordionContent>{f.answer}</AccordionContent></AccordionItem>)}</Accordion></div></section>
      <Newsletter />
    </div>
  </>;
}
