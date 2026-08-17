import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import type { PublicProduct } from "@/lib/product.functions";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "Products | PrimeChoiceReviews" },
      { name: "description", content: "Browse published products, reviews, pricing and affiliate offers from PrimeChoiceReviews." },
    ],
  }),
  component: ProductsPage,
});

function mapProduct(row: Record<string, unknown>): PublicProduct {
  return {
    id: String(row.id),
    slug: String(row.slug),
    title: String(row.title),
    description: String(row.description ?? ""),
    images: Array.isArray(row.images) ? row.images.filter((v): v is string => typeof v === "string") : [],
    category: row.category ? String(row.category) : undefined,
    brand: row.brand ? String(row.brand) : undefined,
    rating: Number(row.rating ?? 0),
    price: row.price == null ? null : Number(row.price),
    currency: String(row.currency ?? "USD"),
    region: String(row.region ?? "global"),
    affiliateLinks: Array.isArray(row.affiliate_links) ? row.affiliate_links as PublicProduct["affiliateLinks"] : [],
    status: String(row.status ?? "published"),
  };
}

function ProductsPage() {
  const [products, setProducts] = useState<PublicProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let active = true;
    void supabase
      .from("products")
      .select("id,slug,title,description,images,category,brand,rating,price,currency,region,affiliate_links,status")
      .eq("status", "published")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (!active) return;
        if (!error) setProducts((data ?? []).map((row) => mapProduct(row as Record<string, unknown>)));
        setLoading(false);
      });
    return () => { active = false; };
  }, []);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return products;
    return products.filter((p) => `${p.title} ${p.category ?? ""} ${p.brand ?? ""}`.toLowerCase().includes(term));
  }, [products, query]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="kicker">Product catalogue</span>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">All Products</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">Browse our latest published products and open any product for its full details and official offer.</p>
        </div>
        <label className="relative block w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products…" aria-label="Search products" className="h-11 w-full rounded-lg border border-border bg-background pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
        </label>
      </div>

      {loading ? (
        <div className="mt-10 rounded-2xl border border-border bg-secondary/40 p-10 text-center text-muted-foreground">Loading products…</div>
      ) : filtered.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-border bg-secondary/40 p-10 text-center">
          <h2 className="text-xl font-bold">No products found</h2>
          <p className="mt-2 text-muted-foreground">Try another search or publish a product from the Admin Panel.</p>
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((product) => {
            const image = product.images[0] || (product.slug.includes("iphone-14-pro") ? "/product-iphone-14-pro.svg" : product.slug.includes("samsung-galaxy-s23") ? "/product-samsung-galaxy-s23.svg" : "/favicon.ico");
            return (
              <article key={product.id} className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-elevated">
                <Link to="/products/$slug" params={{ slug: product.slug }} className="block">
                  <img src={image} alt={product.title} width={800} height={600} className="aspect-[4/3] w-full object-cover" />
                </Link>
                <div className="p-5">
                  {product.category && <p className="kicker">{product.category}</p>}
                  <h2 className="mt-2 line-clamp-2 text-xl font-bold">{product.title}</h2>
                  {product.description && <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{product.description}</p>}
                  <div className="mt-4 flex items-center justify-between gap-3">
                    {product.price != null ? <span className="font-display text-lg font-bold">{product.currency} {product.price.toFixed(2)}</span> : <span className="text-sm font-medium text-muted-foreground">View details</span>}
                    <Button asChild size="sm" className="rounded-lg">
                      <Link to="/products/$slug" params={{ slug: product.slug }}>View <ArrowUpRight className="size-4" /></Link>
                    </Button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}
