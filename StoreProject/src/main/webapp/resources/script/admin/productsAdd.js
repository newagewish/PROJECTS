/**
 * 
 */

$(document).ready(function() {
	getmcsc();
});

function addReplacePrice(here){
	var price = $(here).val();
	$('input[name="products_price"]').val(price.replaceAll(",",""));
	price = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	$('#products_price').val(price);
}
/* 메인카테고리 호출 */
function getmcsc(){
	$.ajax({
		type:"GET",
		url:"ajax/getMainCategory",
		success:function(mcResult){
			for(var i=0; i<mcResult.length; i++){
			 	var mcli_id = "mc_li_"+i;
				var mc_checkbox_id = "mc_"+i;
				var scul_id = "sc_ul_"+i;
				$('#mc_ul').append(
					'<li class="mc_li" id="'+mcli_id+'">'
					+	'<input type="checkbox" value="'+mcResult[i].main_column_NM+'" id="'+mc_checkbox_id+'" name="mc_check">'
					+	'<label for="'+mc_checkbox_id+'" class="mc_label">'+mcResult[i].main_category_NM+'</label>'
					+	'<ul class="sc_ul" id="'+scul_id+'">'
					+	'</ul>'
					+'</li>'
				);
				
				var alldata = { "main_category_NM" : mcResult[i].main_category_NM, "main_column_NM" : mcResult[i].main_column_NM };
				
				/* 서브카테고리 호출 */
				$.ajax({
					type:"GET",
					url:"ajax/getSubCategory",
					data:alldata,
					async: false,
					success:function(scResult){
						for(var z=0 ; z<scResult.length ; z++){
							var sc_checkbox_id = "sc_"+scResult[z].sub_column_NM;
							$('#'+scul_id+'').append(
								'<li class="sc_li">'
								+	'<input type="checkbox" value="'+scResult[z].sub_column_NM+'" id="'+sc_checkbox_id+'" name="sc_check" class="sc_check_'+i+'" onclick="onclickCategory(this)">'
								+	'<label for="'+sc_checkbox_id+'">'+scResult[z].sub_category_NM+'</label>'	
								+'</li>'
							);
						}
					},error:function(jqXHR, textStatus, errorThrown){
						alert("세부 카테고리 목록을 불러오지 못했습니다.");
					}
				});
				
			};
			/* 메인 카테고리 갯수만큼 동적으로 ul 가로길이를 정해준다. */
			var width = (mcResult.length*200)+(mcResult.length*2)+"px";
			$('#mc_ul').css('width', width);
		},error:function(jqXHR, textStatus, errorThrown){
			alert("메인 카테고리 목록을 불러오지 못했습니다.");
		}
	});
}

/* 카테고리 선택 체크박스 열기 */
function opencheckBoxCategory(){
	var status = $('#slide_checkbox').css('display');
	if(status=="none"){
		$("#slide_checkbox").slideDown(500);
		$('#category_chevrons_icon').css('background-image','url("/resources/svg/managementbar/products/chevrons_up_icon.svg")');
/*		var scrollval = $(document).scrollTop();
		$('html').animate({scrollTop : scrollval}, 500);*/
	}else{
		$("#slide_checkbox").slideUp(500);
		$('#category_chevrons_icon').css('background-image','url("/resources/svg/managementbar/products/chevrons_down_icon.svg")');
	}
	
}

/* 세부 카테고리 선택시 메인 카테고리 자동 체크 및 해제 함수 */
function onclickCategory(here){
	var sc_input_class = $(here).attr("class");
	var sc_input_length = $('input:checkbox[class="'+sc_input_class+'"]:checked').length;
	/* 부모 ul 찾기 */
	var mcli = $(here).parents('ul').parents('li');
	/* 선택한 카테고리가 없을 경우 메인 카테고리 체크 해제 한다. */
	if(sc_input_length == 0){
		mcli.children('input').attr('checked', false);
	}else{
		mcli.children('input').attr('checked', true);
	}
}

