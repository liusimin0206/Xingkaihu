<template>
  <div class="home">pagename:{{ this.currentTable }}</div>
</template>

<script>
// @ is an alias to /src

export default {
  components: {},
  data() {
    return {};
  },
  created() {},
  computed: {
    currentTable() {
      return this.$route.query.currentTable;
    }
  }
};
</script>
