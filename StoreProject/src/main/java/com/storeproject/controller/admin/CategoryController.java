package com.storeproject.controller.admin;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.storeproject.domain.admin.imgUploadVO;
import com.storeproject.domain.header.MainCategoryVO;
import com.storeproject.domain.header.RelationCategoryVO;
import com.storeproject.domain.header.SubCategoryVO;
import com.storeproject.service.admin.CategoryService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j;

@Controller
@Log4j
@AllArgsConstructor
@RequestMapping("/admin/*")
public class CategoryController {
	
	private CategoryService cateservice;

	@GetMapping(value = "/category")
	public void getAdminCategory() {
		/* log.info("관리자 getAdminCategory 컨트롤러 호출 "); */
	}
	
	@GetMapping(value = "ajax/getMainCategory")
	@ResponseBody
	public List<MainCategoryVO> getMainCategory() {
		/* log.info("관리자 getMainCategory 컨트롤러 호출"); */
		
		/* log.info(cateservice.getMainCategory()); */
		return cateservice.getMainCategory();
		
	}
	
	@GetMapping(value = "ajax/getSubCategory")
	@ResponseBody
	public List<SubCategoryVO> getSubCategory(@ModelAttribute("alldata") @Valid MainCategoryVO mcvo) throws Exception{
		/* log.info("관리자 getSubCategory 컨트롤러 호출"); */
		
		/* log.info(mcvo.getMain_category_NM()+" "+mcvo.getMain_column_NM()); */
		return cateservice.getSubCategory(mcvo);
	}
	
	@PostMapping(value = "ajax/updateMainCategory")
	@ResponseBody
	public void updateMainCategory(HttpServletRequest request) throws Exception{
		String fileNM = request.getParameter("fileNM");
		RelationCategoryVO rcvo = new RelationCategoryVO();
		rcvo.setMain_category_NM(request.getParameter("main_category_NM"));
		rcvo.setMain_column_NM(request.getParameter("main_column_NM"));
		/* log.info("관리자 updateMainCategory 컨트롤러 호출"); */
		try {
			cateservice.updateMainCategory(fileNM, rcvo);
			log.info("메인 카테고리 수정 완료");
		} catch (Exception e) {
			log.info(e);
		}
		
	}
	
	@PostMapping(value = "ajax/updateSubCategory")
	@ResponseBody
	public void updateSubCategory(HttpServletRequest request) throws Exception{
		String fileNM = request.getParameter("fileNM");
		RelationCategoryVO rcvo = new RelationCategoryVO();
		rcvo.setMain_category_NM(request.getParameter("main_category_NM"));
		rcvo.setMain_column_NM(request.getParameter("main_column_NM"));
		rcvo.setSub_category_NM(request.getParameter("sub_category_NM"));
		rcvo.setSub_column_NM(request.getParameter("sub_column_NM"));
		/* log.info("관리자 updateSubCategory 컨트롤러 호출"); */
		try {
			cateservice.updateSubCategory(fileNM, rcvo);
			/*
			 * log.info(rcvo.getMain_category_NM()); log.info(rcvo.getMain_column_NM());
			 * log.info(rcvo.getSub_category_NM()); log.info(rcvo.getSub_column_NM());
			 */
			log.info("세부 카테고리 수정 완료");
		} catch (Exception e) {
			log.info(e);
		}
		
	}
	
	
	@PostMapping(value = "/ajax/addMainCategory")
	@ResponseBody
	public void addMainCategory(HttpServletRequest request) throws Exception{
		/* log.info("관리자 addMainCategory 컨트롤러 호출"); */
		String fileNM = request.getParameter("fileNM");
		RelationCategoryVO rcvo = new RelationCategoryVO();
		rcvo.setMain_category_NM(request.getParameter("main_category_NM"));
		/* log.info(mcvo.getMain_category_NM()); */ /* 관리자가 입력한 카테고리 명이 제대로 들어오는지 확인 */
		/* DB에 카테고리 추가를 위해서 컬럼관련 작업  */
		try {
			cateservice.addMainCategory(fileNM, rcvo);
			log.info("대표 카테고리 추가 완료");
		}catch(Exception e) {
			log.info(e);
		}
		
		
	}
	
	@PostMapping(value = "/ajax/addSubCategory")
	@ResponseBody
	public void addSubCategory(HttpServletRequest request) throws Exception{
		/* log.info("관리자 addSubCategory 컨트롤러 호출"); */
		String fileNM = request.getParameter("fileNM");
		RelationCategoryVO rcvo = new RelationCategoryVO();
		rcvo.setMain_category_NM(request.getParameter("main_category_NM"));
		rcvo.setMain_column_NM(request.getParameter("main_column_NM"));
		rcvo.setSub_category_NM(request.getParameter("sub_category_NM"));
		/* DB에 카테고리 추가를 위해서 컬럼관련 작업  */
		try {
			cateservice.addSubCategory(fileNM, rcvo);
			log.info("세부 카테고리 추가 완료");
		}catch(Exception e) {
			log.info(e);
		}
		
		
	}
	
	@GetMapping(value = "ajax/getCategoryImg")
	@ResponseBody
	public String getCategoryImg(HttpServletRequest request) {
		/* log.info("관리자 getCategoryImg 컨트롤러 호출"); */
		String column = request.getParameter("column_NM");
		return cateservice.getCategoryImg(column);
	}
	
	/* 카테고리 이미지 업로드 */
	@PostMapping(value = "/ajax/categoryimg/upload")
	@ResponseBody
	public imgUploadVO categoryimageupload(MultipartHttpServletRequest request) throws Exception {
		log.info("관리자 categoryimageupload 컨트롤러 호출");
		imgUploadVO vo = new imgUploadVO();
		MultipartFile file = request.getFiles("uploadFile").get(0);
		String originFileName = file.getOriginalFilename();
		// 중복을 피하기 위한 UUID 사용
	    UUID uuid = UUID.randomUUID();
	    String uuidFileName = uuid + "_" + originFileName;
	    // 저장할 경로
	    String saveURL = "C:\\Files\\Apache Software Foundation\\Tomcat 9.0\\webapps\\ROOT\\resources\\upload\\temp";
	    //String saveURL = "C:\\Files\\eclipse-workspace\\.metadata\\.plugins\\org.eclipse.wst.server.core\\tmp0\\wtpwebapps\\StoreProject\\resources\\upload\\temp";
	    log.info("불러온 파일명 : "+originFileName);
	    log.info("UUID + 파일명 : "+uuidFileName);
	    log.info("저장 경로 : "+saveURL);
	    
	    try {
	    	 file.transferTo(new File(saveURL + "\\", uuidFileName));
	    	 String fullURL = "/resources/upload/temp/" + uuidFileName;
	    	 log.info(originFileName+"카테고리 이미지 업로드 성공");
	    	 vo.setFileNM(originFileName);
	    	 vo.setUuidfileNM(uuidFileName);
	    	 vo.setUrl(fullURL);
	    } catch (IOException e) {
	        e.printStackTrace();
	        log.info("카테고리 이미지 업로드 실패");
	        return null;
	    }
	    
		return vo;
	}
}
