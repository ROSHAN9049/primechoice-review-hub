import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { categories } from "@/data/categories";
import { reviewsByCategory } from "@/data/reviews";
import { ProductShowcase } from "@/components/ProductShowcase";

const amazonAllDealsUrl = "https://www.amazon.in/gp/goldbox/all-deals/?ie=UTF8&ref_=sv_gb_1&tag=rehanroshan08-21";
const amazonDemoProductUrl = "https://www.amazon.in/dp/B0CGDZC2FK?tag=rehanroshan08-21";

const categoryImages: Record<string, { src: string; alt: string }> = {
  "health-supplements": { src: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=240&q=80", alt: "Health and supplements" },
  "ai-tools": { src: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=240&q=80", alt: "Artificial intelligence technology" },
  software: { src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=240&q=80", alt: "Software and laptop" },
  finance: { src: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=240&q=80", alt: "Finance and market chart" },
  education: { src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=240&q=80", alt: "Education and learning" },
  "mens-health": { src: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=240&q=80", alt: "Men's health and wellness" },
  "weight-loss": { src: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=240&q=80", alt: "Healthy food for weight management" },
  vision: { src: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=240&q=80", alt: "Vision and eyeglasses" },
  fitness: { src: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=240&q=80", alt: "Fitness training" },
  electronics: { src: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=240&q=80", alt: "Electronics and laptop" },
  "home-kitchen": { src: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=240&q=80", alt: "Home and kitchen" },
  "health-fitness": { src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=240&q=80", alt: "Health and fitness activity" },
  beauty: { src: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=240&q=80", alt: "Beauty and skincare" },
  sports: { src: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=240&q=80", alt: "Sports and athletics" },
  office: { src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=240&q=80", alt: "Office workspace" },
  fashion: { src: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=240&q=80", alt: "Fashion and clothing" },
  baby: { src: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=240&q=80", alt: "Baby and nursery" },
  automotive: { src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=240&q=80", alt: "Automotive and car" },
  "pet-supplies": { src: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=240&q=80", alt: "Pet supplies and dog" },
};

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

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-label="Product review categories">
        {categories.map((c) => {
          const Icon = ((Icons as unknown as Record<string, LucideIcon>)[c.icon] ?? Icons.Tag) as LucideIcon;
          const count = reviewsByCategory(c.slug).length;
          const cardClassName = "card-surface group flex h-full items-start gap-4 rounded-xl p-5 hover:-translate-y-1 hover:border-primary/30 hover:shadow-elevated";
          const image = categoryImages[c.slug];
          const categoryVisual = image ? (
            <img src={image.src} alt={image.alt} width={96} height={96} loading="lazy" decoding="async" className="size-20 shrink-0 rounded-lg bg-secondary object-cover sm:size-24" />
          ) : (
            <span className="grid size-11 shrink-0 place-items-center rounded-lg text-primary-foreground" style={{ backgroundImage: "var(--gradient-primary)" }}>
              <Icon className="size-5" aria-hidden="true" />
            </span>
          );
          return (
            <li key={c.slug}>
              {c.affiliateUrl ? (
                <a href={c.affiliateUrl} target="_blank" rel="noopener noreferrer sponsored nofollow" aria-label={`${c.name} — open Amazon deals`} className={cardClassName}>
                  {categoryVisual}
                  <span className="min-w-0">
                    <span className="flex items-center gap-2 font-display font-bold tracking-tight transition-colors group-hover:text-primary-glow">{c.name} <ArrowUpRight className="size-4" aria-hidden="true" /></span>
                    <span className="mt-1 block text-sm text-muted-foreground">{c.description}</span>
                    <span className="mt-2 block text-xs font-semibold text-primary-glow">Amazon Fashion Deals</span>
                  </span>
                </a>
              ) : (
                <Link to="/categories/$slug" params={{ slug: c.slug }} className={cardClassName}>
                  {categoryVisual}
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
