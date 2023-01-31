<template>
  <div class="flex w-full flex-row flex-nowrap">
    <drink-filters-sidebar />

    <drink-listings />
  </div>
</template>

<script lang="ts" setup>
import DrinkFiltersSidebar from "@/components/DrinkResults/DrinkFiltersSidebar/DrinkFiltersSidebar.vue";
import DrinkListings from "@/components/DrinkResults/DrinkListings.vue";
</script>
