package com.storeproject.tests;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

import com.storeproject.domain.AccountVO;
import com.storeproject.mapper.account.AccountMapper;

import lombok.Setter;
import lombok.extern.log4j.Log4j;

@RunWith(SpringRunner.class)
@ContextConfiguration({"file:src/main/webapp/WEB-INF/spring/root-context.xml"})
@Log4j
public class AccountMapperTests {

	@Setter(onMethod_=@Autowired)
	private AccountMapper mapper;
	
	@Test
	public void testRead() {
		AccountVO vo = mapper.read("admin90");
		log.info(vo);
		vo.getAuthorityList().forEach(AuthorityVO -> log.info(AuthorityVO));
	}
}
