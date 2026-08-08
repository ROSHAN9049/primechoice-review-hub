import { createFileRoute } from "@tanstack/react-router";
import { ResourceManager } from "@/components/admin/ResourceManager";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/_authenticated/admin/reviews")({
  component: ReviewsAdmin,
});

function ReviewsAdmin() {
  const { user } = useAuth();
  return (
    <ResourceManager
      table="reviews"
      title="Reviews"
      description="Long-form product reviews shown on /reviews."
      orderBy={{ column: "publish_date", ascending: false }}
      withDefaults={() => ({ author_id: user?.id ?? null })}
      fields={[
        { name: "title", label: "Title", required: true, list: true },
        { name: "slug", label: "Slug", required: true, list: true },
        { name: "product", label: "Product", required: true, list: true },
        { name: "status", label: "Status", type: "select", options: ["draft", "pending", "published", "archived"], default: "published", list: true },
        { name: "vendor", label: "Vendor" },
        { name: "category", label: "Category", required: true },
        { name: "image", label: "Image key or URL" },
        { name: "rating", label: "Rating", type: "number" },
        { name: "featured", label: "Featured", type: "boolean" },
        { name: "affiliate_product_id", label: "Affiliate product ID" },
        { name: "publish_date", label: "Publish date", type: "date" },
        { name: "excerpt", label: "Excerpt", type: "textarea" },
        { name: "content", label: "Content (JSON)", type: "json", default: "{}" },
        { name: "seo", label: "SEO (JSON)", type: "json", default: "{}" },
      ]}
    />
  );
}