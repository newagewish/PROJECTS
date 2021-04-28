package com.storeproject.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.storeproject.domain.admin.ProductsInfoVO;
import com.storeproject.domain.header.RelationCategoryVO;

public interface ListMapper {

	//카테고리 이미지 파일명 가져오기
	public String selectCategoryImg(@Param("columnNM")String columnNM);
	//세부 카테고리들 이름 가져오기
	public List<RelationCategoryVO> selectSubCategory(@Param("columnNM")String columnNM);
	//옵션 선택 시 제품 정보 목록 가져오기
	
	
	//상위 메뉴 전체
	public List<ProductsInfoVO> listAllOptionSales(@Param("count")int count);
	public List<ProductsInfoVO> listAllOptionSalesCharater(@Param("count")int count, @Param("charater")String charater);
	public List<ProductsInfoVO> listAllOptionNew(@Param("count")int count);
	public List<ProductsInfoVO> listAllOptionNewCharater(@Param("count")int count, @Param("charater")String charater);
	public List<ProductsInfoVO> listAllOptionLow(@Param("count")int count);
	public List<ProductsInfoVO> listAllOptionLowCharater(@Param("count")int count, @Param("charater")String charater);
	public List<ProductsInfoVO> listAllOptionHigh(@Param("count")int count);
	public List<ProductsInfoVO> listAllOptionHighCharater(@Param("count")int count, @Param("charater")String charater);
				//전체 카테고리 불러온 제품 개수
				public int listAllCount();
				public int listAllCountCharater(String charater);
				
	//전체를 제외한 메인카테고리 선택이었을 경우
	public List<ProductsInfoVO> listMainOptionSales(@Param("count")int count, @Param("columnNM")String columnNM);
	public List<ProductsInfoVO> listMainOptionSalesCharater(@Param("count")int count, @Param("charater")String charater, @Param("columnNM")String columnNM);
	public List<ProductsInfoVO> listMainOptionNew(@Param("count")int count, @Param("columnNM")String columnNM);
	public List<ProductsInfoVO> listMainOptionNewCharater(@Param("count")int count, @Param("charater")String charater, @Param("columnNM")String columnNM);
	public List<ProductsInfoVO> listMainOptionLow(@Param("count")int count, @Param("columnNM")String columnNM);
	public List<ProductsInfoVO> listMainOptionLowCharater(@Param("count")int count, @Param("charater")String charater, @Param("columnNM")String columnNM);
	public List<ProductsInfoVO> listMainOptionHigh(@Param("count")int count, @Param("columnNM")String columnNM);
	public List<ProductsInfoVO> listMainOptionHighCharater(@Param("count")int count, @Param("charater")String charater, @Param("columnNM")String columnNM);
				//메인카테고리 불러온 제품 개수
				public int listMainCount(@Param("columnNM")String columnNM);
				public int listMainCountCharater(@Param("charater")String charater, @Param("columnNM")String columnNM);

	//세부카테고리 선택이었을 경우
	public List<ProductsInfoVO> listSubOptionSales(@Param("count")int count, @Param("columnNM")String columnNM);
	public List<ProductsInfoVO> listSubOptionSalesCharater(@Param("count")int count, @Param("charater")String charater, @Param("columnNM")String columnNM);
	public List<ProductsInfoVO> listSubOptionNew(@Param("count")int count, @Param("columnNM")String columnNM);
	public List<ProductsInfoVO> listSubOptionNewCharater(@Param("count")int count, @Param("charater")String charater, @Param("columnNM")String columnNM);
	public List<ProductsInfoVO> listSubOptionLow(@Param("count")int count, @Param("columnNM")String columnNM);
	public List<ProductsInfoVO> listSubOptionLowCharater(@Param("count")int count, @Param("charater")String charater, @Param("columnNM")String columnNM);
	public List<ProductsInfoVO> listSubOptionHigh(@Param("count")int count, @Param("columnNM")String columnNM);
	public List<ProductsInfoVO> listSubOptionHighCharater(@Param("count")int count, @Param("charater")String charater, @Param("columnNM")String columnNM);
				//세부카테고리 불러온 제품 개수
				public int listSubCount(@Param("columnNM")String columnNM);
				public int listSubCountCharater(@Param("charater")String charater, @Param("columnNM")String columnNM);

	//해시 조건별 제품 정보 가져오기
	public List<ProductsInfoVO> listHashAllOptionSales(@Param("count")int count);
	public List<ProductsInfoVO> listHashAllOptionSalesCharater(@Param("count")int count, @Param("charater")String charater);
	public List<ProductsInfoVO> listHashAllOptionNew(@Param("count")int count);
	public List<ProductsInfoVO> listHashAllOptionNewCharater(@Param("count")int count, @Param("charater")String charater);
	public List<ProductsInfoVO> listHashAllOptionLow(@Param("count")int count);
	public List<ProductsInfoVO> listHashAllOptionLowCharater(@Param("count")int count, @Param("charater")String charater);
	public List<ProductsInfoVO> listHashAllOptionHigh(@Param("count")int count);
	public List<ProductsInfoVO> listHashAllOptionHighCharater(@Param("count")int count, @Param("charater")String charater);
	
	public List<ProductsInfoVO> listHashMainOptionSales(@Param("count")int count, @Param("columnNM")String columnNM);
	public List<ProductsInfoVO> listHashMainOptionSalesCharater(@Param("count")int count, @Param("charater")String charater, @Param("columnNM")String columnNM);
	public List<ProductsInfoVO> listHashMainOptionNew(@Param("count")int count, @Param("columnNM")String columnNM);
	public List<ProductsInfoVO> listHashMainOptionNewCharater(@Param("count")int count, @Param("charater")String charater, @Param("columnNM")String columnNM);
	public List<ProductsInfoVO> listHashMainOptionLow(@Param("count")int count, @Param("columnNM")String columnNM);
	public List<ProductsInfoVO> listHashMainOptionLowCharater(@Param("count")int count, @Param("charater")String charater, @Param("columnNM")String columnNM);
	public List<ProductsInfoVO> listHashMainOptionHigh(@Param("count")int count, @Param("columnNM")String columnNM);
	public List<ProductsInfoVO> listHashMainOptionHighCharater(@Param("count")int count, @Param("charater")String charater, @Param("columnNM")String columnNM);
	
	public List<ProductsInfoVO> listHashSubOptionSales(@Param("count")int count, @Param("columnNM")String columnNM);
	public List<ProductsInfoVO> listHashSubOptionSalesCharater(@Param("count")int count, @Param("charater")String charater, @Param("columnNM")String columnNM);
	public List<ProductsInfoVO> listHashSubOptionNew(@Param("count")int count, @Param("columnNM")String columnNM);
	public List<ProductsInfoVO> listHashSubOptionNewCharater(@Param("count")int count, @Param("charater")String charater, @Param("columnNM")String columnNM);
	public List<ProductsInfoVO> listHashSubOptionLow(@Param("count")int count, @Param("columnNM")String columnNM);
	public List<ProductsInfoVO> listHashSubOptionLowCharater(@Param("count")int count, @Param("charater")String charater, @Param("columnNM")String columnNM);
	public List<ProductsInfoVO> listHashSubOptionHigh(@Param("count")int count, @Param("columnNM")String columnNM);
	public List<ProductsInfoVO> listHashSubOptionHighCharater(@Param("count")int count, @Param("charater")String charater, @Param("columnNM")String columnNM);


	
}
