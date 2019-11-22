<template>
  <div>
    queryData + {{ activeTable }}
    <div>
      <el-select v-model="queryField" filterable multiple placeholder="请选择">
        <el-option
          v-for="item in queryOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <el-form label-position="right" :model="inputForm" class="queryForm">
      <el-form-item
        v-for="item in queryField"
        :key="item"
        :label="item"
        class="queryItem"
      >
        <el-input v-model="inputForm[item]" autocomplete="off"></el-input>
      </el-form-item>
      <el-button
        id="queryButton"
        type="primary"
        @click="queryData"
        icon="el-icon-search"
        >查 询</el-button
      >
    </el-form>
    <el-table :data="currentPageTableData" border :empty-text="defaultresult">
      <el-table-column
        type="index"
        width="50"
        :index="indexMethod"
        fixed
      ></el-table-column>
      <el-table-column
        v-for="item in this.tabelHeader"
        :key="item[0]"
        :prop="item[0]"
        :label="item[1]"
        width="180"
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
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputForm: {},
      tabelHeader: [],
      defaultresult: "查询结果",
      tableData: [],

      queryOptions: [],
      queryField: [],
      currentPage: 1, // 当前页数
      pageSize: 10
    };
  },
  mounted() {
    this.getTableHeader();
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
  methods: {
    queryData() {
      this.inputForm.tableidjs = this.activeTable;
      console.log(this.inputForm);
      this.$http
        .get("/XingKaiHu1/jsonServlet", { params: this.inputForm })
        .then(res => {
          this.tableData = [];
          console.log("总览", res);
          let arr = res.data;
          for (let i = 0; i < arr.length; i++) {
            this.tableData.push(arr[i].value);
          }
          console.log(this.tableData);
        });
      this.inputForm = {};
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    indexMethod(index) {
      return index + this.pageSize * (this.currentPage - 1) + 1;
    },
    getTableHeader() {
      let tbHeadUrl =
        "/XingKaiHu1/TbHeadServlet?tableidjs=" + this.$route.query.currentTable;
      this.$http.get(tbHeadUrl).then(res => {
        this.tabelHeader = res.data;
        for (let i = 0; i < this.tabelHeader.length; i++) {
          let option = {
            value: this.tabelHeader[i][1],
            label: this.tabelHeader[i][1]
          };
          this.queryOptions.push(option);
        }
        this.queryField.push(this.tabelHeader[0][1]);
      });
    }
  }
};
</script>

<style scoped lang="scss">
.queryForm {
  // width: 300px;
  // margin: 0 auto;

  display: flex;
  justify-content: flex-end;

  .queryItem {
    display: flex;
  }
  #queryButton {
    // float: right;
    height: 40px;
    margin-left: 50px;
  }
}
</style>
