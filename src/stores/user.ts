import { defineStore } from "pinia";

export const ADD_SELECTED_CATEGORIES = "ADD_SELECTED_CATEGORIES";
export const ADD_SELECTED_GLASS_TYPES = "ADD_SELECTED_GLASS_TYPES";
export const CLEAR_USER_DRINK_FILTER_SELECTIONS =
  "CLEAR_USER_DRINK_FILTER_SELECTIONS";

export interface UserState {
  isLoggedIn: boolean;
  selectedCategories: string[];
  selectedGlassTypes: string[];
}

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    isLoggedIn: false,
    selectedCategories: [],
    selectedGlassTypes: [],
  }),
  actions: {
    loginUser() {
      this.isLoggedIn = true;
    },
    [ADD_SELECTED_CATEGORIES](categories: string[]) {
      this.selectedCategories = categories;
    },
    [ADD_SELECTED_GLASS_TYPES](glassTypes: string[]) {
      this.selectedGlassTypes = glassTypes;
    },
    [CLEAR_USER_DRINK_FILTER_SELECTIONS]() {
      this.selectedCategories = [];
      this.selectedGlassTypes = [];
    },
  },
});
