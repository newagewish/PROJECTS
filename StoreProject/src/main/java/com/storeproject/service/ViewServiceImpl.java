package com.storeproject.service;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.ArrayUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.storeproject.domain.admin.ProductsArrangeVO;
import com.storeproject.domain.admin.ProductsInfoVO;
import com.storeproject.domain.admin.ProductsOpVO;
import com.storeproject.domain.review.ReviewInfoVO;
import com.storeproject.mapper.ViewMapper;

import lombok.Setter;
import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class ViewServiceImpl implements ViewService{
	
	@Setter(onMethod_ = @Autowired)
	private ViewMapper mapper;

	//뷰페이지에 보여준 제품 인기값 +1
	@Override
	public void viewUpdateVogue(int pds_NO) {
		/* log.info("viewUpdateVogue 서비스 호출"); */
		mapper.viewUpdateVogue(pds_NO);
	}
	//뷰페이지에서 보여줄 제품 정보 가져오기
	@Override
	public ProductsInfoVO viewSelectProductsInfo(int pds_NO) {
		/* log.info("viewSelectProducts 서비스 호출"); */
		return mapper.viewSelectProductsInfo(pds_NO);
	}
	//뷰페이지에서 보여줄 제품 옵션 가져오기
	@Override
	public List<ProductsOpVO> viewSelectProductsOption(int pds_NO) {
		/* log.info("viewSelectProductsOption 서비스 호출"); */
		return mapper.viewSelectProductsOption(pds_NO);
	}
	//뷰페이지에서 보여줄 별점 가져오기
	@Override
	public String viewStarPoint(int pds_NO) {
		/* log.info("viewStarPoint 서비스 호출"); */
		return mapper.viewStarPoint(pds_NO);
	}
	//뷰페이지에서 보여줄 추천 제품 정보 가져오기
	@Override
	public List<ProductsInfoVO> viewSelectProductsPush(int pds_NO) {
		ProductsArrangeVO arrange = mapper.productsArrange(pds_NO);
		
		String str_sub = arrange.getSub_Category();
		String[] arr1 = str_sub.split(",");
		
		String str_kakao = arrange.getKakao_charater();
		String str_niniz = arrange.getNiniz_charater();
		String str_char = str_kakao + "," + str_niniz;
		String[] arr2 = str_char.split(",");
		
		String str_color = arrange.getColor();
		String[] arr3 = str_color.split(",");
		
		/*
		 * int[] category = mapper.PushCategory(arr1); int[] charater =
		 * mapper.PushCharater(arr2); int[] color = mapper.PushColor(arr3);
		 */
		
		String[] plus_arr = (String[]) ArrayUtils.addAll(arr1, arr2);
		String[] str_arr = (String[]) ArrayUtils.addAll(plus_arr, arr3);
		
		int[] no_arr = mapper.productsPush(str_arr);
		
		List<ProductsInfoVO> list = new ArrayList<ProductsInfoVO>();
		
		for(int i=0; i<no_arr.length; i++) {
			ProductsInfoVO vo = mapper.viewSelectProductsInfo(no_arr[i]);
			list.add(vo);
		}
		return list;
	}
	
	//리뷰 카운트 가져오기
	@Override
	public int reviewcount() {
		return mapper.reviewcount();
	}
	
	//리뷰 등록 및 업데이트
	@Transactional
	@Override
	public int reviewInsert(ReviewInfoVO rvo) throws Exception {
		try {
			int re_NO = mapper.reviewcount();
			rvo.setRe_NO(re_NO);
			mapper.reviewInsert(rvo);
			mapper.reviewcountplus();	//리뷰 등록 성공시 autoincrement 테이블에 리뷰 카운트 +1
			return 1;
		}catch(Exception e) {
			e.printStackTrace();
			return 0;
		}
		
	}
	//리뷰 조회 최신순
	@Override
	public List<ReviewInfoVO> reviewselect(int pds_NO) {
		return mapper.reviewSelect(pds_NO);
	}
	//리뷰 조회 좋아요순
	@Override
	public List<ReviewInfoVO> reviewOrderLike(int pds_NO) {
		return mapper.reviewOrderLike(pds_NO);
	}
	//리뷰 좋아요 업데이트
	@Transactional
	@Override
	public int reviewLikeUpdate(int re_NO, int ac_NO) {
		String ac = Integer.toString(ac_NO);
		String str = mapper.reviewLikeList(re_NO);
		if(str==null) {
			//리스트가 1명도 없어서 null 일 경우
			str = ac+",";
		}else {
			//리스트가 1명 이상 있는 경우
			String[] arr = str.split(",");
			String cut_str = null;
			boolean check = false;
			
			//리뷰를 좋아요 여부 판별
			//반복문으로 리스트 배열을 차례로 검사
			for(int i=0; i<arr.length; i++) {
				if(arr[i].equals(ac)) {
					//번호가 일치하면 check 값에 true;
					check = true;
				}else {
					//번호가 일치 하지 않으면 cut_str에 문자열 더하기
					cut_str = cut_str + arr[i]+",";
				}
			}
			if(check) {	//위에서 체크한 결과를 토대로 조건문 작동
				//좋아요 취소
				//좋아요 -1 리스트에 계정 번호 제외
				mapper.reviewLikeMinus(re_NO, cut_str);
				return 2;
			}else {
				//1명 이상 리스트에 있지만 번호가 일치 하지 않는 경우 문자열
				str = str+","+ac; 
			}
		}
		//좋아요 +1 리스트에 계정 번호 추가
		mapper.reviewLikePlus(re_NO, str);
		return 0;
		
	}





}
