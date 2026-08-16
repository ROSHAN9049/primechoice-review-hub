import { useState } from "react";
import { Loader2, Sparkles, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";

type ImportedProduct = {
  title: string;
  slug: string;
  category: string;
  brand: string | null;
  status: string;
  rating: number | null;
  price: number | null;
  currency: string;
  region: string;
  description: string | null;
  images: string[];
  affiliate_links: unknown[];
  specifications: unknown[];
  pros: string[];
  cons: string[];
  seo: { title: string; description: string; keywords: string };
};

export function AffiliateProductImporter() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<ImportedProduct | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchProduct = async () => {
    if (!url.trim()) return toast.error("Affiliate link paste karo.");
    setLoading(true);
    setProduct(null);
    try {
      const response = await fetch("/api/import-amazon-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ affiliateUrl: url.trim() }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error ?? "Product fetch failed.");
      setProduct(data.product);
      toast.success("Amazon product details fetched successfully.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Product fetch failed.");
    } finally {
      setLoading(false);
    }
  };

  const update = <K extends keyof ImportedProduct>(key: K, value: ImportedProduct[K]) => {
    setProduct((current) => (current ? { ...current, [key]: value } : current));
  };

  const saveDraft = async () => {
    if (!product) return;
    setSaving(true);
    try {
      const { error } = await supabase.from("products").insert({
        title: product.title,
        slug: product.slug,
        category: product.category,
        brand: product.brand,
        status: "draft",
        rating: product.rating,
        price: product.price,
        currency: product.currency,
        region: product.region,
        description: product.description,
        images: product.images,
        affiliate_links: product.affiliate_links,
        specifications: product.specifications,
        pros: product.pros,
        cons: product.cons,
        seo: product.seo,
      } as never);
      if (error) throw error;
      toast.success("Product saved as draft. You can publish it from Products.");
      setProduct(null);
      setUrl("");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save product.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="mb-8 rounded-2xl border bg-card p-5 shadow-sm">
      <div className="mb-5 flex items-start gap-3">
        <div className="rounded-xl bg-primary/10 p-2 text-primary"><Sparkles className="h-5 w-5" /></div>
        <div>
          <h2 className="text-lg font-semibold">Quick Affiliate Product Import</h2>
          <p className="text-sm text-muted-foreground">Amazon affiliate link paste karo — product details automatically fetch ho jayengi.</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          onKeyDown={(event) => { if (event.key === "Enter") void fetchProduct(); }}
          placeholder="Paste Amazon affiliate/product link…"
          className="h-11 flex-1"
        />
        <Button onClick={() => void fetchProduct()} disabled={loading} className="h-11 sm:min-w-36">
          {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Fetching…</> : "Fetch Product"}
        </Button>
      </div>

      {product && (
        <div className="mt-6 grid gap-5 lg:grid-cols-[220px_1fr]">
          <div>
            {product.images[0] ? (
              <img src={product.images[0]} alt={product.title} className="aspect-square w-full rounded-xl border object-contain bg-white p-3" />
            ) : <div className="aspect-square rounded-xl border bg-muted" />}
            <a href={url} target="_blank" rel="noreferrer" className="mt-2 flex items-center justify-center gap-1 text-xs text-primary hover:underline">
              Open Amazon listing <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          <div className="space-y-4">
            <div>
              <Label>Product title</Label>
              <Input value={product.title} onChange={(e) => update("title", e.target.value)} />
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div><Label>Category</Label><Input value={product.category} onChange={(e) => update("category", e.target.value)} /></div>
              <div><Label>Brand</Label><Input value={product.brand ?? ""} onChange={(e) => update("brand", e.target.value)} /></div>
              <div><Label>Price</Label><Input value={product.price ?? ""} onChange={(e) => update("price", e.target.value === "" ? null : Number(e.target.value))} /></div>
            </div>
            <div>
              <Label>Description</Label>
              <Textarea value={product.description ?? ""} onChange={(e) => update("description", e.target.value)} rows={5} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div><Label>SEO title</Label><Input value={product.seo.title} onChange={(e) => update("seo", { ...product.seo, title: e.target.value })} /></div>
              <div><Label>SEO description</Label><Input value={product.seo.description} onChange={(e) => update("seo", { ...product.seo, description: e.target.value })} /></div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button onClick={() => void saveDraft()} disabled={saving}>{saving ? "Saving…" : "Save as Draft"}</Button>
              <Button variant="outline" onClick={() => setProduct(null)}>Clear Preview</Button>
            </div>
            <p className="text-xs text-muted-foreground">Fetched data is editable. Verify Amazon data and your affiliate disclosure before publishing.</p>
          </div>
        </div>
      )}
    </section>
  );
}
