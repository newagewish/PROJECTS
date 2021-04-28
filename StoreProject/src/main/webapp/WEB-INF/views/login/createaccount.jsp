<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<!-- <html xmlns="http://www.w3.org/1999/xhtml" xmlns:th="http://www.thymeleaf.org"> -->
<html lang="ko">
<head>
<meta charset="UTF-8">
<title>스토어 프로젝트</title>
	<!-- jquery -->
	<script src="https://code.jquery.com/jquery-3.4.1.min.js" ></script>
	<!-- css -->
	<link href="/resources/css/login/createaccount.css" rel="stylesheet">
</head>
<body>
	<%@include file="../includes/header.jsp" %>
	<div id="createaccount_box">
		<%@include file="agreement.jsp" %>
		<%@include file="information.jsp" %>
	</div>
	<div id="createaccount_hold_box">
		<div id="createaccount_hold_agreement_age_box">
			<div>
				<h3>만 14세 미만인가요?</h3>
				<p>만 14세 미만은 보호자 동의가 필요합니다.</p>
				<button type="button" onclick="agreementageok()">네</button>
				<button type="button" onclick="agreementageno()">아니오</button>
				<div onclick="parentsExit(this)">
					<button type="button">X</button>
				</div>
			</div>
		</div>
		<div id="createaccount_hold_agreement_required_box">
			<div>
				<p>필수 항목은 반드시 선택하셔야 가입이 가능합니다.</p>
				<button type="button" onclick="agreementrequiredok()">확인</button>
			</div>
		</div>
		<%@include file="agreementterm.jsp" %>
		<%@include file="agreementprivacy.jsp" %>
		<%@include file="agreementprofile.jsp" %>
		<div id="createaccount_hold_information_email_box">
			<div>
				<p>인증번호를 받지 못하셨나요?</p>
				<p>
					이메일이 정확한지 확인해주세요.<br>
					메일서비스에 따라 인증번호 발송이 늦어질 수 있습니다.<br>
					계속해서 이메일이 오지 않으면 다시 인증번호를<br>
					요청해주세요.
				</p>
				<button type="button" onclick="replaysendcertifyemail(this)">인증번호 재발송</button>
				<button type="button" onclick="changecertifyemail(this)">다른 메일로 인증</button>
				<div onclick="parentsExit(this)">
					<button type="button">X</button>
				</div>
			</div>
		</div>
	</div>
	<%@include file="../includes/footer.jsp" %>
</body>
</html>	