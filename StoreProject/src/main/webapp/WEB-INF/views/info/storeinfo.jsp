<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
	<!-- jquery -->
	<script src="https://code.jquery.com/jquery-3.4.1.min.js" ></script>
	<!-- css -->
	<link href="/resources/css/info/storeinfo.css" rel="stylesheet">
	<!-- script -->
	<script src="/resources/script/info/storeinfo.js"></script>
	<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAsZIomaEd56YnhUse9gDznwePO9r6Zrbg&callback=initMap"></script>

	
<title>스토어 프로젝트</title>

</head>
<body>
	<%@include file="../includes/cover.jsp" %>
	<div id="storeinfo_box">
		<%@include file="infoheader.jsp" %>
		<%@include file="storeinfoSlide.jsp" %>
		<div id="storeinfo_language_box">
			<span>한국어</span>
		</div>
		<div id="storeinfo_cover_box">
		</div>
			
		<div id="storeinfo_tab_box">
			<ul>
				<li><a class="storeinfo_Country">스토어 전체</a></li>
				<li><a class="storeinfo_Country">한국</a></li>
				<li><a class="storeinfo_Country">일본</a></li>
			</ul>
		</div>
		<div id="storeinfo_tab_content_box">
			
		</div>
		<div id="storeinfo_banner_charinfo_box">
			<a href="/info/char">
				<img src="/resources/img/info/storeinfo/banner_charInfo.png" alt="매장안내 배너 이미지">
			</a>
		</div>
	</div>
	<%@include file="../includes/footer.jsp" %>
</body>
</html>