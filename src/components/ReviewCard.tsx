import { Link } from "@tanstack/react-router";
import { ArrowUpRight, BadgeCheck } from "lucide-react";
import { StarRating } from "@/components/StarRating";
import { getCategory } from "@/data/categories";
import type { Review } from "@/data/reviews";
import { cn } from "@/lib/utils";

export function ScoreBadge({ rating, className }: { rating: number; className?: string }) {
  return (
    <span className={cn("inline-flex items-baseline gap-1 rounded-md px-2.5 py-1 font-display text-sm font-bold text-primary-foreground shadow-soft", className)} style={{ backgroundImage: "var(--gradient-primary)" }}>
      {rating.toFixed(1)}
      <span className="text-[10px] font-medium opacity-70">/5</span>
    </span>
  );
}

export function ReviewCard({ review, index }: { review: Review; index?: number }) {
  const category = getCategory(review.category);
  return (
    <article className="card-surface group relative flex h-full flex-col overflow-hidden rounded-xl hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-elevated" style={index !== undefined ? { animationDelay: `${index * 70}ms` } : undefined}>
      <Link to="/reviews/$slug" params={{ slug: review.slug }} tabIndex={-1} aria-hidden="true" className="relative block overflow-hidden bg-secondary">
        <img src={review.image} alt="" loading="lazy" decoding="async" width={1024} height={768} className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]" />
        <span className="absolute top-3 left-3 rounded-md bg-background/85 px-2.5 py-1 font-display text-[10px] font-bold tracking-[0.14em] text-foreground uppercase backdrop-blur-sm">{category?.name ?? "Review"}</span>
        <ScoreBadge rating={review.rating} className="absolute right-3 bottom-3" />
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <StarRating rating={review.rating} size="sm" showValue={false} />
        <h3 className="font-display text-[1.05rem] leading-snug font-bold tracking-tight">
          <Link to="/reviews/$slug" params={{ slug: review.slug }} className="editorial-underline"><span className="absolute inset-0" aria-hidden="true" />{review.title}</Link>
        </h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">{review.excerpt}</p>
        <div className="mt-auto flex items-center justify-between gap-3 rule-line pt-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground"><BadgeCheck className="size-3.5 text-primary" aria-hidden="true" />Editorial review</span>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">Read<ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" /></span>
        </div>
      </div>
    </article>
  );
}
