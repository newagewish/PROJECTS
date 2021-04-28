package com.storeproject.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.storeproject.domain.admin.CardVO;
import com.storeproject.domain.admin.ProductsInfoVO;

public interface HomeMapper {
	// 카드 최신 순으로 불러오기
	public List<CardVO> selectProductsCard(int count);
	// 제품 최신 순으로 불러오기
	public List<ProductsInfoVO> selectProductsNew(int count);
	// 인기도 순, 최신 순으로 제품 불러오기
	public List<ProductsInfoVO> selectProductsVogue(int count);
	// 세일 제품 최신 순으로 불러오기
	public List<ProductsInfoVO> selectProductsSale(int count);
	// 전체 제품 불러오기
		//판매량순 - 캐릭터 전체
		public List<ProductsInfoVO> selectProductsAllall(@Param("count")int count);
		//판매량순 - 캐릭터 선택
		public List<ProductsInfoVO> selectProductsAllallcharater(@Param("count")int count, @Param("charater")String charater);
		//신상품순 - 캐릭터 전체
		public List<ProductsInfoVO> selectProductsAllnew(@Param("count")int count);
		//신상품순 - 캐릭터 선택
		public List<ProductsInfoVO> selectProductsAllnewcharater(@Param("count")int count, @Param("charater")String charater);
		//낮은 가격순 - 캐릭터 전체
		public List<ProductsInfoVO> selectProductsAlllow(@Param("count")int count);
		//낮은 가격순 - 캐릭터 선택
		public List<ProductsInfoVO> selectProductsAlllowcharater(@Param("count")int count, @Param("charater")String charater);
		//높은 가격순 - 캐릭터 전체
		public List<ProductsInfoVO> selectProductsAllhigh(@Param("count")int count);
		//높은 가격순 - 캐릭터 선택
		public List<ProductsInfoVO> selectProductsAllhighcharater(@Param("count")int count, @Param("charater")String charater);
		
		//전체 제품 조회수
		public int selectProductsAllCount();
		public int selectProductsAllCountCharater(@Param("charater")String charater);
		
		
	// 뒤로가기 hash 카운트 값 만큼 제품 정보 가져오기
		// 이전에 불러 왔던 카드 개수 만큼 제품 불러오기
		public List<CardVO> selectHashCard(int count);
		// 이전에 불러 왔던 최신 제품 개수 만큼 제품 불러오기
		public List<ProductsInfoVO> selectHashNew(int count);
		// 이전에 불러 왔던 인기 제품 개수 만큼 제품 불러오기
		public List<ProductsInfoVO> selectHashVogue(int count);
		// 이전에 불러 왔던 세일 제품 개수 만큼 제품 불러오기
		public List<ProductsInfoVO> selectHashSale(int count);
		// 전체 제품 불러오기
			//판매량순 - 캐릭터 전체
			public List<ProductsInfoVO> selectHashAllall(@Param("count")int count);
			//판매량순 - 캐릭터 선택
			public List<ProductsInfoVO> selectHashAllallcharater(@Param("count")int count, @Param("charater")String charater);
			//신상품순 - 캐릭터 전체
			public List<ProductsInfoVO> selectHashAllnew(@Param("count")int count);
			//신상품순 - 캐릭터 선택
			public List<ProductsInfoVO> selectHashAllnewcharater(@Param("count")int count, @Param("charater")String charater);
			//낮은 가격순 - 캐릭터 전체
			public List<ProductsInfoVO> selectHashAlllow(int count);
			//낮은 가격순 - 캐릭터 선택
			public List<ProductsInfoVO> selectHashAlllowcharater(@Param("count")int count, @Param("charater")String charater);
			//높은 가격순 - 캐릭터 전체
			public List<ProductsInfoVO> selectHashAllhigh(int count);
			//높은 가격순 - 캐릭터 선택
			public List<ProductsInfoVO> selectHashAllhighcharater(@Param("count")int count, @Param("charater")String charater);

			
		
		
		
		
		
	

	

}
