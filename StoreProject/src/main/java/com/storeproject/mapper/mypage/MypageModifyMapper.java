package com.storeproject.mapper.mypage;


import org.apache.ibatis.annotations.Param;

import com.storeproject.domain.AccountVO;

public interface MypageModifyMapper {
	// 마이페이지 정보수정 패스워드 체크
	public String selectPassword(String ac_ID);
	// 마이페이지 정보수정 저장
	public void updateInformation(AccountVO acvo);
	/* 마이페이지 정보수정 이벤트*마케팅 활용 동의 */
	/* VO를 사용한 값이 아니기 때문에 Param을 개별 지정 해준다.(xml에서 사용하기 위해) */
	public void insertProvision(@Param("ac_ID") String ac_ID,@Param("ac_Uses_Agree") boolean ac_Uses_Agree);
	/* 마이페이지 정보수정 이벤트*마케팅 활용 조회 */
	public boolean selectProvision(String ac_ID);
}
