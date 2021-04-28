package com.storeproject.domain.admin;

import lombok.Data;

@Data
public class ProductsInfoVO {
	private int pds_NO;
	private String pds_NM;
	private int pds_Price;
	private int pds_Sale;
	private String pds_Image;
	private String pds_Contents;
	private String pds_Detail;
	private boolean pds_Delivery;
	private String pds_Vogue_Image;
	private int pds_Vogue;
	private String pds_Reg_Date;
	private boolean pds_Active;
}
