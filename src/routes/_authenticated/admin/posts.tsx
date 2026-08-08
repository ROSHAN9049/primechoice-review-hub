import { createFileRoute } from "@tanstack/react-router";
import { ResourceManager } from "@/components/admin/ResourceManager";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/_authenticated/admin/posts")({
  component: PostsAdmin,
});

function PostsAdmin() {
  const { user } = useAuth();
  return (
    <ResourceManager
      table="blog_posts"
      title="Blog posts"
      description="Editorial articles shown on /blog."
      orderBy={{ column: "publish_date", ascending: false }}
      withDefaults={() => ({ author_id: user?.id ?? null })}
      fields={[
        { name: "title", label: "Title", required: true, list: true },
        { name: "slug", label: "Slug", required: true, list: true },
        { name: "category", label: "Category", required: true, list: true },
        { name: "status", label: "Status", type: "select", options: ["draft", "pending", "published", "archived"], default: "published", list: true },
        { name: "image", label: "Image key or URL" },
        { name: "reading_time", label: "Reading time (min)", type: "number", default: 5 },
        { name: "publish_date", label: "Publish date", type: "date" },
        { name: "excerpt", label: "Excerpt", type: "textarea" },
        { name: "author", label: "Author (JSON: name, role)", type: "json", default: "{}" },
        { name: "sections", label: "Sections (JSON array)", type: "json", default: "[]" },
        { name: "seo", label: "SEO (JSON)", type: "json", default: "{}" },
      ]}
    />
  );
}