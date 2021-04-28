/**
 * 
 */
window.onload = function(){
	/* 세션 스토리지를 사용하는 회원가입 창에서 새로고침 등을 이어 갔을 때 이전 인증 세션 값이 남아있는걸 방지 */
	sessionStorage.clear();
	
	/* 회원가입 이메일 입력 포커스  */
	$('#createaccount_information_email').focus(function(){
		$('#createaccount_information_email_label').css("display",'none');
		$('#createaccount_information_email').css('border-bottom','2px solid #000000');
	});
	$('#createaccount_information_email').blur(function(){
		if($('#createaccount_information_email').val()!=""){
			$('#createaccount_information_email_label').css("display",'none');
			$('#createaccount_information_email').css('border-bottom','2px solid #ebebeb');
		}else{
			$('#createaccount_information_email_label').css("display",'block');
			$('#createaccount_information_email').css('border-bottom','2px solid #ebebeb');
		}
	});
	/* 회원가입 인증번호 확인 포커스  */
	$('#createaccount_information_certifyemail').focus(function(){
		$('#createaccount_information_certifyemail_label').css("display",'none');
		$('#createaccount_information_certifyemail').css('border-bottom','2px solid #000000');
	});
	$('#createaccount_information_certifyemail').blur(function(){
		if($('#createaccount_information_certifyemail').val()!=""){
			$('#createaccount_information_certifyemail_label').css("display",'none');
			$('#createaccount_information_certifyemail').css('border-bottom','2px solid #ebebeb');
		}else{
			$('#createaccount_information_certifyemail_label').css("display",'block');
			$('#createaccount_information_certifyemail').css('border-bottom','2px solid #ebebeb');
		}
	});
	/* 회원가입 비밀번호1 입력 포커스 */
	$('#createaccount_information_password1').focus(function(){
		$('#createaccount_information_password1_label').css("display",'none');
		$('#createaccount_information_password1').css('border-bottom','2px solid #000000');
	});
	$('#createaccount_information_password1').blur(function(){
		if($('#createaccount_information_password1').val()!=""){
			$('#createaccount_information_password1_label').css("display",'none');
			$('#createaccount_information_password1').css('border-bottom','2px solid #ebebeb');
		}else{
			$('#createaccount_information_password1_label').css("display",'block');
			$('#createaccount_information_password1').css('border-bottom','2px solid #ebebeb');
		}
	});
	/* 회원가입 비밀번호2 입력 포커스 */
	$('#createaccount_information_password2').focus(function(){
		$('#createaccount_information_password2_label').css("display",'none');
		$('#createaccount_information_password2').css('border-bottom','2px solid #000000');
	});
	$('#createaccount_information_password2').blur(function(){
		if($('#createaccount_information_password2').val()!=""){
			$('#createaccount_information_password2_label').css("display",'none');
			$('#createaccount_information_password2').css('border-bottom','2px solid #ebebeb');
		}else{
			$('#createaccount_information_password2_label').css("display",'block');
			$('#createaccount_information_password2').css('border-bottom','2px solid #ebebeb');
		}
	});
	/* 닉네임 입력 포커스 */
	$('#createaccount_information_nickname').focus(function(){
		$('#createaccount_information_nickname_label').css("display",'none');
		$('#createaccount_information_nickname').css('border-bottom','2px solid #000000');
	});
	$('#createaccount_information_nickname').blur(function(){
		if($('#createaccount_information_nickname').val()!=""){
			$('#createaccount_information_nickname_label').css("display",'none');
			$('#createaccount_information_nickname').css('border-bottom','2px solid #ebebeb');
		}else{
			$('#createaccount_information_nickname_label').css("display",'block');
			$('#createaccount_information_nickname').css('border-bottom','2px solid #ebebeb');
		}
	});
	/* input 박스 변경시 */
	$("#createaccount_information_email").on("propertychange change keyup paste input", function() {		
		if($('#createaccount_information_email').val()!=""){
			$('#createaccount_information_email_xbtn').css("display",'block');
		}else{
			$('#createaccount_information_email_xbtn').css("display",'none');
		}
	});
	$("#createaccount_information_certifyemail").on("propertychange change keyup paste input", function() {
		if($('#createaccount_information_certifyemail').val()!=""){
			$('#createaccount_information_certifyemail_xbtn').css("display",'block');
		}else{
			$('#createaccount_information_certifyemail_xbtn').css("display",'none');
		}
	});
	$("#createaccount_information_password1").on("propertychange change keyup paste input", function() {
		if($('#createaccount_information_password1').val()!=""){
			$('#createaccount_information_password1_xbtn').css("display",'block');
		}else{
			$('#createaccount_information_password1_xbtn').css("display",'none');
		}
	});
	$("#createaccount_information_password2").on("propertychange change keyup paste input", function() {
		if($('#createaccount_information_password2').val()!=""){
			$('#createaccount_information_password2_xbtn').css("display",'block');
		}else{
			$('#createaccount_information_password2_xbtn').css("display",'none');
		}
	});
	$("#createaccount_information_nickname").on("propertychange change keyup paste input", function() {
		if($('#createaccount_information_nickname').val()!=""){
			$('#createaccount_information_nickname_xbtn').css("display",'block');
			$('#createaccount_information_nickname_span').text($('#createaccount_information_nickname').val().length+"/20");
		}else{
			$('#createaccount_information_nickname_xbtn').css("display",'none');
		}
	});
}

