window.onload = function(){
	//앵커가 있는 상태로 리스트 페이지 호출 시
	if(document.location.hash){
		setTimeout(function (){
			window.scrollTo(0, sessionStorage.getItem('list_scroll'));
    	}, 100);
		setTimeout(function (){
			history.pushState(null, null, "/list");
		}, 100);
	}else{
		//앵커 없이 리스트 페이지 호출 시
	}
	sessionStorage.removeItem("categoryM");
	sessionStorage.removeItem("categoryS");
	sessionStorage.removeItem("option");
}

$(document).ready(function(){
	changeOptionBox();
	
	if(location.hash){
		//뒤로가기로 불러와서 해시가 있을 경우
		
		//세션 스토리지에 불러왔던 제품 개수를 가지고 제품을 각 항목 별로 불러온다.
		selectHashCategoryImg();
		selecthashlist();
		checkcolumn();	//하위메뉴 생성
		listcount();

	}else{
		//페이지를 새로 불러오거나 해시가 없는 경우 값 초기화
		sessionStorage.setItem("list_count", 0); //불러온 제품 개수
		sessionStorage.setItem("hash_column", sessionStorage.getItem('categoryM'));	//해시 처리때 세부 카테고리 이미지 없을경우 필요
		
		if(sessionStorage.getItem('categoryS')!=null){
			//세부 카테고리로 넘어왔을 경우
			var sub = sessionStorage.getItem('categoryS');
			var main = sessionStorage.getItem('categoryM');
			selectSubCategoryImg(main, sub);	//세부 카테고리 이미지를 가져온다.	없을 경우를 대비하여 메인 카테고리 컬럼 명도 같이 넘겨준다.
			sessionStorage.setItem("list_column", sub); //불러온 카테고리 항목
		}else if(sessionStorage.getItem('categoryM')!=null){
			//메인 카테고리로 넘어 왔을 경우
			var main = sessionStorage.getItem('categoryM');
			selectMainCategoryImg(main);	//메인 카테고리 이미지를 가져온다.
			sessionStorage.setItem("list_column", main); //불러온 카테고리 항목
		}else{
			//새로고침 혹은 url 복사 등으로 넘어 왔을 경우
			//선택한 메인카테고리 서브카테고리로 새로고침을 해야하지만 조건이 많아져서 보류 전체로 넘어가게 한다.
			selectMainCategoryImg("all");
			sessionStorage.setItem("list_column", "all"); //불러온 카테고리 항목
			$('#list_menu_box').remove();
		}
		
		if(sessionStorage.getItem('option')!=null){	//옵션 선택으로 리스트 페이지 호출 시
			sessionStorage.setItem("list_select", [sessionStorage.getItem('option'), "all"]);
		}else{
			sessionStorage.setItem("list_select", ["new", "all"]);
		}
		sessionStorage.setItem("list_scroll", 0); //스크롤 위치
		
		selectlist();
		checkcolumn();	//하위메뉴 생성
		listcount();
	}
});

$(window).scroll(function(){
	clearTimeout(timeout);  //이전 휠 이벤트 제거
    listScrollEffect(40);	//50퍼센트 이하로 스크롤이 내려가면 작동
});

/* --------------------------------------------------------- */
/* 전역 변수 */
var timeout;	//스크롤 이벤트 변수
/* --------------------------------------------------------- */

