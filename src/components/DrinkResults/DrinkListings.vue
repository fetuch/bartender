<template>
  <main class="flex-auto bg-brand-gray-2 p-8">
    <ol>
      <drink-listing />
      <drink-listing />
      <drink-listing />
    </ol>
  </main>
</template>

<script>
import DrinkListing from "@/components/DrinkResults/DrinkListing.vue";

export default {
  name: "DrinkListings",
  components: { DrinkListing },
};
</script>
