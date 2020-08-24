<template>
  <div class="map-info">
    <!-- <div
      class="expand-button"
      title="展开搜索"
      @click="expand = true"
      v-if="!expand"
    >
      <i class="el-icon-d-arrow-left"></i>
    </div> -->
    <div class="search">
      <!-- <div expand-button @click="expand = false" title="收起">
        <i class="el-icon-d-arrow-right"></i>
      </div> -->
      <el-input
        placeholder="请输入内容"
        v-model="input"
        class="input-with-select"
      >
        <el-select
          v-model="select"
          slot="prepend"
          placeholder="请选择"
          class="select-in-input"
        >
          <el-option
            v-for="(item, index) in maptabelHeader"
            :key="index"
            :label="item[1]"
            :value="item[1]"
          ></el-option>
        </el-select>
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="onSubmit"
        ></el-button>
      </el-input>
      <!-- <div>
        <div <div v-for="item of point"></div>
      </!-->
    </div>

    <div class="dataview" v-if="mapdataview">
      <el-button
        class="closeicon"
        icon="el-icon-close"
        circle
        @click="closeDataView"
      ></el-button>
      <el-tabs type="card" tab-position="left">
        <el-tab-pane
          v-for="(item, index) in mapTableData"
          :key="index"
          :label="item.sampleid"
        >
          <el-table :data="tableData[index]" height="700" border>
            <el-table-column prop="key" label="属性" width="180">
            </el-table-column>
            <el-table-column prop="value" label="值" width="180">
            </el-table-column> </el-table
        ></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      expand: true,

      select: "",
      input: ""
    };
  },
  props: {
    mapTableData: { type: Array },
    maptabelHeader: {
      type: Array
    },
    mapdataview: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onSubmit() {
      this.$emit("mapSearch", { [this.select]: this.input });
    },
    closeDataView() {
      console.log(11111);
      this.$emit("closeDataView");
    }
  },
  computed: {
    tableData() {
      let temptable = [];
      let temptables = [];
      let tempobj = {};
      this.mapTableData.forEach(table => {
        this.maptabelHeader.forEach(header => {
          tempobj.key = header[1];
          tempobj.value = table[header[0]];
          temptable.push(tempobj);
          tempobj = {};
        });
        temptables.push(temptable);
        temptable = [];
      });
      return temptables;
    }
  }
};
</script>

<style lang="scss" scoped>
.map-info {
  background: #fff;
  .expand-button {
    height: 30px;
    width: 30px;
  }
  .search {
    display: flex;
    .input-with-select {
      padding: 5px;
      &::v-deep .el-input-group__prepend {
        background-color: #fff;
        width: 100px;
      }
    }
  }

  .dataview {
    .closeicon {
      position: absolute;
      right: 10px;
      top: 53px;
      z-index: 500;
    }
    height: 700px;
  }
}
</style>
