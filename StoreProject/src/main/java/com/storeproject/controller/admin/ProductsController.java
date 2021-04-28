package com.storeproject.controller.admin;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.storeproject.domain.admin.ProductsInfoVO;
import com.storeproject.domain.admin.ProductsOpVO;
import com.storeproject.domain.admin.imgUploadVO;
import com.storeproject.service.admin.ProductsService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j;

@Controller
@Log4j
@AllArgsConstructor
@RequestMapping("/admin/*")
public class ProductsController {
	
	private ProductsService pdsservice;

	@GetMapping(value = "/productsAdd")
	public void getAdminProductsAdd() {
		/* log.info("관리자 getAdminProductsAdd 컨트롤러 호출"); */
	}
	
	@RequestMapping(value = "/ajax/insert/products", method=RequestMethod.POST)
	@ResponseBody
	public int insertProducts(HttpServletRequest request) throws Exception{
		/* log.info("관리자 insertProducts 컨트롤러 호출"); */
		/* 파라미터 값을 담을 변수 선언 */
		ProductsInfoVO pds_info = new ProductsInfoVO();
		ProductsOpVO pds_op = null;	/* 값이 있을 수도 없을 수도 있어서 나중에 초기화 */
		String[] mainCategory = null, subCategory = null, charater = null, color = null;
		String[][] option = null;
		/* ----------------------------- */
		/* 상품 내용 값 VO 저장 시작 */
		Date time = new Date();
		SimpleDateFormat transFormat = new SimpleDateFormat("yyyy-MM-dd");
		pds_info.setPds_Reg_Date(transFormat.format(time));
		
		if(nullcheck(request.getParameter("pds_NM"))) {
			pds_info.setPds_NM(request.getParameter("pds_NM"));
			/* log.info(pds_info.getPds_NM()); */
		}else {
			/* log.info("상품명 X"); */
			return 1;
		}
		if(nullcheck(request.getParameter("pds_Price"))) {
			/* 가격은 int로 변환 후 저장 */
			pds_info.setPds_Price(Integer.parseInt(request.getParameter("pds_Price")));
			/* log.info(pds_info.getPds_Price()); */
		}else {
			/* log.info("가격 X"); */
			return 2;
		}
		if(nullcheck(request.getParameter("pds_Contents"))) {
			/* 값 저장 */
			pds_info.setPds_Contents(request.getParameter("pds_Contents"));
			pds_info.setPds_Detail(request.getParameter("pds_Detail"));	/* 세부정보는 기본틀이 있어 빈값 구분이 힘듬 */
			/*
			 * log.info(pds_info.getPds_Contents()); log.info(pds_info.getPds_Detail());
			 */
		}else {
			/* log.info("제품 소개 X"); */
			return 3;
		}
		/* 배송정보는 일부러 수정하지 않는 이상 값이 없을 수 없다. */
		if(nullcheck(request.getParameter("pds_Delivery"))) {
			/* 가격은 int로 변환 후 저장 */
			pds_info.setPds_Delivery(Boolean.parseBoolean(request.getParameter("pds_Delivery")));
			/* log.info(pds_info.isPds_Delivery()); */
		}else {
			/*
			 * log.info("배송 정보 X"); log.info(pds_info.isPds_Delivery());
			 */
			return 4;
		}
		/* 대표 이미지 */
		if(request.getParameter("pds_Image")!="") {
			pds_info.setPds_Image(request.getParameter("pds_Image"));
		}else {
			//이미지가 없을 경우
			return 8;
		}
		/* 인기 이미지 */
		if(nullcheck(request.getParameter("pds_Vogue_Image"))) {
			pds_info.setPds_Vogue_Image(request.getParameter("pds_Vogue_Image"));
		}else {
			//이미지가 없을 경우
			return 9;
		}
		/* 상품 내용 값 VO 저장 끝 */
		/* ----------------------------- */
		/* ----------------------------- */
		/* 카테고리, 캐릭터 값 처리 시작 */
		/* 메인 카테고리는 세부 카테고리 선택 시 자동 체크 되어 and를 이용하여 함께 체크 */
		if(nullarraycheck(request.getParameterValues("mainCategory[]")) && nullarraycheck(request.getParameterValues("subCategory[]"))) {
			mainCategory = request.getParameterValues("mainCategory[]");
			/*
			 * for(int i=0; i<mainCategory.length; i++) { log.info(mainCategory[i]); }
			 */
			
			subCategory = request.getParameterValues("subCategory[]");
			/*
			 * for(int i=0; i<subCategory.length; i++) { log.info(subCategory[i]); }
			 */
		}else {
			/* log.info("메인 혹은 세부 카테고리 선택 X"); */
			return 5;
		}
		/* 캐릭터 카테고리는 선택이 필수가 아니기 때문에 else return을 하지 않는다. */
		if(nullarraycheck(request.getParameterValues("charater[]"))) {
			charater = request.getParameterValues("charater[]");
			/*
			 * for(int i=0; i<kakao.length; i++) { log.info(kakao[i]); }
			 */
		}else {
			/* log.info("캐릭터 카카오 카테고리 선택 X"); */
		}
		/* 카테고리, 캐릭터 값 처리 끝 */
		/* ----------------------------- */
		/* ----------------------------- */
		/* 색상 값 처리 시작*/
		if(nullarraycheck(request.getParameterValues("color[]"))) {
			color = request.getParameterValues("color[]");
			/*
			 * for(int i=0; i<niniz.length; i++) { log.info(niniz[i]); }
			 */
		}else {
			/* log.info("캐릭터 니니즈 카테고리 선택 X"); */
			return 6;
		}
		/* 색상 값 처리 끝*/
		/* ----------------------------- */
		/* ----------------------------- */
		
		/* 옵션 및 재고 값 VO에 저장 시작 */
		if(request.getParameter("option_Choice")!=null) {
			pds_op = new ProductsOpVO(); /* vo 초기화 */
			/* 추가할 옵션이 없는 경우 */
			pds_op.setOp_Choice(request.getParameter("option_Choice"));	/* 옵션명 */
			if(request.getParameter("option_Stock").equals("")) {
				//재고 수량을 입력 하지 않았을 때 값이 "" 때문에 true 일 경우 리턴
				return 7;
			}else {
				//재고 수량이 있을 경우
				pds_op.setOp_Stock(Integer.parseInt(request.getParameter("option_Stock")));	/* 상품수량 */
				/*
				 * log.info(pds_op.getOp_Choice()); log.info(pds_op.getOp_Stock());
				 */
			}
		}else {
			/* 옵션이 있는 경우 */ /* 옵션종류, 옵션명, 재고가 모두 배열에 담겨서 온다. */
			/* 파라미터 2차원 배열 데이터 처리 */
			int leng = 0;	/* 배열의 열 길이 */ /* insert 해야할 횟수도 가리킨다. */
			try {
				while((Integer)request.getParameterValues("option["+leng+"][]").length != null) {
					/* log.info("option["+i+"] 파라미터"); */
					leng++;
				}
			}catch(NullPointerException e){
				/* while 문에서 널포인트 엑셉션으로 오류가 나면 자동으로 캐치문으로 빠져나와서 while 문 종료 */
			}
			/* 배열의 길이가 0보다 크면 값 저장 없으면 null 처리 */
			if(leng > 0) {
				/* 동적 2차원 배열 선언과 초기화 */
				option = new String[leng][3];
				for(int x=0 ; x<leng ; x++) {
					String[] param_option = request.getParameterValues("option["+x+"][]");
					for(int y=0; y<3 ; y++) {
						/* log.info(param_option[y]); */
						option[x][y] = param_option[y];
						/* log.info(option[x][y]); */
					}
				}
			}else {
				
			}
			/* 옵션 및 재고 값 VO에 저장 끝 */
		}
		/* ----------------------------- */
		/* ajax로 넘긴 파라미터 값을 담은 변수를 서비스로 보내기 */
		/* 트랜잭션을 쓰기위해 데이터를 한번에 보내고 서비스에서 분할 처리 */
		/* 옵션 종류에 따라 pds_op(VO), option 둘중 하나만 보내야하지만 서비스에서 null 처리하기로 하고 모두 보냄 */
		pdsservice.createProducts(pds_info, mainCategory, subCategory, charater, color, pds_op, option);
		/* ----------------------------- */
		return 0;
	}
	

