<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
    <%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec" %>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
<h1>/security/all page</h1>

<sec:authorize access="isAnonymous()">
	<a href="/login/loginPage">로그인</a>
</sec:authorize>
<sec:authorize access="isAuthenticated()">
	<a href="/logout">로그아웃</a>
	<p>a tag 사용으로 로그아웃은 안됨 임시페이지 테스트 용</p>
</sec:authorize>
</body>
</html>