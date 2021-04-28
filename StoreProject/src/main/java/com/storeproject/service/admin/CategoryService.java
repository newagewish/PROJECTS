package com.storeproject.service.admin;

import java.util.List;

import com.storeproject.domain.header.MainCategoryVO;
import com.storeproject.domain.header.RelationCategoryVO;
import com.storeproject.domain.header.SubCategoryVO;



public interface CategoryService {
	// 카테고리 관리 - 대표 카테고리 목록 불러오기
	public List<MainCategoryVO> getMainCategory();
	
	
	// 카테고리 관리 - 세부 카테고리 목록 불러오기(메인 카테고리 선택 시)
	public List<SubCategoryVO> getSubCategory(MainCategoryVO mcvo);

	// 카테고리 관리 - 대표 카테고리 업데이트
	public void updateMainCategory(String fileNM, RelationCategoryVO rcvo);

	// 카테고리 관리 - 세부 카테고리 업데이트
	public void updateSubCategory(String fileNM, RelationCategoryVO rcvo);


	// 카테고리 관리 - 대표 카테고리 카운트 조회
	public int findMainColumnCNT();
	
	// 카테고리 관리 - 서브 카테고리 카운트 조회
	int findSubColumnCNT();

	// 카테고리 관리 - 대표 카테고리 추가
	public void addMainCategory(String fileNM, RelationCategoryVO rcvo);

	// 카테고리 관리 - 세부 카테고리 추가
	public void addSubCategory(String fileNM, RelationCategoryVO rcvo);

	// 카테고리 이미지 가져오기
	public String getCategoryImg(String column);


	
	
}
