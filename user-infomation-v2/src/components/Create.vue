<template>
  <v-main class="main">
    <v-form ref="refVForm" @submit.prevent="onSubmit">
      <v-container>
        <v-row justify="center">
          <h1>Please fill in the information below</h1>
          <v-col cols="12" sm="8" md="6">
            <h5 v-if="statusCreate" style="color: red">
              {{ statusCreateValue }}
            </h5>
            <v-text-field
              v-model="form.email"
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
            <v-text-field
              v-model="form.passwordConfirm"
              label="PassWord Confirm"
              placeholder="PassWord Confirm"
              :rules="[
                requiredValidator,
                passwordValidator,
                confirmedValidator(form.passwordConfirm, form.password),
              ]"
              required
              outlined
            ></v-text-field>
            <v-text-field
              v-model="form.name"
              label="Name"
              placeholder="Name"
              :rules="[requiredValidator, nameValidator]"
              required
              outlined
            ></v-text-field>
            <v-text-field
              v-model="form.age"
              label="Age"
              placeholder="Age"
              :rules="[requiredValidator, numberValidator]"
              required
              outlined
            ></v-text-field>
            <v-text-field
              v-model="form.phone"
              label="Phone"
              placeholder="Phone"
              :rules="[requiredValidator, phoneValidator]"
              required
              outlined
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-btn color="primary" type="submit" elevation="2" large
            >Create Account</v-btn
          >
          <v-btn color="primary" type="submit" elevation="2" large>
            <router-link :to="{ name: 'login' }">Back to login</router-link>
          </v-btn>
        </v-row>
      </v-container>
    </v-form>
  </v-main>
</template>
<script setup>
import axios from "@/axios";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import socket from "@/socket/socket";
import { useStore } from "vuex";
import {
  requiredValidator,
  emailValidator,
  passwordValidator,
  confirmedValidator,
  nameValidator,
  numberValidator,
  phoneValidator,
} from "../utils/validators";
const route = useRoute();
const router = useRouter();
const store = useStore();
const statusCreateValue = ref("");
const statusCreate = ref(false);
const refVForm = ref();
const form = ref({
  email: "",
  password: "",
  passwordConfirm: "",
  name: "",
  age: "",
  phone: "",
});

const createAccount = async () => {
  statusCreate.value = true;
  console.log(form.value)
  await axios
    .post("user/createUser", {
      email: form.value.email,
      password: form.value.password,
      passwordConfirm: form.value.passwordConfirm,
      name: form.value.name,
      age: parseInt(form.value.age),
      phone: form.value.phone,
    })
    .then((res) => {
      store.dispatch("LOGIN", res.data.userLogin);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", res.data.userLogin);
      socket.auth = { username: res.data.userLogin.email };
      socket.connect();
      statusCreateValue.value = "Create Account Succsessfully";
      setTimeout(() => {
        return router.replace(route.query.to ? String(route.query.to) : "/");
      }, 2000);
    })
    .catch((error) => {
      statusCreateValue.value = error.response.data.err;
    });
};
const onSubmit = () => {
  refVForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid) {
      createAccount();
    }
  });
};
</script>

<style scoped>
.main {
  background-image: url("https://www.wallpaperbetter.com/wallpaper/555/606/469/sea-sky-beach-2K-wallpaper.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
</style>