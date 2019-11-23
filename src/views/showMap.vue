<template>
  <div class="showMap">
    <div id="map">
      <!--弹框-->
      <div id="popup" class="ol-popup-big">
        <a href="#" id="popup-closer" class="ol-popup-closer"></a>
        <div id="popup-content"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Map from "ol/Map";
import View from "ol/View";
import Tile from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";

import { defaults as defaultControls, ScaleLine } from "ol/control";
import MousePosition from "ol/control/MousePosition";
// import ScaleLine from "ol/control/ScaleLine";
import Feature from "ol/Feature";
import Vector from "ol/layer/Vector";
import SourceVector from "ol/source/Vector";
import Style from "ol/style/Style";
import Icon from "ol/style/Icon";
import Text from "ol/style/Text";
import Fill from "ol/style/Fill";

import Point from "ol/geom/Point";
import Overlay from "ol/Overlay";
// import $ from "jquery";
export default {
  name: "showMap",
  components: {},
  data() {
    return {
      map: null,
      view: null,
      GoogleRasterLayer: null,
      goTileSatellite: null,
      goTileOverlay: null,
      fromLonLat: null, //EPSG:32650
      popup: null
    };
  },
  computed: {
    activeTable() {
      return this.$route.query.currentTable;
    }
  },
  mounted() {
    this.init();
    console.log(this.map);
  },
  watch: {
    // 方法1
    $route(to, from) {
      //监听路由是否变化
      if (to.path == "/showMap" && from.path == "/showMap") {
        // location.href =
      }
      //获取文章数据
    }
  },
  methods: {
    init() {
      //初始化WMTS图层对象
      this.GoogleRasterLayer = new Tile({
        //设置图层透明度
        source: new XYZ({
          url:
            "http://mt2.google.cn/vt/lyrs=y&hl=zh-CN&gl=CN&src=app&x={x}&y={y}&z={z}&s=G",
          crossOrigin: "anonymous"
        })
      });
      //初始化瓦片地图
      this.goTileSatellite = new Tile({
        source: new XYZ({
          url:
            "http://localhost:8080/XingKaiHu1/maptile/satellite/{z}/{x}/{y}.jpg",
          wrapX: false
        })
      });
      this.goTileOverlay = new Tile({
        source: new XYZ({
          url:
            "http://localhost:8080/XingKaiHu1/maptile/overlay/{z}/{x}/{y}.png",
          wrapX: false
        })
      });

      this.view = new View({
        extent: [129.8, 43.94, 134.69, 46.78],
        projection: "EPSG:4326",
        center: [132.39, 44.94],
        zoom: 10,
        minZoom: 9,
        maxZoom: 11
      });

      this.map = new Map({
        //目标DIV
        target: "map",
        //添加图层到地图容器中
        layers: [this.goTileSatellite, this.goTileOverlay],
        view: this.view,
        loadTilesWhileAnimating: true,
        controls: defaultControls().extend([
          new MousePosition({
            target: document.getElementById("mouse-position")
          }),
          new ScaleLine({
            target: document.getElementById("scaleline")
          })
        ])
      });

      /*
       * @Time:20191031
       * @Test:Function createPointJ(Lonlat, time, name, ID)
       * @{param}:"132.39,44.94","20190409","当壁镇老区湖浪监测点","HGJC01"
       * */
      //createPointJ("132.39,44.94","20190409","当壁镇老区湖浪监测点","HGJC01");

      // var menuOverlay = new ol.Overlay({
      //   //html要素
      //   element: document.getElementById("contextmenu_container"),
      //   //当前窗口可见
      //   autoPan: true,
      //   //放置位置
      //   positioning: "center-center"
      // });

      //连接并添加点
      this.connect(this.activeTable);
    },
    connect(_table) {
      this.$http({
        method: "get",
        url: `/XingKaiHu1/jsonServlet?tableidjs=${_table}`
      })
        .then(res => {
          let data = res.data;
          let sampleid = [];
          data.forEach(item => {
            var x = this.DegreeConvertBack(item.value.longitude);
            var y = this.DegreeConvertBack(item.value.latitude);
            var lonlat = x + "," + y;
            var time = item.value.time;
            var name = item.value.position;
            var id = item.value.sampleid;
            if (!sampleid.includes(id)) {
              sampleid.push(id);
              this.createPointJ(lonlat, time, name, id);
            }
          });
        })
        .catch(error => console.log(error));
    },

    // $.ajax({
    //   type: "GET",
    //   url:
    //     "http://localhost:8080/XingKaiHu1/jsonServlet?tableidjs=" +
    //     _table +
    //     "",
    //   dataType: "text",
    //   contentType: "application/json",
    //   success: data => {
    //     var json = eval("(" + data + ")");
    //     //console.log(json);
    //     for (var i = 0; i < json.length - 1; i++) {
    //       console.log(json[i].value.longitude);
    //       var x = this.DegreeConvertBack(json[i].value.longitude);
    //       var y = this.DegreeConvertBack(json[i].value.latitude);
    //       var lonlat = x + "," + y;
    //       var time = json[i].value.time;
    //       var name = json[i].value.position;
    //       var id = json[i].value.sampleid;

    //       if ($.inArray(id, sampleid) >= 0) {
    //         console.log("$.inArray(id, sampleid) >= 0");
    //       } else {
    //         sampleid.push(id);
    //         //console.log(lonlat+time);
    //         this.createPointJ(lonlat, time, name, id);
    //       }
    //     }
    //   }
    // });
    // },
    DegreeConvertBack(value) {
      var du = value.split("°")[0];
      // console.log(du);
      var fen = value.split("°")[1].split("′")[0];
      var miao = value
        .split("°")[1]
        .split("′")[1]
        .split("″")[0];
      //console.log(Math.abs(du) + (Math.abs(fen)/60 + Math.abs(miao)/3600));
      return Math.abs(du) + (Math.abs(fen) / 60 + Math.abs(miao) / 3600);
    },
    createPointJ(Lonlat, time, name, ID) {
      // 获取经纬度信息
      var _Lonlat = Lonlat.split(",");

      var coordinates = [_Lonlat[0], _Lonlat[1]];
      var features = [];
      features[0] = new Feature(new Point(coordinates));

      var source = new SourceVector({
        features: features
      });
      var vector = new Vector({
        source: source,
        style: new Style({
          image: new Icon({
            // 图标缩放比例
            scale: 1,
            // 透明度
            opacity: 0.9,
            // 图标的url
            src: require("../assets/img/location.png")
          }),
          text: new Text({
            // 位置
            textAlign: "center",
            // 基准线
            textBaseline: "ideographic",
            // 文字样式
            font: "normal 14px 微软雅黑",
            // 文本内容
            text: ID,
            // 文本填充样式（即文字颜色）
            fill: new Fill({
              color: "#FFFFFF"
            })
            // stroke: new ol.style.Stroke({ color: '#000000', width: 2 })
          })
        })
      });

      // 将绘制层添加到地图容器中
      this.map.addLayer(vector);
      var container = document.getElementById("popup");
      var content = document.getElementById("popup-content");
      var closer = document.getElementById("popup-closer");

      this.popup = new Overlay(
        /** @type {olx.OverlayOptions} */
        ({
          // 要转换成overlay的HTML元素
          element: container,
          // 当前窗口可见
          autoPan: true,
          // Popup放置的位置
          positioning: "bottom-center",
          // 是否应该停止事件传播到地图窗口
          stopEvent: false,
          autoPanAnimation: {
            // 当Popup超出地图边界时，为了Popup全部可见，地图移动的速度
            duration: 250
          }
        })
      );

      this.map.addOverlay(this.popup);

      closer.onclick = function() {
        // 未定义popup位置
        this.popup.setPosition(undefined);
        // 失去焦点
        closer.blur();
        return false;
      };

      /* 搜索图上点标功能 */
      this.map.addEventListener("click", evt => {
        var feature = this.map.forEachFeatureAtPixel(evt.pixel, function(
          feature
          // layer
        ) {
          return feature;
        });
        if (feature == features[0]) {
          content.innerHTML =
            '<div class="tdt_info"><div class="tdt_info_top"></div>' +
            '<div class="tdt_info_con"><div class="tdt_info_t_d"><div class="tdt_i_t"><span class="popup-title"><span>' +
            name +
            "</span></span></div>" +
            '<div class="find_top_con"></li></div></div>' +
            '<div class="tdt_c_d">时间：' +
            time +
            "</div>" +
            "</div></div>";

          this.popup.setPosition(evt.coordinate);
          console.log("此处有监测点！！");
        } else {
          console.log("此处无监测点");
        }
      });
    }
  }
};
</script>
<style scoped>
@import "../assets/css/style.css";
@import "../assets/ol/ol.css";
.showMap {
  box-sizing: border-box;
  width: 100%;
  /* padding-top: -60px; */
  height: 100%;
  /* margin-top: -60px; */
  padding-top: 60px;
}
#map {
  height: 100%;
}
</style>
