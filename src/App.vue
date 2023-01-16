<template>
  <main-nav />

  <the-hero />
</template>

<script>
import MainNav from "@/components/Navigation/MainNav.vue";
import TheHero from "@/components/DrinkSearch/TheHero.vue";

export default {
  name: "App",

  components: {
    MainNav,
    TheHero,
  },
};
</script>
