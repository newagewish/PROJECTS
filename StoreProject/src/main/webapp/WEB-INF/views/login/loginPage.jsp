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
	<link href="/resources/css/login/loginPage.css" rel="stylesheet">
	<!-- js -->
	<script src="/resources/script/login/loginPage.js" ></script>
</head>
<body>
	<%@include file="../includes/header.jsp" %>
	<%@include file="../includes/cover.jsp" %>
	<sec:authorize access="isAnonymous()">
		<%
			//로그인 성공시 이전 url로 되돌리 기위해서 스프링 시큐리티 커스텀 로그인 성공 핸들러에서 사용
			String refererurl = request.getHeader("referer");
			session.setAttribute("targetURL", refererurl);
		%>
	</sec:authorize>
	<sec:authorize access="isAuthenticated()">
		<script>
			location.replace("/mypage/");
		</script>
	</sec:authorize>
	<div id="login_box">
		<div id="login_banner_box">
			<div id="login_intro_box">
				<div>
					<strong>
						스토어 프로젝트 계정 하나로 충분합니다.
					</strong>
					<p>
						store project의 모든 서비스를 스토어 프로젝트 계정으로 이용해보세요!
					</p>
				</div>
			</div>
			<div id="login_form_box">
				<h1>
					StoreProject
				</h1>
				<form id="login_form" action="/login" method="post">
					<label for="login_email" id="login_email_label">스토어 프로젝트 계정(이메일)</label>
					<input id="login_email" type="text" name="email">
					<label for="login_password" id="login_password_label">비밀번호</label>
					<input id="login_password" type="password" name="password">
					<button id="login_btn" type="submit">로그인</button>
					<input type="hidden" name="${_csrf.parameterName }" value="${_csrf.token }"/>
				</form>
				<div id="login_account_box">
					<a href="/login/createaccount">회원가입</a>
					<a href="">비밀번호 찾기</a>
					<a href="">아이디 찾기</a>
				</div>
			</div>
		</div>
	</div>
</body>
</html>