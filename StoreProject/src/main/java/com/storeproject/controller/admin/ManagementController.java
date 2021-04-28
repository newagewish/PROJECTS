package com.storeproject.controller.admin;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j;

@Controller
@Log4j
@AllArgsConstructor
@RequestMapping("/admin/*")
public class ManagementController {
	
	@GetMapping(value = "/management")
	public void getAdminManagement() {
		/* log.info("관리자 getAdminManagement 컨트롤러 호출 "); */
	}
	

}
