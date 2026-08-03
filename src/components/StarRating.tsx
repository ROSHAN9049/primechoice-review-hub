import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  className?: string;
}

const sizes = { sm: "size-3.5", md: "size-4", lg: "size-5" } as const;

export function StarRating({ rating, size = "md", showValue = true, className }: StarRatingProps) {
  const rounded = Math.round(rating * 2) / 2;
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <span className="flex items-center gap-0.5" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={cn(
              sizes[size],
              i <= rounded ? "fill-warning text-warning" : "text-muted-foreground/40",
            )}
          />
        ))}
      </span>
      {showValue && (
        <span className="text-sm font-semibold text-foreground">{rating.toFixed(1)}</span>
      )}
      <span className="sr-only">{rating.toFixed(1)} out of 5</span>
    </div>
  );
}