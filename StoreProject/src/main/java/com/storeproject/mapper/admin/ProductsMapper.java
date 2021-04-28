package com.storeproject.mapper.admin;

import org.apache.ibatis.annotations.Param;

import com.storeproject.domain.admin.ProductsInfoVO;
import com.storeproject.domain.admin.ProductsOpVO;

public interface ProductsMapper {

	/* 제품 정보 insert */
	/* insert 후 자동생성되는 제품 번호를 리턴 */
	public int insertProductsInfo(ProductsInfoVO pds_info);
	/* 선택한 메인 카테고리 insert */
	public void insertProductsMainCategory(@Param("no") int pds_NO, @Param("maincategory") String[] mainCategory);
	/* 선택한 세부 카테고리 insert */
	public void insertProductsSubCategory(@Param("no")int pds_NO, @Param("subcategory") String[] subCategory);
	/* 선택한 캐릭터 카테고리 insert */
	public void insertProductsCharater(@Param("no")int pds_NO, @Param("charater")String[] chrater);
	/* 선택한 색상 카테고리 insert */
	public void insertProductsColor(@Param("no")int pds_NO, @Param("colorArray")String[] color);
	/* 선택한 옵션이 '옵션 없음' 일 때 insert */
	public void insertProductsNullOption(@Param("no")int pds_NO, @Param("pds_op") ProductsOpVO pds_op);
	/* 선택한 옵션이 '사이즈, 캐릭터, 기종' 등 일 때 insert */
	public void insertProductsArrayOption(@Param("no")int pds_NO, @Param("optionArray") String[] option);
	/* 선택한 캐릭터 카테고리가 없을 때 insert */
	public void insertProductsCharaterNull(@Param("no")int pds_NO);
	/* 선택한 색상 카테고리가 없을 때 insert */
	public void insertProductsColorNull(@Param("no")int pds_NO);
	/* 선택한 모든 카테고리 컬럼명을 항목 별 텍스트로 저장 */
	public void insertArrange(@Param("no")int pds_NO, @Param("maintext")String maintext, @Param("subtext")String subtext, @Param("chartertext")String chartertext, @Param("colortext")String colortext);
	/* 제품 콘텐츠 이미지 url 경로 수정 */
	public void updateProductsContentsUrl(@Param("no")int pds_NO, @Param("str")String str);
}
