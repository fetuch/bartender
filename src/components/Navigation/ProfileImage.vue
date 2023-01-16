<template>
  <img
    :src="imageLink"
    class="h-8 w-8 rounded-3xl object-contain"
    alt="User profile image"
  />
</template>

<script>
export default {
  name: "ProfileImage",
  data() {
    return {
      imageLink:
        "https://img.freepik.com/free-vector/mysterious-mafia-man-wearing-hat_52683-34829.jpg?t=st=1654361228~exp=1654361828~hmac=cea4ffa733bb62c8fe7cb9d45c1712571abec7499ec05f94c225f5f22a3460bd",
    };
  },
};
</script>
