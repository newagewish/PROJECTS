<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec" %>

<!DOCTYPE html>
<html lang="ko">
<head>
	<title>스토어 프로젝트</title>
	<!-- jquery -->
	<script src="https://code.jquery.com/jquery-3.4.1.min.js" ></script>
	<!-- css -->
	<link href="/resources/css/list.css" rel="stylesheet">
	<!-- script -->
	<script src="/resources/script/list.js"></script>
</head>
<body>
	<%@include file="includes/header.jsp" %>
	<%@include file="includes/cover.jsp" %>
	<div id="list_box">
		<div id="list_banner_img_box">
			<span id="list_banner_NM">전체</span>
			<span id="list_banner_Img"></span>
		</div>
		<div id="list_menu_box">
			<div id="list_menu">
			</div>
		</div>
		<div id="list_contents">
			<span>총</span>
			<span id="serch_count"></span>
			<span>개의 상품이 조회되었습니다.</span>
			<button id="list_charater" value="all" onclick="opencharaterbox()">
					<span id="charater_btn">캐릭터 전체</span>
					<span></span>
			</button>
			<button id="list_option" value="new" onclick="openoptionbox()">
					<span id="option_btn">신상품순</span>
					<span></span>
			</button>
			<div id="list_charater_box">
				<button onclick="changeCharater(this)" value="all" disabled>캐릭터전체</button>
						<button onclick="changeCharater(this)" value="ryan">
							<img src="/resources/img/includes/header/category_ryan_off.png" alt="라이언 캐릭터 아이콘">
							<span>라이언</span>
						</button>
						<button onclick="changeCharater(this)" value="apeach">
							<img src="/resources/img/includes/header/category_apeach_off.png" alt="어피치 캐릭터 아이콘">
							<span>어피치</span>
						</button>
						<button onclick="changeCharater(this)" value="muzi">
							<img src="/resources/img/includes/header/category_muzi_off.png" alt="무지 캐릭터 아이콘">
							<span>무지</span>
						</button>
						<button onclick="changeCharater(this)" value="frodo">
							<img src="/resources/img/includes/header/category_frodo_off.png" alt="프로도 캐릭터 아이콘">
							<span>프로도</span>
						</button>
						<button onclick="changeCharater(this)" value="neo">
							<img src="/resources/img/includes/header/category_neo_off.png" alt="네오 캐릭터 아이콘">
							<span>네오</span>
						</button>
						<button onclick="changeCharater(this)" value="tube">
							<img src="/resources/img/includes/header/category_tube_off.png" alt="튜브 캐릭터 아이콘">
							<span>튜브</span>
						</button>
						<button onclick="changeCharater(this)" value="jayg">
							<img src="/resources/img/includes/header/category_jayg_off.png" alt="제이지 캐릭터 아이콘">
							<span>제이지</span>
						</button>
						<button onclick="changeCharater(this)" value="con">
							<img src="/resources/img/includes/header/category_con_off.png" alt="콘 캐릭터 아이콘">
							<span>콘</span>
						</button>
						<br>
						<button onclick="changeCharater(this)" value="angmond">
							<img src="/resources/img/includes/header/niniz_angmond.png" alt="앙몬드 캐릭터 아이콘">
							<span>앙몬드</span>
						</button>
						<button onclick="changeCharater(this)" value="cob_bbanya">
							<img src="/resources/img/includes/header/niniz_cob_bbanya.png" alt="콥&빠냐 캐릭터 아이콘">
							<span>콥&빠냐</span>
						</button>
						<button onclick="changeCharater(this)" value="jordy">
							<img src="/resources/img/includes/header/niniz_jordy.png" alt="죠르디 캐릭터 아이콘">
							<span>죠르디</span>
						</button>
						<button onclick="changeCharater(this)" value="kero_berony">
							<img src="/resources/img/includes/header/niniz_kero_berony.png" alt="케로&베로니 캐릭터 아이콘">
							<span>케로&베로니</span>
						</button>
						<button onclick="changeCharater(this)" value="penda_jr">
							<img src="/resources/img/includes/header/niniz_penda_jr.png" alt="팬다주니어 캐릭터 아이콘">
							<span>팬다주니어</span>
						</button>
						<button onclick="changeCharater(this)" value="scappy">
							<img src="/resources/img/includes/header/niniz_scappy.png" alt="스카피 캐릭터 아이콘">
							<span>스카피</span>
						</button>
			</div>
			<div id="list_option_box">
				<button onclick="changeOption(this)" value="sales">판매량순</button>
				<button onclick="changeOption(this)" value="new" disabled>신상품순</button>
				<button onclick="changeOption(this)" value="low">낮은 가격순</button>
				<button onclick="changeOption(this)" value="high">높은 가격순</button>
			</div>
			<div id="list_select_box">
				
			</div>
		</div>
	</div>
	<%@include file="includes/footer.jsp" %>
</body>
</html>