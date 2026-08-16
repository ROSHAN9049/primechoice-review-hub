import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2, PackageSearch, Save, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin/import-product")({ component: ImportProductPage });
type Product = Record<string, any>;

function ImportProductPage() {
  const [affiliateUrl, setAffiliateUrl] = useState("");
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchProduct = async () => {
    if (!affiliateUrl.trim()) return toast.error("Affiliate link paste karo.");
    setLoading(true);
    try {
      const response = await fetch("/api/import-amazon-product", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ affiliateUrl: affiliateUrl.trim() }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Product fetch failed.");
      setProduct(data.product);
      toast.success("Product information fetched successfully.");
    } catch (error) { toast.error(error instanceof Error ? error.message : "Product fetch failed."); }
    finally { setLoading(false); }
  };

  const saveProduct = async (status: "draft" | "published") => {
    if (!product) return;
    setSaving(true);
    try {
      const { error } = await supabase.from("products" as never).insert({ ...product, status } as never);
      if (error) throw error;
      toast.success(status === "published" ? "Product published." : "Product saved as draft.");
      if (status === "published") setProduct(null);
    } catch (error) { toast.error(error instanceof Error ? error.message : "Could not save product."); }
    finally { setSaving(false); }
  };

  const setField = (name: string, value: unknown) => setProduct((current) => current ? { ...current, [name]: value } : current);

  return <div className="mx-auto max-w-5xl space-y-6 p-4 md:p-6">
    <Card><CardHeader><CardTitle className="flex items-center gap-2"><PackageSearch className="h-5 w-5" /> Quick Affiliate Product Import</CardTitle><p className="text-sm text-muted-foreground">Sirf affiliate/product link paste karo. Available product data automatically fetch ho jayega.</p></CardHeader><CardContent className="space-y-3">
      <Label htmlFor="affiliate-url">Affiliate Link</Label><div className="flex flex-col gap-2 sm:flex-row"><Input id="affiliate-url" value={affiliateUrl} onChange={(e) => setAffiliateUrl(e.target.value)} onKeyDown={(e) => e.key === "Enter" && void fetchProduct()} placeholder="Paste Amazon affiliate link..." /><Button onClick={() => void fetchProduct()} disabled={loading} className="sm:min-w-40">{loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Fetching...</> : "Fetch Product"}</Button></div>
    </CardContent></Card>

    {product && <Card><CardHeader><CardTitle>Product Preview & Edit</CardTitle></CardHeader><CardContent className="space-y-5">
      {Array.isArray(product.images) && product.images.length > 0 && <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{product.images.slice(0, 8).map((image: string, index: number) => <img key={`${image}-${index}`} src={image} alt={product.title || "Product"} className="aspect-square w-full rounded-lg border object-contain" />)}</div>}
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Product Name" value={product.title ?? ""} onChange={(v) => setField("title", v)} /><Field label="Brand" value={product.brand ?? ""} onChange={(v) => setField("brand", v)} /><Field label="Category" value={product.category ?? ""} onChange={(v) => setField("category", v)} /><Field label="Price" value={product.price ?? ""} onChange={(v) => setField("price", v === "" ? null : Number(v))} type="number" /><Field label="Currency" value={product.currency ?? ""} onChange={(v) => setField("currency", v)} /><Field label="Slug" value={product.slug ?? ""} onChange={(v) => setField("slug", v)} />
      </div>
      <TextField label="Description" value={product.description ?? ""} onChange={(v) => setField("description", v)} />
      <TextField label="Pros (one per line)" value={Array.isArray(product.pros) ? product.pros.join("\n") : ""} onChange={(v) => setField("pros", v.split("\n").map((x) => x.trim()).filter(Boolean))} />
      <TextField label="Cons (one per line)" value={Array.isArray(product.cons) ? product.cons.join("\n") : ""} onChange={(v) => setField("cons", v.split("\n").map((x) => x.trim()).filter(Boolean))} />
      <TextField label="SEO Title" value={product.seo?.title ?? ""} onChange={(v) => setField("seo", { ...(product.seo ?? {}), title: v })} />
      <TextField label="SEO Description" value={product.seo?.description ?? ""} onChange={(v) => setField("seo", { ...(product.seo ?? {}), description: v })} />
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-end"><Button variant="outline" onClick={() => void saveProduct("draft")} disabled={saving}><Save className="mr-2 h-4 w-4" /> Save Draft</Button><Button onClick={() => void saveProduct("published")} disabled={saving}><Send className="mr-2 h-4 w-4" /> Publish Product</Button></div>
    </CardContent></Card>}
  </div>;
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string | number; onChange: (value: string) => void; type?: string }) { return <div className="space-y-2"><Label>{label}</Label><Input type={type} value={value} onChange={(e) => onChange(e.target.value)} /></div>; }
function TextField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) { return <div className="space-y-2"><Label>{label}</Label><Textarea value={value} onChange={(e) => onChange(e.target.value)} rows={5} /></div>; }