function changeOptionBox(){
	var option = sessionStorage.getItem('option');
	
	if(option=="sales"){
		$('#option_btn').html("판매량순");
		$('#list_option_box').children('button').siblings('button').removeAttr('disabled');
		$('#list_option_box').children('button:nth-child(1)').attr('disabled', 'disabled');
		$('#list_option').attr('value', option);	//판매량순 ~ 높은가격순 선택한 항목으로 기본 값을 바꾼다.
	}else if(option=="new"){
		$('#option_btn').html("신상품순");
		$('#list_option_box').children('button').siblings('button').removeAttr('disabled');
		$('#list_option_box').children('button:nth-child(2)').attr('disabled', 'disabled');
		$('#list_option').attr('value', option);	//판매량순 ~ 높은가격순 선택한 항목으로 기본 값을 바꾼다.
	}else if(option=="low"){
		$('#option_btn').html("낮은 가격순");
		$('#list_option_box').children('button').siblings('button').removeAttr('disabled');
		$('#list_option_box').children('button:nth-child(3)').attr('disabled', 'disabled');
		$('#list_option').attr('value', option);	//판매량순 ~ 높은가격순 선택한 항목으로 기본 값을 바꾼다.
	}else if(option=="high"){
		$('#option_btn').html("높은 가격순");
		$('#list_option_box').children('button').siblings('button').removeAttr('disabled');
		$('#list_option_box').children('button:nth-child(4)').attr('disabled', 'disabled');
		$('#list_option').attr('value', option);	//판매량순 ~ 높은가격순 선택한 항목으로 기본 값을 바꾼다.
	}else{
		$('#list_option').attr('value', "new");	//판매량순 ~ 높은가격순 선택한 항목으로 기본 값을 바꾼다.
	}
}
function changeCharaterBox(){
	
}
function checkcolumn(){
	if(sessionStorage.getItem("list_column")=="all"){
		//메인 카테고리 전체로 넘어 왔을경우 하위 메뉴 없음
	}else{
		//메인 카테고리가 전체를 제외한 항목으로 넘어 왔을 경우 하위 메뉴 생성
		var column = sessionStorage.getItem("categoryM");
		if(column!=null){
			createSubCategoryMenu(column);
		}else{
			createSubCategoryMenu(sessionStorage.getItem("hash_column"));
		}
		
		//선택한 항목과 동일한 하위메뉴에 버튼 이펙트 주기
		var val = sessionStorage.getItem("list_column");
		$('.list_menu_btn').css('border-bottom', '1px solid #cccccc');
		$('.list_menu_btn').css('color', 'rgb(154, 154, 158)');
		$('.list_menu_btn[value="'+val+'"]').css('border-bottom', '1px solid black');
		$('.list_menu_btn[value="'+val+'"]').css('color', 'black');
	}
}




/* ----------------------------------------------------------- */
function openoptionbox(){
	var status = $('#list_option_box').css('display');
	$('#list_charater_box').css('display','none');
	if(status=='block'){
		$('#list_option_box').css('display','none');
	}else{
		$('#list_option_box').css('display','block');
	}
}
function opencharaterbox(){
	var status = $('#list_charater_box').css('display');
	$('#list_option_box').css('display','none');
	if(status=='block'){
		$('#list_charater_box').css('display','none');
	}else{
		$('#list_charater_box').css('display','block');
	}
	
}


//전체메뉴 셀렉트 옵션 박스 선택시 작동할 함수
function changeOption(here){
	$(here).siblings('button').removeAttr('disabled');
	$(here).attr('disabled', 'disabled');
	$('#list_option_box').css('display','none');
	$('#option_btn').html($(here).html());
	$('#list_option').attr("value", $(here).attr("value"));
	
	sessionStorage.setItem("list_select", [$('#list_option').attr("value"), $('#list_charater').attr('value')]);
	sessionStorage.setItem("list_count", 0);
	$('#list_select_box').empty();
	selectlist();
	listcount();
}
//전체메뉴 셀렉트 캐릭터 박스 선택시 작동할 함수
function changeCharater(here){
	$(here).siblings('button').removeAttr('disabled');
	$(here).attr('disabled', 'disabled');
	$('#list_charater_box').css('display','none');
	$('#charater_btn').html($(here).children('span').html());
	$('#list_charater').attr("value", $(here).attr("value"));
	
	sessionStorage.setItem("list_select", [$('#list_option').attr("value"), $('#list_charater').attr('value')]);
	sessionStorage.setItem("list_count", 0);
	$('#list_select_box').empty();
	selectlist();
	listcount();
}

