/**
 * 
 */
function viewbarReplacePrice(here){
	var str = here.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	return str;
}

function openChoice(){
	var display = $('#vb_choice_list').css('display');
	if(display=="none"){
		$('#vb_choice_list').css('display', 'block');
		$('#choice_btn_img').attr("src", "/resources/svg/view/down.svg");
	}else{
		$('#vb_choice_list').css('display', 'none');
		$('#choice_btn_img').attr("src", "/resources/svg/view/up.svg");
	}
	
}
//옵션 추가
function addprice(here){
	$('#vb_price_list').css('display', 'block');
	var nm = $(here).html();
	var no = Number( $(here).attr('value') );
	var find = $('.'+no).length;
	//추가할 항목의 개수가 0이거나 1이상 일 때 조건문
	if(find==0){	//추가하려는 항목의 옵션번호로 된 div가 0개 일 때 동작
		$('#vb_price_list').append(
			'<div class="'+no+'">'
			+	'<button type="button" class="price_x_btn" onclick="removeOption(this)">X</button>'
			+	'<input type="text" class="price_nm" value="'+nm+'">'
			+	'<button type="button" class="price_minus_btn" onclick="minusCount(this)"><img src="/resources/svg/view/minus.svg"/></button>'
			+	'<input type="text" class="price_count" value="1" onchange="changePrice()" readonly>'
			+	'<button type="button" class="price_plus_btn" onclick="plusCount(this)"><img src="/resources/svg/view/plus.svg"/></button>'
			+'</div>'
		);
	}else{	//추가하려는 항목의 옵션번호로 된 div가 1개 이상 일 때 동작
		//패스
	}
	
	//가격 변동
	changePrice();
	$('#vb_choice_list').css('display', 'none');
	$('#choice_btn_img').attr("src", "/resources/svg/view/up.svg");
};

//가격변동
function changePrice(){
	var result = 0;
	var count = 0;
	$(".price_count").each(function(){
		count += Number($(this).val());
	});
	result = count * vb_price;
	
	$("#vb_price").attr('value', viewbarReplacePrice(result));
	$("#vb_hd_price").attr('value', result);
}
//옵션 수량 빼기
function minusCount(here){
	var count = Number($(here).nextAll('.price_count').attr('value'))-1;
	if(count>0){
		$(here).next('.price_count').attr('value' , count);
	}
	changePrice();
}
//옵션 수량 더하기
function plusCount(here){
	var count = Number($(here).prevAll('.price_count').attr('value'))+1;
	if(count>0){
		$(here).prev('.price_count').attr('value' , count );
	}
	changePrice();
}
//옵션 삭제
function removeOption(here){
	$(here).parent('div').remove();
	changePrice();
}