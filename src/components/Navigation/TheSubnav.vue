<template>
  <div class="h-16 w-full border-b border-solid border-brand-gray-1 bg-white">
    <div class="flex h-full items-center px-8">
      <div v-if="onDrinkResultsPage">
        <font-awesome-icon :icon="['fas', 'search']" class="mr-3" />
        <span
          ><span class="text-brand-green-1">{{ FILTERED_DRINKS.length }}</span>
          drinks matched</span
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useDrinksStore } from "@/stores/drinks";

const route = useRoute();
const onDrinkResultsPage = computed(() => route.name === "DrinkResults");

const drinksStore = useDrinksStore();
const FILTERED_DRINKS = computed(() => drinksStore.FILTERED_DRINKS);
</script>
