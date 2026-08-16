import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Check, Star } from "lucide-react";
import productImage from "@/assets/product-health.jpg";
import { Button } from "@/components/ui/button";

const testProduct = {
  title: "PrimeChoice Test Product",
  slug: "primechoice-test-product",
  description:
    "Demo product used only to verify the PrimeChoiceReviews product display, pricing, rating and affiliate CTA flow before connecting live products to Supabase.",
  price: 49.99,
  currency: "USD",
  rating: 4.7,
  category: "Health & Wellness",
  brand: "PrimeChoice Demo",
  affiliateUrl: "https://example.com/test-affiliate-link",
  image: productImage,
  pros: [
    "Responsive product card layout",
    "Affiliate CTA ready",
    "Mobile-friendly presentation",
    "Safe demo data with no real purchase flow",
  ],
};

export const Route = createFileRoute("/test-product")({
  head: () => ({
    meta: [
      { title: "PrimeChoice Test Product | PrimeChoiceReviews" },
      {
        name: "description",
        content: "Demo product page for testing the PrimeChoiceReviews product display and affiliate CTA.",
      },
    ],
  }),
  component: TestProductPage,
});

function TestProductPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-6 rounded-lg border border-warning/30 bg-warning/10 px-4 py-3 text-sm text-muted-foreground">
        TEST PRODUCT — This is demo content only. The affiliate URL is a placeholder and should be
        replaced with a real affiliate link before launch.
      </div>

      <article className="grid overflow-hidden rounded-2xl border border-border bg-card shadow-elevated lg:grid-cols-2">
        <div className="bg-secondary p-6 sm:p-10">
          <img
            src={testProduct.image}
            alt={testProduct.title}
            width={1024}
            height={768}
            className="h-full max-h-[520px] w-full rounded-xl object-cover"
          />
        </div>

        <div className="flex flex-col p-6 sm:p-10">
          <span className="kicker">{testProduct.category}</span>
          <p className="mt-2 text-sm text-muted-foreground">Brand: {testProduct.brand}</p>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">{testProduct.title}</h1>

          <div className="mt-4 flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2.5 py-1 font-display text-sm font-bold">
              <Star className="size-4 fill-current" aria-hidden="true" />
              {testProduct.rating}/5
            </span>
            <span className="text-sm text-muted-foreground">Demo rating</span>
          </div>

          <p className="mt-6 leading-relaxed text-muted-foreground">{testProduct.description}</p>

          <ul className="mt-6 space-y-3">
            {testProduct.pros.map((pro) => (
              <li key={pro} className="flex items-start gap-2 text-sm">
                <Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
                {pro}
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-8">
            <div className="mb-5 flex items-end gap-2">
              <span className="text-3xl font-bold">${testProduct.price.toFixed(2)}</span>
              <span className="pb-1 text-sm text-muted-foreground">{testProduct.currency}</span>
            </div>

            <Button asChild size="lg" className="w-full rounded-lg sm:w-auto">
              <a href={testProduct.affiliateUrl} target="_blank" rel="nofollow sponsored noopener">
                Test Affiliate Button
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>
      </article>

      <div className="mt-8">
        <Button asChild variant="outline">
          <Link to="/">← Back to PrimeChoiceReviews</Link>
        </Button>
      </div>
    </main>
  );
}
