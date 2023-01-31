import type { Drink } from "@/api/types";

export const createDrink = (drink: Partial<Drink>): Drink => ({
  id: 1,
  name: "Margarita",
  category: "Ordinary Drink",
  glass: "Cocktail glass",
  instructions: "Rub the rim of the glass.",
  ingredients: [
    {
      name: "Tequila",
      measure: "1 1/2 oz",
    },
  ],
  dateAdded: "2023-01-18",
  ...drink,
});
