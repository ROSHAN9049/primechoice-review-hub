import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2, Link2, Sparkles, ExternalLink, Copy, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { importProductFromUrl, type ImportedProduct } from "@/lib/importProduct.functions";

export const Route = createFileRoute("/_authenticated/admin/import-product")({ component: ImportProductPage });

function Field({ label, value, onChange, multiline = false }: { label: string; value: string; onChange: (value: string) => void; multiline?: boolean }) {
  return <label className="block space-y-2"><span className="text-sm font-semibold">{label}</span>{multiline ? <Textarea value={value} onChange={(e) => onChange(e.target.value)} rows={5} /> : <Input value={value} onChange={(e) => onChange(e.target.value)} />}</label>;
}

function ImportProductPage() {
  const [url, setUrl] = useState("");
  const [product, setProduct] = useState<ImportedProduct | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  async function importProduct() {
    setError(""); setMessage(""); setProduct(null); setLoading(true);
    try { setProduct(await importProductFromUrl({ data: { url } })); } catch (err) { setError(err instanceof Error ? err.message : "Unable to import this URL."); } finally { setLoading(false); }
  }
  function update<K extends keyof ImportedProduct>(key: K, value: ImportedProduct[K]) { setProduct((current) => current ? { ...current, [key]: value } : current); }
  async function copyUrl() { if (!product) return; await navigator.clipboard.writeText(product.sourceUrl); setCopied(true); setTimeout(() => setCopied(false), 1600); }

  async function persist(status: "draft" | "published") {
    if (!product) return;
    setError(""); setMessage(""); setSaving(true);
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) throw new Error("Please sign in to the admin account before saving a product.");
      if (!product.title.trim()) throw new Error("Product name is required.");
      if (!product.slug.trim()) throw new Error("Slug is required.");
      if (!product.sourceUrl.trim()) throw new Error("Affiliate URL is required.");
      const priceMatch = product.price.replace(/[^0-9.]/g, "");
      const price = priceMatch ? Number(priceMatch) : null;
      const rating = product.rating ? Number(product.rating) : 0;
      if (Number.isNaN(price) || Number.isNaN(rating)) throw new Error("Price or rating is not a valid number.");
      const region = product.network === "Amazon India" ? "in" : product.network === "Amazon US" ? "us" : "global";
      const payload = {
        title: product.title.trim(), slug: product.slug.trim(), description: product.description.trim(), category: product.category.trim() || null,
        brand: null, price, image_url: product.image.trim() || null, images: product.image.trim() ? [product.image.trim()] : [],
        rating, currency: region === "in" ? "INR" : "USD", region, affiliate_link: product.sourceUrl.trim(),
        affiliate_links: [{ url: product.sourceUrl.trim(), network: product.network, enabled: true }],
        specifications: product.features.reduce<Record<string, string>>((acc, item, index) => { const [name, ...rest] = item.split(":"); acc[(name?.trim() || `Feature ${index + 1}`)] = rest.join(":").trim() || item; return acc; }, {}),
        pros: [], cons: [], seo: { title: product.seoTitle.trim(), description: product.seoDescription.trim() }, seo_title: product.seoTitle.trim(), seo_description: product.seoDescription.trim(), status,
      };
      const db = supabase as any;
      const { error: saveError } = await db.from("products").upsert(payload, { onConflict: "slug" });
      if (saveError) throw new Error(saveError.message);
      setMessage(status === "published" ? "Product published successfully." : "Product saved as draft successfully.");
    } catch (err) { setError(err instanceof Error ? err.message : "Unable to save the product."); }
    finally { setSaving(false); }
  }

  return <main className="min-h-screen bg-background px-4 py-10 sm:px-6 lg:px-8"><div className="mx-auto max-w-6xl">
    <div className="mb-8 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8"><div className="flex items-start gap-4"><div className="grid size-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary"><Sparkles className="size-6" /></div><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Admin tools</p><h1 className="mt-1 text-3xl font-bold">Import Product</h1><p className="mt-2 max-w-2xl text-muted-foreground">Paste an affiliate URL, fetch available metadata, edit it, then save a draft or publish it to the existing Supabase products table.</p></div></div>
      <div className="mt-7 flex flex-col gap-3 sm:flex-row"><div className="relative flex-1"><Link2 className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input className="h-12 pl-10" value={url} onChange={(e) => setUrl(e.target.value)} onKeyDown={(e) => e.key === "Enter" && !loading && importProduct()} placeholder="Paste Amazon, Digistore24 or another affiliate link…" /></div><Button className="h-12 px-7" disabled={!url.trim() || loading} onClick={importProduct}>{loading ? <><Loader2 className="mr-2 size-4 animate-spin" />Fetching…</> : <><Sparkles className="mr-2 size-4" />Fetch product</>}</Button></div>
      {error && <p className="mt-4 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">{error}</p>}{message && <p className="mt-4 rounded-lg border border-success/30 bg-success/5 p-3 text-sm text-success">{message}</p>}<p className="mt-3 text-xs text-muted-foreground">Metadata fetching uses public page metadata only. Some marketplaces can block automated access; the affiliate URL remains editable and can be completed manually.</p>
    </div>
    {product && <section className="grid gap-6 lg:grid-cols-[1fr_1.35fr]"><div className="rounded-2xl border border-border bg-card p-6 shadow-sm"><div className="flex items-center justify-between gap-3"><h2 className="text-xl font-bold">Imported preview</h2><span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">{product.network}</span></div><div className="mt-6 overflow-hidden rounded-xl border border-border bg-muted/30">{product.image ? <img src={product.image} alt={product.title || "Imported product"} className="aspect-square w-full object-contain" /> : <div className="grid aspect-square place-items-center text-sm text-muted-foreground">No image metadata found</div>}</div><h3 className="mt-5 text-lg font-bold">{product.title || "Product title not found"}</h3>{product.price && <p className="mt-2 text-xl font-bold text-primary">{product.price}</p>}{product.note && <p className="mt-4 rounded-lg bg-muted p-3 text-xs leading-relaxed text-muted-foreground">{product.note}</p>}<div className="mt-4 flex gap-2"><Button variant="outline" size="sm" onClick={copyUrl}>{copied ? <CheckCircle2 className="mr-2 size-4" /> : <Copy className="mr-2 size-4" />}{copied ? "Copied" : "Copy affiliate URL"}</Button><Button variant="outline" size="sm" asChild><a href={product.sourceUrl} target="_blank" rel="noopener noreferrer"><ExternalLink className="mr-2 size-4" />Open source</a></Button></div></div>
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm"><div className="mb-6"><h2 className="text-xl font-bold">Review-ready details</h2><p className="mt-1 text-sm text-muted-foreground">Everything is editable before saving or publishing.</p></div><div className="space-y-5"><Field label="Product name" value={product.title} onChange={(v) => update("title", v)} /><Field label="Description" value={product.description} onChange={(v) => update("description", v)} multiline /><div className="grid gap-5 sm:grid-cols-2"><Field label="Price" value={product.price} onChange={(v) => update("price", v)} /><Field label="Rating" value={product.rating} onChange={(v) => update("rating", v)} /><Field label="Category" value={product.category} onChange={(v) => update("category", v)} /><Field label="Slug" value={product.slug} onChange={(v) => update("slug", v)} /></div><Field label="Product image URL" value={product.image} onChange={(v) => update("image", v)} /><Field label="Affiliate URL" value={product.sourceUrl} onChange={(v) => update("sourceUrl", v)} /><Field label="Features / specifications" value={product.features.join("\n")} onChange={(v) => update("features", v.split("\n").map((x) => x.trim()).filter(Boolean))} multiline /><Field label="SEO title" value={product.seoTitle} onChange={(v) => update("seoTitle", v)} /><Field label="SEO meta description" value={product.seoDescription} onChange={(v) => update("seoDescription", v)} multiline /><div className="flex flex-col gap-3 border-t border-border pt-5 sm:flex-row"><Button disabled={saving} onClick={() => persist("draft")} className="flex-1">{saving ? <Loader2 className="mr-2 size-4 animate-spin" /> : null}Save Draft</Button><Button disabled={saving} variant="outline" onClick={() => persist("published")} className="flex-1">Publish</Button></div><p className="text-xs text-muted-foreground">Draft and publish use the existing products table and its staff-only write policy.</p></div></div></section>}
  </div></main>;
}
