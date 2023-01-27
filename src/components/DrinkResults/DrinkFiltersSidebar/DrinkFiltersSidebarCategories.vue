<template>
  <collapsible-accordion header="Categories">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li
            v-for="category in UNIQUE_CATEGORIES"
            :key="category"
            class="h-8 w-1/2"
          >
            <input
              :id="category"
              v-model="selectedCategories"
              :value="category"
              type="checkbox"
              class="mr-3"
              @change="selectCategory"
            />
            <label :for="category">{{ category }}</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </collapsible-accordion>
</template>

<script setup>
import { computed, ref } from "vue";

import { useRouter } from "vue-router";
import { useDrinksStore } from "@/stores/drinks";
import { useUserStore } from "@/stores/user";

import CollapsibleAccordion from "@/components/Shared/CollapsibleAccordion.vue";

const selectedCategories = ref([]);

const drinksStore = useDrinksStore();
const UNIQUE_CATEGORIES = computed(() => drinksStore.UNIQUE_CATEGORIES);

const userStore = useUserStore();
const router = useRouter();
const selectCategory = () => {
  userStore.ADD_SELECTED_CATEGORIES(selectedCategories.value);
  router.push({ name: "DrinkResults" });
};
</script>
