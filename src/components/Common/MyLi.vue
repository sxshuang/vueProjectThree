<template>
  <li>
    <slot></slot>
  </li>
</template>

<script>
export default {
  name: "my-li",
  data() {
    return {};
  }
};
</script>

<style scoped>
li {
  list-style: none;
  float: left;
  width: 33%;
  /* background-color: yellowgreen; */
  text-align: center;
  height: 100px;
  position: relative;
  margin: 1px 1px 0 0;
}
li span {
  display: block;
  margin: 0px auto;
}

</style>

