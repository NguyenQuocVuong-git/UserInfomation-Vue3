<template>
  <div class="card container">
    <div class="row">
      <h1>Log in information</h1>
      <h5 v-if="err" style="color: red">{{ errLogin }}</h5>
      <div class="input">
        <label for="email" class="lable">Email: </label>
        <input id="email" v-model="email" />
      </div>
      <div class="input">
        <label for="password" class="lable">PassWord: </label>
        <input id="password" type="password" v-model="password" />
      </div>
    </div>
    <button @click="login()">Login</button>
    <button>
      <router-link :to="{name: 'createAccount'}">Create Account</router-link>
    </button>
  </div>
</template>
<script setup>
import axios from "@/axios";
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
const route = useRoute();
const router = useRouter();
const email = ref("");
const password = ref("");
const errLogin = ref("");
const err = ref(false);

const login = async () => {
  await axios
    .post("/user/login", {
      email: email.value,
      password: password.value,
    })
    .then((res) => {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", res.data.userLogin);
      return router.replace(route.query.to ? String(route.query.to) : "/");
    })
    .catch((error) => {
      console.log(error);
      (err.value = true), (errLogin.value = error.response.data.err);
    });
};
</script>
<script>
export default {
  name: "LoginAccount",
};
</script>
<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.container {
  max-width: 400px;
  box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2),
    0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12);
  margin-top: 30px;
  margin-left: auto;
  margin-right: auto;
  padding: 15px;
  background-color: #fff;
}

.enter-active,
.leave-active {
  transition: opacity 0.2s;
}
.enter,
.leave-to {
  opacity: 0;
}

.enter-active .container,
.leave-active .container {
  transition: transform 0.4s;
}
.enter .container,
.leave-to .container {
  transform: scale(0.9);
}
.input {
  display: flex;
  margin-bottom: 10px;
}
.lable {
  width: 150px;
}
</style>
