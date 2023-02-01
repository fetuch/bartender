<template>
  <drink-filters-sidebar-checkbox-group
    :unique-values="UNIQUE_CATEGORIES"
    :action="userStore.ADD_SELECTED_CATEGORIES"
  />
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useCategoriesStore } from "@/stores/categories";
import { useUserStore } from "@/stores/user";

import DrinkFiltersSidebarCheckboxGroup from "@/components/DrinkResults/DrinkFiltersSidebar/DrinkFiltersSidebarCheckboxGroup.vue";

const userStore = useUserStore();

const categoriesStore = useCategoriesStore();
const UNIQUE_CATEGORIES = computed(() => categoriesStore.UNIQUE_CATEGORIES);
</script>
