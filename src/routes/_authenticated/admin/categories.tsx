import { createFileRoute } from "@tanstack/react-router";
import { ResourceManager } from "@/components/admin/ResourceManager";

export const Route = createFileRoute("/_authenticated/admin/categories")({
  component: () => (
    <ResourceManager
      table="categories"
      title="Categories"
      description="Navigation and taxonomy for every content type."
      labelField="name"
      orderBy={{ column: "sort_order", ascending: true }}
      fields={[
        { name: "name", label: "Name", required: true, list: true },
        { name: "slug", label: "Slug", required: true, list: true },
        { name: "icon", label: "Lucide icon name", default: "Sparkles", list: true },
        { name: "sort_order", label: "Sort order", type: "number", default: 0, list: true },
        { name: "region", label: "Region", type: "select", options: ["all", "global", "us", "in"], default: "all" },
        { name: "description", label: "Description", type: "textarea" },
      ]}
    />
  ),
});