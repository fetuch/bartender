<template>
  <form
    class="flex h-12 w-full items-center rounded-3xl border border-solid border-brand-gray-3"
    @submit.prevent="searchForDrinks"
  >
    <font-awesome-icon :icon="['fas', 'search']" class="ml-4 mr-3" />

    <div class="flex h-full flex-1 flex-nowrap text-base font-light">
      <div class="relative flex h-full flex-1 items-center pr-3">
        <label for="ingredients" class="absolute left-0 -top-10"
          >Ingredients</label
        >

        <text-input
          id="ingredients"
          v-model="ingredients"
          placeholder="Gin, rum, orange juice, banana..."
        />
      </div>
    </div>

    <action-button text="Search" type="secondary" class="rounded-r-3xl" />
  </form>
</template>

<script>
import ActionButton from "@/components/Shared/ActionButton.vue";
import TextInput from "@/components/Shared/TextInput.vue";

export default {
  name: "DrinkSearchForm",
  components: { ActionButton, TextInput },
  data() {
    return {
      ingredients: "",
    };
  },
  methods: {
    searchForDrinks() {
      this.$router.push({
        name: "DrinkResults",
        query: { ingredients: this.ingredients },
      });
    },
  },
};
</script>
