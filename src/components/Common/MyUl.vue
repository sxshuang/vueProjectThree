<template>
  <ul>
    <!-- slot就是填坑，因为不知道里边有多少东西，所以留坑 -->
    <slot></slot>
  </ul>
</template>

<script>
export default {
  name: "my-ul",
  data() {
    return {};
  }
};
</script>

<style scoped>
ul {
  margin: 0;
  padding: 0;
  overflow: hidden;
  margin-top:40px;
}
</style>
