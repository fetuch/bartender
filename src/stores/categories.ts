import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { Category } from "@/api/types";
import getCategories from "@/api/getCategories";

export const useCategoriesStore = defineStore("categories", () => {
  const categories = ref<Category[]>([]);

  const FETCH_CATEGORIES = async () => {
    const receivedCategories = await getCategories();
    categories.value = receivedCategories;
  };

  const UNIQUE_CATEGORIES = computed(() =>
    categories.value.map((category) => category.name)
  );

  return { categories, FETCH_CATEGORIES, UNIQUE_CATEGORIES };
});
