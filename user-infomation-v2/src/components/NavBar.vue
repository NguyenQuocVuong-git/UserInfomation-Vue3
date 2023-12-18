<template>
  <div class="navbar">
    <div @click="redirectPage('')">Chat</div>
    <div @click="redirectPage('user')">User</div>
    <div @click="redirectPage('about')">About</div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const redirectPage = async (screen) => {
  console.log("🚀 ~ file: NavBar.vue:13 ~ redirectPage ~ screen:", screen);
  if (screen === "about") await router.replace("/about");
  if (screen === "user") await router.replace("/user");
  if (screen === "") await router.replace("/");
};
</script>

<style scoped>
.navbar {
  display: flex;
  gap: 20px;
  justify-content: center;
}
</style>
