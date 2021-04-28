package com.storeproject.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.storeproject.domain.admin.CardVO;
import com.storeproject.domain.admin.ProductsInfoVO;
import com.storeproject.mapper.HomeMapper;

import lombok.Setter;

@Service
public class HomeServiceImpl implements HomeService{

	@Setter(onMethod_ = @Autowired)
	private HomeMapper mapper;
	
	// 카드 최신 순으로 불러오기
	@Override
	public List<CardVO> selectProductsCard(int count) {
		return mapper.selectProductsCard(count);
	}
	// 제품 최신 순으로 불러오기
	@Override
	public List<ProductsInfoVO> selectProductsNew(int count) {
		return mapper.selectProductsNew(count);
	}
	// 인기도 순, 최신 순으로 제품 불러오기
	@Override
	public List<ProductsInfoVO> selectProductsVogue(int count) {
		return mapper.selectProductsVogue(count);
	}
	// 세일 제품 최신 순으로 불러오기
	@Override
	public List<ProductsInfoVO> selectProductsSale(int count) {
		return mapper.selectProductsSale(count);
	}
	// 전체 제품 불러오기
	@Override
	public List<ProductsInfoVO> selectProductsAll(int count, String charater, String option) {
		if(option.equals("sales")) {	//판매량순
			if(charater.equals("all")) {	//캐릭터 전체
				return mapper.selectProductsAllall(count);
			}else {	//캐릭터 선택
				return mapper.selectProductsAllallcharater(count, charater);
			}
		}else if(option.equals("new")) {	//신상품순
			if(charater.equals("all")) {	//캐릭터 전체
				return mapper.selectProductsAllnew(count);
			}else {	//캐릭터 선택
				return mapper.selectProductsAllnewcharater(count, charater);
			}
		}else if(option.equals("low")) {	//낮은 가격순
			if(charater.equals("all")) {	//캐릭터 전체
				return mapper.selectProductsAlllow(count);
			}else {	//캐릭터 선택
				return mapper.selectProductsAlllowcharater(count, charater);
			}
		}else if(option.equals("high")) {	//높은 가격순
			if(charater.equals("all")) {	//캐릭터 전체
				return mapper.selectProductsAllhigh(count);
			}else {	//캐릭터 선택
				return mapper.selectProductsAllhighcharater(count, charater);
			}
		}
		return null;
	}

	@Override
	public int selectProductsAllcount(String charater, String option) {
		if(charater.equals("all")) {	//캐릭터 전체
			return mapper.selectProductsAllCount();
		}else {	//캐릭터 선택
			return mapper.selectProductsAllCountCharater(charater);
		}
	}
	
	// 뒤로가기 hash 값만큼 정보 가져오기
	@Override
	public List<CardVO> selectHashCard(int count) {
		// TODO Auto-generated method stub
		return mapper.selectHashCard(count);
	}
	@Override
	public List<ProductsInfoVO> selectHashNew(int count) {
		return mapper.selectHashNew(count);
	}
	@Override
	public List<ProductsInfoVO> selectHashVogue(int count) {
		return mapper.selectHashVogue(count);
	}
	@Override
	public List<ProductsInfoVO> selectHashSale(int count) {
		return mapper.selectHashSale(count);
	}
	@Override
	public List<ProductsInfoVO> selectHashAll(int count, String charater, String option) {
		if(option.equals("sales")) {	//판매량순
			if(charater.equals("all")) {	//캐릭터 전체
				return mapper.selectHashAllall(count);
			}else {	//캐릭터 선택
				return mapper.selectHashAllallcharater(count, charater);
			}
		}else if(option.equals("new")) {	//신상품순
			if(charater.equals("all")) {	//캐릭터 전체
				return mapper.selectHashAllnew(count);
			}else {	//캐릭터 선택
				return mapper.selectHashAllnewcharater(count, charater);
			}
		}else if(option.equals("low")) {	//낮은 가격순
			if(charater.equals("all")) {	//캐릭터 전체
				return mapper.selectHashAlllow(count);
			}else {	//캐릭터 선택
				return mapper.selectHashAlllowcharater(count, charater);
			}
		}else if(option.equals("high")) {	//높은 가격순
			if(charater.equals("all")) {	//캐릭터 전체
				return mapper.selectHashAllhigh(count);
			}else {	//캐릭터 선택
				return mapper.selectHashAllhighcharater(count, charater);
			}
		}
		return null;
	}





	
	
	
}
