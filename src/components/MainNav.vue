<template>
  <header class="w-full text-sm">
    <div class="fixed top-0 left-0 h-16 w-full bg-white">
      <div
        class="mx-auto flex h-full flex-nowrap border-b border-solid border-brand-gray-1 px-8"
      >
        <a :href="url" class="flex h-full items-center text-xl">{{
          appName
        }}</a>

        <nav class="ml-12 h-full">
          <ul class="flex h-full list-none space-x-5">
            <li v-for="menuItem in menuItems" :key="menuItem" class="h-full">
              <a href="" class="flex h-full items-center py-2.5">{{
                menuItem
              }}</a>
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

<script>
import ActionButton from "@/components/ActionButton.vue";
import ProfileImage from "@/components/ProfileImage.vue";
import TheSubnav from "@/components/TheSubnav.vue";

export default {
  name: "MainNav",

  components: {
    ActionButton,
    ProfileImage,
    TheSubnav,
  },

  data() {
    return {
      appName: "Bartender App",
      url: "https://careers.google.com",
      menuItems: ["Drinks", "Ingredients"],
      isLoggedIn: false,
    };
  },

  methods: {
    loginUser() {
      this.isLoggedIn = true;
    },
  },
};
</script>
