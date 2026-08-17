import { createFileRoute } from "@tanstack/react-router";
import { ResourceManager } from "@/components/admin/ResourceManager";

const DIGISTORE_DEFAULT = JSON.stringify([{ network: "digistore24", productId: "", affiliateId: "ROSHANpratibha", campaignKey: "site", enabled: true }], null, 2);

export const Route = createFileRoute("/_authenticated/admin/products")({
  component: () => (
    <ResourceManager
      table="products"
      title="Products"
      description="Paste one affiliate/product link to prepare a product draft. Review the details, image, SEO and affiliate URL, then publish when ready."
      labelField="title"
      fields={[
        { name: "title", label: "Product Title", required: true, list: true, placeholder: "Product name" },
        { name: "slug", label: "Slug", placeholder: "Auto-generated if blank" },
        { name: "amazon_url", label: "Affiliate / Product URL", placeholder: "Paste Amazon.in, Amazon.com or Digistore24 link", help: "Network, affiliate link and region are detected automatically." },
        { name: "category", label: "Category", list: true, placeholder: "Auto-detected if blank" },
        { name: "brand", label: "Brand", list: true, placeholder: "Brand name" },
        { name: "status", label: "Status", type: "select", options: ["draft", "pending", "published", "archived"], default: "draft", list: true, help: "New products start as drafts so you can review them before publishing." },
        { name: "price", label: "Price", type: "number", placeholder: "e.g. 49.99", help: "Enter the current price shown by the merchant." },
        { name: "currency", label: "Currency", default: "USD", placeholder: "USD / INR" },
        { name: "rating", label: "Rating", type: "number", placeholder: "e.g. 4.5" },
        { name: "region", label: "Region", type: "select", options: ["global", "us", "in"], default: "global" },
        { name: "images", label: "Product Image URL", type: "json", default: "[]", help: "Paste one or more direct image URLs as a JSON array. Example: [\"https://example.com/product.jpg\"]" },
        { name: "description", label: "Description", type: "textarea", placeholder: "Short useful product description" },
        { name: "affiliate_links", label: "Affiliate links (JSON)", type: "json", default: DIGISTORE_DEFAULT, help: "Generated automatically from the pasted product URL." },
        { name: "specifications", label: "Specifications (JSON)", type: "json", default: "[]", help: '[{"name":"Feature","value":"Value"}]' },
        { name: "pros", label: "Pros (JSON array)", type: "json", default: "[]", help: '["Easy to use","Good value"]' },
        { name: "cons", label: "Cons (JSON array)", type: "json", default: "[]", help: '["Limited feature X"]' },
        { name: "seo", label: "SEO (JSON: title, description, keywords)", type: "json", default: "{}", help: "Auto-generated when left empty." },
      ]}
    />
  ),
});
