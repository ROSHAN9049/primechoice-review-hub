import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CalendarClock, Megaphone, Send, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

export const Route = createFileRoute("/_authenticated/admin/promotion")({
  component: Promotion,
});

const platforms = ["facebook", "instagram", "youtube", "pinterest", "x", "telegram"] as const;

function Promotion() {
  const qc = useQueryClient();
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");
  const [selected, setSelected] = useState<string[]>(["facebook", "instagram", "youtube", "pinterest"]);
  const [scheduledAt, setScheduledAt] = useState("");

  const { data: rows = [] } = useQuery({
    queryKey: ["admin", "social_promotions"],
    queryFn: async () => {
      const { data, error } = await supabase.from("social_promotions").select("*").order("created_at", { ascending: false }).limit(20);
      if (error) throw error;
      return data ?? [];
    },
  });

  const { data: accounts = [] } = useQuery({
    queryKey: ["admin", "social_accounts"],
    queryFn: async () => {
      const { data, error } = await supabase.from("social_accounts").select("platform,account_name,status").order("platform");
      if (error) throw error;
      return data ?? [];
    },
  });

  const createPromotion = useMutation({
    mutationFn: async () => {
      if (!title.trim() || !url.trim() || selected.length === 0) throw new Error("Add a title, article URL and at least one platform.");
      const { error } = await supabase.from("social_promotions").insert({
        title: title.trim(),
        source_url: url.trim(),
        content: { message: message.trim(), title: title.trim(), url: url.trim() },
        platforms: selected,
        status: scheduledAt ? "scheduled" : "draft",
        scheduled_at: scheduledAt ? new Date(scheduledAt).toISOString() : null,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success(scheduledAt ? "Promotion scheduled." : "Promotion saved as draft.");
      setTitle(""); setUrl(""); setMessage(""); setScheduledAt("");
      void qc.invalidateQueries({ queryKey: ["admin", "social_promotions"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const toggle = (platform: string) => setSelected((current) => current.includes(platform) ? current.filter((p) => p !== platform) : [...current, platform]);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="kicker">Growth engine</p>
          <h1 className="font-display text-2xl font-extrabold">Auto Promotion</h1>
          <p className="mt-1 text-sm text-muted-foreground">Create and schedule compliant social promotions from one place.</p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground"><ShieldCheck className="size-4" /> Official API connections only</div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
        <div className="card-surface rounded-xl p-5">
          <div className="flex items-center gap-2"><Megaphone className="size-5 text-primary" /><h2 className="font-display text-lg font-bold">Create promotion</h2></div>
          <div className="mt-5 grid gap-4">
            <label className="text-sm font-medium">Article title<input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Best Wireless Earbuds in India 2026" className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary" /></label>
            <label className="text-sm font-medium">Article URL<input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://primechoice-review-hub.vercel.app/guides/..." className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary" /></label>
            <label className="text-sm font-medium">Promotion message<textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={5} placeholder="Write a useful, non-spam social post. AI generation can be connected next." className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary" /></label>
            <div><p className="text-sm font-medium">Platforms</p><div className="mt-2 flex flex-wrap gap-2">{platforms.map((platform) => <button type="button" key={platform} onClick={() => toggle(platform)} className={`rounded-full border px-3 py-1.5 text-xs font-semibold capitalize transition ${selected.includes(platform) ? "border-primary bg-primary/10 text-foreground" : "border-border text-muted-foreground"}`}>{platform}</button>)}</div></div>
            <label className="text-sm font-medium">Schedule (optional)<div className="relative mt-1"><CalendarClock className="absolute left-3 top-2.5 size-4 text-muted-foreground" /><input type="datetime-local" value={scheduledAt} onChange={(e) => setScheduledAt(e.target.value)} className="w-full rounded-lg border border-border bg-background py-2 pl-9 pr-3" /></div></label>
            <Button onClick={() => createPromotion.mutate()} disabled={createPromotion.isPending}><Send className="size-4" /> {createPromotion.isPending ? "Saving…" : scheduledAt ? "Schedule promotion" : "Save draft"}</Button>
          </div>
        </div>

        <div className="card-surface rounded-xl p-5">
          <h2 className="font-display text-lg font-bold">Connected accounts</h2>
          <p className="mt-1 text-sm text-muted-foreground">Connect official platform accounts before publishing.</p>
          <div className="mt-4 space-y-2">{platforms.map((platform) => { const account = accounts.find((a) => a.platform === platform); return <div key={platform} className="flex items-center justify-between rounded-lg border border-border px-3 py-2"><span className="text-sm font-medium capitalize">{platform}</span><span className={`text-xs ${account?.status === "connected" ? "text-emerald-600" : "text-muted-foreground"}`}>{account?.status === "connected" ? account.account_name : "Not connected"}</span></div>; })}</div>
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">OAuth credentials and access tokens should be stored server-side. This dashboard never asks for platform passwords.</p>
        </div>
      </div>

      <div className="mt-6 card-surface overflow-x-auto rounded-xl">
        <div className="flex items-center gap-2 border-b border-border px-5 py-4"><CalendarClock className="size-4" /><h2 className="font-display font-bold">Promotion queue</h2></div>
        <table className="w-full text-sm"><thead className="border-b border-border text-left text-xs text-muted-foreground uppercase"><tr><th className="px-5 py-3">Title</th><th className="px-5 py-3">Platforms</th><th className="px-5 py-3">Status</th><th className="px-5 py-3">Scheduled</th></tr></thead><tbody>{rows.map((row) => <tr key={row.id} className="border-b border-border/60"><td className="px-5 py-3 font-medium">{row.title}</td><td className="px-5 py-3 text-muted-foreground">{Array.isArray(row.platforms) ? row.platforms.join(", ") : "—"}</td><td className="px-5 py-3 capitalize">{row.status}</td><td className="px-5 py-3 text-muted-foreground">{row.scheduled_at ? new Date(row.scheduled_at).toLocaleString() : "—"}</td></tr>)}{rows.length === 0 && <tr><td colSpan={4} className="px-5 py-8 text-center text-muted-foreground">No promotions yet.</td></tr>}</tbody></table>
      </div>
    </div>
  );
}
