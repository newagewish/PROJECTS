package com.storeproject.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import lombok.extern.log4j.Log4j;

@Log4j
public class CustomLoginSuccessHandler implements AuthenticationSuccessHandler{
	/* 로그인 성공 */
	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication auth) throws IOException, ServletException {
		log.warn("로그인 성공");
		HttpSession httpSession = request.getSession(false);
		Object url = httpSession.getAttribute("targetURL");
		log.warn(url);
		if(url!=null) {
			response.sendRedirect((String) url);
		}else {
			response.sendRedirect("/");
		}
	}
}
