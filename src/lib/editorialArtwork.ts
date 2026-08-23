const categoryImages: Record<string, string> = {
  "health-supplements": "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=1024&q=85",
  "ai-tools": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1024&q=85",
  software: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1024&q=85",
  finance: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1024&q=85",
  education: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1024&q=85",
  "mens-health": "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1024&q=85",
  "weight-loss": "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1024&q=85",
  vision: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1024&q=85",
  fitness: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1024&q=85",
  electronics: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1024&q=85",
  "home-kitchen": "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1024&q=85",
  "health-fitness": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1024&q=85",
  beauty: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1024&q=85",
  sports: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1024&q=85",
  office: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1024&q=85",
  fashion: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1024&q=85",
  baby: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1024&q=85",
  automotive: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1024&q=85",
  "pet-supplies": "https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=1024&q=85",
};

export function editorialArtwork(category?: string | null): string {
  return categoryImages[category ?? ""] ?? categoryImages["health-supplements"];
}
