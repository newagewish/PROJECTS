/**
 * 
 */
window.onload = function(){
	if(document.location.hash){
		setTimeout(function (){
			/*location.href = "/"+str_hash;*/
			/*window.scrollBy(0, -134);*/
			hashscroll();
    	}, 500);
		setTimeout(function (){
			history.pushState(null, null, "https://61.76.251.66:8442/");
		}, 510);
		
	}
}
$(document).ready(function(){
	checkhash();
});

$(window).scroll(function(){
	clearTimeout(timeout);  //이전 휠 이벤트 제거
    scrolleffect(90);	//스크롤이 일정 수준에 도달하면 작동
});

function hashscroll(){
	
	var str_hash = document.location.hash;
	var index_num = str_hash.indexOf("_");
	var a_name = str_hash.substring(1);
	var menu_name = a_name.substring(0, index_num-1);
	if(menu_name=='home'){
		window.scrollTo(0, sessionStorage.getItem('home_scroll'));
	}else if(menu_name=='new'){
		window.scrollTo(0, sessionStorage.getItem('new_scroll'));
	}else if(menu_name=='vogue'){
		window.scrollTo(0, sessionStorage.getItem('vogue_scroll'));
	}else if(menu_name=='sale'){
		window.scrollTo(0, sessionStorage.getItem('sale_scroll'));
	}else if(menu_name=='all'){
		window.scrollTo(0, sessionStorage.getItem('all_scroll'));
	}
	
}
/* --------------------------------------------------------- */
/* 전역 변수 */
var timeout;	//스크롤 이벤트 변수
/* --------------------------------------------------------- */

function checkhash(){
	if(location.hash){
		//뒤로가기로 불러와서 해시가 있을 경우
		var str_hash = document.location.hash;
		var index_num = str_hash.indexOf("_");
		var a_name = str_hash.substring(1);
		var menu_name = a_name.substring(0, index_num-1);
		
		//세션 스토리지에 불러왔던 제품 개수를 가지고 제품을 각 항목 별로 불러온다.
		selecthash();
		
		/* 포커스 해줘야하는 메뉴 이펙트 및 블럭 처리 */
		$('#mini_bar').children('button').css('border-bottom', "none");	//마지막에 선택한 버튼 효과만 보이기위해 다른 메뉴 효과 감추기
		$('.mini_contents_box').css('height','700px');	//마지막에 선택한 메뉴 외에는 스크롤 길이가 추가되지 않도록 고정
		/*console.log(menu_name);	*/
		if(menu_name=='home'){
			$('#top_contents_box').css('left','0');
			$('#contents_home_box').css('height','auto');
			$('#home_contents_box').css('left','0px');
			$('#mini_bar').children('button:nth-child(1)').css('border-bottom', "2px solid black");
		}else if(menu_name=='new'){
			$('#top_contents_box').css('left','-1080px');
			$('#contents_new_box').css('height','auto');
			$('#home_contents_box').css('left','-1080px');
			$('#mini_bar').children('button:nth-child(2)').css('border-bottom', "2px solid black");
		}else if(menu_name=='vogue'){
			$('#top_contents_box').css('left','-2160px');
			$('#contents_vogue_box').css('height','auto');
			$('#home_contents_box').css('left','-2160px');
			$('#mini_bar').children('button:nth-child(3)').css('border-bottom', "2px solid black");
		}else if(menu_name=='sale'){
			$('#top_contents_box').css('left','-3240px');
			$('#contents_sale_box').css('height','auto');
			$('#home_contents_box').css('left','-3240px');
			$('#mini_bar').children('button:nth-child(4)').css('border-bottom', "2px solid black");
		}else if(menu_name=='all'){
			$('#top_contents_box').css('left','-4320px');
			$('#contents_all_box').css('height','auto');
			$('#home_contents_box').css('left','-4320px');
			$('#mini_bar').children('button:nth-child(5)').css('border-bottom', "2px solid black");
		}else{
			
		}
		
	}else{
		//페이지를 새로 불러오거나 해시가 없는 경우
		//불러온 제품 개수
		sessionStorage.setItem("card_count", 0); //홈 조회 시 불러온 제품 개수
		sessionStorage.setItem("new_count", 0); //신규 조회 시 불러온 제품 개수
		sessionStorage.setItem("vogue_count", 0); //인기도 순 조회 시 불러온 제품 개수
		sessionStorage.setItem("sale_count", 0); //세일 조회 시 불러온 제품 개수
		sessionStorage.setItem("all_count", 0); //전체 조회 시 불러온 제품 개수
		sessionStorage.setItem("all_select", ["sales", "all"]); //전체 조회 시 처음 불러온 옵션들 판매량순+캐릭터전체
		//미니 메뉴의 각 항목별 스크롤 위치
		sessionStorage.setItem("home_scroll", 0); //홈 조회 시 불러온 제품 개수
		sessionStorage.setItem("new_scroll", 0); //신규 조회 시 불러온 제품 개수
		sessionStorage.setItem("vogue_scroll", 0); //인기도 순 조회 시 불러온 제품 개수
		sessionStorage.setItem("sale_scroll", 0); //세일 조회 시 불러온 제품 개수
		sessionStorage.setItem("all_scroll", 0); //전체 조회 시 불러온 제품 개수
		
		selectcard();
		selectnew();
		selectvogue();
		selectsale();
		selectall();
	}
}


