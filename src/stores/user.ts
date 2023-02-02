import { defineStore } from "pinia";
import { ref } from "vue";

export const CLEAR_USER_DRINK_FILTER_SELECTIONS =
  "CLEAR_USER_DRINK_FILTER_SELECTIONS";

export const useUserStore = defineStore("user", () => {
  const isLoggedIn = ref(false);
  const selectedCategories = ref<string[]>([]);
  const selectedGlassTypes = ref<string[]>([]);
  const nameSearchTerm = ref("");

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
    nameSearchTerm.value = "";
  };

  const UPDATE_NAME_SEARCH_TERM = (name: string) => {
    nameSearchTerm.value = name;
  };

  return {
    isLoggedIn,
    selectedCategories,
    selectedGlassTypes,
    nameSearchTerm,
    LOGIN_USER,
    ADD_SELECTED_CATEGORIES,
    ADD_SELECTED_GLASS_TYPES,
    CLEAR_USER_DRINK_FILTER_SELECTIONS,
    UPDATE_NAME_SEARCH_TERM,
  };
});
