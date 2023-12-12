<template>
  <div id="app">
    <CreateUser />
  </div>
</template>
<script>
// import HeaderUser from "../src/components/Header.vue";
// import TableUser from "../src/components/Table.vue";
import CreateUser from "../src/components/Create.vue";
export default {
  name: "App",
  components: {
    CreateUser,
    // HeaderUser,
    // TableUser,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
