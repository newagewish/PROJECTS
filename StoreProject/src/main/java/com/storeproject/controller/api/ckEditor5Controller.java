package com.storeproject.controller.api;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.storeproject.domain.admin.imgUploadVO;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j;

@Controller
@Log4j
@AllArgsConstructor
@RequestMapping("/ckeditor/*")
public class ckEditor5Controller {
	

	@PostMapping(value = "/img/upload")
	public @ResponseBody imgUploadVO imageupload(@RequestParam("upload") MultipartFile files, imgUploadVO iuv) throws Exception {
		log.info("ckeditor 이미지 업로드 컨트롤러 호출 ");
		
		String originFileName = files.getOriginalFilename();
		// 중복을 피하기 위한 UUID 사용
	    UUID uuid = UUID.randomUUID();
	    String uuidFileName = uuid + "_" + originFileName;
	    // 저장할 경로
	    //배포
	    String saveURL = "C:\\Files\\Apache Software Foundation\\Tomcat 9.0\\webapps\\ROOT\\resources\\upload\\temp";
	    //이클립스
	    //String saveURL = "C:\\Files\\eclipse-workspace\\.metadata\\.plugins\\org.eclipse.wst.server.core\\tmp0\\wtpwebapps\\StoreProject\\resources\\upload\\temp";
	    log.info("불러온 파일명 : "+originFileName);
	    log.info("UUID + 파일명 : "+uuidFileName);
	    log.info("저장 경로 : "+saveURL);
	    try {
	    	 files.transferTo(new File(saveURL + "\\", uuidFileName));
				/*
				 * String fullURL = "http://localhost:8080/resources/upload/temp/" +
				 * uuidFileName;
				 */
	    	 String fullURL = "/resources/upload/temp/" + uuidFileName;
	    	 log.info("업로드 성공");
	    	 
	    	 iuv.setUrl(fullURL);
	    	 return iuv;
	    } catch (IOException e) {
	        e.printStackTrace();
	        log.info("업로드 실패");
	        return null;
	    }
	}
}
