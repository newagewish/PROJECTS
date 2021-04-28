<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet">
<!DOCTYPE html>
<!-- jquery -->
		<script src="https://code.jquery.com/jquery-3.4.1.min.js" ></script>
	<!-- css -->
	 	<link href="/resources/css/admin/managementbar.css" rel="stylesheet">
	<!-- script -->
		<script src="/resources/script/admin/managementbar.js"></script>
<div id="managementbar_box">
	<div id="mb_box">
		<button id="mb_title_btn">
			StoreProject
		</button>
		<button class="mb_btn" id="mb_dashboard_btn" onclick="/">
			<span class="mb_icons" id="btn_dashboard_icon"></span>
			<span class="mb_names">대시보드</span>
		</button>
		<div class="mb_btn_cover_box">
			<button class="mb_btn" id="mb_card_btn" onclick="switchInBoxCard()">
				<span class="mb_icons" id="btn_card_icon"></span>
				<span class="mb_names">카드관리</span>
			</button>
			<div class="mb_in_box" id="mb_in_card_add_box">
				<button class="mb_in_btn" id="mb_in_box_card_add_btn" onclick="location.href='/admin/cardAdd'">
					<span class="mb_in_btn_signs">ㄴ</span>
					<span class="mb_in_btn_icons" id="btn_card_add_icon"></span>
					<span class="mb_in_btn_names">카드추가</span>
				</button>
				<button class="mb_in_btn" id="mb_in_box_products_remove_btn" onclick="/">
					<span class="mb_in_btn_signs">ㄴ</span>
					<span class="mb_in_btn_icons" id="btn_card_remove_icon"></span>
					<span class="mb_in_btn_names">카드삭제</span>
				</button>
			</div>
		</div>
		<div class="mb_btn_cover_box">
			<button class="mb_btn" id="mb_products_btn" onclick="switchInBoxProducts()">
				<span class="mb_icons" id="btn_products_icon"></span>
				<span class="mb_names">상품관리</span>
			</button>
			<div class="mb_in_box" id="mb_in_products_add_box">
				<button class="mb_in_btn" id="mb_in_box_products_add_btn" onclick="location.href='/admin/productsAdd'">
					<span class="mb_in_btn_signs">ㄴ</span>
					<span class="mb_in_btn_icons" id="btn_products_add_icon"></span>
					<span class="mb_in_btn_names">상품추가</span>
				</button>
				<button class="mb_in_btn" id="mb_in_box_products_remove_btn" onclick="location.href='/admin/productsDel'">
					<span class="mb_in_btn_signs">ㄴ</span>
					<span class="mb_in_btn_icons" id="btn_products_remove_icon"></span>
					<span class="mb_in_btn_names">상품삭제</span>
				</button>
			</div>
		</div>
		<button class="mb_btn" id="mb_user_btn" onclick="/">
			<span class="mb_icons" id="bn_user_icon"></span>
			<span class="mb_names">사용자관리</span>
		</button>
	</div>
	<div id="mb_open_box">
		<button type="button" onclick="managementbarbtn()"><img id="gear_icon" src="/resources/svg/managementbar/gear_icon.svg"></button>
	</div>
</div>