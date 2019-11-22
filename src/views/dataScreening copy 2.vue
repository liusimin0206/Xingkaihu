<template>
  <div class="dataScreening">
    <h1 class="header">This is an dataScreening page+ {{ activeTable }}</h1>
    <el-table
      :data="tableData"
      border
      :empty-text="defaultresult"
      :max-height="800"
    >
      <el-table-column
        v-for="item in tabelHeader"
        :key="item[0]"
        :prop="item[0]"
        :label="item[1]"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "dataScreening",
  components: {},
  data() {
    return {
      defaultresult: "正在加载",
      tabelHeader: [],
      tableData: []
    };
  },
  computed: {
    activeTable() {
      return this.$store.state.activeTable;
    }
  },

  mounted() {
    this.$http
      .get("/XingKaiHu1/TbHeadServlet?tableidjs=" + this.activeTable)
      .then(res => {
        console.log(res.data);
        this.tabelHeader = res.data;
        console.log(this.tabelHeader);
      });
    this.$http
      .get("/XingKaiHu1/jsonServlet?tableidjs=" + this.activeTable)
      .then(res => {
        console.log("总览", res);
        let arr = res.data;
        for (let i = 0; i < arr.length; i++) {
          this.tableData.push(arr[i].value);
        }
        console.log(this.tableData);
      });
  }
};
</script>
<style lang="scss" scoped>
.dataScreening {
  height: 100%;
  .header {
    height: 40px;
    line-height: 40px;
  }
}
</style>
