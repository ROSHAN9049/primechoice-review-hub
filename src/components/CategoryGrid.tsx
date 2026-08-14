import { Link } from "@tanstack/react-router";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { categories } from "@/data/categories";
import { reviewsByCategory } from "@/data/reviews";

export function CategoryGrid() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((c) => {
        const Icon = ((Icons as unknown as Record<string, LucideIcon>)[c.icon] ?? Icons.Tag) as LucideIcon;
        const count = reviewsByCategory(c.slug).length;
        return (
          <li key={c.slug}>
            <Link to="/categories/$slug" params={{ slug: c.slug }} className="card-surface group flex h-full items-start gap-4 rounded-xl p-5 hover:-translate-y-1 hover:border-primary/30 hover:shadow-elevated">
              <span className="grid size-11 shrink-0 place-items-center rounded-lg text-primary-foreground" style={{ backgroundImage: "var(--gradient-primary)" }}>
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block font-display font-bold tracking-tight transition-colors group-hover:text-primary-glow">{c.name}</span>
                <span className="mt-1 block text-sm text-muted-foreground">{c.description}</span>
                <span className="mt-2 block text-xs font-semibold text-primary-glow">{count} {count === 1 ? "review" : "reviews"}</span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
