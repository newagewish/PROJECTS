/**
 * 
 */

//전역변수
var timeout;

window.onload = function(){
	cardListAdd();
	selectlist();
	
	$('#card_create_box').resize(setheight());
}
$(document).ready(function() {
	sessionStorage.setItem("card_count", 0);
	sessionStorage.setItem("card_list", JSON.stringify([]));
	sessionStorage.setItem("viewpage_list", JSON.stringify([]));
});

//높이 변경
function setheight(){
	var ht = $('#card_create_box').css('height');
	$('#card_choice_list').css('height', ht);
}

function cardListAdd(){
	$('#card_view').empty();
	$('#card_view').append(
		'<div id="card_list_box">'
		+		'<div class="card_box_name">목록형 카드 미리보기</div>'
		+		'<div id="card_create_box">'
		+			'<div id="card_list_img">'
		+				'<div>이미지를 선택해주세요.</div>'
		+				'<label for="card_list_img_input" id="card_list_img_btn"></label>'
		+				'<input type="file" id="card_list_img_input" accept="image/*" onchange="cardListImgUpload(this)">'
		+			'</div>'
		+			'<div id="card_list_title_box">'
		+				'<textarea id="card_Title" cols="20" rows="2" maxlength="21" onkeydown="limitTitleRows(this, event)" placeholder="카드 제목을 입력하세요."></textarea>'
		+			'</div>'
		+			'<div id="card_list_intro_box">'
		+				'<textarea id="card_Intro" cols="44" rows="4" maxlength="80" onkeydown="limitIntroRows(this, event)" placeholder="카드 소개를 입력하세요."></textarea>'
		+			'</div>'
		+			'<div id="card_list_choice_box">'
		+				'<div id="choice_placeholder_box">대표 제품을 선택해주세요.</div>'
		+			'</div>'
		+		'</div>'
		+	'</div>'
	);
	//게시판형 체크
	$("input:radio[name='card_viewpage_type']:radio[value='contents']").prop('checked', true);
	cardViewpageContentsOpen();
	//제품 링크 잠금
	$('#card_viewpage_radio_url').attr('disabled', true);
	//링크 값 삭제
	$('#card_url_no').val(null);
	$('#card_url_nm').val(null);
	
	checkBtn();
	setheight();
}
function cardImgAdd(){
	$('#card_view').empty();
	$('#card_view').append(
		'<div id="card_Img_box">'
		+		'<div class="card_box_name">목록형 카드 미리보기</div>'
		+		'<div id="card_create_box">'
		+			'<div id="card_Img_img">'
		+				'<div>이미지를 선택해주세요.</div>'
		+				'<label for="card_Img_img_input" id="card_Img_img_btn"></label>'
		+				'<input type="file" id="card_Img_img_input" accept="image/*" onchange="cardImgImgUpload(this)">'
		+			'</div>'
		+		'</div>'
		+	'</div>'
	);
	
	//제품 링크 잠금 해제
	$('#card_viewpage_radio_url').attr('disabled', false);
	sessionStorage.setItem("card_list", JSON.stringify([]));
	checkBtn();
	setheight();
}
function cardIntroAdd(){
	$('#card_view').empty();
	$('#card_view').append(
		'<div id="card_Intro_box">'
		+		'<div class="card_box_name">목록형 카드 미리보기</div>'
		+		'<div id="card_create_box">'
		+			'<div id="card_Intro_img">'
		+				'<div>이미지를 선택해주세요.</div>'
		+				'<label for="card_Intro_img_input" id="card_Intro_img_btn"></label>'
		+				'<input type="file" id="card_Intro_img_input" accept="image/*" onchange="cardIntroImgUpload(this)">'
		+			'</div>'
		+			'<div id="card_Intro_title_box">'
		+				'<textarea id="card_Title" cols="20" rows="2" maxlength="21" onkeydown="limitTitleRows(this, event)" placeholder="카드 제목을 입력하세요."></textarea>'
		+			'</div>'
		+			'<div id="card_Intro_intro_box">'
		+				'<textarea id="card_Intro" cols="44" rows="4" maxlength="80" onkeydown="limitIntroRows(this, event)" placeholder="카드 소개를 입력하세요."></textarea>'
		+			'</div>'
		+		'</div>'
		+	'</div>'
	);
	//제품 링크 잠금 해제
	$('#card_viewpage_radio_url').attr('disabled', false);
	sessionStorage.setItem("card_list", JSON.stringify([]));
	checkBtn();
	setheight();
}
function cardListImgUpload(here){
	var formData = new FormData();
	formData.append('uploadFile', here.files[0]);
	$.ajax({
		type:"post",
		url:"ajax/cardimg/upload",
		data: formData,
		processData: false,
		contentType: false,
		headers:{"X-CSRF-TOKEN":$("input[name='_csrf']").val()},
		success:function(result){
			$('#card_list_img').children('div:nth-child(1)').empty();
			$('#card_list_img').children('div:nth-child(1)').append(
				"<img id='card_img_view' src="+result.url+" value="+result.uuidfileNM+">"
			
			);
		},error:function(jqXHR, textStatus, errorThrown){
			
		}
	})
}