/* ------------------------------------------------------------------------------------------------ */
/* ------------------------------------------------------------------------------------------------ */
/* 페이지를 처음 혹은 메인으로 돌아왔을때 제품 정보 호출 */
/* hash 부분과 비슷하지만 sql 쿼리에서 달라지기 때문에 따로 설정 */
function selectcard(){
	carddata = { "count" : sessionStorage.getItem("card_count") }
	$.ajax({
		type:"get",
		url:"/home/card",
		data:carddata,
		success:function(result){
			//카드를 최신 순으로 조회
			if(result.length!=0){
				//가져온 카드 정보가 있으면 불러온 카드 수만큼 세션 카운트에 플러스.
				sessionStorage.setItem("card_count", Number(sessionStorage.getItem("card_count"))+(result.length));
			}else{
				//가져온 카드가 없으면 세션 카운트를 올리지 않는다.
			}
			var div1_hei = 10;
			var div2_hei = 10;
			var div3_hei = 10;
			var div;
			for(var i=0; i<result.length; i++){
				/*console.log(div1_hei+" / "+div2_hei+" / "+div3_hei);*/
				if(div1_hei <= div2_hei && div1_hei <= div3_hei){
					//첫번째 div에 넣어준다.
					div = $('#contents_home_box').children('div:nth-child(1)');
					//카드 종류가 3종류 이기 때문에 조건문으로 나눔)
					if(result[i].card_Type == "image"){
						//카드 이미지형일 때는 이미지만 박스에 추가
						if(result[i].card_Url != null){
							div.append(
								"<div class='contents_card_div' value='"+result[i].card_NO+"' value='"+result[i].card_NO+"'>"
								+	"<a class='card_img_btn' onclick='inserthashcard(this)' href='/view?NO="+result[i].card_Url+"'>"
								+		"<img src='/resources/upload/card/images/"+result[i].card_Reg_Date+"/"+result[i].card_NO+"/"+result[i].card_Img+"'></img>"
								+	"</a>"
								+"</div>"
							);
						}else{
							div.append(
								"<div class='contents_card_div' value='"+result[i].card_NO+"'>"
								+	"<a class='card_img_btn' onclick='inserthashcard(this)' href='/card?NO="+result[i].card_NO+"'>"
								+		"<img src='/resources/upload/card/images/"+result[i].card_Reg_Date+"/"+result[i].card_NO+"/"+result[i].card_Img+"'></img>"
								+	"</a>"
								+"</div>"
							);
						}
					}else if(result[i].card_Type == "intro"){
						if(result[i].card_Url != null){
							div.append(
								"<div class='contents_card_div' value='"+result[i].card_NO+"'>"
								+	"<a class='card_img_btn' onclick='inserthashcard(this)' href='/view?NO="+result[i].card_Url+"'>"
								+		"<img src='/resources/upload/card/images/"+result[i].card_Reg_Date+"/"+result[i].card_NO+"/"+result[i].card_Img+"'></img>"
								+	"</a>"
								+	"<div class='contents_card_title'>"
								+		result[i].card_Title
								+	"</div>"
								+	"<div class='contents_card_intro'>"
								+		result[i].card_Intro
								+	"</div>"
								+"</div>"
							);
						}else{
							div.append(
								"<div class='contents_card_div' value='"+result[i].card_NO+"'>"
								+	"<a class='card_img_btn' onclick='inserthashcard(this)' href='/card?NO="+result[i].card_NO+"'>"
								+		"<img src='/resources/upload/card/images/"+result[i].card_Reg_Date+"/"+result[i].card_NO+"/"+result[i].card_Img+"'></img>"
								+	"</a>"
								+	"<div class='contents_card_title'>"
								+		result[i].card_Title
								+	"</div>"
								+	"<div class='contents_card_intro'>"
								+		result[i].card_Intro
								+	"</div>"
								+"</div>"
							);
						}
					}else if(result[i].card_Type == "list"){
						div.append(
							"<div class='contents_card_div' value='"+result[i].card_NO+"'>"
							+	"<a class='card_img_btn' onclick='inserthashcard(this)' href='/card?NO="+result[i].card_NO+"'>"
							+		"<img src='/resources/upload/card/images/"+result[i].card_Reg_Date+"/"+result[i].card_NO+"/"+result[i].card_Img+"'></img>"
							+	"</a>"
							+	"<div class='contents_card_title'>"
							+		result[i].card_Title
							+	"</div>"
							+	"<div class='contents_card_intro'>"
							+		result[i].card_Intro
							+	"</div>"
							+	"<div class='contents_card_Choice' id='card_choice_"+result[i].card_NO+"'>"
							+	"</div>"
							+"</div>"
						);
						var str_id = "card_choice_"+result[i].card_NO;
						var no_arr = (result[i].card_Choice).split(",");
	
						for(var b=0; b<no_arr.length; b++){
							var choicedata = { "NO": no_arr[b] };
							$.ajax({
								type:"get",
								url:"admin/card/select/product",
								data:choicedata,
								async: false,
								success:function(result2){
									var price = cardReplacePrice(result2.pds_Price);
									var pds_image_name = result2.pds_Image.split(",");
									/*alert(pds_image_name[0]);*/
									$('#'+str_id).append(
										"<div class='choice_box'>"
										+	"<a class='choice_a_tag' id='choice_"+result2.pds_NO+"'>"
										+		"<span class='choice_img_cover'></span>"
										+		"<span>"
										+			"<img class='choice_contents_image' src='/resources/upload/products/images/"+result2.pds_Reg_Date+"/"+result2.pds_NO+"/"+pds_image_name[0]+"' />"
										+		"</span>"
										+		"<p class='choice_mini_name'>"+result2.pds_NM+"</p>"
										+		"<p class='choice_mini_price'>"+price+"원</p>"
										+	"</a>"
										+"</div>"
									);
									// 세일이 있을 경우 처리
									if(result2.pds_Sale != 0){
										var sale = cardReplacePrice(result2.pds_Sale);
										var percent = 100 - Math.floor( result2.pds_Sale / (result2.pds_Price / 100) );
										$('#choice_'+result2.pds_NO).children('p:nth-child(3)').after(
											'<p class="choice_mini_percent">'+percent+'%</p>'
										);
										$('#choice_'+result2.pds_NO).children('p:nth-child(4)').after(
											'<p class="choice_mini_sale">'+sale+'원</p>'
										);
										$('.choice_a_tag').children('p:nth-child(6)').css('text-decoration','line-through');
										$('.choice_a_tag').children('p:nth-child(6)').css('color', 'rgb(154, 154, 158)');
									}
								},error:function(jqXHR, textStatus, errorThrown){
									
								}
							})
						}
					}
					var str = $('#contents_home_box').children('div:nth-child(1)').css('height');
					div1_hei = Number(str.replace("px", ""));
				}else if(div2_hei <= div1_hei && div2_hei <= div3_hei){
					//두번째 div에 넣어준다.
					div = $('#contents_home_box').children('div:nth-child(2)');
					//카드 종류가 3종류 이기 때문에 조건문으로 나눔)
					if(result[i].card_Type == "image"){
						//카드 이미지형일 때는 이미지만 박스에 추가
						if(result[i].card_Url != null){
							div.append(
								"<div class='contents_card_div' value='"+result[i].card_NO+"'>"
								+	"<a class='card_img_btn' onclick='inserthashcard(this)' href='/view?NO="+result[i].card_Url+"'>"
								+		"<img src='/resources/upload/card/images/"+result[i].card_Reg_Date+"/"+result[i].card_NO+"/"+result[i].card_Img+"'></img>"
								+	"</a>"
								+"</div>"
							);
						}else{
							div.append(
								"<div class='contents_card_div' value='"+result[i].card_NO+"'>"
								+	"<a class='card_img_btn' onclick='inserthashcard(this)' href='/card?NO="+result[i].card_NO+"'>"
								+		"<img src='/resources/upload/card/images/"+result[i].card_Reg_Date+"/"+result[i].card_NO+"/"+result[i].card_Img+"'></img>"
								+	"</a>"
								+"</div>"
							);
						}
					}else if(result[i].card_Type == "intro"){
						if(result[i].card_Url != null){
							div.append(
								"<div class='contents_card_div' value='"+result[i].card_NO+"'>"
								+	"<a class='card_img_btn' onclick='inserthashcard(this)' href='/view?NO="+result[i].card_Url+"'>"
								+		"<img src='/resources/upload/card/images/"+result[i].card_Reg_Date+"/"+result[i].card_NO+"/"+result[i].card_Img+"'></img>"
								+	"</a>"
								+	"<div class='contents_card_title'>"
								+		result[i].card_Title
								+	"</div>"
								+	"<div class='contents_card_intro'>"
								+		result[i].card_Intro
								+	"</div>"
								+"</div>"
							);
						}else{
							div.append(
								"<div class='contents_card_div' value='"+result[i].card_NO+"'>"
								+	"<a class='card_img_btn' onclick='inserthashcard(this)' href='/card?NO="+result[i].card_NO+"'>"
								+		"<img src='/resources/upload/card/images/"+result[i].card_Reg_Date+"/"+result[i].card_NO+"/"+result[i].card_Img+"'></img>"
								+	"</a>"
								+	"<div class='contents_card_title'>"
								+		result[i].card_Title
								+	"</div>"
								+	"<div class='contents_card_intro'>"
								+		result[i].card_Intro
								+	"</div>"
								+"</div>"
							);
						}
					}else if(result[i].card_Type == "list"){
						div.append(
							"<div class='contents_card_div' value='"+result[i].card_NO+"'>"
							+	"<a class='card_img_btn' onclick='inserthashcard(this)' href='/card?NO="+result[i].card_NO+"'>"
							+		"<img src='/resources/upload/card/images/"+result[i].card_Reg_Date+"/"+result[i].card_NO+"/"+result[i].card_Img+"'></img>"
							+	"</a>"
							+	"<div class='contents_card_title'>"
							+		result[i].card_Title
							+	"</div>"
							+	"<div class='contents_card_intro'>"
							+		result[i].card_Intro
							+	"</div>"
							+	"<div class='contents_card_Choice' id='card_choice_"+result[i].card_NO+"'>"
							+	"</div>"
							+"</div>"
						);
						var str_id = "card_choice_"+result[i].card_NO;
						var no_arr = (result[i].card_Choice).split(",");
	
						for(var b=0; b<no_arr.length; b++){
							var choicedata = { "NO": no_arr[b] };
							$.ajax({
								type:"get",
								url:"admin/card/select/product",
								data:choicedata,
								async: false,
								success:function(result2){
									var price = cardReplacePrice(result2.pds_Price);
									var pds_image_name = result2.pds_Image.split(",");
									/*alert(pds_image_name[0]);*/
									$('#'+str_id).append(
										"<div class='choice_box'>"
										+	"<a class='choice_a_tag' id='choice_"+result2.pds_NO+"'>"
										+		"<span class='choice_img_cover'></span>"
										+		"<span>"
										+			"<img class='choice_contents_image' src='/resources/upload/products/images/"+result2.pds_Reg_Date+"/"+result2.pds_NO+"/"+pds_image_name[0]+"' />"
										+		"</span>"
										+		"<p class='choice_mini_name'>"+result2.pds_NM+"</p>"
										+		"<p class='choice_mini_price'>"+price+"원</p>"
										+	"</a>"
										+"</div>"
									);
									// 세일이 있을 경우 처리
									if(result2.pds_Sale != 0){
										var sale = cardReplacePrice(result2.pds_Sale);
										var percent = 100 - Math.floor( result2.pds_Sale / (result2.pds_Price / 100) );
										$('#choice_'+result2.pds_NO).children('p:nth-child(3)').after(
											'<p class="choice_mini_percent">'+percent+'%</p>'
										);
										$('#choice_'+result2.pds_NO).children('p:nth-child(4)').after(
											'<p class="choice_mini_sale">'+sale+'원</p>'
										);
										$('.choice_a_tag').children('p:nth-child(6)').css('text-decoration','line-through');
										$('.choice_a_tag').children('p:nth-child(6)').css('color', 'rgb(154, 154, 158)');
									}
								},error:function(jqXHR, textStatus, errorThrown){
									
								}
							})
						}
					}
					var str = $('#contents_home_box').children('div:nth-child(2)').css('height');
					div2_hei = Number(str.replace("px", ""));
				}else if(div3_hei <= div1_hei && div3_hei <= div2_hei){
					//세번째 div에 넣어준다.
					div = $('#contents_home_box').children('div:nth-child(3)');
					//카드 종류가 3종류 이기 때문에 조건문으로 나눔)
					if(result[i].card_Type == "image"){
						//카드 이미지형일 때는 이미지만 박스에 추가
						if(result[i].card_Url != null){
							div.append(
								"<div class='contents_card_div' value='"+result[i].card_NO+"'>"
								+	"<a class='card_img_btn' onclick='inserthashcard(this)' href='/view?NO="+result[i].card_Url+"'>"
								+		"<img src='/resources/upload/card/images/"+result[i].card_Reg_Date+"/"+result[i].card_NO+"/"+result[i].card_Img+"'></img>"
								+	"</a>"
								+"</div>"
							);
						}else{
							div.append(
								"<div class='contents_card_div' value='"+result[i].card_NO+"'>"
								+	"<a class='card_img_btn' onclick='inserthashcard(this)' href='/card?NO="+result[i].card_NO+"'>"
								+		"<img src='/resources/upload/card/images/"+result[i].card_Reg_Date+"/"+result[i].card_NO+"/"+result[i].card_Img+"'></img>"
								+	"</a>"
								+"</div>"
							);
						}
					}else if(result[i].card_Type == "intro"){
						if(result[i].card_Url != null){
							div.append(
								"<div class='contents_card_div' value='"+result[i].card_NO+"'>"
								+	"<a class='card_img_btn' onclick='inserthashcard(this)' href='/view?NO="+result[i].card_Url+"'>"
								+		"<img src='/resources/upload/card/images/"+result[i].card_Reg_Date+"/"+result[i].card_NO+"/"+result[i].card_Img+"'></img>"
								+	"</a>"
								+	"<div class='contents_card_title'>"
								+		result[i].card_Title
								+	"</div>"
								+	"<div class='contents_card_intro'>"
								+		result[i].card_Intro
								+	"</div>"
								+"</div>"
							);
						}else{
							div.append(
								"<div class='contents_card_div' value='"+result[i].card_NO+"'>"
								+	"<a class='card_img_btn' onclick='inserthashcard(this)' href='/card?NO="+result[i].card_NO+"'>"
								+		"<img src='/resources/upload/card/images/"+result[i].card_Reg_Date+"/"+result[i].card_NO+"/"+result[i].card_Img+"'></img>"
								+	"</a>"
								+	"<div class='contents_card_title'>"
								+		result[i].card_Title
								+	"</div>"
								+	"<div class='contents_card_intro'>"
								+		result[i].card_Intro
								+	"</div>"
								+"</div>"
							);
						}
					}else if(result[i].card_Type == "list"){
						div.append(
							"<div class='contents_card_div' value='"+result[i].card_NO+"'>"
							+	"<a class='card_img_btn' onclick='inserthashcard(this)' href='/card?NO="+result[i].card_NO+"'>"
							+		"<img src='/resources/upload/card/images/"+result[i].card_Reg_Date+"/"+result[i].card_NO+"/"+result[i].card_Img+"'></img>"
							+	"</a>"
							+	"<div class='contents_card_title'>"
							+		result[i].card_Title
							+	"</div>"
							+	"<div class='contents_card_intro'>"
							+		result[i].card_Intro
							+	"</div>"
							+	"<div class='contents_card_Choice' id='card_choice_"+result[i].card_NO+"'>"
							+	"</div>"
							+"</div>"
						);
						var str_id = "card_choice_"+result[i].card_NO;
						var no_arr = (result[i].card_Choice).split(",");
	
						for(var b=0; b<no_arr.length; b++){
							var choicedata = { "NO": no_arr[b] };
							$.ajax({
								type:"get",
								url:"admin/card/select/product",
								data:choicedata,
								async: false,
								success:function(result2){
									var price = cardReplacePrice(result2.pds_Price);
									var pds_image_name = result2.pds_Image.split(",");
									/*alert(pds_image_name[0]);*/
									$('#'+str_id).append(
										"<div class='choice_box'>"
										+	"<a class='choice_a_tag' id='choice_"+result2.pds_NO+"'>"
										+		"<span class='choice_img_cover'></span>"
										+		"<span>"
										+			"<img class='choice_contents_image' src='/resources/upload/products/images/"+result2.pds_Reg_Date+"/"+result2.pds_NO+"/"+pds_image_name[0]+"' />"
										+		"</span>"
										+		"<p class='choice_mini_name'>"+result2.pds_NM+"</p>"
										+		"<p class='choice_mini_price'>"+price+"원</p>"
										+	"</a>"
										+"</div>"
									);
									// 세일이 있을 경우 처리
									if(result2.pds_Sale != 0){
										var sale = cardReplacePrice(result2.pds_Sale);
										var percent = 100 - Math.floor( result2.pds_Sale / (result2.pds_Price / 100) );
										$('#choice_'+result2.pds_NO).children('p:nth-child(3)').after(
											'<p class="choice_mini_percent">'+percent+'%</p>'
										);
										$('#choice_'+result2.pds_NO).children('p:nth-child(4)').after(
											'<p class="choice_mini_sale">'+sale+'원</p>'
										);
										$('.choice_a_tag').children('p:nth-child(6)').css('text-decoration','line-through');
										$('.choice_a_tag').children('p:nth-child(6)').css('color', 'rgb(154, 154, 158)');
									}
								},error:function(jqXHR, textStatus, errorThrown){
									
								}
							})
						}
					}
					var str = $('#contents_home_box').children('div:nth-child(3)').css('height');
					div3_hei = Number(str.replace("px", ""));
				}
			}
		},error:function(jqXHR, textStatus, errorThrown){
			
		}
	});
}

