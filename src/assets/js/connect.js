//tableidjs=地下水采样记录&bottleidjs=DXSDC01-91&timejs=20180710
function connect(_table) {
	var sampleid=new Array();
	
	$.ajax({
		type : "GET",
		url : "http://localhost:8080/XingKaiHu1/jsonServlet?tableidjs="+_table+"",
		dataType : "text",
		contentType : "application/json",
		success : function(data) {
			var json = eval("(" + data + ")");
			//console.log(json);
			for(var i=0;i<json.length-1;i++){
				
				var x=DegreeConvertBack(json[i].value.longitude);
				var y=DegreeConvertBack(json[i].value.latitude);
				var lonlat=x+","+y;
				var time=json[i].value.time;
				var name=json[i].value.position;
				var id=json[i].value.sampleid;
				
				if($.inArray(id,sampleid)>=0){
					
				}else{
					sampleid.push(id);
					//console.log(lonlat+time);
					createPointJ(lonlat,time,name,id);
				}
				
			}
			
		}
	})
}

//度分秒转度
function DegreeConvertBack(value)
{ 
    var du = value.split("°")[0];
    console.log(du);
    var fen = value.split("°")[1].split("′")[0];
    var miao = value.split("°")[1].split("′")[1].split('″')[0];
//console.log(Math.abs(du) + (Math.abs(fen)/60 + Math.abs(miao)/3600));
    return Math.abs(du) + (Math.abs(fen)/60 + Math.abs(miao)/3600);
}