//조회한 목록의 총 개수
function listcount(){
	var arr = sessionStorage.getItem("list_select").split(",");
	var charater = arr[1];
	var column = sessionStorage.getItem("list_column");
	/*console.log(charater+option);*/
	alldata = { "charater" : charater, "column" : column};
	$.ajax({
		type:"get",
		url:"list/count",
		data:alldata,
		success:function(result){
			$('#serch_count').html(result);
		},error:function(jqXHR, textStatus, errorThrown){
		
		}
	})
}
function selectlist(){
	var arr = sessionStorage.getItem("list_select").split(",");
	var charater = arr[1];
	var option = arr[0];
	var column = sessionStorage.getItem("list_column");
	
	if(sessionStorage.getItem("option")==null){	
		//헤더 카테고리 옵션 항목으로 넘어온 경우가 아닌 경우 - 옵션 박스 혹은 캐릭터 박스 선택시
		if(option==arr[0] && charater==arr[1]){
		//이전 선택 항목이 겹칠 경우는 처리없이 패스
		}else{
			//이전 선택 항목과 틀릴 경우 처리
			var arr = [option, charater];
			sessionStorage.setItem("list_count", 0);
			sessionStorage.setItem("list_select", arr);
			
		}
	}else{											
		//헤더 카테고리 옵션 항목으로 넘어온 경우
		sessionStorage.setItem("list_count", 0);
	}
	/*console.log(charater+option);*/
	alldata = { "count" : sessionStorage.getItem("list_count"), "charater" : charater, "option" : option, "column" : column };
	$.ajax({
		type:"get",
		url:"/list/option",
		data:alldata,
		success:function(result){
			if(result!=null){
				//가져온 상품 정보가 있으면 불러온 마지막 상품번호를 세션 카운트에 더한다.
				sessionStorage.setItem("list_count", Number(sessionStorage.getItem("list_count"))+(result.length));
				$('#serch_count').html(result.length);
			}else{
				//가져온 내용이 없으면 세션 카운터를 올리지 않는다.
				$('#serch_count').html(0);
			}
			for(var i=0; i<result.length; i++){
				var price = listReplacePrice(result[i].pds_Price);
				var pds_image_name = result[i].pds_Image.split(",");
				/*alert(pds_image_name[0]);*/
				$('#list_select_box').append(
					"<div class='list_contents_div'>"
					+"<a class='list_a_tag' id='all_"+result[i].pds_NO+"' name='"+result[i].pds_NO+"' onclick='listinserthash(this)'>"
					+	"<span class='img_cover'></span>"
					+	"<span>"
					+		"<img class='contents_image' src='/resources/upload/products/images/"+result[i].pds_Reg_Date+"/"+result[i].pds_NO+"/"+pds_image_name[0]+"' />"
					+	"</span>"
					+	"<p class='mini_name'>"+result[i].pds_NM+"</p>"
					+	"<p class='mini_price'>"+price+"원</p>"
					+"</a>"
					+"</div>"
				);
				// 세일이 있을 경우 처리
				if(result[i].pds_Sale != 0){
					var sale = listReplacePrice(result[i].pds_Sale);
					var percent = Math.ceil( result[i].pds_Sale / (result[i].pds_Price / 100) );
					$('#all_'+result[i].pds_NO).children('p:nth-child(3)').after(
						'<p class="mini_percent">'+percent+'%</p>'
					);
					$('#all_'+result[i].pds_NO).children('p:nth-child(4)').after(
						'<p class="mini_sale">'+sale+'원</p>'
					);
					$('.list_a_tag').children('p:nth-child(6)').css('text-decoration','line-through');
					$('.list_a_tag').children('p:nth-child(6)').css('color', 'rgb(154, 154, 158)');
				}
				/*alert(result[i].pds_Reg_Date);*/
				
			}
		},error:function(jqXHR, textStatus, errorThrown){
			
		}
	});

}
//전체메뉴 셀렉트 옵션 박스 선택시 작동할 함수
function listScroll(here){
	var arr = sessionStorage.getItem("list_select").split(",");
	var charater =arr[1];
	var option = arr[0];
	var column = sessionStorage.getItem("list_column");
	
	/*console.log(charater+option);*/
	alldata = { "count" : sessionStorage.getItem("list_count"), "charater" : charater, "option" : option, "column" : column };
	$.ajax({
		type:"get",
		url:"/list/option",
		data:alldata,
		success:function(result){
			if(result!=null){
				//가져온 상품 정보가 있으면 불러온 마지막 상품번호를 세션 카운트에 더한다.
				sessionStorage.setItem("list_count", Number(sessionStorage.getItem("list_count"))+(result.length));
				
			}else{
				//가져온 내용이 없으면 세션 카운터를 올리지 않는다.
			}
			for(var i=0; i<result.length; i++){
				var price = listReplacePrice(result[i].pds_Price);
				var pds_image_name = result[i].pds_Image.split(",");
				/*alert(pds_image_name[0]);*/
				$('#list_select_box').append(
					"<div class='list_contents_div'>"
					+"<a class='list_a_tag' id='all_"+result[i].pds_NO+"' name='"+result[i].pds_NO+"' onclick='listinserthash(this)'>"
					+	"<span class='img_cover'></span>"
					+	"<span>"
					+		"<img class='contents_image' src='/resources/upload/products/images/"+result[i].pds_Reg_Date+"/"+result[i].pds_NO+"/"+pds_image_name[0]+"' />"
					+	"</span>"
					+	"<p class='mini_name'>"+result[i].pds_NM+"</p>"
					+	"<p class='mini_price'>"+price+"원</p>"
					+"</a>"
					+"</div>"
				);
				// 세일이 있을 경우 처리
				if(result[i].pds_Sale != 0){
					var sale = listReplacePrice(result[i].pds_Sale);
					var percent = Math.ceil( result[i].pds_Sale / (result[i].pds_Price / 100) );
					$('#all_'+result[i].pds_NO).children('p:nth-child(3)').after(
						'<p class="mini_percent">'+percent+'%</p>'
					);
					$('#all_'+result[i].pds_NO).children('p:nth-child(4)').after(
						'<p class="mini_sale">'+sale+'원</p>'
					);
					$('.list_a_tag').children('p:nth-child(6)').css('text-decoration','line-through');
					$('.list_a_tag').children('p:nth-child(6)').css('color', 'rgb(154, 154, 158)');
				}
				/*alert(result[i].pds_Reg_Date);*/
			}
		},error:function(jqXHR, textStatus, errorThrown){
			
		}
	});
}

