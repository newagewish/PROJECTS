<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
    <%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec" %>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<title>스토어 프로젝트</title>
	<!-- jquery -->
		<script src="https://code.jquery.com/jquery-3.4.1.min.js" ></script>
	<!-- css -->
	 	<link href="/resources/css/mypage/mypage.css" rel="stylesheet">
	<!-- script -->
	<!-- 	<script src="/resources/script/help/help.js"></script> -->
</head>
<body>
	<%@include file="../includes/header.jsp" %>
	<div id="mypage_box">
		<div id="mypage_content_box">
			<div id="userinfo_box">
				<h1><sec:authentication property="principal.account.ac_NNM"/></h1>
				<p><sec:authentication property="principal.account.ac_ID"/></p>
				<a href="modify/">정보수정</a>
			</div>
			<div id="oderinfo_box">
				<div>
				</div>
				<div>
				</div>
				<div>
				</div>
				<div>
				</div>
			</div>
		</div>
	</div>
	<%@include file="../includes/footer.jsp" %>
</body>
</html>