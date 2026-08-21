import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2, Link2, Sparkles, ExternalLink, Copy, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { importProductFromUrl, type ImportedProduct } from "@/lib/importProduct.functions";

export const Route = createFileRoute("/admin/import-product")({ component: ImportProductPage });

function Field({ label, value, onChange, multiline = false }: { label: string; value: string; onChange: (value: string) => void; multiline?: boolean }) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-semibold">{label}</span>
      {multiline ? <Textarea value={value} onChange={(e) => onChange(e.target.value)} rows={5} /> : <Input value={value} onChange={(e) => onChange(e.target.value)} />}
    </label>
  );
}

function ImportProductPage() {
  const [url, setUrl] = useState("");
  const [product, setProduct] = useState<ImportedProduct | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  async function importProduct() {
    setError(""); setProduct(null); setLoading(true);
    try { setProduct(await importProductFromUrl({ data: { url } })); }
    catch (err) { setError(err instanceof Error ? err.message : "Unable to import this URL."); }
    finally { setLoading(false); }
  }
  function update<K extends keyof ImportedProduct>(key: K, value: ImportedProduct[K]) { setProduct((current) => current ? { ...current, [key]: value } : current); }
  async function copyUrl() { if (!product) return; await navigator.clipboard.writeText(product.sourceUrl); setCopied(true); setTimeout(() => setCopied(false), 1600); }

  return (
    <main className="min-h-screen bg-background px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <div className="flex items-start gap-4">
            <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary"><Sparkles className="size-6" /></div>
            <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Admin tools</p><h1 className="mt-1 text-3xl font-bold">Import Product</h1><p className="mt-2 max-w-2xl text-muted-foreground">Paste an affiliate URL. We will detect the source and try to read publicly available product metadata, then give you an editable preview before publishing.</p></div>
          </div>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1"><Link2 className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input className="h-12 pl-10" value={url} onChange={(e) => setUrl(e.target.value)} onKeyDown={(e) => e.key === "Enter" && !loading && importProduct()} placeholder="Paste Amazon, Digistore24 or another affiliate link…" /></div>
            <Button className="h-12 px-7" disabled={!url.trim() || loading} onClick={importProduct}>{loading ? <><Loader2 className="mr-2 size-4 animate-spin" />Fetching…</> : <><Sparkles className="mr-2 size-4" />Fetch product</>}</Button>
          </div>
          {error && <p className="mt-4 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">{error}</p>}
          <p className="mt-3 text-xs text-muted-foreground">Automatic fetching uses normal server-side requests and public metadata only. Some marketplaces may block automated access; in that case the affiliate URL stays intact and you can complete the fields manually.</p>
        </div>

        {product && (
          <section className="grid gap-6 lg:grid-cols-[1fr_1.35fr]">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between gap-3"><h2 className="text-xl font-bold">Imported preview</h2><span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">{product.network}</span></div>
              <div className="mt-6 overflow-hidden rounded-xl border border-border bg-muted/30">
                {product.image ? <img src={product.image} alt={product.title || "Imported product"} className="aspect-square w-full object-contain" /> : <div className="grid aspect-square place-items-center text-sm text-muted-foreground">No image metadata found</div>}
              </div>
              <h3 className="mt-5 text-lg font-bold">{product.title || "Product title not found"}</h3>
              {product.price && <p className="mt-2 text-xl font-bold text-primary">{product.price}</p>}
              {product.note && <p className="mt-4 rounded-lg bg-muted p-3 text-xs leading-relaxed text-muted-foreground">{product.note}</p>}
              <div className="mt-4 flex gap-2"><Button variant="outline" size="sm" onClick={copyUrl}>{copied ? <CheckCircle2 className="mr-2 size-4" /> : <Copy className="mr-2 size-4" />}{copied ? "Copied" : "Copy affiliate URL"}</Button><Button variant="outline" size="sm" asChild><a href={product.sourceUrl} target="_blank" rel="noopener noreferrer"><ExternalLink className="mr-2 size-4" />Open source</a></Button></div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="mb-6"><h2 className="text-xl font-bold">Review-ready details</h2><p className="mt-1 text-sm text-muted-foreground">Everything is editable before you save or publish.</p></div>
              <div className="space-y-5">
                <Field label="Product name" value={product.title} onChange={(v) => update("title", v)} />
                <Field label="Description" value={product.description} onChange={(v) => update("description", v)} multiline />
                <div className="grid gap-5 sm:grid-cols-2"><Field label="Price" value={product.price} onChange={(v) => update("price", v)} /><Field label="Rating" value={product.rating} onChange={(v) => update("rating", v)} /><Field label="Category" value={product.category} onChange={(v) => update("category", v)} /><Field label="Slug" value={product.slug} onChange={(v) => update("slug", v)} /></div>
                <Field label="Product image URL" value={product.image} onChange={(v) => update("image", v)} />
                <Field label="Affiliate URL" value={product.sourceUrl} onChange={(v) => update("sourceUrl", v)} />
                <Field label="Features / specifications" value={product.features.join("\n")} onChange={(v) => update("features", v.split("\n").map((x) => x.trim()).filter(Boolean))} multiline />
                <Field label="SEO title" value={product.seoTitle} onChange={(v) => update("seoTitle", v)} />
                <Field label="SEO meta description" value={product.seoDescription} onChange={(v) => update("seoDescription", v)} multiline />
                <div className="flex flex-col gap-3 border-t border-border pt-5 sm:flex-row"><Button disabled className="flex-1">Save Draft (next step)</Button><Button disabled variant="outline" className="flex-1">Publish (next step)</Button></div>
                <p className="text-xs text-muted-foreground">The import and preview are live first; persistence/publish will be connected to the existing products table after its write/RLS rules are verified.</p>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
