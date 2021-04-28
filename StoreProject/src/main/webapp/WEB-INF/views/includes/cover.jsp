<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec" %>

<sec:authorize access="permitAll">
	<%@include file="../admin/managementbar.jsp" %>
	<div id="management_cover_box">
</sec:authorize>