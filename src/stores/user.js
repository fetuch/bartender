import { defineStore } from "pinia";

export const ADD_SELECTED_CATEGORIES = "ADD_SELECTED_CATEGORIES";

export const useUserStore = defineStore("user", {
  state: () => ({
    isLoggedIn: false,
    selectedCategories: [],
  }),
  actions: {
    loginUser() {
      this.isLoggedIn = true;
    },
    [ADD_SELECTED_CATEGORIES](categories) {
      this.selectedCategories = categories;
    },
  },
});
