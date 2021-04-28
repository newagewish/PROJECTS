package com.storeproject.domain;

import java.util.List;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import lombok.Data;

@Data
public class AccountVO {

	private int ac_NO;
	
	@NotEmpty
	@Email(message = "7")
	private String ac_ID;
	@NotEmpty
	@Size(min=8, max=32, message = "4")
	@Pattern(regexp="([a-zA-Z0-9].*[!,@,#,$,%,^,&,*,?,_,~])|([!,@,#,$,%,^,&,*,?,_,~].*[a-zA-Z0-9]){8,12}" ,message="5")
	private String ac_PW;
	@NotEmpty
	@Size(min=2, max=20, message = "6")
	private String ac_NNM;
	private String ac_Year;
	private String ac_Month;
	private String ac_Day;
	private String ac_Gender;
	private String ac_Reg_Date;
	private String ac_Up_Date;
	private boolean ac_enabled;
	
	private List<AuthorityVO> authorityList;
	
	
	
}
