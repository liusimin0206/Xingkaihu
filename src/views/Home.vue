<template>
  <div class="home">pagename:{{ this.currentTable }}</div>
</template>

<script>
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
<style lang="scss" scoped>
.home {
  padding-top: 0 !important;
}
</style>
