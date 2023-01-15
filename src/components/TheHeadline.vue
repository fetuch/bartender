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

<script>
import nextElementInList from "@/utils/nextElementInList";

export default {
  name: "TheHeadline",
  data() {
    return {
      action: "Create",
      complement: "Memorable Experience",
      interval: null,
    };
  },
  computed: {
    actionClasses() {
      return {
        [this.action.toLowerCase()]: true,
      };
    },
  },
  created() {
    this.changeTitle();
  },
  beforeUnmount() {
    clearInterval(this.interval);
  },
  methods: {
    changeTitle() {
      this.interval = setInterval(() => {
        const actions = ["Create", "Find", "Mix"];

        this.action = nextElementInList(actions, this.action);
      }, 3000);
    },
  },
};
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
