<template>
  <div class="showMap">
    <div id="map"></div>
    <MapInfo
      :mapTableData="tableData"
      :maptabelHeader="tabelHeader"
      :mapdataview="mapdataview"
      @mapSearch="mapSearch"
      @closeDataView="closeDataView"
    ></MapInfo>
  </div>
</template>

<script>
import MapInfo from "./MapInfo";
export default {
  name: "showMap",
  components: {
    MapInfo
  },
  data() {
    return {
      map: null, // leaflet map对象
      baseMap: {}, // google底图
      overLayer: {}, // 覆盖涂层 道路 地名
      points: [], // 点数据信息
      pointsLayer: {}, // 点图层
      isTableVisible: false,
      tableData: [],
      defaultresult: "正在加载",
      tabelHeader: [],
      params: {},
      mapdataview: false
    };
  },
  computed: {
    activeTable() {
      return this.$route.query.currentTable;
    }
  },
  mounted() {
    this.initLeaflet();
    this.getPoints();
    this.getTableHeader();
  },
  watch: {
    activeTable() {
      this.map.removeLayer(this.pointsLayer);
      this.points = [];
      this.pointsLayer = {};
      this.getPoints();
      this.getTableHeader();
    }
  },
  methods: {
    initLeaflet() {
      // 底图初始化 设置一些参数
      this.map = this.$L.map("map", {
        maxBounds: this.$L.latLngBounds([43.94, 129.8], [46.78, 134.69]), // 地图显示范围
        zoom: 9,
        center: [45.2, 132.39],
        maxZoom: 10,
        minZoom: 9
      });
      // 添加底图服务
      this.baseMap = this.$L.tileLayer(
        "/XingKaiHu1/maptile/satellite/{z}/{x}/{y}.jpg"
      );
      this.map.addLayer(this.baseMap);
      // 添加覆盖图层
      this.overLayer = this.$L.tileLayer(
        "/XingKaiHu1/maptile/overlay/{z}/{x}/{y}.png"
      );
      this.map.addLayer(this.overLayer);
    },
    getPoints() {
      this.$http({
        method: "get",
        url: `/XingKaiHu1/mapServlet?tableidjs=${this.activeTable}`
      })
        .then(res => {
          // 去重 后端返回的点是根据bottleid获取的 但是前端显示上会有重叠 用sampleid做一下去重
          let pointsId = [];
          res.data.forEach(item => {
            if (!pointsId.includes(item.value.pointname)) {
              pointsId.push(item.value.pointname);
              this.points.push(item);
            }
          });
          this.addPoints();
        })
        .catch(error => console.log(error));
    },
    addPoints() {
      let pointsMarkers = [];
      this.points.forEach(point => {
        console.log(point.value.latitude);
        let lng = this.DegreeConvertBack(point.value.longitude);
        let lat = this.DegreeConvertBack(point.value.latitude);
        let myIcon = this.$L.divIcon({
          iconSize: [23, 32],
          html: `<div class="point-title">${point.value.pointname}</div>`,
          className: "point-icon"
        });
        let marker = this.$L.marker([lat, lng], {
          icon: myIcon
        });
        // .bindPopup(`This is ${point.value.name}, CO`);
        marker.on("click", () => {
          this.params.样品编号 = point.value.pointname;
          this.queryData();
        });
        pointsMarkers.push(marker);
      });
      this.pointsLayer = this.$L.layerGroup(pointsMarkers);
      this.map.addLayer(this.pointsLayer);
    },
    DegreeConvertBack(value) {
      var du = value.split("°")[0];
      var fen = value.split("°")[1].split("′")[0];
      var miao = value
        .split("°")[1]
        .split("′")[1]
        .split("″")[0];
      return Math.abs(du) + (Math.abs(fen) / 60 + Math.abs(miao) / 3600);
    },
    getTableHeader() {
      let tbHeadUrl = "/XingKaiHu1/TbHeadServlet?tableidjs=" + this.activeTable;
      this.$http.get(tbHeadUrl).then(res => {
        this.tabelHeader = res.data;
      });
    },
    queryData() {
      this.params.tableidjs = this.activeTable;
      console.log(this.params);
      this.$http
        .get("/XingKaiHu1/jsonServlet", { params: this.params })
        .then(res => {
          this.tableData = [];
          let arr = res.data;
          for (let i = 0; i < arr.length; i++) {
            this.tableData.push(arr[i].value);
          }
          console.log(this.tableData);
          this.mapdataview = true;
          this.params = {};
        });
    },
    mapSearch(params) {
      this.params = params;
      this.queryData();
    },
    closeDataView() {
      this.mapdataview = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.showMap {
  #map {
    height: 100%;
    position: relative;
    &::v-deep .point-icon {
      background: url("../../assets/img/location.png") no-repeat;
      .point-title {
        font-size: 10px;
        height: 10px;
        line-height: 10px;
        white-space: nowrap;
        color: #fff;
        position: relative;
        min-width: 50px;
        margin-left: 50%;
        margin-top: 50%;
        transform: translateX(-50%) translateY(-50%);
      }
    }
  }
  .map-info {
    position: absolute;
    right: 0;
    top: 80px;
    z-index: 400;
  }
}
</style>