function selectnew(){
	newdata = { "count" : sessionStorage.getItem("new_count") };
	$.ajax({
		type:"get",
		url:"/home/new",
		data:newdata,
		success:function(result){
			//제품을 최신 순으로 조회
			if(result!=null){
				//가져온 상품 정보가 있으면 불러온 상품 수만큼 세션 카운트에 더한다.
				sessionStorage.setItem("new_count", Number(sessionStorage.getItem("new_count"))+(result.length));
			}else{
				//가져온 내용이 없으면 세션 카운터를 올리지 않는다.
			}
			for(var i=0; i<result.length; i++){
				var price = homeReplacePrice(result[i].pds_Price);
				var pds_image_name = result[i].pds_Image.split(",");
				/*alert(pds_image_name[0]);*/
				$('#contents_new_box').append(
					"<div class='contents_new_div'>"
					+	"<a class='new_a_tag' id='new_"+result[i].pds_NO+"' name='"+result[i].pds_NO+"' onclick='inserthash(this)'>"
					+		"<span class='img_cover'></span>"
					+		"<span>"
					+			"<img class='contents_image' src='/resources/upload/products/images/"+result[i].pds_Reg_Date+"/"+result[i].pds_NO+"/"+pds_image_name[0]+"' />"
					+		"</span>"
					+		"<p class='mini_name'>"+result[i].pds_NM+"</p>"
					+		"<p class='mini_price'>"+price+"원</p>"
					+	"</a>"
					+"</div>"
				);
				// 세일이 있을 경우 처리
				if(result[i].pds_Sale != 0){
					var sale = homeReplacePrice(result[i].pds_Sale);
					var percent = 100 - Math.floor( result[i].pds_Sale / (result[i].pds_Price / 100) );
					$('#new_'+result[i].pds_NO).children('p:nth-child(3)').after(
						'<p class="mini_percent">'+percent+'%</p>'
					);
					$('#new_'+result[i].pds_NO).children('p:nth-child(4)').after(
						'<p class="mini_sale">'+sale+'원</p>'
					);
					$('.new_a_tag').children('p:nth-child(6)').css('text-decoration','line-through');
					$('.new_a_tag').children('p:nth-child(6)').css('color', 'rgb(154, 154, 158)');
				}
				/*alert(result[i].pds_Reg_Date);*/
			}
			
		},error:function(jqXHR, textStatus, errorThrown){
			
		}
	})
}
function selectvogue(){
	voguedata = { "count" : sessionStorage.getItem("vogue_count") };
	$.ajax({
		type:"get",
		url:"/home/vogue",
		data:voguedata,
		success:function(result){
			//검색한 제품을 최신 순으로 조회
			if(result!=null){
				//가져온 상품 정보가 있으면 불러온 마지막 상품번호를 세션 카운트에 더한다.
				sessionStorage.setItem("vogue_count", Number(sessionStorage.getItem("vogue_count"))+(result.length));
			}else{
				//가져온 내용이 없으면 세션 카운터를 올리지 않는다.
			}
			for(var i=0; i<result.length; i++){
				var pds_image_name = result[i].pds_Vogue_Image;
				/*alert(pds_image_name[0]);*/
				$('#contents_vogue_box').append(
					"<div class='contents_vogue_div'>"
					+"<a id='vogue_"+result[i].pds_NO+"' name='"+result[i].pds_NO+"' onclick='inserthash(this)'>"
					+	"<span>"
					+		"<img class='contents_image' src='/resources/upload/products/vogue/"+result[i].pds_Reg_Date+"/"+result[i].pds_NO+"/"+pds_image_name+"' />"
					+	"</span>"
					+"</a>"
					+"</div>"
				);
				/*alert(result[i].pds_Reg_Date);*/
			}
		},error:function(jqXHR, textStatus, errorThrown){
			
		}
	})
}
function selectsale(){
	saledata = { "count" : sessionStorage.getItem("sale_count") };
	$.ajax({
		type:"get",
		url:"/home/sale",
		data:saledata,
		success:function(result){
			//제품을 최신 순으로 조회
			if(result!=null){
				//가져온 상품 정보가 있으면 불러온 마지막 상품번호를 세션 카운트에 더한다.
				sessionStorage.setItem("sale_count", Number(sessionStorage.getItem("sale_count"))+(result.length));
			}else{
				//가져온 내용이 없으면 세션 카운터를 올리지 않는다.
			}
			for(var i=0; i<result.length; i++){
				var price = homeReplacePrice(result[i].pds_Price);
				var pds_image_name = result[i].pds_Image.split(",");
				var sale = homeReplacePrice(result[i].pds_Sale);
				var percent = 100 - Math.floor( result[i].pds_Sale / (result[i].pds_Price / 100) );
				
				/*alert(pds_image_name[0]);*/
				$('#contents_sale_box').append(
					"<div class='contents_sale_div'>"
					+"<a id='sale_"+result[i].pds_NO+"' name='"+result[i].pds_NO+"' onclick='inserthash(this)'>"
					+	"<span class='img_cover'></span>"
					+	"<span>"
					+		"<img class='contents_image' src='/resources/upload/products/images/"+result[i].pds_Reg_Date+"/"+result[i].pds_NO+"/"+pds_image_name[0]+"' />"
					+	"</span>"
					+	"<p class='mini_name'>"+result[i].pds_NM+"</p>"
					+	"<p class='mini_percent'>"+percent+"%</p>"
					+	"<p class='mini_sale'>"+sale+"원</p>"
					+	"<p class='mini_price' style='text-decoration:line-through; color:rgb(154, 154, 158);'>"+price+"원</p>"
					+"</a>"
					+"</div>"
				);
				/*alert(result[i].pds_Reg_Date);*/
			}
		},error:function(jqXHR, textStatus, errorThrown){
			
		}
	})
}

