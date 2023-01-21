<template>
  <header-container>
    <template #title>
      <h1 class="w-full text-4xl font-normal">Ingredients</h1>
    </template>

    <template #subtitle>
      <h2 class="my-4 w-full text-base font-light">
        A list of drink ingredients.
      </h2>
    </template>
  </header-container>
</template>

<script>
import HeaderContainer from "@/components/Shared/HeaderContainer.vue";

export default {
  name: "IngredientsView",
  components: { HeaderContainer },
};
</script>
