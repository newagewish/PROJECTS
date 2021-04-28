package com.storeproject.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.storeproject.domain.StoreinfoVO;
import com.storeproject.service.InfoService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j;

@Controller
@Log4j
@RequestMapping("/info/*")
@AllArgsConstructor
public class InfoController {
	
	private InfoService service;

	@GetMapping("/store")
	public String storeinfo() {
		
		/* log.info("매장안내 컨트롤러 호출"); */
		return "info/storeinfo";
	}
	
	@GetMapping("/char")
	public String charinfo() {
		/* log.info("캐릭터소개 컨트롤러 호출"); */
		return "info/charinfo";
	}
	
	@RequestMapping(value = "/ajax/store/cover", method = RequestMethod.GET)
	@ResponseBody
	public List<StoreinfoVO> ajaxstorecover(@RequestParam(value="st_NMArray[]") List<String> st_NMArray) throws Exception {
		/* log.info("매장안내 커버 컨텐츠 컨트롤러 호출"); */
		List<StoreinfoVO> storeinfoVOList = new ArrayList<StoreinfoVO>();
		for(int i=0; i<st_NMArray.size(); i++) {
			storeinfoVOList.add(service.getFindStore(st_NMArray.get(i)));
		}
		return storeinfoVOList;
	}

	@RequestMapping(value = "/ajax/store/tab", method = RequestMethod.GET)
	@ResponseBody
	public List<StoreinfoVO> ajaxstoretab() throws Exception {
		/* log.info("매장안내 탭 컨텐츠 컨트롤러 호출"); */
		return service.getList();
	}
}
