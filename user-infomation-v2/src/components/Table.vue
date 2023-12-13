<template>
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
            <!-- <button
              @click="
                show = !show;
                iform = person;
              "
            >
              Update
            </button> -->
            <button>
              <a
                href="javascript:;"
                v-on:click="deleteUser(person.email, index)"
                >Delete</a
              >
            </button>
          </td>
        </tr>
        <!-- <UpdateUser v-model:active="show" :data-edit="iform" /> -->
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "@/axios";
// import UpdateUser from "@/diaglog/UpdateUser.vue";
// const show = ref(false);
// const iform = ref();
const people = ref([
  {
    name: "John Doe",
    age: 30,
    email: "mailto:john@example.com",
    phone: "123-456-7890",
  },
  {
    name: "Jane Smith",
    age: 25,
    email: "mailto:jane@example.com",
    phone: "987-654-3210",
  },
]);
const getAll = () => {
  axios.get("user/getAllUser").then((res) => {
    people.value = res.data.allUser;
  });
};
getAll();
const deleteUser = async (email, index) => {
  if (confirm("Do you really want to delete?")) {
    await axios
      .get("user/deleteUser")
      .then(() => {
        if (index > -1) {
          people.value.splice(index, 1);
        }
        alert("Account Delete Succsess.");
      })
      .catch((err) => {
        if (index > -1) {
          people.value.splice(index, 1);
        }
        alert(err);
      });
  }
};
</script>
  
<script>
export default {
  name: 'TableUser',
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
</style>
