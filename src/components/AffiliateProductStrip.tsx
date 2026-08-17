import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Star } from "lucide-react";
import { AffiliateButton } from "@/components/AffiliateButton";
import { Badge } from "@/components/ui/badge";
import { fetchProducts, type Product } from "@/lib/content.functions";
import { imageFor } from "@/lib/images";

function networkLabel(product: Product) {
  const network = product.affiliateLinks.find((link) => link.enabled !== false)?.network;
  if (network === "amazon") return product.region === "in" ? "Amazon India" : "Amazon US";
  if (network === "digistore24") return "Digistore24";
  return "Affiliate Pick";
}

function productImage(product: Product) {
  const image = product.images.find((value) => typeof value === "string" && value.trim());
  return imageFor(image || "/product-placeholder.svg");
}

function ProductCard({ product }: { product: Product }) {
  const affiliate = product.affiliateLinks.find((link) => link.enabled !== false)?.url;
  const image = productImage(product);
  const network = networkLabel(product);

  return (
    <article className="card-surface group flex h-full flex-col overflow-hidden rounded-2xl border-border/80 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-elevated">
      <a
        href={affiliate || "#"}
        target={affiliate ? "_blank" : undefined}
        rel={affiliate ? "nofollow sponsored noopener noreferrer" : undefined}
        className="relative block aspect-[4/3] overflow-hidden bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        aria-label={`View ${product.title}`}
      >
        <img
          src={image}
          alt={product.title}
          width={800}
          height={600}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          onError={(event) => {
            const target = event.currentTarget;
            if (target.src.endsWith("/product-placeholder.svg")) return;
            target.src = "/product-placeholder.svg";
          }}
        />
        <Badge className="absolute left-3 top-3 border-border/60 bg-background/90 text-foreground shadow-sm backdrop-blur-sm">
          {network}
        </Badge>
      </a>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
          <span className="truncate">{product.brand || product.category || "Featured product"}</span>
          {product.rating > 0 && (
            <span className="inline-flex shrink-0 items-center gap-1 font-display font-bold text-foreground">
              <Star className="size-3.5 fill-current text-warning" aria-hidden="true" />
              {product.rating.toFixed(1)}
            </span>
          )}
        </div>
        <h3 className="line-clamp-2 font-display text-lg font-bold leading-tight tracking-tight">
          {product.title}
        </h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {product.description || "Explore the key features, pricing and buying details before you decide."}
        </p>
        {product.price != null && (
          <p className="mt-auto font-display text-2xl font-bold tracking-tight text-primary-glow">
            {product.currency === "INR" ? "₹" : product.currency === "USD" ? "$" : `${product.currency} `}
            {product.price.toLocaleString()}
          </p>
        )}
        <AffiliateButton
          productId={product.id}
          href={affiliate}
          label="View Deal"
          showDisclosure={false}
          path="/"
        />
      </div>
    </article>
  );
}

export function AffiliateProductStrip() {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["homepage-affiliate-products"],
    queryFn: fetchProducts,
    staleTime: 60_000,
  });

  if (isLoading || products.length === 0) return null;

  return (
    <section aria-labelledby="affiliate-picks-heading" className="border-y border-border bg-secondary/25 py-12 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <span className="kicker">Smart shopping</span>
            <h2 id="affiliate-picks-heading" className="mt-2 text-3xl font-bold sm:text-4xl">
              Latest Affiliate Picks
            </h2>
            <p className="mt-2 text-muted-foreground">
              Hand-picked products and offers added through the PrimeChoiceReviews admin panel.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 font-display text-xs font-bold tracking-[0.14em] text-muted-foreground uppercase">
            Updated automatically
            <ArrowRight className="size-4" aria-hidden="true" />
          </span>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.slice(0, 6).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
