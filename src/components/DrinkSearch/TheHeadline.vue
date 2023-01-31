<template>
  <section class="mb-16">
    <h1 class="mb-14 text-6xl font-bold tracking-tighter">
      <span :class="actionClasses">{{ action }}</span>
      <br />
      your next drink at Bartender
    </h1>
    <h2 class="text-3xl font-light">Experiment with flavors.</h2>
  </section>
</template>

<script lang="ts" setup>
import { computed, onMounted, onBeforeUnmount, ref } from "vue";

import nextElementInList from "@/utils/nextElementInList";

const action = ref("Create");
const interval = ref<ReturnType<typeof setInterval>>();

const actionClasses = computed(() => {
  return { [action.value.toLowerCase()]: true };
});

const changeTitle = () => {
  interval.value = setInterval(() => {
    const actions = ["Create", "Find", "Mix"];

    action.value = nextElementInList(actions, action.value);
  }, 3000);
};

onMounted(changeTitle);
onBeforeUnmount(() => clearInterval(interval.value));
</script>

<style scoped>
.create {
  color: #1a73e8;
}

.find {
  color: #34a853;
}

.mix {
  color: #f9ab00;
}
</style>
