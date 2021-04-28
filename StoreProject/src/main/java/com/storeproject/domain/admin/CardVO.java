package com.storeproject.domain.admin;

import lombok.Data;

@Data
public class CardVO {
	private int card_NO;
	private String card_Type;
	private String card_Img;
	private String card_Title;
	private String card_Intro;
	private String card_Choice;
	private String card_Contents;
	private String card_Url;
	private String card_Products;
	private String card_Reg_Date;
	private boolean card_Active;
}