/* ----------------------------------------------------- */
/* 캐릭터 카테고리 선택 체크박스 열기 */
function opencheckBoxCharater(){
	var status = $('#slide_checkbox_charater').css('display');
	if(status=="none"){
		$("#slide_checkbox_charater").slideDown(500);
		$('#charater_chevrons_icon').css('background-image','url("/resources/svg/managementbar/products/chevrons_up_icon.svg")');
/*		var scrollval = $(document).scrollTop();
		$('html').animate({scrollTop : scrollval}, 500);*/
	}else{
		$("#slide_checkbox_charater").slideUp(500);
		$('#charater_chevrons_icon').css('background-image','url("/resources/svg/managementbar/products/chevrons_down_icon.svg")');
	}
	
}
/* ----------------------------------------------------- */
/* ----------------------------------------------------- */
/* input 박스 숫자 입력 처리 */
function onlyNumber(event){
    event = event || window.event;
    var keyID = (event.which) ? event.which : event.keyCode;
    if ( (keyID >= 48 && keyID <= 57) || (keyID >= 96 && keyID <= 105) || keyID == 8 || keyID == 46 || keyID == 37 || keyID == 39 ) 
        return;
    else
        return false;
}
/* input 박스 문자 입력 처리 */ 
function removeChar(event) {
    event = event || window.event;
    var keyID = (event.which) ? event.which : event.keyCode;
    if ( keyID == 8 || keyID == 46 || keyID == 37 || keyID == 39 ) 
        return;
    else
        event.target.value = event.target.value.replace(/[^0-9]/g, "");
}

/* 옵션 추가 메뉴 생성 */
function selectsOptions(here){
	$('#products_option_td').fadeOut(0, function() { $(this).empty(); });
	$('#option_tfoot').fadeOut(0, function() { $(this).empty(); });
	var selectVal=$(here).val();
	
	if(selectVal=="없음"){
		$('#option_btn').fadeOut(0, function() { $(this).remove(); });
		var item0 = $(
			'<div id="option_contents">'
			+	'<span class="option_span">재고 : </span>'
			+	'<span class="option_span">'
			+		'<input type="text" placeholder="수량" class="option_stock" name="option_Stock" onkeydown="return onlyNumber(event)" onkeyup="removeChar(event)" autocomplete="off">'
			+	'</span>'
			+'</div>'
		)
		$('#products_option_td').append($(item0).hide().fadeIn());
		$('#products_option_td').css("display","inline-block");
	}else{
		var item1 = $(
			'<div id="option_contents">'
			+	'<span class="option_span">'
			+		selectVal+" : "
			+	'</span>'
			+	'<span class="option_span">'
			+		'<input type="text" placeholder="옵션 내용" class="option_name" name="option_NM" autocomplete="off">'
			+	'</span>'
			+	'<span class="option_span">재고 : </span>'
			+	'<span class="option_span">'
			+		'<input type="text" placeholder="수량" class="option_stock" name="option_Stock" onkeydown="return onlyNumber(event)" onkeyup="removeChar(event)" autocomplete="off" required>'
			+	'</span>'
			+	'<span class="option_span">'
			+		'<button type="button" class="option_remove_btn" onclick="removeOption(this)"></button>'
			+	'</span>'
			+'</div>'
		)
		$('#products_option_td').append($(item1).hide().fadeIn());
		$('#products_option_td').css("display","inline-block");
		
		var item2 = $(
			'<tr class="products_tr" id="option_btn">'
			+	'<td colspan="5">'
			+		'<div style="display:flex;"><button type="button" id="option_open_btn" onclick="addOption()"><div id="plus_icon"></div></button></div>'
			+	'</td>'
			+'</tr>'
		)
		$('#option_tfoot').append($(item2).hide().fadeIn());
		$('#option_tfoot').css("display","contents");
	}
	
}
/* 옵션 추가 메뉴 개별 삭제 */
function removeOption(here){
	$(here).parents('span').parents('#option_contents').fadeOut(500, function() { $(this).remove(); });
}