function cardImgImgUpload(here){
	var formData = new FormData();
	formData.append('uploadFile', here.files[0]);
	$.ajax({
		type:"post",
		url:"ajax/cardimg/upload",
		data: formData,
		processData: false,
		contentType: false,
		headers:{"X-CSRF-TOKEN":$("input[name='_csrf']").val()},
		success:function(result){
			$('#card_Img_img').children('div:nth-child(1)').empty();
			$('#card_Img_img').children('div:nth-child(1)').append(
				"<img id='card_img_view' src="+result.url+" value="+result.uuidfileNM+">"
			
			);
		},error:function(jqXHR, textStatus, errorThrown){
			
		}
	})
}

function cardIntroImgUpload(here){
	var formData = new FormData();
	formData.append('uploadFile', here.files[0]);
	$.ajax({
		type:"post",
		url:"ajax/cardimg/upload",
		data: formData,
		processData: false,
		contentType: false,
		headers:{"X-CSRF-TOKEN":$("input[name='_csrf']").val()},
		success:function(result){
			$('#card_Intro_img').children('div:nth-child(1)').empty();
			$('#card_Intro_img').children('div:nth-child(1)').append(
				"<img id='card_img_view' src="+result.url+" value="+result.uuidfileNM+">"
			
			);
		},error:function(jqXHR, textStatus, errorThrown){
			
		}
	})
}

function limitTitleRows(here, e){
	//줄바꿈제한
	var line = (here.value.match(/\n/g) || []).length + 1;
	var keyCode = (window.event) ? e.which : e.keyCode;
    if (line == 2) {
		if(keyCode == 13){
			e.preventDefault();
		}
    }
}
function limitIntroRows(here, e){
	//줄바꿈제한
	var line = (here.value.match(/\n/g) || []).length + 1;
	var keyCode = (window.event) ? e.which : e.keyCode;
    if (line == 4) {
		if(keyCode == 13){
			e.preventDefault();
		}
    }
}

function cardViewpageUrlOpen(){
	$('#card_viewpage_contents').css('display', 'none');
	$('#card_viewpage_url').css('display', 'block');
	$('#card_viewpage_promotion').css('display', 'none');
	
	$('.choice_box').remove();	//링크형 제품에는 카드에 제품 목록이 없다.
	sessionStorage.setItem("card_list", JSON.stringify([]));
	$('#choice_placeholder_box').css('display', 'block');
	$('.promotion_box').remove();	//링크형 제품에는 추천 제품도 없다.
	sessionStorage.setItem("viewpage_list", JSON.stringify([]));
	$('#promotion_placeholder_box').css('display', 'block');
	
	checkBtn();
	setheight();
	
}
function cardViewpageContentsOpen(){
	$('#card_viewpage_url').css('display', 'none');
	$('#card_viewpage_contents').css('display', 'block');
	$('#card_viewpage_promotion').css('display', 'block');
	
	//추천 제품 링크 버튼 초기화
	$('.url_btn_on').css('background-image', 'url("/resources/svg/card/url_off_icon.svg")');
	$('.url_btn_on').attr('class', 'url_btn_off');
	$('.urlCover').css('display', 'none');
	//링크 값 삭제
	$('#card_url_no').val(null);
	$('#card_url_nm').val(null);
	
	checkBtn();
}

