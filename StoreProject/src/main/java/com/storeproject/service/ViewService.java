package com.storeproject.service;

import java.util.List;

import com.storeproject.domain.admin.ProductsInfoVO;
import com.storeproject.domain.admin.ProductsOpVO;
import com.storeproject.domain.review.ReviewInfoVO;

public interface ViewService {
	//뷰페이지에 보여준 제품 인기값 +1
	public void viewUpdateVogue(int pds_NO);
	//뷰페이지에서 보여줄 제품 정보 가져오기
	public ProductsInfoVO viewSelectProductsInfo(int pds_NO);
	//뷰페이지에서 보여줄 제품 옵션 가져오기
	public List<ProductsOpVO> viewSelectProductsOption(int pds_NO);
	//뷰페이지에서 보여줄 별점 가져오기
	public String viewStarPoint(int pds_NO);
	//뷰페이지에서 보여줄 추천 제품 정보 가져오기
	public List<ProductsInfoVO> viewSelectProductsPush(int pds_NO);
	
		//리뷰 카운트 가져오기
		public int reviewcount();	//auto increment 대신에 사용 중인 테이블에서 값 가져오기
		//리뷰 등록 및 업데이트
		public int reviewInsert(ReviewInfoVO rvo) throws Exception;
		//리뷰 조회 최신순
		public List<ReviewInfoVO> reviewselect(int pds_NO);
		//리뷰 조회 좋아요순
		public List<ReviewInfoVO> reviewOrderLike(int pds_NO);
		//리뷰 좋아요 업데이트
		public int reviewLikeUpdate(int re_NO, int ac_NO);

		

	
}
