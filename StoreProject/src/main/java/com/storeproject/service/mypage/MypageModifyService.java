package com.storeproject.service.mypage;

import com.storeproject.domain.AccountVO;

public interface MypageModifyService {
	// 마이페이지 정보수정 패스워드 체크
	public String selectPassword(String ac_ID);
	// 마이페이지 정보수정 업데이트
	public void updateInformation(AccountVO acvo);
	
	// 마이페이지 이벤트&마케팅 수신 동의 체크
	public void insertProvision(String ac_ID, boolean ac_Uses_Agree);
	
	// 마이페이지 이벤트&마케팅 수신 동의 체크 조회
	public boolean selectProvision(String ac_ID);
}