/* 옵션 추가버튼 클릭시 옵션 추가 메뉴 생성*/
function addOption(){
	var selectVal=$('input:radio[name="option_Choice"]:checked').val();
	var item = $(
		'<div id="option_contents">'
		+	'<span class="option_span">'
		+		selectVal+" : "
		+	'</span>'
		+	'<span class="option_span">'
		+		'<input type="text" placeholder="옵션 내용" class="option_name" name="option_NM" autocomplete="off">'
		+	'</span>'
		+	'<span class="option_span">재고 : </span>'
		+	'<span class="option_span">'
		+		'<input type="text" placeholder="수량" class="option_stock" name="option_Stock" onkeydown="return onlyNumber(event)" onkeyup="removeChar(event)" autocomplete="off" required>'
		+	'</span>'
		+	'<span class="option_span">'
		+		'<button type="button" class="option_remove_btn" onclick="removeOption(this)"></button>'
		+	'</span>'
		+'</div>'
	)
	$('#products_option_td').append($(item).hide().fadeIn());
}
/* ---------------------------------------------------------- */
/* 선택한 메인 카테고리 값만 배열에 담기 */
function mcArray(){
	var mcvalues = document.getElementsByName("mc_check");
	/* 선택한 메인 카테고리 배열 */
	var mc_array = Array();
	var mc_array_cnt = 0;
	for(var i=0; i<mcvalues.length; i++){
		if(mcvalues[i].checked){
			mc_array[mc_array_cnt] = mcvalues[i].value;
			mc_array_cnt++;
		}
	}
	return mc_array;
}
/* 선택한 세부 카테고리 값만 배열에 담기 */
function scArray(){
	var scvalues = document.getElementsByName("sc_check");
	/* 선택한 세부 카테고리 배열 */
	var sc_array = Array();
	var sc_array_cnt = 0;
	for(var i=0; i<scvalues.length; i++){
		if(scvalues[i].checked){
			sc_array[sc_array_cnt] = scvalues[i].value;
			sc_array_cnt++;
		}
	}
	return sc_array;
}
function charaterArray(){
	var charatervalues = document.getElementsByName("group_charater");
	/* 선택한 세부 카테고리 배열 */
	var charater_array = Array();
	var charater_array_cnt = 0;
	for(var i=0; i<charatervalues.length; i++){
		if(charatervalues[i].checked){
			charater_array[charater_array_cnt] = charatervalues[i].value;
			charater_array_cnt++;
		}
	}
	return charater_array;
}

/*function kakaoArray(){
	var kakaovalues = document.getElementsByName("group_kakao");
	var kakao_array = Array();
	var kakao_array_cnt = 0;
	for(var i=0; i<kakaovalues.length; i++){
		if(kakaovalues[i].checked){
			kakao_array[kakao_array_cnt] = kakaovalues[i].value;
			kakao_array_cnt++;
		}
	}
	return kakao_array;
}*/
/*
function ninizArray(){
	var ninizvalues = document.getElementsByName("group_niniz");
	var niniz_array = Array();
	var niniz_array_cnt = 0;
	for(var i=0; i<ninizvalues.length; i++){
		if(ninizvalues[i].checked){
			niniz_array[niniz_array_cnt] = ninizvalues[i].value;
			niniz_array_cnt++;
		}
	}
	return niniz_array;
}*/


/* 제품 색상 선택 값 가져오기 */
function colorArray(){
	var colorvalues = document.getElementsByName("products_color");
	var color_array = Array();
	var color_array_cnt = 0;
	for(var i=0; i<colorvalues.length; i++){
		if(colorvalues[i].checked){
			color_array[color_array_cnt] = colorvalues[i].value;
			color_array_cnt++;
		}	
	}
	return color_array;
}


