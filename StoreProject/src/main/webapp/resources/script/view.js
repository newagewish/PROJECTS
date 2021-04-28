/**
 * 
 */

window.onload = function(){
	document.querySelectorAll( 'oembed[url]' ).forEach( element => {
        iframely.load( element, element.attributes.url.value );
    } );
}
$(document).ready(function(){
	$('html').scrollTop(0);	//뒤로가기로 뷰페이지 호출 시 스크롤이 이전 페이지 위치에 있는 것을 초기화 시켜준다.
	reviewselect();
	pushview();
	recentlyview();
	slideviewimg();
	viewstarpoint();
	openrecentlybox();
});
//최근 본 상품이 있을때 노출 on/off
function openrecentlybox(){
	var local = localStorage.getItem("recently_view_NO");
	var arr = JSON.parse(local);
	if(arr.length > 1){	//1개일 때는 지금 보는 상품 말고 다른 상품을 본 게 없기 때문에 노출할게 없어서 따로 처리;
		$('#view_recently_box').css('display', 'block');
	}
}
// 추천 제품 8개 정보 가져오기
function pushview(){
	var alldata = { "NO": NO };
	$.ajax({
		type:"get",
		url:"/view/select/push",
		data:alldata,
		success:function(result){
			for(var i=0; i<result.length; i++){
				var image = result[i].pds_Image.split(",");
				var url = "/resources/upload/products/images/"+result[i].pds_Reg_Date+"/"+result[i].pds_NO+"/"+image[0];
				var price = viewReplacePrice(result[i].pds_Price);
				/*alert(result.pds_NO);*/
				$('#push_contents_ul').append(
					"<li><a href='/view?NO="+result[i].pds_NO+"' class='push_a_tag' id='push_"+result[i].pds_NO+"'>"
					+	"<span class='img_cover'></span>"
					+	"<span><img src='"+url+"'></span>"
					+	"<p class='mini_name'>"+result[i].pds_NM+"</p>"
					+	"<p class='mini_price'>"+price+"원</p>"
					+"</a></li>"
				);
				// 세일이 있을 경우 처리
				if(result[i].pds_Sale != 0){
					var sale = viewReplacePrice(result[i].pds_Sale);
					var percent = 100 - Math.floor( result[i].pds_Sale / (result[i].pds_Price / 100) );
					$('#push_'+result[i].pds_NO).children('p:nth-child(3)').after(
						'<p class="mini_percent">'+percent+'%</p>'
					);
					$('#push_'+result[i].pds_NO).children('p:nth-child(4)').after(
						'<p class="mini_sale">'+sale+'원</p>'
					);
				}
			}
			$('.push_a_tag').children('p:nth-child(6)').css('text-decoration','line-through');
			$('.push_a_tag').children('p:nth-child(6)').css('color', 'rgb(154, 154, 158)');
		},error:function(){
			
		}
	})
}
// 최근 본 제품 8개 정보 가져오기
function recentlyview(){
	// 현재 보는 상품이 최근본 상품에 노출 되지 않도록 작업
	// 최근 본 상품 목록을 로컬스토리지 값을 가져온다.
	var array = JSON.parse(localStorage.getItem("recently_view_NO"));
	// 반복문으로 하나씩 추가하되 조건문으로 현재 보는 상품과 안겹치도록 주의
	// NO(pds_NO) 변수는 view.jsp에서 전역 변수로 선언하고 초기화 했다. 
	for(var i=0; i<array.length; i++){
		if(array[i]==NO){	//jsp 스크립트 전역변수에서 NO값을 가져온다.
			//현재 보는 상품 번호와 같은 값이기 때문에 아무 작업없이 넘어간다.
		}else{
			//현재 보는 상품 번호와 다른 값이기 때문에 해당하는 제품 정보를 가져온다.
			var alldata = { "NO": array[i] };
			$.ajax({
				type:"get",
				url:"/view/select/recently",
				data:alldata,
				success:function(result){
					var length = $('#recently_contents_ul > li').length;
					var image = result.pds_Image.split(",");
					var url = "/resources/upload/products/images/"+result.pds_Reg_Date+"/"+result.pds_NO+"/"+image[0];
					var price = viewReplacePrice(result.pds_Price);
					if(length<8){
						/*alert(result.pds_NO);*/
						$('#recently_contents_ul').append(
							"<li><a href='/view?NO="+result.pds_NO+"' class='recently_a_tag' id='recently_"+result.pds_NO+"'>"
							+	"<span class='img_cover'></span>"
							+	"<span><img src='"+url+"'></span>"	
							+	"<p class='mini_name'>"+result.pds_NM+"</p>"
							+	"<p class='mini_price'>"+price+"원</p>"
							+"</a></li>"
						);
						if(result.pds_Sale != 0){
							var sale = viewReplacePrice(result.pds_Sale);
							var percent = 100 - Math.floor( result.pds_Sale / (result.pds_Price / 100) );
							$('#recently_'+result.pds_NO).children('p:nth-child(3)').after(
								'<p class="mini_percent">'+percent+'%</p>'
							);
							$('#recently_'+result.pds_NO).children('p:nth-child(4)').after(
								'<p class="mini_sale">'+sale+'원</p>'
							);
						}
					}else{
						//최근 본 상품이 8개가 채워지면 마지막 1개는 추가하지않고 넘어간다.
					}
					$('.recently_a_tag').children('p:nth-child(6)').css('text-decoration','line-through');
					$('.recently_a_tag').children('p:nth-child(6)').css('color', 'rgb(154, 154, 158)');
				},error:function(){
					
				}
			});
		}
	}
	
}