function selectall(){
	alloption();
}

	//전체메뉴 셀렉트 옵션 박스 선택시 작동할 함수
	function alloption(here){
		$(here).siblings('button').removeAttr('disabled');
		$(here).attr('disabled', 'disabled');
		$('#all_select_option_box').css('display','none');
		$('#option_btn').html($(here).html());
		$('#all_select_option').attr("value", $(here).attr("value"));
		
		var arr = sessionStorage.getItem("all_select").split(",");
		var charater = $('#all_select_charater').attr('value');
		var option = $('#all_select_option').attr('value');
		if(option==arr[0] && charater==arr[1]){
			//이전 선택 항목이 겹칠 경우는 처리없이 패스
		}else{
			//이전 선택 항목과 틀릴 경우 처리
			var arr = [option, charater];
			sessionStorage.setItem("all_count", 0);
			sessionStorage.setItem("all_select", arr);
			
			$('#all_select_box').empty();
		}
		/*console.log(charater+option);*/
		alldata = { "count" : sessionStorage.getItem("all_count"), "charater" : charater, "option" : option };
		$.ajax({
			type:"get",
			url:"/home/all",
			data:alldata,
			success:function(result){
				serchcount();
				if(result!=null){
					//가져온 상품 정보가 있으면 불러온 마지막 상품번호를 세션 카운트에 더한다.
					sessionStorage.setItem("all_count", Number(sessionStorage.getItem("all_count"))+(result.length));
					
				}else{
					//가져온 내용이 없으면 세션 카운터를 올리지 않는다.
				}
				for(var i=0; i<result.length; i++){
					var price = homeReplacePrice(result[i].pds_Price);
					var pds_image_name = result[i].pds_Image.split(",");
					/*alert(pds_image_name[0]);*/
					$('#all_select_box').append(
						"<div class='contents_all_div'>"
						+"<a class='all_a_tag' id='all_"+result[i].pds_NO+"' name='"+result[i].pds_NO+"' onclick='inserthash(this)'>"
						+	"<span class='img_cover'></span>"
						+	"<span>"
						+		"<img class='contents_image' src='/resources/upload/products/images/"+result[i].pds_Reg_Date+"/"+result[i].pds_NO+"/"+pds_image_name[0]+"' />"
						+	"</span>"
						+	"<p class='mini_name'>"+result[i].pds_NM+"</p>"
						+	"<p class='mini_price'>"+price+"원</p>"
						+"</a>"
						+"</div>"
					);
					// 세일이 있을 경우 처리
					if(result[i].pds_Sale != 0){
						var sale = homeReplacePrice(result[i].pds_Sale);
						var percent = 100 - Math.floor( result[i].pds_Sale / (result[i].pds_Price / 100) );
						$('#all_'+result[i].pds_NO).children('p:nth-child(3)').after(
							'<p class="mini_percent">'+percent+'%</p>'
						);
						$('#all_'+result[i].pds_NO).children('p:nth-child(4)').after(
							'<p class="mini_sale">'+sale+'원</p>'
						);
						$('.all_a_tag').children('p:nth-child(6)').css('text-decoration','line-through');
						$('.all_a_tag').children('p:nth-child(6)').css('color', 'rgb(154, 154, 158)');
					}
					/*alert(result[i].pds_Reg_Date);*/
				}
			},error:function(jqXHR, textStatus, errorThrown){
				
			}
		});
	}
	//전체메뉴 셀렉트 캐릭터 박스 선택시 작동할 함수
	function allcharater(here){
		$(here).siblings('button').removeAttr('disabled');
		$(here).attr('disabled', 'disabled');
		$('#all_select_charater_box').css('display','none');
		$('#charater_btn').html($(here).children('span').html());
		$('#all_select_charater').attr("value", $(here).attr("value"));
		
		var arr = sessionStorage.getItem("all_select").split(",");
		var charater = $('#all_select_charater').attr('value');
		var option = $('#all_select_option').attr('value');
		if(option==arr[0] && charater==arr[1]){
			//이전 선택 항목이 겹칠 경우는 처리없이 패스
		}else{
			//이전 선택 항목과 틀릴 경우 처리
			var arr = [option, charater];
			sessionStorage.setItem("all_count", 0);
			sessionStorage.setItem("all_select", arr);
			
			$('#all_select_box').empty();
		}
		/*console.log(charater+option);*/
		alldata = { "count" : sessionStorage.getItem("all_count"), "charater" : charater, "option" : option };
		$.ajax({
			type:"get",
			url:"/home/all",
			data:alldata,
			success:function(result){
				serchcount(alldata);
				//제품을 최신 순으로 조회
				if(result!=null){
					//가져온 상품 정보가 있으면 불러온 마지막 상품번호를 세션 카운트에 더한다.
					sessionStorage.setItem("all_count", Number(sessionStorage.getItem("all_count"))+(result.length));
					
				}else{
					//가져온 내용이 없으면 세션 카운터를 올리지 않는다.
				}
				for(var i=0; i<result.length; i++){
					var price = homeReplacePrice(result[i].pds_Price);
					var pds_image_name = result[i].pds_Image.split(",");
					/*alert(pds_image_name[0]);*/
					$('#all_select_box').append(
						"<div class='contents_new_div'>"
						+"<a class='all_a_tag' id='all_"+result[i].pds_NO+"' name='"+result[i].pds_NO+"' onclick='inserthash(this)'>"
						+	"<span class='img_cover'></span>"
						+	"<span>"
						+		"<img class='contents_image' src='/resources/upload/products/images/"+result[i].pds_Reg_Date+"/"+result[i].pds_NO+"/"+pds_image_name[0]+"' />"
						+	"</span>"
						+	"<p class='mini_name'>"+result[i].pds_NM+"</p>"
						+	"<p class='mini_price'>"+price+"원</p>"
						+"</a>"
						+"</div>"
					);
					// 세일이 있을 경우 처리
					if(result[i].pds_Sale != 0){
						var sale = homeReplacePrice(result[i].pds_Sale);
						var percent = 100 - Math.floor( result[i].pds_Sale / (result[i].pds_Price / 100) );
						$('#all_'+result[i].pds_NO).children('p:nth-child(3)').after(
							'<p class="mini_percent">'+percent+'%</p>'
						);
						$('#all_'+result[i].pds_NO).children('p:nth-child(4)').after(
							'<p class="mini_sale">'+sale+'원</p>'
						);
						$('.all_a_tag').children('p:nth-child(6)').css('text-decoration','line-through');
						$('.all_a_tag').children('p:nth-child(6)').css('color', 'rgb(154, 154, 158)');
					}
					/*alert(result[i].pds_Reg_Date);*/
				}
			},error:function(jqXHR, textStatus, errorThrown){
				
			}
		});
	}