function optionArray(){
	/* 옵션 종류 선택 값 */
	var op_choice = $('input[name=option_Choice]:checked').val();
	if(op_choice=="없음"){
		return;
	} else if(op_choice=="사이즈" || op_choice=="캐릭터" || op_choice=="기종"){
		/* 1차원 배열 선언 */
		var op_array = new Array();	
		/* 옵션 내용 값등 */
		var op_name = $('input[name=option_NM]');
		/* 옵션 수량 값들 */
		var op_stock = document.getElementsByName("option_Stock");
			/* 추가한 옵션 갯수 */
			var add_length = op_name.length;
			/* 2차원 배열 선언 */
			for(var i=0; i<add_length; i++){
				op_array[i] = new Array();
				/* array[x][3]길이가 된다. => 사이즈, 옵션 내용, 옵션 수량  3가지 */
				for(var z=0; z<3; z++){
					/* 자리마다 0에는 옵션 종류, 1에는 옵션 내용, 2에는 옵션 수량을 넣는다. */
					if(z==0){
						op_array[i][z] = op_choice;
					}else if(z==1){
						if(op_name[i].value!=""){
							op_array[i][z] = op_name[i].value;
						}else{
							alert("옵션 항목을 제대로 기입해주세요.");
							throw new Error("옵션 입력 오류");
						}
					}else if(z==2){
						if(op_stock[i].value!=""){
							op_array[i][z] = op_stock[i].value;
						}else{
							alert("옵션 항목을 제대로 기입해주세요.");
							throw new Error("옵션 입력 오류");
						}
					}
				/* 출력 테스트 */	
				/*alert(op_array[i][z]);*/
				}
			}
		return op_array;
	}
}
//커버 이미지
function vogueupload(here){
	var formData = new FormData();
	$('#vogue_file_name').empty();
	$('#vogue_image_div').empty();
	formData.append('uploadFile', here.files[0]);
	$('#vogue_file_name').append("<marquee>"+here.files[0].name+"</marquee>");
	$.ajax({
		type:"post",
		url:"ajax/vogueimg/upload",
		data: formData,
		processData: false,
		contentType: false,
		headers:{"X-CSRF-TOKEN":$("input[name='_csrf']").val()},
		success:function(result){
			$('#vogue_image_div').append(
				"<img id='vogue_image' src="+result.url+" value="+result.uuidfileNM+">"
			
			);
		},error:function(jqXHR, textStatus, errorThrown){
			
		}
	})
}

