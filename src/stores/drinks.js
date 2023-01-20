import { defineStore } from "pinia";

import getDrinks from "@/api/getDrinks";

export const FETCH_DRINKS = "FETCH_DRINKS";

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
});
