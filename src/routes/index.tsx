import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Flame,
  FlaskConical,
  Quote,
  Scale,
  ShieldCheck,
  Tag,
  Users,
} from "lucide-react";
import heroImage from "@/assets/hero.jpg";
import { BlogCard } from "@/components/BlogCard";
import { CategoryGrid } from "@/components/CategoryGrid";
import { HomeSearch } from "@/components/HomeSearch";
import { Newsletter } from "@/components/Newsletter";
import { ReviewCard, ScoreBadge } from "@/components/ReviewCard";
import { StarRating } from "@/components/StarRating";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { getCategory } from "@/data/categories";
import { posts } from "@/data/posts";
import { featuredReviews, reviews } from "@/data/reviews";
import { testimonials } from "@/data/testimonials";

const title = "Find the Best Products Before You Buy — PrimeChoiceReviews";
const description =
  "Independent, hands-on product reviews, comparisons and buying guides. Real testing, transparent scoring, no paid placements.";

const homeFaq = [
  {
    question: "How does PrimeChoiceReviews make money?",
    answer:
      "We earn affiliate commissions when readers buy through links on this site, at no extra cost to you. Commissions never influence a score or ranking.",
  },
  {
    question: "Do you actually test the products you review?",
    answer:
      "Yes. Every product is bought at full retail price through normal checkout and tested against a fixed rubric before we publish a verdict.",
  },
  {
    question: "How are your ratings calculated?",
    answer:
      "Each product is scored on effectiveness, quality, value and support using the same weighting, so scores stay comparable across a category.",
  },
  {
    question: "How often are reviews updated?",
    answer:
      "We revisit reviews when pricing, formulation or features change, and every published review shows its last-updated date.",
  },
  {
    question: "Can brands pay for a better review?",
    answer:
      "No. We accept no paid placements, and we regularly publish low scores for products that pay high commissions.",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "preload", as: "image", href: heroImage },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: homeFaq.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }),
      },
    ],
  }),
  component: Index,
});

const trust = [
  {
    icon: FlaskConical,
    title: "We buy and test everything",
    body: "Products are purchased at full retail price through normal checkout — no vendor samples, no special treatment.",
  },
  {
    icon: Scale,
    title: "Scores follow a fixed rubric",
    body: "Effectiveness, quality, value and support are weighted the same way for every product we publish.",
  },
  {
    icon: BadgeCheck,
    title: "Commissions never buy a rating",
    body: "We publish low scores on high-paying products. Our disclosure sits at the top of every review, not buried in the footer.",
  },
  {
    icon: Users,
    title: "Real testing panels",
    body: "Health products run through multi-person, multi-week panels so a single lucky result never becomes a headline.",
  },
];

