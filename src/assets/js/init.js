
var map = null;
var view = null;
var GoogleRasterLayer=null;
var goTileSatellite=null;
var goTileOverlay=null;
var fromLonLat;//EPSG:32650
//var host="localhost:8080"




function init() {

	//初始化WMTS图层对象
    GoogleRasterLayer = new ol.layer.Tile({
        //设置图层透明度
        source: new ol.source.XYZ({ url: 'http://mt2.google.cn/vt/lyrs=y&hl=zh-CN&gl=CN&src=app&x={x}&y={y}&z={z}&s=G', crossOrigin: 'anonymous' })
    });
    //初始化瓦片地图
    goTileSatellite = new ol.layer.Tile({
    	source: new ol.source.XYZ({
    		url:'http://localhost:8080/XingKaiHu1/map/maptile/satellite/{z}/{x}/{y}.jpg',
    		wrapX: false
    		})
    })
    goTileOverlay = new ol.layer.Tile({
    	source: new ol.source.XYZ({
    		url:'http://localhost:8080/XingKaiHu1/map/maptile/overlay/{z}/{x}/{y}.png',
    		wrapX: false
    		})
    })
   

    view = new ol.View({
        extent: [131.80, 44.94, 133.69, 45.78],
        projection: 'EPSG:4326',
        center: [132.39,44.94],
        zoom: 10,
        minZoom: 9,
        maxZoom: 11
    });

    map = new ol.Map({
        //目标DIV
        target: 'map',
        //添加图层到地图容器中
        layers: [goTileSatellite,goTileOverlay],
        view: view,
        loadTilesWhileAnimating: true,
        controls: ol.control.defaults().extend([
                new ol.control.MousePosition(
                    {
                        target: document.getElementById('mouse-position')
                    }
                ),
                new ol.control.ScaleLine(
                    {
                        target: document.getElementById('scaleline')
                    }
                )
        ])

    });
 
    /*
     * @Time:20191031
     * @Test:Function createPointJ(Lonlat, time, name, ID)
     * @{param}:"132.39,44.94","20190409","当壁镇老区湖浪监测点","HGJC01"
     * */
    //createPointJ("132.39,44.94","20190409","当壁镇老区湖浪监测点","HGJC01");
   

    var menuOverlay = new ol.Overlay((
        {
            //html要素
            element: document.getElementById("contextmenu_container"),
            //当前窗口可见
            autoPan: true,
            //放置位置
            positioning: 'center-center'
        }
    ));
    
  
    //连接并添加点
    connect("%E5%9C%B0%E4%B8%8B%E6%B0%B4%E6%A0%B7%E9%87%87%E9%9B%86%E8%AE%B0%E5%BD%95");



};


