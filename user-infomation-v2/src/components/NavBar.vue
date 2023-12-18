<template>
  <div class="navbar">
    <div @click="redirectPage('/')">Chat</div>
    <div @click="redirectPage('user')">User</div>
    <div @click="redirectPage('about')">About</div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const redirectPage = async (screen) => {
  await router.replace(`${screen}`);
};
</script>

<style scoped>
.navbar {
  display: flex;
  gap: 20px;
  justify-content: center;
}
</style>
