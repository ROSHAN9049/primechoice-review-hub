import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin/")({ component: Dashboard });

const TABLES = [
  { table: "products", label: "Products", to: "/admin/products" },
  { table: "reviews", label: "Reviews", to: "/admin/reviews" },
  { table: "blog_posts", label: "Blog posts", to: "/admin/posts" },
  { table: "guides", label: "Guides", to: "/admin/guides" },
  { table: "comparisons", label: "Comparisons", to: "/admin/comparisons" },
  { table: "categories", label: "Categories", to: "/admin/categories" },
  { table: "brands", label: "Brands", to: "/admin/brands" },
  { table: "deals", label: "Deals", to: "/admin/deals" },
  { table: "profiles", label: "Users", to: "/admin/users" },
  { table: "newsletter_subscribers", label: "Subscribers", to: "/admin/subscribers" },
] as const;

type ProductName = { id: string; title: string; slug: string };

function Dashboard() {
  const { data: counts } = useQuery({
    queryKey: ["admin", "counts"],
    queryFn: async () => {
      const entries = await Promise.all(TABLES.map(async (t) => {
        const { count } = await supabase.from(t.table as never).select("*", { count: "exact", head: true });
        return [t.table, count ?? 0] as const;
      }));
      return Object.fromEntries(entries) as Record<string, number>;
    },
  });

  const { data: analytics } = useQuery({
    queryKey: ["admin", "analytics"],
    queryFn: async () => {
      const [{ data: events }, { data: products }] = await Promise.all([
        supabase.from("analytics_events").select("event_type,path,ref_slug,network,created_at").order("created_at", { ascending: false }).limit(1000),
        supabase.from("products").select("id,title,slug"),
      ]);
      const rows = events ?? [];
      const productRows = (products ?? []) as ProductName[];
      const productMap = new Map(productRows.map((p) => [p.id, p]));
      const clicks = rows.filter((r) => r.event_type === "affiliate_click");
      const views = rows.filter((r) => r.event_type === "page_view");
      const byProduct = new Map<string, number>();
      for (const c of clicks) {
        const key = c.ref_slug ?? "unknown";
        byProduct.set(key, (byProduct.get(key) ?? 0) + 1);
      }
      const topProducts = [...byProduct.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8).map(([id, count]) => ({ product: productMap.get(id), id, count }));
      return { clicks: clicks.length, views: views.length, topProducts, latest: rows.slice(0, 8) };
    },
  });

  const revenue = ((analytics?.clicks ?? 0) * 0.04 * 45).toFixed(0);

  return <div>
    <p className="kicker">Overview</p>
    <h1 className="font-display text-2xl font-extrabold">Dashboard</h1>

    <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <Stat label="Affiliate clicks" value={analytics?.clicks ?? 0} />
      <Stat label="Page views" value={analytics?.views ?? 0} />
      <Stat label="Revenue estimate" value={`$${revenue}`} />
      <Stat label="Products" value={counts?.products ?? "—"} />
    </div>

    <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {TABLES.map((t) => <Link key={t.table} to={t.to} className="card-surface rounded-xl p-5 transition-colors hover:bg-secondary/50"><p className="kicker">{t.label}</p><p className="mt-2 font-display text-3xl font-extrabold">{counts?.[t.table] ?? "—"}</p></Link>)}
    </div>

    <div className="mt-10 grid gap-6 lg:grid-cols-2">
      <section className="card-surface rounded-xl p-5">
        <h2 className="font-display text-lg font-bold">Top product clicks</h2>
        <ul className="mt-3 space-y-3 text-sm">
          {(analytics?.topProducts ?? []).map(({ id, product, count }) => <li key={id} className="flex items-center justify-between gap-4"><span className="truncate text-muted-foreground">{product?.title ?? id}</span><span className="font-semibold">{count}</span></li>)}
          {!analytics?.topProducts.length && <li className="text-muted-foreground">No affiliate clicks tracked yet.</li>}
        </ul>
      </section>
      <section className="card-surface rounded-xl p-5">
        <h2 className="font-display text-lg font-bold">Latest activity</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {(analytics?.latest ?? []).map((e, i) => <li key={i} className="flex justify-between gap-4"><span className="truncate text-muted-foreground">{e.event_type} · {e.path}</span><span className="shrink-0 text-xs text-muted-foreground">{new Date(e.created_at).toLocaleDateString()}</span></li>)}
          {!analytics?.latest.length && <li className="text-muted-foreground">No events yet.</li>}
        </ul>
      </section>
    </div>
  </div>;
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return <div className="card-surface rounded-xl p-5"><p className="kicker">{label}</p><p className="mt-2 font-display text-3xl font-extrabold">{value}</p></div>;
}
