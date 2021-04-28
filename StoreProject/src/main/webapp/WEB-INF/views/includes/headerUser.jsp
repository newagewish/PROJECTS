<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
    <%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec" %>
	<!-- css -->
	<link href="/resources/css/includes/headerUser.css" rel="stylesheet">

<div id="header_user_box" onmouseover="headerUserOver()" onmouseleave="headerUserLeave()">
	<ul>
		<!-- 비회원 사용자 메뉴 -->
		<sec:authorize access="isAnonymous()">
			<li><button type="button" onclick="location.href='/login/loginPage'">로그인</button></li>
			<li><button type="button" disabled >주문내역</button></li>
			<li><button type="button" disabled >찜</button></li>
			<li><button type="button" disabled >취소 및 교환</button></li>
			<li><button type="button" disabled >포인트</button></li>
			<li><button type="button" disabled >1:1 문의</button></li>
			<li><button>비회원 주문조회</button></li>
			<li><button type="button">기프트카드 조회·환불</button></li>
		</sec:authorize>
		<!-- 로그인 사용자 메뉴 -->
		<sec:authorize access="hasRole('ROLE_MEMBER')">
			<li><button type="button" >주문내역</button></li>
			<li><button type="button" >찜</button></li>
			<li><button type="button" >취소 및 교환</button></li>
			<li><button type="button" >포인트</button></li>
			<li><button type="button" >1:1 문의</button></li>
			<li><button type="button" onclick="location.href='/mypage/'">개인정보</button></li>
			<li><button type="button">기프트카드 조회·환불</button></li>
		</sec:authorize>
		<!-- 관리자 메뉴 -->
		<sec:authorize access="hasRole('ROLE_ADMIN')">
			<li><button type="button" onclick="location.href='/admin/management'">홈페이지 관리</button></li>
			<li><button type="button">고객센터 관리</button></li>
		</sec:authorize>
		<sec:authorize access="isAuthenticated()">
			<li>
				<form action="/logout" method="post">
					<input type="hidden" name="${_csrf.parameterName }" value="${_csrf.token }"/>
					<input type="submit" value="로그아웃">
				</form>
			</li>
		</sec:authorize>
	</ul>
	<input type="hidden" name="${_csrf.parameterName }" value="${_csrf.token }"/>
</div>