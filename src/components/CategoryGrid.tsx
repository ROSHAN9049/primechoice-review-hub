import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { categories } from "@/data/categories";
import { reviewsByCategory } from "@/data/reviews";
import { ProductShowcase } from "@/components/ProductShowcase";

const amazonAllDealsUrl = "https://www.amazon.in/gp/goldbox/all-deals/?ie=UTF8&ref_=sv_gb_1&tag=rehanroshan08-21";
const amazonDemoProductUrl = "https://www.amazon.in/dp/B0CGDZC2FK?tag=rehanroshan08-21";

export function CategoryGrid() {
  return (
    <>
      <section aria-labelledby="amazon-all-deals-heading" className="mb-8">
        <a href={amazonAllDealsUrl} target="_blank" rel="noopener noreferrer sponsored" aria-label="Amazon India All Deals — shop all deals" className="group relative block overflow-hidden rounded-2xl border border-border bg-black shadow-elevated transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
          <img src="/amazon-all-deals.svg" alt="Amazon India All Deals — shop all Amazon deals" width={1600} height={520} loading="lazy" decoding="async" className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.01]" />
          <span id="amazon-all-deals-heading" className="sr-only">Amazon India All Deals</span>
        </a>
        <div className="card-surface mt-5 overflow-hidden rounded-2xl border border-border">
          <div className="grid items-center gap-0 md:grid-cols-[260px_1fr]">
            <a href={amazonDemoProductUrl} target="_blank" rel="noopener noreferrer sponsored nofollow" aria-label="Demo Amazon product — open on Amazon India" className="block bg-secondary p-4">
              <img src="/amazon-demo-product.svg" alt="Demo product image for Logitech G PRO X Superlight 2" width={800} height={620} loading="lazy" decoding="async" className="h-auto w-full rounded-xl" />
            </a>
            <div className="p-6 sm:p-8">
              <span className="kicker">Amazon India · Demo Product</span>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight">Logitech G PRO X Superlight 2</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Demo product card with image and your India Associates tracking ID. Price and availability can change, so check the live Amazon page before buying.</p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <a href={amazonDemoProductUrl} target="_blank" rel="noopener noreferrer sponsored nofollow" className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-5 py-2.5 font-display text-sm font-bold text-primary-foreground hover:opacity-90">View on Amazon <ArrowUpRight className="size-4" aria-hidden="true" /></a>
                <span className="text-xs text-muted-foreground">Affiliate link · India ID: rehanroshan08-21</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => {
          const Icon = ((Icons as unknown as Record<string, LucideIcon>)[c.icon] ?? Icons.Tag) as LucideIcon;
          const count = reviewsByCategory(c.slug).length;
          const cardClassName = "card-surface group flex h-full items-start gap-4 rounded-xl p-5 hover:-translate-y-1 hover:border-primary/30 hover:shadow-elevated";
          return (
            <li key={c.slug}>
              {c.affiliateUrl ? (
                <a href={c.affiliateUrl} target="_blank" rel="noopener noreferrer sponsored nofollow" aria-label={`${c.name} — open Amazon deals`} className={cardClassName}>
                  <span className="grid size-11 shrink-0 place-items-center rounded-lg text-primary-foreground" style={{ backgroundImage: "var(--gradient-primary)" }}>
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="flex items-center gap-2 font-display font-bold tracking-tight transition-colors group-hover:text-primary-glow">{c.name} <ArrowUpRight className="size-4" aria-hidden="true" /></span>
                    <span className="mt-1 block text-sm text-muted-foreground">{c.description}</span>
                    <span className="mt-2 block text-xs font-semibold text-primary-glow">Amazon Fashion Deals</span>
                  </span>
                </a>
              ) : (
                <Link to="/categories/$slug" params={{ slug: c.slug }} className={cardClassName}>
                  <span className="grid size-11 shrink-0 place-items-center rounded-lg text-primary-foreground" style={{ backgroundImage: "var(--gradient-primary)" }}>
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display font-bold tracking-tight transition-colors group-hover:text-primary-glow">{c.name}</span>
                    <span className="mt-1 block text-sm text-muted-foreground">{c.description}</span>
                    <span className="mt-2 block text-xs font-semibold text-primary-glow">{count} {count === 1 ? "review" : "reviews"}</span>
                  </span>
                </Link>
              )}
            </li>
          );
        })}
      </ul>
      <ProductShowcase />
    </>
  );
}
