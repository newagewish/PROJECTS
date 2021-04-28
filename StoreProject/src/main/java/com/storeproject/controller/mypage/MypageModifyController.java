package com.storeproject.controller.mypage;

import java.io.IOException;
import java.util.List;

import javax.validation.Valid;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.storeproject.domain.AccountVO;
import com.storeproject.service.mypage.MypageModifyService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j;

@Controller
@Log4j
@AllArgsConstructor
@RequestMapping("/mypage/modify/*")
public class MypageModifyController {
	
	private MypageModifyService mmservice;
	private PasswordEncoder pwencoder;
	
	@GetMapping(value = "/")
	public String modify() {
		/* log.info("마이페이지 modify 컨트롤러 호출"); */
		
		return "mypage/modify";
	}
	
	@GetMapping(value = "/ajax/provision")
	@ResponseBody
	public boolean modifySelectProvision(@RequestParam(value="ac_ID") String ac_ID) {
		/* 이벤트&마케팅 동의 조회 */
		/* log.info("마이페이지 정보수정 modifySelectProvision 컨트롤러 호출"); */

		return mmservice.selectProvision(ac_ID);
	}
	
	@PostMapping(value = "/ajax/password")
	@ResponseBody
	public int modifyMatchesPassword(@RequestParam(value="ac_ID") String ac_ID, @RequestParam(value="ac_PW") String ac_PW) {
		/* log.info("마이페이지 정보수정 modifyMatchesPassword 컨트롤러 호출"); */
		
		String DBPassword = mmservice.selectPassword(ac_ID);
		/* 스프링 시큐리티 입력 비밀번호와 암호화 된 비밀번호 비교 */
		boolean checkPassword = pwencoder.matches(ac_PW, DBPassword);
		log.info(ac_ID+"의 비밀번호 비교 "+checkPassword);
		if(checkPassword) {
			/* 비밀번호 일치 */
			return 1;
		}else {
			/* 비밀번호 불일치 */
			return 2;
		}
	}
	
	@PostMapping(value = "/ajax/updateinformation")
	@ResponseBody
	public String modifyUpdateInformation(@ModelAttribute("alldata") @Valid AccountVO acvo, BindingResult bindingResult, @RequestParam(value="ac_Uses_Agree") boolean ac_Uses_Agree) throws IOException  {
		/* log.info("마이페이지 정보수정 modifyUpdateInformation 컨트롤러 호출"); */

		/*
		 * 발생할 수 있는 유효성 결과 리턴 값
		 * 리턴 값 6 닉네임 길이 문제 거나 not null
		 */
		/* ajax json으로 받은 생년월일, 성별이 null일때 공백값이 들어가는걸 다시 null 값 처리 */
		String year = acvo.getAc_Year();
		String month = acvo.getAc_Month();
		String day = acvo.getAc_Day();
		String gender = acvo.getAc_Gender();
		
		if(year=="") {
			acvo.setAc_Year(null);
		}
		if(month=="") {
			acvo.setAc_Month(null);
		}
		if(day=="") {
			acvo.setAc_Day(null);
		}
		if(gender=="") {
			acvo.setAc_Gender(null);
		}
		
		/* 유효성 검사 확인 */
		if(bindingResult.hasErrors()){
			List<ObjectError> list =  bindingResult.getAllErrors();
			for(ObjectError e : list) {
				log.info(e.getDefaultMessage());
				return e.getDefaultMessage();
			}
		}
		
		try {
			mmservice.updateInformation(acvo);
			log.info("개인정보 저장 완료");
			
			log.info(acvo.getAc_ID()+" "+ac_Uses_Agree);
			mmservice.insertProvision(acvo.getAc_ID(), ac_Uses_Agree);
			log.info("이벤트 & 마케팅 활용 동의 체크 입력 완료");
			return "0";
		}catch(Exception e) {
			log.info("개인정보 저장 오류 발생");
			log.info(e);
			return "1";
		}
	}
}
