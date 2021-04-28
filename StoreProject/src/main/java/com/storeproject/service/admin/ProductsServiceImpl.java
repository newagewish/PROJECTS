package com.storeproject.service.admin;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.storeproject.domain.admin.ProductsInfoVO;
import com.storeproject.domain.admin.ProductsOpVO;
import com.storeproject.mapper.admin.ProductsMapper;

import lombok.Setter;
import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class ProductsServiceImpl implements ProductsService{
	
	@Setter(onMethod_ = @Autowired)
	private ProductsMapper mapper;
	
	@Transactional(rollbackFor = {Exception.class})
	@Override
	public void createProducts(
		ProductsInfoVO pds_info, String[] mainCategory, String[] subCategory, String[] charater, String[] color, ProductsOpVO pds_op, String[][] option
	)throws Exception {
		/* 필수 입력이기 때문에 null값 체크가 필요 없다. */
		mapper.insertProductsInfo(pds_info);	/* 제품 정보를 추가 후 리턴 값으로 제품 번호를 가져온다. */
		int pds_NO = pds_info.getPds_NO();	//insertProductsInfo
		log.info("제품 정보 저장 완료");
		/* 컨텐츠 내용에 이미지 링크 정보를 수정한다. */
		/* 제품 정보를 db에 저장할때 autoincrement로 제품 번호를 측정하가때문에 번호를 부여 받고 다시 이미지 경로를 수정해준다.*/
		/* 내용의 이미지 경로를 임시 -> 옮길 경로로 모두 수정 해준다. */
		String str = pds_info.getPds_Contents();
		str = str.replaceAll("/resources/upload/temp/", "/resources/upload/products/contents/"+pds_info.getPds_Reg_Date()+"/"+pds_NO+"/");
		mapper.updateProductsContentsUrl(pds_NO, str);

		mapper.insertProductsMainCategory(pds_NO, mainCategory);
		log.info("선택한 메인 카테고리 저장 완료");
		mapper.insertProductsSubCategory(pds_NO, subCategory);
		log.info("선택한 세부 카테고리 저장 완료");
		/* 선택 입력이기 때문에 null값 체크가 필요 하다. */
		if(charater!=null) {
			mapper.insertProductsCharater(pds_NO, charater);
			log.info("선택한 캐릭터 카테고리 저장 완료");
		}else {
			mapper.insertProductsCharaterNull(pds_NO);
			log.info("선택한 캐릭터 카테고리 0개 저장 완료");
		}
		if(color!=null) {
			mapper.insertProductsColor(pds_NO, color);
			log.info("선택한 색상 카테고리 저장 완료");
		}else {
			mapper.insertProductsColorNull(pds_NO);
			log.info("선택한 색상 카테고리 0개 저장 완료");
		}
		/* 옵션은 필수 항목이지만 선택에따라 데이터가 달라지기 때문에 조건문 필요 */
		/* pds_op(VO)와 option(배열) 둘중 하나만 null 값을 체크해서 어떤 데이터를 가지고 처리할지 선택 */
		if(option==null) {
			/* 옵션없음을 선택했을 때 처리 */
			mapper.insertProductsNullOption(pds_NO, pds_op);
			log.info("옵션 '선택없음' 저장 완료");
		}else {
			/* 사이즈, 캐릭터, 기종 등을 선택 했을 때 처리 */
			/* option(배열)의 열 개수만큼 insert 해야하기 떄문에 반복문을 쓴다. */
			int leng = option.length;
			for(int i=0; i<leng; i++) {
				mapper.insertProductsArrayOption(pds_NO, option[i]);
				log.info("옵션 "+i+"번째  저장 완료");
			}
		}
		log.info("옵션  저장 완료");
		/* 선택한 메인, 서브 카테고리, 컬러 등의 컬럼명을 따로 관리 하기위해 arrange 테이블에 각 컬럼들 저장 */
			String maintext = null, subtext = null, charatertext = null, colortext = null;
			for(int i=0; i<mainCategory.length; i++) {
				if(i==0) {
					maintext = mainCategory[i];
				}else {
					maintext = maintext +","+ mainCategory[i];
				}
			}
			for(int i=0; i<subCategory.length; i++) {
				if(i==0) {
					subtext = subCategory[i];
				}else {
					subtext = subtext +","+ subCategory[i];
				}
			}
			
			if(charater!=null) {
				for(int i=0; i<charater.length; i++) {
					if(i==0) {
						charatertext = charater[i];
					}else {
						charatertext = charatertext +","+ charater[i];
					}
				}
			}
			if(color!=null) {
				for(int i=0; i<color.length; i++) {
					if(i==0) {
						colortext = color[i];
					}else {
						colortext = colortext +","+ color[i];
					}
				}
			}
			
			mapper.insertArrange(pds_NO, maintext, subtext, charatertext, colortext);
			 
		/* */
		
		/* 콘텐츠, 대표 이미지 이동 및 삭제 */
		int contents_result = productsContentsImageFind(pds_NO, str, pds_info.getPds_Reg_Date());
		if(contents_result==0) {
			log.info("컨텐츠 이미지 이동 완료");
		}else {
			throw new Exception();
		}
		/* 대표 이미지 옮기기 */
		int image_result = productsImageMove(pds_NO, pds_info.getPds_Image(), pds_info.getPds_Reg_Date());
		if(image_result==0) {
			log.info("대표이미지 이동 완료");
		}else {
			throw new Exception();
		}
		/* 인기 이미지 옮기기 */
		int vogueimage_result = productsVogueImageMove(pds_NO, pds_info.getPds_Vogue_Image(), pds_info.getPds_Reg_Date());
		if(vogueimage_result==0) {
			log.info("대표이미지 이동 완료");
		}else {
			throw new Exception();
		}
	}
	
	/* 컨텐츠 이미지 찾기 & 이동 */
	public int productsContentsImageFind(int pds_NO, String str, String pds_Reg_Date) {
		String pds_contents = str;
		log.info(pds_contents);
		int countMatches = StringUtils.countMatches(pds_contents, "/resources/upload/products/contents/"+pds_Reg_Date+"/"+pds_NO+"/");
		/* 콘텐츠 내용의 이미지를 앞에서 부터 하나씩 찾아서 임시폴더의 이미지를 실제 경로로 옮겨준다. */
		log.info("url이 일치하는 횟수 : "+ countMatches);
		/* 이미지 개수와 이름을 배열에 담아서 전송 */
		String[] array = new String[countMatches];
		for(int i=0; i<countMatches; i++) {
			String image_name = StringUtils.substringBetween(pds_contents, "/resources/upload/products/contents/"+pds_Reg_Date+"/"+pds_NO+"/","\">");
			log.info(i+"횟수의 이미지 명 : "+ image_name);
			pds_contents = pds_contents.replace("<img src=\"/resources/upload/products/contents/"+pds_Reg_Date+"/"+pds_NO+"/"+image_name+"\">", "");
			/* 찾은 이미지는 문자열에서 삭제 */
			array[i] = image_name;
			/* log.info(image_name); */
		}
		int image_result = productsContentsImageMove(pds_NO, array, pds_Reg_Date);
		
		return image_result;
	}
	
	
	/* 대표이미지 이동 */
	public int productsImageMove(int pds_NO, String pds_Image, String pds_Reg_Date) {
		/*
		 * SimpleDateFormat read = new SimpleDateFormat ( "yyyy-MM-dd"); String date =
		 * read.format(pds_Reg_Date);
		 */
		
		File original_dir = new File("C:\\Files\\Apache Software Foundation\\Tomcat 9.0\\webapps\\ROOT\\resources\\upload\\temp");
		File move_dir1 = new File("C:\\Files\\Apache Software Foundation\\Tomcat 9.0\\webapps\\ROOT\\resources\\upload\\products");
		File move_dir2 = new File("C:\\Files\\Apache Software Foundation\\Tomcat 9.0\\webapps\\ROOT\\resources\\upload\\products\\images");
		File move_dir3 = new File("C:\\Files\\Apache Software Foundation\\Tomcat 9.0\\webapps\\ROOT\\resources\\upload\\products\\images\\"+pds_Reg_Date);
		File move_dir4 = new File("C:\\Files\\Apache Software Foundation\\Tomcat 9.0\\webapps\\ROOT\\resources\\upload\\products\\images\\"+pds_Reg_Date+"\\"+pds_NO);
		
		//File original_dir = new File("C:\\Files\\eclipse-workspace\\.metadata\\.plugins\\org.eclipse.wst.server.core\\tmp0\\wtpwebapps\\StoreProject\\resources\\upload\\temp");
		//File move_dir1 = new File("C:\\Files\\eclipse-workspace\\.metadata\\.plugins\\org.eclipse.wst.server.core\\tmp0\\wtpwebapps\\StoreProject\\resources\\upload\\products");
		//File move_dir2 = new File("C:\\Files\\eclipse-workspace\\.metadata\\.plugins\\org.eclipse.wst.server.core\\tmp0\\wtpwebapps\\StoreProject\\resources\\upload\\products\\images");
		//File move_dir3 = new File("C:\\Files\\eclipse-workspace\\.metadata\\.plugins\\org.eclipse.wst.server.core\\tmp0\\wtpwebapps\\StoreProject\\resources\\upload\\products\\images\\"+pds_Reg_Date);
		//File move_dir4 = new File("C:\\Files\\eclipse-workspace\\.metadata\\.plugins\\org.eclipse.wst.server.core\\tmp0\\wtpwebapps\\StoreProject\\resources\\upload\\products\\images\\"+pds_Reg_Date+"\\"+pds_NO);
				
		
		if(!move_dir1.exists()) {
			move_dir1.mkdir();
			log.info("첫번째 이동할 폴더를 생성했습니다.");
		}
		if(!move_dir2.exists()){
			move_dir2.mkdir();
			log.info("두번째 이동할 폴더를 생성했습니다.");
		}
		if(!move_dir3.exists()){
			move_dir3.mkdir();
			log.info("세번째 이동할 폴더를 생성했습니다.");
		}
		if(!move_dir4.exists()){
			move_dir4.mkdir();
			log.info("네번째 이동할 폴더를 생성했습니다.");
		}
		
		String[] array = pds_Image.split(",");
		for(int i=0; i<array.length; i++) {
			File original_file = new File(original_dir+"\\"+array[i]);
			File move_file = new File(move_dir4+"\\"+array[i]);
			try {
	            
	            FileInputStream fis = new FileInputStream(original_file); //원본 파일
	            FileOutputStream fos = new FileOutputStream(move_file);	  //복사 파일
	            
	            int fileByte = 0; 
	            // fis.read()가 -1 이면 파일을 다 읽은것
	            while((fileByte = fis.read()) != -1) {
	                fos.write(fileByte);
	            }
	            //자원사용종료
	            fis.close();
	            fos.close();
	        } catch (FileNotFoundException e) {
	            // 원본 파일이 없을 경우 엑셉션
	        	log.info(array[i]+" 이미지를 찾을 수 없습니다.");
	        	for(int z=0; z<i; z++) {
	        		File delete_file = new File(move_dir4+"\\"+array[z]);
	        		if(delete_file.delete()) {
	        			log.info("옮긴 폴더의 "+array[z]+" 이미지 삭제 완료");
	        		}
	        	}
	            e.printStackTrace();
	            return 1;
	        } catch (IOException e) {
	            // 오류 발생 엑셉션
	        	for(int z=0; z<i; z++) {
	        		File delete_file = new File(move_dir4+"\\"+array[z]);
	        		if(delete_file.delete()) {
	        			log.info("옮긴 폴더의 "+array[z]+" 이미지 삭제 완료");
	        		}
	        	}
	            e.printStackTrace();
	            return 2;
	        }
		}
        log.info("이미지 이동 완료");
		//이동이 끝나면 다시 기존 이미지를 삭제 한다.
		//위에서 하지 않은 이유는 실패했을 경우 기존 이미지를 재활용 가능하게 하기 위해서 (상품 등록 페이지에서 넘어가지 않았기 때문에)
		for(int i=0; i<array.length; i++) {
			File delete_file = new File(original_dir+"\\"+array[i]);
			if(delete_file.delete()) {
    			log.info(array[i]+" 이미지 삭제 완료");
    		}
		}
		return 0;
	}
	
	/* 콘텐츠 이미지 이동 */
	public int productsContentsImageMove(int pds_NO, String[] array, String pds_Reg_Date) {
		/*
		 * SimpleDateFormat read = new SimpleDateFormat ( "yyyy-MM-dd"); String date =
		 * read.format(pds_Reg_Date);
		 */
		
		File original_dir = new File("C:\\Files\\Apache Software Foundation\\Tomcat 9.0\\webapps\\ROOT\\resources\\upload\\temp");
		File move_dir1 = new File("C:\\Files\\Apache Software Foundation\\Tomcat 9.0\\webapps\\ROOT\\resources\\upload\\products");
		File move_dir2 = new File("C:\\Files\\Apache Software Foundation\\Tomcat 9.0\\webapps\\ROOT\\resources\\upload\\products\\contents");
		File move_dir3 = new File("C:\\Files\\Apache Software Foundation\\Tomcat 9.0\\webapps\\ROOT\\resources\\upload\\products\\contents\\"+pds_Reg_Date);
		File move_dir4 = new File("C:\\Files\\Apache Software Foundation\\Tomcat 9.0\\webapps\\ROOT\\resources\\upload\\products\\contents\\"+pds_Reg_Date+"\\"+pds_NO);
		
		//File original_dir = new File("C:\\Files\\eclipse-workspace\\.metadata\\.plugins\\org.eclipse.wst.server.core\\tmp0\\wtpwebapps\\StoreProject\\resources\\upload\\temp");
		//File move_dir1 = new File("C:\\Files\\eclipse-workspace\\.metadata\\.plugins\\org.eclipse.wst.server.core\\tmp0\\wtpwebapps\\StoreProject\\resources\\upload\\products");
		//File move_dir2 = new File("C:\\Files\\eclipse-workspace\\.metadata\\.plugins\\org.eclipse.wst.server.core\\tmp0\\wtpwebapps\\StoreProject\\resources\\upload\\products\\images");
		//File move_dir3 = new File("C:\\Files\\eclipse-workspace\\.metadata\\.plugins\\org.eclipse.wst.server.core\\tmp0\\wtpwebapps\\StoreProject\\resources\\upload\\products\\images\\"+pds_Reg_Date);
		//File move_dir4 = new File("C:\\Files\\eclipse-workspace\\.metadata\\.plugins\\org.eclipse.wst.server.core\\tmp0\\wtpwebapps\\StoreProject\\resources\\upload\\products\\images\\"+pds_Reg_Date+"\\"+pds_NO);
				
		
		if(!move_dir1.exists()) {
			move_dir1.mkdir();
			log.info("첫번째 이동할 폴더를 생성했습니다.");
		}
		if(!move_dir2.exists()){
			move_dir2.mkdir();
			log.info("두번째 이동할 폴더를 생성했습니다.");
		}
		if(!move_dir3.exists()){
			move_dir3.mkdir();
			log.info("세번째 이동할 폴더를 생성했습니다.");
		}
		if(!move_dir4.exists()){
			move_dir4.mkdir();
			log.info("네번째 이동할 폴더를 생성했습니다.");
		}
		
		
		log.info("array test : "+array.length);
		
		for(int i=0; i<array.length; i++) {
			log.info("array[i] test : "+array[i]);
			File original_file = new File(original_dir+"\\"+array[i]);
			File move_file = new File(move_dir4+"\\"+array[i]);
			try {
	            
	            FileInputStream fis = new FileInputStream(original_file); //원본 파일
	            FileOutputStream fos = new FileOutputStream(move_file);	  //복사 파일
	            
	            int fileByte = 0; 
	            // fis.read()가 -1 이면 파일을 다 읽은것
	            while((fileByte = fis.read()) != -1) {
	                fos.write(fileByte);
	            }
	            //자원사용종료
	            fis.close();
	            fos.close();
	        } catch (FileNotFoundException e) {
	            // 원본 파일이 없을 경우 엑셉션
	        	log.info(array[i]+" 이미지를 찾을 수 없습니다.");
	        	for(int z=0; z<i; z++) {
	        		File delete_file = new File(move_dir4+"\\"+array[z]);
	        		if(delete_file.delete()) {
	        			log.info("옮긴 폴더의 "+array[z]+" 이미지 삭제 완료");
	        		}
	        	}
	            e.printStackTrace();
	            return 1;
	        } catch (IOException e) {
	            // 오류 발생 엑셉션
	        	for(int z=0; z<i; z++) {
	        		File delete_file = new File(move_dir4+"\\"+array[z]);
	        		if(delete_file.delete()) {
	        			log.info("옮긴 폴더의 "+array[z]+" 이미지 삭제 완료");
	        		}
	        	}
	            e.printStackTrace();
	            return 2;
	        }
		}
		//이동이 끝나면 다시 기존 이미지를 삭제 한다.
		//위에서 하지 않은 이유는 실패했을 경우 기존 이미지를 재활용 가능하게 하기 위해서 (상품 등록 페이지에서 넘어가지 않았기 때문에)
		for(int i=0; i<array.length; i++) {
			File delete_file = new File(original_dir+"\\"+array[i]);
			if(delete_file.delete()) {
    			log.info(array[i]+" 이미지 삭제 완료");
    		}
		}
		return 0;
	}
	
	/* 인기 이미지 이동 */
	public int productsVogueImageMove(int pds_NO, String pds_Vogue_Image, String pds_Reg_Date) {
		File original_dir = new File("C:\\Files\\Apache Software Foundation\\Tomcat 9.0\\webapps\\ROOT\\resources\\upload\\temp");
		File move_dir1 = new File("C:\\Files\\Apache Software Foundation\\Tomcat 9.0\\webapps\\ROOT\\resources\\upload\\products");
		File move_dir2 = new File("C:\\Files\\Apache Software Foundation\\Tomcat 9.0\\webapps\\ROOT\\resources\\upload\\products\\vogue");
		File move_dir3 = new File("C:\\Files\\Apache Software Foundation\\Tomcat 9.0\\webapps\\ROOT\\resources\\upload\\products\\vogue\\"+pds_Reg_Date);
		File move_dir4 = new File("C:\\Files\\Apache Software Foundation\\Tomcat 9.0\\webapps\\ROOT\\resources\\upload\\products\\vogue\\"+pds_Reg_Date+"\\"+pds_NO);
		
		//File original_dir = new File("C:\\Files\\eclipse-workspace\\.metadata\\.plugins\\org.eclipse.wst.server.core\\tmp0\\wtpwebapps\\StoreProject\\resources\\upload\\temp");
		//File move_dir1 = new File("C:\\Files\\eclipse-workspace\\.metadata\\.plugins\\org.eclipse.wst.server.core\\tmp0\\wtpwebapps\\StoreProject\\resources\\upload\\products");
		//File move_dir2 = new File("C:\\Files\\eclipse-workspace\\.metadata\\.plugins\\org.eclipse.wst.server.core\\tmp0\\wtpwebapps\\StoreProject\\resources\\upload\\products\\images");
		//File move_dir3 = new File("C:\\Files\\eclipse-workspace\\.metadata\\.plugins\\org.eclipse.wst.server.core\\tmp0\\wtpwebapps\\StoreProject\\resources\\upload\\products\\images\\"+pds_Reg_Date);
		//File move_dir4 = new File("C:\\Files\\eclipse-workspace\\.metadata\\.plugins\\org.eclipse.wst.server.core\\tmp0\\wtpwebapps\\StoreProject\\resources\\upload\\products\\images\\"+pds_Reg_Date+"\\"+pds_NO);
		
		if(!move_dir1.exists()) {
			move_dir1.mkdir();
			log.info("첫번째 이동할 폴더를 생성했습니다.");
		}
		if(!move_dir2.exists()){
			move_dir2.mkdir();
			log.info("두번째 이동할 폴더를 생성했습니다.");
		}
		if(!move_dir3.exists()){
			move_dir3.mkdir();
			log.info("세번째 이동할 폴더를 생성했습니다.");
		}
		if(!move_dir4.exists()){
			move_dir4.mkdir();
			log.info("네번째 이동할 폴더를 생성했습니다.");
		}
		
		String file_name = pds_Vogue_Image;
		File original_file = new File(original_dir+"\\"+file_name);
		File move_file = new File(move_dir4+"\\"+file_name);
		
		try {
            
            FileInputStream fis = new FileInputStream(original_file); //원본 파일
            FileOutputStream fos = new FileOutputStream(move_file);	  //복사 파일
            
            int fileByte = 0; 
            // fis.read()가 -1 이면 파일을 다 읽은것
            while((fileByte = fis.read()) != -1) {
                fos.write(fileByte);
            }
            //자원사용종료
            fis.close();
            fos.close();
		} catch (FileNotFoundException e) {
            // 원본 파일이 없을 경우 엑셉션
        	log.info(file_name+" 이미지를 찾을 수 없습니다.");
    		File delete_file = new File(move_dir4+"\\"+file_name);
    		if(delete_file.delete()) {
    			log.info("옮긴 폴더의 "+file_name+" 이미지 삭제 완료");
    		}
            e.printStackTrace();
            return 1;
        } catch (IOException e) {
            // 오류 발생 엑셉션
    		File delete_file = new File(move_dir4+"\\"+file_name);
    		if(delete_file.delete()) {
    			log.info("옮긴 폴더의 "+file_name+" 이미지 삭제 완료");
    		}
            e.printStackTrace();
            return 2;
        }
		log.info("이미지 이동 완료");
		//이동이 끝나면 다시 기존 이미지를 삭제 한다.
		//위에서 하지 않은 이유는 실패했을 경우 기존 이미지를 재활용 가능하게 하기 위해서 (상품 등록 페이지에서 넘어가지 않았기 때문에)
		File delete_file = new File(original_dir+"\\"+file_name);
		if(delete_file.delete()) {
			log.info(file_name+" 이미지 삭제 완료");
		}
		
		return 0;
	}
	
}