// 미리보기에 들어갈 스크립트에 필요한 변수
var timer;			//setinterval 선언 외부에 꺼내 놓은 이유는 이미지 삭제, 추가 버튼을 눌러서 초기화 됬을 경우에 타이머 초기화가 목적
var slide_cnt = 2;	//슬라이드 이미지의 현재 index?같은 카운트
var image_length;
/* 대표 이미지 업로드 및 스크립트 */
function imageupload(here){
	if(here.files.length>10){
		alert("이미지는 10개까지만 등록 해주세요.");
		return;
	}
	var formData = new FormData();
	var string = "";
	
	/*alert($(here).attr('id'));*/
	for(var i=0; i<here.files.length; i++){
		/*alert(files[i].name);*/
		formData.append('uploadFile', $('#products_image_input')[0].files[i]);
		/*alert($('#products_image_input')[0].files[i]);*/
		string = string + "<div class='checkbox_div'><input type='checkbox' id='checkbox_image_"+i+"' name='checkbox_image_name' value='"+here.files[i].name+"' ><label for='checkbox_image_"+i+"'><marquee>"+here.files[i].name+"</marquee></label></div>";
	}
	$('#products_image_mid').empty();
	$('#products_image_mid').append(string);
	$('#products_image_mid').css('height', "657px");
	$.ajax({
		type:"post",
		url:"ajax/img/upload/",
		data: formData,
		processData: false,
		contentType: false,
		headers:{"X-CSRF-TOKEN":$("input[name='_csrf']").val()},
		success:function(result){
			window.clearInterval(timer);
			slide_cnt = 2;
			image_length = result.length;
			$('#products_slide_movebox').empty();
			$('#products_slide_pagination').empty();
			$('#products_slide_movebox').css('transition', "none");
			$('#products_slide_movebox').css('transform', "translate3d(-657px, 0px, 0px)");
			var img_str = "";
			var dot_str = "";
			for(var i=0; i<image_length; i++){
				/*alert(result[i].url);
				alert(result[i].fileNM);*/
				img_str = img_str + "<div class='products_slide_content' id='"+result[i].fileNM+"' style=background-image:url('"+result[i].url+"' value='"+result[i].uuidfileNM+"')></div>";
				dot_str = dot_str + "<li class='products_slide_btn' data-index='"+(i+1)+"' onclick='productsSlideDotBtn(this)'><button type='button'></button></li>";
			}
			$('#products_slide_movebox').append(img_str);
			$('#products_slide_pagination').append(dot_str);
			
			/* 앞뒤에 첫이미지, 마지막 이미지를 복사 */
			$('#products_slide_movebox').append("<div class='products_slide_content' id='products_slide_content_"+(image_length+1)+"' style=background-image:url('"+result[0].url+"')></div>");
			$('#products_slide_movebox').prepend("<div class='products_slide_content' id='products_slide_content_"+0+"' style=background-image:url('"+result[image_length-1].url+"')></div>");
			
			/* 첫번째 닷에 표시 */
			$('.products_slide_btn:nth-of-type(1)').children('button').css('background','#000000');
			
			/* css관련 */
			$('#image_view_td').css('height', '657px');
			$('#products_slide_movebox').css('width', 'calc(657px * '+(image_length+2)+')');
			
			productsSlideAuto(image_length+2);
		},error:function(jqXHR, textStatus, errorThrown){
			alert("예기치 못한 오류로 이미지를 업로드하지 못했습니다..");
		}
		
	});
};
/* 슬라이드 이미지 자동 처리 */
function productsSlideAuto(result_length){
	if(result_length==3){
		//이미지가 1장일때는 슬라이드 작업을 하지 않는다.
	}else{
		timer = window.setInterval(function(){
			if(2<=slide_cnt && slide_cnt<=(result_length-2)){
				$('#products_slide_movebox').css('transition', "1s");
				$('#products_slide_movebox').css('transform', "translate3d(-"+(slide_cnt*657)+"px, 0px, 0px)");
				slide_cnt = slide_cnt+1;
			}else if(slide_cnt==result_length-1){
				$('#products_slide_movebox').css('transition', "1s");
				$('#products_slide_movebox').css('transform', "translate3d(-"+(slide_cnt*657)+"px, 0px, 0px)");
				slide_cnt = 2;
				setTimeout(function(){
					$('#products_slide_movebox').css('transition', "none");
					$('#products_slide_movebox').css('transform', "translate3d(-657px, 0px, 0px)");
				}, 1000);
			}
			//닷 표시 바꾸기
			$('.products_slide_btn').children('button').css('background', '#ffffff');
			$('.products_slide_btn[data-index='+(slide_cnt-1)+']').children('button').css('background', '#000000');
		}, 3000);
	}
	
};

/* 이미지 삭제 버튼 */
function checkboximgremove(){
	var checkval = $('input[name=checkbox_image_name]:checked');
	/*alert(checkval.length);*/
	for(var i=0; i<checkval.length; i++){
		//alert(checkval[i].value);
		//선택한 라벨의 내용과 같은 id값을 가진 미리보기 div 삭제
		$('#products_slide_movebox').find($("[id$='"+checkval[i].value+"']")).remove();
		//선택한 체크박스 삭제
		checkval.parent().remove();
	}
	//슬라이드쇼 페이크를 다시 재정비
	//삭제 후 미리보기의 첫번째, 마지막 이미지를 지운다.
	$("#products_slide_movebox > div:first").remove();
	$("#products_slide_movebox > div:last").remove();
	image_length = $("#products_slide_movebox > div").length;
	//미리보기의 첫번째, 마지막 이미지를 복사하여 처음과 끝에 복사
	var first_div = $("#products_slide_movebox > div:first");
	var first_url = first_div.css('background-image');
	var last_div = $("#products_slide_movebox > div:last");
	var last_url = last_div.css('background-image');
	$('#products_slide_movebox').append("<div class='products_slide_content' id='products_slide_content_"+(image_length+1)+"' style=background-image:"+first_url+"></div>");
	$('#products_slide_movebox').prepend("<div class='products_slide_content' id='products_slide_content_"+0+"' style=background-image:"+last_url+"></div>");
	//닷은 모두 지우고 새로 추가한다.
	$('#products_slide_pagination').empty();
	for(var i=0; i<image_length; i++){
		$('#products_slide_pagination').append(
		);
	}
	/* 첫번째 닷에 표시 */
	$('.products_slide_btn:nth-of-type(1)').children('button').css('background','#000000');
	//기존 setinterval을 초기화하며 슬라이드 변수도 초기화하여 setinterval 시작
	window.clearInterval(timer);
	slide_cnt = 2;
	//미리보기 이미지 재정비 후 처음 위치로 되돌리기
	$('#products_slide_movebox').css('transition', "none");
	$('#products_slide_movebox').css('transform', "translate3d(-657px, 0px, 0px)");
	productsSlideAuto(image_length+2);
};

