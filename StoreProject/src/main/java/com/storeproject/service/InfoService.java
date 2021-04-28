package com.storeproject.service;

import java.util.List;

import com.storeproject.domain.StoreinfoVO;

public interface InfoService {
	
	// 단일 매장 불러오기
	public StoreinfoVO getFindStore(String st_NM);
	
	// 매장 목록 불러오기
	public List<StoreinfoVO> getList();
}
