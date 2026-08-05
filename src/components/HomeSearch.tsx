import { Link, useNavigate } from "@tanstack/react-router";
import { Search, TrendingUp } from "lucide-react";
import { useMemo, useState, type FormEvent } from "react";
import { posts } from "@/data/posts";
import { reviews } from "@/data/reviews";

interface Suggestion {
  label: string;
  slug: string;
  kind: "review" | "article";
}

const index: Suggestion[] = [
  ...reviews.map((r) => ({ label: r.product, slug: r.slug, kind: "review" as const })),
  ...posts.map((p) => ({ label: p.title, slug: p.slug, kind: "article" as const })),
];

const popular = reviews.slice(0, 4).map((r) => r.product);

export function HomeSearch() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [focused, setFocused] = useState(false);

  const matches = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (term.length < 2) return [];
    return index.filter((s) => s.label.toLowerCase().includes(term)).slice(0, 6);
  }, [q]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    navigate({ to: "/search", search: { q } });
  };

  return (
    <div className="relative w-full max-w-xl">
      <form onSubmit={submit} role="search" className="relative">
        <label htmlFor="home-search" className="sr-only">
          Search products, reviews and guides
        </label>
        <Search
          className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <input
          id="home-search"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => window.setTimeout(() => setFocused(false), 150)}
          placeholder="Search products, reviews and guides…"
          autoComplete="off"
          className="min-h-14 w-full rounded-xl border border-border bg-card/80 pr-28 pl-11 text-base shadow-soft backdrop-blur-xl outline-none focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-ring/40"
        />
        <button
          type="submit"
          className="absolute top-1/2 right-2 min-h-11 -translate-y-1/2 rounded-lg px-5 font-display text-sm font-bold tracking-wide text-primary-foreground uppercase"
          style={{ backgroundImage: "var(--gradient-primary)" }}
        >
          Search
        </button>
      </form>

      {focused && matches.length > 0 && (
        <ul className="glass-card absolute top-full right-0 left-0 z-40 mt-2 overflow-hidden rounded-xl py-1 text-left">
          {matches.map((m) => (
            <li key={`${m.kind}-${m.slug}`}>
              <Link
                to={m.kind === "review" ? "/reviews/$slug" : "/blog/$slug"}
                params={{ slug: m.slug }}
                className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm hover:bg-accent"
              >
                <span className="truncate">{m.label}</span>
                <span className="kicker shrink-0">{m.kind}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
        <TrendingUp className="size-3.5 text-primary-glow" aria-hidden="true" />
        <span className="font-medium">Popular:</span>
        {popular.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => navigate({ to: "/search", search: { q: p } })}
            className="rounded-md border border-border px-2 py-0.5 transition-colors hover:border-primary/40 hover:text-primary-glow"
          >
            {p}
          </button>
        ))}
      </p>
    </div>
  );
}