function allscroll(here){
		var charater = $('#all_select_charater').attr('value');
		var option = $('#all_select_option').attr('value');
		/*console.log(charater+option);*/
		alldata = { "count" : sessionStorage.getItem("all_count"), "charater" : charater, "option" : option };
		$.ajax({
			type:"get",
			url:"/home/all",
			data:alldata,
			success:function(result){
				serchcount(alldata);
				//제품을 조건별 조회
				if(result!=null){
					//가져온 상품 정보가 있으면 불러온 마지막 상품번호를 세션 카운트에 더한다.
					sessionStorage.setItem("all_count", Number(sessionStorage.getItem("all_count"))+(result.length));
					
				}else{
					//가져온 내용이 없으면 세션 카운터를 올리지 않는다.
				}
				for(var i=0; i<result.length; i++){
					var price = homeReplacePrice(result[i].pds_Price);
					var pds_image_name = result[i].pds_Image.split(",");
					/*alert(pds_image_name[0]);*/
					$('#all_select_box').append(
						"<div class='contents_new_div'>"
						+"<a class='all_a_tag' id='all_"+result[i].pds_NO+"' name='"+result[i].pds_NO+"' onclick='inserthash(this)'>"
						+	"<span class='img_cover'></span>"
						+	"<span>"
						+		"<img class='contents_image' src='/resources/upload/products/images/"+result[i].pds_Reg_Date+"/"+result[i].pds_NO+"/"+pds_image_name[0]+"' />"
						+	"</span>"
						+	"<p class='mini_name'>"+result[i].pds_NM+"</p>"
						+	"<p class='mini_price'>"+price+"원</p>"
						+"</a>"
						+"</div>"
					);
					// 세일이 있을 경우 처리
					if(result[i].pds_Sale != 0){
						var sale = homeReplacePrice(result[i].pds_Sale);
						var percent = 100 - Math.floor( result[i].pds_Sale / (result[i].pds_Price / 100) );
						$('#all_'+result[i].pds_NO).children('p:nth-child(3)').after(
							'<p class="mini_percent">'+percent+'%</p>'
						);
						$('#all_'+result[i].pds_NO).children('p:nth-child(4)').after(
							'<p class="mini_sale">'+sale+'원</p>'
						);
					}
					/*alert(result[i].pds_Reg_Date);*/
				}
				$('.all_a_tag').children('p:nth-child(6)').css('text-decoration','line-through');
				$('.all_a_tag').children('p:nth-child(6)').css('color', 'rgb(154, 154, 158)');
			},error:function(jqXHR, textStatus, errorThrown){
				
			}
		});
	}
/* ------------------------------------------------------------------------------------------------ */
/* ------------------------------------------------------------------------------------------------ */

function inserthashcard(here){
	var no = $(here).parents('div').attr('value');
	var str_hash = "#home_"+no;
	window.location.hash = str_hash;
}

function inserthash(here){
	var no = $(here).attr('name');
	var contents_name = $(here).attr('id');
	var str_hash = "#" + contents_name;
	window.location.hash = str_hash;
	location.href = "/view?NO="+no;
}

function selecthash(){
	selecthashcard();
	selecthashnew();
	selecthashvogue();
	selecthashsale();
	selecthashall();
}