function selectlist(){
	var NO = sessionStorage.getItem("card_count");
	var alldata = { "NO": NO };
	$.ajax({
		type:"get",
		url:"card/select/products",
		data:alldata,
		success:function(result){
			//제품을 최신 순으로 조회
			if(result!=null){
				//가져온 상품 정보가 있으면 불러온 마지막 상품번호를 세션 카운트에 더한다.
				sessionStorage.setItem("card_count", Number(sessionStorage.getItem("card_count"))+(result.length));
			}else{
				//가져온 내용이 없으면 세션 카운터를 올리지 않는다.
			}
			for(var i=0; i<result.length; i++){
				var price = cardReplacePrice(result[i].pds_Price);
				var pds_image_name = result[i].pds_Image.split(",");
				/*alert(pds_image_name[0]);*/
				$('#card_choice_list').append(
					"<div class='contents_card_div'>"
					+	"<div class='urlCover'>LINK</div>"
					+	"<a class='card_a_tag' id='card_"+result[i].pds_NO+"' name='"+result[i].pds_NO+"'>"
					+		"<span class='img_cover'></span>"
					+		"<span>"
					+			"<img class='contents_image' src='/resources/upload/products/images/"+result[i].pds_Reg_Date+"/"+result[i].pds_NO+"/"+pds_image_name[0]+"' />"
					+		"</span>"
					+		"<p class='mini_name'>"+result[i].pds_NM+"</p>"
					+		"<p class='mini_price'>"+price+"원</p>"
					+	"</a>"
					+	"<button type='button' class='card_btn_off' onclick='cardAddChoice(this)'></button>"
					+	"<button type='button' class='choice_btn_off' onclick='promotionAddProducts(this)'></button>"
					+	"<button type='button' class='url_btn_off' onclick='urlBtnChange(this)' disabled></button>"
					+"</div>"
				);
				// 세일이 있을 경우 처리
				if(result[i].pds_Sale != 0){
					var sale = cardReplacePrice(result[i].pds_Sale);
					var percent = 100 - Math.floor( result[i].pds_Sale / (result[i].pds_Price / 100) );
					$('#card_'+result[i].pds_NO).children('p:nth-child(3)').after(
						'<p class="mini_percent">'+percent+'%</p>'
					);
					$('#card_'+result[i].pds_NO).children('p:nth-child(4)').after(
						'<p class="mini_sale">'+sale+'원</p>'
					);
					$('.card_a_tag').children('p:nth-child(6)').css('text-decoration','line-through');
					$('.card_a_tag').children('p:nth-child(6)').css('color', 'rgb(154, 154, 158)');
				}
				/*alert(result[i].pds_Reg_Date);*/
			}
			
		},error:function(jqXHR, textStatus, errorThrown){
			
		}
	})
}

function cardReplacePrice(here){
	var str = here.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	return str;
}

function cardEditorBtn(){
	var status = $('#card_editor_box').css('display');
	console.log(status);
	if(status=="none"){
		$("#card_editor_box").slideDown(1000);
		$('#card_editor_btn').children('span').css('background-image', 'url("/resources/svg/managementbar/products/chevrons_up_icon.svg")');
	}else{
		$("#card_editor_box").slideUp(1000);
		$('#card_editor_btn').children('span').css('background-image', 'url("/resources/svg/managementbar/products/chevrons_down_icon.svg")');
	}
}


function choiceScroll(){
	clearTimeout(timeout);  //이전 휠 이벤트 제거
    scrolleffect();
};
function scrolleffect(){
    timeout = setTimeout(function(){ //다시 휠 이벤트 발생  0.2초후
		var percent = Math.floor( $('#card_choice_list').scrollTop() / ( $('#card_choice_list').prop('scrollHeight') - $('#card_choice_list').height() ) * 100 );
		if( percent >= 80){
			selectlist();
		}else{
			
		}
    }, 200);
};


