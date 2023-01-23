<template>
  <collapsible-accordion header="Categories">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li
            v-for="category in UNIQUE_CATEGORIES"
            :key="category"
            class="h-8 w-1/2"
          >
            <input
              :id="category"
              v-model="selectedCategories"
              :value="category"
              type="checkbox"
              class="mr-3"
              @change="selectCategory"
            />
            <label :for="category">{{ category }}</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </collapsible-accordion>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useDrinksStore, UNIQUE_CATEGORIES } from "@/stores/drinks";
import { useUserStore, ADD_SELECTED_CATEGORIES } from "@/stores/user";

import CollapsibleAccordion from "@/components/Shared/CollapsibleAccordion.vue";

export default {
  name: "DrinkFiltersSidebarCategories",
  components: { CollapsibleAccordion },
  data() {
    return {
      selectedCategories: [],
    };
  },
  computed: {
    ...mapState(useDrinksStore, [UNIQUE_CATEGORIES]),
  },
  methods: {
    ...mapActions(useUserStore, [ADD_SELECTED_CATEGORIES]),
    selectCategory() {
      this.ADD_SELECTED_CATEGORIES(this.selectedCategories);
      this.$router.push({ name: "DrinkResults" });
    },
  },
};
</script>
