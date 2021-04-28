package com.storeproject.security.domain;

import java.util.Collection;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import com.storeproject.domain.AccountVO;

import lombok.Getter;

@Getter
public class CustomUser extends User{
	
	private static final long serialVersionUID = 1L;
	
	private AccountVO account;
	
	public CustomUser(String username, String password, Collection<? extends GrantedAuthority> authorities) {
		super(username, password, authorities);
	}
	
	public CustomUser(AccountVO ac) {
		super(ac.getAc_ID(), ac.getAc_PW(), ac.getAuthorityList().stream().map(auth -> new SimpleGrantedAuthority(auth.getAc_Auth())).collect(Collectors.toList()));
	
		this.account = ac;
	}
	
}
