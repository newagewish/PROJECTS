package com.storeproject.service.admin;

import java.util.List;

import com.storeproject.domain.admin.CardVO;
import com.storeproject.domain.admin.ProductsInfoVO;

public interface CardAddService {
	public List<ProductsInfoVO> selectProductsCard(int count);

	public ProductsInfoVO selectChoiceCard(int no);

	public int insertCard(CardVO cardvo);
}
