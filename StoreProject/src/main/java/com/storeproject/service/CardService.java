package com.storeproject.service;

import java.util.List;

import com.storeproject.domain.admin.CardVO;
import com.storeproject.domain.admin.ProductsInfoVO;

public interface CardService {
	//카드 정보 가져오기
	public CardVO selectCard(int card_NO);
	//카드 추천 상품 가져오기
	public List<ProductsInfoVO> selectCardProducts(String pds_arr);

}