$(document).ready(function(){
	/*스프링 시큐리티 ajax post 처리를 위해 csrf 토큰 전송 */
	securitytoken();
});
/* 스프링 시큐리티 csrf 관련 스크립트 */
function securitytoken(){

}
/* X버튼 클릭시 input 초기화 */
function deleteinformationinput(here){
	$(here).prev().val("");
	$(here).prev().prev().css('display','block');
	$(here).css('display','none');
}
/* 이메일 인증 발송 관련 스크립트 */
function sendcertifyemail(){
	$('#createaccount_information_email_sendbtn').css('cursor', 'progress')
	$('#createaccount_information_email_xbtn').css('display','none');

	var email = $('#createaccount_information_email').val();
	var alldata = {"email" : email};
	$.ajax({
		type:"GET",
		url :"ajax/certifyemail",
		data : alldata,
		success : function(result){
			switch(result){
				case 1:
					$('#createaccount_information_email').attr('readonly',true);
					$('#createaccount_information_email_sendbtn').css('display','none');
					$('#createaccount_information_certifyemail_box').css('display', 'block');
					alert("이메일로 인증번호가 전송되었습니다.");
					break;
				case 2:
					alert("이메일 주소가 잘못 되었습니다.");
					break;
				case 3:
					alert("이미 가입된 이메일 입니다. 새로운 이메일로 시도 해주세요.");
					break;
				default :
					alert("예기치 못한 오류 발생으로 재시도 해주세요.");
					break;
			}
			$('#createaccount_information_email_sendbtn').css("cursor","");
		},
		error: function(jqXHR, textStatus, errorThrown) { 
			alert("예기치 못한 오류 발생으로 재시도 해주세요."); 
		}
	})
}
/* 인증번호 확인 버튼 관련 스크립트 */
function certifyemailcheck(){
	/* 
	 * 인증번호 확인에서 이메일 주소를 다시 가져 가는 이유는
	 * 이메일 input box를 무단 수정 시 잘못 된 값이 인증 되지 않도록 하기 위해서
	 *  */
	var email = $('#createaccount_information_email').val();
	var certifynum = $('#createaccount_information_certifyemail').val();
	var alldata = {"email" : email, "certifynum" : certifynum};
	$.ajax({
		type:"GET",
		url :"ajax/certifyemailcheck",
		data : alldata,
		success : function(result){
			switch(result){
				case 1:
					alert("인증 되었습니다.");
					$('#createaccount_information_certifyemail').val("");
					$('#createaccount_information_email_vspan').css('display','block');
					$('#createaccount_information_certifyemail_box').css('display','none');
					/* 인증 된 사실 체크를 위해 세션스토리지에 값을 넣어준다. */
					sessionStorage.setItem("checkemail", "1");
					break;
				case 2:
					alert("인증 번호가 일치하지 않습니다.");
					break;
				case 3:
					alert("이메일이 일치 하지 않습니다.");
					alert("이메일을 임의로 변경하셨을 경우 새로고침 후 재시도 해주세요.");
					break;
				case 4:
					alert("예기치 못한 오류 발생 새로고침 후 재시도 해주세요.");
					break;
				default:
					break;
			}
		},
		error: function(jqXHR, textStatus, errorThrown) { 
			alert("예기치 못한 오류로 인증하지 못했습니다. 다시 시도해주세요.");
		}
	});
}
/* 셀렉트(연도, 월, 일)에서 다른 셀렉트로 선택시  ul 닫기 */
function closeSelectBox(){
	$('.information_script_class_ul').css('display', 'none');
}
/* 연도 선택 관련 스크립트*/
function crateaccountSelectYear(){
	$('#createaccount_information_year_ul').empty();
	var today = new Date();
	var maxyear = today.getFullYear()-14;;
	for(var a=maxyear; a>=1930; a--){
		$('#createaccount_information_year_ul').append(
				'<li onclick="selectYear(this)"><a>'+a+'</a></li>'
		);
	}
}
function openSelectYear(){
	closeSelectBox();
	crateaccountSelectYear();
	var state = $('#createaccount_information_year_ul').css('display');
	if(state=="none"){
		$('#createaccount_information_year_ul').css('display', 'block');
	}
	else{
		$('#createaccount_information_year_ul').css('display', 'none');
	}
	
}
function selectYear(here){
	var year = $(here).children('a').text();
	$('#createaccount_information_btn_year').val(year);
	$('#createaccount_information_input_year').html(year);
	$('#createaccount_information_year_ul').css('display', 'none');
	/* 연도를 새로 선택 시 월 일 초기화 */
	$('#createaccount_information_input_month').val("월");
	$('#createaccount_information_input_day').val("일");
}
function closeSelectYear(){
	$('#createaccount_information_year_ul').css('display', 'none');
}

