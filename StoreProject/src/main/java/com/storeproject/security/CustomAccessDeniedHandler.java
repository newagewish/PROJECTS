package com.storeproject.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;

import lombok.extern.log4j.Log4j;

@Log4j
public class CustomAccessDeniedHandler implements AccessDeniedHandler{	

	/* 권환 없는 계정 로그인 에러 */
	@Override
	public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
		log.error("Access Denined Handler");
		log.error("Redirect >> CommonController >> accessDenied");
		log.error(accessDeniedException);
		response.sendRedirect("/security/accessDeniedError");
	}

}
