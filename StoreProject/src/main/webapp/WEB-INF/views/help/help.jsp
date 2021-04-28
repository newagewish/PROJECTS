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
		<link href="/resources/css/help/help.css" rel="stylesheet">
	<!-- script -->
		<script src="/resources/script/help/help.js"></script>
</head>
<body>
	<%@include file="../includes/header.jsp" %>
	<%@include file="../includes/cover.jsp" %>
	<div id="help_box">
		<div id="help_banner_box">
			<span>고객센터</span>
		</div>
		<div id="help_tab_box">
			<button id="help_tab_notice" type="button">공지사항</button>
			<button id="help_tab_faq" type="button">FAQ</button>
		</div>
		<div id="help_content_box">
		
		</div>
		<!-- <div class="help_notice_content">
			<div class="help_notice_content_btn">
				<div class="help_notice_title"></div>
				<div class="help_notice_date" id="help_notice_date_off"></div>
			</div>
			<div class="help_notice_text_box">
				<div class="help_notice_text">
				</div>
			</div>
		</div>
		<div class="help_faq_content">
			<div class="help_faq_content_btn">
				<div class="help_faq_title"></div>
				<div class="help_faq_category" id="help_faq_category_off"></div>
			</div>
			<div class="help_faq_text_box">
				<div class="help_faq_text">
				</div>
			</div>
		</div> -->
		<div id="help_paging_box">
			<!-- <div id="help_paging_arrow_box">
				<span id="help_paging_arrow_left">
					<span></span>
				</span>
				<span id="help_paging_arrow_right">
					<span></span>
				</span>
			</div> -->
		</div>
	</div>
	<%@include file="../includes/footer.jsp" %>
</body>
</html>