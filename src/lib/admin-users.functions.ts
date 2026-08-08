import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const roleSchema = z.object({
  userId: z.string().uuid(),
  role: z.enum(["admin", "editor", "author", "subscriber"]),
  action: z.enum(["grant", "revoke"]),
});

/** Grant or revoke a role. Admin-only; verified through the caller's own RLS client. */
export const setUserRole = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => roleSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { data: isAdmin, error: roleError } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (roleError) throw new Error(roleError.message);
    if (!isAdmin) throw new Error("Forbidden");

    if (data.action === "revoke" && data.userId === context.userId && data.role === "admin") {
      throw new Error("You cannot revoke your own admin role.");
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    if (data.action === "grant") {
      const { error } = await supabaseAdmin
        .from("user_roles")
        .upsert({ user_id: data.userId, role: data.role }, { onConflict: "user_id,role" });
      if (error) throw new Error(error.message);
    } else {
      const { error } = await supabaseAdmin
        .from("user_roles")
        .delete()
        .eq("user_id", data.userId)
        .eq("role", data.role);
      if (error) throw new Error(error.message);
    }
    return { ok: true };
  });