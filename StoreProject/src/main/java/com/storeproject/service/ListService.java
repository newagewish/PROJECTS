package com.storeproject.service;

import java.util.List;

import com.storeproject.domain.admin.ProductsInfoVO;
import com.storeproject.domain.header.RelationCategoryVO;

public interface ListService {

	//카테고리 이미지 파일명 가져오기
	public String selectCategoryImg(String columnNM);
	//세부 카테고리들 이름 가져오기
	public List<RelationCategoryVO> selectSubCategory(String columnNM);
	
	//옵션 선택 시 제품 정보 목록 가져오기
	public List<ProductsInfoVO> categoryOption(int count, String charater, String option, String column);
	
	//불러온 제품 개수
	public int listCount(String charater, String column);
	
	//해시 제품 정보 가져오기
	public List<ProductsInfoVO> listHash(int count, String charater, String option, String column);

}
