<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib uri="http://www.springframework.org/security/tags"
	prefix="sec"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<title>스토어 프로젝트</title>
	<!-- jquery -->
	<script
		src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
	<!-- css -->
	<link href="/resources/css/card.css" rel="stylesheet">
	<!-- script -->
	<script src="/resources/script/card.js"></script>
	<script src="//cdn.iframe.ly/embed.js?api_key=2c35a8916a4273aabd5118" async></script>
</head>
<body>
	<%@include file="includes/header.jsp"%>
	<%@include file="includes/cover.jsp" %>
	<div id="card_box">
		<div id="card_contents_box">
			<pre>
				${cardVO.card_Contents}
			</pre>
		</div>
		<div id="card_products_box">
			<ul id="card_products_ul">
			
			</ul>
		</div>
	</div>
	<%@include file="includes/footer.jsp"%>
	
	<script>
		var pds_arr =  "${cardVO.card_Products}";
	</script>
</body>
</html>