function cardAddChoice(here){
	var NO = Number($(here).siblings('a').attr('name'));
	var str = sessionStorage.getItem("card_list");
	var arr = JSON.parse(str);
	if(arr.length>=6){
		alert("카드 리스트에는 최대 6개 상품만 등록 가능합니다.");
		return;
	}else{
		var check = true;
		for(var i=0; i<arr.length; i++){
			if(arr[i]==NO){
				check = false;
			}else{
			}
		}
		if(check){
			arr.push( NO );
			sessionStorage.setItem("card_list", JSON.stringify(arr));
		}else{
			return;
		}
	}
	
	var alldata = { "NO": NO };
	$.ajax({
		type:"get",
		url:"card/select/product",
		data:alldata,
		success:function(result){

			$('#choice_placeholder_box').css('display', 'none');
			var price = cardReplacePrice(result.pds_Price);
			var pds_image_name = result.pds_Image.split(",");
			/*alert(pds_image_name[0]);*/
			$('#card_list_choice_box').append(
				"<div class='choice_box'>"
				+	"<button type='button' class='choice_remove_btn' onclick='removeCardProducts(this)' value="+result.pds_NO+"></button>"
				+	"<a class='choice_a_tag' id='choice_"+result.pds_NO+"'>"
				+		"<span class='choice_img_cover'></span>"
				+		"<span>"
				+			"<img class='choice_contents_image' src='/resources/upload/products/images/"+result.pds_Reg_Date+"/"+result.pds_NO+"/"+pds_image_name[0]+"' />"
				+		"</span>"
				+		"<p class='choice_mini_name'>"+result.pds_NM+"</p>"
				+		"<p class='choice_mini_price'>"+price+"원</p>"
				+	"</a>"
				+"</div>"
			);
			// 세일이 있을 경우 처리
			if(result.pds_Sale != 0){
				var sale = cardReplacePrice(result.pds_Sale);
				var percent = 100 - Math.floor( result.pds_Sale / (result.pds_Price / 100) );
				$('#choice_'+result.pds_NO).children('p:nth-child(3)').after(
					'<p class="choice_mini_percent">'+percent+'%</p>'
				);
				$('#choice_'+result.pds_NO).children('p:nth-child(4)').after(
					'<p class="choice_mini_sale">'+sale+'원</p>'
				);
				$('.choice_a_tag').children('p:nth-child(6)').css('text-decoration','line-through');
				$('.choice_a_tag').children('p:nth-child(6)').css('color', 'rgb(154, 154, 158)');
			}
			/*alert(result[i].pds_Reg_Date);*/
			
			setheight();
		},error:function(jqXHR, textStatus, errorThrown){
			
		}
	})
}

function removeCardProducts(here){
	var NO = Number($(here).val());
	var str = sessionStorage.getItem("card_list");
	var arr = JSON.parse(str);
	var idx = arr.indexOf(NO);
	if(idx > -1){
		arr.splice(idx, 1);
	}
	sessionStorage.setItem("card_list", JSON.stringify(arr));
	
	$(here).parent('div').remove();
	setheight();
}

//추천 제품 urlAdd 버튼 관련
function urlBtnChange(here){
	var check = $('#card_viewpage_radio_url').is(':checked');
	if(!check){
		return;	
	}
	var NO = $(here).siblings('a').attr('name');
	var NM = $(here).siblings('a').children('p:nth-child(3)').html();
	var clas = $(here).attr('class');
	$('.urlCover').css('display', 'none');
	
	if(clas=="url_btn_off"){
		$('.url_btn_on').css('background-image', 'url("/resources/svg/card/url_off_icon.svg")');
		$('.url_btn_on').attr('class', 'url_btn_off');
		
		$(here).siblings('div').css('display','block');
		$(here).css('background-image', 'url("/resources/svg/card/url_on_icon.svg")');
		$(here).attr('class', 'url_btn_on');
		$('#card_url_no').val( NO );
		$('#card_url_nm').val( NM );
	}else{
		$(here).css('background-image', 'url("/resources/svg/card/url_off_icon.svg")');
		$(here).attr('class', 'url_btn_off');
		$('#card_url_no').val( null );
		$('#card_url_nm').val( null );
	}
}

