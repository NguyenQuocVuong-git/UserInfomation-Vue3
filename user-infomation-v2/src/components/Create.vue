<template>
  <div class="card container">
    <div class="dialog-container" @click.stop>
      <div class="row">
        <h1 v-if="creatAccount">Please fill in the information below</h1>
        <h1 v-if="!creatAccount">Log in information</h1>
        <h5 v-if="err" style="color: red">{{ errCreate }}</h5>
        <div class="input">
          <label for="email" class="lable">Email: </label>
          <input id="email" v-model="email" />
        </div>
        <div class="input">
          <label for="password" class="lable">PassWord: </label>
          <input id="password" type="password" v-model="password" />
        </div>
        <div class="input" v-if="creatAccount">
          <label for="passwordConfirm" class="lable">PassWordConfirm</label>
          <input
            id="passwordConfirm"
            type="password"
            v-model="passwordConfirm"
          />
        </div>
        <div class="input" v-if="creatAccount">
          <label for="name" class="lable">Name: </label>
          <input id="name" v-model="name" />
        </div>
        <div class="input" v-if="creatAccount">
          <label for="age" class="lable">Age: </label>
          <input id="age" v-model="age" />
        </div>
        <div class="input" v-if="creatAccount">
          <label for="phone" class="lable">Phone: </label>
          <input id="phone" v-model="phone" />
        </div>
      </div>
      <button
        @click="
          createAccount();
          creatAccount = true;
        "
      >
        Create An Account
      </button>
      <button
        @click="
          login();
          creatAccount = false;
        "
      >
        Login
      </button>
    </div>
  </div>
</template>
<script setup>
import axios from "@/axios"
import { ref } from "vue";
const email = ref("");
const password = ref("");
const passwordConfirm = ref("");
const name = ref("");
const age = ref("");
const phone = ref("");
const creatAccount = ref(false);
const errCreate = ref('')
const err = ref(false)

const createAccount = async () => {
  await axios.post("user/createUser",{
    email: email.value,
    password: password.value,
    passwordConfirm: passwordConfirm.value,
    name: name.value,
    age: parseInt(age.value),
    phone: phone.value,
  }).then(()=>{

  }).catch((error)=>{
    err.value= true,
    errCreate.value = error.response.data.err
    })
};
const login = () => {
  err.value= false;
};
</script>
<script>
export default {
  name: "CreateUser",
};
</script>
<style scoped>
.dialog-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.dialog-container {
  max-width: 400px;
  box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2),
    0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12);
  margin-top: 30px;
  margin-left: auto;
  margin-right: auto;
  padding: 15px;
  background-color: #fff;
}

.dialog-enter-active,
.dialog-leave-active {
  transition: opacity 0.2s;
}
.dialog-enter,
.dialog-leave-to {
  opacity: 0;
}

.dialog-enter-active .dialog-container,
.dialog-leave-active .dialog-container {
  transition: transform 0.4s;
}
.dialog-enter .dialog-container,
.dialog-leave-to .dialog-container {
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