	/* Null 값 & "" & " " 등 빈 값 확인 */
	public boolean nullcheck(String val) {
		if(val==null || val=="" || val==" ") {
			return false;
		}else {
			return true;
		}
	}
	/* 배열의 Null 값 확인 */
	public boolean nullarraycheck(String[] array) {
		if(array==null) {
			return false;
		}else {
			return true;
		}
	}
	
	/* 대표 이미지 업로드 */
	@PostMapping(value = "/ajax/img/upload")
	@ResponseBody
	public List<imgUploadVO> imageupload(MultipartHttpServletRequest request) throws Exception {
		/* log.info("관리자 imageupload 컨트롤러 호출"); */
		List<MultipartFile> fileList = request.getFiles("uploadFile");
		List<imgUploadVO> iuv = new ArrayList<imgUploadVO>();
		
		for(int i=0; i<fileList.size(); i++) {
			imgUploadVO vo = new imgUploadVO();
			MultipartFile file = fileList.get(i);
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
		    	 log.info((i+1)+"번째 대표 이미지 업로드 성공");
		    	 vo.setFileNM(originFileName);
		    	 vo.setUuidfileNM(uuidFileName);
		    	 vo.setUrl(fullURL);
		    	 iuv.add(vo);
		    } catch (IOException e) {
		        e.printStackTrace();
		        log.info("대표 이미지 업로드 실패");
		        return null;
		    }
		}
		for(int i=0; i<iuv.size(); i++) {
			log.info(iuv.get(i).getUrl());
		}
		return iuv;
	}
	
	/* 인기 이미지 업로드 */
	@PostMapping(value = "/ajax/vogueimg/upload")
	@ResponseBody
	public imgUploadVO vogueimageupload(MultipartHttpServletRequest request) throws Exception {
		/* log.info("관리자 vogueimageupload 컨트롤러 호출"); */
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
	    	 log.info(originFileName+" 인기 이미지 업로드 성공");
	    	 vo.setFileNM(originFileName);
	    	 vo.setUuidfileNM(uuidFileName);
	    	 vo.setUrl(fullURL);
	    } catch (IOException e) {
	        e.printStackTrace();
	        log.info("인기 이미지 업로드 실패");
	        return null;
	    }
	    
		return vo;
	}
}
