package com.storeproject.controller.crawler;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.storeproject.domain.StoreinfoVO;
import com.storeproject.service.CrawlerService;

import lombok.AllArgsConstructor;

@Controller
@AllArgsConstructor
public class CrawlerController {
	private CrawlerService service;

	@RequestMapping(value = "/crawler/storeinfo", method = RequestMethod.GET)
	public String CrawlerStoreinfo(HttpServletRequest request) throws Exception{
		
		/* 크롤링할 사이트 주소 (카카오는 가져오지못해서 페이지를 다른이름으로 저장해서 프로젝트에 넣었다. 절대경로) */
		/* 저장한 html은 resources/html/ 에 저장되어 있다. */
		File input = new File("C:\\eclipse-workspace\\storeProject\\src\\main\\webapp\\resources\\html\\카카오 프렌즈샵.html");
		Document doc = Jsoup.parse(input, "UTF-8", "https://example.com/");
		
		/* html => Document에 담고 List로 필요한 부분을 클래스로 검색해서 담는다. */
		List<Element> box = doc.getElementsByClass("normal-store__StoreInfoDiv-sc-6ferhi-5 hLZQFk");

		/* 출력을 위해서 반복문 돌림 */
		for (int i = 0; i < box.size(); i++) {
			/* 전화번호, 영업시간, 주소가 같은 클래스로 지정 되어있어 이것도 List에 다시 담아준다. */
			List<Element> dd = box.get(i).children().select("dd");
			
			/* 이미지 src 변수에 저장 */
			String src = box.get(i).children().select("img").attr("src");
			/* 이미지 url이 생략되어 있는 부분이 있어 공통된 부분을 진짜 url로 바꾸어줌 */
			String imgUrl = src.replace("./카카오 프렌즈샵_files", "https://t1.kakaocdn.net/friends/prod/info");
			/* 이미지 다운로드와 저장 파일이름을 변수에 저장 */
			String saveImgName = CrawlerImgLoad(src, imgUrl);
				/* DB에서 이미지경로를 불러와서 넣었을 경우에 프로젝트 내부 폴더 이미지 경로 저장 */
			String img = saveImgName;
			/* 스토어 이름 변수에 저장 */
			String name = box.get(i).children().select("strong").text();
			/* 전화번호, 영업시간, 주소, 위도, 경도 변수 선언 */
			String tel = null, time=null, address=null, country=null;
			Double lng, lat;
			/* 구글맵 url 변수에 저장 */
			String map = box.get(i).children().select("a").attr("href");
			System.out.println(map);
			/* 구글맵 url에서 위도 경도 가져오기 위한 변수와 1단계 처리*/
			int map3d = map.lastIndexOf("!3d");
			int map4d = map.lastIndexOf("!4d");
			String check3d = map.substring(map3d+3, map4d);
			String check4d = map.substring(map4d+3);
			
			/* 잘라낸 위도 경도에서 찌꺼기가 없는지 확인하고 변수에 저장 */
			/* 작성할 때 한개의 위치에서 뒷자리에 ?hl=8 을 발견 삭제*/
			if(check3d.indexOf("?")==-1) {
				lat = Double.parseDouble(check3d);	
			}else {
				lat = Double.parseDouble(check3d.substring(0, check3d.indexOf("?")));	
			}
			if(check4d.indexOf("?")==-1) {
				lng = Double.parseDouble(check4d);	
			}else {
				lng = Double.parseDouble(check4d.substring(0, check4d.indexOf("?")));	
			}
			/* 위도 경도로 국가 판별 및 변수에 저장*/
			if(lng>=124 && lng<133) {
				if(lat>=33 && lat<44) {
					country = "한국";
				}
			} else if(lng>=128 && lng<150) {
				if(lat>=30 && lat<46) {
					country = "일본";
				}
			} else {
				country = "";
			}
			
			/* 전화번호, 영업시간, 주소 변수에 저장 및  전체 출력  */
			System.out.println("=================================================================");
			
			System.out.println("파일명 : "+img);
			System.out.println("이름 : "+name);
			
			for(int a = 0; a < dd.size(); a++) {
				if(a == 0) {
					if((dd.get(a).text().equals("없음"))){
						tel = "";
					} else {
						tel = dd.get(a).text();
					}
					System.out.println(tel);
				}
				if(a == 1) {
					time = dd.get(a).text();
					System.out.println(time);
				}
				if(a == 2 ) {
					address = dd.get(a).text();
					System.out.println(address);
				}
			}
			System.out.println("링크 : "+map);
			System.out.println("위도 : "+lat);
			System.out.println("경도 : "+lng);
			System.out.println("국가 : "+country);
			
			System.out.println("=================================================================");
			
			/* 반복문이 한번 실행 할 때 마다 값을 DB에 저장 */
			StoreinfoVO storeinfovo = new StoreinfoVO();
				storeinfovo.setSt_Img(img);
				storeinfovo.setSt_NM(name);
				storeinfovo.setSt_Tel(tel);
				storeinfovo.setSt_Open(time);
				storeinfovo.setSt_Address(address);
				storeinfovo.setSt_Map_Uri(map);
				storeinfovo.setSt_Lat(lat);
				storeinfovo.setSt_Lng(lng);
				storeinfovo.setSt_Country(country);
			service.insertStoreinfo(storeinfovo);
			System.out.println(i+"번쨰 매장 저장 완료");
		}
		return "redirect:/";
	}
	
	/* 이미지 경로와 url을 가져와서 수정 및 저장 */
	public static String CrawlerImgLoad(String src, String imgUrl) {
		String imageUrl = imgUrl;
		String savePath = "C:\\eclipse-workspace\\storeProject\\src\\main\\webapp\\resources\\img\\info\\storeinfo\\store\\";
		/* src에서 파일명을 제외한 나머지 삭제 */
		String replacesrc = src.replace("./카카오 프렌즈샵_files/", "");
		String saveFileName = replacesrc;
		String fileFormat = "jpg";
		
		System.out.println(" IMAGE URL ::: " + imageUrl);
		System.out.println(" SAVE PATH ::: " + savePath);
		System.out.println(" SAVE FILE NAME ::: " + saveFileName);
		System.out.println(" FILE FORMAT ::: " + fileFormat);
		
		File saveFile = new File(savePath + saveFileName);

		CrawlerImgSave(imageUrl, saveFile, fileFormat);		
		System.out.println("이미지 저장 완료");
		return saveFileName;
	}
	
	public static void CrawlerImgSave(String imageUrl, File saveFile, String fileFormat) {
		    
		URL url = null;
		BufferedImage bi = null;
		
		try {
			url = new URL(imageUrl); // 다운로드 할 이미지 URL
			bi = ImageIO.read(url);
			ImageIO.write(bi, fileFormat, saveFile); // 저장할 파일 형식, 저장할 파일명
			
		} catch (MalformedURLException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}
}
