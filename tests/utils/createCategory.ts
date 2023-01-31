import type { Category } from "@/api/types";

export const createCategory = (category: Partial<Category>): Category => ({
  id: 1,
  name: "Shot",
  ...category,
});
