package com.storeproject.service.account;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.storeproject.mapper.account.AccountMapper;

import lombok.Setter;

@Service
public class AccountServiceImpl implements AccountService {
	@Setter(onMethod_ = @Autowired)
	private AccountMapper mapper;
	
}
