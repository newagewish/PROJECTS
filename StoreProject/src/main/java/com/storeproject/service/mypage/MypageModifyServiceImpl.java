package com.storeproject.service.mypage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.storeproject.domain.AccountVO;
import com.storeproject.mapper.mypage.MypageModifyMapper;

import lombok.Setter;
import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class MypageModifyServiceImpl implements MypageModifyService {
	
	@Setter(onMethod_ = @Autowired)
	private MypageModifyMapper mapper;
	
	@Override
	/* 마이페이지 정보수정 패스워드 체크 */
	public String selectPassword(String ac_ID) {
		log.info("마이페이지 정보수정 패스워드 체크 서비스 호출 -> selectPassword");
		
		return mapper.selectPassword(ac_ID);
	}
	
	@Override
	/* 마이페이지 정보수정 업데이트 */
	public void updateInformation(AccountVO acvo) {
		log.info("마이페이지 정보수정 업데이트 서비스 호출 -> updateInformation");
		
		mapper.updateInformation(acvo);
	}

	@Override
	// 마이페이지 이벤트&마케팅 수신 동의 체크
	public void insertProvision(String ac_ID, boolean ac_Uses_Agree) {
		log.info("마이페이지 정보수정 이벤트&마케팅 활용 동의 입력 서비스 호출 -> insertProvision");
		
		mapper.insertProvision(ac_ID, ac_Uses_Agree);
	}

	@Override
	// 마이페이지 이벤트&마케팅 수신 동의 체크 조회
	public boolean selectProvision(String ac_ID) {
		log.info("마이페이지 정보수정 이벤트&마케팅 활용 동의 조회 서비스 호출 -> selectProvision");
		
		return mapper.selectProvision(ac_ID);
	}
}
