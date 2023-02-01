<template>
  <div
    class="flex w-96 flex-col border-r border-solid border-brand-gray-1 bg-white p-4"
  >
    <section class="pb-5">
      <drink-filters-sidebar-prompt />

      <collapsible-accordion header="Categories">
        <drink-filters-sidebar-categories />
      </collapsible-accordion>

      <collapsible-accordion header="Glass Types">
        <drink-filters-sidebar-glass-types />
      </collapsible-accordion>
    </section>
  </div>
</template>

<script lang="ts" setup>
import CollapsibleAccordion from "@/components/Shared/CollapsibleAccordion.vue";
import DrinkFiltersSidebarPrompt from "@/components/DrinkResults/DrinkFiltersSidebar/DrinkFiltersSidebarPrompt.vue";
import DrinkFiltersSidebarCategories from "@/components/DrinkResults/DrinkFiltersSidebar/DrinkFiltersSidebarCategories.vue";
import DrinkFiltersSidebarGlassTypes from "@/components/DrinkResults/DrinkFiltersSidebar/DrinkFiltersSidebarGlassTypes.vue";
</script>
