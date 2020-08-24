<template>
  <div class="dataScreening">
    <h1 class="header">{{ activeTable }}</h1>
    <el-table :data="currentPageTableData" border :empty-text="defaultresult">
      <el-table-column type="index" :index="indexMethod" width="40" fixed fit>
      </el-table-column>
      <el-table-column
        v-for="item in tabelHeader"
        :key="item[0]"
        :prop="item[0]"
        :label="item[1]"
        show-overflow-tooltip
        width="130"
      ></el-table-column>
    </el-table>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 25]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "dataScreening",
  components: {},
  data() {
    return {
      tabelHeader: [],
      defaultresult: "正在加载",
      tableData: [],
      currentPage: 1, // 当前页数
      pageSize: 10
    };
  },
  computed: {
    activeTable() {
      return this.$route.query.currentTable;
    },
    total() {
      return this.tableData.length;
    },
    currentPageTableData() {
      return this.tableData.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    }
  },

  mounted() {
    this.getTableHeader();
    this.getTableData();
  },
  methods: {
    getTableHeader() {
      let tbHeadUrl = "/XingKaiHu1/TbHeadServlet?tableidjs=" + this.activeTable;
      this.$http.get(tbHeadUrl).then(res => {
        this.tabelHeader = res.data;
      });
    },
    getTableData() {
      this.$http
        .get("/XingKaiHu1/jsonServlet?tableidjs=" + this.activeTable)
        .then(res => {
          console.log("总览", res);
          let arr = res.data;
          for (let i = 0; i < arr.length; i++) {
            this.tableData.push(arr[i].value);
            // console.log(this.tableData);
          }
        });
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    indexMethod(index) {
      return index + this.pageSize * (this.currentPage - 1) + 1;
    }
  }
};
</script>
<style lang="scss" scoped>
// .dataScreening {
//   height: 100%;
//   .header {
//     height: 40px;
//     line-height: 40px;
//   }
// }
</style>
