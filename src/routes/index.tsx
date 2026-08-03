import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  FlaskConical,
  Quote,
  Scale,
  Users,
  Star,
} from "lucide-react";
import heroImage from "@/assets/hero.jpg";
import { BlogCard } from "@/components/BlogCard";
import { CategoryGrid } from "@/components/CategoryGrid";
import { Newsletter } from "@/components/Newsletter";
import { ReviewCard } from "@/components/ReviewCard";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
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
    links: [{ rel: "canonical", href: "/" }],
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

function Index() {
  const featured = featuredReviews();
  return (
    <>
      <section className="hero-surface relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24 lg:px-8">
          <div className="animate-rise">
            <span className="glass-card inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide text-primary uppercase">
              <Star className="size-3.5 fill-primary" aria-hidden="true" />
              Trusted by readers in 40+ countries
            </span>
            <h1 className="mt-5 text-4xl leading-[1.05] font-extrabold sm:text-5xl lg:text-6xl">
              Honest reviews.
              <br />
              <span className="gradient-text">Smarter choices.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
              We buy the products, run them through a fixed 90-day methodology and publish what we
              actually found — including the parts vendors would rather we left out.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="min-h-12 rounded-full px-7 text-base">
                <Link to="/reviews">
                  Browse reviews
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="min-h-12 rounded-full bg-background/60 px-7 text-base"
              >
                <Link to="/categories">Explore categories</Link>
              </Button>
            </div>
            <dl className="mt-10 grid max-w-md grid-cols-3 gap-4">
              {[
                { k: `${reviews.length}+`, v: "In-depth reviews" },
                { k: "90 days", v: "Average test length" },
                { k: "0", v: "Paid placements" },
              ].map((s) => (
                <div key={s.v}>
                  <dt className="font-display text-2xl font-extrabold text-primary">{s.k}</dt>
                  <dd className="text-xs text-muted-foreground">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative">
            <img
              src={heroImage}
              alt="Product review dashboard showing ratings and top categories"
              width={1600}
              height={1008}
              fetchPriority="high"
              className="w-full rounded-3xl shadow-elevated"
            />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-20 px-4 py-16 sm:px-6 lg:space-y-28 lg:px-8">
        <section aria-labelledby="featured-heading">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 id="featured-heading" className="text-3xl font-bold sm:text-4xl">
                Featured reviews
              </h2>
              <p className="mt-2 text-muted-foreground">
                Our highest-scoring verdicts from the last 90 days of testing.
              </p>
            </div>
            <Link
              to="/reviews"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
            >
              All reviews <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((r) => (
              <ReviewCard key={r.slug} review={r} />
            ))}
          </div>
        </section>

        <section aria-labelledby="categories-heading">
          <h2 id="categories-heading" className="text-3xl font-bold sm:text-4xl">
            Top categories
          </h2>
          <p className="mt-2 text-muted-foreground">
            Nine areas we cover in depth, each with its own testing protocol.
          </p>
          <div className="mt-8">
            <CategoryGrid />
          </div>
        </section>

        <section aria-labelledby="trust-heading" className="glass-card rounded-3xl p-8 sm:p-12">
          <h2 id="trust-heading" className="text-3xl font-bold sm:text-4xl">
            Why readers trust us
          </h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            {siteConfig.name} exists because most affiliate reviews are rewritten sales pages. Here
            is how we do it differently.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {trust.map(({ icon: Icon, title: t, body }) => (
              <div key={t} className="flex gap-4">
                <span
                  className="grid size-11 shrink-0 place-items-center rounded-xl text-primary-foreground"
                  style={{ backgroundImage: "var(--gradient-primary)" }}
                >
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <h3 className="font-semibold">{t}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="blog-heading">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 id="blog-heading" className="text-3xl font-bold sm:text-4xl">
                Latest from the blog
              </h2>
              <p className="mt-2 text-muted-foreground">
                Buying guides, methodology notes and category deep-dives.
              </p>
            </div>
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
            >
              All articles <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {posts.map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
        </section>

        <section aria-labelledby="testimonials-heading">
          <h2 id="testimonials-heading" className="text-3xl font-bold sm:text-4xl">
            What readers say
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((t) => (
              <figure key={t.name} className="glass-card flex h-full flex-col rounded-2xl p-6">
                <Quote className="size-6 text-primary" aria-hidden="true" />
                <blockquote className="mt-3 flex-1 text-sm text-muted-foreground">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-full bg-accent text-sm font-bold text-accent-foreground">
                    {t.initials}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold">{t.name}</span>
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
