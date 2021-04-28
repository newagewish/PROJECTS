<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec" %>
	<!-- css -->
	<link href="/resources/css/includes/header.css" rel="stylesheet">
	<!-- script -->
	<script src="/resources/script/header/header.js"></script>
	
<div id="header_box">
	<div id="header_bar">
		<ul id="header_left_ul">
			<li class="header_left_ul_li" onmouseover="headerCategoryOver()" onmouseleave="headerCategoryLeave()"><span>카테고리</span><span>▼</span>
					<!-- 마우스 오버시 카테고리 박스 -->
					<%@include file="headerCategory.jsp" %>
			</li>
			<li class="header_left_ul_li"><a href="/info/store">매장안내</a></li>
			<li class="header_left_ul_li"><a href="/help">고객센터</a></li>
		</ul>
		<div id="header_title_box"><a href="/" id="header_title"><img src="/resources/img/includes/header/storeproject.png" alt="홈 이미지"></a></div>
		<ul id="header_right_ul">
			<li>
				<div id="header_bar_search_box">
					<button data-oper='search'><img src="/resources/svg/header/header_search.svg" alt="검색 아이콘"></button>
					<input type="text" id="header_bar_search_input" placeholder="무엇을 찾으세요?">
				</div>
			</li>
			<li>
				<!-- 제외 모바일 떄문에 -->
				<!-- <a href="/login/signin"><img src="/resources/svg/header/header_user.svg" id="header_bar_search_box_svg_user" onmouseover="headerUserOver()" onmouseleave="headerUserLeave()"></a> -->
				<img src="/resources/svg/header/header_user.svg" id="header_bar_search_box_svg_user" onmouseover="headerUserOver()" onmouseleave="headerUserLeave()" alt="유저 아이콘">
				<!-- 마우스 오버시 유저 박스 -->
				<%@include file="headerUser.jsp" %>
			</li>
			<li>
				<img src="/resources/svg/header/header_cart.svg" id="header_bar_search_box_svg_cart" alt="장바구니 아이콘">
			</li>
		</ul>
	</div>
</div>
