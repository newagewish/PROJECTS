package com.storeproject.mapper.admin;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.storeproject.domain.admin.CardVO;
import com.storeproject.domain.admin.ProductsInfoVO;

public interface CardAddMapper {

	public List<ProductsInfoVO> selectProductsCard(int count);

	public ProductsInfoVO selectChoiceCard(int no);

	public int insertCard(CardVO cardvo);

	public void updateCardContents(@Param("str")String str, @Param("no")int no);

}
