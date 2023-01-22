import { defineStore } from "pinia";

import getDrinks from "@/api/getDrinks";

export const FETCH_DRINKS = "FETCH_DRINKS";
export const UNIQUE_CATEGORIES = "UNIQUE_CATEGORIES";

export const useDrinksStore = defineStore("drinks", {
  state: () => ({
    drinks: [],
  }),
  actions: {
    async [FETCH_DRINKS]() {
      const drinks = await getDrinks();
      this.drinks = drinks;
    },
  },
  getters: {
    [UNIQUE_CATEGORIES](state) {
      const uniqueCategories = new Set();
      state.drinks.forEach((drink) => uniqueCategories.add(drink.category));
      return uniqueCategories;
    },
  },
});
