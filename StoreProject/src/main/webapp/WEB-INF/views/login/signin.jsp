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
	<link href="/resources/css/login/signin.css" rel="stylesheet">
</head>
<body>
	<%@include file="../includes/header.jsp" %>
	<sec:authorize access="isAuthenticated()">
		<script>
			var signurl = localStorage.getItem("signURL");
			if(signurl==null){
				location.replace("/mypage/");
			}else{
				location.replace(signurl);
			}
		</script>
	</sec:authorize>
	<%@include file="../includes/cover.jsp" %>
	<div id="signin_box">
		<div id="signin_greetings_box">
			<div id="signin_greetings_banner_box">
				<div id="signin_greetings_banner_text">
					<h2>
						<em>오늘도 힘차게!!</em>
						로그인을 해주세요
					</h2>
				</div>
				<div id="signin_greetings_banner_img">
				
				</div>
			</div>
		</div>
		<div id="signin_info_box">
			<div id="signin_info_btn_box">
				<button onclick="setsession()"><a href="/login/loginPage">스토어 프로젝트 계정으로 로그인</a></button>
			</div>
			<div id="signin_info_text_box">
				<strong>고객님께 안내 드립니다.</strong>
				<ul>
					<li>
						스토어 프로젝트 고객님께 다양한 혜택을 드리고자 스토어프로젝트 회원가입
                    	서비스를 도입하게 되었습니다.
                    	<br>
                    	스토어 프로젝트는 회원가입시 최소한의 정보만 수집합니다.
					</li>
					<li>
						기존 구매 고객님께서는 스토어 프로젝트 계정 로그인 후 추가정보를 입력 해주시면 구매이력과 주문 정보 등의 서비스를 동일하게 이용할 수 있습니다.
					</li>
				</ul>
			</div>
		</div>
	</div>
	<%@include file="../includes/footer.jsp" %>
	<script>
		function setsession(){
			localStorage.setItem("signURL", document.referrer);
		}
	</script>
</body>
</html>