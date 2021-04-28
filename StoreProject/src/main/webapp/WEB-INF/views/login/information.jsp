<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
	<!-- css -->
	<link href="/resources/css/login/information.css" rel="stylesheet">
	<!-- js -->
	<script src="/resources/script/login/information.js" ></script>

<div id="createaccount_information_box">
	<div id="createaccount_information_content_box">
		<div id="createaccount_information_content_know">
			<h2>
				스토어 프로젝트 계정<br>
				정보를 입력해주세요.
			</h2>
			<div id="createaccount_information_content_body">
				<form action="/login/ajax/insertinformation" id="createaccount_information_form" method="POST" accept-charset="utf-8">
					<div class="createaccount_information_content_body_stepbox" id="createaccount_information_email_box">
						<strong class="createaccount_information_strong">스토어 프로젝트 계정 이메일</strong>
						<label for="createaccount_information_email" class="createaccount_information_label" id="createaccount_information_email_label">이메일 주소 입력</label>
							<input type="text" class="createaccount_information_input" id="createaccount_information_email" name="ac_ID" value="${acvo.ac_ID }">
							<button type="button" class="createaccount_information_xbtn" id="createaccount_information_email_xbtn" onclick="deleteinformationinput(this)"></button>
							<span class="createaccount_information_vspan" id="createaccount_information_email_vspan"></span>
							<button type="button" id="createaccount_information_email_sendbtn" onclick="sendcertifyemail()">인증메일 발송</button>
					</div>
					<div class="createaccount_information_content_body_stepbox" id="createaccount_information_certifyemail_box">
						<label for="createaccount_information_certifyemail" class="createaccount_information_label" id="createaccount_information_certifyemail_label">인증번호 입력</label>
							<input type="text" class="createaccount_information_input" id="createaccount_information_certifyemail">
							<button type="button" class="createaccount_information_xbtn" id="createaccount_information_certifyemail_xbtn" onclick="deleteinformationinput(this)"></button>
							<button type="button" id="createaccount_information_certifyemail_errorbtn" onclick="informationcertifyemailerrorbtn()">인증 이메일을 받지 못하셨나요?</button>
							<button type="button" id="createaccount_information_certifyemail_sendbtn" onclick="certifyemailcheck()">인증번호 확인</button>
					</div>
					<div class="createaccount_information_content_body_stepbox">
						<strong class="createaccount_information_strong">비밀번호</strong>
						<label for="createaccount_information_password1" class="createaccount_information_label" id="createaccount_information_password1_label">비밀번호(8~32자리)</label>
						<input type="password" class="createaccount_information_input" id="createaccount_information_password1" name="ac_PW" minlength="8" maxlength="32">
						<button type="button" class="createaccount_information_xbtn" id="createaccount_information_password1_xbtn" onclick="deleteinformationinput(this)"></button>
						<label for="createaccount_information_password2" class="createaccount_information_label" id="createaccount_information_password2_label">비밀번호 재입력</label>
						<input type="password" class="createaccount_information_input" id="createaccount_information_password2" minlength="8" maxlength="32">
						<button type="button" class="createaccount_information_xbtn" id="createaccount_information_password2_xbtn" onclick="deleteinformationinput(this)"></button>
					</div>
					<div class="createaccount_information_content_body_stepbox">
						<strong class="createaccount_information_strong">닉네임</strong>
						<label for="createaccount_information_nickname" class="createaccount_information_label" id="createaccount_information_nickname_label">닉네임을 입력해주세요.</label>
						<input type="text" class="createaccount_information_input" id="createaccount_information_nickname" name="ac_NNM"  minlength="2" maxlength="20">
						<button type="button" class="createaccount_information_xbtn" id="createaccount_information_nickname_xbtn" onclick="deleteinformationinput(this)"></button>
						<span id="createaccount_information_nickname_span">0/20</span>
					</div>
					<div class="createaccount_information_content_body_stepbox" id="createaccount_information_content_body_profile_box">
						<strong class="createaccount_information_strong">생일/성별</strong>
						<div id="createaccount_information_birth_box">
							<!-- ↓생년월일(연도) -->
							<div id="createaccount_information_birth_year_box">
								<button type="button" id="createaccount_information_btn_year" value="연도" onclick="openSelectYear()">
									<span class="createaccount_information_input_birth" id="createaccount_information_input_year">연</span>
									<span class="createaccount_information_span_arrow"></span>
								</button>
								<ul class="createaccount_information_script_class_ul" id="createaccount_information_year_ul" onmouseleave="closeSelectYear()">
								</ul>
							</div>
							<!-- ↑생년월일(연도) -->
							<!-- ↓생년월일(월) -->
							<div id="createaccount_information_birth_month_box">
								<button type="button" id="createaccount_information_btn_month" value="월" onclick="openSelectMonth()">
									<span class="createaccount_information_input_birth" id="createaccount_information_input_month">월</span>
									<span class="createaccount_information_span_arrow"></span>
								</button>
								<ul class="createaccount_information_script_class_ul" id="createaccount_information_month_ul" onmouseleave="closeSelectMonth()">
								</ul>
							</div>
							<!-- ↑생년월일(월) -->
							<!-- ↓생년월일(일) -->
							<div id="createaccount_information_birth_day_box">
								<button type="button" id="createaccount_information_btn_day" value="일" onclick="openSelectDay()">
									<span class="createaccount_information_input_birth" id="createaccount_information_input_day">일</span>
									<span class="createaccount_information_span_arrow"></span>
								</button>
								<ul class="createaccount_information_script_class_ul" id="createaccount_information_day_ul" onmouseleave="closeSelectDay()">
								</ul>
							</div>
							<!-- ↑생년월일(일) -->
						</div>
						<!-- ↓성별 -->
						<div id="createaccount_information_gender_box">
							<input class="createaccount_information_gender_input" id="createaccount_information_gender_none" type="radio" name="ac_Gender" value="none" checked>
							<label for="createaccount_information_gender_none" class="createaccount_information_gender_label" onclick="radiogenderclick(this)">
								<span class="createaccount_information_span_select_circle_on"></span>
								<span class="createaccount_information_span_select_text">선택 안함</span>
							</label>
							<input class="createaccount_information_gender_input" id="createaccount_information_gender_man" type="radio" name="ac_Gender" value="man">
							<label for="createaccount_information_gender_man" class="createaccount_information_gender_label" onclick="radiogenderclick(this)">
								<span class="createaccount_information_span_select_circle_off"></span>
								<span class="createaccount_information_span_select_text">남성</span>
							</label>
							<input class="createaccount_information_gender_input" id="createaccount_information_gender_woman" type="radio" name="ac_Gender" value="woman">
							<label for="createaccount_information_gender_woman" class="createaccount_information_gender_label" onclick="radiogenderclick(this)">
								<span class="createaccount_information_span_select_circle_off"></span>
								<span class="createaccount_information_span_select_text">여성</span>
							</label>
						</div>
						<!-- ↑성별 -->
					</div>
					<input type="hidden" name="${_csrf.parameterName }" value="${_csrf.token }"/>
					<button type="button" id="createaccount_information_next_btn" onclick="informationnextbtn()">다음</button>
				</form>
			</div>
		</div>
	</div>
</div>