//가격 편집
function listReplacePrice(here){
	var str = here.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	return str;
}

//해시
function listinserthash(here){
	var no = $(here).attr('name');
	var contents_name = $(here).attr('id');
	var str_hash = "#" + contents_name;
	window.location.hash = str_hash;
	location.href = "/view?NO="+no;
}

//스크롤 이펙트
function listScrollEffect(standard){
    timeout = setTimeout(function(){ //다시 휠 이벤트 발생  0.1초후
		var percent = Math.floor(($(window).scrollTop() / ($(document).height() - $(window).height())) * 100);
		var scroll = $(window).scrollTop();
		
		sessionStorage.setItem("list_scroll", scroll)
		if( percent >= standard){
			listScroll();
		}
			
    }, 200);
};


//카테고리 이미지 파일명 가져오기	단일
function selectMainCategoryImg(here){
	alldata = {"columnNM" : here};
	$.ajax({
		type:"get",
		url:"/list/maincategory/img",
		data:alldata,
		success:function(result){
			$('#list_banner_Img').css('background-image', 'url("/resources/upload/category/'+result+'")');
			$('input[name='+here+']').css('border-bottom', '1px solid black');
			$('input[name='+here+']').css('color', 'black');
		},error:function(jqXHR, textStatus, errorThrown){
			
		}
	})	
}
//카테고리 이미지 파일명 가져오기	복수		//세부 카테고리 이미지가 없을 경우
function selectSubCategoryImg(main, sub){
	alldata = {"maincolumnNM" : main, "subcolumnNM" : sub};
	$.ajax({
		type:"get",
		url:"/list/subcategory/img",
		data:alldata,
		success:function(result){
			$('#list_banner_Img').css('background-image', 'url("/resources/upload/category/'+result+'")');	

		},error:function(jqXHR, textStatus, errorThrown){
			
		}
	})	
}

//선택한 메인 카테고리의 세부 카테고리 메뉴 만들기
function createSubCategoryMenu(here){
	var sel_column = sessionStorage.getItem("list_column");
	
	$('#list_menu').append(
		'<input type="button" name="'+here+'" class="list_menu_btn" onclick="changeListMenu(this)" value="전체">'
	);
	alldata = {"columnNM" : here};	//메인 카테고리 기준
	$.ajax({
		type:"get",
		url:"/list/select/subcategory",
		data:alldata,
		success:function(result){
			for(var i=0; i<result.length; i++){
				$('#list_menu').append(
					'<input type="button" name="'+result[i].sub_column_NM+'" class="list_menu_btn" onclick="changeListMenu(this)" value="'+result[i].sub_category_NM+'">'
				);
			}
			$('#list_menu').children('button:nth-child(1)').css('border-bottom', '1px solid black');
			$('#list_menu').children('button:nth-child(1)').css('color', 'black');
			
			$("#list_banner_NM").html($('input[name='+sel_column+']').val());
			$('input[name='+sel_column+']').css('border-bottom', '1px solid black');
			$('input[name='+sel_column+']').css('color', 'black');
		},error:function(jqXHR, textStatus, errorThrown){
			
		}
	})	
}

function changeListMenu(here){
	var columnNM = $(here).attr('name');
	var str = $(here).val();
	sessionStorage.setItem("list_column", columnNM);
	
	alldata = {"columnNM" : columnNM};
	$.ajax({
		type:"get",
		url:"/list/maincategory/img",
		data:alldata,
		success:function(result){
			if(result!=""){	//값이 null이 아닌 공백으로 넘어온다.
				$('#list_banner_Img').css('background-image', 'url("/resources/upload/category/'+result+'")');
			}else{
				//선택한 세부 카테고리 이미지가 없으면 이미지 교체없이 그대로 둔다.
			}
			$('#list_banner_NM').html(str);
		},error:function(jqXHR, textStatus, errorThrown){
			
		}
	})
	$('.list_menu_btn').css('border-bottom', '1px solid #cccccc');
	$('.list_menu_btn').css('color', 'rgb(154, 154, 158)');
	$(here).css('border-bottom', '1px solid black');
	$(here).css('color', 'black');
	
	sessionStorage.setItem("list_count", 0);
	$('#list_select_box').empty();
	selectlist();	//세부카테고리 메뉴로 제품 목록 변견 시
}


