<template>
  <li class="mb-7">
    <router-link
      to="/drinks/1"
      class="mx-auto block rounded border border-solid border-brand-gray-2 bg-white hover:shadow-gray"
    >
      <div class="mx-8 border-b border-solid border-brand-gray-2 pt-5 pb-2">
        <h2 class="mb-2 text-2xl">Mojito</h2>

        <div class="mb-3">
          <span>Rum, Lime Juice, Mint Leaves</span>
        </div>

        <div>
          <span>
            There are different theories on who invented the mojito. Some
            believe it was created in the 19th century by African slaves who
            worked in the Cuban sugarcane fields. Others say that it was created
            by Naval Officer Sir Francis Drake while he was in Cuba. What we do
            know is that mojitos began to gain popularity in Havana, Cuba in the
            1900s and it’s now one of the most popular cocktails in the world.
          </span>
        </div>
      </div>

      <div class="px-8 py-4">
        <div>
          <h3 class="mt-1 mb-2">HOW TO MAKE A MOJITO:</h3>
          <div>
            <ul class="list-disc pl-8">
              <li>2 ounces of white rum</li>
              <li>½ ounce of lime juice</li>
              <li>1 teaspoon of sugar</li>
              <li>3 mint leaves</li>
              <li>Cracked ice</li>
              <li>Club soda or seltzer</li>
              <li>½ ounce of simple syrup</li>
            </ul>
          </div>
        </div>

        <div class="mt-2 text-center">
          <router-link to="/drinks/1" class="text-brand-blue-1"
            >Expand</router-link
          >
        </div>
      </div>
    </router-link>
  </li>
</template>

<script>
export default {
  name: "DrinkListing",
};
</script>
