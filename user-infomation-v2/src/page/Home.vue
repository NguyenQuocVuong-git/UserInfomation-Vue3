<template>
  <div class="hello">
    <HeaderTable />
    <TableVue />
  </div>
</template>

<script>
import TableVue from "../components/Table.vue";
import HeaderTable from "../components/Header.vue";
export default {
  name: "HomeVue",
  components: {
    TableVue,
    HeaderTable,
  },
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
