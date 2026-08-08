import { createFileRoute } from "@tanstack/react-router";
import { ResourceManager } from "@/components/admin/ResourceManager";

export const Route = createFileRoute("/_authenticated/admin/products")({
  component: () => (
    <ResourceManager
      table="products"
      title="Products"
      description="Catalogue entries powering product pages, comparisons and deals."
      labelField="title"
      fields={[
        { name: "title", label: "Title", required: true, list: true },
        { name: "slug", label: "Slug", required: true, list: true },
        { name: "category", label: "Category", list: true },
        { name: "brand", label: "Brand", list: true },
        { name: "status", label: "Status", type: "select", options: ["draft", "pending", "published", "archived"], default: "published" },
        { name: "rating", label: "Rating", type: "number" },
        { name: "price", label: "Price", type: "number" },
        { name: "currency", label: "Currency", default: "USD" },
        { name: "region", label: "Region", type: "select", options: ["global", "us", "in"], default: "global" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "images", label: "Gallery (JSON array of image keys/URLs)", type: "json", default: "[]" },
        { name: "affiliate_links", label: "Affiliate links (JSON)", type: "json", default: "[]", help: 'e.g. [{"network":"amazon_us","productId":"B0XXXX"}]' },
        { name: "specifications", label: "Specifications (JSON)", type: "json", default: "[]" },
        { name: "pros", label: "Pros (JSON array)", type: "json", default: "[]" },
        { name: "cons", label: "Cons (JSON array)", type: "json", default: "[]" },
        { name: "seo", label: "SEO (JSON: title, description)", type: "json", default: "{}" },
      ]}
    />
  ),
});