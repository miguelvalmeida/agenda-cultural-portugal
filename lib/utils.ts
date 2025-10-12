import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    concerts: "Concertos",
    theatre: "Teatro",
    cinema: "Cinema",
    exhibitions: "Exposições",
    festivals: "Festivais",
    outdoor: "Ar Livre",
    family: "Família",
    workshops: "Workshops",
    nightlife: "Vida Noturna",
    heritage: "Património",
    community: "Comunidade",
    markets: "Mercados",
    other: "Outros",
  };

  return labels[category] || "Outros";
}
