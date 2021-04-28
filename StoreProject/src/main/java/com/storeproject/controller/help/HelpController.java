package com.storeproject.controller.help;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.storeproject.domain.HelpfaqVO;
import com.storeproject.domain.HelpnoticeVO;
import com.storeproject.service.help.HelpService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j;

@Controller
@Log4j
@AllArgsConstructor
public class HelpController {

	private HelpService service;
	
	@RequestMapping(value = "/help", method = RequestMethod.GET)
	public String help() {
		/* log.info("고객센터 컨트롤러 호출"); */
		
		return "help/help";
	}
	@RequestMapping(value = "ajax/help/faq/count", method = RequestMethod.GET)
	@ResponseBody
	public int ajaxhelp_faq_tbcount(HttpServletRequest request) throws Exception {
		/* log.info("고객센터 FAQ helpgetfaqcount 컨트롤러 호출"); */
		
		return service.getFaqCount();
	}
	@RequestMapping(value = "ajax/help/faq/list", method = RequestMethod.GET)
	@ResponseBody
	public List<HelpfaqVO> ajaxhelp_faq_tblist(HttpServletRequest request) throws Exception {
		/* log.info("고객센터 FAQ ajaxhelp_faq_tblist 컨트롤러 호출"); */
		int pageNum = Integer.parseInt(request.getParameter("pageNum"));
		int startBno = (pageNum-1)*5;	//몇번 부터 가져올지 pageNum을 이용해서 값 계산
		
		return service.getFaqList(startBno);
	}
	
	
	
	
	@RequestMapping(value = "ajax/help/notice/count", method = RequestMethod.GET)
	@ResponseBody
	public int ajaxhelp_notice_tbcount(HttpServletRequest request) throws Exception {
		/* log.info("고객센터 FAQ helpgetnoticecount 컨트롤러 호출"); */
		
		return service.getNoticeCount();
	}
	@RequestMapping(value = "ajax/help/notice/list", method = RequestMethod.GET)
	@ResponseBody
	public List<HelpnoticeVO> ajaxhelp_notice_tblist(HttpServletRequest request) throws Exception {
		/* log.info("고객센터 FAQ ajaxhelp_notice_tblist 컨트롤러 호출"); */
		int pageNum = Integer.parseInt(request.getParameter("pageNum"));
		int startBno = (pageNum-1)*5;	//몇번 부터 가져올지 pageNum을 이용해서 값 계산
		
		return service.getNoticeList(startBno);
	}
}
