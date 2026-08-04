import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  FlaskConical,
  Quote,
  Scale,
  ShieldCheck,
  Users,
} from "lucide-react";
import heroImage from "@/assets/hero.jpg";
import { BlogCard } from "@/components/BlogCard";
import { CategoryGrid } from "@/components/CategoryGrid";
import { Newsletter } from "@/components/Newsletter";
import { ReviewCard, ScoreBadge } from "@/components/ReviewCard";
import { StarRating } from "@/components/StarRating";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { getCategory } from "@/data/categories";
import { posts } from "@/data/posts";
import { featuredReviews, reviews } from "@/data/reviews";
import { testimonials } from "@/data/testimonials";

const title = "PrimeChoiceReviews — Honest Reviews. Smarter Choices.";
const description =
  "Independent, hands-on product reviews across health, AI tools, software, finance and fitness. Real testing, transparent scoring, no hype.";

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
      { rel: "preload", as: "image", href: heroImage, fetchpriority: "high" },
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
            <h1 className="mt-6 text-[2.6rem] leading-[0.98] font-bold sm:text-6xl lg:text-[4.25rem]">
              Honest reviews.
              <br />
              <span className="text-primary-glow">Smarter choices.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              We buy the products, run them through a fixed 90-day methodology and publish what we
              actually found — including the parts vendors would rather we left out.
            </p>
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
        {/* Featured — magazine lead + grid */}
        <section aria-labelledby="featured-heading">
          <SectionHead
            id="featured-heading"
            kicker="Top rated"
            heading="Featured reviews"
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

        {/* Categories */}
        <section aria-labelledby="categories-heading">
          <SectionHead
            id="categories-heading"
            kicker="Browse"
            heading="Top categories"
            sub="Nine areas we cover in depth, each with its own testing protocol."
            linkTo="/categories"
            linkLabel="All categories"
          />
          <div className="mt-8">
            <CategoryGrid />
          </div>
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
