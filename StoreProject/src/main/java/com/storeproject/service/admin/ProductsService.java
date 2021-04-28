package com.storeproject.service.admin;

import com.storeproject.domain.admin.ProductsInfoVO;
import com.storeproject.domain.admin.ProductsOpVO;

public interface ProductsService {

	void createProducts(
		ProductsInfoVO pds_info, String[] mainCategory, String[] subCategory, String[] charater, String[] color, ProductsOpVO pds_op, String[][] option
	) throws Exception;

}
