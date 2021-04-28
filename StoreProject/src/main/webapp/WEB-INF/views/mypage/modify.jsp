<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
        <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
    <%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec" %>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<title>스토어 프로젝트</title>
	<!-- jquery -->
		<script src="https://code.jquery.com/jquery-3.4.1.min.js" ></script>
	<!-- css -->
	 	<link href="/resources/css/mypage/modify.css" rel="stylesheet">
	<!-- script -->
		<script src="/resources/script/mypage/modify.js"></script>

<script>
	$(document).ready(function(){
		var year = "<sec:authentication property='principal.account.ac_Year'/>";
		var month = "<sec:authentication property='principal.account.ac_Month'/>";
		var day = "<sec:authentication property='principal.account.ac_Day'/>";
		var gender = "<sec:authentication property='principal.account.ac_Gender'/>";
		
		if(year!=null){
			$('#modify_content_input_year').val(year);
		}
		if(month!=null){
			$('#modify_content_input_month').val(month);
		}
		if(day!=null){
			$('#modify_content_input_day').val(day);
		}
		if(gender=="null"){
			$('#modify_content_gender_man').prop('checked', true)
			$('.modify_content_span_select_circle_on').attr('class','modify_content_span_select_circle_off');
			$('#modify_content_span_circle_img_none').attr('class','modify_content_span_select_circle_on');
		}else if(gender=="man"){
			$('#modify_content_gender_man').prop('checked', true)
			$('.modify_content_span_select_circle_on').attr('class','modify_content_span_select_circle_off');
			$('#modify_content_span_circle_img_man').attr('class','modify_content_span_select_circle_on');
		}else if(gender=="woman"){
			$('#modify_content_gender_woman').prop('checked', true)
			$('.modify_content_span_select_circle_on').attr('class','modify_content_span_select_circle_off');
			$('#modify_content_span_circle_img_woman').attr('class','modify_content_span_select_circle_on');
		}
	});
</script>
</head>
<body>
	<%@include file="../includes/header.jsp" %>
	<div id="mypage_modify_box">
		<div id="modify_head_box">
			<span>정보수정</span>
		</div>
		<form>
		<div id="modify_content_box">
			<div id="modify_content_edit_box">
				<div class="modify_content_edit_box" id="modify_conetnt_edit_nickname">
					<span>닉네임</span>
					<input type="text" id="modify_content_nickname" value="<sec:authentication property="principal.account.ac_NNM"/>" placeholder="닉네임 입력" required>
				</div>
				<div class="modify_content_edit_box" id="modify_conetnt_edit_email">
					<span>이메일</span>
					<input type="text" id="modify_content_email" value="<sec:authentication property="principal.account.ac_ID"/>"  placeholder="이메일 입력" disabled required>
				</div>
				<div class="modify_content_edit_box" id="modify_conetnt_edit_password">
					<span>비밀번호</span>
					<input type="password" id="modify_content_password" value=""  placeholder="비밀번호 입력" required>
				</div>
				<div class="modify_content_edit_box" id="modify_conetnt_edit_birth">
					<span>생년월일</span>
					<!-- ↓생년월일(연도) -->
					<div id="modify_content_birth_year_box">
						<button type="button" id="modify_content_btn_year" onclick="openSelectYear()">
							<input class="modify_content_input_birth" type="text" id="modify_content_input_year" name="ac_Year" value="연도" readonly>
							<span class="modify_content_span_arrow"></span>
						</button>
						<ul class="modify_content_script_class_ul" id="modify_content_year_ul" onmouseleave="closeSelectYear()">
						</ul>
					</div>
					<!-- ↑생년월일(연도) -->
					<!-- ↓생년월일(월) -->
					<div id="modify_content_birth_month_box">
						<button type="button" id="modify_content_btn_month" onclick="openSelectMonth()">
							<input class="modify_content_input_birth" type="text" id="modify_content_input_month" name="ac_Month" value="월" readonly>
							<span class="modify_content_span_arrow"></span>
						</button>
						<ul class="modify_content_script_class_ul" id="modify_content_month_ul" onmouseleave="closeSelectMonth()">
						</ul>
					</div>
					<!-- ↑생년월일(월) -->
					<!-- ↓생년월일(일) -->
					<div id="modify_content_birth_day_box">
						<button type="button" id="modify_content_btn_day" onclick="openSelectDay()">
							<input class="modify_content_input_birth" type="text" id="modify_content_input_day" name="ac_Day" value="일" readonly>
							<span class="modify_content_span_arrow"></span>
						</button>
						<ul class="modify_content_script_class_ul" id="modify_content_day_ul" onmouseleave="closeSelectDay()">
						</ul>
					</div>
					<!-- ↑생년월일(일) -->
				</div>
				<div class="modify_content_edit_box" id="modify_conetnt_edit_gender">
					<span>성별</span>
					<!-- ↓성별 -->
					<div id="modify_content_gender_box">
						<input class="modify_content_gender_input" id="modify_content_gender_none" type="radio" name="ac_Gender" value="none" checked>
						<label for="modify_content_gender_none" class="modify_content_gender_label" onclick="radiogenderclick(this)">
							<span class="modify_content_span_select_circle_on" id="modify_content_span_circle_img_none"></span>
							<span class="modify_content_span_select_text">선택 안함</span>
						</label>
						<input class="modify_content_gender_input" id="modify_content_gender_man" type="radio" name="ac_Gender" value="man">
						<label for="modify_content_gender_man" class="modify_content_gender_label" onclick="radiogenderclick(this)">
							<span class="modify_content_span_select_circle_off" id="modify_content_span_circle_img_man"></span>
							<span class="modify_content_span_select_text">남성</span>
						</label>
						<input class="modify_content_gender_input" id="modify_content_gender_woman" type="radio" name="ac_Gender" value="woman">
						<label for="modify_content_gender_woman" class="modify_content_gender_label" onclick="radiogenderclick(this)">
							<span class="modify_content_span_select_circle_off" id="modify_content_span_circle_img_woman"></span>
							<span class="modify_content_span_select_text">여성</span>
						</label>
					</div>
					<!-- ↑성별 -->
				</div>
			</div>
			<div id="modify_content_check_box">
				<input type="checkbox" id="modify_content_check_provision_input" name="ac_Uses_Agree">
				<label for="modify_content_check_provision_input" onclick="provisioncheck(this)">
					<span id="modify_content_check_provision_img"></span>
					이벤트 및 마케팅 활용에 동의합니다
				</label>
				<span>[선택]</span>
				<p>
					이메일,SMS 수신 동의합니다.<br>
					개인정보 및 서비스 수요 공지사항은 수신동의 여부와
					관계없이 발송됩니다.
				</p>
			</div>
		</div>
		<div id="modify_foot_box">
			<div id="modify_foot_btn_box">
				<a href="javascript:history.back();" id="modify_content_cancel_btn" onclick="modifycancelbtn()">취소</a>
				<button type="button" id="modify_content_save_btn" onclick="modifysavebtn()">저장</button>
			</div>
			
		</div>
		</form>
	</div>
	<%@include file="../includes/footer.jsp" %>
	<form action="/logout" method="post" id="logoutform">
		<input type="hidden" name="${_csrf.parameterName }" value="${_csrf.token }"/>
	</form>
</body>
</html>