package com.storeproject.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.storeproject.domain.admin.CardVO;
import com.storeproject.domain.admin.ProductsInfoVO;
import com.storeproject.mapper.CardMapper;

import lombok.Setter;
import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class CardServiceImpl implements CardService{
	
	@Setter(onMethod_ = @Autowired)
	private CardMapper mapper;

	@Override
	public CardVO selectCard(int card_NO) {
		//카드 정보 가져오기
		return mapper.selectCard(card_NO);
	}

	@Override
	public List<ProductsInfoVO> selectCardProducts(String pds_arr) {
		List<ProductsInfoVO> list = new ArrayList<ProductsInfoVO>();
		String[] arr = pds_arr.split(",");
		int[] nums = Arrays.stream(arr).mapToInt(Integer::parseInt).toArray();
		for(int i=0; i<nums.length; i++) {
			list.add( mapper.selectCardProducts(nums[i]) );
		}	
		return list;
	}

}
