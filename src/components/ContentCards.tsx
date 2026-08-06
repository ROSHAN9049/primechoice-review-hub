import { Link } from "@tanstack/react-router";
import { ArrowUpRight, ListOrdered, Scale } from "lucide-react";
import { getCategory } from "@/data/categories";
import type { Comparison } from "@/data/comparisons";
import type { Guide } from "@/data/guides";

function Shell({
  to,
  params,
  image,
  kicker,
  title,
  excerpt,
  Icon,
}: {
  to: string;
  params: { slug: string };
  image: string;
  kicker: string;
  title: string;
  excerpt: string;
  Icon: typeof ListOrdered;
}) {
  return (
    <article className="card-surface group relative flex h-full flex-col overflow-hidden rounded-xl hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-elevated">
      <div className="relative overflow-hidden bg-secondary">
        <img
          src={image}
          alt=""
          loading="lazy"
          decoding="async"
          width={1024}
          height={768}
          className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
        />
        <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-md bg-background/85 px-2.5 py-1 font-display text-[10px] font-bold tracking-[0.14em] text-foreground uppercase backdrop-blur-sm">
          <Icon className="size-3" aria-hidden="true" />
          {kicker}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-display text-[1.05rem] leading-snug font-bold tracking-tight">
          <Link to={to as "/"} params={params} className="editorial-underline">
            <span className="absolute inset-0" aria-hidden="true" />
            {title}
          </Link>
        </h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">{excerpt}</p>
        <span className="mt-auto inline-flex items-center gap-1 rule-line pt-3 text-sm font-semibold text-primary">
          Read
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </span>
      </div>
    </article>
  );
}

export function GuideCard({ guide }: { guide: Guide }) {
  return (
    <Shell
      to="/guides/$slug"
      params={{ slug: guide.slug }}
      image={guide.image}
      kicker={`Buying guide · ${getCategory(guide.category)?.name ?? "Guide"}`}
      title={guide.title}
      excerpt={guide.excerpt}
      Icon={ListOrdered}
    />
  );
}

export function ComparisonCard({ comparison }: { comparison: Comparison }) {
  return (
    <Shell
      to="/compare/$slug"
      params={{ slug: comparison.slug }}
      image={comparison.image}
      kicker="Comparison"
      title={comparison.title}
      excerpt={comparison.excerpt}
      Icon={Scale}
    />
  );
}