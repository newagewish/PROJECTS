package com.storeproject.service.header;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.storeproject.domain.header.MainCategoryVO;
import com.storeproject.domain.header.SubCategoryVO;
import com.storeproject.mapper.header.HeaderMapper;

import lombok.Setter;
import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class HeaderServiceImpl implements HeaderService {

	@Setter(onMethod_ = @Autowired)
	private HeaderMapper mapper;
	
	@Override
	public List<MainCategoryVO> selectMainCategory() {
		/* log.info("헤더 대표 카테고리 목록 서비스 호출 -> selectMainCategory"); */
		
		return mapper.selectMainCategory();
		
	}

	@Override
	public List<SubCategoryVO> selectSubCategory(MainCategoryVO mcvo) {
		/* log.info("헤더 세부 카테고리 목록 서비스 호출 -> selectSubCategory"); */
		
		return mapper.selectSubCategory(mcvo);
	}

}
