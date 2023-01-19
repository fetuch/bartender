<template>
  <main class="flex-auto bg-brand-gray-2 p-8">
    <ol>
      <drink-listing v-for="drink in drinks" :key="drink.id" :drink="drink" />
    </ol>
  </main>
</template>

<script>
import axios from "axios";

import DrinkListing from "@/components/DrinkResults/DrinkListing.vue";

export default {
  name: "DrinkListings",
  components: { DrinkListing },
  data() {
    return {
      drinks: [],
    };
  },
  async mounted() {
    const response = await axios.get("http://localhost:3000/drinks");
    this.drinks = response.data;
  },
};
</script>