//카드 게시판에 제품 추가
function promotionAddProducts(here){
	var NO = Number($(here).siblings('a').attr('name'));
	var str = sessionStorage.getItem("viewpage_list");
	var arr = JSON.parse(str);
	var check = true;
	for(var i=0; i<arr.length; i++){
		if(arr[i]==NO){
			check = false;
		}else{
		}
	}
	if(check){
		arr.push( NO );
		sessionStorage.setItem("viewpage_list", JSON.stringify(arr));
	}else{
		return;
	}
	
	var alldata = { "NO": NO };
	$.ajax({
		type:"get",
		url:"card/select/product",
		data:alldata,
		success:function(result){

			$('#promotion_placeholder_box').css('display', 'none');
			var price = cardReplacePrice(result.pds_Price);
			var pds_image_name = result.pds_Image.split(",");
			/*alert(pds_image_name[0]);*/
			$('#promotion_list').append(
				"<div class='promotion_box'>"
				+	"<button type='button' class='promotion_remove_btn' onclick='removeViewpageProducts(this)' value="+result.pds_NO+"></button>"
				+	"<a class='promotion_a_tag' id='promotion_"+result.pds_NO+"'>"
				+		"<span class='promotion_img_cover'></span>"
				+		"<span>"
				+			"<img class='promotion_contents_image' src='/resources/upload/products/images/"+result.pds_Reg_Date+"/"+result.pds_NO+"/"+pds_image_name[0]+"' />"
				+		"</span>"
				+		"<p class='promotion_mini_name'>"+result.pds_NM+"</p>"
				+		"<p class='promotion_mini_price'>"+price+"원</p>"
				+	"</a>"
				+"</div>"
			);
			// 세일이 있을 경우 처리
			if(result.pds_Sale != 0){
				var sale = cardReplacePrice(result.pds_Sale);
				var percent = 100 - Math.floor( result.pds_Sale / (result.pds_Price / 100) );
				$('#promotion_'+result.pds_NO).children('p:nth-child(3)').after(
					'<p class="promotion_mini_percent">'+percent+'%</p>'
				);
				$('#promotion_'+result.pds_NO).children('p:nth-child(4)').after(
					'<p class="promotion_mini_sale">'+sale+'원</p>'
				);
				$('.promotion_a_tag').children('p:nth-child(6)').css('text-decoration','line-through');
				$('.promotion_a_tag').children('p:nth-child(6)').css('color', 'rgb(154, 154, 158)');
			}
			/*alert(result[i].pds_Reg_Date);*/
			
			setheight();
		},error:function(jqXHR, textStatus, errorThrown){
			
		}
	})
}

function removeViewpageProducts(here){
	var NO = Number($(here).val());
	var str = sessionStorage.getItem("viewpage_list");
	var arr = JSON.parse(str);
	var idx = arr.indexOf(NO);
	if(idx > -1){
		arr.splice(idx, 1);
	}
	sessionStorage.setItem("viewpage_list", JSON.stringify(arr));
	
	$(here).parent('div').remove();
}


//조건에 따른 버튼 활성화 여부
function checkBtn(){
	var card_type = $('input[name=card_type]:checked').val();
	var viewpage_type = $('input[name=card_viewpage_type]:checked').val();
	
	if(card_type=="image"){
		if(viewpage_type=="url"){
			$('.card_btn_off').attr('disabled', true);
			$('.choice_btn_off').attr('disabled', true);
			$('.url_btn_off').attr('disabled', false);
		}else if(viewpage_type=="contents"){
			$('.card_btn_off').attr('disabled', true);
			$('.choice_btn_off').attr('disabled', false);
			$('.url_btn_off').attr('disabled', true);
		}
	}else if(card_type=="intro"){
		if(viewpage_type=="url"){
			$('.card_btn_off').attr('disabled', true);
			$('.choice_btn_off').attr('disabled', true);
			$('.url_btn_off').attr('disabled', false);
		}else if(viewpage_type=="contents"){
			$('.card_btn_off').attr('disabled', true);
			$('.choice_btn_off').attr('disabled', false);
			$('.url_btn_off').attr('disabled', true);
		}
	}else if(card_type=="list"){
		if(viewpage_type=="url"){
			$('.card_btn_off').attr('disabled', true);
			$('.choice_btn_off').attr('disabled', true);
			$('.url_btn_off').attr('disabled', false);
		}else if(viewpage_type=="contents"){
			$('.card_btn_off').attr('disabled', false);
			$('.choice_btn_off').attr('disabled', false);
			$('.url_btn_off').attr('disabled', true);
		}
	}
}


