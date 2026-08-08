import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Download, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin/subscribers")({
  component: Subscribers,
});

function Subscribers() {
  const qc = useQueryClient();
  const { data: rows = [] } = useQuery({
    queryKey: ["admin", "newsletter_subscribers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("newsletter_subscribers")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1000);
      if (error) throw error;
      return data ?? [];
    },
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("newsletter_subscribers").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Removed");
      void qc.invalidateQueries({ queryKey: ["admin", "newsletter_subscribers"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const exportCsv = () => {
    const csv = ["email,status,source,created_at"]
      .concat(rows.map((r) => [r.email, r.status, r.source, r.created_at].join(",")))
      .join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "subscribers.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="kicker">Audience</p>
          <h1 className="font-display text-2xl font-extrabold">Newsletter subscribers</h1>
          <p className="mt-1 text-sm text-muted-foreground">{rows.length} total</p>
        </div>
        <Button variant="outline" size="sm" onClick={exportCsv}>
          <Download className="size-4" /> Export CSV
        </Button>
      </div>
      <div className="card-surface mt-6 overflow-x-auto rounded-xl">
        <table className="w-full text-sm">
          <thead className="border-b border-border text-left text-xs text-muted-foreground uppercase">
            <tr>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Source</th>
              <th className="px-4 py-3">Joined</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b border-border/60 last:border-0">
                <td className="px-4 py-3">{r.email}</td>
                <td className="px-4 py-3 text-muted-foreground">{r.source}</td>
                <td className="px-4 py-3 text-muted-foreground">
                  {new Date(r.created_at).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Remove"
                    onClick={() => remove.mutate(r.id)}
                  >
                    <Trash2 className="size-4 text-destructive" />
                  </Button>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-muted-foreground" colSpan={4}>
                  No subscribers yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}