import { defineStore } from "pinia";
import { ref } from "vue";

export interface UserState {
  isLoggedIn: boolean;
  selectedCategories: string[];
  selectedGlassTypes: string[];
}

export const useUserStore = defineStore("user", () => {
  const isLoggedIn = ref(false);
  const selectedCategories = ref<string[]>([]);
  const selectedGlassTypes = ref<string[]>([]);

  const LOGIN_USER = () => {
    isLoggedIn.value = true;
  };

  const ADD_SELECTED_CATEGORIES = (categories: string[]) => {
    selectedCategories.value = categories;
  };

  const ADD_SELECTED_GLASS_TYPES = (glassTypes: string[]) => {
    selectedGlassTypes.value = glassTypes;
  };

  const CLEAR_USER_DRINK_FILTER_SELECTIONS = () => {
    selectedCategories.value = [];
    selectedGlassTypes.value = [];
  };

  return {
    isLoggedIn,
    selectedCategories,
    selectedGlassTypes,
    LOGIN_USER,
    ADD_SELECTED_CATEGORIES,
    ADD_SELECTED_GLASS_TYPES,
    CLEAR_USER_DRINK_FILTER_SELECTIONS,
  };
});
