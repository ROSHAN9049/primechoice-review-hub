import { createFileRoute } from "@tanstack/react-router";
import { ResourceManager } from "@/components/admin/ResourceManager";

export const Route = createFileRoute("/_authenticated/admin/brands")({
  component: () => (
    <ResourceManager
      table="brands"
      title="Brands"
      description="Manufacturers and vendors linked to products."
      labelField="name"
      fields={[
        { name: "name", label: "Name", required: true, list: true },
        { name: "slug", label: "Slug", required: true, list: true },
        { name: "website", label: "Website", list: true },
        { name: "logo_url", label: "Logo URL" },
        { name: "description", label: "Description", type: "textarea" },
      ]}
    />
  ),
});