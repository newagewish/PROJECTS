package com.storeproject.mapper;

import com.storeproject.domain.admin.CardVO;
import com.storeproject.domain.admin.ProductsInfoVO;

public interface CardMapper {

	//카드 정보 가져오기
	public CardVO selectCard(int card_NO);

	public ProductsInfoVO selectCardProducts(int NO);

}