function slideviewimg(){
	var length = Number($('#view_contents_img').children('img').length);
	var count = 1;
	var margin = 0;
	setInterval(function (){
		$('.img_ul_btn').css('background', 'none');
		if(count>=1 && count<length){
			$('#view_contents_img').css("transform", 'translate3d(-'+(margin+675)+'px, 0px, 0px)');
			/*$('.img_ul_btn').eq(count).css('background', '#cccccc');*/
			$('.img_ul_btn[data-index='+count+']').css('background', '#cccccc');
			count += 1;
			margin = margin+675;
		}else if(count == length){
			$('#view_contents_img').css("transform", 'translate3d(0px, 0px, 0px)');
			$('.img_ul_btn[data-index=0]').css('background', '#cccccc');
			count = 1;
			margin = 0;
		}
	}, 3000);
}

function viewReplacePrice(here){
	var str = here.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	return str;
}

function viewimgchange(here){
	
}
//제품의 별점 조회
function viewstarpoint(){
	var alldata = { "NO": NO };	//jsp 스크립트 전역변수에서 NO값을 가져온다.
	$.ajax({
		type:"get",
		url:"/view/select/starpoint",
		data:alldata,
		success:function(result){
			var arr = result.split(",");
			$('.star_on').css('width', (arr[0]*20)+'%');
			$('#star_count').text("("+arr[1]+")");
			$('#view_review_box').children('h3').text("리뷰 "+arr[1]+"개");
			$('#star_point').text(arr[0]+" | 5.0");
		},error:function(){
			
		}
	});
}
//리뷰 조회 최신순
function reviewselect(){
	var alldata = { "NO": NO };
	$.ajax({
		type:"get",
		url:"/view/review/select",
		data:alldata,
		success:function(result){
			reviewappend(result);
		},error:function(){
			
		}
	});
}
//리뷰 조회 좋아요순
function revieworderlike(){
		var alldata = { "NO": NO };
	$.ajax({
		type:"get",
		url:"/view/review/orderlike",
		data:alldata,
		success:function(result){
			reviewappend(result);
		},error:function(){
			
		}
	});
}
//리뷰 쓰기 별점 버튼
function pushstarbtn(here){
	var percent = $(here).val();
	$('#editor_star_on_box > span').css('width', percent);
}
//리뷰 길이 파악
function editorlength(here){
	var str = $(here).val();
	var length = str.length;
	$('#review_editor_length').html(length);
}
//리뷰 업데이트
function reviewinsert(ac_NO, ac_NNM){
	var star = $('input[name=checkstar]:checked').attr('data-index');
	var text = $('#review_editor_input').val();
	var alldata = { "pds_NO": NO , "re_Writer": ac_NNM, "ac_NO": ac_NO, "re_Contents": text, "re_Star": star};
	$.ajax({
		type:"post",
		url:"/view/review/insert",
		data:alldata,
		headers:{"X-CSRF-TOKEN":$("input[name='_csrf']").val()},
		success:function(result){
			if(result==1){
				$('#review_editor_box').remove();
				reviewselect();
				viewstarpoint();
			}else if(result==0){
				alert("작성한 리뷰가 있거나 예기치 못한 오류 발생");
			}
			
		},error:function(){
			
		}
	});
}

function revieweditoropen(){
	var display = $('#review_editor_box').css('display');
	if(display=="none"){
		$('#review_editor_box').slideDown(500);
	}else{
		$('#review_editor_box').slideUp(500);
	}

}

