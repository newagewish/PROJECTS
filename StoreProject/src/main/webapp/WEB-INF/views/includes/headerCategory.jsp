<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
	<!-- css -->
	<link href="/resources/css/includes/headerCategory.css" rel="stylesheet">
	<!-- script -->
	<script src="/resources/script/header/headerCategory.js"></script>
<div id="header_category_box">
	<ol id="header_main_category_ol">
		<li><button value="all" onclick="categoryhref()">전체</button>
			<ol class="header_sub_category_ol">
				<li><button value="sales" onclick="categoryhref()">판매량순</button></li>
				<li><button value="new" onclick="categoryhref()">신상품순</button></li>
				<li><button value="low" onclick="categoryhref()">낮은 가격순</button></li>
				<li><button value="high" onclick="categoryhref()">높은 가격순</button></li>
			</ol>
		</li>
		<!-- <li><a href="/">테마 기획전</a>
			<ol class="header_sub_category_ol">
				<li><a href="/">윈터 원더랜드</a></li>
				<li><a href="/">트와이스 에디션</a></li>
				<li><a href="/">폼폼프렌즈</a></li>
				<li><a href="/">포레스트 라이언</a></li>
				<li><a href="/">어텀스토리</a></li>
				<li><a href="/">허니프렌즈</a></li>
				<li><a href="/">레이지선데이</a></li>
				<li><a href="/">러블리 어피치</a></li>
				<li><a href="/">리틀 스케치북</a></li>
				<li><a href="/">버블버블</a></li>
				<li><a href="/">트레블 프렌즈</a></li>
			</ol>
		</li>
		<li><a href="/">토이</a>
			<ol class="header_sub_category_ol">
				<li><a href="/">미니인형</a></li>
				<li><a href="/">중형인형</a></li>
				<li><a href="/">대형인형</a></li>
				<li><a href="/">키체인인형</a></li>
				<li><a href="/">피규어/브릭</a></li>
			</ol>
		</li>
		<li><a href="/">리빙</a>
			<ol class="header_sub_category_ol">
				<li><a href="/">쿠션/방석</a></li>
				<li><a href="/">컵/텀블러</a></li>
				<li><a href="/">주방용품</a></li>
				<li><a href="/">미용/욕실용품</a></li>
				<li><a href="/">생활소품/잡화</a></li>
				<li><a href="/">펫 용품</a></li>
				<li><a href="/">탈취/방향제</a></li>
			</ol>
		</li>
		<li><a href="/">잡화</a>
			<ol class="header_sub_category_ol">
				<li><a href="/">신발</a></li>
				<li><a href="/">파우치/지갑/가방</a></li>
				<li><a href="/">패션소품</a></li>
				<li><a href="/">우산</a></li>
				<li><a href="/">시즌잡화</a></li>
			</ol>
		</li>
		<li><a href="/">문구</a>
			<ol class="header_sub_category_ol">
				<li><a href="/">필기구</a></li>
				<li><a href="/">필통/케이스</a></li>
				<li><a href="/">노트/메모</a></li>
				<li><a href="/">파일</a></li>
				<li><a href="/">스티커</a></li>
				<li><a href="/">데스크 소품</a></li>
				<li><a href="/">카드/엽서</a></li>
				<li><a href="/">선물 포장</a></li>
			</ol>
		</li>
		<li><a href="/">의류</a>
			<ol class="header_sub_category_ol">
				<li><a href="/">여성</a></li>
				<li><a href="/">남성</a></li>
				<li><a href="/">키즈</a></li>
				<li><a href="/">속옷</a></li>
				<li><a href="/">양말</a></li>
			</ol>
		</li>
		<li><a href="/">파자마</a>
			<ol class="header_sub_category_ol">
				<li><a href="/">여성</a></li>
				<li><a href="/">남성</a></li>
				<li><a href="/">키즈</a></li>
			</ol>
		</li>
		<li><a href="/">여행/레저</a>
			<ol class="header_sub_category_ol">
				<li><a href="/">여행</a></li>
				<li><a href="/">스포츠</a></li>
				<li><a href="/">물놀이</a></li>
			</ol>
		</li>
		<li><a href="/">생활테크</a>
			<ol class="header_sub_category_ol">
				<li><a href="/">노트북 액세서리</a></li>
				<li><a href="/">소형 전자</a></li>
				<li><a href="/">에어팟 케이스</a></li>
				<li><a href="/">에어팟 액세서리</a></li>
			</ol>
		</li>
		<li><a href="/">폰 액세사리</a>
			<ol class="header_sub_category_ol">
				<li><a href="/">휴대폰 케이스</a></li>
				<li><a href="/">휴대폰 액세서리</a></li>
				<li><a href="/">충전기</a></li>
			</ol>
		</li>
		<li><a href="/">식품</a>
			<ol class="header_sub_category_ol">
				<li><a href="/">스낵</a></li>
				<li><a href="/">음료</a></li>
			</ol>
		</li> -->
	</ol>
	<div id="header_category_img_box">
		<div class="header_category_img_icon">
			<img src="/resources/img/includes/header/category_ryan_off.png" alt="라이언 캐릭터 아이콘">
			<span>라이언</span>
		</div>
		<div class="header_category_img_icon">
			<img src="/resources/img/includes/header/category_apeach_off.png" alt="어피치 캐릭터 아이콘">
			<span>어피치</span>
		</div>
		<div class="header_category_img_icon">
			<img src="/resources/img/includes/header/category_muzi_off.png" alt="무지 캐릭터 아이콘">
			<span>무지</span>
		</div>
		<div class="header_category_img_icon">
			<img src="/resources/img/includes/header/category_frodo_off.png" alt="프로도 캐릭터 아이콘">
			<span>프로도</span>
		</div>
		<div class="header_category_img_icon">
			<img src="/resources/img/includes/header/category_neo_off.png" alt="네오 캐릭터 아이콘">
			<span>네오</span>
		</div>
		<div class="header_category_img_icon">
			<img src="/resources/img/includes/header/category_tube_off.png" alt="튜브 캐릭터 아이콘">
			<span>튜브</span>
		</div>
		<div class="header_category_img_icon">
			<img src="/resources/img/includes/header/category_jayg_off.png" alt="제이지 캐릭터 아이콘">
			<span>제이지</span>
		</div>
		<div class="header_category_img_icon">
			<img src="/resources/img/includes/header/category_con_off.png" alt="콘 캐릭터 아이콘">
			<span>콘</span>
		</div>
		
		<div id="header_category_img_banner">
			<div></div>
			<div></div>
			<div><img src="/resources/img/includes/header/niniz_banner.png" alt="니니즈 배너 이미지"></div>
			<div><img src="/resources/img/includes/header/cheezzzball_banner.png" alt="치즈볼 배너 이미지"></div>
		</div>
	</div>
</div>