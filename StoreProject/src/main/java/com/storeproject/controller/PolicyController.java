package com.storeproject.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j;

@Controller
@Log4j
@AllArgsConstructor
public class PolicyController {
	@RequestMapping(value = "/policy/privacy", method = RequestMethod.GET)
	public String policyprivacy() {
		/* log.info("개인정보 보호 개인정보처리방침 컨트롤러 호출"); */
		
		return "policy/privacy";
	}
	@RequestMapping(value = "/policy/provision", method = RequestMethod.GET)
	public String policyprovision() {
		/* log.info("개인정보 보호 이용약관 컨트롤러 호출"); */
		
		return "policy/provision";
	}
	@RequestMapping(value = "/policy/giftcard", method = RequestMethod.GET)
	public String policygiftcard() {
		/* log.info("개인정보 보호 기프트카드 컨트롤러 호출"); */
		
		return "policy/giftcard";
	}
}
