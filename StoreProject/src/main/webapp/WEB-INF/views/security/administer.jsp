<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
    <%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec" %>
    
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8" http-equiv="Content-type" content="text/html;">
<title>Insert title here</title>
</head>
<body>
<h1>/security/administer page</h1>
<p>
	principal : <sec:authentication property="principal"/>
</p>
<p>
	AccountVO : <sec:authentication property="principal.account"/>
</p>
<p>
	사용자 아이디 : <sec:authentication property="principal.account.ac_ID"/>
</p>
<p>
	사용자 권한 리스트 : <sec:authentication property="principal.account.authorityList"/>
</p>
<p>
	사용자 성별 : <sec:authentication property="principal.account.ac_Gender"/>
</p>
<a href="/customLogout">Logout</a>
</body>
</html>