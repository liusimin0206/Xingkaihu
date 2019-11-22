<template>
  <el-header id="secondHeader">
    <el-menu :default-active="$route.path" router mode="horizontal">
      <!-- 类似的添加导航菜单 index传值代表路由跳转 -->
      <el-menu-item :index="'/showMap?currentTable=' + currentTable">
        <i class="el-icon-map-location"></i>
        <span slot="title">地图显示</span>
      </el-menu-item>
      <el-menu-item :index="'/dataScreening?currentTable=' + currentTable">
        <i class="el-icon-s-data"></i>
        <span slot="title">数据总览</span>
      </el-menu-item>
      <el-menu-item :index="'/rawData?currentTable=' + currentTable">
        <i class="el-icon-document"></i>
        <span slot="title">原始数据</span>
      </el-menu-item>
      <el-menu-item :index="'/insertData?currentTable=' + currentTable">
        <i class="el-icon-plus"></i>
        <span slot="title">插入数据</span>
      </el-menu-item>
      <el-menu-item :index="'/queryData?currentTable=' + currentTable">
        <i class="el-icon-search"></i>
        <span slot="title">查询数据</span>
      </el-menu-item>
      <el-menu-item
        :index="'/statisticalAnalysis?currentTable=' + currentTable"
      >
        <i class="el-icon-s-marketing"></i>
        <span slot="title">统计分析</span>
      </el-menu-item>
    </el-menu>
  </el-header>
</template>

<script>
export default {
  props: {
    currentTable: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped lang="scss">
.el-container {
  height: 60px;
}
.el-main {
  padding: 0;
  height: 100%;
}
.el-header {
  padding: 0;
}
</style>
