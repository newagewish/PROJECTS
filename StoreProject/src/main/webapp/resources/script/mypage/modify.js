/**
 * 
 */
$(document).ready(function(){
	var alldata = {"ac_ID":$('#modify_content_email').val()}
	$.ajax({
		type:"GET",
		url:"ajax/provision",
		data:alldata,
		success:function(result){
			if(result==true){
				$('#modify_content_check_provision_input').attr("checked", result);
				$('#modify_content_check_provision_img').css("background","url('/resources/img/mypage/ico_checked_on.png')")
				$('#modify_content_check_provision_img').css("background-size","cover");
			}else{
				$('#modify_content_check_provision_input').attr("checked", result);
			}
		},error:function(jqXHR, textStatus, errorThrown){
			
		}
	})
});


/* 셀렉트(연도, 월, 일)에서 다른 셀렉트로 선택시  ul 닫기 */
function closeSelectBox(){
	$('.modify_content_script_class_ul').css('display', 'none');
}
/* 연도 선택 관련 스크립트*/
function crateaccountSelectYear(){
	$('#modify_content_year_ul').empty();
	var today = new Date();
	var maxyear = today.getFullYear()-14;;
	for(var a=maxyear; a>=1930; a--){
		$('#modify_content_year_ul').append(
				'<li onclick="selectYear(this)"><a>'+a+'</a></li>'
		);
	}
}
function openSelectYear(){
	closeSelectBox();
	crateaccountSelectYear();
	var state = $('#modify_content_year_ul').css('display');
	if(state=="none"){
		$('#modify_content_year_ul').css('display', 'block');
	}
	else{
		$('#modify_content_year_ul').css('display', 'none');
	}
	
}
function selectYear(here){
	var year = $(here).children('a').text();
	$('#modify_content_input_year').val(year);
	$('#modify_content_year_ul').css('display', 'none');
	/* 연도를 새로 선택 시 월 일 초기화 */
	$('#modify_content_input_month').val("월");
	$('#modify_content_input_day').val("일");
}
function closeSelectYear(){
	$('#modify_content_year_ul').css('display', 'none');
}

/* 월 선택 관련 스크립트 */
function crateaccountSelectMonth(value){
	$('#modify_content_month_ul').empty();
	if(value==null){
		for(var a=1; a<=12; a++){
			$('#modify_content_month_ul').append(
					'<li onclick="selectMonth(this)"><a>'+a+'</a></li>'
			);
		}
	}
	else if(value==14){
		var month = new Date().getMonth()+1;
		for(var a=1; a<=month; a++){
			$('#modify_content_month_ul').append(
					'<li onclick="selectMonth(this)"><a>'+a+'</a></li>'
			);
		}
	}
	
}
function openSelectMonth(){
	closeSelectBox();
	var year = $('#modify_content_input_year').val();
	var maxyear = (new Date().getFullYear()-14);
	/* 연도를 선택하지 않았을 경우 */
	if(year=="연도"){
		alert("연도를 선택해주세요.")
		return;
	}
	/* 선택한 연도가 최대 14세 일 경우 연도에 맞는 월 처리 */
	else if(year==maxyear){
		crateaccountSelectMonth(14);
		var state = $('#modify_content_month_ul').css('display');
		if(state=="none"){
			$('#modify_content_month_ul').css('display', 'block');
		}
		else{
			$('#modify_content_month_ul').css('display', 'none');
		}
	}
	/* 연도를 올바르게 선택 했을 경우 월 처리 */
	else{
		crateaccountSelectMonth(null);
		var state = $('#modify_content_month_ul').css('display');
		if(state=="none"){
			$('#modify_content_month_ul').css('display', 'block');
		}
		else{
			$('#modify_content_month_ul').css('display', 'none');
		}
	}
}
function selectMonth(here){
	var month = $(here).children('a').text();
	$('#modify_content_input_month').val(month);
	$('#modify_content_month_ul').css('display', 'none');
}
function closeSelectMonth(){
	$('#modify_content_month_ul').css('display', 'none');
}


/* 일 선택 관련 스크립트 */
function crateaccountSelectDay(){
	$('#modify_content_day_ul').empty();
	var year = $('#modify_content_input_year').val();
	var month = $('#modify_content_input_month').val();
	/* 윤년 윤달 계산 */
	if( year%400 == 0 || (year%4 == 0 && year%100 != 0) ){
		switch(month){
			case "1" : case "3" : case "5" : case "7" : case "8" : case "10" : case "12" : 
				for(var a=1; a<=31; a++){
					$('#modify_content_day_ul').append(
							'<li onclick="selectDay(this)"><a>'+a+'</a></li>'
					);
				};
				break;
			case "4" : case "6" : case "9" : case "11" : 
				for(var a=1; a<=30; a++){
					$('#modify_content_day_ul').append(
							'<li onclick="selectDay(this)"><a>'+a+'</a></li>'
					);
				};
				break;
			case "2" : 
				for(var a=1; a<=29; a++){
					$('#modify_content_day_ul').append(
							'<li onclick="selectDay(this)"><a>'+a+'</a></li>'
					);
				};
				break;
		}
	}
	else{
		switch(month){
		case "1" : case "3" : case "5" : case "7" : case "8" : case "10" : case "12" : 
			for(var a=1; a<=31; a++){
				$('#modify_content_day_ul').append(
						'<li onclick="selectDay(this)"><a>'+a+'</a></li>'
				);
			};
			break;
		case "4" : case "6" : case "9" : case "11" : 
			for(var a=1; a<=30; a++){
				$('#modify_content_day_ul').append(
						'<li onclick="selectDay(this)"><a>'+a+'</a></li>'
				);
			};
			break;
		case "2" : 
			for(var a=1; a<=28; a++){
				$('#modify_content_day_ul').append(
						'<li onclick="selectDay(this)"><a>'+a+'</a></li>'
				);
			};
			break;
	}
	}
}
function openSelectDay(){
	closeSelectBox();
	var year = $('#modify_content_input_year').val();
	var month = $('#modify_content_input_month').val();
	if(year=="연도" || month=="월"){
		alert("연도와 월을 선택해주세요");
		return;
	}
	else{
		crateaccountSelectDay();
		var state = $('#modify_content_day_ul').css('display');
		if(state=="none"){
			$('#modify_content_day_ul').css('display', 'block');
		}
		else{
			$('#modify_content_day_ul').css('display', 'none');
		}
	}
}
function selectDay(here){
	var day = $(here).children('a').text();
	$('#modify_content_input_day').val(day);
	$('#modify_content_day_ul').css('display', 'none');
}
function closeSelectDay(){
	$('#modify_content_day_ul').css('display', 'none');
}


