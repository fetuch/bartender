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

<script>
import { mapState } from "pinia";

import { useDrinksStore, FILTERED_DRINKS } from "@/stores/drinks";

export default {
  name: "TheSubnav",
  computed: {
    ...mapState(useDrinksStore, [FILTERED_DRINKS]),
    onDrinkResultsPage() {
      return this.$route.name === "DrinkResults";
    },
  },
};
</script>
