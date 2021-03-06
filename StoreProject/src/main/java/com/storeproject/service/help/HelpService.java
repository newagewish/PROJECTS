package com.storeproject.service.help;

import java.util.List;

import com.storeproject.domain.HelpfaqVO;
import com.storeproject.domain.HelpnoticeVO;

public interface HelpService {
	// 고객센터 FAQ 갯수(Count) 불러오기
	public int getFaqCount();
	
	// 고객센터 FAQ 목록 불러오기
	public List<HelpfaqVO> getFaqList(int startBno);
	
	
	// 고객센터 공지사항 갯수(Count) 불러오기
	public int getNoticeCount();
	
	// 고객센터 공지사항 목록 불러오기
	public List<HelpnoticeVO> getNoticeList(int startBno);
}
