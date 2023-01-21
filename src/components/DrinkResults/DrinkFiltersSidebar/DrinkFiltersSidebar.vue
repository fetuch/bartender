<template>
  <div
    class="flex w-96 flex-col border-r border-solid border-brand-gray-1 bg-white p-4"
  >
    <section class="pb-5">
      <div class="flex flex-row justify-between">
        <h3 class="my-4 text-base font-semibold">
          What are you searching for?
        </h3>
        <div class="flex items-center text-sm">
          <action-button text="Clear Filters" type="secondary" />
        </div>
      </div>

      <drink-filters-sidebar-categories />

      <collapsible-accordion header="Drink glass" />
    </section>
  </div>
</template>

<script>
import ActionButton from "@/components/Shared/ActionButton.vue";
import CollapsibleAccordion from "@/components/Shared/CollapsibleAccordion.vue";
import DrinkFiltersSidebarCategories from "@/components/DrinkResults/DrinkFiltersSidebar/DrinkFiltersSidebarCategories.vue";

export default {
  name: "DrinkFiltersSidebar",
  components: {
    ActionButton,
    CollapsibleAccordion,
    DrinkFiltersSidebarCategories,
  },
};
</script>
