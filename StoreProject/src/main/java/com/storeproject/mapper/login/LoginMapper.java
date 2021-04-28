package com.storeproject.mapper.login;

import com.storeproject.domain.AccountVO;

public interface LoginMapper {
	// 회원가입 이메일 중복 체크
	public int selectEmailCheck(String email);
	
	// 회원가입 사용자 정보 입력
	public void InsertInformation(AccountVO acvo);
	
	// 회원가입 사용자 권한 입력
	public void InsertAuthority(AccountVO acvo);
	
	// 회원가입 이벤트&마케팅 동의 입력
	public void InsertProvision(AccountVO acvo);
}
