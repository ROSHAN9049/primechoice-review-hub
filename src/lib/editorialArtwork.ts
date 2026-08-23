const artworkByCategory: Record<string, string> = {
  "health-supplements": "/emag-health.svg",
  "mens-health": "/emag-health.svg",
  "health-fitness": "/emag-health.svg",
  "ai-tools": "/emag-ai.svg",
  software: "/emag-software.svg",
  finance: "/emag-finance.svg",
  education: "/emag-education.svg",
  fitness: "/emag-fitness.svg",
  vision: "/emag-vision.svg",
  "weight-loss": "/emag-weight.svg",
  electronics: "/emag-software.svg",
  office: "/emag-software.svg",
};

export function editorialArtwork(category?: string | null): string {
  return artworkByCategory[category ?? ""] ?? "/category-art-default.svg";
}
