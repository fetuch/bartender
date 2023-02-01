<template>
  <div class="flex flex-row justify-between">
    <h3 class="my-4 text-base font-semibold">What are you searching for?</h3>
    <div class="flex items-center text-sm">
      <action-button
        text="Clear Filters"
        type="secondary"
        @click="userStore.CLEAR_USER_DRINK_FILTER_SELECTIONS"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/stores/user";

import ActionButton from "@/components/Shared/ActionButton.vue";

const userStore = useUserStore();
</script>
