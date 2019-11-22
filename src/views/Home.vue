<template>
  <div class="home">pagename:{{ this.$store.state.activeTable }}</div>
</template>

<script>
// @ is an alias to /src

export default {
  components: {},
  data() {
    return {};
  },
  created() {
    this.$store.commit("changeActiveTable", "首页");
  }
};
</script>
