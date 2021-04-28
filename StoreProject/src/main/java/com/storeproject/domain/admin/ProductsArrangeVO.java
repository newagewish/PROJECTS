package com.storeproject.domain.admin;

import lombok.Data;

@Data
public class ProductsArrangeVO {
	private int pds_NO;
	private String 	main_Category;
	private String sub_Category;
	private String kakao_charater;
	private String niniz_charater;
	private String color;
	private boolean pds_Active;
}
