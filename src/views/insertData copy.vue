<template>
  <div id="insertData">
    <h1>insertData +{{ activeTable }}</h1>
    <div id="dataUpload">
      <div>
        <el-button type="primary" @click="dialogFormVisible = true"
          >手动增添数据</el-button
        >
        <el-dialog title="增添数据" :visible.sync="dialogFormVisible">
          <el-form
            label-position="right"
            :model="inputForm"
            v-for="item in tabelHeader"
            :key="item[0]"
          >
            <el-form-item :label="item[1]">
              <el-input
                v-model="inputForm[item[0]]"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addDataToTable">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <el-button type="primary" @click="test">
        模板下载<i class="el-icon-download el-icon--right"></i>
      </el-button>
      <el-upload
        class="upload-demo"
        ref="upload"
        action="/"
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        :on-change="importExcel"
        :file-list="fileList"
        :show-file-list="false"
        :auto-upload="false"
      >
        <el-button type="primary" slot="trigger"
          >导入excel<i class="el-icon-folder-opened el-icon--right"></i
        ></el-button>
        <el-button type="success" @click="submitUpload"
          >上传到服务器<i class="el-icon-upload el-icon--right"></i
        ></el-button>
      </el-upload>
    </div>

    <el-table
      :data="tableData"
      border
      :empty-text="defaultresult"
      :max-height="800"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" fixed> </el-table-column>
      <el-table-column type="index" width="50" fixed> </el-table-column>
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
import XLSX from "xlsx";

export default {
  name: "insertData",
  components: {},
  data() {
    return {
      defaultresult: "空空如也",
      tabelHeader: this.$store.state.tabelHeader,
      tableData: [],
      fileList: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      inputForm: {},
      multipleSelection: []
    };
  },
  computed: {
    activeTable() {
      return this.$store.state.activeTable;
    }
  },
  mounted() {},
  methods: {
    importExcel(file) {
      const types = file.name.split(".")[1];
      const fileType = ["xlsx", "xlc", "xlm", "xls", "xlt", "xlw", "csv"].some(
        item => item === types
      );
      if (!fileType) {
        this.$message("格式错误！请重新选择");
        return;
      }
      this.file2Xce(file).then(tabJson => {
        if (tabJson && tabJson.length > 0) {
          this.xlsxJson = tabJson;
          console.log("数据", this.xlsxJson[0].sheet);
          // let newJson = {};
          let newArr = this.translateTheKeys(this.xlsxJson[0].sheet);
          console.log("数据", newArr);
          this.tableData = this.tableData.concat(newArr);
          // xlsxJson就是解析出来的json数据,数据格式如下
          // [
          //   {
          //     sheetName: sheet1
          //     sheet: sheetData
          //   }
          // ]
        }
      });
    },
    translateTheKeys(arr) {
      let newArr = [];
      for (let i = 0; i < arr.length; i++) {
        let newOb = {};
        for (let key in arr[i]) {
          if (arr[i].hasOwnProperty(key)) {
            newOb[this.tabelHeader[this.findHeaderIndex(key)][0]] = arr[i][key];
          }
        }
        newArr.push(newOb);
      }
      return newArr;
    },
    findHeaderIndex(Str2) {
      for (let i = 0; i < this.tabelHeader.length; i++) {
        if (Str2 == this.tabelHeader[i][1]) {
          return i;
        }
      }
    },
    file2Xce(file) {
      return new Promise(function(resolve, reject) {
        const reader = new FileReader();
        reader.onload = function(e) {
          const data = e.target.result;
          this.wb = XLSX.read(data, {
            type: "binary"
          });
          const result = [];
          this.wb.SheetNames.forEach(sheetName => {
            result.push({
              sheetName: sheetName,
              sheet: XLSX.utils.sheet_to_json(this.wb.Sheets[sheetName])
            });
          });
          resolve(result);
        };
        reader.readAsBinaryString(file.raw);
        // reader.readAsBinaryString(file) // 传统input方法
        console.log(reject);
      });
    },
    submitUpload() {
      this.$http({
        method: "post",
        url: "/XingKaiHu1/insertServlet",
        data: this.tableData
      }).then(res => {
        console.log(res.data);
      });
    },
    test() {
      console.log(this.tableData);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    addDataToTable() {
      this.dialogFormVisible = false;
      this.tableData.push(this.inputForm);
      this.inputForm = {};
    }
  }
};
</script>

<style scoped lang="scss">
#dataUpload {
  display: flex;
  justify-content: center;
}
</style>
