package com.storeproject.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.storeproject.domain.StoreinfoVO;
import com.storeproject.mapper.CrawlerMapper;

import lombok.Setter;
import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class CrawlerServiceImpl implements CrawlerService{
	
	@Setter(onMethod_ = @Autowired)
	private CrawlerMapper mapper;
	
	@Override
	public void insertStoreinfo(StoreinfoVO storeinfovo) {

		log.info("카카오 프렌즈 샵 매장안내 크롤링 서비스 호출");
		mapper.insertStoreinfo(storeinfovo);
	}
	
}
