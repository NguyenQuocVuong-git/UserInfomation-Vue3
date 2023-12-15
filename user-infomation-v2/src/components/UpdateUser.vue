<template>
  <transition name="dialog">
    <div
      v-if="props.active"
      class="dialog-backdrop"
      @click="handleBackdropClick"
    >
      <div class="dialog-container" @click.stop>
        <h1>EDIT USERS INFORMATION</h1>
        <h5 v-if="statusEdit" style="color: red">{{ statusEditValue }}!</h5>
        <div class="row">
          <form @submit.prevent="updateUser">
            <div class="divform">
              <label for="name" class="lable">Name: </label>
              <input id="name" v-model="form.name" />
            </div>
            <div class="divform">
              <label for="age" class="lable">Age: </label>
              <input id="age" v-model="form.age" />
            </div>
            <div class="divform">
              <label for="phone" class="lable">Phone: </label>
              <input id="phone" v-model="form.phone" />
            </div>
            <div class="divform">
              <label for="email" class="lable">Email: </label>
              <input id="email" v-model="form.email" />
            </div>
            <button type="submit">Submit</button>
          </form>
          <button @click="emit('update:active', false)">Cancel</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import axios from "@/axios";
import { defineProps, defineEmits, ref, toRaw, watch } from "vue";
const statusEdit = ref(false);
const statusEditValue = ref();
let form = ref({
  age: "",
  email: "",
  name: "",
  phone: "",
});
const props = defineProps({
  active: Boolean,
  dataEdit: null,
});
const emit = defineEmits(["update:active"]);
form.value = structuredClone(toRaw(props.dataEdit))
watch(props, () => {
  form.value = structuredClone(toRaw(props.dataEdit))
})

const updateUser = () => {
  statusEdit.value = true;
  axios
    .put("user/updateUser", {
      name: form.value.name,
      age: parseInt(form.value.age),
      email: form.value.email,
      phone: form.value.phone,
      key: form.value.email
    })
    .then(() => {
      statusEditValue.value = "Update user successfully.";
      setTimeout(() => {
        emit("update:active", false);
      }, 1000);
    })
    .catch(() => {
      statusEditValue.value = "Update user unsuccess.";
    });
};
const handleBackdropClick = () => {
  emit("update:active", false);
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
.divform {
  display: flex;
  margin-bottom: 10px;
}
.lable {
  width: 60px;
}
</style>
