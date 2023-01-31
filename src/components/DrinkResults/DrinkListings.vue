<template>
  <main class="flex-1 bg-brand-gray-2 p-8">
    <ol>
      <drink-listing
        v-for="drink in displayedDrinks"
        :key="drink.id"
        :drink="drink"
      />
    </ol>

    <div class="mx-auto mt-8">
      <div class="flex flex-row flex-nowrap">
        <p class="flex-grow text-sm">Page {{ currentPage }}</p>

        <div class="flex items-center justify-center">
          <router-link
            v-if="previousPage"
            role="link"
            :to="{ name: 'DrinkResults', query: { page: previousPage } }"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
          >
            Previous
          </router-link>

          <router-link
            v-if="nextPage"
            role="link"
            :to="{ name: 'DrinkResults', query: { page: nextPage } }"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
          >
            Next
          </router-link>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

import DrinkListing from "@/components/DrinkResults/DrinkListing.vue";
import { useDrinksStore } from "@/stores/drinks";
import { useCategoriesStore } from "@/stores/categories";

import usePreviousAndNextPages from "@/composables/usePreviousAndNextPages";

const FILTERED_DRINKS = computed(() => drinksStore.FILTERED_DRINKS);

const drinksStore = useDrinksStore();
onMounted(drinksStore.FETCH_DRINKS);

const categoriesStore = useCategoriesStore();
onMounted(categoriesStore.FETCH_CATEGORIES);

const perPage = ref(10);

const route = useRoute();
const currentPage = computed(() =>
  Number.parseInt((route.query.page as string) || "1")
);
const maxPage = computed(() =>
  Math.ceil(FILTERED_DRINKS.value.length / perPage.value)
);
const { previousPage, nextPage } = usePreviousAndNextPages(
  currentPage,
  maxPage
);

const displayedDrinks = computed(() => {
  const pageNumber = currentPage.value;
  const firstDrinkIndex = (pageNumber - 1) * perPage.value;
  const lastDrinkIndex = pageNumber * perPage.value;
  return FILTERED_DRINKS.value.slice(firstDrinkIndex, lastDrinkIndex);
});
</script>
