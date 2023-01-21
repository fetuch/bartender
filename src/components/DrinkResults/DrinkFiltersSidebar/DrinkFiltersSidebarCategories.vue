<template>
  <collapsible-accordion header="Categories">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li class="h-8 w-1/2">
            <input id="Beer" type="checkbox" class="mr-3" />
            <label for="Beer">Beer</label>
          </li>

          <li class="h-8 w-1/2">
            <input id="Ordinary Drink" type="checkbox" class="mr-3" />
            <label for="Ordinary Drink">Ordinary Drink</label>
          </li>

          <li class="h-8 w-1/2">
            <input id="Shake" type="checkbox" class="mr-3" />
            <label for="Shake">Shake</label>
          </li>

          <li class="h-8 w-1/2">
            <input id="Shot" type="checkbox" class="mr-3" />
            <label for="Shot">Shot</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </collapsible-accordion>
</template>

<script>
import CollapsibleAccordion from "@/components/Shared/CollapsibleAccordion.vue";

export default {
  name: "DrinkFiltersSidebarCategories",
  components: { CollapsibleAccordion },
};
</script>
