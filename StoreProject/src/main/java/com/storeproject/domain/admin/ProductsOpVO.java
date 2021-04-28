package com.storeproject.domain.admin;

import lombok.Data;

@Data
public class ProductsOpVO {
	private int pds_NO;
	private int op_NO;
	private String op_Choice;
	private String op_NM;
	private int op_Stock;
	private int op_Trade;
	private int op_Completed;
	private boolean pds_Active;
}
