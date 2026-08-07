import productAi from "@/assets/product-ai.jpg";
import productEducation from "@/assets/product-education.jpg";
import productFinance from "@/assets/product-finance.jpg";
import productFitness from "@/assets/product-fitness.jpg";
import productHealth from "@/assets/product-health.jpg";
import productSoftware from "@/assets/product-software.jpg";
import productVision from "@/assets/product-vision.jpg";
import productWeight from "@/assets/product-weight.jpg";

/**
 * Content stores a stable image key; the bundler owns the hashed URL.
 * Absolute/rooted URLs entered in the admin panel pass through unchanged.
 */
const imageMap: Record<string, string> = {
  "product-ai": productAi,
  "product-education": productEducation,
  "product-finance": productFinance,
  "product-fitness": productFitness,
  "product-health": productHealth,
  "product-software": productSoftware,
  "product-vision": productVision,
  "product-weight": productWeight,
};

export const imageKeys = Object.keys(imageMap);

export function imageFor(key: string | null | undefined): string {
  if (!key) return productSoftware;
  if (key.startsWith("http") || key.startsWith("/") || key.startsWith("data:")) return key;
  return imageMap[key] ?? productSoftware;
}
