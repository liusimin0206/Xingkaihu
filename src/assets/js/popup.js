/*添加测试要素*/
//创建查询点
function createPointJ(Lonlat, time, name, ID) {
	// 获取经纬度信息
	var _Lonlat = Lonlat.split(",");

	var coordinates = [ _Lonlat[0], _Lonlat[1] ];
	var features = [];
	features[0] = new ol.Feature(new ol.geom.Point(coordinates));

	var source = new ol.source.Vector({
		features : features
	});
	var vector = new ol.layer.Vector({
		source : source,
		style : new ol.style.Style({
			image : new ol.style.Icon(({
				// 图标缩放比例
				scale : 1,
				// 透明度
				opacity : 0.90,
				// 图标的url
				src : 'img/location.png'
			})),
			text : new ol.style.Text({
				// 位置
				textAlign : 'center',
				// 基准线
				textBaseline : 'ideographic',
				// 文字样式
				font : 'normal 14px 微软雅黑',
				// 文本内容
				text : ID,
				// 文本填充样式（即文字颜色）
				fill : new ol.style.Fill({
					color : '#FFFFFF'
				})
			// stroke: new ol.style.Stroke({ color: '#000000', width: 2 })
			})
		})
	});

	// 将绘制层添加到地图容器中
	map.addLayer(vector);
	var container = document.getElementById('popup');
	var content = document.getElementById('popup-content');
	var closer = document.getElementById('popup-closer');

	popup = new ol.Overlay(
	/** @type {olx.OverlayOptions} */
	({
		// 要转换成overlay的HTML元素
		element : container,
		// 当前窗口可见
		autoPan : true,
		// Popup放置的位置
		positioning : 'bottom-center',
		// 是否应该停止事件传播到地图窗口
		stopEvent : false,
		autoPanAnimation : {
			// 当Popup超出地图边界时，为了Popup全部可见，地图移动的速度
			duration : 250
		}
	}));

	map.addOverlay(popup);

	closer.onclick = function() {
		// 未定义popup位置
		popup.setPosition(undefined);
		// 失去焦点
		closer.blur();
		return false;
	};

	
	/* 搜索图上点标功能 */
	map.addEventListener(
					'click',
					function(evt) {				
						var feature = map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
							 return feature;
						 })
						if (feature==features[0])
						{
							content.innerHTML = '<div class="tdt_info"><div class="tdt_info_top"></div>'
									+ '<div class="tdt_info_con"><div class="tdt_info_t_d"><div class="tdt_i_t"><span class="popup-title"><span>'
									+ name
									+ '</span></span></div>'
									+ '<div class="find_top_con"></li></div></div>'
									+ '<div class="tdt_c_d">时间：'
									+ time
									+ '</div>' + '</div></div>';

							popup.setPosition(evt.coordinate);
							console.log("此处有监测点！！");

						} else {
							console.log("此处无监测点");
						}

					});
  } 