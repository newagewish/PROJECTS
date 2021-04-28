package com.storeproject.mapper.admin;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.storeproject.domain.header.MainCategoryVO;
import com.storeproject.domain.header.RelationCategoryVO;
import com.storeproject.domain.header.SubCategoryVO;


public interface CategoryMapper {


	// 카테고리 관리 - 대표 카테고리 목록 불러오기
	public List<MainCategoryVO> getMainCategory();

	// 카테고리 관리 - 세부 카테고리 목록 불러오기(메인 카테고리 선택 시)
	public List<SubCategoryVO> getSubCategory(MainCategoryVO mcvo);
	
	// 카테고리 관리 - 대표 카테고리 수정
	public void updateMainCategory(RelationCategoryVO rcvo);

	// 카테고리 관리 - 세부 카테고리 수정
	public void updateSubCategory(RelationCategoryVO rcvo);

	// 카테고리 관리 - 대표 카테고리 추가 - 컬럼 개수 조회
	public int findMainColumnCNT();
	
	// 카테고리 관리 - 서브 카테고리 추가 - 컬럼 개수 조회
	public int findSubColumnCNT();
	
	// 카테고리 관리 - 대표 카테고리 추가
	public void addMainCategory(@Param("main_column_NM") String main_column_NM, @Param("main_category_NM") String main_category_NM, @Param("subColumnNM") String subColumnNM, @Param("subColumnCNT") int subColumnCNT);
	
	// 카테고리 관리 - 세부 카테고리 추가
	public void addSubCategory(RelationCategoryVO rcvo);

	// 카테고리 관리 - 대표 카테고리 개수 카운트 +1
	public void updateMainColumnCNT();
	// 카테고리 관리 - 세부 카테고리 개수 카운트 +1
	public void updateSubColumnCNT();

	/* 새로 추가한 메인카테고리를 제품 메인 카테고리 테이블에 컬럼 추가 */
	public void updateProductsMainCategory(@Param("mc_colum_NM") String main_column_NM);
	/* 새로 추가한 세부카테고리를 제품 세부 카테고리 테이블에 컬럼 추가 */
	public void updateProductsSubCategory(@Param("sc_colum_NM")String sub_column_NM);

	// 카테고리 이미지 가져오기
	public String getCategoryImg(String column);
	// 카테고리 이미지 추가
	public void insertCategoryImg(@Param("column_NM")String ColumnNM, @Param("fileNM")String fileNM);
	// 카테고리 이미지 업데이트
	public void updateCategoryImg(@Param("column_NM")String ColumnNM, @Param("fileNM")String fileNM);

	

	
}