/* 닷 버튼 */
function productsSlideDotBtn(here){
	//선택한 닷 표시
	$('.products_slide_btn').children('button').css('background', '#ffffff');
	$(here).children('button').css('background', '#000000');
	//선택한 버튼 위치의 이미지로 전환
	var index =  Number($(here).attr('data-index'));
	/*alert("전체길이 : "+image_length + " 인덱스 : "+index);*/
	if(1<=index && index < image_length){
		slide_cnt = (index+1);
		$('#products_slide_movebox').css('transition', "none");
		$('#products_slide_movebox').css('transform', "translate3d(-"+(index*657)+"px, 0px, 0px)");
	}
	if(index==image_length){
		//마지막 닷 버튼에서는 slide_cnt에 이미지 개수 +1 을 해준다. 맨뒤에 첫번째 이미지가 복사 되어있기 때문에
		slide_cnt = image_length+1;
		$('#products_slide_movebox').css('transition', "none");
		$('#products_slide_movebox').css('transform', "translate3d(-"+(index*657)+"px, 0px, 0px)");
	}
	//setinterval 초기화
	window.clearInterval(timer);
	productsSlideAuto(image_length+2);
	
}

function imageArray(){
	var div = $('.products_slide_content');
	var div_length = div.length;
	var image_array = "";
	for(var i=0; i<div_length; i++){
		if(i==0 || i==(div_length-1)){
			//처음과 마지막 이미지는 복사 이미지로 생략
		}else{
			if(i==div_length-2){
				image_array = image_array+div.eq(i).attr('value');
			}else{
				image_array = image_array+div.eq(i).attr('value')+",";
			}
			
		}
	}
	
	return image_array;
	
}

