/**
 * 
 */
window.onload = function(){
	/* 뒤로가기 버튼 등으로 페이지 로드 했을 경우 이전 input 입력 값 지우기 */
	$('#login_email').val("");
	$('#login_password').val("");
	/* */
	$('#login_email').focus(function(){
		$('#login_email_label').css("display",'none');
	});
	$('#login_email').blur(function(){
		if($('#login_email').val()!=""){
			$('#login_email_label').css("display",'none');
		}else{
			$('#login_email_label').css("display",'block');
		}
	});
	$('#login_password').focus(function(){
		$('#login_password_label').css("display",'none');
	});
	$('#login_password').blur(function(){
		if($('#login_password').val()!=""){
			$('#login_password_label').css("display",'none');
		}else{
			$('#login_password_label').css("display",'block');
		}
	});
}