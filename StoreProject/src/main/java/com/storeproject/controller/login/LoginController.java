package com.storeproject.controller.login;

import java.io.IOException;
import java.util.List;
import java.util.Random;

import javax.inject.Inject;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.storeproject.domain.AccountVO;
import com.storeproject.service.login.LoginService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j;

@Controller
@Log4j
@AllArgsConstructor
@RequestMapping("/login/*")
public class LoginController {
	
	private LoginService loservice;
	
	private PasswordEncoder pwencoder;
	
	@Inject    //서비스를 호출하기 위해서 의존성을 주입
	JavaMailSender mailSender;     //메일 서비스를 사용하기 위해 의존성을 주입함.
	
	@GetMapping(value = "/loginPage")
	public void login() {
		/* log.info("로그인 login 컨트롤러 호출"); */
	}

	@GetMapping(value = "/signin")
	public void signin() {
		/* log.info("로그인 signin 컨트롤러 호출"); */
	}
	
	@GetMapping(value = "/createaccount")
	public void createaccount(HttpSession session) {
		/* log.info("로그인 createaccount 컨트롤러 호출"); */
	}

	@GetMapping(value = "/ajax/certifyemail")
	@ResponseBody
	public int certifyemail(@RequestParam(value="email") String email, HttpSession session) throws IOException {
		/* log.info("로그인 certifyemail 컨트롤러 호출"); */
		/* ↓ DB 이메일 중복 체크 */
		int emailcheck = loservice.selectEmailCheck(email); //이메일이 중복 될 수 없으니 리턴 값은 0, 1;
		if(emailcheck!=0) {
			log.info("이메일 주소 : "+email+" 로 회원 가입 중복 검사 시도 / 중복 있음");
			return 3;
		}else {
			log.info("이메일 주소 : "+email+" 로 회원 가입 중복 검사 시도 / 중복 없음");
		}
		/* ↑ DB 이메일 중복 체크 */
		Random r = new Random();
        int certifyNum = r.nextInt(99892)+900107; //이메일로 받는 인증코드 부분 (난수)
        String sender = "newagewish@gamil.com";	// 보내는 사람 이메일 주소
        String receiver = email; // 받는 사람 이메일 주소
        String title = "스토어 프로젝트 인증번호 입니다."; // 제목
        String content =
                "<table width='100%' cellspacing='0' cellpadding='0' border='0' align='center' bgcolor='#efeff0' style='border-collapse:collapse'>"+
                        "<tbody>"+
                        "<tr>"+
                          "<td>"+
                            
                            "<table width='100%' cellspacing='0' cellpadding='0' border='0' align='center' bgcolor='#ffffff' style='max-width:640px;margin:0 auto'>"+
                              "<tbody>"+
                              "<tr>"+
                                "<td width='100%' height='45' colspan='3' bgcolor='#ffdc00'></td>"+
                              "</tr>"+
                              "<tr>"+
                                "<td width='6%' height='25' bgcolor='#ffdc00'></td>"+
                                "<td width='88%' height='25' bgcolor='#ffdc00'>"+
                                	"<h1>스토어 프로젝트 계정</h1>"+
                                "</td>"+
                                "<td width='6%' height='25' bgcolor='#ffdc00'></td>"+
                              "</tr>"+
                              "<tr>"+
                                "<td width='100%' height='45' colspan='3' bgcolor='#ffdc00'></td>"+
                              "</tr>"+
                              "<tr>"+
                                "<td width='100%' height='35' colspan='3'></td>"+
                              "</tr>"+
                              "<tr>"+
                        "<td width='6%'></td>"+
                        "<td width='88%' style='font-size:18px;line-height:22px;font-family:Apple SD Gothic Neo,sans-serif,'\00b9d1\00c740\00ace0\00b515',Malgun Gothic,'\00ad74\00b9bc',gulim;letter-spacing:-1px;font-weight:bold;color:#1e1e1e'>스토어 프로젝트 계정 가입을 위한 인증번호입니다.</td>"+
                        "<td width='6%'></td>"+
                      "</tr>"+
                      "<tr>"+
                        "<td width='100%' height='25' colspan='3'></td>"+
                      "</tr>"+
                      "<tr>"+
                        "<td width='6%'></td>"+
                        "<td width='88%' style='font-size:14px;line-height:22px;font-family:Apple SD Gothic Neo,sans-serif,'\00b9d1\00c740\00ace0\00b515',Malgun Gothic,'\00ad74\00b9bc',gulim;letter-spacing:-1px;color:#1e1e1e'>아래 인증번호를 확인하여 이메일 주소 인증을 완료해 주세요.</td>"+
                        "<td width='6%'></td>"+
                      "</tr>"+
                      "<tr>"+
                        "<td width='100%' height='18' colspan='3'></td>"+
                      "</tr>"+
                      "<tr>"+
                        "<td width='6%'></td>"+
                        "<td width='88%'>"+
                          "<table width='100%' cellspacing='0' cellpadding='0' border='0' style='line-height:22px;font-family:Apple SD Gothic Neo,sans-serif,'\00b9d1\00c740\00ace0\00b515',Malgun Gothic,'\00ad74\00b9bc',gulim;letter-spacing:-1px;color:#1e1e1e'>"+
                            "<tbody>"+
                            "<tr>"+
                              "<td width='100%' height='1' colspan='5' bgcolor='#bebebe'></td>"+
                            "</tr>"+
                            "<tr>"+
                              "<td width='100%' height='25' colspan='5'></td>"+
                            "</tr>"+
                            "<tr>"+
                              "<td width='3%'></td>"+
                              "<th width='24%' valign='top' align='left' style='font-size:13px;font-weight:normal'>스토어 프로젝트 계정</th>"+
                              "<td width='2%'></td>"+
                              "<td width='68%' valign='top' style='font-size:13px;font-weight:bold;word-break:break-all'>"+receiver+"</td>"+
                              "<td width='3%'></td>"+
                            "</tr>"+
                            "<tr>"+
                              "<td width='100%' height='8' colspan='5'></td>"+
                            "</tr>"+
                            "<tr>"+
                              "<td width='3%'></td>"+
                              "<th width='24%' valign='top' align='left' style='font-size:13px;font-weight:normal'>인증번호</th>"+
                              "<td width='2%'></td>"+
                              "<td width='68%' valign='top' style='font-size:13px;font-weight:bold;word-break:break-all'>"+certifyNum+"</td>"+
                              "<td width='3%'></td>"+
                            "</tr>"+
                            "<tr>"+
                              "<td width='100%' height='27' colspan='5'></td>"+
                            "</tr>"+
                            "<tr>"+
                              "<td width='100%' height='1' colspan='5' bgcolor='#bebebe'></td>"+
                            "</tr>"+
                            "</tbody>"+
                          "</table>"+
                        "</td>"+
                        "<td width='6%'></td>"+
                      "</tr>"+
                      "<tr>"+
                        "<td width='100%' height='58' colspan='3'></td>"+
                      "</tr>"+

                              "<tr>"+
                                "<td width='100%' height='1' colspan='3' bgcolor='#e6e6e6'></td>"+
                              "</tr>"+
                              "<tr>"+
                                "<td width='100%' height='16' colspan='3'></td>"+
                              "</tr>"+
                              "<tr>"+
                                "<td width='6%'></td>"+
                                "<td width='88%' style='font-size:11px;'>"+
									"본 메일은 발신 전용입니다."+
									"<br>"+
									"스토어 프로젝트 계정 관련하여 궁금한 점이 있으시면 <a href='/help' target='_blank' style='color:#3c64e6; text-decoration:underline'>도움말</a>을 확인해보세요."+
									"<br>"+
									"Copyright © 2019. 박경립. All rights reserved."+
								"</td>"+
                                "<td width='6%'></td>"+
                              "</tr>"+
                              "<tr>"+
                                "<td width='100%' height='18' colspan='3'></td>"+
                              "</tr>"+
                              
                              "</tbody>"+
                            "</table>"+
                          "</td>"+
                        "</tr>"+
                        "<tr>"+
                          "<td width='100%' height='100'></td>"+
                        "</tr>"+
                        "</tbody>"+
                      "</table>";
		try {
	        MimeMessage message = mailSender.createMimeMessage();
	        MimeMessageHelper messageHelper = new MimeMessageHelper(message, true, "UTF-8");;
	        messageHelper.setFrom(sender, "스토어 프로젝트"); // (메일주소, 이름) 보내는사람 메일주소생략 X
	        messageHelper.setTo(receiver); // 받는사람 이메일
	        messageHelper.setSubject(title); // 메일제목 생략 O
	        messageHelper.setText(content, true); // 메일 내용
	        
	        mailSender.send(message);
	        
	        /* 이메일 주소, 인증번호 를 세션에 저장 */
	        session.setAttribute("email", email);
	        session.setAttribute("certifyNum", certifyNum);
	        
	        return 1;
	    } catch (Exception e) {
	    	log.info(e);

	    	/* 인증 번호 메일 보내기 실패 시 세션 값 초기화 */
	    	session.removeAttribute("email");
	    	session.removeAttribute("certifyNum");
	    	
	    	return 2;
	    }
	
	}
	