function selecthashcard(){
	carddata = { "count" : sessionStorage.getItem("card_count") }
	$.ajax({
		type:"get",
		url:"/home/hash/card",
		data:carddata,
		success:function(result){
			//이전에 불러온 카드 개수만큼 불러오기
			var div1_hei = 10;
			var div2_hei = 10;
			var div3_hei = 10;
			var div;
			for(var i=0; i<result.length; i++){
				/*console.log(div1_hei+" / "+div2_hei+" / "+div3_hei);*/
				if(div1_hei <= div2_hei && div1_hei <= div3_hei){
					//첫번째 div에 넣어준다.
					div = $('#contents_home_box').children('div:nth-child(1)');
					//카드 종류가 3종류 이기 때문에 조건문으로 나눔)
					if(result[i].card_Type == "image"){
						//카드 이미지형일 때는 이미지만 박스에 추가
						if(result[i].card_Url != null){
							div.append(
								"<div class='contents_card_div' value='"+result[i].card_NO+"'>"
								+	"<a class='card_img_btn' onclick='inserthashcard(this)' href='/view?NO="+result[i].card_Url+"'>"
								+		"<img src='/resources/upload/card/images/"+result[i].card_Reg_Date+"/"+result[i].card_NO+"/"+result[i].card_Img+"'></img>"
								+	"</a>"
								+"</div>"
							);
						}else{
							div.append(
								"<div class='contents_card_div' value='"+result[i].card_NO+"'>"
								+	"<a class='card_img_btn' onclick='inserthashcard(this)' href='/card?NO="+result[i].card_NO+"'>"
								+		"<img src='/resources/upload/card/images/"+result[i].card_Reg_Date+"/"+result[i].card_NO+"/"+result[i].card_Img+"'></img>"
								+	"</a>"
								+"</div>"
							);
						}
					}else if(result[i].card_Type == "intro"){
						if(result[i].card_Url != null){
							div.append(
								"<div class='contents_card_div' value='"+result[i].card_NO+"'>"
								+	"<a class='card_img_btn' onclick='inserthashcard(this)' href='/view?NO="+result[i].card_Url+"'>"
								+		"<img src='/resources/upload/card/images/"+result[i].card_Reg_Date+"/"+result[i].card_NO+"/"+result[i].card_Img+"'></img>"
								+	"</a>"
								+	"<div class='contents_card_title'>"
								+		result[i].card_Title
								+	"</div>"
								+	"<div class='contents_card_intro'>"
								+		result[i].card_Intro
								+	"</div>"
								+"</div>"
							);
						}else{
							div.append(
								"<div class='contents_card_div' value='"+result[i].card_NO+"'>"
								+	"<a class='card_img_btn' onclick='inserthashcard(this)' href='/card?NO="+result[i].card_NO+"'>"
								+		"<img src='/resources/upload/card/images/"+result[i].card_Reg_Date+"/"+result[i].card_NO+"/"+result[i].card_Img+"'></img>"
								+	"</a>"
								+	"<div class='contents_card_title'>"
								+		result[i].card_Title
								+	"</div>"
								+	"<div class='contents_card_intro'>"
								+		result[i].card_Intro
								+	"</div>"
								+"</div>"
							);
						}
					}else if(result[i].card_Type == "list"){
						div.append(
							"<div class='contents_card_div' value='"+result[i].card_NO+"'>"
							+	"<a class='card_img_btn' onclick='inserthashcard(this)' href='/card?NO="+result[i].card_NO+"'>"
							+		"<img src='/resources/upload/card/images/"+result[i].card_Reg_Date+"/"+result[i].card_NO+"/"+result[i].card_Img+"'></img>"
							+	"</a>"
							+	"<div class='contents_card_title'>"
							+		result[i].card_Title
							+	"</div>"
							+	"<div class='contents_card_intro'>"
							+		result[i].card_Intro
							+	"</div>"
							+	"<div class='contents_card_Choice' id='card_choice_"+result[i].card_NO+"'>"
							+	"</div>"
							+"</div>"
						);
						var str_id = "card_choice_"+result[i].card_NO;
						var no_arr = (result[i].card_Choice).split(",");
	
						for(var b=0; b<no_arr.length; b++){
							var choicedata = { "NO": no_arr[b] };
							$.ajax({
								type:"get",
								url:"admin/card/select/product",
								data:choicedata,
								async: false,
								success:function(result2){
									var price = cardReplacePrice(result2.pds_Price);
									var pds_image_name = result2.pds_Image.split(",");
									/*alert(pds_image_name[0]);*/
									$('#'+str_id).append(
										"<div class='choice_box'>"
										+	"<a class='choice_a_tag' id='choice_"+result2.pds_NO+"'>"
										+		"<span class='choice_img_cover'></span>"
										+		"<span>"
										+			"<img class='choice_contents_image' src='/resources/upload/products/images/"+result2.pds_Reg_Date+"/"+result2.pds_NO+"/"+pds_image_name[0]+"' />"
										+		"</span>"
										+		"<p class='choice_mini_name'>"+result2.pds_NM+"</p>"
										+		"<p class='choice_mini_price'>"+price+"원</p>"
										+	"</a>"
										+"</div>"
									);
									// 세일이 있을 경우 처리
									if(result2.pds_Sale != 0){
										var sale = cardReplacePrice(result2.pds_Sale);
										var percent = 100 - Math.floor( result2.pds_Sale / (result2.pds_Price / 100) );
										$('#choice_'+result2.pds_NO).children('p:nth-child(3)').after(
											'<p class="choice_mini_percent">'+percent+'%</p>'
										);
										$('#choice_'+result2.pds_NO).children('p:nth-child(4)').after(
											'<p class="choice_mini_sale">'+sale+'원</p>'
										);
										$('.choice_a_tag').children('p:nth-child(6)').css('text-decoration','line-through');
										$('.choice_a_tag').children('p:nth-child(6)').css('color', 'rgb(154, 154, 158)');
									}
								},error:function(jqXHR, textStatus, errorThrown){
									
								}
							})
						}
					}
					var str = $('#contents_home_box').children('div:nth-child(1)').css('height');
					div1_hei = Number(str.replace("px", ""));
				}else if(div2_hei <= div1_hei && div2_hei <= div3_hei){
					//두번째 div에 넣어준다.
					div = $('#contents_home_box').children('div:nth-child(2)');
					//카드 종류가 3종류 이기 때문에 조건문으로 나눔)
					if(result[i].card_Type == "image"){
						//카드 이미지형일 때는 이미지만 박스에 추가
						if(result[i].card_Url != null){
							div.append(
								"<div class='contents_card_div' value='"+result[i].card_NO+"'>"
								+	"<a class='card_img_btn' onclick='inserthashcard(this)' href='/view?NO="+result[i].card_Url+"'>"
								+		"<img src='/resources/upload/card/images/"+result[i].card_Reg_Date+"/"+result[i].card_NO+"/"+result[i].card_Img+"'></img>"
								+	"</a>"
								+"</div>"
							);
						}else{
							div.append(
								"<div class='contents_card_div' value='"+result[i].card_NO+"'>"
								+	"<a class='card_img_btn' onclick='inserthashcard(this)' href='/card?NO="+result[i].card_NO+"'>"
								+		"<img src='/resources/upload/card/images/"+result[i].card_Reg_Date+"/"+result[i].card_NO+"/"+result[i].card_Img+"'></img>"
								+	"</a>"
								+"</div>"
							);
						}
					}else if(result[i].card_Type == "intro"){
						if(result[i].card_Url != null){
							div.append(
								"<div class='contents_card_div' value='"+result[i].card_NO+"'>"
								+	"<a class='card_img_btn' onclick='inserthashcard(this)' href='/view?NO="+result[i].card_Url+"'>"
								+		"<img src='/resources/upload/card/images/"+result[i].card_Reg_Date+"/"+result[i].card_NO+"/"+result[i].card_Img+"'></img>"
								+	"</a>"
								+	"<div class='contents_card_title'>"
								+		result[i].card_Title
								+	"</div>"
								+	"<div class='contents_card_intro'>"
								+		result[i].card_Intro
								+	"</div>"
								+"</div>"
							);
						}else{
							div.append(
								"<div class='contents_card_div' value='"+result[i].card_NO+"'>"
								+	"<a class='card_img_btn' onclick='inserthashcard(this)' href='/card?NO="+result[i].card_NO+"'>"
								+		"<img src='/resources/upload/card/images/"+result[i].card_Reg_Date+"/"+result[i].card_NO+"/"+result[i].card_Img+"'></img>"
								+	"</a>"
								+	"<div class='contents_card_title'>"
								+		result[i].card_Title
								+	"</div>"
								+	"<div class='contents_card_intro'>"
								+		result[i].card_Intro
								+	"</div>"
								+"</div>"
							);
						}
					}else if(result[i].card_Type == "list"){
						div.append(
							"<div class='contents_card_div' value='"+result[i].card_NO+"'>"
							+	"<a class='card_img_btn' onclick='inserthashcard(this)' href='/card?NO="+result[i].card_NO+"'>"
							+		"<img src='/resources/upload/card/images/"+result[i].card_Reg_Date+"/"+result[i].card_NO+"/"+result[i].card_Img+"'></img>"
							+	"</a>"
							+	"<div class='contents_card_title'>"
							+		result[i].card_Title
							+	"</div>"
							+	"<div class='contents_card_intro'>"
							+		result[i].card_Intro
							+	"</div>"
							+	"<div class='contents_card_Choice' id='card_choice_"+result[i].card_NO+"'>"
							+	"</div>"
							+"</div>"
						);
						var str_id = "card_choice_"+result[i].card_NO;
						var no_arr = (result[i].card_Choice).split(",");
	
						for(var b=0; b<no_arr.length; b++){
							var choicedata = { "NO": no_arr[b] };
							$.ajax({
								type:"get",
								url:"admin/card/select/product",
								data:choicedata,
								async: false,
								success:function(result2){
									var price = cardReplacePrice(result2.pds_Price);
									var pds_image_name = result2.pds_Image.split(",");
									/*alert(pds_image_name[0]);*/
									$('#'+str_id).append(
										"<div class='choice_box'>"
										+	"<a class='choice_a_tag' id='choice_"+result2.pds_NO+"'>"
										+		"<span class='choice_img_cover'></span>"
										+		"<span>"
										+			"<img class='choice_contents_image' src='/resources/upload/products/images/"+result2.pds_Reg_Date+"/"+result2.pds_NO+"/"+pds_image_name[0]+"' />"
										+		"</span>"
										+		"<p class='choice_mini_name'>"+result2.pds_NM+"</p>"
										+		"<p class='choice_mini_price'>"+price+"원</p>"
										+	"</a>"
										+"</div>"
									);
									// 세일이 있을 경우 처리
									if(result2.pds_Sale != 0){
										var sale = cardReplacePrice(result2.pds_Sale);
										var percent = 100 - Math.floor( result2.pds_Sale / (result2.pds_Price / 100) );
										$('#choice_'+result2.pds_NO).children('p:nth-child(3)').after(
											'<p class="choice_mini_percent">'+percent+'%</p>'
										);
										$('#choice_'+result2.pds_NO).children('p:nth-child(4)').after(
											'<p class="choice_mini_sale">'+sale+'원</p>'
										);
										$('.choice_a_tag').children('p:nth-child(6)').css('text-decoration','line-through');
										$('.choice_a_tag').children('p:nth-child(6)').css('color', 'rgb(154, 154, 158)');
									}
								},error:function(jqXHR, textStatus, errorThrown){
									
								}
							})
						}
					}
					var str = $('#contents_home_box').children('div:nth-child(2)').css('height');
					div2_hei = Number(str.replace("px", ""));
				}else if(div3_hei <= div1_hei && div3_hei <= div2_hei){
					//세번째 div에 넣어준다.
					div = $('#contents_home_box').children('div:nth-child(3)');
					//카드 종류가 3종류 이기 때문에 조건문으로 나눔)
					if(result[i].card_Type == "image"){
						//카드 이미지형일 때는 이미지만 박스에 추가
						if(result[i].card_Url != null){
							div.append(
								"<div class='contents_card_div' value='"+result[i].card_NO+"'>"
								+	"<a class='card_img_btn' onclick='inserthashcard(this)' href='/view?NO="+result[i].card_Url+"'>"
								+		"<img src='/resources/upload/card/images/"+result[i].card_Reg_Date+"/"+result[i].card_NO+"/"+result[i].card_Img+"'></img>"
								+	"</a>"
								+"</div>"
							);
						}else{
							div.append(
								"<div class='contents_card_div' value='"+result[i].card_NO+"'>"
								+	"<a class='card_img_btn' onclick='inserthashcard(this)' href='/card?NO="+result[i].card_NO+"'>"
								+		"<img src='/resources/upload/card/images/"+result[i].card_Reg_Date+"/"+result[i].card_NO+"/"+result[i].card_Img+"'></img>"
								+	"</a>"
								+"</div>"
							);
						}
					}else if(result[i].card_Type == "intro"){
						if(result[i].card_Url != null){
							div.append(
								"<div class='contents_card_div' value='"+result[i].card_NO+"'>"
								+	"<a class='card_img_btn' onclick='inserthashcard(this)' href='/view?NO="+result[i].card_Url+"'>"
								+		"<img src='/resources/upload/card/images/"+result[i].card_Reg_Date+"/"+result[i].card_NO+"/"+result[i].card_Img+"'></img>"
								+	"</a>"
								+	"<div class='contents_card_title'>"
								+		result[i].card_Title
								+	"</div>"
								+	"<div class='contents_card_intro'>"
								+		result[i].card_Intro
								+	"</div>"
								+"</div>"
							);
						}else{
							div.append(
								"<div class='contents_card_div' value='"+result[i].card_NO+"'>"
								+	"<a class='card_img_btn' onclick='inserthashcard(this)' href='/card?NO="+result[i].card_NO+"'>"
								+		"<img src='/resources/upload/card/images/"+result[i].card_Reg_Date+"/"+result[i].card_NO+"/"+result[i].card_Img+"'></img>"
								+	"</a>"
								+	"<div class='contents_card_title'>"
								+		result[i].card_Title
								+	"</div>"
								+	"<div class='contents_card_intro'>"
								+		result[i].card_Intro
								+	"</div>"
								+"</div>"
							);
						}
					}else if(result[i].card_Type == "list"){
						div.append(
							"<div class='contents_card_div' value='"+result[i].card_NO+"'>"
							+	"<a class='card_img_btn' onclick='inserthashcard(this)' href='/card?NO="+result[i].card_NO+"'>"
							+		"<img src='/resources/upload/card/images/"+result[i].card_Reg_Date+"/"+result[i].card_NO+"/"+result[i].card_Img+"'></img>"
							+	"</a>"
							+	"<div class='contents_card_title'>"
							+		result[i].card_Title
							+	"</div>"
							+	"<div class='contents_card_intro'>"
							+		result[i].card_Intro
							+	"</div>"
							+	"<div class='contents_card_Choice' id='card_choice_"+result[i].card_NO+"'>"
							+	"</div>"
							+"</div>"
						);
						var str_id = "card_choice_"+result[i].card_NO;
						var no_arr = (result[i].card_Choice).split(",");
	
						for(var b=0; b<no_arr.length; b++){
							var choicedata = { "NO": no_arr[b] };
							$.ajax({
								type:"get",
								url:"admin/card/select/product",
								data:choicedata,
								async: false,
								success:function(result2){
									var price = cardReplacePrice(result2.pds_Price);
									var pds_image_name = result2.pds_Image.split(",");
									/*alert(pds_image_name[0]);*/
									$('#'+str_id).append(
										"<div class='choice_box'>"
										+	"<a class='choice_a_tag' id='choice_"+result2.pds_NO+"'>"
										+		"<span class='choice_img_cover'></span>"
										+		"<span>"
										+			"<img class='choice_contents_image' src='/resources/upload/products/images/"+result2.pds_Reg_Date+"/"+result2.pds_NO+"/"+pds_image_name[0]+"' />"
										+		"</span>"
										+		"<p class='choice_mini_name'>"+result2.pds_NM+"</p>"
										+		"<p class='choice_mini_price'>"+price+"원</p>"
										+	"</a>"
										+"</div>"
									);
									// 세일이 있을 경우 처리
									if(result2.pds_Sale != 0){
										var sale = cardReplacePrice(result2.pds_Sale);
										var percent = 100 - Math.floor( result2.pds_Sale / (result2.pds_Price / 100) );
										$('#choice_'+result2.pds_NO).children('p:nth-child(3)').after(
											'<p class="choice_mini_percent">'+percent+'%</p>'
										);
										$('#choice_'+result2.pds_NO).children('p:nth-child(4)').after(
											'<p class="choice_mini_sale">'+sale+'원</p>'
										);
										$('.choice_a_tag').children('p:nth-child(6)').css('text-decoration','line-through');
										$('.choice_a_tag').children('p:nth-child(6)').css('color', 'rgb(154, 154, 158)');
									}
								},error:function(jqXHR, textStatus, errorThrown){
									
								}
							})
						}
					}
					var str = $('#contents_home_box').children('div:nth-child(3)').css('height');
					div3_hei = Number(str.replace("px", ""));
				}
			}
		},error:function(jqXHR, textStatus, errorThrown){
			
		}
	});
}

