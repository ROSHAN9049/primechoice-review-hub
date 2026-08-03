import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { StarRating } from "@/components/StarRating";
import { Badge } from "@/components/ui/badge";
import { getCategory } from "@/data/categories";
import type { Review } from "@/data/reviews";

export function ReviewCard({ review }: { review: Review }) {
  const category = getCategory(review.category);
  return (
    <article className="glass-card group flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated">
      <Link
        to="/reviews/$slug"
        params={{ slug: review.slug }}
        className="block overflow-hidden bg-secondary"
      >
        <img
          src={review.image}
          alt={`${review.product} product image`}
          loading="lazy"
          width={1024}
          height={768}
          className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap items-center gap-2">
          {category && (
            <Badge variant="secondary" className="rounded-full font-medium">
              {category.name}
            </Badge>
          )}
          <StarRating rating={review.rating} size="sm" />
        </div>
        <h3 className="text-lg leading-snug font-semibold">
          <Link
            to="/reviews/$slug"
            params={{ slug: review.slug }}
            className="transition-colors hover:text-primary"
          >
            {review.title}
          </Link>
        </h3>
        <p className="line-clamp-3 text-sm text-muted-foreground">{review.excerpt}</p>
        <div className="mt-auto pt-2">
          <Link
            to="/reviews/$slug"
            params={{ slug: review.slug }}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
          >
            Read full review
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}