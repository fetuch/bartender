<template>
  <header :class="['w-full', 'text-sm', headerHeightClass]">
    <div class="fixed top-0 left-0 z-10 h-16 w-full bg-white">
      <div
        class="mx-auto flex h-full flex-nowrap border-b border-solid border-brand-gray-1 px-8"
      >
        <router-link
          :to="{ name: 'Home' }"
          class="flex h-full items-center text-xl"
          >Bartender App</router-link
        >

        <nav class="ml-12 h-full">
          <ul class="flex h-full list-none space-x-5">
            <li
              v-for="menuItem in menuItems"
              :key="menuItem.text"
              class="h-full"
            >
              <router-link
                :to="{ name: menuItem.name }"
                class="flex h-full items-center py-2.5"
                >{{ menuItem.text }}</router-link
              >
            </li>
          </ul>
        </nav>

        <div class="ml-auto flex h-full items-center">
          <profile-image v-if="isLoggedIn" />
          <action-button v-else text="Sign in" @click="loginUser" />
        </div>
      </div>

      <the-subnav v-if="isLoggedIn" />
    </div>
  </header>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { useUserStore } from "@/stores/user";

import ActionButton from "@/components/Shared/ActionButton.vue";
import ProfileImage from "@/components/Navigation/ProfileImage.vue";
import TheSubnav from "@/components/Navigation/TheSubnav.vue";

const menuItems = ref([
  { text: "Drinks", name: "DrinkResults" },
  { text: "Ingredients", name: "Ingredients" },
]);

const userStore = useUserStore();
const isLoggedIn = computed(() => userStore.isLoggedIn);
const loginUser = userStore.LOGIN_USER;

const headerHeightClass = computed(() => {
  return {
    "h-16": !isLoggedIn.value,
    "h-32": isLoggedIn.value,
  };
});
</script>
