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
            <input :id="category" type="checkbox" class="mr-3" />
            <label :for="category">{{ category }}</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </collapsible-accordion>
</template>

<script>
import { mapState } from "pinia";
import { useDrinksStore, UNIQUE_CATEGORIES } from "@/stores/drinks";

import CollapsibleAccordion from "@/components/Shared/CollapsibleAccordion.vue";

export default {
  name: "DrinkFiltersSidebarCategories",
  components: { CollapsibleAccordion },
  computed: {
    ...mapState(useDrinksStore, [UNIQUE_CATEGORIES]),
  },
};
</script>
