package com.storeproject.controller.admin;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.storeproject.domain.admin.CardVO;
import com.storeproject.domain.admin.ProductsInfoVO;
import com.storeproject.domain.admin.imgUploadVO;
import com.storeproject.service.admin.CardAddService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j;

@Controller
@Log4j
@AllArgsConstructor
@RequestMapping("/admin/*")
public class CardAddController {
	
	private CardAddService cardaddservice;
	
	@GetMapping(value = "/cardAdd")
	public void getAdminCardAdd() {
		log.info("관리자 getAdminCardAdd 컨트롤러 호출");
	}
	
	
	/* 카드 이미지 업로드 */
	@PostMapping(value = "/ajax/cardimg/upload")
	@ResponseBody
	public imgUploadVO cardImgUpload(MultipartHttpServletRequest request) throws Exception {
		log.info("관리자 cardImgUpload 컨트롤러 호출");
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
	    	 log.info(originFileName+" 카드 이미지 업로드 성공");
	    	 vo.setFileNM(originFileName);
	    	 vo.setUuidfileNM(uuidFileName);
	    	 vo.setUrl(fullURL);
	    } catch (IOException e) {
	        e.printStackTrace();
	        log.info("카드 이미지 업로드 실패");
	        return null;
	    }
	    
		return vo;
	}
	
	@GetMapping(value = "/card/select/products")
	@ResponseBody
	public List<ProductsInfoVO> selectProductsCard(HttpServletRequest request)throws Exception {
		/* log.info("컨트롤러 selectProductsCard 호출"); */
		int count = Integer.parseInt(request.getParameter("NO"));
		List<ProductsInfoVO> pdsList = cardaddservice.selectProductsCard(count);
		return pdsList;
	}
	
	@GetMapping(value = "/card/select/product")
	@ResponseBody
	public ProductsInfoVO selectChoiceCard(HttpServletRequest request)throws Exception {
		/* log.info("컨트롤러 selectChoiceCard 호출"); */
		int no = Integer.parseInt(request.getParameter("NO"));
		ProductsInfoVO pds = cardaddservice.selectChoiceCard(no);
		return pds;
	}
	
	
	@RequestMapping(value = "/ajax/insert/card", method=RequestMethod.POST)
	@ResponseBody
	public int insertCard(@ModelAttribute("alldata") @Valid CardVO cardvo, HttpServletRequest request) throws Exception{
		log.info("컨트롤러 insertCard 호출");
		log.info(cardvo.getCard_NO());
		log.info(cardvo.getCard_Type());
		log.info(cardvo.getCard_Img());
		log.info(cardvo.getCard_Title());
		log.info(cardvo.getCard_Intro());
		log.info(cardvo.getCard_Choice());
		log.info(cardvo.getCard_Contents());
		log.info(cardvo.getCard_Url());
		log.info(cardvo.getCard_Products());
		if(cardvo.getCard_Type()=="" || cardvo.getCard_Type()==null || cardvo.getCard_Type()=="null") {
			return 2;	//파라미터 카드 타입 값이 없을 경우
		}
		if(cardvo.getCard_Img()=="" || cardvo.getCard_Img()==null || cardvo.getCard_Img()=="null") {
			return 3;	//파라미터 카드 이미지 값이 없을 경우
		}
		if(cardvo.getCard_Title()=="" || cardvo.getCard_Title()==null || cardvo.getCard_Title()=="null") {
			//카드 제목은 ""이거나 null 일 수 있다.
			cardvo.setCard_Title(null);
		}
		if(cardvo.getCard_Intro()=="" || cardvo.getCard_Intro()==null || cardvo.getCard_Intro()=="null") {
			//카드 소개는 ""이거나 null 일 수 있다.
			cardvo.setCard_Intro(null);
		}
		if(cardvo.getCard_Choice()=="" || cardvo.getCard_Choice()==null || cardvo.getCard_Choice()=="null") {
			cardvo.setCard_Choice(null);
		}
		if(cardvo.getCard_Contents()=="" || cardvo.getCard_Contents()==null || cardvo.getCard_Contents()=="null") {
			cardvo.setCard_Contents(null);
		}
		if(cardvo.getCard_Url()=="" || cardvo.getCard_Url()==null || cardvo.getCard_Url()=="null") {
			cardvo.setCard_Url(null);
		}
		if(cardvo.getCard_Products()=="" || cardvo.getCard_Products()==null || cardvo.getCard_Products()=="null") {
			cardvo.setCard_Products(null);
		}
		//등록 날짜 값 저장
		Date time = new Date();
		SimpleDateFormat transFormat = new SimpleDateFormat("yyyy-MM-dd");
		cardvo.setCard_Reg_Date(transFormat.format(time));

		int result = cardaddservice.insertCard(cardvo);	//0은 엑셉션, 1은 성공
		return result;
	}
	
}
