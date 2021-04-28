package com.storeproject.mapper.header;

import java.util.List;

import com.storeproject.domain.header.MainCategoryVO;
import com.storeproject.domain.header.SubCategoryVO;

public interface HeaderMapper {
	
	//헤더 대표 카테고리 목록 호출
	public List<MainCategoryVO> selectMainCategory();
	//헤더 세부 카테고리 목록 호출
	public List<SubCategoryVO> selectSubCategory(MainCategoryVO mcvo);
}
