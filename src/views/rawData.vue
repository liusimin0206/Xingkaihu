<template>
  <div>
    rawData+ {{ activeTable }}
    <div>
      <viewer :images="urls" class="rawDataView">
        <div class="rawDataViewDiv" v-for="(src, index) in urls" :key="index">
          <img class="rawDataImage" :src="src" :onerror="errorImg" />
          <p>编号：{{ src.split("/")[4] }}</p>
        </div>
      </viewer>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      urls: [],
      AllOriginalFileNames: [
        {
          MonitoringCategory: "地下水体监测",
          FolderLocation: "undergroundwater",
          Content: [
            {
              MonitoringContent: "地下水样采集记录",
              FolderLocation: "underground_water_sampling",
              QueryField: "样品编号"
            },
            {
              MonitoringContent: "地下水动态监测调查记录",
              FolderLocation: "undergroundwater_dynamic_monitoring",
              QueryField: "野外编号"
            },
            {
              MonitoringContent: "机（民）井动态监测调查记录",
              FolderLocation: "machinewell_dynamicmonitoring",
              QueryField: "野外编号"
            },
            {
              MonitoringContent: "机（民）井调查记录",
              FolderLocation: "machinewellsurvey",
              QueryField: "野外编号"
            }
          ]
        },
        {
          MonitoringCategory: "地表水体监测",
          FolderLocation: "surfacewater",
          Content: [
            {
              MonitoringContent: "地表水动态监测调查",
              FolderLocation: "surfacewater_dynamic_monitoring",
              QueryField: "野外编号"
            },
            {
              MonitoringContent: "地表水野外调查",
              FolderLocation: "surfacewater_field_survey",
              QueryField: "野外编号"
            },
            {
              MonitoringContent: "河流湖泊监测断面信息",
              FolderLocation: "river_lake_monitoring_section",
              QueryField: "野外编号"
            },
            {
              MonitoringContent: "水样采集记录",
              FolderLocation: "surfacewater_sampling",
              QueryField: "样品编号"
            }
          ]
        },
        {
          MonitoringCategory: "湖岗地质遗迹监测",
          FolderLocation: "lake",
          Content: [
            {
              MonitoringContent: "湖岗动态侵蚀监测记录",
              FolderLocation: "lakegang_dynamic_erosion_monitoring",
              QueryField: "监测点号"
            },
            {
              MonitoringContent: "风蚀口调查",
              FolderLocation: "winderosion_survey",
              QueryField: "野外编号"
            },
            {
              MonitoringContent: "风蚀检测记录表（插钎法）一",
              FolderLocation: "winderosion_detection1",
              QueryField: "样地编号"
            },
            {
              MonitoringContent: "湖浪监测",
              FolderLocation: "lakewave_monitoring",
              QueryField: "监测点号"
            },
            {
              MonitoringContent: "河湖库塌岸调查",
              FolderLocation: "collapse_survey",
              QueryField: "野外编号"
            }
          ]
        },
        {
          MonitoringCategory: "土壤环境调查",
          FolderLocation: "soil",
          Content: [
            {
              MonitoringContent: "土壤调查坐标",
              FolderLocation: "soil_survey_coordinates",
              QueryField: "此类数据为总数据集，直接显示.."
            },
            {
              MonitoringContent: "土壤现场取样记录",
              FolderLocation: "soil_samping",
              QueryField: "样品编号"
            }
          ]
        },
        {
          MonitoringCategory: "人为环境因素调查",
          FolderLocation: "humanfactors",
          Content: [
            {
              MonitoringContent: "地质地貌条件调查验证记录",
              FolderLocation: "geological_geomorphic_survey",
              QueryField: "野外编号"
            },
            {
              MonitoringContent: "点状污染源调查记录",
              FolderLocation: "point_pollution_survey",
              QueryField: "野外编号"
            },
            {
              MonitoringContent: "废水污染源（污水排放口）调查记录",
              FolderLocation: "wastewater_pollution_survey",
              QueryField: "野外编号"
            },
            {
              MonitoringContent: "固体污染源调查记录",
              FolderLocation: "solid_pollution_survey",
              QueryField: "野外编号"
            },
            {
              MonitoringContent: "旅游资源调查",
              FolderLocation: "tourism_resource_survey",
              QueryField: "野外编号"
            },
            {
              MonitoringContent: "农药化肥施用情况调查",
              FolderLocation: "pesticide_fertilizer_survey",
              QueryField: "野外编号"
            }
          ]
        }
      ],
      errorImg: "加载错误"
    };
  },
  computed: {
    activeTable() {
      return this.$route.query.currentTable;
    },
    activeTableToEn() {
      let activeTableToEn = "";
      this.AllOriginalFileNames.forEach(AllOriginalFileName => {
        AllOriginalFileName.Content.forEach(content => {
          if (content.MonitoringContent == this.activeTable) {
            activeTableToEn = content.FolderLocation;
          }
        });
      });
      return activeTableToEn;
    }
  },
  mounted() {
    this.getPicPath();
  },
  methods: {
    getPicPath() {
      let tbPicUrl = "/XingKaiHu1/OriginalFile?folder=" + this.activeTableToEn;
      this.$http.get(tbPicUrl).then(res => {
        this.urls = [];
        res.data.forEach(element => {
          this.urls.push(
            "/XingKaiHu1/originalpaper/" + this.activeTableToEn + "/" + element
          );
        });
      });
    }
  }
};
</script>

<style scoped lang="scss">
.rawDataView {
  display: flex;
  flex-wrap: wrap;
  .rawDataViewDiv {
    text-align: center;
    .rawDataImage {
      width: 300px;

      margin: 10px;
    }
  }
}
</style>
