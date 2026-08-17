import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Check, ExternalLink, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { AffiliateButton } from "@/components/AffiliateButton";
import { Button } from "@/components/ui/button";
import { fetchPublicProduct, type PublicProduct } from "@/lib/product.functions";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/products/$slug")({
  loader: async ({ params }) => {
    const product = await fetchPublicProduct({ data: params.slug });
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => loaderData ? {
    meta: [
      { title: `${loaderData.product.title} | PrimeChoiceReviews` },
      { name: "description", content: loaderData.product.description },
      { property: "og:title", content: loaderData.product.title },
      { property: "og:description", content: loaderData.product.description },
    ],
    links: [{ rel: "canonical", href: `/products/${loaderData.product.slug}` }],
  } : { meta: [{ title: "Product not found" }] },
  component: ProductPage,
});

function productFallback(slug: string) {
  if (slug.includes("iphone-14-pro")) return "/product-iphone-14-pro.svg";
  if (slug.includes("samsung-galaxy-s23")) return "/product-samsung-galaxy-s23.svg";
  return "/favicon.ico";
}

function ProductPage() {
  const { product } = Route.useLoaderData() as { product: PublicProduct };
  const [affiliateUrl, setAffiliateUrl] = useState(product.affiliateLinks.find((link) => link.enabled !== false && link.url)?.url);

  useEffect(() => {
    let active = true;
    void supabase.from("products").select("affiliate_links").eq("id", product.id).maybeSingle().then(({ data }) => {
      if (!active || !data) return;
      const links = Array.isArray(data.affiliate_links) ? data.affiliate_links as Array<{ url?: string; enabled?: boolean }> : [];
      setAffiliateUrl(links.find((link) => link.enabled !== false && link.url)?.url);
    });
    return () => { active = false; };
  }, [product.id]);

  const rawImage = product.images[0] || "";
  const image = rawImage && !rawImage.includes("via.placeholder.com") ? rawImage : productFallback(product.slug);
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <Button asChild variant="ghost" className="mb-6 min-h-11 rounded-lg"><Link to="/"><ArrowLeft className="size-4" /> Back to home</Link></Button>
      <article className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="overflow-hidden rounded-2xl border border-border bg-secondary"><img src={image} alt={product.title} width={1200} height={900} className="aspect-[4/3] w-full object-cover" /></div>
        <div className="flex flex-col justify-center">
          <span className="kicker">{product.category || "Featured product"}</span>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">{product.title}</h1>
          {product.brand && <p className="mt-3 text-muted-foreground">Brand: {product.brand}</p>}
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{product.description}</p>
          {product.price != null && <p className="mt-6 font-display text-4xl font-extrabold text-primary-glow">{product.currency} {product.price.toFixed(2)}</p>}
          {product.rating > 0 && <p className="mt-3 font-semibold">Rating: {product.rating.toFixed(1)}/5</p>}
          <div className="mt-7 max-w-md"><AffiliateButton href={affiliateUrl} productId={product.id} label="Buy / Check Official Price" subLabel="Secure checkout · affiliate link" path={`/products/${product.slug}`} /></div>
          <div className="mt-7 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
            <div className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-success" />Admin-managed product data</div>
            <div className="flex gap-2"><ShieldCheck className="mt-0.5 size-4 shrink-0 text-success" />Affiliate disclosure included</div>
          </div>
        </div>
      </article>
      <section className="mt-14 rounded-2xl border border-border bg-secondary/40 p-6 sm:p-8">
        <h2 className="text-2xl font-bold">Product details</h2>
        <dl className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div><dt className="text-xs text-muted-foreground">Category</dt><dd className="mt-1 font-semibold">{product.category || "—"}</dd></div>
          <div><dt className="text-xs text-muted-foreground">Brand</dt><dd className="mt-1 font-semibold">{product.brand || "—"}</dd></div>
          <div><dt className="text-xs text-muted-foreground">Region</dt><dd className="mt-1 font-semibold">{product.region}</dd></div>
          <div><dt className="text-xs text-muted-foreground">Affiliate</dt><dd className="mt-1 inline-flex items-center gap-1 font-semibold">Enabled <ExternalLink className="size-3.5" /></dd></div>
        </dl>
      </section>
    </main>
  );
}
