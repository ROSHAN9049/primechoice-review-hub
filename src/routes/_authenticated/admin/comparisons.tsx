import { createFileRoute } from "@tanstack/react-router";
import { ResourceManager } from "@/components/admin/ResourceManager";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/_authenticated/admin/comparisons")({
  component: ComparisonsAdmin,
});

function ComparisonsAdmin() {
  const { user } = useAuth();
  return (
    <ResourceManager
      table="comparisons"
      title="Comparisons"
      description="Head-to-head match-ups shown on /compare."
      orderBy={{ column: "publish_date", ascending: false }}
      withDefaults={() => ({ author_id: user?.id ?? null })}
      fields={[
        { name: "title", label: "Title", required: true, list: true },
        { name: "slug", label: "Slug", required: true, list: true },
        { name: "category", label: "Category", list: true },
        { name: "status", label: "Status", type: "select", options: ["draft", "pending", "published", "archived"], default: "published", list: true },
        { name: "publish_date", label: "Publish date", type: "date" },
        { name: "excerpt", label: "Excerpt", type: "textarea" },
        { name: "payload", label: "Payload (JSON)", type: "json", default: "{}" },
      ]}
    />
  );
}