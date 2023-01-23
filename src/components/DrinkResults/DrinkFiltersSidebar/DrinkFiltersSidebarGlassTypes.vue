<template>
  <collapsible-accordion header="Glass Types">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li
            v-for="glassType in UNIQUE_GLASS_TYPES"
            :key="glassType"
            class="h-8 w-1/2"
          >
            <input
              :id="glassType"
              v-model="selectedGlassTypes"
              :value="glassType"
              type="checkbox"
              class="mr-3"
              @change="selectGlassType"
            />
            <label :for="glassType">{{ glassType }}</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </collapsible-accordion>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useDrinksStore, UNIQUE_GLASS_TYPES } from "@/stores/drinks";
import { useUserStore, ADD_SELECTED_GLASS_TYPES } from "@/stores/user";

import CollapsibleAccordion from "@/components/Shared/CollapsibleAccordion.vue";

export default {
  name: "DrinkFiltersSidebarGlassTypes",
  components: { CollapsibleAccordion },
  data() {
    return {
      selectedGlassTypes: [],
    };
  },
  computed: {
    ...mapState(useDrinksStore, [UNIQUE_GLASS_TYPES]),
  },
  methods: {
    ...mapActions(useUserStore, [ADD_SELECTED_GLASS_TYPES]),
    selectGlassType() {
      this.ADD_SELECTED_GLASS_TYPES(this.selectedGlassTypes);
    },
  },
};
</script>
