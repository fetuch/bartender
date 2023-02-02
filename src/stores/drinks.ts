import { defineStore } from "pinia";

import type { Drink } from "@/api/types";

import getDrinks from "@/api/getDrinks";

import { useUserStore } from "@/stores/user";

export const FETCH_DRINKS = "FETCH_DRINKS";
export const UNIQUE_GLASS_TYPES = "UNIQUE_GLASS_TYPES";
export const INCLUDE_DRINK_BY_CATEGORY = "INCLUDE_DRINK_BY_CATEGORY";
export const INCLUDE_DRINK_BY_GLASS_TYPE = "INCLUDE_DRINK_BY_GLASS_TYPE";
export const INCLUDE_DRINK_BY_NAME = "INCLUDE_DRINK_BY_NAME";
export const FILTERED_DRINKS = "FILTERED_DRINKS";

export interface DrinksState {
  drinks: Drink[];
}

export const useDrinksStore = defineStore("drinks", {
  state: (): DrinksState => ({
    drinks: [],
  }),
  actions: {
    async [FETCH_DRINKS]() {
      const drinks = await getDrinks();
      this.drinks = drinks;
    },
  },
  getters: {
    [UNIQUE_GLASS_TYPES](state) {
      const uniqueGlassTypes = new Set<string>();
      state.drinks.forEach((drink) => uniqueGlassTypes.add(drink.glass));
      return uniqueGlassTypes;
    },
    [INCLUDE_DRINK_BY_CATEGORY]: () => (drink: Drink) => {
      const userStore = useUserStore();
      if (userStore.selectedCategories.length === 0) return true;
      return userStore.selectedCategories.includes(drink.category);
    },
    [INCLUDE_DRINK_BY_GLASS_TYPE]: () => (drink: Drink) => {
      const userStore = useUserStore();
      if (userStore.selectedGlassTypes.length === 0) return true;
      return userStore.selectedGlassTypes.includes(drink.glass);
    },
    [INCLUDE_DRINK_BY_NAME]: () => (drink: Drink) => {
      const userStore = useUserStore();
      return drink.name
        .toLowerCase()
        .includes(userStore.nameSearchTerm.toLowerCase());
    },
    [FILTERED_DRINKS](state): Drink[] {
      return state.drinks
        .filter((drink) => this.INCLUDE_DRINK_BY_CATEGORY(drink))
        .filter((drink) => this.INCLUDE_DRINK_BY_GLASS_TYPE(drink))
        .filter((drink) => this.INCLUDE_DRINK_BY_NAME(drink));
    },
  },
});
