import { Link } from "@tanstack/react-router";
import { Clock } from "lucide-react";
import { getCategory } from "@/data/categories";
import type { Post } from "@/data/posts";
import { editorialArtwork } from "@/lib/editorialArtwork";

export function BlogCard({ post, compact = false }: { post: Post; compact?: boolean }) {
  const category = getCategory(post.category);
  const image = editorialArtwork(post.category);

  if (compact) {
    return (
      <article className="group relative flex gap-4 rule-line py-4">
        <img src={image} alt={`${category?.name ?? "Category"} editorial guide`} loading="lazy" decoding="async" width={200} height={200} className="size-20 shrink-0 rounded-lg object-cover sm:size-24" />
        <div className="min-w-0">
          <span className="kicker">{category?.name ?? "Guide"}</span>
          <h3 className="mt-1.5 font-display text-[0.95rem] leading-snug font-bold tracking-tight">
            <Link to="/blog/$slug" params={{ slug: post.slug }} className="editorial-underline"><span className="absolute inset-0" aria-hidden="true" />{post.title}</Link>
          </h3>
          <p className="mt-1.5 text-xs text-muted-foreground">{post.author.name} · {post.readingTime} min read</p>
        </div>
      </article>
    );
  }

  return (
    <article className="card-surface group relative flex h-full flex-col overflow-hidden rounded-xl hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-elevated">
      <Link to="/blog/$slug" params={{ slug: post.slug }} tabIndex={-1} aria-hidden="true" className="block overflow-hidden bg-secondary">
        <img src={image} alt={`${category?.name ?? "Category"} editorial guide`} loading="lazy" decoding="async" width={1024} height={675} className="aspect-[16/9] w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]" />
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap items-center gap-3">
          <span className="kicker">{category?.name ?? "Guide"}</span>
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground"><Clock className="size-3.5" aria-hidden="true" />{post.readingTime} min</span>
        </div>
        <h3 className="font-display text-[1.05rem] leading-snug font-bold tracking-tight">
          <Link to="/blog/$slug" params={{ slug: post.slug }} className="editorial-underline"><span className="absolute inset-0" aria-hidden="true" />{post.title}</Link>
        </h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
        <p className="mt-auto rule-line pt-3 text-xs text-muted-foreground">By {post.author.name} · {post.date}</p>
      </div>
    </article>
  );
}