/* 월 선택 관련 스크립트 */
function crateaccountSelectMonth(value){
	$('#createaccount_information_month_ul').empty();
	if(value==null){
		for(var a=1; a<=12; a++){
			$('#createaccount_information_month_ul').append(
					'<li onclick="selectMonth(this)"><a>'+a+'</a></li>'
			);
		}
	}
	else if(value==14){
		var month = new Date().getMonth()+1;
		for(var a=1; a<=month; a++){
			$('#createaccount_information_month_ul').append(
					'<li onclick="selectMonth(this)"><a>'+a+'</a></li>'
			);
		}
	}
	
}
function openSelectMonth(){
	closeSelectBox();
	var year = $('#createaccount_information_btn_year').val();
	var maxyear = (new Date().getFullYear()-14);
	/* 연도를 선택하지 않았을 경우 */
	if(year=="연도"){
		alert("연도를 선택해주세요.")
		return;
	}
	/* 선택한 연도가 최대 14세 일 경우 연도에 맞는 월 처리 */
	else if(year==maxyear){
		crateaccountSelectMonth(14);
		var state = $('#createaccount_information_month_ul').css('display');
		if(state=="none"){
			$('#createaccount_information_month_ul').css('display', 'block');
		}
		else{
			$('#createaccount_information_month_ul').css('display', 'none');
		}
	}
	/* 연도를 올바르게 선택 했을 경우 월 처리 */
	else{
		crateaccountSelectMonth(null);
		var state = $('#createaccount_information_month_ul').css('display');
		if(state=="none"){
			$('#createaccount_information_month_ul').css('display', 'block');
		}
		else{
			$('#createaccount_information_month_ul').css('display', 'none');
		}
	}
}
function selectMonth(here){
	var month = $(here).children('a').text();
	$('#createaccount_information_btn_month').val(month);
	$('#createaccount_information_input_month').html(month);
	$('#createaccount_information_month_ul').css('display', 'none');
}
function closeSelectMonth(){
	$('#createaccount_information_month_ul').css('display', 'none');
}


