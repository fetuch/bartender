<template>
  <div
    class="flex w-96 flex-col border-r border-solid border-brand-gray-1 bg-white p-4"
  >
    <section class="pb-5">
      <div class="flex flex-row justify-between">
        <h3 class="my-4 text-base font-semibold">
          What are you searching for?
        </h3>
        <div class="flex items-center text-sm">
          <action-button text="Clear Filters" type="secondary" />
        </div>
      </div>

      <drink-filters-sidebar-checkbox-group
        header="Categories"
        :unique-values="UNIQUE_CATEGORIES"
        :action="userStore.ADD_SELECTED_CATEGORIES"
      />

      <drink-filters-sidebar-checkbox-group
        header="Glass Types"
        :unique-values="UNIQUE_GLASS_TYPES"
        :action="userStore.ADD_SELECTED_GLASS_TYPES"
      />

      <collapsible-accordion header="Drink glass" />
    </section>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useDrinksStore } from "@/stores/drinks";
import { useCategoriesStore } from "@/stores/categories";
import { useUserStore } from "@/stores/user";

import ActionButton from "@/components/Shared/ActionButton.vue";
import CollapsibleAccordion from "@/components/Shared/CollapsibleAccordion.vue";
import DrinkFiltersSidebarCheckboxGroup from "@/components/DrinkResults/DrinkFiltersSidebar/DrinkFiltersSidebarCheckboxGroup.vue";

const userStore = useUserStore();
const drinksStore = useDrinksStore();
const UNIQUE_GLASS_TYPES = computed(() => drinksStore.UNIQUE_GLASS_TYPES);

const categoriesStore = useCategoriesStore();
const UNIQUE_CATEGORIES = computed(() => categoriesStore.UNIQUE_CATEGORIES);
</script>
