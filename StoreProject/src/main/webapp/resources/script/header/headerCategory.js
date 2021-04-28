/**
 * 
 */

$(document).ready(function(){
	/* 대표 카테고리 목록 호출 및 버튼 생성 */
	selectMainCategory();
	
});

function categoryhref(){
	location.href = "/list";
}
/* 대표 카테고리 호출 및 버튼 생성 */
function selectMainCategory(){
	$.ajax({
		type:"GET",
		url :"/header/ajax/selectmaincategory",
		success : function(result){
			for(var i=0 ; i<result.length ; i++){
				$('#header_main_category_ol').append(
						'<li><button value="'+result[i].main_column_NM+'" onclick="categoryhref()">'+result[i].main_category_NM+'</button>'
						+'<ol class="header_sub_category_ol">'
						/* 세부 카테고리 목록 호출 버튼 생성 */
						+selectSubCategory(result[i].main_category_NM, result[i].main_column_NM)
						+'</ol></li>'
				)
			}
			/* 카테고리 자식 마우스 오버 효과 추가 */
			var headerCategoryDiv = $('#header_category_box');
			/* 대표 카테고리 기능 추가 */
			headerCategoryDiv.children('ol').children('li').attr("onmouseover","headerCategoryLiOver(this)");
			headerCategoryDiv.children('ol').children('li').attr("onmouseleave","headerCategoryLiLeave(this)");
			/* 세부 카테고리 기능 추가 */
			headerCategoryDiv.children('ol').children('li').children('ol').children('li').attr("onmouseover","headerCategoryItemOver(this)");
			headerCategoryDiv.children('ol').children('li').children('ol').children('li').attr("onmouseleave","headerCategoryItemLeave(this)");
			/* 카테고리 이미지 아이콘 */
			headerCategoryDiv.children('div').children('.header_category_img_icon').attr("onmouseenter", "headerCategoryImgEnter(this)");
			headerCategoryDiv.children('div').children('.header_category_img_icon').attr("onmouseleave", "headerCategoryImgLeave(this)");
			/* 카테고리 자식 마우스 오버 효과 추가 끝 */
		},
		error : function(jqXHR, textStatus, errorThrown){
			
		}
	})
}

/* 세부 카테고리 목록 호출 버튼 생성 */
function selectSubCategory(maincategory, maincolumn){
	var alldata = { "main_category_NM" : maincategory, "main_column_NM" : maincolumn };
	var appendhtml = "";
	$.ajax({
		type:"GET",
		url :"/header/ajax/selectsubcategory",
		data:alldata,
		async: false,
		success:function(result){
			for(var i=0 ; i<result.length ; i++){
				appendhtml += "<li><button value='"+result[i].sub_column_NM+"' onclick='categoryhref()'>"+result[i].sub_category_NM+"</button></li>";
			}
		},error:function(jqXHR, textStatus, errorThrown){
			/*alert("예기치 못한 오류로 대표 카테고리를 호출하지 못했습니다.");*/
		}
	});
	return appendhtml;
}

/* 카테고리 마우스 리브  창 닫음 */
function headerCategoryLeave(){
	var category = $('#header_category_box');
	if(category.css("display")=='block'){
		category.fadeOut();
	}
}
/* 대표 카테고리 마우스 오버 글씨 효과 및 세부 카테고리 창 열림 */
function headerCategoryLiOver(here){
	var h = here;
	$(h).children('button').css("font-weight","bold");
	$(h).children('button').css("text-shadow","1px 1px 1px gray");
	
	$('.header_sub_category_ol').css("display", "none");
	$(h).children('ol').css("display","block");
	
	sessionStorage.setItem("categoryM", $(h).children('button').attr('value'));
}
/* 대표 카테고리 마우스 리브 글씨 효과 및 세부 카테고리 창 닫음 */
function headerCategoryLiLeave(here){
	var h = here;
	$(h).children('button').css("font-weight","normal");
	$(h).children('button').css("text-shadow","none");
	
	sessionStorage.removeItem("categoryM");
	sessionStorage.removeItem("categoryS");
	sessionStorage.removeItem("option");
}
/* 세부 카테고리 마우스 오버 글씨 효과  */
function headerCategoryItemOver(here){
	var h = here;
	$(h).children('button').css("font-weight","bold");
	$(h).children('button').css("text-shadow","1px 1px 1px gray");
	var val = $(h).children('button').attr('value')
	if(val=="sales" || val=="new" || val=="low" || val=="high"){
		sessionStorage.setItem("option", val);
	}else{
		sessionStorage.setItem("categoryS", val);
	}
	
}
/* 세부 카테고리 마우스 리브 글씨 효과  */
function headerCategoryItemLeave(here){
	var h = here;
	$(h).children('button').css("font-weight","normal");
	$(h).children('button').css("text-shadow","none");
	
	sessionStorage.removeItem("option");
	sessionStorage.removeItem("categoryS");
}