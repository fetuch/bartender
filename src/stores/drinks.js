import { defineStore } from "pinia";

import getDrinks from "@/api/getDrinks";

import { useUserStore } from "@/stores/user";

export const FETCH_DRINKS = "FETCH_DRINKS";
export const UNIQUE_CATEGORIES = "UNIQUE_CATEGORIES";
export const FILTERED_DRINKS_BY_CATEGORIES = "FILTERED_DRINKS_BY_CATEGORIES";

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
    [FILTERED_DRINKS_BY_CATEGORIES](state) {
      const userStore = useUserStore();

      if (userStore.selectedCategories.length === 0) {
        return state.drinks;
      }

      return state.drinks.filter((drink) =>
        userStore.selectedCategories.includes(drink.category)
      );
    },
  },
});
