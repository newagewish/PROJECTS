<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
	<!-- css -->
	<link href="/resources/css/login/agreement.css" rel="stylesheet">
	<!-- js -->
	<script src="/resources/script/login/agreement.js" ></script>
<div id="createaccount_agreement_box">
	<!-- <div id="createaccount_agreement_header_box">
		<h1>StoreProject</h1>
	</div> -->
	<div id="createaccount_agreement_content_box">
		<div id="createaccount_agreement_content_know">
			<h2>
				스토어 프로젝트 계정<br>
				서비스약관에 동의해주세요.
			</h2>
		</div>
		<div id="createaccount_agreement_content_check_box">
			<div class="agreement_check_box">
				<input type="checkbox" id="agreement_checkAll_input" class="agreement_check_input">
				<label for="agreement_checkAll_input" id="agreement_checkAll_label" class="agreement_check_label" onclick="">
					<span></span>
					<span>모두 동의합니다.</span>
				</label>
			</div>
			<p id="agreement_checkAll_know">
				전체동의는 필수 및 선택정보에 대한 동의도 포함되어 있으며, 개별적으로도 동의를 선택하실 수 있습니다. 선택항목에 대한 동의를 거부하시는 경우에도 서비스는 이용이 가능합니다.
			</p>
			<div class="agreement_check_box">
				<input type="checkbox" id="agreement_checkAge_input" class="agreement_check_input">
				<label for="agreement_checkAge_input" id="agreement_checkAge_label" class="agreement_check_label" onclick="">
					<span></span>
					<span>만 14세 이상입니다.</span>
				</label>
			</div>
			<div class="agreement_check_box">
				<input type="checkbox" id="agreement_checkTerm_input" class="agreement_check_input">
				<label for="agreement_checkTerm_input" id="agreement_checkTerm_label" class="agreement_check_label" onclick="">
					<span></span>
					<span>[필수] 스토어 프로젝트 계정 약관</span>
				</label>
				<button type="button" class="agreement_check_info_btn" onclick="agreementtermbtn()"></button>
			</div>
			<div class="agreement_check_box">
				<input type="checkbox" id="agreement_checkPrivacy_input" class="agreement_check_input">
				<label for="agreement_checkPrivacy_input" id="agreement_checkPrivacy_label" class="agreement_check_label" onclick="">
					<span></span>
					<span>[필수] 개인정보 수집 및 이용 동의</span>
				</label>
				<button type="button" class="agreement_check_info_btn" onclick="agreementprivacybtn()"></button>
			</div>
			<div class="agreement_check_box">
				<input type="checkbox" id="agreement_checkProfile_input" class="agreement_check_input">
				<label for="agreement_checkProfile_input" id="agreement_checkProfile_label" class="agreement_check_label" onclick="">
					<span></span>
					<span>[선택] 프로필 정보 추가 수집 동의</span>
				</label>
				<button type="button" class="agreement_check_info_btn" onclick="agreementprofilebtn()"></button>
			</div>
		</div>
		<button type="button" id="agreement_next_btn" onclick="agreementnextbtn()">동의</button>
	</div>
</div>