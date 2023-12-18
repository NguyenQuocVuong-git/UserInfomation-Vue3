<script setup>
import { ref, computed, watch } from "vue";
import socket from "@/socket/socket";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import axios from "@/axios";
import {
  requiredValidator,
  emailValidator,
  passwordValidator,
} from "../utils/validators";
const store = useStore();
const router = useRouter();
const route = useRoute();
const form = ref({
  username: "",
  password: "",
});
const errLogin = ref("");
const err = ref(false);
const refVForm = ref()
const login = async () => {
  await axios
    .post("/user/login", {
      email: form.value.username,
      password: form.value.password,
    })
    .then((res) => {
      store.dispatch("LOGIN", res.data.userLogin);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.userLogin));
      localStorage.setItem("id", res.data.userLogin._id);
      socket.auth = { username: res.data.userLogin.email, id: res.data.userLogin._id };
      socket.connect();
      return router.replace(route.query.to ? String(route.query.to) : "/");
    })
    .catch((error) => {
      console.log(error);
      (err.value = true), (errLogin.value = error.response.data.err);
    });
};

const user = computed(() => {
  return store.getters.user;
});

watch(user, (newValue, oldValue) => {
  if (!oldValue && newValue) {
    router.push("/");
  }
});

const onSubmit = () => {
  refVForm.value?.validate().then(({valid: isValid})=>{
    if(isValid){
      login()
    }
  })
}
</script>
<template>
  <v-main class="main">
    <h5 v-if="err" style="color: red">{{ errLogin }}</h5>
    <v-form ref="refVForm" @submit.prevent="onSubmit">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" sm="8" md="6">
            <v-text-field
              v-model="form.username"
              label="Username or email"
              placeholder="Username or email"
              :rules="[requiredValidator, emailValidator]"
              required
              outlined
            ></v-text-field>
            <v-text-field
              v-model="form.password"
              label="PassWord"
              placeholder="PassWord"
              :rules="[requiredValidator, passwordValidator]"
              required
              outlined
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-btn color="primary" type="submit" elevation="2" large>Go!</v-btn>
          <v-btn color="primary" type="submit" elevation="2" large>
            <router-link :to="{ name: 'createAccount' }"
              >Create Account</router-link
            >
          </v-btn>
        </v-row>
      </v-container>
    </v-form>
  </v-main>
</template>

<style scoped>
.main {
  background-image: url("https://www.wallpaperbetter.com/wallpaper/555/606/469/sea-sky-beach-2K-wallpaper.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
</style>
