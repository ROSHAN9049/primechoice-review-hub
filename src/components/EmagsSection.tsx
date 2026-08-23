import { ArrowUpRight, BookOpen } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { categories } from "@/data/categories";
import { editorialArtwork } from "@/lib/editorialArtwork";

const emags = categories.filter((category) => category.affiliateUrl).slice(0, 6);

export function EmagsSection() {
  return (
    <section id="emags" aria-labelledby="emags-heading">
      <div className="rule-line flex flex-wrap items-end justify-between gap-4 pt-6">
        <div className="max-w-2xl">
          <span className="kicker">eMags</span>
          <h2 id="emags-heading" className="mt-2 text-3xl font-bold sm:text-4xl">Featured eMags</h2>
          <p className="mt-2 text-muted-foreground">Attractive, easy-to-read editions with practical reviews, buying advice and category research.</p>
        </div>
        <Link to="/guides" className="group inline-flex items-center gap-1.5 font-display text-sm font-bold tracking-wide text-primary-glow uppercase">
          View all eMags <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {emags.map((category) => (
          <Link
            key={category.slug}
            to="/guides/$slug"
            params={{ slug: category.slug }}
            className="card-surface group overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-elevated"
          >
            <div className="relative overflow-hidden">
              <img
                src={editorialArtwork(category.slug)}
                alt={`${category.name} eMag cover`}
                width={800}
                height={420}
                loading="lazy"
                decoding="async"
                className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-background/85 px-2.5 py-1 text-[10px] font-bold tracking-[0.14em] text-foreground uppercase backdrop-blur">
                <BookOpen className="size-3" aria-hidden="true" /> eMag
              </span>
            </div>
            <div className="p-5">
              <h3 className="font-display text-lg font-bold tracking-tight transition-colors group-hover:text-primary-glow">{category.name} eMag</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Reviews, comparisons and practical buying guidance for {category.name.toLowerCase()}.</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-primary-glow">Read eMag <ArrowUpRight className="size-3.5" aria-hidden="true" /></span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
