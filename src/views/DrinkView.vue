<template>
  <div>Drink Page for drink {{ currentDrinkId }}</div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const currentDrinkId = computed(() => route.params.id);
</script>
