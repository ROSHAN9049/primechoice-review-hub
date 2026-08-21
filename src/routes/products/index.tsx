import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { fetchPublicProducts } from "@/lib/product.functions";
import type { PublicProduct } from "@/lib/product.functions";

export const Route = createFileRoute("/products/")({
  loader: async () => ({ products: await fetchPublicProducts() }),
  head: () => ({ meta: [{ title: "Products | PrimeChoiceReviews" }, { name: "description", content: "Browse published products, reviews, pricing and affiliate offers from PrimeChoiceReviews." }] }),
  component: ProductsPage,
});

function fallbackImage(slug: string) {
  if (slug.includes("iphone-14-pro")) return "/product-iphone-14-pro.svg";
  if (slug.includes("samsung-galaxy-s23")) return "/product-samsung-galaxy-s23.svg";
  return "/favicon.ico";
}

function ProductImage({ product }: { product: PublicProduct }) {
  const candidate = product.images[0]?.trim();
  const [src, setSrc] = useState(candidate && !candidate.includes("via.placeholder.com") ? candidate : fallbackImage(product.slug));
  return <img src={src} alt={product.title} width={800} height={600} className="aspect-[4/3] w-full object-cover" onError={() => setSrc(fallbackImage(product.slug))} loading="lazy" decoding="async" />;
}

function ProductsPage() {
  const { products } = Route.useLoaderData();
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return term ? products.filter((p) => `${p.title} ${p.category ?? ""} ${p.brand ?? ""}`.toLowerCase().includes(term)) : products;
  }, [products, query]);

  return <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><div><span className="kicker">Product catalogue</span><h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">All Products</h1><p className="mt-3 max-w-2xl text-muted-foreground">Browse our latest published products and open any product for its full details and official offer.</p></div><label className="relative block w-full sm:max-w-xs"><Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products…" aria-label="Search products" className="h-11 w-full rounded-lg border border-border bg-background pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring" /></label></div>
    {filtered.length === 0 ? <div className="mt-10 rounded-2xl border border-border bg-secondary/40 p-10 text-center"><h2 className="text-xl font-bold">No products found</h2><p className="mt-2 text-muted-foreground">Try another search or publish a product from the Admin Panel.</p></div> : <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{filtered.map((product) => <article key={product.id} className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-elevated"><Link to="/products/$slug" params={{ slug: product.slug }} className="block"><ProductImage product={product} /></Link><div className="p-5">{product.category && <p className="kicker">{product.category}</p>}<h2 className="mt-2 line-clamp-2 text-xl font-bold">{product.title}</h2>{product.description && <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{product.description}</p>}<div className="mt-4 flex items-center justify-between gap-3">{product.price != null ? <span className="font-display text-lg font-bold">{product.currency} {product.price.toFixed(2)}</span> : <span className="text-sm font-medium text-muted-foreground">View details</span>}<Button asChild size="sm" className="rounded-lg"><Link to="/products/$slug" params={{ slug: product.slug }}>View <ArrowUpRight className="size-4" /></Link></Button></div></div></article>)}</div>}
  </main>;
}
