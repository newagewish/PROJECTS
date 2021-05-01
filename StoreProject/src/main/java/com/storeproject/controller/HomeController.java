package com.storeproject.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.storeproject.domain.admin.CardVO;
import com.storeproject.domain.admin.ProductsInfoVO;
import com.storeproject.service.HomeService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j;

/**
 * Handles requests for the application home page.
 */
@Log4j
@Controller
@AllArgsConstructor
@RequestMapping("/")
public class HomeController {
	
	private HomeService homeservice;
	
	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);

	@RequestMapping(value = "", method = RequestMethod.GET)
	public String home(HttpServletRequest request) {
		//logger.info(" : 스토어 프로젝트를 시작합니다.");
		
		return "home";
	}
	/* ----------------ajax 관련 호출---------------- */
	@GetMapping(value = "/home/card")
	@ResponseBody
	public List<CardVO> selectProductsCard(HttpServletRequest request)throws Exception {
		/* log.info("컨트롤러 selectProductsCard 호출"); */
		int count = Integer.parseInt(request.getParameter("count"));
		List<CardVO> pdsList = homeservice.selectProductsCard(count);
		return pdsList;
	}
	@GetMapping(value = "/home/new")
	@ResponseBody
	public List<ProductsInfoVO> selectProductsNew(HttpServletRequest request)throws Exception {
		/* log.info("컨트롤러 selectProductsNew 호출"); */
		int count = Integer.parseInt(request.getParameter("count"));
		List<ProductsInfoVO> pdsList = homeservice.selectProductsNew(count);
		return pdsList;
	}
	@GetMapping(value = "/home/vogue")
	@ResponseBody
	public List<ProductsInfoVO> selectProductsVogue(HttpServletRequest request)throws Exception {
		/* log.info("컨트롤러 selectProductsVogue 호출"); */
		int count = Integer.parseInt(request.getParameter("count"));
		List<ProductsInfoVO> pdsList = homeservice.selectProductsVogue(count);
		return pdsList;
	}
	@GetMapping(value = "/home/sale")
	@ResponseBody
	public List<ProductsInfoVO> selectProductsSale(HttpServletRequest request)throws Exception {
		/* log.info("컨트롤러 selectProductsSale 호출"); */
		int count = Integer.parseInt(request.getParameter("count"));
		List<ProductsInfoVO> pdsList = homeservice.selectProductsSale(count);
		return pdsList;
	}
	
	@GetMapping(value = "/home/all")
	@ResponseBody
	public List<ProductsInfoVO> selectProductsAll(HttpServletRequest request)throws Exception {
		/* log.info("컨트롤러 selectProductsAll 호출"); */
		int count = Integer.parseInt(request.getParameter("count"));
		String charater = request.getParameter("charater");
		String option =  request.getParameter("option");
		List<ProductsInfoVO> pdsList = homeservice.selectProductsAll(count, charater, option);
		return pdsList;
	}
	
		@GetMapping(value = "/home/all/count")
		@ResponseBody
		public int selectProductsAllcount(HttpServletRequest request)throws Exception {
			/* log.info("컨트롤러 selectProductsAllcount 호출"); */
			String charater = request.getParameter("charater");
			String option =  request.getParameter("option");
			int count = homeservice.selectProductsAllcount(charater, option);
			return count;
		}
	
	
	
	
	/* ----------------hash ajax 관련 호출---------------- */
	@GetMapping(value = "/home/hash/card")
	@ResponseBody
	public List<CardVO> selectHashCard(HttpServletRequest request)throws Exception {
		/* log.info("컨트롤러 selectHashNew 호출"); */
		int count = Integer.parseInt(request.getParameter("count"));
		List<CardVO> cardList = homeservice.selectHashCard(count);
		return cardList;
	}
	@GetMapping(value = "/home/hash/new")
	@ResponseBody
	public List<ProductsInfoVO> selectHashNew(HttpServletRequest request)throws Exception {
		/* log.info("컨트롤러 selectHashNew 호출"); */
		int count = Integer.parseInt(request.getParameter("count"));
		List<ProductsInfoVO> pdsList = homeservice.selectHashNew(count);
		return pdsList;
	}
	@GetMapping(value = "/home/hash/vogue")
	@ResponseBody
	public List<ProductsInfoVO> selectHashVogue(HttpServletRequest request)throws Exception {
		/* log.info("컨트롤러 selectHashVogue 호출"); */
		int count = Integer.parseInt(request.getParameter("count"));
		List<ProductsInfoVO> pdsList = homeservice.selectHashVogue(count);
		return pdsList;
	}
	@GetMapping(value = "/home/hash/sale")
	@ResponseBody
	public List<ProductsInfoVO> selectHashSale(HttpServletRequest request)throws Exception {
		/* log.info("컨트롤러 selectHashSale 호출"); */
		int count = Integer.parseInt(request.getParameter("count"));
		List<ProductsInfoVO> pdsList = homeservice.selectHashSale(count);
		return pdsList;
	}	
	@GetMapping(value = "/home/hash/all")
	@ResponseBody
	public List<ProductsInfoVO> selectHashAll(HttpServletRequest request)throws Exception {
		/* log.info("컨트롤러 selectHashAll 호출"); */
		int count = Integer.parseInt(request.getParameter("count"));
		String charater = request.getParameter("charater");
		String option =  request.getParameter("option");
		List<ProductsInfoVO> pdsList = homeservice.selectHashAll(count, charater, option);
		return pdsList;
	}

	
	@RequestMapping(value = "/test", method = RequestMethod.GET)
	public ModelAndView test(HttpServletRequest request)throws Exception{
		ModelAndView mav = new ModelAndView("../../test/test");
				return mav;
	}
}
