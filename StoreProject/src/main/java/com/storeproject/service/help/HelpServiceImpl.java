package com.storeproject.service.help;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.storeproject.domain.HelpfaqVO;
import com.storeproject.domain.HelpnoticeVO;
import com.storeproject.mapper.help.HelpMapper;

import lombok.Setter;
import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class HelpServiceImpl implements HelpService{

	@Setter(onMethod_ = @Autowired)
	private HelpMapper mapper;
	
	@Override
	/* 고객센터 FAQ 갯수(Count) 불러오기 */
	public int getFaqCount() {
		log.info("고객센터 FAQ 서비스 호출 -> getFaqCount");
		return mapper.getFaqCount();
	}
	
	@Override
	/* 고객센터 FAQ 콘텐츠 불러오기 */
	public List<HelpfaqVO> getFaqList(int startBno) {
		log.info("고객센터 FAQ 서비스 호출 -> getFaqList");
		return mapper.getFaqList(startBno);
	}
	
	
	@Override
	/* 고객센터 공지사항 갯수(Count) 불러오기 */
	public int getNoticeCount() {
		log.info("고객센터 공지사항 서비스 호출 -> getNoticeCount");
		return mapper.getNoticeCount();
	}
	
	@Override
	/* 고객센터 공지사항 콘텐츠 불러오기 */
	public List<HelpnoticeVO> getNoticeList(int startBno) {
		log.info("고객센터 공지사항 서비스 호출 -> getNoticeList");
		return mapper.getNoticeList(startBno);
	}
}
