package com.storeproject.domain.review;

import lombok.Data;

@Data
public class ReviewInfoVO {
	private int pds_NO;
	private int ac_NO;
	private int re_NO;
	private String re_Writer;
	private String re_Contents;
	private int re_Like;
	private String re_Like_List;
	private int re_Star;
	private String re_Reg_Date;
	private boolean re_Active;
}
