import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const title = "About PrimeChoiceReviews — Our Testing Methodology";
const description =
  "Who we are, how we test products, and the editorial rules that keep our reviews independent from affiliate commissions.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/about" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "About" }]} />
      <h1 className="text-4xl font-extrabold sm:text-5xl">About us</h1>
      <p className="mt-4 text-lg text-muted-foreground">{description}</p>
      <div className="mt-10 space-y-8 text-muted-foreground">
        <section>
          <h2 className="text-xl font-bold text-foreground">Why we exist</h2>
          <p className="mt-3">
            Most product reviews online are rewritten sales pages. We started PrimeChoiceReviews to
            do the boring work instead: buy the product, use it for weeks, document what happened
            and publish the result whether or not it flatters the vendor.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-foreground">How we test</h2>
          <p className="mt-3">
            Every review follows a four-stage process: a label or feature audit, a real usage period
            of up to 90 days, a value and refund check, then scoring against a fixed rubric —
            effectiveness 40%, quality 25%, value 20%, support 15%.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-foreground">How we make money</h2>
          <p className="mt-3">
            We earn affiliate commissions when readers buy through our links, at no extra cost to
            them. Commission rates never affect scores, and we regularly publish low ratings for
            products that pay well.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-foreground">Who we write for</h2>
          <p className="mt-3">
            Readers across the USA, UK, Canada, Australia and Europe. Pricing is quoted in the
            vendor's currency and we flag regional availability wherever it differs.
          </p>
        </section>
      </div>
    </div>
  );
}