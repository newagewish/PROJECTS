/**
 * 
 */
$(document).ready(function(){
	/* 약관 모두 동의 스크립트 */
	$("#agreement_checkAll_input").change(function(){
        if($("#agreement_checkAll_input").is(":checked")){
            $('.agreement_check_label').children('span:nth-child(1)').css('background','url("/resources/svg/createaccount/check_mark_yellow.svg")');
            $('.agreement_check_input').prop('checked', true);
        }else{
        	$('.agreement_check_label').children('span:nth-child(1)').css('background','url("/resources/svg/createaccount/check_mark_gray.svg")')
        	$('.agreement_check_input').prop('checked', false);
        }
    });
	/* 약관 개별 동의 스크립트 */
	$(".agreement_check_input").change(function(here){
        if($("#agreement_checkAge_input").is(":checked")){
            $('#agreement_checkAge_label').children('span:nth-child(1)').css('background','url("/resources/svg/createaccount/check_mark_yellow.svg")');  
        }else{
        	$('#agreement_checkAge_label').children('span:nth-child(1)').css('background','url("/resources/svg/createaccount/check_mark_gray.svg")');
        	$('#agreement_checkAll_label').children('span:nth-child(1)').css('background','url("/resources/svg/createaccount/check_mark_gray.svg")');
        	$('#agreement_checkAll_input').prop('checked', false);
        }
        
        if($("#agreement_checkTerm_input").is(":checked")){
            $('#agreement_checkTerm_label').children('span:nth-child(1)').css('background','url("/resources/svg/createaccount/check_mark_yellow.svg")');
        }else{
        	$('#agreement_checkTerm_label').children('span:nth-child(1)').css('background','url("/resources/svg/createaccount/check_mark_gray.svg")');
        	$('#agreement_checkAll_label').children('span:nth-child(1)').css('background','url("/resources/svg/createaccount/check_mark_gray.svg")');
        	$('#agreement_checkAll_input').prop('checked', false);
        }
        
        if($("#agreement_checkPrivacy_input").is(":checked")){
            $('#agreement_checkPrivacy_label').children('span:nth-child(1)').css('background','url("/resources/svg/createaccount/check_mark_yellow.svg")');
        }else{
        	$('#agreement_checkPrivacy_label').children('span:nth-child(1)').css('background','url("/resources/svg/createaccount/check_mark_gray.svg")');
        	$('#agreement_checkAll_label').children('span:nth-child(1)').css('background','url("/resources/svg/createaccount/check_mark_gray.svg")');
        	$('#agreement_checkAll_input').prop('checked', false);
        }
        
        if($("#agreement_checkProfile_input").is(":checked")){
            $('#agreement_checkProfile_label').children('span:nth-child(1)').css('background','url("/resources/svg/createaccount/check_mark_yellow.svg")');
            $('#createaccount_information_content_body_profile_box').css('display','block');
        }else{
        	$('#agreement_checkProfile_label').children('span:nth-child(1)').css('background','url("/resources/svg/createaccount/check_mark_gray.svg")');
        	$('#agreement_checkAll_label').children('span:nth-child(1)').css('background','url("/resources/svg/createaccount/check_mark_gray.svg")');
        	$('#agreement_checkAll_input').prop('checked', false);
        	$('#createaccount_information_content_body_profile_box').css('display','none');
        }
        /* 모든 항목이 체크 되어 있는지 확인 */
        agreementcheckall();
    });
});
/* 개별 약관 동의가 모두 체크 일 때 모두 동의 항목 체크 */
function agreementcheckall(){
    if($("#agreement_checkAge_input").is(":checked") && $("#agreement_checkTerm_input").is(":checked") && $("#agreement_checkPrivacy_input").is(":checked") && $("#agreement_checkProfile_input").is(":checked")){
    	$('#agreement_checkAll_label').children('span:nth-child(1)').css('background','url("/resources/svg/createaccount/check_mark_yellow.svg")');
    	$('#agreement_checkAll_input').prop('checked', true);
    }
}
/* 약관 동의 상황별 스크립트 실행 */
function agreementnextbtn(){
	if($("#agreement_checkAll_input").is(":checked")){
		$('#createaccount_agreement_box').css('display','none');
		$('#createaccount_information_box').css('display','table-cell');
	}else{
		if($("#agreement_checkTerm_input").is(":checked") && $("#agreement_checkPrivacy_input").is(":checked")){
			if($("#agreement_checkAge_input").is(":checked")){
				$('#createaccount_agreement_box').css('display','none');
				$('#createaccount_information_box').css('display','table-cell');
			}
			else{
				$('#createaccount_hold_box').css('display','table');
				$('#createaccount_hold_agreement_age_box').css('display','table-cell');
			}
		}else{
			$('#createaccount_hold_box').css('display','table');
			$('#createaccount_hold_agreement_required_box').css('display','table-cell');
		}
		/* hold 창 오픈 시 스크롤 위치 & 잠금 스크립트 호출 */
		agreementaccounthold();
	}
}
/* 필수 동의 required 스크립트 */
function agreementrequiredok(){
	$('#createaccount_hold_agreement_required_box').css('display','none');
	$('#createaccount_hold_box').css('display','none');
	$('body').css('overflow','auto');
}
/* 나이 제한 동의 ok 스크립트 */
function agreementageok(){
	$('#agreement_checkAge_input').prop('checked', true);
	$('#agreement_checkAge_label').children('span:nth-child(1)').css('background','url("/resources/svg/createaccount/check_mark_yellow.svg")');
	/* 나이 제한 동의 창 off */
	agreementageno()
	/* 모든 항목이 체크 되어 있는지 확인 */
	agreementcheckall();
	
	/* 다음화면 진행 스크립트 불러올 것 */
}
/* 나이 제한 동의 no 스크립트 */
function agreementageno(){
	$('#createaccount_hold_agreement_age_box').css('display','none');
	$('#createaccount_hold_box').css('display','none');
	$('body').css('overflow','auto');
}
/* X버튼 스크립트 */
function parentsExit(here){
	$(here).parent('div').parent('div').css('display', 'none');
	$(here).parent('div').parent('div').parent('div').css('display', 'none');
	$('body').css('overflow','auto');
}
/* hold 창 오픈 시 스크롤 위치 & 잠금*/
function agreementaccounthold(){
	$('html').scrollTop(0);
	$('body').css('overflow','hidden');
}

/* 스토어 프로젝트 계정 약관 상세 보기 스크립트 */
function agreementtermbtn(){
	agreementaccounthold();
	$('#createaccount_hold_box').css('display','table');
	$('#createaccount_hold_agreement_term_box').css('display','table-cell');
}

/* 개인정보 수집 및 이용 동의 상세 보기 스크립트 */
function agreementprivacybtn(){
	agreementaccounthold();
	$('#createaccount_hold_box').css('display','table');
	$('#createaccount_hold_agreement_privacy_box').css('display','table-cell');
}
/* 프로필 정보 추가 수집 동의 상세 보기 스크립트 */
function agreementprofilebtn(){
	agreementaccounthold();
	$('#createaccount_hold_box').css('display','table');
	$('#createaccount_hold_agreement_profile_box').css('display','table-cell');	
}