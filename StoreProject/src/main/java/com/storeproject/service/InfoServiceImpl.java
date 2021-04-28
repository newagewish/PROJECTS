package com.storeproject.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.storeproject.domain.StoreinfoVO;
import com.storeproject.mapper.InfoMapper;

import lombok.Setter;
import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class InfoServiceImpl implements InfoService{
		
		@Setter(onMethod_ = @Autowired)
		private InfoMapper mapper;

		@Override
		public StoreinfoVO getFindStore(String st_NM) {
			log.info("매장 정보 서비스 호출 -> getFindStore");
			return mapper.getFindStore(st_NM);
		}
		
		@Override
		public List<StoreinfoVO> getList() {
			log.info("매장 정보 서비스 호출 -> getList");
			return mapper.getList();
		}

		
}
