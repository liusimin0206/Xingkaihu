<template>
  <div>rawData+ {{ activeTable }}</div>
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

<style scoped lang="scss"></style>
