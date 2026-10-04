// Ancore dei collegamenti menù ↔ vini (brief §7.6.4).
export const dishId = (slug: string) => `piatto-${slug}`;
export const wineId = (slug: string) => `vino-${slug}`;
export const categoryId = (scope: "menu" | "vini", slug: string) => `${scope}-${slug}`;