//----------------------------------------------------------------------------------------------------------/
//해시 제품 불러오기
function selecthashlist(){
	var arr = sessionStorage.getItem("list_select").split(",");
	var charater = arr[1];
	var option = arr[0];
	var column = sessionStorage.getItem("list_column");
	
	$('#list_option_box').children('button[value='+option+']').siblings('button').removeAttr('disabled');
	$('#list_option_box').children('button[value='+option+']').attr('disabled', 'disabled');
	$('#list_charater_box').children('button[value='+charater+']').siblings('button').removeAttr('disabled');
	$('#list_charater_box').children('button[value='+charater+']').attr('disabled', 'disabled');
	$('#option_btn').html($('#list_option_box').children('button[value='+option+']').html());
	$('#list_option').attr("value", $('#list_option_box').children('button[value='+option+']').attr("value"));
	$('#charater_btn').html($('#list_charater_box').children('button[value='+charater+']').children('span').html());
	$('#list_charater').attr("value", $('#list_charater_box').children('button[value='+charater+']').attr("value"));
	
	/*console.log(charater+option);*/
	alldata = { "count" : sessionStorage.getItem("list_count"), "charater" : charater, "option" : option, "column" : column };
	$.ajax({
		type:"get",
		url:"/list/hash",
		data:alldata,
		success:function(result){
			if(result!=null){
				//가져온 상품 정보가 있으면 불러온 마지막 상품번호를 세션 카운트에 더한다.
				sessionStorage.setItem("list_count", Number(sessionStorage.getItem("list_count"))+(result.length));
				
			}else{
				//가져온 내용이 없으면 세션 카운터를 올리지 않는다.
			}
			for(var i=0; i<result.length; i++){
				var price = listReplacePrice(result[i].pds_Price);
				var pds_image_name = result[i].pds_Image.split(",");
				/*alert(pds_image_name[0]);*/
				$('#list_select_box').append(
					"<div class='list_contents_div'>"
					+"<a class='list_a_tag' id='all_"+result[i].pds_NO+"' name='"+result[i].pds_NO+"' onclick='listinserthash(this)'>"
					+	"<span class='img_cover'></span>"
					+	"<span>"
					+		"<img class='contents_image' src='/resources/upload/products/images/"+result[i].pds_Reg_Date+"/"+result[i].pds_NO+"/"+pds_image_name[0]+"' />"
					+	"</span>"
					+	"<p class='mini_name'>"+result[i].pds_NM+"</p>"
					+	"<p class='mini_price'>"+price+"원</p>"
					+"</a>"
					+"</div>"
				);
				// 세일이 있을 경우 처리
				if(result[i].pds_Sale != 0){
					var sale = listReplacePrice(result[i].pds_Sale);
					var percent = Math.ceil( result[i].pds_Sale / (result[i].pds_Price / 100) );
					$('#all_'+result[i].pds_NO).children('p:nth-child(3)').after(
						'<p class="mini_percent">'+percent+'%</p>'
					);
					$('#all_'+result[i].pds_NO).children('p:nth-child(4)').after(
						'<p class="mini_sale">'+sale+'원</p>'
					);
					$('.list_a_tag').children('p:nth-child(6)').css('text-decoration','line-through');
					$('.list_a_tag').children('p:nth-child(6)').css('color', 'rgb(154, 154, 158)');
				}
				/*alert(result[i].pds_Reg_Date);*/
			}
		},error:function(jqXHR, textStatus, errorThrown){
			
		}
	});
}

function selectHashCategoryImg(){
	var hash = sessionStorage.getItem("hash_column");
	var column = sessionStorage.getItem("list_column");

	alldata = {"column" : column, "hash" : hash};
	$.ajax({
		type:"get",
		url:"/list/hash/img",
		data:alldata,
		success:function(result){
			$('#list_banner_Img').css('background-image', 'url("/resources/upload/category/'+result+'")');	
			$('input[name='+column+']').css('border-bottom', '1px solid black');
			$('input[name='+column+']').css('color', 'black');
		},error:function(jqXHR, textStatus, errorThrown){
			
		}
	})	
}