	@GetMapping(value = "/ajax/certifyemailcheck")
	@ResponseBody
	public int certifyemailcheck(@RequestParam(value="email") String email, @RequestParam(value="certifynum") int certifynum, HttpSession session) throws IOException {
		log.info("로그인 certifyemailcheck 컨트롤러 호출");
		
		String sessionemail = (String)session.getAttribute("email");
		int sessioncertifyNum = (int)session.getAttribute("certifyNum");
		
		/*
		 * 리턴값 1 : 이메일, 인증번호 일치
		 * 리턴값 2 : 이메일 일치, 인증번호 불일치
		 * 리턴값 3 : 이메일 불일치
		 * 리턴값 4 : 예기치 못한 오류
		 * */
		
		try {
			if(sessionemail.equals(email)) {
				if(sessioncertifyNum==certifynum) {
					/* 
					 * 이메일 인증번호 일치 후 세션에 인증받은 이메일을 기억해놓는다.
					 * ready**** 세션은 최종적으로 회원가입 정보를 DB에 넘길때 입력정보와 인증 이메일 기록 일치여부에 사용한다.
					 * 
					 *  */
					/* 인증 성공 후 이메일 인증 할 때 썼던 인증번호를 지운다. */
			    	session.removeAttribute("certifyNum");
					return 1;
				}else {
					/* 인증 실패 후 이메일 인증 할 때 썼던 주소와 인증번호를 지운다. */
					session.removeAttribute("email");
			    	session.removeAttribute("certifyNum");
					return 2;
				}
			}else {
				/* 인증 실패 후 이메일 인증 할 때 썼던 주소와 인증번호를 지운다. */
				session.removeAttribute("email");
		    	session.removeAttribute("certifyNum");
				return 3;
			}
		} catch (Exception e) {
			log.info(e);
			/* 인증 에러 발생 시 이메일 인증 할 때 썼던 주소와 인증번호를 지운다. */
			session.removeAttribute("email");
	    	session.removeAttribute("certifyNum");
			return 4;
		}
	}
	
	
	@RequestMapping(value = "/ajax/insertinformation", method=RequestMethod.POST)
	@ResponseBody
	public String insertinformation(@ModelAttribute("alldata") @Valid AccountVO acvo, BindingResult bindingResult, HttpSession session) throws IOException {
		
		log.info("로그인 insertinformation 컨트롤러 호출");
		/*
		 * log.info(acvo.getac_ID()); log.info(acvo.getac_PW());
		 * log.info(acvo.getac_NNM()); log.info(acvo.getac_Year());
		 * log.info(acvo.getac_Month()); log.info(acvo.getac_Day());
		 * log.info(acvo.getac_Gender());
		 * log.info(session.getAttribute("readyEmail"));
		 */
		/*
		 * 리턴값 1 : 인증 받은 이메일 주소와 ajax의 이메일 주소가 일치하는지 여부
		 * 리턴값 2 : 유효성 검사 통과X
		 * 리턴값 3 : 정상적으로 DB에 데이터 INSERT
		 * */
		
		/* 이메일 인증 할 때 주소와 ajax data 주소가 일치하는지 판단 */
		String sessionEmailCheck = (String) session.getAttribute("email");
		String ajaxEmailCheck = acvo.getAc_ID();
		if(!sessionEmailCheck.equals(ajaxEmailCheck)) {
			/* 가입 이메일 변조 시 인증 받은 이메일 주소를 세션에서 지운다. */
			session.removeAttribute("email");
			return "1";
		}
		/* 유효성 검사 확인 */
		if(bindingResult.hasErrors()){
			List<ObjectError> list =  bindingResult.getAllErrors();
			for(ObjectError e : list) {
				log.info(e.getDefaultMessage());
				/* 유효성 검사 실패 시 인증 받은 이메일 주소를 세션에서 지운다. */
				session.removeAttribute("email");
				return e.getDefaultMessage();
			}
		}
		/* 비밀번호 BcryptPasswordEncoder 처리 */
		String password = acvo.getAc_PW();
		acvo.setAc_PW(pwencoder.encode(password));
		
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
		
		try {
			loservice.createAccount(acvo);
			log.info("회원가입 사용자 정보 입력 완료 : "+ajaxEmailCheck);
			log.info("회원가입 사용자 권한 입력 완료 : ROLE_MEMBER");
			log.info("회원가입 사용자 동의 입력 완료");
			/*
			 * loservice.InsertAuthority(acvo); 
			 * loservice.InsertProvision(acvo);
			 */
			/* 가입완료 후 인증 받은 이메일 주소를 세션에서 지운다. */
			session.removeAttribute("email");
			return "2";
		}catch(Exception e){
			log.info(e);
			/* 오류 발생 시 인증 받은 이메일 주소를 세션에서 지운다. */
			session.removeAttribute("email");
			return "3";
		}
	}
		
}
