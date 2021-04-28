package com.storeproject.service.admin;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.storeproject.domain.admin.CardVO;
import com.storeproject.domain.admin.ProductsInfoVO;
import com.storeproject.mapper.admin.CardAddMapper;

import lombok.Setter;
import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class CardAddServiceImpl implements CardAddService{
	
	@Setter(onMethod_ = @Autowired)
	private CardAddMapper mapper;
	
	@Override
	public List<ProductsInfoVO> selectProductsCard(int count) {
		return mapper.selectProductsCard(count);
	}

	@Override
	public ProductsInfoVO selectChoiceCard(int no) {
		return mapper.selectChoiceCard(no);
	}
	
	@Transactional(rollbackFor = {Exception.class})
	@Override
	public int insertCard(CardVO cardvo) {
		try {
			mapper.insertCard(cardvo);	//insert 후 card_NO 값이 리턴 된다. (vo에 자동 값 저장)
			int card_NO = cardvo.getCard_NO();
			
			//insert 후 card_NO를 가지고 임시 폴더의 이미지를 옮기는 작업을 한다.
			/* 카드 이미지 옮기기 */
			int image_result = cardImageMove(card_NO, cardvo.getCard_Img(), cardvo.getCard_Reg_Date());
			if(image_result==0) {
				log.info("카드이미지 이동 완료");
			}else {
				throw new Exception();
			}
			if(cardvo.getCard_Contents() != null) {
				// 콘텐츠 이미지 경로 수정 밑 찾고 이미지 이동
				String str = cardvo.getCard_Contents();
				str = str.replaceAll("/resources/upload/temp/", "/resources/upload/card/contents/"+cardvo.getCard_Reg_Date()+"/"+card_NO+"/");
				//수정한 경로가 내용에 반영 되도록 업데이트 해준다.
				mapper.updateCardContents(str, card_NO);
				
				int contents_result = cardContentsImageFind(card_NO, str, cardvo.getCard_Reg_Date());
				if(contents_result==0) {
					log.info("컨텐츠 이미지 이동 완료");
				}else {
					throw new Exception();
				}
				return 1;
			}
			return 1;
		}catch(Exception e) {
			return 0;
		}	
	}
	
	
	
	
	
	
	/* 카드 이미지 이동 */
	public int cardImageMove(int card_NO, String card_Img, String card_Reg_Date) {
		/*
		 * SimpleDateFormat read = new SimpleDateFormat ( "yyyy-MM-dd"); String date =
		 * read.format(pds_Reg_Date);
		 */
		
		File original_dir = new File("C:\\Files\\Apache Software Foundation\\Tomcat 9.0\\webapps\\ROOT\\resources\\upload\\temp");
		File move_dir1 = new File("C:\\Files\\Apache Software Foundation\\Tomcat 9.0\\webapps\\ROOT\\resources\\upload\\card");
		File move_dir2 = new File("C:\\Files\\Apache Software Foundation\\Tomcat 9.0\\webapps\\ROOT\\resources\\upload\\card\\images");
		File move_dir3 = new File("C:\\Files\\Apache Software Foundation\\Tomcat 9.0\\webapps\\ROOT\\resources\\upload\\card\\images\\"+card_Reg_Date);
		File move_dir4 = new File("C:\\Files\\Apache Software Foundation\\Tomcat 9.0\\webapps\\ROOT\\resources\\upload\\card\\images\\"+card_Reg_Date+"\\"+card_NO);
		
		//File original_dir = new File("C:\\Files\\eclipse-workspace\\.metadata\\.plugins\\org.eclipse.wst.server.core\\tmp0\\wtpwebapps\\StoreProject\\resources\\upload\\temp");
		//File move_dir1 = new File("C:\\Files\\eclipse-workspace\\.metadata\\.plugins\\org.eclipse.wst.server.core\\tmp0\\wtpwebapps\\StoreProject\\resources\\upload\\products");
		//File move_dir2 = new File("C:\\Files\\eclipse-workspace\\.metadata\\.plugins\\org.eclipse.wst.server.core\\tmp0\\wtpwebapps\\StoreProject\\resources\\upload\\products\\images");
		//File move_dir3 = new File("C:\\Files\\eclipse-workspace\\.metadata\\.plugins\\org.eclipse.wst.server.core\\tmp0\\wtpwebapps\\StoreProject\\resources\\upload\\products\\images\\"+card_Reg_Date);
		//File move_dir4 = new File("C:\\Files\\eclipse-workspace\\.metadata\\.plugins\\org.eclipse.wst.server.core\\tmp0\\wtpwebapps\\StoreProject\\resources\\upload\\products\\images\\"+card_Reg_Date+"\\"+card_NO);
				
		
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
		
		File original_file = new File(original_dir+"\\"+card_Img);
		File move_file = new File(move_dir4+"\\"+card_Img);
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
        	log.info(card_Img+" 이미지를 찾을 수 없습니다.");
    		File delete_file = new File(move_dir4+"\\"+card_Img);
    		if(delete_file.delete()) {
    			log.info("옮긴 폴더의 "+card_Img+" 이미지 삭제 완료");
    		}
            e.printStackTrace();
            return 1;
        } catch (IOException e) {
            // 오류 발생 엑셉션
    		File delete_file = new File(move_dir4+"\\"+card_Img);
    		if(delete_file.delete()) {
    			log.info("옮긴 폴더의 "+card_Img+" 이미지 삭제 완료");
    		}
            e.printStackTrace();
            return 2;
        }
        log.info("이미지 이동 완료");
		//이동이 끝나면 다시 기존 이미지를 삭제 한다.
		//위에서 하지 않은 이유는 실패했을 경우 기존 이미지를 재활용 가능하게 하기 위해서 (상품 등록 페이지에서 넘어가지 않았기 때문에)
		File delete_file = new File(original_dir+"\\"+card_Img);
		if(delete_file.delete()) {
			log.info(card_Img+" 이미지 삭제 완료");
		}
		return 0;
	}
	
	
	
	/* 컨텐츠 이미지 찾기 & 이동 */
	public int cardContentsImageFind(int card_NO, String str, String card_Reg_Date) {
		String card_contents = str;
		log.info(card_contents);
		int countMatches = StringUtils.countMatches(card_contents, "/resources/upload/card/contents/"+card_Reg_Date+"/"+card_NO+"/");
		/* 콘텐츠 내용의 이미지를 앞에서 부터 하나씩 찾아서 임시폴더의 이미지를 실제 경로로 옮겨준다. */
		log.info("url이 일치하는 횟수 : "+ countMatches);
		/* 이미지 개수와 이름을 배열에 담아서 전송 */
		String[] array = new String[countMatches];
		for(int i=0; i<countMatches; i++) {
			String image_name = StringUtils.substringBetween(card_contents, "/resources/upload/card/contents/"+card_Reg_Date+"/"+card_NO+"/","\">");
			log.info(i+"횟수의 이미지 명 : "+ image_name);
			card_contents = card_contents.replace("<img src=\"/resources/upload/card/contents/"+card_Reg_Date+"/"+card_NO+"/"+image_name+"\">", "");
			/* 찾은 이미지는 문자열에서 삭제 */
			array[i] = image_name;
			/* log.info(image_name); */
		}
		int image_result = cardContentsImageMove(card_NO, array, card_Reg_Date);
		
		return image_result;
	}
	
	/* 콘텐츠 이미지 이동 */
	public int cardContentsImageMove(int card_NO, String[] array, String card_Reg_Date) {
		/*
		 * SimpleDateFormat read = new SimpleDateFormat ( "yyyy-MM-dd"); String date =
		 * read.format(pds_Reg_Date);
		 */
		
		//File original_dir = new File("C:\\Files\\Apache Software Foundation\\Tomcat 9.0\\webapps\\ROOT\\resources\\upload\\temp");
		//File move_dir1 = new File("C:\\Files\\Apache Software Foundation\\Tomcat 9.0\\webapps\\ROOT\\resources\\upload\\card");
		//File move_dir2 = new File("C:\\Files\\Apache Software Foundation\\Tomcat 9.0\\webapps\\ROOT\\resources\\upload\\card\\images");
		//File move_dir3 = new File("C:\\Files\\Apache Software Foundation\\Tomcat 9.0\\webapps\\ROOT\\resources\\upload\\card\\images\\"+card_Reg_Date);
		//File move_dir4 = new File("C:\\Files\\Apache Software Foundation\\Tomcat 9.0\\webapps\\ROOT\\resources\\upload\\card\\images\\"+card_Reg_Date+"\\"+card_NO);
		
		File original_dir = new File("C:\\Files\\eclipse-workspace\\.metadata\\.plugins\\org.eclipse.wst.server.core\\tmp0\\wtpwebapps\\StoreProject\\resources\\upload\\temp");
		File move_dir1 = new File("C:\\Files\\eclipse-workspace\\.metadata\\.plugins\\org.eclipse.wst.server.core\\tmp0\\wtpwebapps\\StoreProject\\resources\\upload\\products");
		File move_dir2 = new File("C:\\Files\\eclipse-workspace\\.metadata\\.plugins\\org.eclipse.wst.server.core\\tmp0\\wtpwebapps\\StoreProject\\resources\\upload\\products\\images");
		File move_dir3 = new File("C:\\Files\\eclipse-workspace\\.metadata\\.plugins\\org.eclipse.wst.server.core\\tmp0\\wtpwebapps\\StoreProject\\resources\\upload\\products\\images\\"+card_Reg_Date);
		File move_dir4 = new File("C:\\Files\\eclipse-workspace\\.metadata\\.plugins\\org.eclipse.wst.server.core\\tmp0\\wtpwebapps\\StoreProject\\resources\\upload\\products\\images\\"+card_Reg_Date+"\\"+card_NO);
				
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
}
