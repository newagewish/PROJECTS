<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib uri="http://www.springframework.org/security/tags"
	prefix="sec"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %> 
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<title>스토어 프로젝트</title>
<!-- jquery -->
<script
	src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
<!-- css -->
<link href="/resources/css/view.css" rel="stylesheet">
<!-- script -->
<script src="/resources/script/view.js"></script>
<script src="//cdn.iframe.ly/embed.js?api_key=2c35a8916a4273aabd5118" async></script>

</head>
<body>
	<%@include file="includes/header.jsp"%>
	<%@include file="includes/cover.jsp" %>
	<div id="view_box">
		<div id="view_slide_box">
			<div>
				<div id="view_contents_img"></div>
			</div>
			<ul id="view_contents_img_ul">

			</ul>
		</div>
		<div id="view_title_box">${pdsInfo.pds_NM}</div>
		<div id="view_price_box"></div>
		<div class="view_star_box">
			<div class="view_star_off_box">
				<span class="star_off"></span>
			</div>
			<div class="view_star_on_box">
				<span class="star_on"></span>
			</div>
			<span id="star_count"></span>
		</div>
		<div id="view_contents_box">
			<pre id="view_contents">
				${pdsInfo.pds_Contents}
			</pre>
		</div>
		<div id="view_Detail_box">
			<h3>세부정보</h3>
			<pre id="view_detail">
				${pdsInfo.pds_Detail}
			</pre>

		</div>
		<div id="view_Delivery_box">
			<h3>배송·반품</h3>
			<%@include file="includes/delivery.jsp"%>
		</div>
		<div id="view_live_chat_box">
			<h3>실시간 문의</h3>
			<span><button>상담하기</button></span>
		</div>
		<div id="view_review_box">
			<h3>리뷰</h3>
			<div class="view_star_box">
				<div class="view_star_off_box">
					<span class="star_off"></span>
				</div>
				<div class="view_star_on_box">
					<span class="star_on"></span>
				</div>
				<p id="star_point">
				
				</p>
			</div>
			<span>
				<button type="button" onclick="logincehck()">
					<span></span><span>리뷰를 남겨주세요.</span>
				</button>
			</span>
			<div id="review_contents_box"></div>
		</div>
		<sec:authorize access="isAuthenticated()">
			<div id="review_editor_box">
				<div>
					<sec:authentication property="principal.account.ac_NNM" />
				</div>
				<div id="editor_star_box">
					<div id="editor_star_off_box">
						<span class="editor_star_off"></span>
						<div id="editor_star_btn_box">
							<input type="radio" name="checkstar" id="checkstar1"
								value="20%" data-index="1" onclick="pushstarbtn(this)">
							<input type="radio" name="checkstar" id="checkstar2"
								value="40%" data-index="2" onclick="pushstarbtn(this)">
							<input type="radio" name="checkstar" id="checkstar3"
								value="60%" data-index="3" onclick="pushstarbtn(this)">
							<input type="radio" name="checkstar" id="checkstar4"
								value="80%" data-index="4" onclick="pushstarbtn(this)">
							<input type="radio" name="checkstar" id="checkstar5"
								value="100%" data-index="5" onclick="pushstarbtn(this)">
							<label for="checkstar1" class="star_label"></label>
							<label for="checkstar2" class="star_label"></label>
							<label for="checkstar3" class="star_label"></label>
							<label for="checkstar4" class="star_label"></label>
							<label for="checkstar5" class="star_label"></label>
						</div>
					</div>
					<div id="editor_star_on_box">
						<span class="editor_star_on"></span>
					</div>
				</div>
				<textarea id="review_editor_input" maxlength="200" rows="3"
					onkeyup="editorlength(this)"></textarea>
				<button type="button" id="review_editor_btn"
					onclick="logincheckupdate()">등록</button>
				<span>&nbsp/ 200 bytes</span> <span id="review_editor_length">0</span>
			</div>
		</sec:authorize>
		<div id="review_menu_btn_box">
			<button type="button" class="reviewmenu" id="reviewmenu_on" onclick="reviewmenu(this, 'new')">최신순</button>
			<button type="button" class="reviewmenu" id="reviewmenu_off" onclick="reviewmenu(this, 'like')">좋아요순</button>
			
		</div>
		<div id="view_review_list_box">
			<span id="review_list_title">첫번째 리뷰의 주인공이 되어주세요.</span>
			<ul id="review_list_ul">
			
			</ul>
		</div>
		<div id="view_push_box">
			<h3>
				잠깐만,<br> 이 상품은 어때요?
			</h3>
			<ul id="push_contents_ul">

			</ul>
		</div>
		<div id="view_recently_box">
			<h3>
				최근 본 상품이<br> 요기 있네
			</h3>
			<ul id="recently_contents_ul">

			</ul>
		</div>
	</div>
	<%@include file="includes/viewbar.jsp"%>
	<%@include file="includes/footer.jsp"%>
	<script>
		/* ---------------------------------- */
		//전역변수
		var NO = ${pdsInfo.pds_NO};	
		var ac_NO = null;
		<sec:authorize access="isAuthenticated()">
			<sec:authentication var="ac_NO" property='principal.account.ac_NO'/>
			var ac_NO = ${ac_NO};
		</sec:authorize>
		/* ---------------------------------- */
		//뷰페이지 상단에 대표이미지 슬라이드 작업
		var images = "${pdsInfo.pds_Image}";
		var images_array = images.split(",");
		var length = Number(images_array.length);
		$('#view_contents_img').css('width', 'calc(675px * '+length+')');
		$('#view_contents_img_ul').css('width', 'calc(20px * '+length+')');
		for(var i=0; i<images_array.length; i++){
			$('#view_contents_img').append(
				"<img src='/resources/upload/products/images/"+"${pdsInfo.pds_Reg_Date}/"+"${pdsInfo.pds_NO}/"+images_array[i]+"'>"	
			);
			$('#view_contents_img_ul').append(
				"<li class='img_li'>"
				+"<button type='button' class='img_ul_btn' data-index="+i+" onclick='viewimgchange(this)'></button>"
				+"</li>"
			);
		}
		$('.img_ul_btn').eq(0).css('background', '#cccccc');
		
		/* --------------------------------------------------------------- */
		
		var price = ${pdsInfo.pds_Price};
		price = viewReplacePrice(price) + "원";
		$('#view_price_box').append(
			'<span>'+price+'</span>'
		);
		//세일 가격이 있을 경우 처리
		var sale = ${pdsInfo.pds_Sale};
		if(sale!=0){
			sale = viewReplacePrice(sale);
			$('#view_price_box').prepend(
				'<span>'+sale+'원</span>'		
			);
			$('#view_price_box').children('span:nth-child(1)').css('color', 'rgb(255, 85, 117)');
			$('#view_price_box').children('span:nth-child(2)').css('text-decoration', 'line-through');
			$('#view_price_box').children('span:nth-child(2)').css('color', 'rgb(154, 154, 158)');
			$('#view_price_box').children('span:nth-child(2)').css('margin-left', '20px');
		}else{
			//패스
		}
		/* --------------------------------------------------------------- */

		if( localStorage.getItem("recently_view_NO")==null ){
			
			var array = [ ${pdsInfo.pds_NO} ];
			
			localStorage.setItem("recently_view_NO", JSON.stringify(array));
		}else{
			var array = JSON.parse(localStorage.getItem("recently_view_NO"));
			var check = false;
			// 로컬 스토리지 최근 본 제품 번호 값에서 현재 보는 제품의 번호와 동일한 번호가 있을 경우 처리
			for(var i=0; i<array.length; i++){
				if( array[i]==${pdsInfo.pds_NO} ){
					check = true;
					break;
				}else{
					check = false;
				}
			}
			if(!check){
				array.unshift( ${pdsInfo.pds_NO} );
				//최근 본 제품은 8개까지만 노출하기 위해서 배열 길이가 9이 넘으면 잘라준다. 총 길이 9가 되도록 한다.
				//9로 자른 이유는 배열에 있는 번호와 현재 보려고 하는 제품이 겹칠 수가 있기 때문에 8개만 저장했을 경우 7개만 노출 되는 경우를 방지 하기 위해서
				if(array.length>9){
					array.slice(0, 9);
				}
			}
			localStorage.setItem("recently_view_NO", JSON.stringify(array));
		}
		
		/* --------------------------------------------------------------- */
		
		var delivery = "${pdsInfo.pds_Delivery}";
		if(delivery){
			$('#view_Delivery_box > h3').append(
					"<span>국내배송만 가능한 상품입니다.</span>"
			);
		}else{
			$('#view_Delivery_box').append(
					"<span>국내·해외배송 가능한 상품입니다.</span>"
			);
		}
		
		/* --------------------------------------------------------------- */
		//리뷰 쓸 권한 확인 로그인 여부
		function logincehck(){
			<sec:authorize access="isAnonymous()">
				alert("로그인을 해주세요.");
				location.href = "/login/loginPage";
			</sec:authorize>
			<sec:authorize access="isAuthenticated()">
				revieweditoropen();
			</sec:authorize>	
		}
		/* --------------------------------------------------------------- */
		//리뷰 등록 전 로그인 체크
		function logincheckupdate(){
			<sec:authorize access="isAnonymous()">
				alert("로그인이 필요합니다.");
			</sec:authorize>
			<sec:authorize access="isAuthenticated()">
				<sec:authentication var="ac_NNM" property='principal.account.ac_NNM'/>
				var ac_NNM = "${ac_NNM}";
				reviewinsert(ac_NO, ac_NNM);
			</sec:authorize>
		}
		/* --------------------------------------------------------------- */
		//리뷰 좋아요
		function loginchecklike(here){
			<sec:authorize access="isAnonymous()">
				alert("로그인이 필요합니다.");
			</sec:authorize>
			<sec:authorize access="isAuthenticated()">
				likeupdate(here, ac_NO);
			</sec:authorize>	
		}
	</script>
</body>
</html>