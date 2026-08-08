import { createFileRoute } from "@tanstack/react-router";
import { ResourceManager } from "@/components/admin/ResourceManager";

export const Route = createFileRoute("/_authenticated/admin/networks")({
  component: () => (
    <ResourceManager
      table="affiliate_networks"
      title="Affiliate link manager"
      description="One central place for every network. Editing a template updates every link across the site."
      labelField="name"
      orderBy={{ column: "name", ascending: true }}
      fields={[
        { name: "name", label: "Network", required: true, list: true },
        { name: "key", label: "Key", required: true, list: true },
        { name: "affiliate_id", label: "Affiliate ID", list: true },
        { name: "enabled", label: "Enabled", type: "boolean", default: true, list: true },
        { name: "tracking_id", label: "Tracking ID" },
        { name: "country", label: "Country", default: "US" },
        { name: "region", label: "Region", type: "select", options: ["global", "us", "in"], default: "global" },
        {
          name: "link_template",
          label: "Link template",
          help: "Placeholders: {productId}, {affiliateId}, {trackingId}",
        },
        { name: "utm", label: "UTM params (JSON)", type: "json", default: "{}" },
      ]}
    />
  ),
});