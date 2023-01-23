import { defineStore } from "pinia";

export const ADD_SELECTED_CATEGORIES = "ADD_SELECTED_CATEGORIES";
export const ADD_SELECTED_GLASS_TYPES = "ADD_SELECTED_GLASS_TYPES";

export const useUserStore = defineStore("user", {
  state: () => ({
    isLoggedIn: false,
    selectedCategories: [],
    selectedGlassTypes: [],
  }),
  actions: {
    loginUser() {
      this.isLoggedIn = true;
    },
    [ADD_SELECTED_CATEGORIES](categories) {
      this.selectedCategories = categories;
    },
    [ADD_SELECTED_GLASS_TYPES](glassTypes) {
      this.selectedGlassTypes = glassTypes;
    },
  },
});
