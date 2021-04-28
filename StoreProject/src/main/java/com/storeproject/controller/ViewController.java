package com.storeproject.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.storeproject.domain.admin.ProductsInfoVO;
import com.storeproject.domain.admin.ProductsOpVO;
import com.storeproject.domain.review.ReviewInfoVO;
import com.storeproject.service.ViewService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j;

@Controller
@Log4j
@RequestMapping("/view*")
@AllArgsConstructor
public class ViewController {

	private ViewService viewservice;
	
	@GetMapping(value = "")
	public void viewProducts(HttpServletRequest request,Model model)throws Exception {
		/* log.info("컨트롤러 viewProducts 호출"); */
		int pds_NO = Integer.parseInt(request.getParameter("NO"));
		// 제품 인기 수치를 +1 (클릭 1번당 1씩 증가)
		viewservice.viewUpdateVogue(pds_NO);
		// 제품 테이블 제품 정보 불러오기
		ProductsInfoVO pdsinfoVO = viewservice.viewSelectProductsInfo(pds_NO);
		// 옵션테이블 제품 옵션 불러오기
		List<ProductsOpVO> pdsopVO = viewservice.viewSelectProductsOption(pds_NO);
		/*
		 * for(int i=0; i<pdsopVO.size(); i++) {
		 * log.info(pdsopVO.get(i).getOp_Choice()); }
		 */
		model.addAttribute("pdsInfo", pdsinfoVO);
		model.addAttribute("pdsOp", pdsopVO);
		/* log.info(pdsopVO); */
	}
	//제품의 평균 별점을 가져온다.
	@GetMapping(value = "/select/starpoint")
	@ResponseBody
	public String viewStarPoint(@RequestParam("NO") int pds_NO) {
		String str = viewservice.viewStarPoint(pds_NO);
		/* int percent = (int)(point*20); */
		return str;
	}
	
	//제품 뷰 페이지에서  추천 상품 노출을 위해 제품 정보를 가져온다.
	@GetMapping(value = "/select/push")
	@ResponseBody
	public List<ProductsInfoVO> viewSelectPush(@RequestParam("NO") int pds_NO) {
		List<ProductsInfoVO> list = viewservice.viewSelectProductsPush(pds_NO);
		return list;
	}
	//제품 뷰 페이지에서 최근 본 상품을 노출을 위해 제품 정보를 가져온다.
	@GetMapping(value = "/select/recently")
	@ResponseBody
	public ProductsInfoVO viewSelectRecently(@RequestParam("NO") int pds_NO) {
		ProductsInfoVO pdsinfoVO = viewservice.viewSelectProductsInfo(pds_NO);
		
		return pdsinfoVO;
	}
	
	@GetMapping(value = "/review/select")
	@ResponseBody
	public List<ReviewInfoVO> reviewSelect(@RequestParam("NO") int pds_NO) {
		return viewservice.reviewselect(pds_NO);
	}
	@GetMapping(value = "/review/orderlike")
	@ResponseBody
	public List<ReviewInfoVO> reviewOrderLike(@RequestParam("NO") int pds_NO) {
		return viewservice.reviewOrderLike(pds_NO);
	}
	
	@PostMapping(value = "/review/insert")
	@ResponseBody
	public int reviewInsert(@ModelAttribute("alldata") ReviewInfoVO rvo) throws Exception{
		Date time = new Date();
		SimpleDateFormat transFormat = new SimpleDateFormat("yyyy-MM-dd");
		rvo.setRe_Reg_Date(transFormat.format(time));
		return viewservice.reviewInsert(rvo);
	}
	
	@PostMapping(value = "/review/like")
	@ResponseBody
	public int reviewLike(@RequestParam("re_NO") int re_NO, @RequestParam("ac_NO") int ac_NO) throws Exception{
		try {
			return viewservice.reviewLikeUpdate(re_NO, ac_NO);
		}catch(Exception e) {
			e.printStackTrace();
			return 1;
		}
		
	}
}
