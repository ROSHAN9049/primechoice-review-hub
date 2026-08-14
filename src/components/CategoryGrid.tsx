import { Link, useLocation } from "@tanstack/react-router";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { categories } from "@/data/categories";
import { reviewsByCategory } from "@/data/reviews";
import { fetchProducts, type Product } from "@/lib/content.functions";
import { AffiliateButton } from "@/components/AffiliateButton";

function ProductShowcase() {
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["public", "products"],
    queryFn: () => fetchProducts(),
    staleTime: 60_000,
  });

  if (isLoading || products.length === 0) return null;

  return (
    <section className="mt-10" aria-labelledby="published-products-heading">
      <div className="rule-line flex flex-wrap items-end justify-between gap-4 pt-6">
        <div>
          <span className="kicker">Shop the latest</span>
          <h2 id="published-products-heading" className="mt-2 text-2xl font-bold sm:text-3xl">
            Published products
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Products published from the Admin Panel appear here automatically.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.slice(0, 6).map((product) => {
          const digistore = product.affiliateLinks.find(
            (link) => link.network?.toLowerCase() === "digistore24" && link.enabled !== false,
          );
          const productId = digistore?.productId;
          const image = product.images[0];

          return (
            <article key={product.id} className="card-surface flex h-full flex-col overflow-hidden rounded-xl">
              {image ? (
                <img src={image} alt={product.title} loading="lazy" className="aspect-[4/3] w-full object-cover" />
              ) : (
                <div className="grid aspect-[4/3] place-items-center bg-secondary text-sm text-muted-foreground">
                  Product image
                </div>
              )}
              <div className="flex flex-1 flex-col gap-3 p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="kicker">{product.category || "Product"}</span>
                  {product.rating > 0 && <span className="text-sm font-bold text-primary-glow">{product.rating.toFixed(1)}/5</span>}
                </div>
                <h3 className="font-display text-lg font-bold tracking-tight">{product.title}</h3>
                {product.description && <p className="line-clamp-3 text-sm text-muted-foreground">{product.description}</p>}

                <div className="mt-auto space-y-3 pt-2">
                  {product.reviewSlug ? (
                    <Link
                      to="/reviews/$slug"
                      params={{ slug: product.reviewSlug }}
                      className="inline-flex min-h-11 w-full items-center justify-center rounded-lg border border-border px-4 py-2.5 font-display text-sm font-bold uppercase transition-colors hover:border-primary/40 hover:text-primary-glow"
                    >
                      Read Review
                    </Link>
                  ) : (
                    <span className="inline-flex min-h-11 w-full items-center justify-center rounded-lg border border-dashed border-border px-4 py-2.5 text-center text-xs font-semibold text-muted-foreground">
                      Review not published yet
                    </span>
                  )}
                  {productId ? (
                    <AffiliateButton productId={productId} label="Buy Now / Check Price" path={`/products/${product.slug}`} />
                  ) : (
                    <span className="block rounded-lg bg-secondary px-4 py-3 text-center text-xs text-muted-foreground">
                      Add the Digistore24 Product ID in Admin to enable Buy Now.
                    </span>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export function CategoryGrid() {
  const location = useLocation();

  return (
    <>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => {
          const Icon = ((Icons as unknown as Record<string, LucideIcon>)[c.icon] ?? Icons.Tag) as LucideIcon;
          const count = reviewsByCategory(c.slug).length;
          return (
            <li key={c.slug}>
              <Link
                to="/categories/$slug"
                params={{ slug: c.slug }}
                className="card-surface group flex h-full items-start gap-4 rounded-xl p-5 hover:-translate-y-1 hover:border-primary/30 hover:shadow-elevated"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-lg text-primary-foreground" style={{ backgroundImage: "var(--gradient-primary)" }}>
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block font-display font-bold tracking-tight transition-colors group-hover:text-primary-glow">{c.name}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">{c.description}</span>
                  <span className="mt-2 block text-xs font-semibold text-primary-glow">
                    {count} {count === 1 ? "review" : "reviews"}
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
      {location.pathname === "/" && <ProductShowcase />}
    </>
  );
}
