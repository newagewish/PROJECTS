package com.storeproject.service;

import java.util.List;

import com.storeproject.domain.admin.CardVO;
import com.storeproject.domain.admin.ProductsInfoVO;

public interface HomeService {
	// 카드 최신 순으로 불러오기
	public List<CardVO> selectProductsCard(int count);
	// 제품 최신 순으로 불러오기
	public List<ProductsInfoVO> selectProductsNew(int count);
	// 인기도 순, 최신 순으로 제품 불러오기
	public List<ProductsInfoVO> selectProductsVogue(int count);
	// 세일 제품 최신 순으로 불러오기
	public List<ProductsInfoVO> selectProductsSale(int count);
	// 전체 제품 불러오기
	public List<ProductsInfoVO> selectProductsAll(int count, String charater, String option);
	
	public int selectProductsAllcount(String charater, String option);
	
	// 뒤로가기 hash 카운트 값 만큼 제품 정보 가져오기
		// 이전에 불러 왔던 최신 카드 개수 만큼 제품 불러오기
		public List<CardVO> selectHashCard(int count);
		// 이전에 불러 왔던 최신 제품 개수 만큼 제품 불러오기
		public List<ProductsInfoVO> selectHashNew(int count);
		// 이전에 불러 왔던 인기 제품 개수 만큼 제품 불러오기
		public List<ProductsInfoVO> selectHashVogue(int count);
		// 이전에 불러 왔던 세일 제품 개수 만큼 제품 불러오기
		public List<ProductsInfoVO> selectHashSale(int count);
		// 이전에 불러 왔던 제품 개수 만큼 조건과 동일하게 제품 불러오기
		public List<ProductsInfoVO> selectHashAll(int count, String charater, String option);
		
		
		
}
