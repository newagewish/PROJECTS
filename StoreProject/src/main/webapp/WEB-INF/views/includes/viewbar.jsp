<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib uri="http://www.springframework.org/security/tags"
	prefix="sec"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %> 
<head>
	<!-- jquery -->
	<script src="https://code.jquery.com/jquery-3.4.1.min.js" ></script>
</head>
	<!-- css -->
	<link href="/resources/css/includes/viewbar.css" rel="stylesheet">
	<!-- script -->
	<script src="/resources/script/includes/viewbar.js"></script>
	
<div id="viewbar_box">
	<div id="viewbar_contents_box">
		<div id="viewbar_choice_box"></div>
		<div id="viewbar_price_box"></div>
		<div id="viewbar_cart_box"></div>
	</div>
</div>

<script>
/* --------------------------------------------------------------- */
//viewbar
var op_arr = Number( ${fn:length(pdsOp)} );
var vb_price = ${pdsInfo.pds_Price};
var vb_sale = ${pdsInfo.pds_Sale};
if(vb_sale==0){
	var vb_replace_price = viewbarReplacePrice(vb_price);
}else{
	var vb_replace_price = viewbarReplacePrice(vb_sale);
	vb_price = ${pdsInfo.pds_Sale};
}
if(op_arr==1){
	$('#viewbar_choice_box').append(
		'<button type="button" id=vb_minus_btn onclick="minusCount(this)"><img src="/resources/svg/view/minus.svg"/></button>'
		+'<input type="text" id=vb_count class="price_count" value="1" onchange="changePrice()" readonly />'
		+'<button type="button" id=vb_plus_btn onclick="plusCount(this)"><img src="/resources/svg/view/plus.svg"/></button>'
	);
	$('#viewbar_price_box').append(
		'<input type="text" value="총 상품금액"/>'
		+'<input type="text" id="vb_price" value="'+vb_replace_price+'"/>'
		+'<input type="text" value="원"/>'
		+'<input type="hidden" id="vb_hd_price" value="'+vb_price+'"/>'
	);
	$('#viewbar_cart_box').append(
		'<button type="button"><img src="/resources/svg/view/cart.svg"/></button>'
		+'<button type="button">바로구매</button>'
	);
}else{
	$('#viewbar_contents_box').prepend(
		'<div id="vb_choice_list"></div>'
		+'<div id="vb_price_list"></div>'
	);
	$('#viewbar_choice_box').append(
		'<button type="button" id=vb_choice onclick="openChoice()">${pdsOp[0].op_Choice}<img id="choice_btn_img" src="/resources/svg/view/up.svg"/></button>'
	);
	$('#viewbar_price_box').append(
		'<input type="text" value="총 상품금액"/>'
		+'<input type="text" id="vb_price" value="0"/>'
		+'<input type="text" value="원"/>'
		+'<input type="hidden" id="vb_hd_price" value="0"/>'
	);
	$('#viewbar_cart_box').append(
		'<button type="button"><img src="/resources/svg/view/cart.svg"/></button>'
		+'<button type="button">바로구매</button>'
	);
	
	<c:forEach var="pdsOp" items="${pdsOp}">
		$('#vb_choice_list').append(
			'<button type="button" onclick="addprice(this)" value="${pdsOp.op_NO}">${pdsOp.op_NM}</button>'	
		);
	</c:forEach>
}
</script>