import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Admin — PrimeChoiceReviews" }, { name: "robots", content: "noindex" }] }),
  component: AdminDashboard,
});

const TABLES = ["reviews", "blog_posts", "products", "categories", "brands", "deals"] as const;

function AdminDashboard() {
  const { user, roles, isStaff, signOut } = useAuth();
  const navigate = useNavigate();

  const { data: counts } = useQuery({
    queryKey: ["admin-counts"],
    queryFn: async () => {
      const entries = await Promise.all(
        TABLES.map(async (t) => {
          const { count } = await supabase.from(t).select("*", { count: "exact", head: true });
          return [t, count ?? 0] as const;
        }),
      );
      return Object.fromEntries(entries) as Record<string, number>;
    },
  });

  const claimAdmin = async () => {
    const { data, error } = await supabase.rpc("claim_admin");
    if (error) {
      toast.error(error.message);
      return;
    }
    toast[data ? "success" : "error"](
      data ? "You are now an admin. Reload to continue." : "An admin already exists.",
    );
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="kicker">Dashboard</p>
          <h1 className="font-display text-3xl font-extrabold">Content overview</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {user?.email} · {roles.length ? roles.join(", ") : "no role assigned"}
          </p>
        </div>
        <div className="flex gap-2">
          <Link to="/" className="text-sm underline">
            View site
          </Link>
          <Button
            variant="outline"
            onClick={async () => {
              await signOut();
              navigate({ to: "/auth", replace: true });
            }}
          >
            Sign out
          </Button>
        </div>
      </div>

      {!isStaff && (
        <div className="card-surface mt-8 rounded-xl p-6">
          <h2 className="font-display text-lg font-bold">Finish setup</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            No admin exists yet. Claim the admin role for this account to manage content.
          </p>
          <Button className="mt-4" onClick={claimAdmin}>
            Claim admin role
          </Button>
        </div>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TABLES.map((t) => (
          <div key={t} className="card-surface rounded-xl p-5">
            <p className="kicker">{t.replace("_", " ")}</p>
            <p className="mt-2 font-display text-3xl font-extrabold">{counts?.[t] ?? "—"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
