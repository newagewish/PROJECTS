package com.storeproject.service.login;

import com.storeproject.domain.AccountVO;

public interface LoginService {

	// 회원가입 이메일 중복 체크
	public int selectEmailCheck(String email);
	
	// 회원가입에 필요한 정보, 권한 등 입력
	public void createAccount(AccountVO acvo);
	
}
