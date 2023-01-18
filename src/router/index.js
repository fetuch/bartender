import { createRouter, createWebHashHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import DrinkResultsView from "@/views/DrinkResultsView.vue";
import DrinkView from "@/views/DrinkView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/drinks",
    name: "DrinkResults",
    component: DrinkResultsView,
  },
  {
    path: "/drinks/:id",
    name: "DrinkDetails",
    component: DrinkView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
