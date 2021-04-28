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
	<link href="/resources/css/home.css" rel="stylesheet">
	<!-- script -->
	<script src="/resources/script/home.js"></script>
</head>
<body>
	<%@include file="includes/header.jsp" %>
	<div id="mini_bar_box">
		<div id="mini_bar">
			<button type="button" id="mini_home_btn" onclick="productshome(this)">홈</button>
			<button type="button" id="mini_new_btn" onclick="productsnew(this)">신규</button>
			<button type="button" id="mini_vogue_btn" onclick="productsvogue(this)">인기</button>
			<button type="button" id="mini_sale_btn" onclick="productssale(this)">세일</button>
			<button type="button" id="mini_all_btn" onclick="productsall(this)">전체</button>
		</div>
	</div>
	<%@include file="includes/cover.jsp" %>
	<div id="home_box">
		<div id="home_contents_cover">
			<div id="home_contents_box">
				<div class="mini_contents_box" id="contents_home_box">
					<div></div>
					<div></div>
					<div></div>
				</div>
				<div class="mini_contents_box" id="contents_new_box">
					<span class="box_info1">
						최근에 업데이트 했어요
					</span>
					<span class="box_info2">
						새로나온 친구들
					</span>
				</div>
				<div class="mini_contents_box" id="contents_vogue_box">
				</div>
				<div class="mini_contents_box" id="contents_sale_box">
					<span class="box_info1">
						세일 상품을 모두 한곳에
					</span>
					<span class="box_info2">
						지금은 세일 중
					</span>
				</div>
				<div class="mini_contents_box" id="contents_all_box">
					<span>총</span>
					<span id="serch_count"></span>
					<span>개의 상품이 조회되었습니다.</span>
					<button id="all_select_charater" value="all" onclick="opencharaterbox()">
						<span id="charater_btn">캐릭터 전체</span>
						<span></span>
					</button>
					<button id="all_select_option" value="sales" onclick="openoptionbox()">
						<span id="option_btn">판매량순</span>
						<span></span>
					</button>
					<div id="all_select_charater_box">
						<button onclick="allcharater(this)" value="all" disabled><span>캐릭터전체 테스트 commit</span></button>
						<button onclick="allcharater(this)" value="ryan">
							<img src="/resources/img/includes/header/category_ryan_off.png" alt="라이언 캐릭터 아이콘">
							<span>라이언</span>
						</button>
						<button onclick="allcharater(this)" value="apeach">
							<img src="/resources/img/includes/header/category_apeach_off.png" alt="어피치 캐릭터 아이콘">
							<span>어피치</span>
						</button>
						<button onclick="allcharater(this)" value="muzi">
							<img src="/resources/img/includes/header/category_muzi_off.png" alt="무지 캐릭터 아이콘">
							<span>무지</span>
						</button>
						<button onclick="allcharater(this)" value="frodo">
							<img src="/resources/img/includes/header/category_frodo_off.png" alt="프로도 캐릭터 아이콘">
							<span>프로도</span>
						</button>
						<button onclick="allcharater(this)" value="neo">
							<img src="/resources/img/includes/header/category_neo_off.png" alt="네오 캐릭터 아이콘">
							<span>네오</span>
						</button>
						<button onclick="allcharater(this)" value="tube">
							<img src="/resources/img/includes/header/category_tube_off.png" alt="튜브 캐릭터 아이콘">
							<span>튜브</span>
						</button>
						<button onclick="allcharater(this)" value="jayg">
							<img src="/resources/img/includes/header/category_jayg_off.png" alt="제이지 캐릭터 아이콘">
							<span>제이지</span>
						</button>
						<button onclick="allcharater(this)" value="con">
							<img src="/resources/img/includes/header/category_con_off.png" alt="콘 캐릭터 아이콘">
							<span>콘</span>
						</button>
						<br>
						<button onclick="allcharater(this)" value="angmond">
							<img src="/resources/img/includes/header/niniz_angmond.png" alt="앙몬드 캐릭터 아이콘">
							<span>앙몬드</span>
						</button>
						<button onclick="allcharater(this)" value="cob_bbanya">
							<img src="/resources/img/includes/header/niniz_cob_bbanya.png" alt="콥&빠냐 캐릭터 아이콘">
							<span>콥&빠냐</span>
						</button>
						<button onclick="allcharater(this)" value="jordy">
							<img src="/resources/img/includes/header/niniz_jordy.png" alt="죠르디 캐릭터 아이콘">
							<span>죠르디</span>
						</button>
						<button onclick="allcharater(this)" value="kero_berony">
							<img src="/resources/img/includes/header/niniz_kero_berony.png" alt="케로&베로니 캐릭터 아이콘">
							<span>케로&베로니</span>
						</button>
						<button onclick="allcharater(this)" value="penda_jr">
							<img src="/resources/img/includes/header/niniz_penda_jr.png" alt="팬다주니어 캐릭터 아이콘">
							<span>팬다주니어</span>
						</button>
						<button onclick="allcharater(this)" value="scappy">
							<img src="/resources/img/includes/header/niniz_scappy.png" alt="스카피 캐릭터 아이콘">
							<span>스카피</span>
						</button>
					</div>
					<div id="all_select_option_box">
						<button onclick="alloption(this)" value="sales" disabled>판매량순</button>
						<button onclick="alloption(this)" value="new">신상품순</button>
						<button onclick="alloption(this)" value="low">낮은 가격순</button>
						<button onclick="alloption(this)" value="high">높은 가격순</button>
					</div>
					<div id="all_select_box">
						
					</div>
				</div>
			</div>
		</div>
	</div>
	<%@include file="includes/footer.jsp" %>
</body>
</html>