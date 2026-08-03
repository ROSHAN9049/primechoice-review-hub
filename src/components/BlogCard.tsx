import { Link } from "@tanstack/react-router";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getCategory } from "@/data/categories";
import type { Post } from "@/data/posts";

export function BlogCard({ post }: { post: Post }) {
  const category = getCategory(post.category);
  return (
    <article className="glass-card group flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated">
      <Link to="/blog/$slug" params={{ slug: post.slug }} className="block overflow-hidden bg-secondary">
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          width={1024}
          height={768}
          className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          {category && (
            <Badge variant="secondary" className="rounded-full font-medium">
              {category.name}
            </Badge>
          )}
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3.5" aria-hidden="true" />
            {post.readingTime} min read
          </span>
        </div>
        <h3 className="text-lg leading-snug font-semibold">
          <Link
            to="/blog/$slug"
            params={{ slug: post.slug }}
            className="transition-colors hover:text-primary"
          >
            {post.title}
          </Link>
        </h3>
        <p className="line-clamp-3 text-sm text-muted-foreground">{post.excerpt}</p>
        <p className="mt-auto pt-2 text-xs text-muted-foreground">
          By {post.author.name} ·{" "}
          {new Date(post.date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </p>
      </div>
    </article>
  );
}