/* 성별 선택 관련 스크립트 */
function radiogenderclick(here){
	$('.modify_content_span_select_circle_on').attr('class','modify_content_span_select_circle_off');
	$(here).children('span:nth-child(1)').attr('class','modify_content_span_select_circle_on');
	
}
/* 이벤트 마케팅 활용 동의 체크박스 스크립트 */
function provisioncheck(here){
	if($('#modify_content_check_provision_input').is(":checked")){
		$('#modify_content_check_provision_img').css("background", "url('/resources/img/mypage/ico_checked_off.png')");
		$('#modify_content_check_provision_img').css("background-size", "cover");
	}else{
		$('#modify_content_check_provision_img').css("background", "url('/resources/img/mypage/ico_checked_on.png')");
		$('#modify_content_check_provision_img').css("background-size", "cover");
	}
	
}

/* 취소 버튼 스크립트 */
function modifycancelbtn(){
	/*location.replace();*/
}

/* 저장 버튼 스크립트 */
function modifysavebtn(){
		//////////////////////////////
		var ac_ID, ac_PW, ac_NNM, ac_Year, ac_Month, ac_Day, ac_Gender = null;
		var agreePrivacy = null;
		ac_NNM = $('#modify_content_nickname').val();
		ac_ID = $('#modify_content_email').val();
		ac_PW = $('#modify_content_password').val();
		/* 이메일 패스워드 일치 여부 */
		var simpledata = {"ac_ID" : ac_ID, "ac_PW" : ac_PW};
		$.ajax({
			type:"POST",
			url :"ajax/password",
			data : simpledata,
			headers: {"X-CSRF-TOKEN": $("input[name='_csrf']").val()},
			success : function(result){
				switch(result){
					case 1:
						/* 비밀번호 입력이 올바를 때 */
						/* 생년 월 일 입력 여부 */
						var yearcheck = $('#modify_content_input_year').val();
						var monthcheck = $('#modify_content_input_month').val();
						var daycheck = $('#modify_content_input_day').val();
						/* 생년 월 일 어느 것 하나라도 미 입력시 null 값 부여 */
						if((yearcheck=="연도") || (monthcheck=="월") || (daycheck=="일")){
							ac_Year = null;
							ac_Month = null;
							ac_Day = null;
						}else{
							ac_Year = yearcheck;
							ac_Month = monthcheck;
							ac_Day = daycheck;
						}
						/* 성별 체크 */
						var gendercheck = $('.modify_content_gender_input[name="ac_Gender"]:checked').val();
						if(gendercheck=="none"){
							ac_Gender = null;
						}else{
							ac_Gender=gendercheck;
						}
						

						var ac_Uses_Agree = $('input:checkbox[id="modify_content_check_provision_input"]').is(":checked");
						var alldata = {"ac_ID" : ac_ID, "ac_PW" : ac_PW, "ac_NNM" : ac_NNM, "ac_Year" : ac_Year, "ac_Month" : ac_Month, "ac_Day" : ac_Day, "ac_Gender" : ac_Gender, "ac_Uses_Agree" : ac_Uses_Agree};
						$.ajax({
							type:"POST",
							url :"ajax/updateinformation",
							data : alldata,
							headers: {"X-CSRF-TOKEN": $("input[name='_csrf']").val()},
							success : function(result){
								switch(result){
									case "0":
										alert("개인정보 저장 완료.")
										$('#logoutform').submit();
										/*window.location.href ='/';*/
										break;
									case "1":
										alert("개인정보 저장 오류 발생, 새로고침 후 재시도 해주세요.")
										break;
									case "6":
										alert("닉네임은 2~20자리로 지정해주세요.")
										break;
								}
							},
							error: function(jqXHR, textStatus, errorThrown) { 
								alert("예기치 못한 오류로 저장하지 못했습니다. 다시 시도해주세요.");
							}
						});
						break;
					case 2:
						/* 비밀번호 입력이 틀렸을 때 */
						alert("비밀번호를 제대로 입력해주세요.");
						break;
				}
			},
			error: function(jqXHR, textStatus, errorThrown) { 
				alert("예기치 못한 오류로 비밀번호를 조회하지 못했습니다. 다시 시도해주세요.");
			}
		});
}

