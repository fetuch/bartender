<template>
  <main class="flex h-screen flex-col">
    <section class="pt-10 pb-20">
      <div class="grid grid-cols-12">
        <div class="col-span-1 col-start-1"></div>

        <div class="col-span-5 col-start-2">
          <the-headline />

          <drink-search-form />
        </div>

        <div class="col-span-5 col-start-7 self-center justify-self-center">
          <img
            class="h-80 w-80 object-contain"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/2367px-Vue.js_Logo_2.svg.png"
          />
        </div>

        <div class="col-span-1 col-start-12"></div>
      </div>
    </section>

    <spot-light class="flex flex-row justify-center pb-16">
      <template #default="{ img, title, description }">
        <router-link
          to="/drinks"
          class="mx-5 flex h-96 w-72 flex-col rounded-lg border bg-brand-gray-2"
        >
          <img :src="img" class="h-48 object-cover" />

          <div class="mt-3 h-48 px-6 py-4">
            <h3 class="text-lg font-medium">
              {{ title }}
            </h3>

            <p class="mt-3 text-sm">
              {{ description }}
            </p>
          </div>

          <router-link to="/drinks" class="px-6 pb-4 text-sm text-brand-blue-1"
            >See drink</router-link
          >
        </router-link>
      </template>
    </spot-light>
  </main>
</template>

<script lang="ts" setup>
import TheHeadline from "@/components/DrinkSearch/TheHeadline.vue";
import DrinkSearchForm from "@/components/DrinkSearch/DrinkSearchForm.vue";
import SpotLight from "@/components/DrinkSearch/SpotLight.vue";
</script>
