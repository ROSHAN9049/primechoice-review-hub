import { ArrowUpRight, BookOpen } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { getCategory } from "@/data/categories";
import { editorialArtwork } from "@/lib/editorialArtwork";

type FeaturedEmag = { slug: string; guideSlug: string; name: string; description: string };

// Featured eMags use the same artwork source as CategoryGrid. Each card links
// to a real guide slug so the card itself opens a working guide page.
const featuredEmags: FeaturedEmag[] = [
  { slug: "health-supplements", guideSlug: "best-smart-watches", name: "Health & Supplements", description: "Practical supplement research, safety checks and buying guidance." },
  { slug: "ai-tools", guideSlug: "best-wireless-earbuds-2026", name: "AI Tools", description: "Useful AI tools, real-world use cases and comparison guides." },
  { slug: "software", guideSlug: "best-gaming-laptops", name: "Software", description: "Software reviews, comparisons and smarter buying decisions." },
  { slug: "finance", guideSlug: "best-budget-smartphones", name: "Finance", description: "Clear finance research, tools and practical decision guides." },
  { slug: "education", guideSlug: "best-home-appliances", name: "Education", description: "Learning resources, study tools and practical education guides." },
  { slug: "fitness", guideSlug: "best-smart-watches", name: "Fitness", description: "Fitness gear, training resources and everyday wellness research." },
];

export function EmagsSection() {
  return (
    <section id="emags" aria-labelledby="emags-heading">
      <div className="rule-line flex flex-wrap items-end justify-between gap-4 pt-6">
        <div className="max-w-2xl">
          <span className="kicker">eMags</span>
          <h2 id="emags-heading" className="mt-2 text-3xl font-bold sm:text-4xl">Featured eMags</h2>
          <p className="mt-2 text-muted-foreground">Independent guides with practical reviews, buying research and category deep-dives.</p>
        </div>
        <Link to="/guides" className="group inline-flex items-center gap-1.5 font-display text-sm font-bold tracking-wide text-primary-glow uppercase">View all eMags <ArrowUpRight className="size-4" aria-hidden="true" /></Link>
      </div>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {featuredEmags.map((emag) => {
          const category = getCategory(emag.slug);
          const artwork = editorialArtwork(emag.slug);
          return (
            <Link key={emag.slug} to="/guides/$slug" params={{ slug: emag.guideSlug }} className="card-surface group overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-elevated">
              <div className="relative h-48 overflow-hidden bg-muted">
                <img src={artwork} alt={`${category?.name ?? emag.name} category`} width={1024} height={675} loading="eager" decoding="async" fetchPriority="high" className="block h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = "/category-art-default.svg"; }} />
                <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-background/85 px-2.5 py-1 text-[10px] font-bold tracking-[0.14em] text-foreground uppercase backdrop-blur"><BookOpen className="size-3" aria-hidden="true" /> eMag</span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-bold tracking-tight transition-colors group-hover:text-primary-glow">{emag.name} eMag</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{emag.description}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-primary-glow">Read eMag <ArrowUpRight className="size-3.5" aria-hidden="true" /></span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
