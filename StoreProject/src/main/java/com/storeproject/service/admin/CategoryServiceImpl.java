package com.storeproject.service.admin;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.storeproject.domain.header.MainCategoryVO;
import com.storeproject.domain.header.RelationCategoryVO;
import com.storeproject.domain.header.SubCategoryVO;
import com.storeproject.mapper.admin.CategoryMapper;

import lombok.Setter;
import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class CategoryServiceImpl implements CategoryService{
	
	@Setter(onMethod_ = @Autowired)
	private CategoryMapper mapper;
	
	@Override
	public List<MainCategoryVO> getMainCategory() {
		/* log.info("카테고리 관리 서비스 호출 -> getMainCategory"); */
		return mapper.getMainCategory();
	}

	@Override
	public List<SubCategoryVO> getSubCategory(MainCategoryVO mcvo) {
		/* log.info("카테고리 관리 서비스 호출 -> getSubCategory"); */
		return mapper.getSubCategory(mcvo);
	}
	
	@Transactional
	@Override
	public void updateMainCategory(String fileNM, RelationCategoryVO rcvo) {
		/* log.info("카테고리 관리 서비스 호출 -> updateMainCategory"); */
		String mainColumnNM = rcvo.getMain_column_NM();
		mapper.updateMainCategory(rcvo);
		/* String old_fileNM = mapper.getCategoryImg(rcvo.getMain_column_NM()); */ //작업이 모두 끝난 뒤 기존 이미지 삭제를 위해
		if(fileNM!=null) {
			mapper.updateCategoryImg(mainColumnNM, fileNM);
			categoryImageMove(fileNM);	//DB에 입력이 끝나면 임시 폴더의 카테고리 이미지를 실제 경로에 이동과 삭제 처리
		}else {
			
		}
		
		/* categoryImageDelete(old_fileNM); */	//기존 이미지 삭제
	}

	@Transactional
	@Override
	public void updateSubCategory(String fileNM, RelationCategoryVO rcvo) {
		/* log.info("카테고리 관리 서비스 호출 -> updateSubCategory"); */
		/* String old_fileNM = mapper.getCategoryImg(rcvo.getSub_column_NM()); */	//작업이 모두 끝난 뒤 기존 이미지 삭제를 위해
		mapper.updateSubCategory(rcvo);
		String subColumnNM = rcvo.getSub_column_NM();
		if(fileNM!=null) {
			mapper.updateCategoryImg(subColumnNM, fileNM);
			categoryImageMove(fileNM);	//DB에 입력이 끝나면 임시 폴더의 카테고리 이미지를 실제 경로에 이동과 삭제 처리
		}else {
			
		}
		/* categoryImageDelete(old_fileNM); */	//기존 이미지 삭제
	}
	
	@Override
	public int findMainColumnCNT() {
		/* log.info("카테고리 관리 서비스 호출 -> findMainCategory"); */
		return mapper.findMainColumnCNT();
	}
	
	@Override
	public int findSubColumnCNT() {
		/* log.info("카테고리 관리 서비스 호출 -> findSubCategory"); */
		return mapper.findSubColumnCNT();
	}
	
	@Transactional
	@Override
	public void addMainCategory(String fileNM, RelationCategoryVO rcvo){
		/* log.info("카테고리 관리 서비스 호출 -> addMainCategory"); */
		/* 컬럼명 생성을 위해 컬럼명 갯수 조회 */
		int mainColumnCNT = mapper.findMainColumnCNT();
		int subColumnCNT = mapper.findSubColumnCNT();
		String mainColumnNM = "cmt_"+mainColumnCNT;
		String subColumnNM = "cst_"+subColumnCNT;
		rcvo.setMain_column_NM(mainColumnNM);
		try {
			mapper.addMainCategory(mainColumnNM, rcvo.getMain_category_NM(), subColumnNM, subColumnCNT);
			/* 제품 카테고리 테이블에 추가한 카테고리 컬럼 추가 */
			mapper.updateProductsMainCategory(mainColumnNM);
			mapper.updateProductsSubCategory(subColumnNM);
			/* 카테고리 컬럼 갯수 카운트+1 증가 */
			mapper.updateMainColumnCNT();
			mapper.updateSubColumnCNT();
			mapper.insertCategoryImg(mainColumnNM, fileNM);	//메인카테고리 추가 때문에 메인 카테고리 컬럼을 준다.
			mapper.insertCategoryImg(subColumnNM, null);	//메인카테고리 추가 때문에 메인 카테고리 컬럼을 준다.
			categoryImageMove(fileNM);	//DB에 입력이 끝나면 임시 폴더의 카테고리 이미지를 실제 경로에 이동과 삭제 처리
		}catch(Exception e) {
			
		}
	}
	
	@Transactional
	@Override
	public void addSubCategory(String fileNM, RelationCategoryVO rcvo) {
		/* log.info("카테고리 관리 서비스 호출 -> addSubCategory"); */
		int subColumnCNT = mapper.findSubColumnCNT();
		String subColumnNM = "cst_"+subColumnCNT;
		rcvo.setSub_column_NM(subColumnNM);
		mapper.addSubCategory(rcvo);
		mapper.updateProductsSubCategory("cst_"+subColumnCNT);
		mapper.updateSubColumnCNT();
		
		mapper.insertCategoryImg(subColumnNM, fileNM); //세부카테고리 추가 때문에 세부 카테고리 컬럼을 준다.
		log.info(fileNM==null);
		if(fileNM!=null) {
			categoryImageMove(fileNM);	//DB에 입력이 끝나면 임시 폴더의 카테고리 이미지를 실제 경로에 이동과 삭제 처리
		}
	}

	@Override
	public String getCategoryImg(String column) {
		return mapper.getCategoryImg(column);
	}
	
	
	
	/* 카테고리 이미지 이동 */
	public int categoryImageMove(String fileNM) {
		File original_dir = new File("C:\\Files\\Apache Software Foundation\\Tomcat 9.0\\webapps\\ROOT\\resources\\upload\\temp");
		File move_dir = new File("C:\\Files\\Apache Software Foundation\\Tomcat 9.0\\webapps\\ROOT\\resources\\upload\\category");
		
		//File original_dir = new File("C:\\Files\\eclipse-workspace\\.metadata\\.plugins\\org.eclipse.wst.server.core\\tmp0\\wtpwebapps\\StoreProject\\resources\\upload\\temp");
		//File move_dir = new File("C:\\Files\\eclipse-workspace\\.metadata\\.plugins\\org.eclipse.wst.server.core\\tmp0\\wtpwebapps\\StoreProject\\resources\\upload\\category");
		
		if(!move_dir.exists()) {
			move_dir.mkdir();
			log.info("이동할 폴더를 생성했습니다.");
		}
		
		String file_name = fileNM;
		File original_file = new File(original_dir+"\\"+file_name);
		File move_file = new File(move_dir+"\\"+file_name);
		
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
        	log.info(file_name+" 카테고리 이미지를 찾을 수 없습니다.");
    		File delete_file = new File(move_dir+"\\"+file_name);
    		if(delete_file.delete()) {
    			log.info("옮긴 폴더의 "+file_name+" 카테고리 이미지 삭제 완료");
    		}
            e.printStackTrace();
            return 1;
        } catch (IOException e) {
            // 오류 발생 엑셉션
    		File delete_file = new File(move_dir+"\\"+file_name);
    		if(delete_file.delete()) {
    			log.info("옮긴 폴더의 "+file_name+" 카테고리 이미지 삭제 완료");
    		}
            e.printStackTrace();
            return 2;
        }
		log.info("카테고리 이미지 이동 완료");
		//이동이 끝나면 다시 기존 이미지를 삭제 한다.
		//위에서 하지 않은 이유는 실패했을 경우 기존 이미지를 재활용 가능하게 하기 위해서 (상품 등록 페이지에서 넘어가지 않았기 때문에)
		File delete_file = new File(original_dir+"\\"+file_name);
		if(delete_file.delete()) {
			log.info(file_name+" 카테고리 이미지 삭제 완료");
		}
		return 0;
	}

	/* 이전 이미지 삭제 */
	public void categoryImageDelete(String fileNM) {
		File delete_dir = new File("C:\\Files\\Apache Software Foundation\\Tomcat 9.0\\webapps\\ROOT\\resources\\upload\\category");
		//File delete_dir = new File("C:\\Files\\eclipse-workspace\\.metadata\\.plugins\\org.eclipse.wst.server.core\\tmp0\\wtpwebapps\\StoreProject\\resources\\upload\\category");
		
		File delete_file = new File(delete_dir+"\\"+fileNM);
		if(delete_file.delete()) {
			log.info("옮긴 폴더의 "+fileNM+" 카테고리 이미지 삭제 완료");
		}
	}
}
