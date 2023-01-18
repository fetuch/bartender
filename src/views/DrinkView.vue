<template>
  <div>Drink Page for drink {{ currentDrinkId }}</div>
</template>

<script>
export default {
  name: "DrinkView",
  computed: {
    currentDrinkId() {
      return this.$route.params.id;
    },
  },
};
</script>
