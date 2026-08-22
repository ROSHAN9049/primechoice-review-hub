import editorialHealth from "@/assets/editorial-health.svg";
import editorialAi from "@/assets/editorial-ai.svg";
import editorialSoftware from "@/assets/editorial-software.svg";
import editorialFinance from "@/assets/editorial-finance.svg";
import editorialEducation from "@/assets/editorial-education.svg";
import editorialFitness from "@/assets/editorial-fitness.svg";
import editorialVision from "@/assets/editorial-vision.svg";
import editorialWeight from "@/assets/editorial-weight.svg";

const artworkByCategory: Record<string, string> = {
  "health-supplements": editorialHealth,
  "mens-health": editorialHealth,
  "health-fitness": editorialHealth,
  "ai-tools": editorialAi,
  software: editorialSoftware,
  finance: editorialFinance,
  education: editorialEducation,
  fitness: editorialFitness,
  vision: editorialVision,
  "weight-loss": editorialWeight,
  electronics: editorialSoftware,
  office: editorialSoftware,
};

export function editorialArtwork(category?: string | null): string {
  return artworkByCategory[category ?? ""] ?? "/category-art-default.svg";
}
