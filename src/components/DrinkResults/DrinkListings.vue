<template>
  <main class="flex-auto bg-brand-gray-2 p-8">
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

<script>
import { mapActions, mapState } from "pinia";

import DrinkListing from "@/components/DrinkResults/DrinkListing.vue";
import { useDrinksStore, FETCH_DRINKS } from "@/stores/drinks";

export default {
  name: "DrinkListings",
  components: { DrinkListing },
  data() {
    return {
      perPage: 10,
    };
  },
  computed: {
    currentPage() {
      return Number.parseInt(this.$route.query.page || "1");
    },
    previousPage() {
      const previousPage = this.currentPage - 1;
      const firstPage = 1;
      return previousPage >= firstPage ? previousPage : undefined;
    },
    ...mapState(useDrinksStore, {
      drinks: "drinks",
      nextPage() {
        const nextPage = this.currentPage + 1;
        const maxPage = Math.ceil(this.drinks.length / this.perPage);
        return nextPage <= maxPage ? nextPage : undefined;
      },
      displayedDrinks() {
        const pageNumber = this.currentPage;
        const firstDrinkIndex = (pageNumber - 1) * this.perPage;
        const lastDrinkIndex = pageNumber * this.perPage;
        return this.drinks.slice(firstDrinkIndex, lastDrinkIndex);
      },
    }),
  },
  async mounted() {
    this.FETCH_DRINKS();
  },
  methods: {
    ...mapActions(useDrinksStore, [FETCH_DRINKS]),
  },
};
</script>
