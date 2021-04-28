package com.storeproject.domain;

import lombok.Data;

/* getter setter를 롬북 어노테이션 @Data로 해결 */

@Data
public class StoreinfoVO {

	private int st_NO;
	private String st_Img;
	private String st_NM;
	private String st_Tel;
	private String st_Open;
	private String st_Address;
	private String st_Map_Uri;
	private Double st_Lat;
	private Double st_Lng;
	private String st_Country;
	
}