/* 일 선택 관련 스크립트 */
function crateaccountSelectDay(){
	$('#createaccount_information_day_ul').empty();
	var year = $('#createaccount_information_btn_year').val();
	var month = $('#createaccount_information_btn_month').val();
	/* 윤년 윤달 계산 */
	if( year%400 == 0 || (year%4 == 0 && year%100 != 0) ){
		switch(month){
			case "1" : case "3" : case "5" : case "7" : case "8" : case "10" : case "12" : 
				for(var a=1; a<=31; a++){
					$('#createaccount_information_day_ul').append(
							'<li onclick="selectDay(this)"><a>'+a+'</a></li>'
					);
				};
				break;
			case "4" : case "6" : case "9" : case "11" : 
				for(var a=1; a<=30; a++){
					$('#createaccount_information_day_ul').append(
							'<li onclick="selectDay(this)"><a>'+a+'</a></li>'
					);
				};
				break;
			case "2" : 
				for(var a=1; a<=29; a++){
					$('#createaccount_information_day_ul').append(
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
				$('#createaccount_information_day_ul').append(
						'<li onclick="selectDay(this)"><a>'+a+'</a></li>'
				);
			};
			break;
		case "4" : case "6" : case "9" : case "11" : 
			for(var a=1; a<=30; a++){
				$('#createaccount_information_day_ul').append(
						'<li onclick="selectDay(this)"><a>'+a+'</a></li>'
				);
			};
			break;
		case "2" : 
			for(var a=1; a<=28; a++){
				$('#createaccount_information_day_ul').append(
						'<li onclick="selectDay(this)"><a>'+a+'</a></li>'
				);
			};
			break;
	}
	}
}
function openSelectDay(){
	closeSelectBox();
	var year = $('#createaccount_information_btn_year').val();
	var month = $('#createaccount_information_btn_month').val();
	if(year=="연도" || month=="월"){
		alert("연도와 월을 선택해주세요");
		return;
	}
	else{
		crateaccountSelectDay();
		var state = $('#createaccount_information_day_ul').css('display');
		if(state=="none"){
			$('#createaccount_information_day_ul').css('display', 'block');
		}
		else{
			$('#createaccount_information_day_ul').css('display', 'none');
		}
	}
}
function selectDay(here){
	var day = $(here).children('a').text();
	$('#createaccount_information_btn_day').val(day);
	$('#createaccount_information_input_day').html(day);
	$('#createaccount_information_day_ul').css('display', 'none');
}
function closeSelectDay(){
	$('#createaccount_information_day_ul').css('display', 'none');
}


/* 성별 선택 관련 스크립트 */
function radiogenderclick(here){
	$('.createaccount_information_span_select_circle_on').attr('class','createaccount_information_span_select_circle_off');
	$(here).children('span:nth-child(1)').attr('class','createaccount_information_span_select_circle_on');
	
}

/* 다음 버튼 관련 스크립트 */
function informationnextbtn(){
	//////////////////////////////
	var ac_ID, ac_PW, ac_NNM, ac_Year, ac_Month, ac_Day, ac_Gender = null;
	/* 이메일 인증 여부 */
	var emailcheck = null;
	emailcheck = sessionStorage.getItem("checkemail");
	if(emailcheck!=1){
		alert("이메일 인증을 받아주세요.");
		UIemailReturn(); /* 이메일 재인증 관련 함수 */
		return;
	}else{
		ac_ID = $('#createaccount_information_email').val();
	}
	/* 패스워드 일치 여부 */
	var password1 = $('#createaccount_information_password1').val();
	var password2 = $('#createaccount_information_password2').val();
	if(password1!=password2){
		alert("비밀번호가 일치하지 않습니다.");
		UIpasswordReturn();
		return;
	}else{
		ac_PW = $('#createaccount_information_password1').val();
	}
	ac_NNM = $('#createaccount_information_nickname').val();
	/* 생년 월 일 입력 여부 */
	var yearcheck = $('#createaccount_information_btn_year').val();
	var monthcheck = $('#createaccount_information_btn_month').val();
	var daycheck = $('#createaccount_information_btn_day').val();
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
	var gendercheck = $('.createaccount_information_gender_input[name="ac_Gender"]:checked').val();
	if(gendercheck=="none"){
		ac_Gender = null;
	}else{
		ac_Gender=gendercheck;
	}
	var alldata = {"ac_ID" : ac_ID, "ac_PW" : ac_PW, "ac_NNM" : ac_NNM, "ac_Year" : ac_Year, "ac_Month" : ac_Month, "ac_Day" : ac_Day, "ac_Gender" : ac_Gender};
	$.ajax({
		type:"POST",
		url :"ajax/insertinformation",
		data : alldata,
		headers: {"X-CSRF-TOKEN": $("input[name='_csrf']").val()},
		success : function(result){
			switch(result){
				case "1":
					alert("장시간 미입력으로 다시 시도해주세요.")
					UIemailReturn(); /* 이메일 재인증 관련 함수 */
					break;
				case "2":
					alert("회원가입이 완료 되었습니다.")
					/* 이메일 인증이 한번 사용후 다시 사용 되는걸 방지 하기 위해 세션스토리지 이메일 인증 값 삭제 */
					sessionStorage.removeItem("checkemail");
					/* insert 성공 시 홈화면으로 리다이렉트 */
					window.location.href ='/';
					break;
				case "3":
					alert("회원가입 중 오류 발생, 새로고침 후 재시도 해주세요.")
					break;
				case "4":
					alert("비밀번호는 8~32자리로 지정해주세요.")
					UIpasswordReturn();
					break;
				case "5":
					alert("숫자 영문자 특수 문자를 포함한 8~32 자를 입력하세요.")
					UIpasswordReturn();
					break;
				case "6":
					alert("닉네임은 2~20자리로 지정해주세요.")
					UInicknameReturn();
					break;
				case "7":
					alert("이메일 형식이 아닙니다.")
					UIemailReturn();  /* 이메일 재인증 관련 함수 */
					break;
			}
		},
		error: function(jqXHR, textStatus, errorThrown) { 
			alert("예기치 못한 오류로 인증하지 못했습니다. 다시 시도해주세요.");
		}
	})
	
	/*$('#createaccount_information_form').submit();*/
	
}

/* 회원가입 정보 입력 이메일 인증번호 문제 스크립트*/
function informationcertifyemailerrorbtn(){
	$('html').scrollTop(0);
	$('body').css('overflow','hidden');
	$('#createaccount_hold_box').css('display','table');
	$('#createaccount_hold_information_email_box').css('display','table-cell');
}
/* 회원가입 정보 입력 이메일 인증번호 재발송 버튼 스크립트*/
function replaysendcertifyemail(here){
	$('#createaccount_hold_information_email_box').css('display','none');
	$('#createaccount_hold_box').css('display','none');
	$('body').css('overflow','auto');
	sendcertifyemail();
}
/* 회원가입 정보 입력 이메일 인증번호 다른 이메일로 인증 버튼 스크립트*/
function changecertifyemail(here){
	$('#createaccount_hold_information_email_box').css('display','none');
	$('#createaccount_hold_box').css('display','none');
	$('body').css('overflow','auto');
	UIemailReturn();
}

/* 이메일 UI 초기화 */
function UIemailReturn(){
	/* 인증을 다시 받는게 가능하기 위해 ui들을 감추거나 보이게 함 */
	$('#createaccount_information_email').attr('readonly',false);
	$('#createaccount_information_email').val("");
	$('#createaccount_information_email_label').css("display",'block');
	$('#createaccount_information_certifyemail').val("");
	$('#createaccount_information_certifyemail_label').css('display','block');
	$('#createaccount_information_certifyemail_box').css('display','none');
	$('#createaccount_information_email_vspan').css('display','none');
	$('#createaccount_information_email_sendbtn').css('display','block');
	/* 이메일 인증이 한번 사용후 다시 사용 되는걸 방지 하기 위해 세션스토리지 이메일 인증 값 삭제 */
	sessionStorage.removeItem("checkemail");
}
/* 비밀번호 UI 초기화 */
function UIpasswordReturn(){
	$('#createaccount_information_password1').val("");
	$('#createaccount_information_password1_label').css('display','block');
	$('#createaccount_information_password1_xbtn').css("display",'none');
	$('#createaccount_information_password2').val("");
	$('#createaccount_information_password2_label').css('display','block');
	$('#createaccount_information_password2_xbtn').css("display",'none');
}
/* 닉네임 UI 초기화 */
function UInicknameReturn(){
	$('#createaccount_information_nickname').val("");
	$('#createaccount_information_nickname_label').css('display','block');
	
}