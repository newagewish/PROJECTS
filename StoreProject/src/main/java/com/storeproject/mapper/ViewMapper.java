package com.storeproject.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.storeproject.domain.admin.ProductsArrangeVO;
import com.storeproject.domain.admin.ProductsInfoVO;
import com.storeproject.domain.admin.ProductsOpVO;
import com.storeproject.domain.review.ReviewInfoVO;

public interface ViewMapper {
	//뷰페이지에 보여준 제품 인기값 +1
	public void viewUpdateVogue(int pds_NO);
	//뷰페이지에서 보여줄 제품 정보 가져오기
	public ProductsInfoVO viewSelectProductsInfo(int pds_NO);
	//뷰페이지에서 보여줄 제품 옵션 가져오기
	public List<ProductsOpVO> viewSelectProductsOption(int pds_NO);
	//뷰페이지에서 보여줄 별점 가져오기
	public String viewStarPoint(int pds_NO);
	
	//뷰페이지에서 보여줄 추천 제품 정보 가져오기
		//조건 매칭을 위해 기준 제품에 대한 정보를 가져온다.
		public ProductsArrangeVO productsArrange(int pds_NO);
		
		public int[] productsPush(@Param("column")String[] arr);
		
	//리뷰 카운트 가져오기
	public int reviewcount();
	//리뷰 등록 및 업데이트
	public void reviewInsert(ReviewInfoVO rvo);
	//리뷰 카운트 +1
	public void reviewcountplus();
	//리뷰 조회 최신순
	public List<ReviewInfoVO> reviewSelect(int pds_NO);
	//리뷰 조회 좋아요순
	public List<ReviewInfoVO> reviewOrderLike(int pds_NO);
	//리뷰 좋아요 리스트 가져오기
	public String reviewLikeList(int re_NO);
	//리뷰 좋아요 +1
	public void reviewLikePlus(@Param("re_NO")int re_NO, @Param("str")String str);
	//리뷰 좋아요 -1
	public void reviewLikeMinus(@Param("re_NO")int re_NO, @Param("cut_str")String cut_str);
	
	
		
		
	
}
