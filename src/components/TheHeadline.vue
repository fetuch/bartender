<template>
  <section>
    <h1 class="mb-14 text-8xl font-bold tracking-tighter">
      <span :class="actionClasses">{{ action }}</span>
      <br />
      {{ complement }}
    </h1>
    <h2 class="text-3xl font-light">Find your next drink at Bartender.</h2>
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
        const actions = ["Create", "Experiment", "Mix"];
        const complements = [
          "Memorable Experience",
          "With Flavors",
          "Your Ingredients",
        ];
        this.action = nextElementInList(actions, this.action);
        this.complement = nextElementInList(complements, this.complement);
      }, 3000);
    },
  },
};
</script>

<style scoped>
.create {
  color: #1a73e8;
}

.experiment {
  color: #34a853;
}

.mix {
  color: #f9ab00;
}

.code {
  color: #d93025;
}
</style>
