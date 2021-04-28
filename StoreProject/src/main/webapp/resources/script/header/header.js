/**
 *
 */
$(document).ready(function(){
	/*localStorage.clear();*/
	/* 사용자 계정 권한 관련 버튼 변경 함수 호출 */
	headerUserBtnGrant();

});

/* 사용자 계정 권한 관련 버튼 변경 */
function headerUserBtnGrant(){
	/* 비회원 일 때 */
	var headerUserDiv = $('#header_user_box');
	headerUserDiv.children('ul').children('li:nth-child(2)').children('a').css('cursor','not-allowed');
	headerUserDiv.children('ul').children('li:nth-child(2)').children('a').css('color','#9A9A9E');
	headerUserDiv.children('ul').children('li:nth-child(3)').children('a').css('cursor','not-allowed');
	headerUserDiv.children('ul').children('li:nth-child(3)').children('a').css('color','#9A9A9E');
	headerUserDiv.children('ul').children('li:nth-child(4)').children('a').css('cursor','not-allowed');
	headerUserDiv.children('ul').children('li:nth-child(4)').children('a').css('color','#9A9A9E');
	headerUserDiv.children('ul').children('li:nth-child(5)').children('a').css('cursor','not-allowed');
	headerUserDiv.children('ul').children('li:nth-child(5)').children('a').css('color','#9A9A9E');
	headerUserDiv.children('ul').children('li:nth-child(6)').children('a').css('cursor','not-allowed');
	headerUserDiv.children('ul').children('li:nth-child(6)').children('a').css('color','#9A9A9E');
}
/* 카테고리 마우스 오버 창 열림 */
function headerCategoryOver(){
	var category = $('#header_category_box');
	if(category.css("display")=='none'){
		category.fadeIn();
	}
	
}

/* 카테고리 이미지 아이콘 마우스 오버 효과  */
function headerCategoryImgEnter(here){
	var h = here;
	var src = $(h).children('img').attr('src');
	var substr_src = src.substr(0,src.length-7);
	var change_src = substr_src+"on.png";
	$(h).children('img').attr('src', change_src);
	
	$(h).children('span').css("font-weight","bold");
	$(h).children('span').css("text-shadow","1px 1px 1px gray");
}
/* 카테고리 이미지 아이콘 마우스 리브 효과  */
function headerCategoryImgLeave(here){
	var h = here;
	var src = $(h).children('img').attr('src');
	var substr_src = src.substr(0,src.length-6);
	var change_src = substr_src+"off.png";
	$(h).children('img').attr('src', change_src);
	
	$(h).children('span').css("font-weight","normal");
	$(h).children('span').css("text-shadow","none");
}
/* 유저 아이콘 마우스 오버 창 열림*/
function headerUserOver(){
	$("#header_user_box").css('display','block');
}
/* 유저 아이콘 마우스 리브 창 닫음*/
function headerUserLeave(){
	$("#header_user_box").css('display','none');
}

