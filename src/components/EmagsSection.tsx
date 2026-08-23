import { ArrowUpRight, BookOpen } from "lucide-react";
import { Link } from "@tanstack/react-router";

type FeaturedEmag = { slug: string; name: string; artwork: string; description: string };

const featuredEmags: FeaturedEmag[] = [
  { slug: "health-supplements", name: "Health & Supplements", artwork: "/emag-health.svg", description: "Practical supplement research, safety checks and buying guidance." },
  { slug: "ai-tools", name: "AI Tools", artwork: "/emag-ai.svg", description: "Useful AI tools, real-world use cases and comparison guides." },
  { slug: "software", name: "Software", artwork: "/emag-software.svg", description: "Software reviews, comparisons and smarter buying decisions." },
  { slug: "finance", name: "Finance", artwork: "/emag-finance.svg", description: "Clear finance research, tools and practical decision guides." },
  { slug: "education", name: "Education", artwork: "/emag-education.svg", description: "Learning resources, study tools and practical education guides." },
  { slug: "fitness", name: "Fitness", artwork: "/emag-fitness.svg", description: "Fitness gear, training resources and everyday wellness research." },
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
        {featuredEmags.map((emag) => (
          <Link key={emag.slug} to="/guides/$slug" params={{ slug: emag.slug }} className="card-surface group overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-elevated">
            <div className="relative h-48 overflow-hidden bg-muted">
              <img src={emag.artwork} alt={`${emag.name} eMag cover`} width={1200} height={675} loading="eager" decoding="sync" fetchPriority="high" className="block h-full w-full object-cover" onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = "/category-art-default.svg"; }} />
              <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-background/85 px-2.5 py-1 text-[10px] font-bold tracking-[0.14em] text-foreground uppercase backdrop-blur"><BookOpen className="size-3" aria-hidden="true" /> eMag</span>
            </div>
            <div className="p-5">
              <h3 className="font-display text-lg font-bold tracking-tight transition-colors group-hover:text-primary-glow">{emag.name} eMag</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{emag.description}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-primary-glow">Read eMag <ArrowUpRight className="size-3.5" aria-hidden="true" /></span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