function likeupdate(ob, ac_NO){
	var writer_NO = $(ob).children('input').attr('value1');
	var re_NO = $(ob).children('input').attr('value2')
	if(ac_NO == writer_NO){
		alert("자기가 쓴 리뷰에는 좋아요를 할 수 없습니다.");
	}else{
		alldata = {"re_NO": re_NO, "ac_NO": ac_NO};
		$.ajax({
			type:"post",
			url:"/view/review/like",
			data:alldata,
			headers:{"X-CSRF-TOKEN":$("input[name='_csrf']").val()},
			success:function(result){
				if(result == 0){
					//좋아요 +1 성공
					alert("좋아요 했습니다.");
					$(ob).children('span:nth-child(1)').attr('class', 'ryan_on_img');
					var count = Number($(ob).next('span:nth-child(2)').html())+1;
					$(ob).next('span:nth-child(2)').html(count);
				}else if(result == 1){
					alert("예기치 못한 오류로 좋아요 실패");
				}else if(result == 2){
					alert("좋아요 취소합니다.");
					$(ob).children('span:nth-child(1)').attr('class', 'ryan_off_img');
					var count = Number($(ob).next('span:nth-child(2)').html())-1;
					$(ob).next('span:nth-child(2)').html(count);
				}
			},error:function(){
				alert("예기치 못한 오류 발생");
			}
		});
	}
}
function reviewmenu(here, str){
	if(str=="new"){
		reviewselect();
	}else if(str=="like"){
		revieworderlike();
	}
	$('.reviewmenu').attr('id','reviewmenu_off');
	$(here).attr('id','reviewmenu_on');
}

function reviewappend(result){
	if(result.length>0){
		$('#review_menu_btn_box').css('display','block');
		$('#review_list_title').remove();
		$('#review_list_ul').empty();
	}
	for(var i=0; i<result.length; i++){
		var str = result[i].re_Like_List;
		var arr = "";
		var check = false;
		if(str!=null){
			arr = str.split(",");
			for(var b=0; b<arr.length; b++){
				if(arr[b]==ac_NO){
					check = true;
				}
			}
		}
		if(!check){
			var percent = ( result[i].re_Star * 20 )+"%;";
			$('#review_list_ul').append(
				'<li class="review_list_li">'
				+	'<div>'+result[i].re_Writer+'</div>'
				+	'<div class="review_star_box">'
				+		'<div class="review_star_off_box">'
				+			'<span class="review_star_off"></span>'
				+		'</div>'
				+		'<div class="review_star_on_box">'
				+			'<span class="review_star_on" style="width:'+percent+'"></span>'
				+		'</div>'
				+	'</div>'
				+	'<div class="review_date_box">'+result[i].re_Reg_Date+'</div>'
				+	'<pre class="review_text_box">'+result[i].re_Contents+'</pre>'
				+	'<div class="review_like_box">'
				+		'<button type="button" class="review_like_btn" onclick="loginchecklike(this)"><span class="ryan_off_img"></span><span>좋아요</span>'
				+			'<input type="hidden" value1='+result[i].ac_NO+' value2='+result[i].re_NO+' value3='+result[i].re_List+'>'
				+		'</button>'
				+		'<span>'+result[i].re_Like+'</span>'
				+		'<span>명이 좋아했어요.</span>'
				+	'</div>'
				+'</li>'
			);
		}else{
			var percent = ( result[i].re_Star * 20 )+"%;";
			$('#review_list_ul').append(
				'<li class="review_list_li">'
				+	'<div>'+result[i].re_Writer+'</div>'
				+	'<div class="review_star_box">'
				+		'<div class="review_star_off_box">'
				+			'<span class="review_star_off"></span>'
				+		'</div>'
				+		'<div class="review_star_on_box">'
				+			'<span class="review_star_on" style="width:'+percent+'"></span>'
				+		'</div>'
				+	'</div>'
				+	'<div class="review_date_box">'+result[i].re_Reg_Date+'</div>'
				+	'<pre class="review_text_box">'+result[i].re_Contents+'</pre>'
				+	'<div class="review_like_box">'
				+		'<button type="button" class="review_like_btn" onclick="loginchecklike(this)"><span class="ryan_on_img"></span><span>좋아요</span>'
				+			'<input type="hidden" value1='+result[i].ac_NO+' value2='+result[i].re_NO+' value3='+result[i].re_List+'>'
				+		'</button>'
				+		'<span>'+result[i].re_Like+'</span>'
				+		'<span>명이 좋아했어요.</span>'
				+	'</div>'
				+'</li>'
			);
		}
	}
}