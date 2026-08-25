import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, Filter, Search, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { digistore24AffiliateUrl } from "@/lib/digistore24";

const MARKETPLACE_URL = "https://www.digistore24-app.com/app/en/affiliate/account/marketplace/all";

type Product = { id: string; name: string; category: string; price: string; commission: string; description: string; affiliateUrl?: string };

const products: Product[] = [{
  id: "98201",
  name: "FunnelCockpit – Die All-In-One Marketing Software",
  category: "Software",
  price: "From $54.82/mo",
  commission: "25%",
  description: "All-in-one marketing software for funnels, websites, email marketing and digital business workflows.",
}];

export const Route = createFileRoute("/digistore24")({
  head: () => ({ meta: [
    { title: "Digistore24 Products & Offers | PrimeChoiceReviews" },
    { name: "description", content: "Browse selected Digistore24 products and offers with direct affiliate links from PrimeChoiceReviews." },
  ] }),
  component: Digistore24Page,
});

function Digistore24Page() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];
  const filtered = useMemo(() => products.filter((p) => {
    const matchesQuery = `${p.name} ${p.description}`.toLowerCase().includes(query.toLowerCase());
    return matchesQuery && (category === "All" || p.category === category);
  }), [query, category]);

  return <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
    <div className="rounded-3xl border border-border bg-secondary/30 p-6 shadow-elevated sm:p-10">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="max-w-3xl">
          <span className="kicker inline-flex items-center gap-2"><Sparkles className="size-3.5" aria-hidden="true" /> Digital offers</span>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl">Digistore24 Products</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">Browse selected digital products and software offers. Featured offers use direct Digistore24 affiliate links instead of sending visitors to the generic marketplace.</p>
        </div>
        <a href={MARKETPLACE_URL} target="_blank" rel="noopener noreferrer sponsored" className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border bg-background px-5 py-3 font-display text-sm font-bold uppercase tracking-wide transition-colors hover:border-primary/40 hover:text-primary-glow">Open marketplace <ExternalLink className="size-4" aria-hidden="true" /></a>
      </div>
      <div className="mt-8 grid gap-3 md:grid-cols-[1fr_auto]">
        <label className="relative block"><span className="sr-only">Search products</span><Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products..." className="min-h-12 w-full rounded-xl border border-border bg-background pl-11 pr-4 outline-none transition-colors focus:border-primary/50" /></label>
        <div className="flex items-center gap-2 overflow-x-auto rounded-xl border border-border bg-background p-1.5"><Filter className="ml-2 size-4 shrink-0 text-muted-foreground" aria-hidden="true" />{categories.map((item) => <button key={item} type="button" onClick={() => setCategory(item)} className={`whitespace-nowrap rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-wide transition-colors ${category === item ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}>{item}</button>)}</div>
      </div>
    </div>
    <div className="mt-10 flex items-center justify-between gap-4"><div><span className="kicker">Affiliate marketplace</span><h2 className="mt-2 text-2xl font-bold">Selected offers</h2></div><span className="text-sm text-muted-foreground">{filtered.length} product{filtered.length === 1 ? "" : "s"}</span></div>
    <div className="mt-6 grid gap-5 lg:grid-cols-2">{filtered.map((product) => { const affiliateUrl = product.affiliateUrl ?? digistore24AffiliateUrl(product.id); return <article key={product.id} className="card-surface overflow-hidden rounded-2xl p-5 sm:p-6"><div className="flex flex-wrap items-start justify-between gap-4"><div className="min-w-0"><span className="inline-flex rounded-full border border-border bg-secondary px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">{product.category}</span><h3 className="mt-3 text-xl font-bold leading-tight">{product.name}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{product.description}</p></div><div className="shrink-0 text-right"><div className="text-lg font-bold text-primary-glow">{product.price}</div><div className="mt-1 text-xs text-muted-foreground">Commission: {product.commission}</div></div></div><div className="mt-6 flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between"><span className="text-xs text-muted-foreground">Digistore24 Product ID: {product.id}</span><a href={affiliateUrl} target="_blank" rel="noopener noreferrer sponsored" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 font-display text-sm font-bold uppercase tracking-wide text-primary-foreground transition-opacity hover:opacity-90">View offer <ExternalLink className="size-4" aria-hidden="true" /></a></div></article>; })}</div>
    {filtered.length === 0 && <div className="mt-8 rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">No matching products. Try another search or open the full Digistore24 marketplace.</div>}
    <div className="mt-10 rounded-2xl border border-border bg-secondary/30 p-5 text-sm leading-relaxed text-muted-foreground">Affiliate disclosure: PrimeChoiceReviews may earn a commission when you purchase through a tracked affiliate link. This does not change the price you pay.</div>
  </main>;
}
