<template>
  <li class="mb-7">
    <router-link
      :to="drinkPageLink"
      class="mx-auto block rounded border border-solid border-brand-gray-2 bg-white hover:shadow-gray"
    >
      <div class="mx-8 border-b border-solid border-brand-gray-2 pt-5 pb-2">
        <h2 class="mb-2 text-2xl">{{ drink.name }}</h2>

        <div class="mb-3">
          <span>{{ drink.category }}, {{ drink.glass }}</span>
        </div>
      </div>

      <div class="px-8 py-4">
        <div>
          <h3 class="mt-1 mb-2 uppercase">How to make {{ drink.name }}</h3>

          <div class="mb-5">
            <span>
              {{ drink.instructions }}
            </span>
          </div>

          <h3 class="mt-1 mb-2 uppercase">Ingredients</h3>

          <div>
            <ul class="list-disc pl-8">
              <li
                v-for="ingredient in drink.ingredients"
                :key="ingredient.name"
              >
                {{ ingredient.name }}<span v-show="ingredient.measure">,</span>
                {{ ingredient.measure }}
              </li>
            </ul>
          </div>
        </div>

        <div class="mt-2 text-center">
          <router-link :to="drinkPageLink" class="text-brand-blue-1"
            >Expand</router-link
          >
        </div>
      </div>
    </router-link>
  </li>
</template>

<script lang="ts" setup>
import { computed, type PropType } from "vue";

import type { Drink } from "@/api/types";

const props = defineProps({
  drink: {
    type: Object as PropType<Drink>,
    required: true,
  },
});

const drinkPageLink = computed(() => `/drinks/${props.drink.id}`);
</script>
