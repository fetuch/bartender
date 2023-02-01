<template>
  <drink-filters-sidebar-checkbox-group
    :unique-values="UNIQUE_GLASS_TYPES"
    :action="userStore.ADD_SELECTED_GLASS_TYPES"
  />
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useDrinksStore } from "@/stores/drinks";
import { useUserStore } from "@/stores/user";

import DrinkFiltersSidebarCheckboxGroup from "@/components/DrinkResults/DrinkFiltersSidebar/DrinkFiltersSidebarCheckboxGroup.vue";

const userStore = useUserStore();
const drinksStore = useDrinksStore();
const UNIQUE_GLASS_TYPES = computed(() => drinksStore.UNIQUE_GLASS_TYPES);
</script>
