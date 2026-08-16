import { createFileRoute } from "@tanstack/react-router";
import { ResourceManager } from "@/components/admin/ResourceManager";

const DIGISTORE_DEFAULT = JSON.stringify(
  [
    {
      network: "digistore24",
      productId: "",
      affiliateId: "ROSHANpratibha",
      campaignKey: "site",
      enabled: true,
    },
  ],
  null,
  2,
);

export const Route = createFileRoute("/_authenticated/admin/products")({
  component: () => (
    <ResourceManager
      table="products"
      title="Products"
      description="Add products once and reuse them across reviews, comparisons and deals."
      labelField="title"
      fields={[
        { name: "title", label: "Title", required: true, list: true, placeholder: "Product name" },
        { name: "slug", label: "Slug", required: true, list: true, placeholder: "product-name" },
        { name: "category", label: "Category", list: true },
        { name: "brand", label: "Brand", list: true },
        {
          name: "status",
          label: "Status",
          type: "select",
          options: ["draft", "pending", "published", "archived"],
          default: "published",
          list: true,
        },
        { name: "rating", label: "Rating", type: "number", placeholder: "4.5" },
        { name: "price", label: "Price", type: "number" },
        { name: "currency", label: "Currency", default: "USD" },
        { name: "region", label: "Region", type: "select", options: ["global", "us", "in"], default: "global" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "images", label: "Gallery (JSON array of image URLs/keys)", type: "json", default: "[]", help: '["https://example.com/product.jpg"]' },
        { name: "affiliate_links", label: "Affiliate links (JSON)", type: "json", default: DIGISTORE_DEFAULT, help: "Digistore24 affiliate links are supported." },
        { name: "specifications", label: "Specifications (JSON)", type: "json", default: "[]", help: '[{"name":"Feature","value":"Value"}]' },
        { name: "pros", label: "Pros (JSON array)", type: "json", default: "[]", help: '["Easy to use","Good value"]' },
        { name: "cons", label: "Cons (JSON array)", type: "json", default: "[]", help: '["Limited feature X"]' },
        { name: "seo", label: "SEO (JSON: title, description, keywords)", type: "json", default: "{}" },
      ]}
    />
  ),
});
