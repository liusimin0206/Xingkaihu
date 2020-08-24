<template>
  <div class="test">
    <div id="app">
      <el-menu
        class="left"
        :default-active="currentTable ? currentTable : '/'"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        unique-opened
        :collapse="isCollapse"
      >
        <!-- 类似的添加导航菜单 index传值代表路由跳转 -->
        <el-menu-item index="/" @click="changeTable('首页')">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu
          v-for="item in AllTableNames"
          :key="item.classname"
          :index="item.classname"
        >
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>{{ item.classname }}</span>
          </template>
          <el-menu-item
            v-for="name in item.tableNames"
            :key="name"
            :index="name"
            @click="changeTable(name)"
            >{{ name }}</el-menu-item
          >
        </el-submenu>
      </el-menu>
      <div class="right">
        <Main
          class="second-header"
          :currentTable="currentTable"
          v-if="this.$route.name !== 'home'"
        ></Main>
        <router-view class="router-view" />
      </div>
    </div>
  </div>
</template>

<script>
import Main from "./views/main";
export default {
  components: {
    Main
  },
  data() {
    return {
      AllTableNames: [
        {
          classname: "地下水体监测",
          tableNames: [
            "地下水样采集记录",
            "地下水动态监测调查记录",
            "机（民）井动态监测调查记录",
            "机（民）井调查记录"
          ]
        },
        {
          classname: "地表水体监测",
          tableNames: [
            "地表水动态监测调查",
            "地表水野外调查",
            "河流湖泊监测断面信息",
            "水样采集记录"
          ]
        },
        {
          classname: "湖岗地质遗迹监测",
          tableNames: [
            "湖岗动态侵蚀监测记录",
            "风蚀口调查",
            "风蚀检测记录表（插钎法）一",
            "湖浪监测",
            "河湖库塌岸调查"
          ]
        },
        {
          classname: "土壤环境调查",
          tableNames: ["土壤调查坐标", "土壤现场取样记录"]
        },
        {
          classname: "人为环境因素调查",
          tableNames: [
            "地质地貌条件调查验证记录",
            "点状污染源调查记录",
            "废水污染源（污水排放口）调查记录",
            "固体污染源调查记录",
            "旅游资源调查",
            "农药化肥施用情况调查"
          ]
        }
      ],
      isCollapse: false
    };
  },
  computed: {
    currentTable() {
      return this.$route.query.currentTable;
    }
  },
  created() {},

  methods: {
    changeTable(tableName) {
      if (tableName == "首页") {
        this.$router.push({
          //核心语句
          path: "/", //跳转的路径
          query: {
            //路由传参时push和query搭配使用 ，作用时传递参数
          }
        });
      } else {
        this.$router.push({
          //核心语句
          path: "/showMap", //跳转的路径
          query: {
            currentTable: tableName
          }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.test {
  height: 100%;
  box-sizing: border-box;
  #app {
    height: 100%;
    box-sizing: border-box;

    .left {
      position: fixed;
      height: 100%;
      text-align: left;
      width: 280px;
      .el-menu {
        height: 100%;
      }
    }
    .right {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      padding-left: 280px;
      .second-header {
        position: fixed;
        z-index: 9;
        width: 100%;
      }
      .router-view {
        padding-top: 60px;
        height: 100%;
        box-sizing: border-box;
      }
    }
  }
}
</style>
