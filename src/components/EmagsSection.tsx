import { ArrowUpRight, BookOpen } from "lucide-react";
import { Link } from "@tanstack/react-router";

type FeaturedEmag = { slug: string; name: string; artwork: string; description: string };

// Use the exact same category images shown in CategoryGrid so both sections
// stay visually consistent and avoid a second image source.
const featuredEmags: FeaturedEmag[] = [
  { slug: "health-supplements", name: "Health & Supplements", artwork: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=900&q=85", description: "Practical supplement research, safety checks and buying guidance." },
  { slug: "ai-tools", name: "AI Tools", artwork: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=85", description: "Useful AI tools, real-world use cases and comparison guides." },
  { slug: "software", name: "Software", artwork: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=85", description: "Software reviews, comparisons and smarter buying decisions." },
  { slug: "finance", name: "Finance", artwork: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=900&q=85", description: "Clear finance research, tools and practical decision guides." },
  { slug: "education", name: "Education", artwork: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=85", description: "Learning resources, study tools and practical education guides." },
  { slug: "fitness", name: "Fitness", artwork: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=85", description: "Fitness gear, training resources and everyday wellness research." },
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
              <img src={emag.artwork} alt={`${emag.name} category`} width={900} height={600} loading="eager" decoding="async" fetchPriority="high" className="block h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = "/category-art-default.svg"; }} />
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
