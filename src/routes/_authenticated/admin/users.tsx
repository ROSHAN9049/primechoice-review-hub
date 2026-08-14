import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth, type AppRole } from "@/hooks/useAuth";

export const Route = createFileRoute("/_authenticated/admin/users")({
  component: UsersAdmin,
});

const ROLES: AppRole[] = ["admin", "editor", "author", "subscriber"];

function UsersAdmin() {
  const { isAdmin } = useAuth();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["admin", "users"],
    queryFn: async () => {
      const [{ data: profiles }, { data: roles }] = await Promise.all([
        supabase.from("profiles").select("id,email,display_name,created_at"),
        supabase.from("user_roles").select("user_id,role"),
      ]);
      return (profiles ?? []).map((p) => ({
        ...p,
        roles: (roles ?? []).filter((r) => r.user_id === p.id).map((r) => r.role as AppRole),
      }));
    },
  });

  return (
    <div>
      <p className="kicker">People</p>
      <h1 className="font-display text-2xl font-extrabold">Users & roles</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {isAdmin
          ? "User roles are displayed here. Role changes can be managed from Supabase until the secure server-side role manager is enabled."
          : "Only admins can manage roles."}
      </p>

      <div className="card-surface mt-6 overflow-x-auto rounded-xl">
        <table className="w-full text-sm">
          <thead className="border-b border-border text-left text-xs text-muted-foreground uppercase">
            <tr>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Roles</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-border/60 last:border-0">
                <td className="px-4 py-3">
                  <span className="font-medium">{u.display_name ?? "—"}</span>
                  <span className="block text-xs text-muted-foreground">{u.email}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1.5">
                    {ROLES.map((role) => (
                      <Button key={role} size="sm" variant={u.roles.includes(role) ? "default" : "outline"} disabled>
                        {role}
                      </Button>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
            {!isLoading && users.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-muted-foreground" colSpan={2}>
                  No users yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