//신규 목록의 뷰페이지에서 뒤로가기 했을 때
function selecthashnew(){
	alldata = { "count" : sessionStorage.getItem("new_count") };
	$.ajax({
		type:"get",
		url:"/home/hash/new",
		data:alldata,
		success:function(result){
			//제품을 최신 순으로 조회
			for(var i=0; i<result.length; i++){
				var price = homeReplacePrice(result[i].pds_Price);
				var pds_image_name = result[i].pds_Image.split(",");
				/*alert(pds_image_name[0]);*/
				$('#contents_new_box').append(
					"<div class='contents_new_div'>"
					+"<a class='new_a_tag' id='new_"+result[i].pds_NO+"' name='"+result[i].pds_NO+"' onclick='inserthash(this)'>"
					+	"<span class='img_cover'></span>"
					+	"<span>"
					+		"<img class='contents_image' src='/resources/upload/products/images/"+result[i].pds_Reg_Date+"/"+result[i].pds_NO+"/"+pds_image_name[0]+"' />"
					+	"</span>"
					+	"<p class='mini_name'>"+result[i].pds_NM+"</p>"
					+	"<p class='mini_price'>"+price+"원</p>"
					+"</a>"
					+"</div>"
				);
				// 세일이 있을 경우 처리
				if(result[i].pds_Sale != 0){
					var sale = homeReplacePrice(result[i].pds_Sale);
					var percent = 100 - Math.floor( result[i].pds_Sale / (result[i].pds_Price / 100) );
					$('#new_'+result[i].pds_NO).children('p:nth-child(3)').after(
						'<p class="mini_percent">'+percent+'%</p>'
					);
					$('#new_'+result[i].pds_NO).children('p:nth-child(4)').after(
						'<p class="mini_sale">'+sale+'원</p>'
					);
					$('.new_a_tag').children('p:nth-child(6)').css('text-decoration','line-through');
					$('.new_a_tag').children('p:nth-child(6)').css('color', 'rgb(154, 154, 158)');
				}
				/*alert(result[i].pds_Reg_Date);*/
			}
		},error:function(jqXHR, textStatus, errorThrown){
			
		}
	})
}
//인기 목록의 뷰페이지에서 뒤로가기 했을 때
function selecthashvogue(){
	alldata = { "count" : sessionStorage.getItem("vogue_count") };
	$.ajax({
		type:"get",
		url:"/home/hash/vogue",
		data:alldata,
		success:function(result){
			//뒤로가기로 이전에 불러온 콘텐츠 만큼만 가져오기 때문에 세션 카운터를 올리지 않는다.
			//상품 정보만 가져와서 넣기
			for(var i=0; i<result.length; i++){
				var pds_image_name = result[i].pds_Vogue_Image;
				/*alert(pds_image_name[0]);*/
				$('#contents_vogue_box').append(
					"<div class='contents_vogue_div'>"
					+"<a id='vogue_"+result[i].pds_NO+"' name='"+result[i].pds_NO+"' onclick='inserthash(this)'>"
					+	"<span>"
					+		"<img class='contents_image' src='/resources/upload/products/vogue/"+result[i].pds_Reg_Date+"/"+result[i].pds_NO+"/"+pds_image_name+"' />"
					+	"</span>"
					+"</a>"
					+"</div>"
				);
				/*alert(result[i].pds_Reg_Date);*/
			}
		},error:function(jqXHR, textStatus, errorThrown){
			
		}
	})
}
//세일 목록의 뷰페이지에서 뒤로가기 했을 때
function selecthashsale(){
	saledata = { "count" : sessionStorage.getItem("sale_count") };
	$.ajax({
		type:"get",
		url:"/home/hash/sale",
		data:saledata,
		success:function(result){
			//뒤로가기로 이전에 불러온 콘텐츠 만큼만 가져오기 때문에 세션 카운터를 올리지 않는다.
			//상품 정보만 가져와서 넣기
			for(var i=0; i<result.length; i++){
				var price = homeReplacePrice(result[i].pds_Price);
				var pds_image_name = result[i].pds_Image.split(",");
				var sale = homeReplacePrice(result[i].pds_Sale);
				var percent = 100 - Math.floor( result[i].pds_Sale / (result[i].pds_Price / 100) );
				
				/*alert(pds_image_name[0]);*/
				$('#contents_sale_box').append(
					"<div class='contents_sale_div'>"
					+"<a id='sale_"+result[i].pds_NO+"' name='"+result[i].pds_NO+"' onclick='inserthash(this)'>"
					+	"<span class='img_cover'></span>"
					+	"<span>"
					+		"<img class='contents_image' src='/resources/upload/products/images/"+result[i].pds_Reg_Date+"/"+result[i].pds_NO+"/"+pds_image_name[0]+"' />"
					+	"</span>"
					+	"<p class='mini_name'>"+result[i].pds_NM+"</p>"
					+	"<p class='mini_percent'>"+percent+"%</p>"
					+	"<p class='mini_sale'>"+sale+"원</p>"
					+	"<p class='mini_price' style='text-decoration:line-through; color:rgb(154, 154, 158);'>"+price+"원</p>"
					+"</a>"
					+"</div>"
				);
				/*alert(result[i].pds_Reg_Date);*/
			}
		},error:function(jqXHR, textStatus, errorThrown){
			
		}
	})
}
//전체 목록의 뷰페이지에서 뒤로가기 했을 때
function selecthashall(){
		var arr = sessionStorage.getItem("all_select").split(",");
		var charater = arr[1];
		var option = arr[0];
		
		$('#all_select_option_box').children('button[value='+option+']').siblings('button').removeAttr('disabled');
		$('#all_select_option_box').children('button[value='+option+']').attr('disabled', 'disabled');
		$('#all_select_charater_box').children('button[value='+charater+']').siblings('button').removeAttr('disabled');
		$('#all_select_charater_box').children('button[value='+charater+']').attr('disabled', 'disabled');
		$('#option_btn').html($('#all_select_option_box').children('button[value='+option+']').html());
		$('#all_select_option').attr("value", $('#all_select_option_box').children('button[value='+option+']').attr("value"));
		$('#charater_btn').html($('#all_select_charater_box').children('button[value='+charater+']').children('span').html());
		$('#all_select_charater').attr("value", $('#all_select_charater_box').children('button[value='+charater+']').attr("value"));
		/*console.log(charater+option);*/
		alldata = { "count" : sessionStorage.getItem("all_count"), "charater" : charater, "option" : option };
		$.ajax({
			type:"get",
			url:"/home/hash/all",
			data:alldata,
			success:function(result){
				serchcount(alldata);
				//제품을 조건별 조회
				for(var i=0; i<result.length; i++){
					var price = homeReplacePrice(result[i].pds_Price);
					var pds_image_name = result[i].pds_Image.split(",");
					/*alert(pds_image_name[0]);*/
					$('#all_select_box').append(
						"<div class='contents_all_div'>"
						+"<a class='all_a_tag' id='all_"+result[i].pds_NO+"' name='"+result[i].pds_NO+"' onclick='inserthash(this)'>"
						+	"<span class='img_cover'></span>"
						+	"<span>"
						+		"<img class='contents_image' src='/resources/upload/products/images/"+result[i].pds_Reg_Date+"/"+result[i].pds_NO+"/"+pds_image_name[0]+"' />"
						+	"</span>"
						+	"<p class='mini_name'>"+result[i].pds_NM+"</p>"
						+	"<p class='mini_price'>"+price+"원</p>"
						+"</a>"
						+"</div>"
					);
					// 세일이 있을 경우 처리
					if(result[i].pds_Sale != 0){
						var sale = homeReplacePrice(result[i].pds_Sale);
						var percent = 100 - Math.floor( result[i].pds_Sale / (result[i].pds_Price / 100) );
						$('#all_'+result[i].pds_NO).children('p:nth-child(3)').after(
							'<p class="mini_percent">'+percent+'%</p>'
						);
						$('#all_'+result[i].pds_NO).children('p:nth-child(4)').after(
							'<p class="mini_sale">'+sale+'원</p>'
						);
						$('.all_a_tag').children('p:nth-child(6)').css('text-decoration','line-through');
						$('.all_a_tag').children('p:nth-child(6)').css('color', 'rgb(154, 154, 158)');
					}
					/*alert(result[i].pds_Reg_Date);*/
				}
			},error:function(jqXHR, textStatus, errorThrown){
				
			}
		});
	}



