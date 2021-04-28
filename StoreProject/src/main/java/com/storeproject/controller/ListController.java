package com.storeproject.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.storeproject.domain.admin.ProductsInfoVO;
import com.storeproject.domain.header.RelationCategoryVO;
import com.storeproject.service.ListService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j;

@Log4j
@Controller
@AllArgsConstructor
@RequestMapping("/list")
public class ListController {
	
	private ListService listservice;
	
	@GetMapping(value = "")
	public String list(HttpServletRequest request) {
		/* log.info("리스트 list 컨트롤러 호출"); */
		
		return "list";
	}
	
	@GetMapping(value = "/maincategory/img")
	@ResponseBody
	public String mainCategoryImg(HttpServletRequest request) {
		/* log.info("리스트 mainCategoryImg 컨트롤러 호출"); */
		String columnNM = request.getParameter("columnNM");
		return listservice.selectCategoryImg(columnNM);
	}
	@GetMapping(value = "/subcategory/img")
	@ResponseBody
	public String subCategoryImg(HttpServletRequest request) {
		/* log.info("리스트 subCategoryImg 컨트롤러 호출"); */
		String maincolumnNM = request.getParameter("maincolumnNM");
		String subcolumnNM = request.getParameter("subcolumnNM");
		String fileNM = listservice.selectCategoryImg(subcolumnNM);
		if(fileNM==null) {
			fileNM = listservice.selectCategoryImg(maincolumnNM);
		}
		return fileNM;
	}
	
	@GetMapping(value = "/select/subcategory")
	@ResponseBody
	public List<RelationCategoryVO> selectSubCategory(HttpServletRequest request) {
		/* log.info("리스트 selectSubCategory 컨트롤러 호출"); */
		String columnNM = request.getParameter("columnNM");
		return listservice.selectSubCategory(columnNM);
	}
	
	
	@GetMapping(value = "/option")
	@ResponseBody
	public List<ProductsInfoVO> categoryOption(HttpServletRequest request)throws Exception {
		/* log.info("컨트롤러 categoryOption 호출"); */
		int count = Integer.parseInt(request.getParameter("count"));
		String charater = request.getParameter("charater");
		String option =  request.getParameter("option");
		String column = request.getParameter("column");
		List<ProductsInfoVO> pdsList = listservice.categoryOption(count, charater, option, column);
		return pdsList;
	}
	
	
	@GetMapping(value = "/count")
	@ResponseBody
	public int listCount(HttpServletRequest request)throws Exception {
		/* log.info("컨트롤러 listCount 호출"+ip); */
		String charater = request.getParameter("charater");
		String column = request.getParameter("column");
		int count = listservice.listCount(charater, column);
		return count;
	}
	
	
	
	@GetMapping(value = "/hash")
	@ResponseBody
	public List<ProductsInfoVO> listHash(HttpServletRequest request)throws Exception {
		/* log.info("컨트롤러 listHash 호출"); */
		int count = Integer.parseInt(request.getParameter("count"));
		String charater = request.getParameter("charater");
		String option =  request.getParameter("option");
		String column = request.getParameter("column");
		log.info(charater + " " + option + " " + column + " " + count);
		List<ProductsInfoVO> pdsList = listservice.listHash(count, charater, option, column);
		return pdsList;
	}
	
	@GetMapping(value = "/hash/img")
	@ResponseBody
	public String hashCategoryImg(HttpServletRequest request) {
		/* log.info("리스트 hashCategoryImg 컨트롤러 호출"); */
		String column = request.getParameter("column");
		String hash = request.getParameter("hash");
		
		String fileNM = listservice.selectCategoryImg(column);
		if(fileNM==null) {
			fileNM = listservice.selectCategoryImg(hash);
		}
		return fileNM;
	}
	
}
