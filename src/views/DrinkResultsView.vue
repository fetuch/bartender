<template>
  <div class="flex w-full flex-row flex-nowrap">
    <drink-filters-sidebar />

    <drink-listings />
  </div>
</template>

<script>
import DrinkFiltersSidebar from "@/components/DrinkResults/DrinkFiltersSidebar/DrinkFiltersSidebar.vue";
import DrinkListings from "@/components/DrinkResults/DrinkListings.vue";

export default {
  name: "DrinkResultsView",
  components: {
    DrinkFiltersSidebar,
    DrinkListings,
  },
};
</script>
