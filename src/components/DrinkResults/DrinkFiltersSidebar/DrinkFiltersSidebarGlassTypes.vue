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

<script setup>
import { computed, ref } from "vue";

import { useRouter } from "vue-router";
import { useDrinksStore } from "@/stores/drinks";
import { useUserStore } from "@/stores/user";

import CollapsibleAccordion from "@/components/Shared/CollapsibleAccordion.vue";

const selectedGlassTypes = ref([]);

const drinksStore = useDrinksStore();
const UNIQUE_GLASS_TYPES = computed(() => drinksStore.UNIQUE_GLASS_TYPES);

const userStore = useUserStore();
const router = useRouter();
const selectGlassType = () => {
  userStore.ADD_SELECTED_GLASS_TYPES(selectedGlassTypes.value);
  router.push({ name: "DrinkResults" });
};
</script>
