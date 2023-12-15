<template>
  <div>
    <h3 v-if="statusDelete" style="color: red">{{ statusDeleteValue }}</h3>
  </div>
  <div class="table-wrapper">
    <table class="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(person, index) in people" :key="index">
          <td>{{ person.name }}</td>
          <td>{{ person.age }}</td>
          <td>{{ person.email }}</td>
          <td>{{ person.phone }}</td>
          <td>
            <button
              @click="
                show = !show;
                iform = person;
              "
            >
              Update
            </button>
            <button>
              <a
                href="javascript:;"
                v-on:click="(confirmDelete = true), (id = person._id)"
                >Delete</a
              >
            </button>
          </td>
        </tr>
        <UpdateUser v-model:active="show" :data-edit="iform" />
      </tbody>
      <div class="modal-container" v-if="confirmDelete">
        <div class="modal-body">
          <span class="modal-close" @click="confirmDelete = false">🗙</span>
          <h2>Do you really want to delete?</h2>
          <div class="modal-action">
            <button class="modal-button" @click="deleteUser()">Yes</button>
            <button class="modal-button" @click="confirmDelete = false">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </table>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "@/axios";
import UpdateUser from "@/components/UpdateUser.vue";
const show = ref(false);
const iform = ref();
const people = ref([]);
const confirmDelete = ref(false);
const statusDeleteValue = ref();
const statusDelete = ref(false);

const id = ref();
const getAll = () => {
  axios.get("user/getAllUser").then((res) => {
    people.value = res.data.allUser;
  });
};
getAll();
const deleteUser = async () => {
  confirmDelete.value = false;
  statusDelete.value = true;
  await axios
    .delete(`user/deleteUser/${id.value}`)
    .then(() => {
      statusDeleteValue.value = "Delete account success";
      setTimeout(() => {
        statusDelete.value = false;
      }, 3000);
      getAll();
    })
    .catch(() => {
      statusDeleteValue.value = "Delete account unsuccess";
      setTimeout(() => {
        statusDelete.value = false;
      }, 3000);
    });
};
</script>
<script>
export default {
  name: 'TableUser',
  props: {
    msg: String
  }
}
</script>
<style>
.table-wrapper {
  display: flex;
  justify-content: center;
}

.table {
  border-collapse: collapse;
}

.table th,
.table td {
  border: 1px solid black;
  padding: 8px;
}
.modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: #cececeb5;
}
.modal-body {
  background-color: #fff;
  border: 2px solid #74a2cf;
  border-radius: 10px;
  text-align: center;
  padding: 20px 40px;
  min-width: 250px;
  display: flex;
  flex-direction: column;
}
.modal-action {
  display: flex;
  flex-direction: row;
  gap: 40px;
  justify-content: center;
}
.modal-button {
  cursor: pointer;
  height: 30px;
  padding: 0 25px;
  border: 2px solid #74a2cf;
  border-radius: 5px;
  background-color: #80b2e4;
  color: #fff;
}
.modal-close {
  cursor: pointer;
  position: relative;
  align-self: end;
  right: -33px;
  top: -17px;
}
</style>
