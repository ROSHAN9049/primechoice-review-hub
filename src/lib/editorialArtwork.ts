const artworkByCategory: Record<string, string> = {
  "health-supplements": "/editorial-health.svg",
  "mens-health": "/editorial-health.svg",
  "health-fitness": "/editorial-health.svg",
  "ai-tools": "/editorial-ai.svg",
  software: "/editorial-software.svg",
  finance: "/editorial-finance.svg",
  education: "/editorial-education.svg",
  fitness: "/editorial-fitness.svg",
  vision: "/editorial-vision.svg",
  "weight-loss": "/editorial-weight.svg",
  electronics: "/editorial-software.svg",
  office: "/editorial-software.svg",
};

export function editorialArtwork(category?: string | null): string {
  return artworkByCategory[category ?? ""] ?? "/category-art-default.svg";
}
