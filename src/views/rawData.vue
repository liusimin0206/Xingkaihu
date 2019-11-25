<template>
  <div class="rawData">rawData+ {{ activeTable }}</div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    activeTable() {
      return this.$route.query.currentTable;
    }
  },
  methods: {}
};
</script>

<style scoped lang="scss">
.rawData {
  box-sizing: border-box;
  width: 100%;
  /* padding-top: -60px; */

  /* margin-top: -60px; */
  padding-top: 60px;
}
</style>
