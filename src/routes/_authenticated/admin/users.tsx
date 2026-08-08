import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { setUserRole } from "@/lib/admin-users.functions";
import { useAuth, type AppRole } from "@/hooks/useAuth";

export const Route = createFileRoute("/_authenticated/admin/users")({
  component: UsersAdmin,
});

const ROLES: AppRole[] = ["admin", "editor", "author", "subscriber"];

function UsersAdmin() {
  const qc = useQueryClient();
  const { isAdmin } = useAuth();
  const mutateRole = useServerFn(setUserRole);

  const { data: users = [] } = useQuery({
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

  const toggle = useMutation({
    mutationFn: (vars: { userId: string; role: AppRole; action: "grant" | "revoke" }) =>
      mutateRole({ data: vars }),
    onSuccess: () => {
      toast.success("Roles updated");
      void qc.invalidateQueries({ queryKey: ["admin", "users"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div>
      <p className="kicker">People</p>
      <h1 className="font-display text-2xl font-extrabold">Users & roles</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {isAdmin ? "Click a role to grant or revoke it." : "Only admins can change roles."}
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
                    {ROLES.map((role) => {
                      const has = u.roles.includes(role);
                      return (
                        <Button
                          key={role}
                          size="sm"
                          variant={has ? "default" : "outline"}
                          disabled={!isAdmin || toggle.isPending}
                          onClick={() =>
                            toggle.mutate({
                              userId: u.id,
                              role,
                              action: has ? "revoke" : "grant",
                            })
                          }
                        >
                          {role}
                        </Button>
                      );
                    })}
                  </div>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
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