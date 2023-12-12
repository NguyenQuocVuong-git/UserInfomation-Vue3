<template>
    <transition name="dialog">
      <div
        v-if="props.active"
        class="dialog-backdrop"
        @click="handleBackdropClick"
      >
        <div class="dialog-container" @click.stop>
          <h1>EDIT USERS INFORMATION</h1>
          <h5 v-if="showErr" style="color: red;">{{ errData }}!</h5>
          <div class="row">
            <div style="display: flex; margin-bottom: 10px">
              <label for="name" style="width: 60px">Name: </label>
              <input id="name" :value="props.dataEdit.name" />
            </div>
            <div style="display: flex; margin-bottom: 10px">
              <label for="age" style="width: 60px">Age: </label>
              <input id="age" :value="props.dataEdit.age" />
            </div>
            <div style="display: flex; margin-bottom: 10px">
              <label for="phone" style="width: 60px">Phone: </label>
              <input id="phone" :value="props.dataEdit.phone" />
            </div>
            <div style="display: flex; margin-bottom: 10px">
              <label for="email" style="width: 60px">Email: </label>
              <input id="email" :value="props.dataEdit.email" />
            </div>
          </div>
          <button @click="updateUser">Submit</button>
        </div>
      </div>
    </transition>
  </template>
  
  <script setup>
  import axios from "@/axios";
  import { defineProps, defineEmits, ref } from "vue";
  const showErr = ref(false);
  const errData = ref();
  const props = defineProps({
    active: Boolean,
    dataEdit: null,
  });
  const emit = defineEmits(["update:active"]);
  const updateUser = () => {
    axios
      .put("user/updateUser", {
        name: document.getElementById("name"),
        age: document.getElementById("age"),
        email: document.getElementById("email"),
        phone: document.getElementById("phone"),
      })
      .then((res) => {
        emit("update:active", false);
        console.log(res);
      })
      .catch((err) => {
        showErr.value = true;
        errData.value = err.response.data.err;
        console.log(err.response.data.err);
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
  </style>
