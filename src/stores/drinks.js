import { defineStore } from "pinia";

import getDrinks from "@/api/getDrinks";

import { useUserStore } from "@/stores/user";

export const FETCH_DRINKS = "FETCH_DRINKS";
export const UNIQUE_CATEGORIES = "UNIQUE_CATEGORIES";
export const UNIQUE_GLASS_TYPES = "UNIQUE_GLASS_TYPES";
export const FILTERED_DRINKS_BY_CATEGORIES = "FILTERED_DRINKS_BY_CATEGORIES";
export const FILTERED_DRINKS_BY_GLASS_TYPES = "FILTERED_DRINKS_BY_GLASS_TYPES";

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
    [UNIQUE_GLASS_TYPES](state) {
      const uniqueGlassTypes = new Set();
      state.drinks.forEach((drink) => uniqueGlassTypes.add(drink.glass));
      return uniqueGlassTypes;
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
    [FILTERED_DRINKS_BY_GLASS_TYPES](state) {
      const userStore = useUserStore();

      if (userStore.selectedGlassTypes.length === 0) {
        return state.drinks;
      }

      return state.drinks.filter((drink) =>
        userStore.selectedGlassTypes.includes(drink.glass)
      );
    },
  },
});
