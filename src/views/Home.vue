<template>
  <div class="home">
    <div id="write" class="is-node">
      <h1>
        <a
          name="兴凯湖国家地质公园地质遗迹数据管理系统"
          class="md-header-anchor"
        ></a
        ><span>兴凯湖国家地质公园地质遗迹数据管理系统</span>
      </h1>
      <p>
        <span
          >兴凯湖国家地质公园地质遗迹数据管理系统旨在实现水体检测、土壤采样等环境数据与地图相结合，通过网页的方式在地图上进行展示，表达采样点的分布状况和数据的表格化展示。</span
        >
      </p>
    </div>
  </div>
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
