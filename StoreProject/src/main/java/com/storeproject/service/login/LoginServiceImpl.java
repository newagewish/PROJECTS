package com.storeproject.service.login;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.storeproject.domain.AccountVO;
import com.storeproject.mapper.login.LoginMapper;

import lombok.Setter;
import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class LoginServiceImpl implements LoginService{

	@Setter(onMethod_ = @Autowired)
	private LoginMapper mapper;
	
	@Override
	//회원가입 이메일 중복 체크
	public int selectEmailCheck(String email) {
		log.info("회원가입 이메일 중복 체크 서비스 호출 -> CreateEmailCheck");
		return mapper.selectEmailCheck(email);
	}

	
	@Transactional
	@Override
	//회원 가입 정보 입력
	public void createAccount(AccountVO acvo){
		log.info("회원가입 정보, 권한 등 입력 서비스 호출 -> InsertInformation");
			/* 정보 입력 */
			mapper.InsertInformation(acvo);
			/* 권한 입력 */
			mapper.InsertAuthority(acvo);
			/* 이벤트 & 마케팅 활용 동의(정보 수정에서 변경 가능) */
			mapper.InsertProvision(acvo);
	}
}
