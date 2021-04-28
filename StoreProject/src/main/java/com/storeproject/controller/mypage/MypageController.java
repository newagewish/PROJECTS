package com.storeproject.controller.mypage;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j;

@Controller
@Log4j
@AllArgsConstructor
@RequestMapping("/mypage/*")
public class MypageController {

	@GetMapping(value = "/")
	public String mypage() {
		/* log.info("마이페이지 mypage 컨트롤러 호출"); */
		
		return "mypage/mypage";
	}
	
	
}
