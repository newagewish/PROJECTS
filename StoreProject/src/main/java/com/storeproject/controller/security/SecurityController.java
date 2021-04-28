package com.storeproject.controller.security;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.extern.log4j.Log4j;

@Log4j
@RequestMapping("/security/*")
@Controller
public class SecurityController {
	
	@GetMapping("/all")
	public void doAll() {
		log.info("시큐리티 컨트롤러 일반 권한");
	}
	
	@GetMapping("/account")
	public void doAccount() {
		log.info("시큐리티 컨트롤러 계정 권한");
	}
	
	@GetMapping("/administer")
	public void doAdminister() {
		log.info("시큐리티 컨트롤러 관리자 권한");
	}
	
	@GetMapping("/accessDeniedError")
	public String accessDenied(Authentication auth, Model model) {
		log.info("시큐리티 Access Denied Error  : " + auth);
		
		model.addAttribute("msg","시큐리티 Access Denied Error");
		return "security/accessDeniedError";
	}
}
