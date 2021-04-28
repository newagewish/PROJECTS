/**
 * 
 */

/*$(document).ready(function() {
});*/

/*스크롤시 매니지먼트 움직임 고정 효과*/
/* position fixed로 해결 */
/*$(window).scroll(function() {
	$("#managementbar_box").css("transition-duration", "0s");
	var position = $(window).scrollTop()+"px";
	$("#managementbar_box").css("top", position);
	setTimeout(function() {
  		$("#managementbar_box").css("transition-duration", "1s");
	}, 1000);
});*/

function managementbarbtn(){
	var transform = $('#mb_box').css("transform");
	if(transform == "none"){
		$('#mb_box').css("transform", "translateX(200px)");
		$('#mb_open_box').css("transform", "translateX(200px)");
		$('#header_bar').css("padding-left", "200px");
		$('#mini_bar').css("padding-left", "200px");
		$('#management_cover_box').css("padding-left", "200px");
		$("#gear_icon").css('transform', 'rotate(360deg)');
	}else{
		$('#mb_box').css("transform", "none");
		$('#mb_open_box').css("transform", "none");
		$('#header_bar').css("padding-left", "0px");
		$('#mini_bar').css("padding-left", "0px");
		$('#management_cover_box').css("padding-left", "0px");
		$("#gear_icon").css('transform', 'rotate(0deg)');
		
		
	}
}

function switchInBoxProducts(){
	var etc = $("#mb_in_products_add_box").css('display');
	if(etc=="block"){
		$("#mb_in_products_add_box").slideUp(500);
	}
	else{
		$("#mb_in_products_add_box").slideDown(500);
	}
}

function switchInBoxCard(){
	var etc = $("#mb_in_card_add_box").css('display');
	if(etc=="block"){
		$("#mb_in_card_add_box").slideUp(500);
	}
	else{
		$("#mb_in_card_add_box").slideDown(500);
	}
}