<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
	<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<title>스토어 프로젝트</title>
	<!-- jquery -->
		<script src="https://code.jquery.com/jquery-3.4.1.min.js" ></script>
	<!-- css -->
	 	<link href="/resources/css/admin/management.css" rel="stylesheet">
	<!-- script -->
	<!-- 	<script src="/resources/script/help/help.js"></script> -->

</head>
<body>
	<%@include file="../includes/header.jsp" %>
	<div id="management_box">
		<div id="management_header_box">
			<h1>홈페이지 관리</h1>
		</div>
		<div id="management_content_box">
			<button type="button" class="management_content_btn" id="category_management_btn" onclick="location.href='category'">
				<span>카테고리 관리</span>
				<span></span>
			</button>
			<button type="button" class="management_content_btn" id="product_management_btn" onclick="location.href='productsAdd'">
				<span>상품 추가</span>
				<span></span>
			</button>
		</div>
	</div>
	<%@include file="../includes/footer.jsp" %>
</body>
</html>