package com.storeproject.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.storeproject.domain.AccountVO;
import com.storeproject.mapper.account.AccountMapper;
import com.storeproject.security.domain.CustomUser;

import lombok.Setter;
import lombok.extern.log4j.Log4j;

@Log4j
public class CustomUserDetailsService implements UserDetailsService {
	
	@Setter(onMethod_ = { @Autowired })
	private AccountMapper accountMapper;
	
	@Override
	public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException{
		log.warn("로그인 계정 : "+ userName);
		
		//userName은 ac_ID(id)
		AccountVO ac = accountMapper.read(userName);
		
		log.warn("로그인 계정의 정보 : " + ac);
		
		return ac == null ? null : new CustomUser(ac);
	}
}
