package com.storeproject.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.storeproject.domain.admin.ProductsInfoVO;
import com.storeproject.domain.header.RelationCategoryVO;
import com.storeproject.mapper.ListMapper;

import lombok.Setter;
import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class ListServiceImpl implements ListService{
	
	@Setter(onMethod_ = @Autowired)
	private ListMapper mapper;

	//카테고리 이미지 파일명 가져오기
	@Override
	public String selectCategoryImg(String columnNM) {
		
		return mapper.selectCategoryImg(columnNM);
	}
	//세부 카테고리들 이름 가져오기
	@Override
	public List<RelationCategoryVO> selectSubCategory(String columnNM) {
		return mapper.selectSubCategory(columnNM);
	}
	//옵션 선택 시 제품 정보 목록 가져오기
	@Override
	public List<ProductsInfoVO> categoryOption(int count, String charater, String option, String column) {
		String columnNM = column;
		String columnType = columnNM.substring(0, 3);
		if(columnType.equals("all")) {
			if(option.equals("sales")) {	//판매량순
				if(charater.equals("all")) {	//캐릭터 전체
					return mapper.listAllOptionSales(count);
				}else {	//캐릭터 선택
					return mapper.listAllOptionSalesCharater(count, charater);
				}
			}else if(option.equals("new")) {	//신상품순
				if(charater.equals("all")) {	//캐릭터 전체
					return mapper.listAllOptionNew(count);
				}else {	//캐릭터 선택
					return mapper.listAllOptionNewCharater(count, charater);
				}
			}else if(option.equals("low")) {	//낮은 가격순
				if(charater.equals("all")) {	//캐릭터 전체
					return mapper.listAllOptionLow(count);
				}else {	//캐릭터 선택
					return mapper.listAllOptionLowCharater(count, charater);
				}
			}else if(option.equals("high")) {	//높은 가격순
				if(charater.equals("all")) {	//캐릭터 전체
					return mapper.listAllOptionHigh(count);
				}else {	//캐릭터 선택
					return mapper.listAllOptionHighCharater(count, charater);
				}
			}
		}
		else if(columnType.equals("cmt")) {	//컬럼명이 "cmt"로 시작
			if(option.equals("sales")) {	//판매량순
				if(charater.equals("all")) {	//캐릭터 전체
					//log.info("cmt 판매량순 캐릭터전체");
					return mapper.listMainOptionSales(count, columnNM);
				}else {	//캐릭터 선택
					//log.info("cmt 판매량순 캐릭터선택");
					return mapper.listMainOptionSalesCharater(count, charater, columnNM);
				}
			}else if(option.equals("new")) {	//신상품순
				if(charater.equals("all")) {	//캐릭터 전체
					//log.info("cmt 신상품순 캐릭터전체");
					return mapper.listMainOptionNew(count, columnNM);
				}else {	//캐릭터 선택
					//log.info("cmt 신상품순 캐릭터선택");
					return mapper.listMainOptionNewCharater(count, charater, columnNM);
				}
			}else if(option.equals("low")) {	//낮은 가격순
				if(charater.equals("all")) {	//캐릭터 전체
					//log.info("cmt 낮은가격순 캐릭터전체");
					return mapper.listMainOptionLow(count, columnNM);
				}else {	//캐릭터 선택
					//log.info("cmt 낮은가격순 캐릭터선택");
					return mapper.listMainOptionLowCharater(count, charater, columnNM);
				}
			}else if(option.equals("high")) {	//높은 가격순
				if(charater.equals("all")) {	//캐릭터 전체
					//log.info("cmt 높은가격순 캐릭터전체");
					return mapper.listMainOptionHigh(count, columnNM);
				}else {	//캐릭터 선택
					//log.info("cmt 높은가격순 캐릭터선택");
					return mapper.listMainOptionHighCharater(count, charater, columnNM);
				}
			}
		}else if(columnType.equals("cst"))  {	//컬럼명이 "cst" 로 시작
			if(option.equals("sales")) {	//판매량순
				if(charater.equals("all")) {	//캐릭터 전체
					//log.info("cst 판매량순 캐릭터전체");
					return mapper.listSubOptionSales(count, columnNM);
				}else {	//캐릭터 선택
					//log.info("cst 판매량순 캐릭터선택");
					return mapper.listSubOptionSalesCharater(count, charater, columnNM);
				}
			}else if(option.equals("new")) {	//신상품순
				if(charater.equals("all")) {	//캐릭터 전체
					//log.info("cst 신상품순 캐릭터전체");
					return mapper.listSubOptionNew(count, columnNM);
				}else {	//캐릭터 선택
					//log.info("cst 신상품순 캐릭터선택");
					return mapper.listSubOptionNewCharater(count, charater, columnNM);
				}
			}else if(option.equals("low")) {	//낮은 가격순
				if(charater.equals("all")) {	//캐릭터 전체
					//log.info("cst 낮은가격순 캐릭터전체");
					return mapper.listSubOptionLow(count, columnNM);
				}else {	//캐릭터 선택
					//log.info("cst 낮은가격순 캐릭터선택");
					return mapper.listSubOptionLowCharater(count, charater, columnNM);
				}
			}else if(option.equals("high")) {	//높은 가격순
				if(charater.equals("all")) {	//캐릭터 전체
					//log.info("cst 높은가격순 캐릭터전체");
					return mapper.listSubOptionHigh(count, columnNM);
				}else {	//캐릭터 선택
					//log.info("cst 높은가격순 캐릭터선택");
					return mapper.listSubOptionHighCharater(count, charater, columnNM);
				}
			}
		}
		return null;
	}
	
	@Override
	public int listCount(String charater, String column) {
		String columnNM = column;
		String columnType = columnNM.substring(0, 3);
		if(columnType.equals("all")) {
			if(charater.equals("all")){
				return mapper.listAllCount();
			}else {
				return mapper.listAllCountCharater(charater);
			}
		}else if(columnType.equals("cmt")) {	//컬럼명이 "cmt"로 시작
			if(charater.equals("all")) {	//캐릭터 전체
				return mapper.listMainCount(columnNM);
			}else {	//캐릭터 선택
				return mapper.listMainCountCharater(charater, columnNM);
			}
		}else if(columnType.equals("cst"))  {	//컬럼명이 "cst" 로 시작
			if(charater.equals("all")) {	//캐릭터 전체
				return mapper.listSubCount(columnNM);
			}else {	//캐릭터 선택
				return mapper.listSubCountCharater(charater, columnNM);
			}
		}
		return 0;
	}
	
	@Override
	public List<ProductsInfoVO> listHash(int count, String charater, String option, String column) {
		String columnNM = column;
		String columnType = columnNM.substring(0, 3);
		log.info(charater + " " + option + " " + columnNM + " " + count);
		if(columnType.equals("all")) {
			if(option.equals("sales")) {	//판매량순
				if(charater.equals("all")) {	//캐릭터 전체
					return mapper.listHashAllOptionSales(count);
				}else {	//캐릭터 선택
					return mapper.listHashAllOptionSalesCharater(count, charater);
				}
			}else if(option.equals("new")) {	//신상품순
				if(charater.equals("all")) {	//캐릭터 전체
					return mapper.listHashAllOptionNew(count);
				}else {	//캐릭터 선택
					return mapper.listHashAllOptionNewCharater(count, charater);
				}
			}else if(option.equals("low")) {	//낮은 가격순
				if(charater.equals("all")) {	//캐릭터 전체
					return mapper.listHashAllOptionLow(count);
				}else {	//캐릭터 선택
					return mapper.listHashAllOptionLowCharater(count, charater);
				}
			}else if(option.equals("high")) {	//높은 가격순
				if(charater.equals("all")) {	//캐릭터 전체
					return mapper.listHashAllOptionHigh(count);
				}else {	//캐릭터 선택
					return mapper.listHashAllOptionHighCharater(count, charater);
				}
			}
		}
		else if(columnType.equals("cmt")) {	//컬럼명이 "cmt"로 시작
			if(option.equals("sales")) {	//판매량순
				if(charater.equals("all")) {	//캐릭터 전체
					return mapper.listHashMainOptionSales(count, columnNM);
				}else {	//캐릭터 선택
					return mapper.listHashMainOptionSalesCharater(count, charater, columnNM);
				}
			}else if(option.equals("new")) {	//신상품순
				if(charater.equals("all")) {	//캐릭터 전체
					return mapper.listHashMainOptionNew(count, columnNM);
				}else {	//캐릭터 선택
					return mapper.listHashMainOptionNewCharater(count, charater, columnNM);
				}
			}else if(option.equals("low")) {	//낮은 가격순
				if(charater.equals("all")) {	//캐릭터 전체
					return mapper.listHashMainOptionLow(count, columnNM);
				}else {	//캐릭터 선택
					return mapper.listHashMainOptionLowCharater(count, charater, columnNM);
				}
			}else if(option.equals("high")) {	//높은 가격순
				if(charater.equals("all")) {	//캐릭터 전체
					return mapper.listHashMainOptionHigh(count, columnNM);
				}else {	//캐릭터 선택
					return mapper.listHashMainOptionHighCharater(count, charater, columnNM);
				}
			}
		}else if(columnType.equals("cst"))  {	//컬럼명이 "cst" 로 시작
			if(option.equals("sales")) {	//판매량순
				if(charater.equals("all")) {	//캐릭터 전체
					return mapper.listHashSubOptionSales(count, columnNM);
				}else {	//캐릭터 선택
					return mapper.listHashSubOptionSalesCharater(count, charater, columnNM);
				}
			}else if(option.equals("new")) {	//신상품순
				if(charater.equals("all")) {	//캐릭터 전체
					return mapper.listHashSubOptionNew(count, columnNM);
				}else {	//캐릭터 선택
					return mapper.listHashSubOptionNewCharater(count, charater, columnNM);
				}
			}else if(option.equals("low")) {	//낮은 가격순
				if(charater.equals("all")) {	//캐릭터 전체
					return mapper.listHashSubOptionLow(count, columnNM);
				}else {	//캐릭터 선택
					return mapper.listHashSubOptionLowCharater(count, charater, columnNM);
				}
			}else if(option.equals("high")) {	//높은 가격순
				if(charater.equals("all")) {	//캐릭터 전체
					return mapper.listHashSubOptionHigh(count, columnNM);
				}else {	//캐릭터 선택
					return mapper.listHashSubOptionHighCharater(count, charater, columnNM);
				}
			}
		}
		return null;
	}
}
