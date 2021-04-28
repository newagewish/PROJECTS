package com.storeproject.controller.header;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.storeproject.domain.header.MainCategoryVO;
import com.storeproject.domain.header.SubCategoryVO;
import com.storeproject.service.header.HeaderService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j;

@Controller
@Log4j
@AllArgsConstructor
@RequestMapping("/header/*")
public class HeaderController {

	private HeaderService hservice;
	
	@GetMapping(value = "/ajax/selectmaincategory")
	@ResponseBody
	public List<MainCategoryVO> selectMainCategory() throws Exception {
		/* log.info("헤더 대표 카테고리 목록 컨트롤러 호출"); */
		
		try {
			List<MainCategoryVO> mainCategoryList = hservice.selectMainCategory();
			/* log.info("대표 카테고리 목록 호출 완료"); */
			return mainCategoryList;
		} catch (Exception e) {
			log.info(e);
			return null;
		}
		
	}
	
	
	 @GetMapping(value = "/ajax/selectsubcategory")
	 @ResponseBody 
	 public List<SubCategoryVO> selectSubCategory(@ModelAttribute("alldata") MainCategoryVO mcvo) throws Exception{
		/* log.info("헤더 세부 카테고리 목록 컨트롤러 호출"); */
		 
		 try { 
			 List<SubCategoryVO> subCategoryList = hservice.selectSubCategory(mcvo); 
			/* log.info("세부 카테고리 목록 호출 완료"); */
			 return subCategoryList;
		 } catch (Exception e) {
			 log.info(e);
			 return null;
		 }
	 
	 }
}
