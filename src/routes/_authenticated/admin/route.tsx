import { createFileRoute, Link, Outlet, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Admin — PrimeChoiceReviews" },
      { name: "robots", content: "noindex" },
      { name: "description", content: "Internal content administration." },
    ],
  }),
  component: AdminLayout,
});

const nav = [
  { to: "/admin", label: "Dashboard", exact: true },
  { to: "/admin/products", label: "Products" },
  { to: "/admin/reviews", label: "Reviews" },
  { to: "/admin/posts", label: "Blog posts" },
  { to: "/admin/guides", label: "Guides" },
  { to: "/admin/comparisons", label: "Comparisons" },
  { to: "/admin/categories", label: "Categories" },
  { to: "/admin/brands", label: "Brands" },
  { to: "/admin/deals", label: "Deals" },
  { to: "/admin/networks", label: "Affiliate links" },
  { to: "/admin/subscribers", label: "Subscribers" },
  { to: "/admin/users", label: "Users & roles" },
] as const;

function AdminLayout() {
  const { user, roles, isStaff, canWrite, signOut } = useAuth();
  const navigate = useNavigate();

  const claimAdmin = async () => {
    const { data, error } = await supabase.rpc("claim_admin");
    if (error) return toast.error(error.message);
    if (data) {
      toast.success("You are now an admin. Reloading…");
      setTimeout(() => window.location.reload(), 800);
    } else {
      toast.error("An admin already exists.");
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <p className="kicker">Control room</p>
          <h2 className="font-display text-xl font-extrabold">PrimeChoice Admin</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {user?.email} · {roles.length ? roles.join(", ") : "no role assigned"}
          </p>
        </div>
        <div className="flex items-center gap-2">
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

      {!canWrite && (
        <div className="card-surface mt-6 rounded-xl p-6">
          <h3 className="font-display text-lg font-bold">Finish setup</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            This account has no publishing role yet. If no admin exists, you can claim it now.
          </p>
          <Button className="mt-4" onClick={claimAdmin}>
            Claim admin role
          </Button>
        </div>
      )}

      <div className="mt-8 grid gap-8 lg:grid-cols-[220px_1fr]">
        <nav className="flex flex-wrap gap-1 lg:flex-col">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.exact ?? false }}
              activeProps={{ className: "bg-secondary font-semibold text-foreground" }}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary/70"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className={isStaff || canWrite ? "" : "pointer-events-none opacity-50"}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}