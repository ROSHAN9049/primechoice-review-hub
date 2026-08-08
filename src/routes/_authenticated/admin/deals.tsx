import { createFileRoute } from "@tanstack/react-router";
import { ResourceManager } from "@/components/admin/ResourceManager";

export const Route = createFileRoute("/_authenticated/admin/deals")({
  component: () => (
    <ResourceManager
      table="deals"
      title="Deals & coupons"
      description="Discounts surfaced on the homepage and review pages."
      fields={[
        { name: "title", label: "Title", required: true, list: true },
        { name: "discount", label: "Discount", list: true },
        { name: "coupon_code", label: "Coupon code", list: true },
        { name: "active", label: "Active", type: "boolean", default: true, list: true },
        { name: "network", label: "Network key" },
        { name: "target_slug", label: "Target review/product slug" },
        { name: "url", label: "Destination URL" },
        { name: "expiry_date", label: "Expiry date", type: "date" },
        { name: "detail", label: "Detail", type: "textarea" },
      ]}
    />
  ),
});