/* 제품 저장 버튼 */
function saveproducts(){
	/* 블라인드 박스 */
	$('body').css('overflow', 'hidden');
	window.scrollTo(0, 0);	//다른 조절 못하게 페이지 상단으로 올리고 블라인드 박스 처리
	$('#blind_box').css('display', 'block');
	
	/* 상품명 */
	var name = $('#products_name').val();
	/* 가격 */
	var price = $('input[name="products_price"]').val();
	/* 제품 소개 */
	/* jsp 에디터 스크립트에서 변수 호출 */
	var edit_info = edit_info_text.getData();
	/* 세부 정보 */
	/* jsp 에디터 스크립트에서 변수 호출 */
	var edit_detail = edit_detail_text.getData();
	/* 배송 종류 */
	/* 0은 국내 1은 해외*/
	var delivery_value = $('input[name=option_delivery]:checked').val();
	/* 선택한 카테고리 값 가져오기 */
	var mc_values = mcArray();	/* 메인 */
	var sc_values = scArray();	/* 세부 */
	/* 선택한 캐릭터 값 가져오기 */
	var charater_values = charaterArray();
	/* 선택한 카카오 캐릭터 값 가져오기 */
/*	var kakao_values = kakaoArray();*/
	/* 선택한 니니즈 캐릭터 값 가져오기 */
/*	var niniz_values = ninizArray();*/
	/* 제품 색상 선택 */
	var color_values = colorArray();
	/* 대표 이미지 가져오기 */
	var image_values = imageArray();
	/* 인기 이미지 가져오기 */
	var vogue_image = $('#vogue_image').attr('value');
	/* 추가할 옵션 종류 */
	var op_values;
	/* 추가할 옵션 종류에 따라  alldata에서 보내는 데이터가 달라지기 떄문에 조건문 사용 */
	if($('input[name="option_Choice"]:checked').val()=="없음"){
		op_choice = "없음";
		op_stock = $("input[name=option_Stock]").val();
		var alldata = { 
					/* 상품 정보 테이블에 insert 할 값 */
					"pds_NM" : name, "pds_Price" : price, "pds_Contents" :  edit_info, "pds_Detail" : edit_detail, "pds_Delivery" : delivery_value,
					/* 상품 카테고리 테이블에 update 할 값 */
					"mainCategory" : mc_values, "subCategory" : sc_values,
					/* 상품 캐릭터 카테고리 테이블에 update 할 값 */
					"charater" : charater_values,
					/*"kakao" : kakao_values, "niniz" : niniz_values,*/
					/* 상품 색상 insert 할 값 */
					"color" : color_values,
					/* 상품 이미지 */
					"pds_Image" : image_values, "pds_Vogue_Image" : vogue_image,
					/* 상품 추가 옵션 카테고리 테이블에 insert 할 값 */
					"option_Choice" : op_choice, "option_Stock" : op_stock
					
				  };
	}else{
		op_values = optionArray();
		var alldata = { 
					/* 상품 정보 테이블에 insert 할 값 */
					"pds_NM" : name, "pds_Price" : price, "pds_Contents" :  edit_info, "pds_Detail" : edit_detail, "pds_Delivery" : delivery_value,
					/* 상품 카테고리 테이블에 update 할 값 */
					"mainCategory" : mc_values, "subCategory" : sc_values,
					/* 상품 캐릭터 카테고리 테이블에 update 할 값 */
					"charater" : charater_values,
					/*"kakao" : kakao_values, "niniz" : niniz_values,*/
					/* 상품 색상 insert 할 값 */
					"color" : color_values,
					/* 상품 이미지 */
					"pds_Image" : image_values, "pds_Vogue_Image" : vogue_image,
					/* 상품 추가 옵션 카테고리 테이블에 insert 할 값 */
					"option" : op_values
				  };
	}
	
	
	
	$.ajax({
		type:"POST",
		url:"ajax/insert/products",
		data:alldata,
		headers:{"X-CSRF-TOKEN":$("input[name='_csrf']").val()},
		success:function(result){
			if(result==0){
				alert("제품 등록 완료");
				location.href = "/";
			}
			if(result==1){
				alert("상품명을 입력해주세요.");
			}
			if(result==2){
				alert("가격을 입력해주세요.");
			}
			if(result==3){
				alert("제품 소개를 입력해주세요.");
			}
			if(result==4){
				alert("배송 정보를 체크해주세요.");
			}
			if(result==5){
				alert("세부 카테고리를 하나 이상 선택해주세요.");
			}
			if(result==6){
				alert("제품 색상를 하나 이상 선택해주세요.");
			}
			if(result==7){
				alert("제품 재고를 입력해주세요.");
			}
			if(result==8){
				alert("대표 이미지를 선택해주세요.(여러개 선택 가능)");
			}
			if(result==9){
				alert("인기 이미지를 선택해주세요.");
			}else{
				
			}
			/* 블라인드 박스 */
			$('body').css('overflow', 'auto');
			$('#blind_box').css('display', 'none');
			
		},error:function(jqXHR, textStatus, errorThrown){
			alert("예기치 못한 오류로 상품을 추가하지 못했습니다.");
			$('body').css('overflow', 'auto');
			$('#blind_box').css('display', 'none');
		}
	});
}

function colorcheck(here){
	if($(here).children('img').length > 0){
		$(here).empty();
	}else{
		if($(here).attr('id')=='label_white'){
			$(here).append(
				"<img src='/resources/svg/products/check_black_icon.svg' class='color_img'>"
			);
		}else{
			$(here).append(
				"<img src='/resources/svg/products/check_white_icon.svg' class='color_img'>"
			);
		}
	}
	
}