function SectionHead({
  kicker,
  heading,
  sub,
  linkTo,
  linkLabel,
  id,
}: {
  kicker: string;
  heading: string;
  sub?: string;
  linkTo?: "/reviews" | "/blog" | "/categories";
  linkLabel?: string;
  id: string;
}) {
  return (
    <div className="rule-line flex flex-wrap items-end justify-between gap-4 pt-6">
      <div className="max-w-2xl">
        <span className="kicker">{kicker}</span>
        <h2 id={id} className="mt-2 text-3xl font-bold sm:text-4xl">
          {heading}
        </h2>
        {sub && <p className="mt-2 text-muted-foreground">{sub}</p>}
      </div>
      {linkTo && (
        <Link
          to={linkTo}
          className="group inline-flex items-center gap-1.5 font-display text-sm font-bold tracking-wide text-primary-glow uppercase"
        >
          {linkLabel}
          <ArrowRight
            className="size-4 transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      )}
    </div>
  );
}

function Index() {
  const featured = featuredReviews();
  const [lead, ...rest] = featured;
  const leadCategory = lead ? getCategory(lead.category) : undefined;
  const [leadPost, ...otherPosts] = posts;
  const trending = [...reviews].sort((a, b) => b.rating - a.rating).slice(0, 3);
  const latest = [...reviews]
    .sort((a, b) => b.updated.localeCompare(a.updated))
    .slice(0, 3);
  const deals = reviews.slice(0, 3);
  const brands = Array.from(new Set(reviews.map((r) => r.vendor))).slice(0, 10);

  return (
    <>
      {/* Hero */}
      <section className="hero-surface relative overflow-hidden border-b border-border">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:py-20 lg:px-8">
          <div className="reveal">
            <span className="inline-flex items-center gap-2 rounded-md border border-border bg-background/70 px-3 py-1.5 font-display text-[11px] font-bold tracking-[0.16em] text-foreground uppercase backdrop-blur-sm">
              <ShieldCheck className="size-3.5 text-primary-glow" aria-hidden="true" />
              Independent · Reader-funded
            </span>
            <h1 className="mt-6 text-[2.4rem] leading-[1.02] font-bold sm:text-5xl lg:text-[3.75rem]">
              Find the best products
              <br />
              <span className="text-primary-glow">before you buy</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Trusted, independently tested product reviews and comparisons. We buy every product at
              retail, score it against a fixed rubric and publish exactly what we found.
            </p>
            <div className="mt-7">
              <HomeSearch />
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button asChild size="lg" className="min-h-12 rounded-lg px-7 text-base">
                <Link to="/reviews">
                  Browse reviews
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="min-h-12 rounded-lg bg-background/60 px-7 text-base"
              >
                <Link to="/categories">Explore categories</Link>
              </Button>
            </div>
            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 rule-line pt-6">
              {[
                { k: `${reviews.length}+`, v: "In-depth reviews" },
                { k: "90 days", v: "Average test length" },
                { k: "0", v: "Paid placements" },
              ].map((s) => (
                <div key={s.v}>
                  <dt className="font-display text-2xl font-bold tracking-tight text-primary-glow sm:text-3xl">
                    {s.k}
                  </dt>
                  <dd className="mt-1 text-xs text-muted-foreground">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <img
              src={heroImage}
              alt="PrimeChoiceReviews scoring dashboard showing product ratings and top categories"
              width={1600}
              height={1008}
              fetchPriority="high"
              decoding="async"
              className="w-full rounded-xl border border-border shadow-elevated"
            />
            <div className="card-surface absolute -bottom-5 left-4 hidden items-center gap-3 rounded-xl px-4 py-3 sm:flex">
              <span className="grid size-9 place-items-center rounded-lg bg-success/12 text-success">
                <BadgeCheck className="size-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block font-display text-sm font-bold tracking-tight">
                  Verified testing log
                </span>
                <span className="block text-xs text-muted-foreground">
                  Every score traceable to a test
                </span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <div className="border-b border-border bg-secondary/40">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-4 py-3 text-center font-display text-[11px] font-bold tracking-[0.16em] text-muted-foreground uppercase sm:px-6 lg:px-8">
          <span>Bought at retail</span>
          <span aria-hidden="true" className="text-border">
            ●
          </span>
          <span>Multi-week panels</span>
          <span aria-hidden="true" className="text-border">
            ●
          </span>
          <span>Fixed scoring rubric</span>
          <span aria-hidden="true" className="hidden text-border sm:inline">
            ●
          </span>
          <span className="hidden sm:inline">Disclosure on every page</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl space-y-16 px-4 py-14 sm:px-6 lg:space-y-24 lg:px-8">
        {/* Featured categories */}
        <section aria-labelledby="categories-heading">
          <SectionHead
            id="categories-heading"
            kicker="Browse"
            heading="Featured categories"
            sub="Every category has its own testing protocol and scoring rubric."
            linkTo="/categories"
            linkLabel="All categories"
          />
          <div className="mt-8">
            <CategoryGrid />
          </div>
        </section>

        {/* Trending */}
        <section aria-labelledby="trending-heading">
          <SectionHead
            id="trending-heading"
            kicker="Most read"
            heading="Trending reviews"
            sub="The verdicts readers are checking most this week."
            linkTo="/reviews"
            linkLabel="All reviews"
          />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {trending.map((r, i) => (
              <ReviewCard key={r.slug} review={r} index={i} />
            ))}
          </div>
        </section>

        {/* Featured — magazine lead + grid */}
        <section aria-labelledby="featured-heading">
          <SectionHead
            id="featured-heading"
            kicker="Top rated"
            heading="Editor's Choice"
            sub="Our highest-scoring verdicts from the last 90 days of testing."
            linkTo="/reviews"
            linkLabel="All reviews"
          />

          {lead && (
            <article className="card-surface group relative mt-8 grid overflow-hidden rounded-2xl lg:grid-cols-2 hover:border-primary/30 hover:shadow-elevated">
              <Link
                to="/reviews/$slug"
                params={{ slug: lead.slug }}
                tabIndex={-1}
                aria-hidden="true"
                className="relative block overflow-hidden bg-secondary"
              >
                <img
                  src={lead.image}
                  alt=""
                  width={1024}
                  height={768}
                  decoding="async"
                  className="h-full min-h-64 w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <span className="absolute top-4 left-4 rounded-md bg-primary px-3 py-1.5 font-display text-[10px] font-bold tracking-[0.16em] text-primary-foreground uppercase">
                  Editor's pick
                </span>
              </Link>
              <div className="flex flex-col justify-center gap-4 p-6 sm:p-10">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="kicker">{leadCategory?.name}</span>
                  <ScoreBadge rating={lead.rating} />
                </div>
                <h3 className="font-display text-2xl leading-tight font-bold tracking-tight sm:text-3xl">
                  <Link
                    to="/reviews/$slug"
                    params={{ slug: lead.slug }}
                    className="editorial-underline"
                  >
                    <span className="absolute inset-0" aria-hidden="true" />
                    {lead.title}
                  </Link>
                </h3>
                <StarRating rating={lead.rating} />
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {lead.excerpt}
                </p>
                <ul className="grid gap-2 text-sm sm:grid-cols-2">
                  {lead.pros.slice(0, 4).map((pro) => (
                    <li key={pro} className="flex items-start gap-2 text-muted-foreground">
                      <BadgeCheck
                        className="mt-0.5 size-4 shrink-0 text-success"
                        aria-hidden="true"
                      />
                      <span className="line-clamp-1">{pro}</span>
                    </li>
                  ))}
                </ul>
                <span className="inline-flex items-center gap-1.5 font-display text-sm font-bold tracking-wide text-primary-glow uppercase">
                  Read the full verdict
                  <ArrowUpRight
                    className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </article>
          )}

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((r, i) => (
              <ReviewCard key={r.slug} review={r} index={i} />
            ))}
          </div>
        </section>

        {/* Latest reviews */}
        <section aria-labelledby="latest-heading">
          <SectionHead
            id="latest-heading"
            kicker="Just published"
            heading="Latest reviews"
            sub="Freshly tested products, newest verdicts first."
            linkTo="/reviews"
            linkLabel="All reviews"
          />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((r, i) => (
              <ReviewCard key={r.slug} review={r} index={i} />
            ))}
          </div>
        </section>

        {/* Best deals */}
        <section aria-labelledby="deals-heading">
          <SectionHead
            id="deals-heading"
            kicker="Save more"
            heading="Best deals right now"
            sub="Current vendor pricing we verified at checkout. Prices change without notice."
          />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {deals.map((r) => {
              const best = r.pricing.find((p) => p.best) ?? r.pricing[0];
              return (
                <article
                  key={r.slug}
                  className="card-surface relative flex flex-col gap-3 rounded-xl p-6 hover:-translate-y-1 hover:border-primary/30 hover:shadow-elevated"
                >
                  <span className="inline-flex w-fit items-center gap-1.5 rounded-md bg-success/12 px-2.5 py-1 font-display text-[10px] font-bold tracking-[0.16em] text-success uppercase">
                    <Tag className="size-3" aria-hidden="true" />
                    Best value tier
                  </span>
                  <h3 className="font-display text-lg leading-snug font-bold tracking-tight">
                    <Link
                      to="/reviews/$slug"
                      params={{ slug: r.slug }}
                      className="editorial-underline"
                    >
                      <span className="absolute inset-0" aria-hidden="true" />
                      {r.product}
                    </Link>
                  </h3>
                  <p className="text-sm text-muted-foreground">{best?.detail}</p>
                  <p className="mt-auto flex items-baseline gap-2 rule-line pt-4">
                    <span className="font-display text-2xl font-bold tracking-tight text-primary-glow">
                      {best?.price}
                    </span>
                    <span className="text-xs text-muted-foreground">{best?.plan} package</span>
                  </p>
                </article>
              );
            })}
          </div>
          <div className="card-surface mt-6 flex flex-col items-start gap-3 rounded-xl p-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-2.5 text-sm text-muted-foreground">
              <Flame className="size-5 shrink-0 text-warning" aria-hidden="true" />
              Deal alerts and coupon drops go out to our newsletter first — no spam, unsubscribe any
              time.
            </p>
            <Button asChild variant="outline" className="min-h-11 rounded-lg">
              <Link to="/reviews">See all discounted picks</Link>
            </Button>
          </div>
        </section>

        {/* Popular brands */}
        <section aria-labelledby="brands-heading">
          <SectionHead
            id="brands-heading"
            kicker="Vendors"
            heading="Popular brands we've tested"
          />
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {brands.map((b) => (
              <li
                key={b}
                className="card-surface grid min-h-20 place-items-center rounded-xl px-4 py-5 text-center font-display text-sm font-bold tracking-tight"
              >
                {b}
              </li>
            ))}
          </ul>
        </section>

        {/* Why trust us */}
        <section
          aria-labelledby="trust-heading"
          className="overflow-hidden rounded-2xl border border-border bg-primary p-8 text-primary-foreground sm:p-12"
        >
          <span className="kicker text-primary-foreground/70">Our methodology</span>
          <h2 id="trust-heading" className="mt-2 text-3xl font-bold sm:text-4xl">
            Why readers trust us
          </h2>
          <p className="mt-3 max-w-2xl text-primary-foreground/75">
            {siteConfig.name} exists because most affiliate reviews are rewritten sales pages. Here
            is how we do it differently.
          </p>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {trust.map(({ icon: Icon, title: t, body }) => (
              <div key={t} className="flex gap-4 border-t border-primary-foreground/15 pt-5">
                <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-primary-foreground/12 ring-1 ring-primary-foreground/20">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <h3 className="font-display font-bold tracking-tight">{t}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-primary-foreground/70">
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Blog — magazine lead + list */}
        <section aria-labelledby="blog-heading">
          <SectionHead
            id="blog-heading"
            kicker="Insights"
            heading="Latest from the blog"
            sub="Buying guides, methodology notes and category deep-dives."
            linkTo="/blog"
            linkLabel="All articles"
          />
          <div className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_1fr]">
            {leadPost && <BlogCard post={leadPost} />}
            <div className="flex flex-col">
              {otherPosts.map((p) => (
                <BlogCard key={p.slug} post={p} compact />
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section aria-labelledby="testimonials-heading">
          <SectionHead
            id="testimonials-heading"
            kicker="Reader voices"
            heading="What readers say"
          />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((t) => (
              <figure key={t.name} className="card-surface flex h-full flex-col rounded-xl p-6">
                <Quote className="size-6 text-primary-glow" aria-hidden="true" />
                <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3 rule-line pt-4">
                  <span className="grid size-10 place-items-center rounded-full bg-accent font-display text-sm font-bold text-accent-foreground">
                    {t.initials}
                  </span>
                  <span>
                    <span className="block font-display text-sm font-bold tracking-tight">
                      {t.name}
                    </span>
                    <span className="block text-xs text-muted-foreground">{t.location}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <Newsletter />
      </div>
    </>
  );
}