function productshome(here){
	btneffect(here);
	$('#contents_home_box').css('height','auto');
	$('#top_contents_box').css('left','0px');
	$('#home_contents_box').css('left','0px');
	$( 'html, body' ).stop().animate( { scrollTop : sessionStorage.getItem("home_scroll") })
}
function productsnew(here){
	btneffect(here);
	$('#contents_new_box').css('height','auto');
	$('#top_contents_box').css('left','-1080px');
	$('#home_contents_box').css('left','-1080px');
	$( 'html, body' ).stop().animate( { scrollTop : sessionStorage.getItem("new_scroll") })
}
function productsvogue(here){
	btneffect(here);
	$('#contents_vogue_box').css('height','auto');
	$('#top_contents_box').css('left','-2160px');
	$('#home_contents_box').css('left','-2160px');
	$( 'html, body' ).stop().animate( { scrollTop : sessionStorage.getItem("vogue_scroll") })
}
function productssale(here){
	btneffect(here);
	$('#contents_sale_box').css('height','auto');
	$('#top_contents_box').css('left','-3240px');
	$('#home_contents_box').css('left','-3240px');
	$( 'html, body' ).stop().animate( { scrollTop : sessionStorage.getItem("sale_scroll") })
}
function productsall(here){
	btneffect(here);
	$('#contents_all_box').css('height','auto');
	$('#top_contents_box').css('left','-4320px');
	$('#home_contents_box').css('left','-4320px');
	$( 'html, body' ).stop().animate( { scrollTop : sessionStorage.getItem("all_scroll") })
}



//미니메뉴 버튼 클릭시 이펙트 메뉴 공통
function btneffect(here){
	$('#mini_bar').children('button').css('border-bottom', "none");
	$(here).css('border-bottom', "2px solid black");
	$('.mini_contents_box').css('height','700px');
}


function scrolleffect(standard){
    timeout = setTimeout(function(){ //다시 휠 이벤트 발생  0.1초후
		var scrollPosition = window.scrollY || document.documentElement.scrollTop;
		var percent = Math.floor( ($(window).scrollTop() / ($(document).height() - $(window).height())) * 100 );
		var scroll = Math.floor( $(window).scrollTop() );	//현재 스크롤 위치 기록
		//console.log(percent);
		if($('#home_contents_box').css('left')=='0px'){
			sessionStorage.setItem("home_scroll", scroll)
			if( percent >= standard){
				selectcard();
			}
		}else if($('#home_contents_box').css('left')=='-1080px'){
			sessionStorage.setItem("new_scroll", scroll);
			if( percent >= standard){
				selectnew();
			}
		}else if($('#home_contents_box').css('left')=='-2160px'){
			sessionStorage.setItem("vogue_scroll", scroll);
			if( percent >= standard){
				selectvogue();
			}
		}else if($('#home_contents_box').css('left')=='-3240px'){
			sessionStorage.setItem("sale_scroll", scroll);
			if( percent >= standard){
				selectsale();
			}
		}else if($('#home_contents_box').css('left')=='-4320px'){
			sessionStorage.setItem("all_scroll", scroll);
			if( percent >= standard){
				allscroll();	//불필요한 변수 처리가 있어 전체 메뉴만 스크롤 대응 함수를 따로 만듬
			}
		}	
    }, 200);
};

function homeReplacePrice(here){
	var str = here.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	return str;
}


function openoptionbox(){
	var status = $('#all_select_option_box').css('display');
	$('#all_select_charater_box').css('display','none');
	if(status=='block'){
		$('#all_select_option_box').css('display','none');
	}else{
		$('#all_select_option_box').css('display','block');
	}
}
function opencharaterbox(){
	var status = $('#all_select_charater_box').css('display');
	$('#all_select_option_box').css('display','none');
	if(status=='block'){
		$('#all_select_charater_box').css('display','none');
	}else{
		$('#all_select_charater_box').css('display','block');
	}
	
}


function serchcount(){
	var arr = sessionStorage.getItem("all_select").split(",");
	var charater = arr[1];
	var option = arr[0];
	/*console.log(charater+option);*/
	alldata = { "charater" : charater, "option" : option };
	$.ajax({
		type:"get",
		url:"home/all/count",
		data:alldata,
		success:function(result){
			$('#serch_count').html(result);
		},error:function(jqXHR, textStatus, errorThrown){
		
		}
	})
}



function cardReplacePrice(here){
	var str = here.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	return str;
}