//카드 저장
function saveCard(){
	/* 블라인드 박스 */
	$('body').css('overflow', 'hidden');
	window.scrollTo(0, 0);	//다른 조절 못하게 페이지 상단으로 올리고 블라인드 박스 처리
	$('#blind_box').css('display', 'block');
	
	var card_Type = $('input[name=card_type]:checked').val();
	var viewpage_type = $('input[name=card_viewpage_type]:checked').val();
	
	var card_Img = $('#card_img_view').attr('value');
	var card_Url = $('input[name=card_url_no]').val();
	var card_Contents = editor_card_text.getData();
	var card_Products = sessionStorage.getItem("viewpage_list");
	var card_Products_arr = JSON.parse(card_Products);
	var card_Title = $('#card_Title').val();
	var card_Intro = $('#card_Intro').val();
	var card_Choice = sessionStorage.getItem("card_list");
	var card_Choice_arr = JSON.parse(card_Choice);
	
	console.log(card_Products);
	if(card_Type=="image"){
		if(viewpage_type=="url"){
			if(!card_Img){
				alert("카드 이미지를 선택하세요.");
				return;
			}
			if(card_Url==""){
				alert("카드에 링크할 제품을 선택하세요.");
				return;
			}
			//링크형 선택시 게시판형 값에 null을 준다.
			card_Contents = null;	//내용이 들어가지 않게
			card_Products = null;
		}else if(viewpage_type=="contents"){
			if(!card_Img){
				alert("카드 이미지를 선택해주세요.");
				return;
			}
			if(card_Products_arr.length==0){
				card_Products = null;	//선택한 추천 상품이 없다면 null 값 저장
			}else{
				card_Products = card_Products.replace("[", "");
				card_Products = card_Products.replace("]", "");
			}
		}
		card_Choice = null;
	}else if(card_Type=="intro"){
		if(viewpage_type=="url"){
			if(!card_Img){
				alert("카드 이미지를 선택하세요.");
				return;
			}
			if(card_Title==""){
				alert("카드 제목을 입력하세요.");
				return;
			}
			if(card_Intro==""){
				alert("카드 소개를 입력하세요.");
				return;
			}
			if(card_Url==""){
				alert("카드에 링크할 제품을 선택하세요.");
				return;
			}
			
			//링크형 선택시 게시판형 값에 null을 준다.
			card_Contents = null;	//내용이 들어가지 않게
			card_Products = null;
		}else if(viewpage_type=="contents"){
			if(!card_Img){
				alert("카드 이미지를 선택해주세요.");
				return;
			}
			if(card_Title==""){
				alert("카드 제목을 입력하세요.");
				return;
			}
			if(card_Intro==""){
				alert("카드 소개를 입력하세요.");
				return;
			}
			if(card_Products_arr.length==0){
				card_Products = null;	//선택한 추천 상품이 없다면 null 값 저장
			}else{
				card_Products = card_Products.replace("[", "");
				card_Products = card_Products.replace("]", "");
			}
		}
		card_Choice = null;
	}else if(card_Type=="list"){
		if(viewpage_type=="contents"){
			if(!card_Img){
				alert("카드 이미지를 선택해주세요.");
				return;
			}
			if(card_Title==""){
				alert("카드 제목을 입력하세요.");
				return;
			}
			if(card_Intro==""){
				alert("카드 소개를 입력하세요.");
				return;
			}
			if(card_Choice_arr.length==0){
				card_Choice = null;	//카드에 선택한 대표 상품이 없다면 null 값 저장
			}else{
				card_Choice = card_Choice.replace("[", "");
				card_Choice = card_Choice.replace("]", "");
			}
			if(card_Products_arr.length==0){
				card_Products = null;	//선택한 추천 상품이 없다면 null 값 저장
			}else{
				card_Products = card_Products.replace("[", "");
				card_Products = card_Products.replace("]", "");
			}
		}
	}
	
	//ajax
	alldata = {
				"card_Type" : card_Type,  
				"card_Img" : card_Img,
				"card_Title" : card_Title,
				"card_Intro" : card_Intro,
				"card_Choice" : card_Choice,
				"card_Contents" : card_Contents,
				"card_Url" : card_Url,
				"card_Products" : card_Products
				}
	$.ajax({
		type:"post",
		url:"ajax/insert/card",
		data:alldata,
		headers:{"X-CSRF-TOKEN":$("input[name='_csrf']").val()},
		success:function(result){
			if(result==0){
				alert("알수 없는 오류로 카드를 등록하지 못했습니다.");
			}else if(result==1){
				alert("카드 등록 완료");
				location.href = "/";
			}else if(result==2){
				alert("카드 종류가 선택되지 않거나 올바르지 않습니다.");
			}else if(result==3){
				alert("카드 이미지를 선택해주세요.");
			}
			/* 블라인드 박스 */
			$('body').css('overflow', 'auto');
			$('#blind_box').css('display', 'none');
		},error:function(jqXHR, textStatus, errorThrown){
			$('body').css('overflow', 'auto');
			$('#blind_box').css('display', 'none');
		}
	});
}