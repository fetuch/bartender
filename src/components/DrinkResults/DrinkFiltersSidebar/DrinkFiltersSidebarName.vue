<template>
  <div class="mt-2">
    <input
      v-model.lazy.trim="nameSearchTerm"
      type="text"
      class="h-12 w-full rounded border border-solid border-brand-gray-1 p-3 text-base shadow-gray"
      placeholder="Margarita, Cuba Libre etc..."
    />
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

const nameSearchTerm = computed({
  get() {
    return userStore.nameSearchTerm;
  },
  set(value: string) {
    userStore.UPDATE_NAME_SEARCH_TERM(value);
  },
});
</script>
