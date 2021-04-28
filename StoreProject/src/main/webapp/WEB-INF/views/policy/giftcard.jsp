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
		<link href="/resources/css/policy/policy.css" rel="stylesheet">
</head>
<body>
	<%@include file="../includes/header.jsp" %>
	<div id="policy_box">
		<div id="policy_banner_box">
			<span>개인정보 보호</span>
		</div>
		<div id="policy_tab_box">
			<a href="/policy/privacy">개인정보처리방침</a>
			<a href="/policy/provision">이용약관</a>
			<a href="/policy/giftcard" style=color:black;>기프트카드 이용약관</a>
		</div>
	</div>
	<%@include file="../includes/footer.jsp" %>
</body>
</html>