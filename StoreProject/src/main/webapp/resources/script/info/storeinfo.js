/**
 * 
 */



$(document).ready(function(){
	$('#info_header_box').children('a:nth-child(2)').css('font-weight','bold');
	/* 매장 탭 버튼 스크립트 호출 */
	var countryclass = document.getElementsByClassName("storeinfo_Country");
	for (var i=0; i < countryclass.length; i++) {
		countryclass.item(i).onclick = function(e){
			
			storeinfoCountryBtn(e.target);
		};
	}
	
	/* 매장 커버, 탭 콘텐츠 스크립트 함수 호출 */
	storeinfoCoverContent();
	storeinfoTabContent();
});

/* 매장 탭 버튼 스크립트  */
function storeinfoCountryBtn(here){
	if($(here).text()==("스토어 전체")){
		$('#storeinfo_tab_content_box').children('div').css('display','block');
	}else{
		var className = ".storeinfo_tab_content_country_"+$(here).text();
		$('#storeinfo_tab_content_box').children('div').css('display','none');
		$(className).css('display','block');
	}
	$('#storeinfo_tab_box').children('ul').children('li').children('a').css('color', '#9A9A9A');
	$('#storeinfo_tab_box').children('ul').children('li').children('a').css('border-bottom', 'none');
	$(here).css('color', 'black');
	$(here).css('border-bottom','2px solid black');
}
/* 매장 커버 콘텐츠 스크립트 함수 */
function storeinfoCoverContent(){
	var st_NMArray = ["강남 플래그십 스토어", "홍대 플래그십 스토어", "부산 플래그십 스토어", "Apeach Omotesando"];
	$.ajax({
		type:"GET",
		url : "ajax/store/cover",
		data: {'st_NMArray' : st_NMArray},
		success : function(result){
			for(var i=0; i<result.length; i++){
				$('#storeinfo_cover_box').append(
						'<div class="storeinfo_cover_content_country_'+result[i].st_Country+'">'
						+	'<div class="storeinfo_cover_content">'
						+		'<img src="/resources/img/info/storeinfo/store/'+result[i].st_Img+'"/>'
						+		'<div class="storeinfo_cover_content_info">'
						+			'<strong>'+result[i].st_NM+'</strong>'
						+			'<dl>'
						+				'<dt><span><img src="/resources/svg/info/store_clock.svg"></span></dt>'
						+				'<dd>'+result[i].st_Tel+'</dd>'
						+				'<dt><span><img src="/resources/svg/info/store_gps.svg"></span></dt>'
						+				'<dd>'+result[i].st_Open+'</dd>'
						+				'<dt><span><img src="/resources/svg/info/store_phone.svg"></span></dt>'
						+				'<dd>'+result[i].st_Address+'</dd>'
						+			'</dl>'
						+			'<div class="storeinfo_cover_content_map_box" id="map_'+result[i].st_NM+'">'
						+			'</div>'
						+			'<a class ="storeinfo_cover_content_map" href="'+result[i].st_Map_Uri+'" target="_blank">지도 자세히보기</a>'
						+		'</div>'
						+	'</div>'
						+'</div>'
				)
				var mapDivId = "map_"+result[i].st_NM;
				var lat = result[i].st_Lat;
				var lng = result[i].st_Lng;
				
				initMap(mapDivId, lat, lng);
			};
		}, error: function(jqXHR, textStatus, errorThrown) { 
			alert(jqXHR.responseText); 
		}
	});
};

/* 매장 탭 콘텐츠 스크립트 함수 */
function storeinfoTabContent(){
	$.ajax({
		type: "GET", 
		url : "ajax/store/tab", 
		/*data: json,*/
		success : function(result) { 
			for(var i=0; i<result.length; i++){
				$('#storeinfo_tab_content_box').append(
						'<div class="storeinfo_tab_content_country_'+result[i].st_Country+'">'
						+	'<div class="storeinfo_tab_content">'
						+		'<img src="/resources/img/info/storeinfo/store/'+result[i].st_Img+'"/>'
						+		'<div class="storeinfo_tab_content_info">'
						+			'<strong>'+result[i].st_NM+'</strong>'
						+			'<dl>'
						+				'<dt><span><img src="/resources/svg/info/store_clock.svg"></span></dt>'
						+				'<dd>'+result[i].st_Tel+'</dd>'
						+				'<dt><span><img src="/resources/svg/info/store_gps.svg"></span></dt>'
						+				'<dd>'+result[i].st_Open+'</dd>'
						+				'<dt><span><img src="/resources/svg/info/store_phone.svg"></span></dt>'
						+				'<dd>'+result[i].st_Address+'</dd>'
						+			'</dl>'
						+			'<a href="'+result[i].st_Map_Uri+'" target="_blank">지도 자세히 보기</a>'
						+		'</div>'
						+	'</div>'
						+'</div>'
				);
			}
		}, error: function(jqXHR, textStatus, errorThrown) { 
			alert(jqXHR.responseText); 
			} 
		});
};

/* 구글 맵 API 사용을 위한 함수 */
function initMap(mapDivId, lat, lng) {
	if(mapDivId!=null){
	  // The location of Uluru
	  var uluru = {lat: lat, lng: lng};
	  // The map, centered at Uluru
	  var map = new google.maps.Map(
	      document.getElementById(mapDivId), {zoom: 16, center: uluru, mapTypeControl: false, zoomControl: false, streetViewControl: false, fullscreenControl: false});
	  // The marker, positioned at Uluru
	  var marker = new google.maps.Marker({position: uluru, map: map});
	}
}