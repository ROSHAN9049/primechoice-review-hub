import { createFileRoute } from "@tanstack/react-router";
import { ResourceManager } from "@/components/admin/ResourceManager";

const DIGISTORE_DEFAULT = JSON.stringify([{ network: "digistore24", productId: "", affiliateId: "ROSHANpratibha", campaignKey: "site", enabled: true }], null, 2);

export const Route = createFileRoute("/_authenticated/admin/products")({
  component: () => (
    <ResourceManager
      table="products"
      title="Products"
      description="Paste one affiliate/product link and let the manager detect the network, build the affiliate URL, prepare SEO metadata and publish with tracking support."
      labelField="title"
      fields={[
        { name: "title", label: "Product Title", required: true, list: true, placeholder: "Product name" },
        { name: "slug", label: "Slug", placeholder: "auto-generated if blank" },
        { name: "amazon_url", label: "Affiliate / Product URL", placeholder: "Amazon.in, Amazon.com or Digistore24 product link", help: "Paste one normal product/affiliate URL. Amazon India/US and Digistore24 are detected automatically." },
        { name: "category", label: "Category", list: true, placeholder: "auto-detected if blank" },
        { name: "brand", label: "Brand", list: true },
        { name: "status", label: "Status", type: "select", options: ["draft", "pending", "published", "archived"], default: "published", list: true },
        { name: "rating", label: "Rating", type: "number", placeholder: "4.5" },
        { name: "price", label: "Price", type: "number" },
        { name: "currency", label: "Currency", default: "USD" },
        { name: "region", label: "Region", type: "select", options: ["global", "us", "in"], default: "global" },
        { name: "description", label: "Description", type: "textarea", placeholder: "Short useful product description" },
        { name: "images", label: "Gallery (JSON array of image URLs/keys)", type: "json", default: "[]", help: '["https://example.com/product.jpg"]' },
        { name: "affiliate_links", label: "Affiliate links (JSON)", type: "json", default: DIGISTORE_DEFAULT, help: "Generated automatically from the pasted product URL. Manual links remain supported." },
        { name: "specifications", label: "Specifications (JSON)", type: "json", default: "[]", help: '[{"name":"Feature","value":"Value"}]' },
        { name: "pros", label: "Pros (JSON array)", type: "json", default: "[]", help: '["Easy to use","Good value"]' },
        { name: "cons", label: "Cons (JSON array)", type: "json", default: "[]", help: '["Limited feature X"]' },
        { name: "seo", label: "SEO (JSON: title, description, keywords)", type: "json", default: "{}", help: "Auto-generated from title/category when left empty." },
      ]}
    />
  ),
});
