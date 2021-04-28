package com.storeproject.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.storeproject.domain.admin.CardVO;
import com.storeproject.domain.admin.ProductsInfoVO;
import com.storeproject.service.CardService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j;

@Controller
@Log4j
@AllArgsConstructor
@RequestMapping("/card*")
public class CardController {
	
	private CardService cardservice;
	
	@GetMapping(value = "")
	public CardVO getCard(HttpServletRequest request,Model model) {
		log.info("관리자 getCard 컨트롤러 호출");
		int card_NO = Integer.parseInt(request.getParameter("NO"));
		CardVO cardVO = cardservice.selectCard(card_NO);
		return cardVO;
	}
	
	@GetMapping(value = "/select/products")
	@ResponseBody
	public List<ProductsInfoVO> selectProducts(@RequestParam("arr") String pds_arr){
		log.info("관리자 selectProducts 컨트롤러 호출");
		List<ProductsInfoVO> list = cardservice.selectCardProducts(pds_arr);
		return list;
	}
}
