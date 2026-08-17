import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { AffiliateButton } from "@/components/AffiliateButton";
import { fetchProducts, type Product } from "@/lib/content.functions";

export function ProductShowcase() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    let active = true;
    void fetchProducts().then((items) => {
      if (active) setProducts(items.slice(0, 6));
    });
    return () => {
      active = false;
    };
  }, []);

  if (!products.length) return null;

  return (
    <section aria-labelledby="products-heading" className="mt-14">
      <div className="rule-line flex flex-wrap items-end justify-between gap-4 pt-6">
        <div>
          <span className="kicker">Shop picks</span>
          <h2 id="products-heading" className="mt-2 text-3xl font-bold sm:text-4xl">
            Featured products
          </h2>
          <p className="mt-2 text-muted-foreground">
            Products added from the Admin Panel, with live affiliate links.
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => {
          const image = product.images[0] || "/favicon.ico";
          const affiliate = product.affiliateLinks.find((link) => link.enabled !== false)?.affiliateId;
          const directUrl = product.affiliateLinks.find((link) => link.enabled !== false && link.productId === undefined)?.affiliateId;
          const url = directUrl ?? affiliate;

          return (
            <article key={product.id} className="card-surface flex flex-col overflow-hidden rounded-2xl hover:border-primary/30 hover:shadow-elevated">
              <Link to="/products/$slug" params={{ slug: product.slug }} className="group block">
                <div className="aspect-[4/3] overflow-hidden bg-secondary">
                  <img src={image} alt={product.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
              </Link>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="kicker">{product.category || "Product"}</span>
                  {product.rating > 0 && (
                    <span className="inline-flex items-center gap-1 text-sm font-semibold">
                      <Star className="size-4 fill-current text-primary" aria-hidden="true" />
                      {product.rating.toFixed(1)}
                    </span>
                  )}
                </div>
                <h3 className="mt-2 font-display text-xl font-bold tracking-tight">
                  <Link to="/products/$slug" params={{ slug: product.slug }} className="editorial-underline">
                    {product.title}
                  </Link>
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
                {product.price != null && (
                  <p className="mt-4 font-display text-2xl font-bold text-primary-glow">
                    {product.currency} {product.price.toFixed(2)}
                  </p>
                )}
                <div className="mt-5 flex flex-col gap-2">
                  <Link to="/products/$slug" params={{ slug: product.slug }} className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg border border-border px-4 text-sm font-semibold hover:border-primary/40 hover:text-primary-glow">
                    View product <ArrowUpRight className="size-4" aria-hidden="true" />
                  </Link>
                  <AffiliateButton
                    href={url}
                    productId={product.id}
                    label="Buy / Check Price"
                    subLabel="Affiliate link · secure checkout"
                    showDisclosure={false}
                  />
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
